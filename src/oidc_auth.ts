import { Authenticator } from './auth';
import { User } from './config_types';

export class OpenIDConnectAuth implements Authenticator {
    public isAuthProvider(user: User): boolean {
        if (!user.authProvider) {
            return false;
        }
        return user.authProvider.name === 'oidc';
    }

    public getToken(user: User): string | null {
        if (!user.authProvider.config || !user.authProvider.config['id-token']) {
            return null;
        }
        // TODO: Handle expiration and refresh here...
        // TODO: Extract the 'Bearer ' to config.ts?
        return `Bearer ${user.authProvider.config['id-token']}`;
    }
}
