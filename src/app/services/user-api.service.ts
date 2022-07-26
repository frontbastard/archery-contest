import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionRequestPayload, ISearchResponse } from '../models/core';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private readonly usersApiUrl = 'api/users';

  constructor(private httpClient: HttpClient) {}

  public getAll(): Observable<ISearchResponse<IUser>> {
    const url = this.usersApiUrl;
    return this.httpClient.get<ISearchResponse<IUser>>(url);
  }

  public getById() {

  }

  public create() {}

  public update() {}

  public toggleDisabled() {}

  public delete(id: ActionRequestPayload<string>): Observable<Object> {
    const url = `${this.usersApiUrl}/${id}`;
    return this.httpClient.delete(url);
  }
}
