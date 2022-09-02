import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { PAGE_SIZE_OPTIONS } from 'src/app/common/app-constants';
import { BaseSearchComponent } from 'src/app/common/base/base-search.component';
import { UserRole } from 'src/app/common/user-roles';
import { ActionRequestPayload } from 'src/app/models/base/action-request-payload';
import { SearchRequest } from 'src/app/models/base/search-request';
import { LocaleService } from 'src/app/services/locale.service';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import {
  deleteUser,
  loadUsers,
  preloadUser,
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
export class UserManageListComponent
  extends BaseSearchComponent<User, UserFilterModel>
  implements OnInit
{
  public readonly UserRole = UserRole;
  public readonly PAGE_SIZE_OPTIONS = PAGE_SIZE_OPTIONS;
  public readonly userStatuses = [
    { value: null, translationPath: 'common.all' },
    { value: true, translationPath: 'userManage.fields.status.blocked' },
    { value: false, translationPath: 'userManage.fields.status.active' },
  ];
  public readonly displayedColumns: string[] = [
    'name',
    'role',
    'email',
    'createdAt',
    'actions',
  ];
  public locale = null;

  constructor(
    private _localeService: LocaleService,
    private _store: Store<UserState>,
    private _actions: Actions,
    private _dialog: MatDialog,
    private _router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.request.filter = { blocked: null };
    this.locale = this._localeService.locale;
    this._store.select(selectUsers).subscribe(users => {
      this.result = users;
    });

    this._actions
      .pipe(ofType(UserActions.userDeleted), untilDestroyed(this))
      .subscribe(() => {
        this._refreshList();
      });

    this._refreshList();
  }

  public searchChanged(): void {
    if (this.request.searchTerm.length === 1) {
      return;
    }

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

    dialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe(id => {
        if (id) {
          this._store.dispatch(
            deleteUser({
              data: id,
            } as ActionRequestPayload<string>)
          );
        }
      });
  }

  public preloadUserDetails(user: User) {
    this._store.dispatch(
      preloadUser({
        data: user.id,
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
