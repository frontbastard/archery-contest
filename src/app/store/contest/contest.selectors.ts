import { createFeatureSelector, createSelector } from '@ngrx/store';
import { contestFeatureKey } from './contest.reducer';
import { ContestState } from './contest.state';

export const selectContestState =
  createFeatureSelector<ContestState>(contestFeatureKey);

export const selectContest = createSelector(
  selectContestState,
  (state: ContestState) => state.contest
);

export const selectContests = createSelector(
  selectContestState,
  (state: ContestState) => state.contests
);

export const selectIsContestStateLoading = createSelector(
  selectContestState,
  (state: ContestState) => state.loadingRequestCounter > 0
);
