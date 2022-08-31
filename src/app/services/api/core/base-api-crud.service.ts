import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchRequest } from '../../../models/base/search-request';
import { SearchResponse } from '../../../models/base/search-response';
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
    request: SearchRequest<TFilter>,
    cancellationSubject: Observable<void>
  ): Observable<SearchResponse<TSearchResult>> {
    return this.httpApiService.get<SearchResponse<TSearchResult>>(
      this.rootRoute,
      request,
      cancellationSubject
    );
  }

  public create(
    payload: TCreate,
    cancellationSubject: Observable<void>
  ): Observable<TCreateResult> {
    return this.httpApiService.post<TCreateResult>(
      this.rootRoute,
      payload,
      cancellationSubject
    );
  }

  public update(
    id: TID,
    payload: TUpdate,
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
