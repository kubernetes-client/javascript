import https = require('https');
import request = require('request');

import { User } from './config_types';

export interface Authenticator {
    isAuthProvider(user: User): boolean;
    applyAuthentication(user: User, opts: request.Options | https.RequestOptions): Promise<void>;
}
