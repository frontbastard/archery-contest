import { IUser, IUserFilterModel } from 'src/app/models/user.model';
import { Action, createAction, props } from '@ngrx/store';
import { ActionRequestPayload, ActionResponsePayload, ISearchRequest, ISearchResponse } from 'src/app/models/core';

export enum UserActions {
  LOAD_USERS = '[User] Load Users',
  USERS_LOADED = '[User] Users Loaded',
  ERROR_OCCURED = '[User] Error Occured',
  // TOGGLE_STATUS = '[User] Toggle Status',
  // ADD_USER = '[User] Add User',
  // UPDATE_USER = '[User] Update User',
  // DELETE_USER = '[User] Delete User',
}

export const loadUsers = createAction(
  UserActions.LOAD_USERS,
  props<ActionRequestPayload<ISearchRequest<IUserFilterModel>>>()
);

export const usersLoaded = createAction(
  UserActions.USERS_LOADED,
  props<ActionResponsePayload<ISearchResponse<IUser>>>()
);

export const errorOccured = createAction(UserActions.ERROR_OCCURED);

// export class ToggleStatus implements Action {
//   readonly type = UserActions.TOGGLE_STATUS;

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

// export class DeleteUser implements Action {
//   readonly type = UserActions.DELETE_USER;
// }

