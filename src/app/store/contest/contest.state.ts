import { SearchResponse } from 'src/app/models/base/search-response';
import { Contest } from 'src/app/models/contest.model';

export interface ContestState {
  contest: Contest;
  contests: SearchResponse<Contest>;
  loadingRequestCounter: number;
}

export const initialState: ContestState = {
  contest: null,
  contests: { totalCount: 0, items: null },
  loadingRequestCounter: 0,
};
