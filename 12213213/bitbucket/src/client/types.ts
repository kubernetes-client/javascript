type HookSingular<O, R, E> = import('before-after-hook').HookSingular<O, R, E>
type RequestOptions = import('../endpoint/types').RequestOptions
export type EndpointParams = import('../endpoint/types').EndpointParams
type HTTPError = import('../error/types').HTTPError
type Request = import('../request/types').Request
type Response<T> = import('../request/types').Response<T>

export interface Options {
  [option: string]: any
  baseUrl?: string
  request?: RequestOptions['request']
}

export type RequestHook = HookSingular<RequestOptions, Response<any>, HTTPError>

export interface APIClient {
  [key: string]: any
  request: Request
  requestHook: RequestHook
}

export type Plugin = (client: APIClient, options: Options) => void

export interface APIClientFactory {
  new (options?: Options): APIClient
  (options?: Options): APIClient

  plugins(plugins: Plugin[]): APIClientFactory
}
