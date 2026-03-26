import { fetch } from 'undici';
import { KubeConfig } from './config.js';
import { RequestOptions } from 'node:https';
import { HttpMethod, RequestContext } from './gen/http/http.js';

export class Health {
    public config: KubeConfig;

    public constructor(config: KubeConfig) {
        this.config = config;
    }

    public async readyz(opts: RequestOptions): Promise<boolean> {
        return this.check('/readyz', opts);
    }

    public async livez(opts: RequestOptions): Promise<boolean> {
        return this.check('/livez', opts);
    }

    private async healthz(opts: RequestOptions): Promise<boolean> {
        return this.check('/healthz', opts);
    }

    private async check(path: string, opts: RequestOptions): Promise<boolean> {
        const cluster = this.config.getCurrentCluster();
        if (!cluster) {
            throw new Error('No currently active cluster');
        }

        const requestURL = cluster.server + path;
        const ctx = new RequestContext(requestURL, HttpMethod.GET);
        await this.config.applySecurityAuthentication(ctx);

        try {
            const response = await fetch(requestURL, {
                method: 'GET',
                headers: ctx.getHeaders(),
                dispatcher: ctx.getDispatcher(),
                signal: opts?.signal,
            });
            const status = response.status;
            if (status === 200) {
                return true;
            }
            if (status === 404) {
                if (path === '/healthz') {
                    // /livez/readyz return 404 and healthz also returns 404, let's consider it is live
                    return true;
                }
                return this.healthz(opts);
            }
            return false;
        } catch (err: any) {
            if (err.name === 'AbortError') {
                throw err;
            }
            throw new Error('Error occurred in health request', { cause: err });
        }
    }
}
