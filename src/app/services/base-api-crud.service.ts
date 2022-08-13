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
  TSearchResult
> {
  protected constructor(protected httpApiService: HttpApiService) {}

  protected abstract rootRoute: string;

  public getById(
    id: TID,
    cancellationSubject: Observable<void>
  ): Observable<TModel> {
    return this.httpApiService.get<TModel>(
      this.rootRoute,
      id,
      cancellationSubject
    );
  }

  public search(
    request: ISearchRequest<TFilter>,
    cancellationSubject: Observable<void>
  ): Observable<ISearchResponse<TSearchResult>> {
    return this.httpApiService.get<ISearchResponse<TSearchResult>>(
      this.rootRoute,
      request,
      cancellationSubject
    );
  }

  public create() {}

  public update(
    id: TID,
    payload,
    cancellationSubject
  ): Observable<TUpdateResult> {
    return this.httpApiService.put<TUpdateResult>(
      `${this.rootRoute}/${id}`,
      payload,
      cancellationSubject
    );
  }

  public delete(
    id: TID,
    cancellationSubject: Observable<void>
  ): Observable<void> {
    return this.httpApiService.delete<void>(
      this.rootRoute,
      id,
      cancellationSubject
    );
  }
}
