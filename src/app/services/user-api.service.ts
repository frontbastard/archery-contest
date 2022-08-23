import { Injectable } from '@angular/core';
import { User, UserFilterModel } from '../models/user.model';
import { BaseApiCrudService } from './base-api-crud.service';

@Injectable({
  providedIn: 'root',
})
export class UserApiService extends BaseApiCrudService<
  string,
  User,
  User,
  void,
  User,
  void,
  UserFilterModel,
  User
> {
  rootRoute = 'users';
}
