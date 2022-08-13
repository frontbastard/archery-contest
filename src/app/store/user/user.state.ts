import { ISearchResponse } from 'src/app/models/core';
import { IUser } from 'src/app/models/user.model';

export interface IUserState {
  user: IUser;
  users: ISearchResponse<IUser>;
  loadingRequestCounter: number;
}

export const initialState: IUserState = {
  user: null,
  users: { totalCount: 0, items: null },
  loadingRequestCounter: 0,
};
