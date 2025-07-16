export type PaginationResponse<TData> = {
  first: number
  last: number
  current: number
  next: number | null
  prev: number | null
  total: number
  data: TData
}
