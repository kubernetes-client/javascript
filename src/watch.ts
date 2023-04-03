import AbortController from 'abort-controller';
import byline = require('byline');
import { RequestOptions } from 'https';
import fetch from 'node-fetch';
import { URL } from 'url';
import { KubeConfig } from './config';

export class Watch {
    public static SERVER_SIDE_CLOSE: object = { error: 'Connection closed on server' };
    public config: KubeConfig;

    public constructor(config: KubeConfig) {
        this.config = config;
    }

    // Watch the resource and call provided callback with parsed json object
    // upon event received over the watcher connection.
    //
    // "done" callback is called either when connection is closed or when there
    // is an error. In either case, watcher takes care of properly closing the
    // underlaying connection so that it doesn't leak any resources.
    public async watch(
        path: string,
        queryParams: Record<string, string | number | boolean | undefined>,
        callback: (phase: string, apiObj: any, watchObj?: any) => void,
        done: (err: any) => void,
    ): Promise<AbortController> {
        const AbortControllerCtor =
            globalThis.AbortController || (await import('abort-controller')).AbortController;

        const cluster = this.config.getCurrentCluster();
        if (!cluster) {
            throw new Error('No currently active cluster');
        }
        const watchURL = new URL(cluster.server + path);
        watchURL.searchParams.set('watch', 'true');

        for (const [key, val] of Object.entries(queryParams || {})) {
            if (val !== undefined) {
                watchURL.searchParams.set(key, val.toString());
            }
        }

        const requestOptions: RequestOptions = {};
        const requestInit = await this.config.applytoFetchOptions(requestOptions);

        const controller = new AbortControllerCtor();
        requestInit.signal = controller.signal;

        let doneCalled: boolean = false;
        const doneCallOnce = (err: any) => {
            if (!doneCalled) {
                controller.abort();
                doneCalled = true;
                done(err);
            }
        };
        const stream = byline.createStream();
        stream.on('error', doneCallOnce);
        stream.on('close', () => doneCallOnce(null));
        stream.on('data', (line) => {
            try {
                const data = JSON.parse(line.toString());
                callback(data.type, data.object, data);
            } catch (ignore) {
                // ignore parse errors
            }
        });

        await fetch(watchURL, requestInit)
            .then((response) => {
                if (response.status === 200) {
                    response.body.on('error', doneCallOnce);
                    response.body.pipe(stream);
                } else {
                    const error = new Error(response.statusText) as Error & {
                        statusCode: number | undefined;
                    };
                    error.statusCode = response.status;
                    throw error;
                }
            })
            .catch(doneCallOnce);

        return controller;
    }
}
