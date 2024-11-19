import fetch from 'node-fetch';
import { AbortSignal } from 'node-fetch/externals';
import { URL } from 'url';
import { KubeConfig } from './config';
import { RequestOptions } from 'https';

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

        const requestURL = new URL(cluster.server + path);
        const requestInit = await this.config.applyToFetchOptions(opts);
        const controller = new AbortController();
        requestInit.signal = controller.signal as AbortSignal;
        requestInit.method = 'GET';

        return await fetch(requestURL.toString(), requestInit)
            .then((response) => {
                const status = response.status;
                if (status === 200) {
                    return true;
                } else if (status === 404) {
                    if (path === '/healthz') {
                        // /livez/readyz return 404 and healthz also returns 404, let's consider it is live
                        return true;
                    }
                    return this.healthz(opts);
                } else {
                    return false;
                }
            })
            .catch((err) => {
                return false;
            });
    }
}
