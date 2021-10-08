export type Headers = import('../endpoint/types').Headers
export type RequestOptions = import('../endpoint/types').RequestOptions

export abstract class HTTPError extends Error {
  public error!: any | undefined
  public headers!: Headers | undefined
  public request!: RequestOptions | undefined
  public status!: number
}
