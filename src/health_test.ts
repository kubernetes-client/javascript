import { afterEach, beforeEach, describe, it } from 'node:test';
import { rejects, strictEqual } from 'node:assert';
import { MockAgent, getGlobalDispatcher, setGlobalDispatcher, type Dispatcher } from 'undici';

import { KubeConfig } from './config.js';
import { Health } from './health.js';
import { Cluster, User } from './config_types.js';
import { RequestOptions } from 'node:https';

describe('Health', () => {
    [
        {
            path: '/livez',
            method: async (health: Health, opts: RequestOptions) => health.livez(opts),
        },
        {
            path: '/readyz',
            method: async (health: Health, opts: RequestOptions) => health.readyz(opts),
        },
    ].forEach((test) => {
        describe(test.path, () => {
            let mockAgent: MockAgent;
            let originalDispatcher: Dispatcher;

            beforeEach(() => {
                originalDispatcher = getGlobalDispatcher();
                mockAgent = new MockAgent();
                setGlobalDispatcher(mockAgent);
                mockAgent.disableNetConnect();
            });

            afterEach(async () => {
                await mockAgent.close();
                setGlobalDispatcher(originalDispatcher);
            });

            it('should throw an error if no current active cluster', async () => {
                const kc = new KubeConfig();
                const health = new Health(kc);
                await rejects(test.method(health, {}), { message: 'No currently active cluster' });
            });

            it(`should return true if ${test.path} returns with status 200`, async () => {
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

                const pool = mockAgent.get('https://server.com');
                pool.intercept({ path: test.path, method: 'GET' }).reply(200);
                const health = new Health(kc);

                const r = await test.method(health, {});
                strictEqual(r, true);
                mockAgent.assertNoPendingInterceptors();
            });

            it(`should return false if ${test.path} returns with status 500`, async () => {
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

                const pool = mockAgent.get('https://server.com');
                pool.intercept({ path: test.path, method: 'GET' }).reply(500);
                const health = new Health(kc);

                const r = await test.method(health, {});
                strictEqual(r, false);
                mockAgent.assertNoPendingInterceptors();
            });

            it(`should return true if ${test.path} returns status 404 and /healthz returns status 200`, async () => {
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

                const pool = mockAgent.get('https://server.com');
                pool.intercept({ path: test.path, method: 'GET' }).reply(404);
                pool.intercept({ path: '/healthz', method: 'GET' }).reply(200);
                const health = new Health(kc);

                const r = await test.method(health, {});
                strictEqual(r, true);
                mockAgent.assertNoPendingInterceptors();
            });

            it(`should return false if ${test.path} returns status 404 and /healthz returns status 500`, async () => {
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

                const pool = mockAgent.get('https://server.com');
                pool.intercept({ path: test.path, method: 'GET' }).reply(404);
                pool.intercept({ path: '/healthz', method: 'GET' }).reply(500);
                const health = new Health(kc);

                const r = await test.method(health, {});
                strictEqual(r, false);
                mockAgent.assertNoPendingInterceptors();
            });

            it(`should return true if both ${test.path} and /healthz return status 404`, async () => {
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

                const pool = mockAgent.get('https://server.com');
                pool.intercept({ path: test.path, method: 'GET' }).reply(404);
                pool.intercept({ path: '/healthz', method: 'GET' }).reply(404);
                const health = new Health(kc);

                const r = await test.method(health, {});
                strictEqual(r, true);
                mockAgent.assertNoPendingInterceptors();
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

                const pool = mockAgent.get('https://server.com');
                pool.intercept({ path: test.path, method: 'GET' }).replyWithError(new Error('an error'));
                const health = new Health(kc);

                await rejects(test.method(health, {}), { message: 'Error occurred in health request' });
                mockAgent.assertNoPendingInterceptors();
            });
        });
    });
});
