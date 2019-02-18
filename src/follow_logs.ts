import { LineStream } from 'byline';
import request = require('request');
import { KubeConfig } from './config';

interface FollowLogsOptions {
    /**
     * The container for which to stream logs. Defaults to only container if there is one container in the pod.
     */
    container?: string;

    /**
     * If set, the number of bytes to read from the server before terminating the log output. This may not display a
     * complete final line of logging, and may return slightly more or slightly less than the specified limit.
     */
    limitBytes?: number;

    /**
     * If true, then the output is pretty printed.
     */
    pretty?: string;

    /**
     * Return previous terminated container logs. Defaults to false.
     */
    previous?: boolean;

    /**
     * A relative time in seconds before the current time from which to show logs. If this value precedes the time a
     * pod was started, only logs since the pod start will be returned. If this value is in the future, no logs will
     * be returned. Only one of sinceSeconds or sinceTime may be specified.
     */
    sinceSeconds?: number;

    /**
     * If set, the number of lines from the end of the logs to show. If not specified, logs are shown from the creation
     * of the container or sinceSeconds or sinceTime
     */
    tailLines?: number;

    /**
     * If true, add an RFC3339 or RFC3339Nano timestamp at the beginning of every line of log output. Defaults to false.
     */
    timestamps?: boolean;
}

export class FollowLogs {
    public config: KubeConfig;

    public constructor(config: KubeConfig) {
        this.config = config;
    }

    /**
     * read log of the specified Pod
     * @param name name of the Pod
     * @param namespace object name and auth scope, such as for teams and projects
     * @param {FollowLogsOptions} options
     */
    public followPodLog(
        name: string,
        namespace: string,
        callback: (line: string) => void,
        done: (err: any) => void,
        options: FollowLogsOptions = {},
    ): request.Request {
        // verify required parameter 'name'
        if (!name) {
            throw new Error(
                'Required parameter name was null or undefined when calling readNamespacedPodLog.',
            );
        }

        // verify required parameter 'namespace'
        if (!namespace) {
            throw new Error(
                'Required parameter namespace was null or undefined when calling readNamespacedPodLog.',
            );
        }

        // Build URI
        const cluster = this.config.getCurrentCluster();
        if (!cluster) {
            throw new Error('No currently active cluster');
        }
        const uri = cluster.server + `/api/v1/namespaces/${namespace}/pods/${name}/log`;

        const requestOptions: request.Options = {
            method: 'GET',
            qs: {
                ...options,
                follow: true,
            },
            headers: {},
            uri,
            useQuerystring: true,
            json: true,
        };
        this.config.applyToRequest(requestOptions);

        const stream = new LineStream();
        stream.on('data', (data) => {
            callback(data.toString());
        });

        const req = request(requestOptions, (error, response, body) => {
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
