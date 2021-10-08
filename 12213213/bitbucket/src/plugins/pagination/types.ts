export type APIClient = import('../../client/types').APIClient
export type Response<T> = import('../../request/types').Response<T>
export type PaginatedResponseData<
  T
> = import('../../request/types').PaginatedResponseData<T>

export type Direction = 'next' | 'previous'
