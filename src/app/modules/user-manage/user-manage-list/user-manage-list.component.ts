import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IUser, User } from '../../../models/user.model';

const USERS: IUser[] = [
  new User({
    id: 0,
    email: 'john@email.com',
    name: 'John',
    blocked: false,
    date: new Date(),
  }),
  new User({
    id: 1,
    email: 'steave@email.com',
    name: 'Steave',
    blocked: false,
    date: new Date(),
  }),
  new User({
    id: 2,
    email: 'mike@email.com',
    name: 'Mike',
    blocked: false,
    date: new Date(),
  }),
  new User({
    id: 3,
    email: 'george@email.com',
    name: 'George Washington Junior',
    blocked: false,
    date: new Date(),
  }),
  new User({
    id: 4,
    email: 'ivan@email.com',
    name: 'Ivan',
    blocked: true,
    date: new Date(),
  }),
  new User({
    id: 5,
    email: 'hrystyna@email.com',
    name: 'Hrystyna',
    blocked: false,
    date: new Date(),
  }),
  new User({
    id: 6,
    email: 'alyona@email.com',
    name: 'Alyona',
    blocked: true,
    date: new Date(),
  }),
];

@Component({
  selector: 'app-user-manage-list',
  templateUrl: './user-manage-list.component.html',
  styleUrls: ['./user-manage-list.component.scss'],
})
export class UserManageListComponent {
  usersList = new MatTableDataSource(USERS);
  userStatuses = [
    { value: 'all', viewValue: 'All' },
    { value: 'blocked', viewValue: 'Blocked' },
  ];
  selectedUserStatus = this.userStatuses[0].value;
  displayedColumns: string[] = ['select', 'name', 'email', 'date', 'buttons'];
  selection = new SelectionModel<User>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.usersList.paginator = this.paginator;
    this.usersList.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.usersList.filter =
      filterValue.length < 2 ? '' : filterValue.trim().toLowerCase();

    this.getPaginatorFirstPage();
  }

  userClicked(user: IUser) {
    console.log(user);
  }

  userStatusChanged(event: Event) {
    this.selectedUserStatus = (event.target as HTMLSelectElement).value;

    this.usersList = new MatTableDataSource(
      USERS.filter((user) =>
        this.selectedUserStatus === 'blocked' ? user.blocked : user
      )
    );

    this.getPaginatorFirstPage();
    this.usersList.sort = this.sort;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.usersList.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.usersList.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: User): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
  }

  private getPaginatorFirstPage() {
    if (this.usersList.paginator) {
      this.usersList.paginator.firstPage();
    } else {
      this.usersList.paginator = this.paginator;
    }
  }
}
