import { SelectionModel } from '@angular/cdk/collections';
import { EventEmitter, DoCheck, Output } from '@angular/core';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IUser, IUserFilterModel } from '../../../models/user.model';
import { UserRoutes } from 'src/app/common/routes';
import {
  ActionRequestPayload,
  ISearchRequest,
  ISearchResponse,
} from 'src/app/models/core';
import { OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IUserState } from 'src/app/store/user/user.state';
import { loadUsers } from 'src/app/store/user/user.actions';
import { Actions } from '@ngrx/effects';
import { selectUsers } from 'src/app/store/user/user.selectors';

@Component({
  selector: 'app-user-manage-list',
  templateUrl: './user-manage-list.component.html',
  styleUrls: ['./user-manage-list.component.scss'],
})
export class UserManageListComponent implements OnInit, AfterViewInit {
  public searchResult: ISearchResponse<IUser> = {} as ISearchResponse<IUser>;
  public usersDataSource = new MatTableDataSource<IUser>();
  public userStatuses = [
    { value: 'all', viewValue: 'All' },
    { value: 'blocked', viewValue: 'Blocked' },
  ];
  public selectedUserStatus = this.userStatuses[0].value;
  public displayedColumns: string[] = [
    'select',
    'name',
    'email',
    'date',
    'buttons',
  ];
  public selection = new SelectionModel<IUser>(true, []);
  public userRoutesRoot = UserRoutes.Root;

  @Output() deleteUser = new EventEmitter<ActionRequestPayload<string>>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public get isItemsInitialized(): boolean {
    return this.searchResult.items !== null;
  }

  public get isItemsExist(): boolean {
    return this.searchResult.totalCount > 0;
  }

  constructor(private store: Store<IUserState>, private actions: Actions) {}

  ngOnInit(): void {
    this.store.select(selectUsers).subscribe((users) => {
      this.searchResult = users;
      this.usersDataSource.data = users.items;
    });
    this.store.dispatch(
      loadUsers({} as ActionRequestPayload<ISearchRequest<IUserFilterModel>>)
    );
  }

  ngAfterViewInit(): void {
    this.usersDataSource.paginator = this.paginator;
    this.usersDataSource.sort = this.sort;
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.usersDataSource.filter =
      filterValue.length < 2 ? '' : filterValue.trim().toLowerCase();

    this.getPaginatorFirstPage();
  }

  public userStatusChanged(event: Event): void {
    this.selectedUserStatus = (event.target as HTMLSelectElement).value;

    this.usersDataSource.data = this.searchResult.items.filter((user) =>
      this.selectedUserStatus === 'blocked' ? user.blocked : user
    );

    this.getPaginatorFirstPage();
    this.usersDataSource.sort = this.sort;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  public isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.usersDataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  public toggleAllRows(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.usersDataSource.data);
  }

  /** The label for the checkbox on the passed row */
  public checkboxLabel(row?: IUser): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
  }

  public onDeleteUser(id: ActionRequestPayload<string>): void {
    this.deleteUser.emit(id);
  }

  private getPaginatorFirstPage(): void {
    if (this.usersDataSource.paginator) {
      this.usersDataSource.paginator.firstPage();
    } else {
      this.usersDataSource.paginator = this.paginator;
    }
  }
}
