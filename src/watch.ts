import { createInterface } from 'node:readline';
import fetch from 'node-fetch';
import { KubeConfig } from './config.js';

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

        const requestInit = await this.config.applyToFetchOptions({});

        const controller = new AbortController();
        requestInit.signal = controller.signal as AbortSignal;
        requestInit.method = 'GET';
        requestInit.timeout = 30000;

        let doneCalled: boolean = false;
        const doneCallOnce = (err: any) => {
            if (!doneCalled) {
                controller.abort();
                doneCalled = true;
                done(err);
            }
        };

        try {
            const response = await fetch(watchURL, requestInit);

            // Enable socket keep-alive to prevent connection stalls
            if (requestInit.agent && typeof requestInit.agent === 'object') {
                for (const socket of Object.values(requestInit.agent.sockets).flat()) {
                    if (socket) {
                        socket.setKeepAlive(true, 30000);
                    }
                }
            }

            if (response.status === 200) {
                response.body.on('error', doneCallOnce);
                response.body.on('close', () => doneCallOnce(null));
                response.body.on('finish', () => doneCallOnce(null));

                const lines = createInterface(response.body);
                lines.on('error', doneCallOnce);
                lines.on('close', () => doneCallOnce(null));
                lines.on('finish', () => doneCallOnce(null));
                lines.on('line', (line) => {
                    try {
                        const data = JSON.parse(line.toString());
                        callback(data.type, data.object, data);
                    } catch (ignore) {
                        // ignore parse errors
                    }
                });
            } else {
                const error = new Error(response.statusText) as Error & {
                    statusCode: number | undefined;
                };
                error.statusCode = response.status;
                throw error;
            }
        } catch (err) {
            doneCallOnce(err);
        }

        return controller;
    }
}
