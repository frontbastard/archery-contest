export interface IUser {
  _id: string;
  email: string;
  name: string;
  dateOfBirth: Date;
  role: string;
  blocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserFilterModel {
  blocked: boolean;
}
