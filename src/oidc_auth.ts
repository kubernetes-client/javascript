import { Authenticator, TokenCredential } from './auth';
import { User } from './config_types';

export class OpenIDConnectAuth extends Authenticator {
    public isAuthProvider(user: User): boolean {
        if (!user.authProvider) {
            return false;
        }
        return user.authProvider.name === 'oidc';
    }

    public getCredential(user: User): TokenCredential | null {
        if (!user.authProvider.config || !user.authProvider.config['id-token']) {
            return null;
        }
        // TODO: Handle expiration and refresh here...
        return {
            token: user.authProvider.config['id-token'],
        };
    }
}
