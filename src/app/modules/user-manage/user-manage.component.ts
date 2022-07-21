import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { IUser, IUserFilterModel } from 'src/app/models/user.model';
import { Store } from '@ngrx/store';
import { IUserState } from 'src/app/store/user/user.state';
import { loadUsers } from 'src/app/store/user/user.actions';
import { selectUsers } from 'src/app/store/user/user.selectors';
import { ActionRequestPayload, ISearchRequest } from 'src/app/models/core';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss'],
})
export class UserManageComponent implements OnInit {
  public usersList: IUser[] = [];

  constructor(private store: Store<IUserState>) {}

  ngOnInit(): void {
    this.store.select(selectUsers).subscribe((users) => {
      this.usersList = users.items;
      console.log(users);

    });
    this.store.dispatch(loadUsers({} as ActionRequestPayload<ISearchRequest<IUserFilterModel>>));
  }
}
