export interface IUser {
  _id: string;
  email: string;
  name: string;
  role: string;
  blocked: boolean;
  createdAt: Date;
}

export interface IUserFilterModel {
  blocked: boolean;
}
