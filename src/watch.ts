import byline = require('byline');
import request = require('request');
import { KubeConfig } from './config';

export interface WatchUpdate {
    type: string;
    object: object;
}

export interface Response {
    statusCode: number;
    statusMessage: string;
}

export interface RequestInterface {
    webRequest(
        opts: request.Options,
        callback: (err: object | null, response: Response | null, body: object | null) => void,
    ): any;
}

export class DefaultRequest implements RequestInterface {
    public webRequest(
        opts: request.Options,
        callback: (err: object | null, response: Response | null, body: object | null) => void,
    ): any {
        return request(opts, callback);
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
