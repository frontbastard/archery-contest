import { SearchResponse } from 'src/app/models/base/search-response';
import { User } from 'src/app/models/user.model';

export interface UserState {
  user: User;
  users: SearchResponse<User>;
  loadingRequestCounter: number;
}

export const initialState: UserState = {
  user: null,
  users: { totalCount: 0, items: null },
  loadingRequestCounter: 0,
};
