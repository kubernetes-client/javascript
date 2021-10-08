import { AuthenticateOptions } from '../../src/plugins/authenticate/types'

declare module 'bitbucket' {
  export interface APIClient {
    authenticate(options: AuthenticateOptions): void
  }
}

declare module 'bitbucket/lib/minimal' {
  export interface APIClient {
    authenticate(options: AuthenticateOptions): void
  }
}
