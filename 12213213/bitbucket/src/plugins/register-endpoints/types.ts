export type APIClient = import('../../client/types').APIClient
export type Options = import('../../client/types').Options
export type EndpointDefaults = import('../../endpoint/types').EndpointDefaults
export type Headers = import('../../endpoint/types').Headers
export type RequestMethod = import('../../endpoint/types').RequestMethod
export type RequestOptions = import('../../endpoint/types').RequestOptions

export type Routes = {
  [namespace: string]: {
    [endpoint: string]: {
      accepts?: string[]
      alias?: string
      deprecated?: boolean
      headers?: Headers
      method?: RequestMethod
      params?: {
        [param: string]: {
          enum?: string[]
          required?: boolean
          schema?: string
          type: string
        }
      }
      returns?: string
      url?: string
    }
  }
}
