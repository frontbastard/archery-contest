import { Injectable } from '@angular/core';
import { User, UserFilterModel } from 'src/app/models/user.model';
import { BaseApiCrudService } from './core/base-api-crud.service';

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
