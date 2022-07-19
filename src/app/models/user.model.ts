export interface IUser {
  id: number;
  email: string;
  name: string;
  blocked: boolean;
  date: Date;
}

export class User {
  public id: number;
  public email: string;
  public name: string;
  public blocked: boolean;
  public date: Date;

  constructor(user: IUser) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.blocked = user.blocked;
    this.date = user.date;
  }
}
