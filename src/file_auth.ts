import fs from 'node:fs';
import https from 'node:https';

import { Authenticator } from './auth.js';
import { User } from './config_types.js';

export class FileAuth implements Authenticator {
    private token: string | null = null;
    private lastRead: Date | null = null;

    public isAuthProvider(user: User): boolean {
        return user.authProvider && user.authProvider.config && user.authProvider.config.tokenFile;
    }

    public async applyAuthentication(user: User, opts: https.RequestOptions): Promise<void> {
        if (this.token == null) {
            this.refreshToken(user.authProvider.config.tokenFile);
        }
        if (this.isTokenExpired()) {
            this.refreshToken(user.authProvider.config.tokenFile);
        }
        if (this.token) {
            opts.headers!['Authorization'] = `Bearer ${this.token}`;
        }
    }

    private refreshToken(filePath: string): void {
        // TODO make this async?
        this.token = fs.readFileSync(filePath).toString('utf-8');
        this.lastRead = new Date();
    }

    private isTokenExpired(): boolean {
        if (this.lastRead === null) {
            return true;
        }
        const now = new Date();
        const delta = (now.getTime() - this.lastRead.getTime()) / 1000;
        // For now just refresh every 60 seconds. This is imperfect since the token
        // could be out of date for this time, but it is unlikely and it's also what
        // the client-go library does.
        // TODO: Use file notifications instead?
        return delta > 60;
    }
}
