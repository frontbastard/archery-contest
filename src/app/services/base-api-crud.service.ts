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
  TCreateModel extends object,
  TCreateResult,
  TUpdate extends object,
  TUpdateResult,
  TFilterModel,
  TSearchModel
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
    request: ISearchRequest<TFilterModel>,
    cancellecionSubject: Observable<void>
  ): Observable<ISearchResponse<TSearchModel>> {
    return this.httpApiService.get<ISearchResponse<TSearchModel>>(
      this.rootRoute,
      request,
      cancellecionSubject
    );
  }

  public create() {

  }

  public update() {

  }

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
