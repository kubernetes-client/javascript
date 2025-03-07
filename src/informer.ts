import { ListWatch } from './cache.js';
import { KubeConfig } from './config.js';
import { KubernetesListObject, KubernetesObject } from './types.js';
import { Watch } from './watch.js';

export type ObjectCallback<T extends KubernetesObject> = (obj: T) => void;
export type ErrorCallback = (err?: any) => void;
export type ListCallback<T extends KubernetesObject> = (list: T[], ResourceVersion: string) => void;
export type ListPromise<T extends KubernetesObject> = () => Promise<KubernetesListObject<T>>;

// These are issued per object
export const ADD: string = 'add';
export const UPDATE: string = 'update';
export const CHANGE: string = 'change';
export const DELETE: string = 'delete';

// This is issued when a watch connects or reconnects
export const CONNECT: string = 'connect';
// This is issued when there is an error
export const ERROR: string = 'error';

export interface Informer<T extends KubernetesObject> {
    on(verb: string, fn: ObjectCallback<T>): void;
    off(verb: string, fn: ObjectCallback<T>): void;
    start(): Promise<void>;
    stop(): Promise<void>;
}

export function makeInformer<T extends KubernetesObject>(
    kubeconfig: KubeConfig,
    path: string,
    listPromiseFn: ListPromise<T>,
    labelSelector?: string,
): Informer<T> {
    const watch = new Watch(kubeconfig);
    return new ListWatch<T>(path, watch, listPromiseFn, false, labelSelector);
}
