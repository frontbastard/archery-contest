import { IUser, IUserFilterModel } from 'src/app/models/user.model';
import { createAction, props } from '@ngrx/store';
import {
  ActionRequestPayload,
  ActionResponsePayload,
  ISearchRequest,
  ISearchResponse,
} from 'src/app/models/core';

export enum UserActions {
  loadUsers = '[User] Load Users',
  usersLoaded = '[User] Users Loaded',
  toggleDisabled = '[User] Toggle Disabled',
  disableToggled = '[User] Disable Toggled',
  // ADD_USER = '[User] Add User',
  // UPDATE_USER = '[User] Update User',
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

// export class ToggleStatus implements Action {
//   readonly type = UserActions.toggleDisabled;

//   constructor(public payload: boolean) {}
// }

// export class AddUser implements Action {
//   readonly type = UserActions.ADD_USER;

//   constructor(public payload: User) {}
// }

// export class UpdateUser implements Action {
//   readonly type = UserActions.UPDATE_USER;

//   constructor(public payload: User) {}
// }

export const deleteUser = createAction(
  UserActions.deleteUser,
  props<ActionRequestPayload<string>>()
);

export const userDeleted = createAction(
  UserActions.userDeleted,
  props<ActionResponsePayload<ISearchResponse<IUser>>>()
);

export const errorOccured = createAction(UserActions.errorOccured);
