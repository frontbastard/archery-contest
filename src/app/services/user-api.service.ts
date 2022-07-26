import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionRequestPayload, ISearchResponse } from '../models/core';
import { IUser, IUserFilterModel } from '../models/user.model';
import { BaseApiCrudService } from './base-api-crud.service';
import { HttpApiService } from './http-api.service';

@Injectable({
  providedIn: 'root',
})
export class UserApiService extends BaseApiCrudService<number, IUser, IUser, void, IUser, void, IUserFilterModel, IUser> {
  constructor(public override httpApiService: HttpApiService) {
    super(httpApiService)
  }

  rootRoute = 'users';

  public toggleDisabled(id: ActionRequestPayload<string>, value: boolean): Observable<void> {
    const url = `${this.rootRoute}/${id}`;
    return this.httpApiService.put<void>(url, {
      items: {blocked: value}
    });
  }
}
