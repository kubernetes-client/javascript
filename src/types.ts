import { V1ListMeta, V1ObjectMeta } from './api';

export interface KubernetesObject {
    apiVersion?: string;
    kind?: string;
    metadata?: V1ObjectMeta;
}

export interface KubernetesObjectWithSpec extends KubernetesObject {
    spec: object;
}

export interface KubernetesListObject<T extends KubernetesObject> {
    apiVersion?: string;
    kind?: string;
    metadata?: V1ListMeta;
    items: T[];
}

export type IntOrString = number | string;

export class V1MicroTime extends Date {
    public toISOString(): string {
        return super.toISOString().slice(0, -1) + '000Z';
    }
}
