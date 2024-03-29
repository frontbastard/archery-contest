import { createAction, props } from '@ngrx/store';
import { ActionRequestPayload } from 'src/app/models/base/action-request-payload';
import { ActionResponsePayload } from 'src/app/models/base/action-response-payload';
import { SearchRequest } from 'src/app/models/base/search-request';
import { SearchResponse } from 'src/app/models/base/search-response';
import { User, UserFilterModel } from 'src/app/models/user.model';

export enum UserActions {
  // ADD_USER = '[User] Add User',

  preloadUser = '[User] Preload User',
  userPreloaded = '[User] User Preloaded',

  loadUser = '[User] Load User',
  userLoaded = '[User] User Loaded',

  loadUsers = '[User] Load Users',
  usersLoaded = '[User] Users Loaded',

  toggleDisabled = '[User] Toggle Disabled',
  disableToggled = '[User] Disable Toggled',

  updateUser = '[User] Update User',
  userUpdated = '[User] User Updated',

  deleteUser = '[User] Delete User',
  userDeleted = '[User] User Deleted',

  errorOccurred = '[User] Error Occurred',
}

// export class AddUser implements Action {
//   readonly type = UserActions.ADD_USER;

//   constructor(public payload: User) {}
// }

export const preloadUser = createAction(
  UserActions.preloadUser,
  props<ActionRequestPayload<string>>()
);
export const userPreloaded = createAction(
  UserActions.userPreloaded,
  props<ActionRequestPayload<User>>()
);

export const loadUser = createAction(
  UserActions.loadUser,
  props<ActionRequestPayload<string>>()
);
export const userLoaded = createAction(
  UserActions.userLoaded,
  props<ActionResponsePayload<User>>()
);

export const loadUsers = createAction(
  UserActions.loadUsers,
  props<ActionRequestPayload<SearchRequest<UserFilterModel>>>()
);
export const usersLoaded = createAction(
  UserActions.usersLoaded,
  props<ActionResponsePayload<SearchResponse<User>>>()
);

export const updateUser = createAction(
  UserActions.updateUser,
  props<ActionRequestPayload<User>>()
);
export const userUpdated = createAction(
  UserActions.userUpdated,
  props<ActionResponsePayload<User>>()
);

export const deleteUser = createAction(
  UserActions.deleteUser,
  props<ActionRequestPayload<string>>()
);
export const userDeleted = createAction(
  UserActions.userDeleted,
  props<ActionResponsePayload<string>>()
);

export const errorOccurred = createAction(UserActions.errorOccurred);
