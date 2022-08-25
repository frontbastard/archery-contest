import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { PAGE_SIZE_OPTIONS } from 'src/app/common/app-constants';
import { UserRole } from 'src/app/common/user-roles';
import { ActionRequestPayload } from 'src/app/models/base/action-request-payload';
import { ActionResponsePayload } from 'src/app/models/base/action-response-payload';
import { SearchRequest } from 'src/app/models/base/search-request';
import { SearchResponse } from 'src/app/models/base/search-response';
import { LocaleService } from 'src/app/services/locale.service';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import {
  deleteUser,
  loadUser,
  loadUsers,
  updateUser,
  UserActions,
} from 'src/app/store/user/user.actions';
import { selectUsers } from 'src/app/store/user/user.selectors';
import { UserState } from 'src/app/store/user/user.state';
import { User, UserFilterModel } from '../../../models/user.model';

@UntilDestroy()
@Component({
  selector: 'app-user-manage-list',
  templateUrl: './user-manage-list.component.html',
})
export class UserManageListComponent implements OnInit {
  public readonly UserRole = UserRole;
  public readonly PAGE_SIZE_OPTIONS = PAGE_SIZE_OPTIONS;

  public result: SearchResponse<User> = {} as SearchResponse<User>;
  public request: SearchRequest<UserFilterModel> = {
    searchTerm: null,
    sortTerm: null,
    sortAsc: '',
    pageIndex: 0,
    pageSize: PAGE_SIZE_OPTIONS[0],
    filter: {
      blocked: null,
    },
  } as SearchRequest<UserFilterModel>;
  public userStatuses = [
    { value: null, translationPath: 'common.all' },
    { value: true, translationPath: 'userManage.fields.status.blocked' },
    { value: false, translationPath: 'userManage.fields.status.active' },
  ];
  public displayedColumns: string[] = [
    'name',
    'role',
    'email',
    'createdAt',
    'actions',
  ];
  public selection = new SelectionModel<User>(true, []);

  public get isItemsInitialized(): boolean {
    return this.result.items !== null;
  }

  public get notFoundMessage(): string {
    return this.searchInput.nativeElement.value.length
      ? 'elements.search.nothingFound'
      : 'common.notFound';
  }

  @ViewChild('searchInput') searchInput: ElementRef;

  constructor(
    public localeService: LocaleService,
    private _store: Store<UserState>,
    private _actions: Actions,
    private _dialog: MatDialog,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._actions
      .pipe(ofType(UserActions.userLoaded), untilDestroyed(this))
      .subscribe(({ data }: ActionResponsePayload<User>) => {
        this._router.navigate([data._id]);
      });

    this._store.select(selectUsers).subscribe(users => {
      this.result = users;
    });

    this._actions
      .pipe(
        ofType(UserActions.userDeleted, UserActions.userUpdated),
        untilDestroyed(this)
      )
      .subscribe(() => {
        this._refreshList();
      });

    this._refreshList();
  }

  public searchChanged(): void {
    if (this.request.searchTerm.length === 1) return;

    this._refreshList();
  }

  public userStatusChanged($event): void {
    this.request.filter.blocked = $event === 'null' ? null : $event;
    this.request.pageIndex = 0;
    this._refreshList();
  }

  public paginationChanged($event: PageEvent): void {
    this.request.pageIndex = $event.pageIndex;
    this.request.pageSize = $event.pageSize;
    this._refreshList();
  }

  public sortChanged({ active, direction }) {
    this.request.sortTerm = active;
    this.request.sortAsc = direction;
    this._refreshList();
  }

  public deleteUserDialog(user: User): void {
    const dialogRef = this._dialog.open(DialogComponent, {
      data: {
        entity: user,
        dialog: {
          title: 'userManage.dialogs.deleteUser.title',
          content: 'userManage.dialogs.deleteUser.content',
          actionButton: 'common.delete',
          actionButtonColor: 'warn',
        },
      },
    });

    dialogRef.afterClosed().subscribe(id => {
      if (id) {
        this._store.dispatch(
          deleteUser({
            data: id,
          } as ActionRequestPayload<string>)
        );
      }
    });
  }

  public loadUserDetails(user: User) {
    this._store.dispatch(
      loadUser({
        data: user._id,
      } as ActionRequestPayload<string>)
    );
  }

  public toggleBlocked(user: User): void {
    this._store.dispatch(
      updateUser({
        data: {
          ...user,
          blocked: !user.blocked,
        },
      } as ActionRequestPayload<User>)
    );
  }

  public trackByUserStatus(index: number, status) {
    return status.value;
  }

  public matchRole(user: User, role: UserRole): boolean {
    return user.role === role;
  }

  private _refreshList(): void {
    if (
      this.result.totalCount / this.request.pageSize <=
      this.request.pageIndex
    ) {
      this.request.pageIndex = 0;
    }

    this._store.dispatch(
      loadUsers({
        data: JSON.parse(JSON.stringify(this.request)),
      } as ActionRequestPayload<SearchRequest<UserFilterModel>>)
    );
  }
}
