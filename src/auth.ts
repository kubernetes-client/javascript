import { User } from './config_types';

interface CredentialBase {
    expirationTimestamp?: string;
}

export interface TokenCredential extends CredentialBase {
    token: string;
}

export interface ClientCertCredential extends CredentialBase {
    clientCertificateData: string;
    clientKeyData: string;
}

export type Credential = TokenCredential | ClientCertCredential;

export function isTokenCredential(c: Credential | null): c is TokenCredential {
    return c !== null && 'token' in c;
}

export function isClientCertCredential(c: Credential | null): c is ClientCertCredential {
    return c !== null && 'clientKeyData' in c && 'clientCertificateData' in c;
}

export abstract class Authenticator {
    protected cache: { [key: string]: Credential };

    constructor() {
        this.cache = {};
    }

    public clearCache() {
        this.cache = {};
    }

    public abstract isAuthProvider(user: User): boolean;
    public abstract getCredential(user: User): Credential | null;
}
