import { V1ListMeta, V1ObjectMeta } from './api.js';

export interface KubernetesObject {
    apiVersion?: string;
    kind?: string;
    metadata?: V1ObjectMeta;
}

export interface KubernetesListObject<T extends KubernetesObject> {
    apiVersion?: string;
    kind?: string;
    metadata?: V1ListMeta;
    items: T[];
}

export type YamlParseOptions = {
    version?: '1.1' | '1.2';
    maxAliasCount?: number;
    prettyErrors?: boolean;
    keepCstNodes?: boolean;
    keepNodeTypes?: boolean;
    logLevel?: 'silent' | 'error' | 'warn';
};

export type IntOrString = number | string;

export class V1MicroTime extends Date {
    public toISOString(): string {
        return super.toISOString().slice(0, -1) + '000Z';
    }
}
