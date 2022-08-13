import { Injectable } from '@angular/core';
import { IUser, IUserFilterModel } from '../models/user.model';
import { BaseApiCrudService } from './base-api-crud.service';

@Injectable({
  providedIn: 'root',
})
export class UserApiService extends BaseApiCrudService<
  string,
  IUser,
  IUser,
  void,
  IUser,
  void,
  IUserFilterModel,
  IUser
> {
  rootRoute = 'users';
}
