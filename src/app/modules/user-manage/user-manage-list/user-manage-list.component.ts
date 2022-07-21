import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IUser } from '../../../models/user.model';

@Component({
  selector: 'app-user-manage-list',
  templateUrl: './user-manage-list.component.html',
  styleUrls: ['./user-manage-list.component.scss'],
})
export class UserManageListComponent implements OnInit, AfterViewInit {
  // public usersList: IUser[] = [];
  public usersMatTableDataSource = new MatTableDataSource<IUser>();
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

  @Input() usersList: IUser[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.usersMatTableDataSource = new MatTableDataSource<IUser>(
      this.usersList
    );
  }

  ngAfterViewInit() {
    this.usersMatTableDataSource.paginator = this.paginator;
    this.usersMatTableDataSource.sort = this.sort;
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.usersMatTableDataSource.filter =
      filterValue.length < 2 ? '' : filterValue.trim().toLowerCase();

    this.getPaginatorFirstPage();
  }

  public userClicked(user: IUser) {
    console.log(user);
  }

  public userStatusChanged(event: Event) {
    this.selectedUserStatus = (event.target as HTMLSelectElement).value;

    this.usersMatTableDataSource = new MatTableDataSource(
      this.usersList.filter((user) =>
        this.selectedUserStatus === 'blocked' ? user.blocked : user
      )
    );

    this.getPaginatorFirstPage();
    this.usersMatTableDataSource.sort = this.sort;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  public isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.usersMatTableDataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  public toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.usersMatTableDataSource.data);
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

  private getPaginatorFirstPage() {
    if (this.usersMatTableDataSource.paginator) {
      this.usersMatTableDataSource.paginator.firstPage();
    } else {
      this.usersMatTableDataSource.paginator = this.paginator;
    }
  }
}
