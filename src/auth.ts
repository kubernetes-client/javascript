import { User } from './config_types';

interface CredentialsBase {
    expirationTimestamp?: string;
}

export interface TokenCredentials extends CredentialsBase {
    type: 'token';
    token: string;
}

export interface ClientCertCredentials extends CredentialsBase {
    type: 'client-cert';
    clientCertificateData: string;
    clientKeyData: string;
}

export type Credentials = TokenCredentials | ClientCertCredentials;

export abstract class Authenticator {
    protected cache: { [key: string]: Credentials };

    constructor() {
        this.cache = {};
    }

    public clearCache() {
        this.cache = {};
    }

    public abstract isAuthProvider(user: User): boolean;
    public abstract getCredentials(user: User): Credentials | null;
}
