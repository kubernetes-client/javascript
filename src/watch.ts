import { STATUS_CODES } from 'node:http';
import { createInterface } from 'node:readline';
import { Readable } from 'node:stream';
import { fetch } from 'undici';
import { KubeConfig } from './config.js';
import { HttpMethod, RequestContext } from './gen/http/http.js';

export class Watch {
    public static SERVER_SIDE_CLOSE: object = { error: 'Connection closed on server' };
    public config: KubeConfig;
    private requestTimeoutMs: number = 30000;

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

        const controller = new AbortController();

        let timedOut: boolean = false;
        let timer: NodeJS.Timeout | undefined;
        const clearTimer = () => {
            if (timer !== undefined) {
                clearTimeout(timer);
                timer = undefined;
            }
        };
        const resetTimer = () => {
            clearTimer();
            timer = setTimeout(() => {
                timedOut = true;
                controller.abort(
                    new DOMException('The operation was aborted due to timeout', 'TimeoutError'),
                );
            }, this.requestTimeoutMs);
            timer.unref();
        };

        const ctx = new RequestContext(watchURL.toString(), HttpMethod.GET);
        await this.config.applySecurityAuthentication(ctx);

        let doneCalled: boolean = false;
        const doneCallOnce = (err: any) => {
            if (!doneCalled) {
                doneCalled = true;
                clearTimer();
                controller.abort();
                if (err && timedOut) {
                    done(new DOMException('The operation was aborted due to timeout', 'TimeoutError'));
                } else {
                    done(err);
                }
            }
        };

        try {
            resetTimer();
            const response = await fetch(watchURL, {
                method: 'GET',
                headers: ctx.getHeaders(),
                dispatcher: ctx.getDispatcher(),
                signal: controller.signal,
            });

            if (response.status === 200) {
                // The connect timeout is over; from here on it becomes an inactivity timeout.
                resetTimer();
                const body = Readable.fromWeb(response.body! as any);

                body.on('error', doneCallOnce);
                body.on('close', () => doneCallOnce(null));
                body.on('finish', () => doneCallOnce(null));

                const lines = createInterface(body);
                lines.on('error', doneCallOnce);
                lines.on('close', () => doneCallOnce(null));
                lines.on('finish', () => doneCallOnce(null));
                lines.on('line', (line) => {
                    try {
                        const data = JSON.parse(line.toString());
                        callback(data.type, data.object, data);
                    } catch {
                        // ignore parse errors
                    }
                });
                body.on('data', resetTimer);
            } else {
                const statusText =
                    response.statusText || STATUS_CODES[response.status] || 'Internal Server Error';
                const error = new Error(statusText) as Error & {
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
