import { Authenticator, TokenCredentials } from './auth';
import { User } from './config_types';

export class OpenIDConnectAuth extends Authenticator {
    public isAuthProvider(user: User): boolean {
        if (!user.authProvider) {
            return false;
        }
        return user.authProvider.name === 'oidc';
    }

    public getCredentials(user: User): TokenCredentials | null {
        if (!user.authProvider.config || !user.authProvider.config['id-token']) {
            return null;
        }
        // TODO: Handle expiration and refresh here...
        return {
            type: 'token',
            token: user.authProvider.config['id-token'],
        };
    }
}
