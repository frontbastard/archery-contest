import { SelectionModel } from '@angular/cdk/collections';
import { EventEmitter, OnChanges, Output } from '@angular/core';
import {
  AfterViewInit,
  Component,
  Input,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IUser } from '../../../models/user.model';
import { UserRoutes } from 'src/app/common/routes';
import { ActionRequestPayload } from 'src/app/models/core';

@Component({
  selector: 'app-user-manage-list',
  templateUrl: './user-manage-list.component.html',
  styleUrls: ['./user-manage-list.component.scss'],
})
export class UserManageListComponent implements OnChanges, AfterViewInit {
  // public usersList: IUser[] = [];
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

  @Input() usersList: IUser[] = [];
  @Output() deleteUser = new EventEmitter<ActionRequestPayload<string>>()
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnChanges(): void {
    this.usersDataSource = new MatTableDataSource<IUser>(
      this.usersList
    );
    this.updateUsersDataSource();
  }

  ngAfterViewInit(): void {
    this.updateUsersDataSource();
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.usersDataSource.filter =
      filterValue.length < 2 ? '' : filterValue.trim().toLowerCase();

    this.getPaginatorFirstPage();
  }

  public userStatusChanged(event: Event): void {
    this.selectedUserStatus = (event.target as HTMLSelectElement).value;

    this.usersDataSource = new MatTableDataSource(
      this.usersList.filter((user) =>
        this.selectedUserStatus === 'blocked' ? user.blocked : user
      )
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

  private updateUsersDataSource(): void {
    this.usersDataSource.paginator = this.paginator;
    this.usersDataSource.sort = this.sort;
  }

  private getPaginatorFirstPage(): void {
    if (this.usersDataSource.paginator) {
      this.usersDataSource.paginator.firstPage();
    } else {
      this.usersDataSource.paginator = this.paginator;
    }
  }
}
