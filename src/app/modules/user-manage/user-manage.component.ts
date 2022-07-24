import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { IUser, IUserFilterModel } from 'src/app/models/user.model';
import { Store } from '@ngrx/store';
import { IUserState } from 'src/app/store/user/user.state';
import { loadUsers, deleteUser } from 'src/app/store/user/user.actions';
import {
  selectIsUserStateLoading,
  selectUsers,
} from 'src/app/store/user/user.selectors';
import { ActionRequestPayload, ISearchRequest } from 'src/app/models/core';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss'],
})
export class UserManageComponent implements OnInit {
  public usersList: IUser[] = [];
  public isLoading = false;

  constructor(private store: Store<IUserState>) {}

  ngOnInit(): void {
    this.store.select(selectUsers).subscribe((users) => {
      this.usersList = users.items;
    });

    this.store.select(selectIsUserStateLoading).subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
    this.store.dispatch(
      loadUsers({} as ActionRequestPayload<ISearchRequest<IUserFilterModel>>)
    );
  }

  onDeleteUser($id: ActionRequestPayload<string>): void {
    this.store.dispatch(deleteUser($id));
  }
}
