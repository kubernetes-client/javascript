import byline = require('byline');
import request = require('request');
import { Duplex } from 'stream';
import { KubeConfig } from './config';

export interface WatchUpdate {
    type: string;
    object: object;
}

export interface RequestResult {
    pipe(stream: Duplex);
    destroy();
}

export interface RequestInterface {
    webRequest(opts: request.Options, callback: (err, response, body) => void): RequestResult;
}

export class DefaultRequest implements RequestInterface {
    public webRequest(opts: request.Options, callback: (err, response, body) => void): RequestResult {
        return request(opts, callback);
    }
}

export class Watch {
    public static SERVER_SIDE_CLOSE = { error: 'Connection closed on server' };
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
        const url = cluster.server + path;

        queryParams.watch = true;
        const headerParams: any = {};

        const requestOptions: request.Options = {
            method: 'GET',
            qs: queryParams,
            headers: headerParams,
            uri: url,
            useQuerystring: true,
            json: true,
            pool: false,
        };
        await this.config.applyToRequest(requestOptions);

        const stream = byline.createStream();
        stream.on('data', (line) => {
            try {
                const data = JSON.parse(line);
                callback(data.type, data.object, data);
            } catch (ignore) {
                // ignore parse errors
            }
        });
        let errOut: Error | null = null;
        stream.on('error', (err) => {
            errOut = err;
            done(err);
        });
        // TODO: I don't love this, because both 'error' and 'close' call the done handler with the same error
        // We should probably only do one or the other, but there's challenges because of async delivery and it's
        // important to know if the close event is occurring because of an error. So for now, this needs to be
        // handled in the client.
        stream.on('close', () => done(errOut));

        const req = this.requestImpl.webRequest(requestOptions, (error, response, body) => {
            if (error) {
                done(error);
            } else if (response && response.statusCode !== 200) {
                done(new Error(response.statusMessage));
            } else {
                done(null);
            }
        });
        req.pipe(stream);
        return req;
    }
}
