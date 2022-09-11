import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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
  public readonly PAGE_SIZE_OPTIONS = PAGE_SIZE_OPTIONS;

  public get isItemsInitialized(): boolean {
    return this.result.items !== null;
  }

  @ViewChild('searchInput') searchInput: ElementRef;

  public paginationChanged($event: PageEvent): void {
    this.request.pageIndex = $event.pageIndex;
    this.request.pageSize = $event.pageSize;
    this._refreshList();
  }

  public sortChanged({ active, direction }) {
    this.request.sortTerm = active;
    this.request.sortAsc = direction;
    this._refreshList();
  }

  public searchChanged(): void {
    if (this.request.searchTerm.length === 1) {
      return;
    }
    this._refreshList();
  }

  protected _refreshList(): void {
    if (
      this.result.totalCount / this.request.pageSize <=
      this.request.pageIndex
    ) {
      this.request.pageIndex = 0;
    }
  }
}
