import { createFeatureSelector, createSelector } from '@ngrx/store';
import { userFeatureKey } from './user.reducer';
import { UserState } from './user.state';

export const selectUserState = createFeatureSelector<UserState>(userFeatureKey);

export const selectUser = createSelector(
  selectUserState,
  (state: UserState) => state.user
);

export const selectUsers = createSelector(
  selectUserState,
  (state: UserState) => state.users
);

export const selectIsUserStateLoading = createSelector(
  selectUserState,
  (state: UserState) => state.loadingRequestCounter > 0
);
