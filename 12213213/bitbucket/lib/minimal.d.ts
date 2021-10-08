import { APIClient as _APIClient, APIClientFactory } from './bitbucket'

export interface APIClient extends _APIClient {}

export declare const Bitbucket: APIClientFactory<APIClient>
