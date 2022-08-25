export interface SearchRequest<TFilter> {
  searchTerm: string;
  sortTerm: string;
  sortAsc: string;
  pageIndex: number;
  pageSize: number;
  filter: TFilter;
}
