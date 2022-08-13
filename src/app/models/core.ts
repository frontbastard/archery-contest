import { Observable } from 'rxjs';

export interface ISearchRequest<TFilter> {
  searchTerm: string;
  sortTerm: string;
  sortAsc: string;
  pageIndex: number;
  pageSize: number;
  filter: TFilter;
}

export interface ISearchResponse<TModel> {
  items: TModel[];
  totalCount: number;
}

export class ActionRequestPayload<T> {
  constructor(
    public data: T,
    public cancellationObservable: Observable<void>
  ) {}
}

export class ActionResponsePayload<T> {
  constructor(public data: T) {}
}
