import AbortController from 'abort-controller';
import byline = require('byline');
import { RequestOptions } from 'https';
import fetch from 'node-fetch';
import request = require('request');
import { Duplex } from 'stream';
import { URL } from 'url';
import { KubeConfig } from './config';

export interface WatchUpdate {
    type: string;
    object: object;
}

// We cannot use the type ReadableStream because Request returned by request
// library is not a true ReadableStream and there is extra abort method.
export interface RequestResult {
    pipe(stream: Duplex): void;
    on(ev: string, cb: (arg: any) => void): void;
    abort(): void;
}

export interface Response {
    statusCode: number;
    statusMessage: string;
}

// The contract is that the provided request library will return a readable
// stream with abort method.
export interface RequestInterface {
    webRequest(opts: request.OptionsWithUri): RequestResult;
}

export class DefaultRequest implements RequestInterface {
    // requestImpl can be overriden in case we need to test mocked DefaultRequest
    private requestImpl: (opts: request.OptionsWithUri) => request.Request;

    constructor(requestImpl?: (opts: request.OptionsWithUri) => request.Request) {
        this.requestImpl = requestImpl ? requestImpl : request;
    }

    // Using request lib can be confusing when combining Stream- with Callback-
    // style API. We avoid the callback and handle HTTP response errors, that
    // would otherwise require a different error handling, in a transparent way
    // to the user (see github issue request/request#647 for more info).
    public webRequest(opts: request.OptionsWithUri): RequestResult {
        const req = this.requestImpl(opts);
        // pause the stream until we get a response not to miss any bytes
        req.pause();
        req.on('response', (resp) => {
            if (resp.statusCode === 200) {
                req.resume();
            } else {
                const error = new Error(resp.statusMessage) as Error & { statusCode: number | undefined };
                error.statusCode = resp.statusCode;
                req.emit('error', error);
            }
        });
        return req;
    }
}

export class Watch {
    public static SERVER_SIDE_CLOSE: object = { error: 'Connection closed on server' };
    public config: KubeConfig;
    private readonly requestImpl: RequestInterface;

    public constructor(config: KubeConfig, requestImpl?: RequestInterface) {
        this.config = config;
        if (requestImpl) {
            this.requestImpl = requestImpl;
        } else {
            this.requestImpl = new DefaultRequest();
        }
    }

    // Watch the resource and call provided callback with parsed json object
    // upon event received over the watcher connection.
    //
    // "done" callback is called either when connection is closed or when there
    // is an error. In either case, watcher takes care of properly closing the
    // underlaying connection so that it doesn't leak any resources.
    public async watch(
        path: string,
        queryParams: any,
        callback: (phase: string, apiObj: any, watchObj?: any) => void,
        done: (err: any) => void,
    ): Promise<any> {
        const cluster = this.config.getCurrentCluster();
        if (!cluster) {
            throw new Error('No currently active cluster');
        }
        const watchURL = new URL(cluster.server + path);
        watchURL.searchParams.set('watch', 'true');

        const httpsOptions: RequestOptions = {};
        // TODO: fix applytoHTTPSOptions for watch
        await this.config.applytoHTTPSOptions(httpsOptions);

        const controller = new AbortController();
        // @ts-ignore
        httpsOptions.signal = controller.signal;

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

        const req = await fetch(watchURL, httpsOptions)
            .then((response) => {
                response.body.pipe(stream);
            })
            .catch(doneCallOnce);
        return req;
    }
}
