import { Action, createReducer, on } from '@ngrx/store';
import {
  errorOccured,
  loadUsers,
  usersLoaded,
  deleteUser,
  userDeleted,
  updateUser,
  userUpdated,
} from './user.actions';
import { initialState, IUserState } from './user.state';

const _reducer = createReducer(
  initialState,
  on(loadUsers, state => ({
    ...state,
    loadingRequestCounter: state.loadingRequestCounter + 1,
  })),
  on(usersLoaded, (state, action) => ({
    ...state,
    users: action.data,
    loadingRequestCounter: state.loadingRequestCounter - 1,
  })),
  on(errorOccured, state => ({
    ...state,
    loadingRequestCounter: state.loadingRequestCounter - 1,
  })),
  on(updateUser, state => ({
    ...state,
    loadingRequestCounter: state.loadingRequestCounter + 1,
  })),
  on(userUpdated, state => ({
    ...state,
    loadingRequestCounter: state.loadingRequestCounter - 1,
  })),
  on(deleteUser, state => ({
    ...state,
    loadingRequestCounter: state.loadingRequestCounter + 1,
  })),
  on(userDeleted, (state, action) => ({
    ...state,
    users: {
      items: state.users.items.filter(user => user._id !== action.data),
      totalCount: state.users.totalCount - 1,
    },
    loadingRequestCounter: state.loadingRequestCounter - 1,
  }))
);

export const userReducer = (state: IUserState, action: Action): IUserState =>
  _reducer(state, action);

export const userFeatureKey = 'user';
