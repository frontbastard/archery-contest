import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISearchRequest, ISearchResponse } from '../models/core';
import { HttpApiService } from './http-api.service';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseApiCrudService<
  TID,
  TModel,
  TCreate extends object,
  TCreateResult,
  TUpdate extends object,
  TUpdateResult,
  TFilter,
  TSearch
> {
  protected constructor(protected httpApiService: HttpApiService) {}

  protected abstract rootRoute: string;

  public getById(
    id: TID,
    cancellecionSubject: Observable<void>
  ): Observable<TModel> {
    return this.httpApiService.get<TModel>(
      this.rootRoute,
      id,
      cancellecionSubject
    );
  }

  public search(
    request: ISearchRequest<TFilter>,
    cancellecionSubject: Observable<void>
  ): Observable<ISearchResponse<TSearch>> {
    return this.httpApiService.get<ISearchResponse<TSearch>>(
      this.rootRoute,
      request,
      cancellecionSubject
    );
  }

  public create() {}

  public update() {}

  public delete(
    id: TID,
    cancellecionSubject: Observable<void>
  ): Observable<void> {
    return this.httpApiService.delete<void>(
      this.rootRoute,
      id,
      cancellecionSubject
    );
  }
}
