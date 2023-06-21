import https = require('https');

import { User } from './config_types';
import WebSocket = require('isomorphic-ws');

export interface Authenticator {
    isAuthProvider(user: User): boolean;
    applyAuthentication(user: User, opts: https.RequestOptions | WebSocket.ClientOptions): Promise<void>;
}
