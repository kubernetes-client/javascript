import request = require('request');
import { LineStream } from 'byline';
import { KubeConfig } from './config';

export class Watch {
    'config': KubeConfig;

    public constructor(config: KubeConfig) {
        this.config = config;
    }

    public watch(path: string, queryParams: any, callback: (phase: string, obj: any) => void, done: (err: any) => void): any {
        let url = this.config.getCurrentCluster().server + path;

        queryParams['watch'] = true;
        let headerParams: any = {};

        let requestOptions: request.Options = {
            method: 'GET',
            qs: queryParams,
            headers: headerParams,
            uri: url,
            useQuerystring: true,
            json: true
        };
        this.config.applyToRequest(requestOptions);
        
        let stream = new LineStream();
        stream.on('data', (data) => {
            let obj = null;
            if (data instanceof Buffer) {
                obj = JSON.parse(data.toString());
            } else {
                obj = JSON.parse(data);
            }
            if (obj['type'] && obj['object']) {
                callback(obj['type'], obj['object']);
            } else {
                console.log('unexpected object: ' + obj);
            }
        });

        let req = request(requestOptions, (error, response, body) => {
            if (error) {
                done(error);
            }
            done(null);
        });
        req.pipe(stream);
        return req;
    }
}
