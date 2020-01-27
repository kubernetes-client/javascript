import { expect, use } from 'chai';
import chaiAsPromised = require('chai-as-promised');
use(chaiAsPromised);

import * as shell from 'shelljs';

import execa = require('execa');
import request = require('request');
import https = require('https');

import { ExecAuth } from './exec_auth';
import { User } from './config_types';
import { fail } from 'assert';

describe('ExecAuth', () => {
    it('should claim correctly', () => {
        const auth = new ExecAuth();

        const unk: unknown = null;
        expect(auth.isAuthProvider(unk as User)).to.be.false;

        const empty = {} as User;
        expect(auth.isAuthProvider(empty)).to.be.false;

        const exec = {
            exec: {},
        } as User;
        expect(auth.isAuthProvider(exec)).to.be.true;

        const execName = {
            authProvider: {
                name: 'exec',
            },
        } as User;
        expect(auth.isAuthProvider(execName)).to.be.true;

        const execConfig = {
            authProvider: {
                config: {
                    exec: {},
                },
            },
        } as User;
        expect(auth.isAuthProvider(execConfig)).to.be.true;

        const azureConfig = {
            authProvider: {
                name: 'azure',
                config: {
                    azure: {},
                },
            },
        } as User;
        expect(auth.isAuthProvider(azureConfig)).to.be.false;
    });

    it('should correctly exec', async () => {
        const auth = new ExecAuth();
        (auth as any).execFn = (
            command: string,
            args: string[],
            opts: execa.SyncOptions,
        ): execa.ExecaSyncReturnValue => {
            return {
                code: 0,
                stdout: JSON.stringify({ status: { token: 'foo' } }),
            } as execa.ExecaSyncReturnValue;
        };
        const opts = {} as request.Options;
        opts.headers = [];
        const refreshed = await auth.applyAuthentication(
            {
                name: 'user',
                authProvider: {
                    config: {
                        exec: {
                            command: 'echo',
                        },
                    },
                },
            },
            opts,
        );
        expect(opts.headers.Authorization).to.equal('Bearer foo');
        expect(refreshed).to.be.true;
    });

    it('should correctly exec for certs', async () => {
        const auth = new ExecAuth();
        (auth as any).execFn = (
            command: string,
            args: string[],
            opts: execa.SyncOptions,
        ): execa.ExecaSyncReturnValue => {
            return {
                code: 0,
                stdout: JSON.stringify({ status: { clientCertificateData: 'foo', clientKeyData: 'bar' } }),
            } as execa.ExecaSyncReturnValue;
        };

        const user = {
            name: 'user',
            authProvider: {
                config: {
                    exec: {
                        command: 'echo',
                    },
                },
            },
        };
        const opts = {} as request.Options;
        opts.headers = [];

        const refreshed = await auth.applyAuthentication(user, opts);
        expect(opts.headers.Authorization).to.be.undefined;
        expect(opts.cert).to.equal('foo');
        expect(opts.key).to.equal('bar');
        expect(refreshed).to.be.true;
    });

    it('should correctly exec and cache', async () => {
        const auth = new ExecAuth();
        var execCount = 0;
        var expire = '29 Mar 1995 00:00:00 GMT';
        var tokenValue = 'foo';
        (auth as any).execFn = (
            command: string,
            args: string[],
            opts: execa.SyncOptions,
        ): execa.ExecaSyncReturnValue => {
            execCount++;
            return {
                code: 0,
                stdout: JSON.stringify({
                    status: { token: tokenValue, expirationTimestamp: expire },
                }),
            } as execa.ExecaSyncReturnValue;
        };

        const user = {
            name: 'user',
            authProvider: {
                config: {
                    exec: {
                        command: 'echo',
                    },
                },
            },
        };

        const opts = {} as request.Options;
        opts.headers = [];

        let refreshed = await auth.applyAuthentication(user, opts);
        expect(opts.headers.Authorization).to.equal(`Bearer ${tokenValue}`);
        expect(execCount).to.equal(1);
        expect(refreshed).to.be.true;
    
        // old token should be expired, set expiration for the new token for the future.
        expire = '29 Mar 2095 00:00:00 GMT';
        tokenValue = 'bar';
        refreshed = await auth.applyAuthentication(user, opts);
        expect(opts.headers.Authorization).to.equal(`Bearer ${tokenValue}`);
        expect(execCount).to.equal(2);
        expect(refreshed).to.be.true;

        // Should use cached token, execCount should stay at two, token shouldn't change
        tokenValue = 'baz';
        refreshed = await auth.applyAuthentication(user, opts);
        expect(opts.headers.Authorization).to.equal('Bearer bar');
        expect(execCount).to.equal(2);
        expect(refreshed).to.be.false;
    });

    it('should return null on no exec info', async () => {
        const auth = new ExecAuth();
        const opts = {} as request.Options;
        opts.headers = [];

        const refreshed = await auth.applyAuthentication({} as User, opts);
        expect(opts.headers.Authorization).to.be.undefined;
        expect(refreshed).to.be.false;
    });

    it('should throw on exec errors', () => {
        const auth = new ExecAuth();
        (auth as any).execFn = (
            command: string,
            args: string[],
            opts: execa.SyncOptions,
        ): execa.ExecaSyncReturnValue => {
            return {
                code: 100,
                stdout: JSON.stringify({ status: { token: 'foo' } }),
                stderr: 'Some error!',
            } as execa.ExecaSyncReturnValue;
        };

        const user = {
            name: 'user',
            authProvider: {
                config: {
                    exec: {
                        command: 'echo',
                    },
                },
            },
        };
        const opts = {} as request.Options;
        opts.headers = [];

        const promise = auth.applyAuthentication(user, opts);
        return expect(promise).to.eventually.be.rejected;
    });

    it('should exec with env vars', async () => {
        const auth = new ExecAuth();
        let optsOut: shell.ExecOpts = {};
        (auth as any).execFn = (
            command: string,
            args: string[],
            opts: execa.SyncOptions,
        ): execa.ExecaSyncReturnValue => {
            optsOut = opts;
            return {
                code: 0,
                stdout: JSON.stringify({ status: { token: 'foo' } }),
            } as execa.ExecaSyncReturnValue;
        };
        process.env.BLABBLE = 'flubble';
        const opts = {} as request.Options;
        opts.headers = [];

        const refreshed = await auth.applyAuthentication(
            {
                name: 'user',
                authProvider: {
                    config: {
                        exec: {
                            command: 'echo',
                            env: [
                                {
                                    name: 'foo',
                                    value: 'bar',
                                },
                            ],
                        },
                    },
                },
            },
            opts,
        );
        expect(optsOut.env.foo).to.equal('bar');
        expect(optsOut.env.PATH).to.equal(process.env.PATH);
        expect(optsOut.env.BLABBLE).to.equal(process.env.BLABBLE);
        expect(refreshed).to.be.true;
    });

    it('should handle empty headers array correctly', async () => {
        const auth = new ExecAuth();
        (auth as any).execFn = (
            command: string,
            args: string[],
            opts: execa.SyncOptions,
        ): execa.ExecaSyncReturnValue => {
            return {
                code: 0,
                stdout: JSON.stringify({ status: { token: 'foo' } }),
            } as execa.ExecaSyncReturnValue;
        };
        const opts = {} as https.RequestOptions;
        const refreshed = await auth.applyAuthentication(
            {
                name: 'user',
                authProvider: {
                    config: {
                        exec: {
                            command: 'echo',
                        },
                    },
                },
            },
            opts,
        );
        if (!opts.headers) {
            fail('unexpected null headers!');
        } else {
            expect(opts.headers.Authorization).to.equal('Bearer foo');
        }
        expect(refreshed).to.be.true;
    });
});
