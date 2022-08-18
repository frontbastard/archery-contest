import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppConstants } from 'src/app/common/app-constants';
import { UserRoutes } from 'src/app/common/routes';
import { UserRoles } from 'src/app/common/user-roles';
import {
  ActionRequestPayload,
  ActionResponsePayload,
  ISearchRequest,
  ISearchResponse,
} from 'src/app/models/core';
import { LocaleService } from 'src/app/services/locale.service';
import {
  deleteUser,
  loadUser,
  loadUsers,
  updateUser,
  UserActions,
} from 'src/app/store/user/user.actions';
import { selectUsers } from 'src/app/store/user/user.selectors';
import { IUserState } from 'src/app/store/user/user.state';
import { IUser, IUserFilterModel } from '../../../models/user.model';
import { DialogDeleteUserComponent } from '../dialog-delete-user/dialog-delete-user.component';

@UntilDestroy()
@Component({
  selector: 'app-user-manage-list',
  templateUrl: './user-manage-list.component.html',
  styleUrls: ['./user-manage-list.component.scss'],
})
export class UserManageListComponent implements OnInit {
  public readonly UserRoutes = UserRoutes; //TODO: не використовується
  public readonly UserRoles = UserRoles;
  public readonly AppConstants = AppConstants;

  public result: ISearchResponse<IUser> = {} as ISearchResponse<IUser>;
  public request: ISearchRequest<IUserFilterModel> = {
    searchTerm: null,
    sortTerm: null,
    sortAsc: '',
    pageIndex: 0,
    pageSize: AppConstants.PAGE_SIZE_OPTIONS[0],
    filter: {
      blocked: null,
    },
  } as ISearchRequest<IUserFilterModel>;
  public userStatuses = [ //TODO: readonly?
    { val: null, translationPath: 'common.all' },
    { val: true, translationPath: 'userManage.common.blocked' },
    { val: false, translationPath: 'userManage.common.active' },
  ];
  public displayedColumns: string[] = [
    'name',
    'role',
    'email',
    'createdAt',
    'actions',
  ];
  public selection = new SelectionModel<IUser>(true, []);

  public get isItemsInitialized(): boolean {
    return this.result.items !== null;
  }

  public get isItemsExist(): boolean {//TODO: не використовується
    return this.result.totalCount > 0;
  }

  public get isSelectedItems(): boolean {//TODO: не використовується
    return Boolean(this.selection.selected.length);
  }

  public get notFoundMessage(): string {
    return this.searchInput.nativeElement.value.length
      ? 'elements.search.nothingFound'
      : 'common.notFound';
  }

  @ViewChild('searchInput') searchInput: ElementRef;

  constructor(
    public localeService: LocaleService,
    private _store: Store<IUserState>,
    private _actions: Actions,
    private _dialog: MatDialog,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._actions
      .pipe(ofType(UserActions.userLoaded), untilDestroyed(this))
      .subscribe(({ data }: ActionResponsePayload<IUser>) => {
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
    if (this.request.searchTerm.length === 1) {//TODO: braces
      return
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

  public deleteUserDialog(user: IUser): void {
    const dialogRef = this._dialog.open(DialogDeleteUserComponent, {
      data: user,
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

  public loadUserDetails(user: IUser) {
    this._store.dispatch(
      loadUser({
        data: user._id,
      } as ActionRequestPayload<string>)
    );
  }

  public toggleBlocked(user: IUser): void {
    this._store.dispatch(
      updateUser({
        data: {
          ...user,
          blocked: !user.blocked,
        },
      } as ActionRequestPayload<IUser>)
    );
  }

  public trackByUserStatus(index: number): number {//TODO: статуси унікальні, їх можна із велью трекати
    return index;
  }

  public getRole(user: IUser, role: string): boolean { //TODO: назва і значення що повертаються не сходяться
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
        data: { ...this.request },
      } as ActionRequestPayload<ISearchRequest<IUserFilterModel>>)
    );
  }
}
