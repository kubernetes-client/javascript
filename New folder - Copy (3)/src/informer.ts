import { ListWatch } from './cache';
import { KubeConfig } from './config';
import { KubernetesListObject, KubernetesObject } from './types';
import { Watch } from './watch';

import http = require('http');

export type ObjectCallback<T extends KubernetesObject> = (obj: T) => void;
export type ErrorCallback = (err?: any) => void;
export type ListCallback<T extends KubernetesObject> = (list: T[], ResourceVersion: string) => void;
export type ListPromise<T extends KubernetesObject> = () => Promise<{
    response: http.IncomingMessage;
    body: KubernetesListObject<T>;
}>;

// These are issued per object
export const ADD: string = 'add';
export const UPDATE: string = 'update';
export const CHANGE: string = 'change';
export const DELETE: string = 'delete';

// This is issued when a watch connects or reconnects
export const CONNECT: string = 'connect';
// This is issued when there is an error
export const ERROR: string = 'error';

export interface Informer<T> {
    on(verb: string, fn: ObjectCallback<T>): void;
    off(verb: string, fn: ObjectCallback<T>): void;
    start(): Promise<void>;
    stop(): Promise<void>;
}

export function makeInformer<T>(
    kubeconfig: KubeConfig,
    path: string,
    listPromiseFn: ListPromise<T>,
    labelSelector?: string,
): Informer<T> {
    const watch = new Watch(kubeconfig);
    return new ListWatch<T>(path, watch, listPromiseFn, false, labelSelector);
}
