export interface IUser {
  _id: string;
  email: string;
  name: string;
  role: string;
  blocked: boolean;
  createdAt: Date;
}

export interface IUserStatus {
  value: string,
  viewValue: string,
}

export interface IUserFilterModel {}
