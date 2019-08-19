import https = require('https');
import request = require('request');

import { User } from './config_types';

export interface Authenticator {
    isAuthProvider(user: User): boolean;
    // TODO: Deprecate this and roll it into applyAuthentication
    getToken(user: User): string | null;
    applyAuthentication(user: User, opts: request.Options | https.RequestOptions): Promise<void>;
}
