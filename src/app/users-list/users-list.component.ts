import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IUser, User } from '../models/user.model';

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
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent {
  usersList = new MatTableDataSource(USERS);
  userStatuses = [
    { value: 'all', viewValue: 'All' },
    { value: 'blocked', viewValue: 'Blocked' },
  ];
  selectedUserStatus = this.userStatuses[0].value;
  displayedColumns: string[] = ['name', 'email', 'date', 'buttons'];

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

  private getPaginatorFirstPage() {
    if (this.usersList.paginator) {
      this.usersList.paginator.firstPage();
    } else {
      this.usersList.paginator = this.paginator;
    }
  }
}
