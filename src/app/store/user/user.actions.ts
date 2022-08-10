import { createAction, props } from '@ngrx/store';
import {
  ActionRequestPayload,
  ActionResponsePayload,
  ISearchRequest,
  ISearchResponse,
} from 'src/app/models/core';
import { IUser, IUserFilterModel } from 'src/app/models/user.model';

export enum UserActions {
  loadUsers = '[User] Load Users',
  usersLoaded = '[User] Users Loaded',
  toggleDisabled = '[User] Toggle Disabled',
  disableToggled = '[User] Disable Toggled',
  // ADD_USER = '[User] Add User',
  updateUser = '[User] Update User',
  userUpdated = '[User] User Updated',
  deleteUser = '[User] Delete User',
  userDeleted = '[User] User Deleted',
  errorOccured = '[User] Error Occured',
}

export const loadUsers = createAction(
  UserActions.loadUsers,
  props<ActionRequestPayload<ISearchRequest<IUserFilterModel>>>()
);

export const usersLoaded = createAction(
  UserActions.usersLoaded,
  props<ActionResponsePayload<ISearchResponse<IUser>>>()
);

// export class AddUser implements Action {
//   readonly type = UserActions.ADD_USER;

//   constructor(public payload: User) {}
// }

export const updateUser = createAction(
  UserActions.updateUser,
  props<ActionRequestPayload<IUser>>()
);

export const userUpdated = createAction(
  UserActions.userUpdated,
  props<ActionRequestPayload<IUser>>()
);

export const deleteUser = createAction(
  UserActions.deleteUser,
  props<ActionRequestPayload<string>>()
);

export const userDeleted = createAction(
  UserActions.userDeleted,
  props<ActionResponsePayload<string>>()
);

export const errorOccured = createAction(UserActions.errorOccured);
