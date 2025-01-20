import { rejects, strictEqual } from 'node:assert';
import nock from 'nock';

import { KubeConfig } from './config.js';
import { Health } from './health.js';
import { Cluster, User } from './config_types.js';

describe('Health', () => {
    describe('livez', () => {
        it('should throw an error if no current active cluster', async () => {
            const kc = new KubeConfig();
            const health = new Health(kc);
            await rejects(health.livez({}), { message: 'No currently active cluster' });
        });

        it('should return true if /livez returns with status 200', async () => {
            const kc = new KubeConfig();
            const cluster = {
                name: 'foo',
                server: 'https://server.com',
            } as Cluster;

            const user = {
                name: 'my-user',
                password: 'some-password',
            } as User;
            kc.loadFromClusterAndUser(cluster, user);

            const scope = nock('https://server.com').get('/livez').reply(200);
            const health = new Health(kc);

            const r = await health.livez({});
            strictEqual(r, true);
            scope.done();
        });

        it('should return false if /livez returns with status 500', async () => {
            const kc = new KubeConfig();
            const cluster = {
                name: 'foo',
                server: 'https://server.com',
            } as Cluster;

            const user = {
                name: 'my-user',
                password: 'some-password',
            } as User;
            kc.loadFromClusterAndUser(cluster, user);

            const scope = nock('https://server.com').get('/livez').reply(500);
            const health = new Health(kc);

            const r = await health.livez({});
            strictEqual(r, false);
            scope.done();
        });

        it('should return true if /livez returns status 404 and /healthz returns status 200', async () => {
            const kc = new KubeConfig();
            const cluster = {
                name: 'foo',
                server: 'https://server.com',
            } as Cluster;

            const user = {
                name: 'my-user',
                password: 'some-password',
            } as User;
            kc.loadFromClusterAndUser(cluster, user);

            const scope = nock('https://server.com');
            scope.get('/livez').reply(404);
            scope.get('/healthz').reply(200);
            const health = new Health(kc);

            const r = await health.livez({});
            strictEqual(r, true);
            scope.done();
        });

        it('should return false if /livez returns status 404 and /healthz returns status 500', async () => {
            const kc = new KubeConfig();
            const cluster = {
                name: 'foo',
                server: 'https://server.com',
            } as Cluster;

            const user = {
                name: 'my-user',
                password: 'some-password',
            } as User;
            kc.loadFromClusterAndUser(cluster, user);

            const scope = nock('https://server.com');
            scope.get('/livez').reply(404);
            scope.get('/healthz').reply(500);
            const health = new Health(kc);

            const r = await health.livez({});
            strictEqual(r, false);
            scope.done();
        });

        it('should return true if both /livez and /healthz return status 404', async () => {
            const kc = new KubeConfig();
            const cluster = {
                name: 'foo',
                server: 'https://server.com',
            } as Cluster;

            const user = {
                name: 'my-user',
                password: 'some-password',
            } as User;
            kc.loadFromClusterAndUser(cluster, user);

            const scope = nock('https://server.com');
            scope.get('/livez').reply(404);
            scope.get('/healthz').reply(200);
            const health = new Health(kc);

            const r = await health.livez({});
            strictEqual(r, true);
            scope.done();
        });

        it('should throw an error when fetch throws an error', async () => {
            const kc = new KubeConfig();
            const cluster = {
                name: 'foo',
                server: 'https://server.com',
            } as Cluster;

            const user = {
                name: 'my-user',
                password: 'some-password',
            } as User;
            kc.loadFromClusterAndUser(cluster, user);

            const scope = nock('https://server.com');
            scope.get('/livez').replyWithError(new Error('an error'));
            const health = new Health(kc);

            await rejects(health.livez({}), { message: 'Error occurred in health request' });
            scope.done();
        });
    });
});
