import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppConstants } from 'src/app/common/app-constants';
import { UserRoutes } from 'src/app/common/routes';
import { UserRoles } from 'src/app/common/user-roles';
import {
  ActionRequestPayload,
  ISearchRequest,
  ISearchResponse,
} from 'src/app/models/core';
import { LocaleService } from 'src/app/services/locale.service';
import {
  deleteUser,
  loadUsers,
  updateUser,
  UserActions,
} from 'src/app/store/user/user.actions';
import { selectUsers } from 'src/app/store/user/user.selectors';
import { IUserState } from 'src/app/store/user/user.state';
import { IUser, IUserFilterModel } from '../../../models/user.model';

@UntilDestroy()
@Component({
  selector: 'app-user-manage-list',
  templateUrl: './user-manage-list.component.html',
  styleUrls: ['./user-manage-list.component.scss'],
})
export class UserManageListComponent implements OnInit {
  public readonly UserRoutes = UserRoutes;
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
  public usersDataSource = new MatTableDataSource<IUser>();
  public userStatuses = [
    { val: null, translationPath: 'common.all' },
    { val: true, translationPath: 'userManage.common.blocked' },
    { val: false, translationPath: 'userManage.common.active' },
  ];
  public displayedColumns: string[] = [
    'select',
    'name',
    'email',
    'createdAt',
    'buttons',
  ];
  public selection = new SelectionModel<IUser>(true, []);

  public get isItemsInitialized(): boolean {
    return this.result.items !== null;
  }

  public get isItemsExist(): boolean {
    return this.result.totalCount > 0;
  }

  public get isSelectedItems(): boolean {
    return Boolean(this.selection.selected.length);
  }

  public get isAllRowsSelected(): boolean {
    return this.selection.hasValue() && this.isAllSelected();
  }

  public get isNotAllRowsSelected(): boolean {
    return this.selection.hasValue() && !this.isAllSelected();
  }

  constructor(
    private store: Store<IUserState>,
    private actions: Actions,
    public localeService: LocaleService
  ) {}

  ngOnInit(): void {
    this.store.select(selectUsers).subscribe(users => {
      this.result = users;
      this.usersDataSource.data = users.items;
    });

    this.actions
      .pipe(
        ofType(UserActions.userDeleted, UserActions.userUpdated),
        untilDestroyed(this)
      )
      .subscribe(() => {
        this.refreshList();
      });

    this.refreshList();
  }

  public onSearchChange(): void {
    if (this.request.searchTerm.length === 1) return;

    this.refreshList();
  }

  public onUserStatusChange($event): void {
    this.request.filter.blocked = $event === 'null' ? null : $event;
    this.request.pageIndex = 0;
    this.refreshList();
  }

  public onPaginationChange($event: PageEvent): void {
    this.request.pageIndex = $event.pageIndex;
    this.request.pageSize = $event.pageSize;
    this.refreshList();
  }

  public onSortChange({ active, direction }) {
    this.request.sortTerm = active;
    this.request.sortAsc = direction;
    this.refreshList();
  }

  public onDeleteUser(id: string): void {
    this.store.dispatch(
      deleteUser({
        data: id,
      } as ActionRequestPayload<string>)
    );
  }

  public onToggleBlocked(user: IUser): void {
    this.store.dispatch(
      updateUser({
        data: {
          ...user,
          blocked: !user.blocked,
        },
      } as ActionRequestPayload<IUser>)
    );
  }

  public handleToggleAllRows($event: MatCheckboxChange) {
    return $event ? this.toggleAllRows() : null;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  public toggleAllRows(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.usersDataSource.data);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  public isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.usersDataSource.data.length;
    return numSelected === numRows;
  }

  /** The label for the checkbox on the passed row */
  public checkboxLabel(row?: IUser): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }

    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row._id + 1
    }`;
  }

  public toggleSelectedRow($event: MatCheckboxChange, row: IUser) {
    return $event ? this.selection.toggle(row) : null;
  }

  public getUserIcon(user: IUser): string {
    if (user.blocked) return 'blocked';

    let icon = '';

    switch (user.role) {
      case 'admin':
        icon = 'stars';
        break;
      case 'moderator':
        icon = 'security';
        break;
    }

    return icon;
  }

  public trackByUserStatus(index: number): number {
    return index;
  }

  private refreshList(): void {
    if (
      this.result.totalCount / this.request.pageSize <=
      this.request.pageIndex
    ) {
      this.request.pageIndex = 0;
    }

    this.store.dispatch(
      loadUsers({
        data: JSON.parse(JSON.stringify(this.request)),
      } as ActionRequestPayload<ISearchRequest<IUserFilterModel>>)
    );
  }

  public isAdmin(user: IUser): boolean {
    return user.role === UserRoles.Admin;
  }
}
