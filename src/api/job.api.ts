export interface ApiResponse<T> {
  data: T;
  meta: {
    total: number;
    page: number;
  };
  status: number;
}