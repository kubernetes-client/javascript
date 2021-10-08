import {
  APIClient as _APIClient,
  APIClientFactory,
  APIEndpoints,
} from './bitbucket'

export { APIEndpoints, Params, Schema } from './bitbucket'

export interface APIClient extends _APIClient, APIEndpoints {}

export declare const Bitbucket: APIClientFactory<APIClient>
