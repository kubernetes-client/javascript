import { LineStream } from 'byline';
import request = require('request');
import { KubeConfig } from './config';

export interface WatchUpdate {
    type: string;
    object: object;
}

export interface RequestInterface {
    webRequest(opts: request.Options, callback: (err, response, body) => void): any;
}

export class DefaultRequest implements RequestInterface {
    public webRequest(opts: request.Options, callback: (err, response, body) => void): any {
        return request(opts, callback);
    }
}

export class Watch {
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

    public watch(
        path: string,
        queryParams: any,
        callback: (phase: string, obj: any) => void,
        done: (err: any) => void,
    ): any {
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
        };
        this.config.applyToRequest(requestOptions);

        const stream = new LineStream();
        stream.on('data', (data) => {
            let obj: WatchUpdate;
            if (data instanceof Buffer) {
                obj = JSON.parse(data.toString()) as WatchUpdate;
            } else {
                obj = JSON.parse(data) as WatchUpdate;
            }
            if (typeof obj === 'object' && obj.object) {
                callback(obj.type, obj.object);
            } else {
                throw new Error(`unexpected ${typeof obj}: ${JSON.stringify(obj)}`);
            }
        });

        const req = this.requestImpl.webRequest(requestOptions, (error, response, body) => {
            if (error) {
                done(error);
            } else {
                done(null);
            }
        });
        req.pipe(stream);
        return req;
    }
}
