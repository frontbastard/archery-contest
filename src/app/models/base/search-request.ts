export interface SearchRequest<TFilter> {
  searchTerm: string;
  sortTerm: string;
  sortAsc: boolean;
  pageIndex: number;
  pageSize: number;
  filter: TFilter;
}
