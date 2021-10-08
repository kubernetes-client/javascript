export type Endpoint = import('../endpoint/types').Endpoint
export type EndpointDefaults = import('../endpoint/types').EndpointDefaults
export type EndpointOptions = import('../endpoint/types').EndpointOptions
export type EndpointParams = import('../endpoint/types').EndpointParams
export type Headers = import('../endpoint/types').Headers

export interface Response<T> {
  data: T
  headers: Headers & {
    date?: string
    etag?: string
    'x-accepted-oauth-scopes'?: string
  }
  status: number
  url: string
}

export type PaginatedResponseData<T> = Response<T>['data'] & {
  next?: string
  previous?: string
}

export interface Request {
  (endpointRoute: string, endpointOptions?: EndpointParams): Promise<
    Response<any>
  >
  (endpointOptions: EndpointOptions): Promise<Response<any>>
  defaults(endpointOptions: EndpointParams): Request
  endpoint: Endpoint
}
