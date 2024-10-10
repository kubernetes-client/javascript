import https from 'node:https';

import { User } from './config_types';
import WebSocket from 'isomorphic-ws';

export interface Authenticator {
    isAuthProvider(user: User): boolean;
    applyAuthentication(user: User, opts: https.RequestOptions | WebSocket.ClientOptions): Promise<void>;
}
