import https = require('https');
import request = require('request');

import { User } from './config_types';

export interface Token {
    token: string | null;
    refreshed: boolean;
}

export interface Authenticator {
    isAuthProvider(user: User): boolean;
    applyAuthentication(user: User, opts: request.Options | https.RequestOptions): Promise<boolean>;
}
