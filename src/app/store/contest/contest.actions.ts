import { createAction, props } from '@ngrx/store';
import { ActionRequestPayload } from 'src/app/models/base/action-request-payload';
import { ActionResponsePayload } from 'src/app/models/base/action-response-payload';
import { SearchRequest } from 'src/app/models/base/search-request';
import { SearchResponse } from 'src/app/models/base/search-response';
import { Contest, ContestFilterModel } from 'src/app/models/contest.model';
import { UserActions } from '../user/user.actions';

export enum ContestActions {
  addContest = '[Contest] Add Contest',
  contestAdded = '[Contest] Contest Added',
  loadContest = '[Contest] Load Contest',
  contestLoaded = '[Contest] Contest Loaded',
  loadContests = '[Contest] Load Contests',
  contestsLoaded = '[Contest] Contests Loaded',
  toggleHidden = '[Contest] Toggle Hidden',
  hiddenToggled = '[Contest] Hidden Toggled',
  updateContest = '[Contest] Update Contest',
  contestUpdated = '[Contest] Contest Updated',
  deleteContest = '[Contest] Delete Contest',
  contestDeleted = '[Contest] Contest Deleted',
  errorOccurred = '[Contest] Error Occurred',
}

export const addContest = createAction(
  ContestActions.addContest,
  props<ActionRequestPayload<Contest>>()
);

export const contestAdded = createAction(
  ContestActions.contestAdded,
  props<ActionResponsePayload<Contest>>()
);

export const loadContest = createAction(
  ContestActions.loadContest,
  props<ActionRequestPayload<string>>()
);

export const contestLoaded = createAction(
  ContestActions.contestLoaded,
  props<ActionResponsePayload<Contest>>()
);

export const loadContests = createAction(
  ContestActions.loadContests,
  props<ActionRequestPayload<SearchRequest<ContestFilterModel>>>()
);

export const contestsLoaded = createAction(
  ContestActions.contestsLoaded,
  props<ActionResponsePayload<SearchResponse<Contest>>>()
);

export const updateContest = createAction(
  ContestActions.updateContest,
  props<ActionRequestPayload<Contest>>()
);

export const contestUpdated = createAction(
  ContestActions.contestUpdated,
  props<ActionResponsePayload<Contest>>()
);

export const deleteContest = createAction(
  ContestActions.deleteContest,
  props<ActionRequestPayload<string>>()
);

export const contestDeleted = createAction(
  ContestActions.contestDeleted,
  props<ActionResponsePayload<string>>()
);

export const errorOccurred = createAction(UserActions.errorOccurred);
