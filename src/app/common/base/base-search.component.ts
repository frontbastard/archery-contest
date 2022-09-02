import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { SearchRequest } from 'src/app/models/base/search-request';
import { SearchResponse } from 'src/app/models/base/search-response';
import { PAGE_SIZE_OPTIONS } from '../app-constants';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseSearchComponent<TModel, TFilter> {
  public request: SearchRequest<TFilter> = {
    searchTerm: null,
    sortTerm: null,
    sortAsc: false,
    pageIndex: 0,
    pageSize: PAGE_SIZE_OPTIONS[0],
    filter: {} as TFilter,
  };
  public result = {} as SearchResponse<TModel>;

  public get isItemsInitialized(): boolean {
    return this.result.items !== null;
  }

  public get notFoundMessage(): string {
    return this.searchInput.nativeElement.value.length
      ? 'elements.search.nothingFound'
      : 'common.notFound';
  }

  @ViewChild('searchInput') searchInput: ElementRef;
}
