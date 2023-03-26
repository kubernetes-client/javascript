import https = require('https');

import { User } from './config_types';

export interface Authenticator {
    isAuthProvider(user: User): boolean;
    applyAuthentication(user: User, opts: https.RequestOptions): Promise<void>;
}
