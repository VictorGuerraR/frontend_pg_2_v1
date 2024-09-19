export interface Paginacion<T> {
  results: T | any[];
  pageInformation: {
    currentPage: number;
    nextPage: number | null;
    previousPage: number | null;
    totalElements: number;
    totalPages: number;
  };
}
