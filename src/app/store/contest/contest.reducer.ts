import { Action, createReducer, on } from '@ngrx/store';
import {
  contestDeleted,
  contestLoaded,
  contestsLoaded,
  contestUpdated,
  deleteContest,
  errorOccurred,
  loadContest,
  loadContests,
  updateContest,
} from './contest.actions';
import { ContestState, initialState } from './contest.state';

const _reducer = createReducer(
  initialState,
  on(loadContest, state => ({
    ...state,
    loadingRequestCounter: state.loadingRequestCounter + 1,
  })),
  on(contestLoaded, (state, action) => ({
    ...state,
    contest: action.data,
    loadingRequestCounter: state.loadingRequestCounter - 1,
  })),
  on(loadContests, state => ({
    ...state,
    loadingRequestCounter: state.loadingRequestCounter + 1,
  })),
  on(contestsLoaded, (state, action) => ({
    ...state,
    contests: action.data,
    loadingRequestCounter: state.loadingRequestCounter - 1,
  })),
  on(updateContest, state => ({
    ...state,
    loadingRequestCounter: state.loadingRequestCounter + 1,
  })),
  on(contestUpdated, state => ({
    ...state,
    loadingRequestCounter: state.loadingRequestCounter - 1,
  })),
  on(deleteContest, state => ({
    ...state,
    loadingRequestCounter: state.loadingRequestCounter + 1,
  })),
  on(contestDeleted, (state, action) => ({
    ...state,
    contests: {
      items: state.contests.items.filter(
        contest => contest._id !== action.data
      ),
      totalCount: state.contests.totalCount - 1,
    },
    loadingRequestCounter: state.loadingRequestCounter - 1,
  })),
  on(errorOccurred, state => ({
    ...state,
    loadingRequestCounter: state.loadingRequestCounter - 1,
  }))
);

export const contestReducer = (
  state: ContestState,
  action: Action
): ContestState => _reducer(state, action);

export const contestFeatureKey = 'contest';
