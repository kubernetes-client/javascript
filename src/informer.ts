import { KubernetesObject } from './types';

export type ObjectCallback<T extends KubernetesObject> = (obj: T) => void;

export interface Informer<T> {
    on(verb: string, fn: ObjectCallback<T>);
}