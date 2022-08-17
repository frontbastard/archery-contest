export interface IUser {
  _id: string;
  email: string;
  name: string;
  dateOfBirth: Date;
  role: string;//TODO: what about role id?
  blocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserFilterModel {
  blocked: boolean;
}
