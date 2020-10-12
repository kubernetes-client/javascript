import { ListWatch } from './cache';
import { KubeConfig } from './config';
import { KubernetesListObject, KubernetesObject } from './types';
import { Watch } from './watch';

import http = require('http');

export type ObjectCallback<T extends KubernetesObject> = (obj: T) => void;
export type ListCallback<T extends KubernetesObject> = (list: T[], ResourceVersion: string) => void;
export type ListPromise<T extends KubernetesObject> = () => Promise<{
    response: http.IncomingMessage;
    body: KubernetesListObject<T>;
}>;

export const ADD: string = 'add';
export const UPDATE: string = 'update';
export const DELETE: string = 'delete';
export const ERROR: string = 'error';

export interface Informer<T> {
    on(verb: string, fn: ObjectCallback<T>): void;
    off(verb: string, fn: ObjectCallback<T>): void;
    start(): Promise<void>;
}

export function makeInformer<T>(
    kubeconfig: KubeConfig,
    path: string,
    listPromiseFn: ListPromise<T>,
): Informer<T> {
    const watch = new Watch(kubeconfig);
    return new ListWatch<T>(path, watch, listPromiseFn, false);
}
