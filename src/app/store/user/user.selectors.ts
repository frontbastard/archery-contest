import { createFeatureSelector, createSelector } from '@ngrx/store';
import { userFeatureKey } from './user.reducer';
import { IUserState } from './user.state';

export const selectUserState =
  createFeatureSelector<IUserState>(userFeatureKey);

export const selectUser = createSelector(
  selectUserState,
  (state: IUserState) => state.user
);

export const selectUsers = createSelector(
  selectUserState,
  (state: IUserState) => state.users
);

export const selectIsUserStateLoading = createSelector(
  selectUserState,
  (state: IUserState) => state.loadingRequestCounter > 0
);
