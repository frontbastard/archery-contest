export interface IUser {
  id: number;
  email: string;
  name: string;
  blocked: boolean;
  createdAt: Date;
}

export interface IUserFilterModel {}
