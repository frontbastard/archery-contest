import { Observable } from 'rxjs';

export interface ISearchRequest<TFilter> {//TODO: я пропоную видалити суфікс "I", і так ясно що в ангулярі інтерфейси використовуються для об'єкту з даними
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
