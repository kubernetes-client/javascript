import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
use(chaiAsPromised);

import https from 'node:https';
import { OutgoingHttpHeaders } from 'node:http';

import { ExecAuth } from './exec_auth.js';
import { User } from './config_types.js';

import child_process from 'node:child_process';

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
        // TODO: fix this test for Windows
        if (process.platform === 'win32') {
            return;
        }
        const auth = new ExecAuth();
        (auth as any).execFn = (
            command: string,
            args?: readonly string[],
            options?: child_process.SpawnOptionsWithoutStdio,
        ): child_process.ChildProcessWithoutNullStreams => {
            return {
                stdout: {
                    setEncoding: () => {},
                    on: (_data: string, f: (data: Buffer | string) => void) => {
                        f(Buffer.from(JSON.stringify({ status: { token: 'foo' } })));
                    },
                },
                stderr: {
                    setEncoding: () => {},
                    on: () => {},
                },
                on: (op: string, f: any) => {
                    if (op === 'close') {
                        f(0);
                    }
                },
            } as unknown as child_process.ChildProcessWithoutNullStreams;
        };
        const opts = {} as https.RequestOptions;
        opts.headers = {} as OutgoingHttpHeaders;
        await auth.applyAuthentication(
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
    });

    it('should correctly exec for certs', async () => {
        // TODO: fix this test for Windows
        if (process.platform === 'win32') {
            return;
        }
        const auth = new ExecAuth();
        (auth as any).execFn = (
            command: string,
            args?: readonly string[],
            options?: child_process.SpawnOptionsWithoutStdio,
        ): child_process.ChildProcessWithoutNullStreams => {
            return {
                stdout: {
                    setEncoding: () => {},
                    on: (_data: string, f: (data: Buffer | string) => void) => {
                        f(
                            Buffer.from(
                                JSON.stringify({
                                    status: { clientCertificateData: 'foo', clientKeyData: 'bar' },
                                }),
                            ),
                        );
                    },
                },
                stderr: {
                    setEncoding: () => {},
                    on: () => {},
                },
                on: (op: string, f: any) => {
                    if (op === 'close') {
                        f(0);
                    }
                },
            } as unknown as child_process.ChildProcessWithoutNullStreams;
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
        const opts = {} as https.RequestOptions;
        opts.headers = {} as OutgoingHttpHeaders;
        opts.headers = {} as OutgoingHttpHeaders;

        await auth.applyAuthentication(user, opts);
        expect(opts.headers.Authorization).to.be.undefined;
        expect(opts.cert).to.equal('foo');
        expect(opts.key).to.equal('bar');
    });

    it('should correctly exec and cache', async () => {
        // TODO: fix this test for Windows
        if (process.platform === 'win32') {
            return;
        }
        const auth = new ExecAuth();
        let execCount = 0;
        let expire = '29 Mar 1995 00:00:00 GMT';
        let tokenValue = 'foo';
        (auth as any).execFn = (
            command: string,
            args?: readonly string[],
            options?: child_process.SpawnOptionsWithoutStdio,
        ): child_process.ChildProcessWithoutNullStreams => {
            execCount++;
            return {
                stdout: {
                    setEncoding: () => {},
                    on: (_data: string, f: (data: Buffer | string) => void) => {
                        f(
                            Buffer.from(
                                JSON.stringify({
                                    status: { token: tokenValue, expirationTimestamp: expire },
                                }),
                            ),
                        );
                    },
                },
                stderr: {
                    setEncoding: () => {},
                    on: () => {},
                },
                on: (op: string, f: any) => {
                    if (op === 'close') {
                        f(0);
                    }
                },
            } as unknown as child_process.ChildProcessWithoutNullStreams;
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

        const opts = {} as https.RequestOptions;
        opts.headers = {} as OutgoingHttpHeaders;

        await auth.applyAuthentication(user, opts);
        expect(opts.headers.Authorization).to.equal(`Bearer ${tokenValue}`);
        expect(execCount).to.equal(1);

        // old token should be expired, set expiration for the new token for the future.
        expire = '29 Mar 2095 00:00:00 GMT';
        tokenValue = 'bar';
        await auth.applyAuthentication(user, opts);
        expect(opts.headers.Authorization).to.equal(`Bearer ${tokenValue}`);
        expect(execCount).to.equal(2);

        // Should use cached token, execCount should stay at two, token shouldn't change
        tokenValue = 'baz';
        await auth.applyAuthentication(user, opts);
        expect(opts.headers.Authorization).to.equal('Bearer bar');
        expect(execCount).to.equal(2);
    });

    it('should return null on no exec info', async () => {
        const auth = new ExecAuth();
        const opts = {} as https.RequestOptions;
        opts.headers = {} as OutgoingHttpHeaders;

        await auth.applyAuthentication({} as User, opts);
        expect(opts.headers.Authorization).to.be.undefined;
    });

    it('should throw on spawnSync errors', () => {
        // TODO: fix this test for Windows
        if (process.platform === 'win32') {
            return;
        }
        const auth = new ExecAuth();
        (auth as any).execFn = (
            command: string,
            args: string[],
            opts: child_process.SpawnOptions,
        ): child_process.SpawnSyncReturns<Buffer> => {
            return {
                error: new Error('Error: spawnSync /path/to/bin ENOENT'),
            } as child_process.SpawnSyncReturns<Buffer>;
        };

        (auth as any).execFn = (
            command: string,
            args?: readonly string[],
            options?: child_process.SpawnOptionsWithoutStdio,
        ): child_process.ChildProcessWithoutNullStreams => {
            return {
                stdout: {
                    setEncoding: () => {},
                    on: (_data: string, f: (data: Buffer | string) => void) => {},
                },
                stderr: {
                    setEncoding: () => {},
                    on: () => {},
                },
                on: (op: string, f: any) => {
                    if (op === 'error') {
                        throw new Error('Error: spawnSync /path/to/bin ENOENT');
                    }
                },
            } as unknown as child_process.ChildProcessWithoutNullStreams;
        };

        const user = {
            name: 'user',
            authProvider: {
                config: {
                    exec: {
                        command: '/path/to/bin',
                    },
                },
            },
        };
        const opts = {} as https.RequestOptions;
        opts.headers = {} as OutgoingHttpHeaders;

        const promise = auth.applyAuthentication(user, opts);
        return expect(promise).to.eventually.be.rejected.and.not.instanceOf(TypeError);
    });

    it('should throw on exec errors', () => {
        // TODO: fix this test for Windows
        if (process.platform === 'win32') {
            return;
        }
        const auth = new ExecAuth();

        (auth as any).execFn = (
            command: string,
            args?: readonly string[],
            options?: child_process.SpawnOptionsWithoutStdio,
        ): child_process.ChildProcessWithoutNullStreams => {
            return {
                stdout: {
                    setEncoding: () => {},
                    on: (_data: string, f: (data: Buffer | string) => void) => {
                        f(Buffer.from(JSON.stringify({ status: { token: 'foo' } })));
                    },
                },
                stderr: {
                    setEncoding: () => {},
                    on: (_data: string, f: (data: Buffer | string) => void) => {
                        f(Buffer.from('Some error!'));
                    },
                },
                on: (op: string, f: any) => {
                    if (op === 'close') {
                        f(100);
                    }
                },
            } as unknown as child_process.ChildProcessWithoutNullStreams;
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
        const opts = {} as https.RequestOptions;
        opts.headers = {} as OutgoingHttpHeaders;

        const promise = auth.applyAuthentication(user, opts);
        return expect(promise).to.eventually.be.rejected;
    });

    it('should exec with env vars', async () => {
        // TODO: fix this test for Windows
        if (process.platform === 'win32') {
            return;
        }
        const auth = new ExecAuth();
        let optsOut: child_process.SpawnOptions | undefined = {};
        (auth as any).execFn = (
            command: string,
            args?: readonly string[],
            options?: child_process.SpawnOptionsWithoutStdio,
        ): child_process.ChildProcessWithoutNullStreams => {
            optsOut = options;
            return {
                stdout: {
                    setEncoding: () => {},
                    on: (_data: string, f: (data: Buffer | string) => void) => {
                        f(Buffer.from(JSON.stringify({ status: { token: 'foo' } })));
                    },
                },
                stderr: {
                    setEncoding: () => {},
                    on: () => {},
                },
                on: (op: string, f: any) => {
                    if (op === 'close') {
                        f(0);
                    }
                },
            } as unknown as child_process.ChildProcessWithoutNullStreams;
        };

        process.env.BLABBLE = 'flubble';
        const opts = {} as https.RequestOptions;
        opts.headers = {} as OutgoingHttpHeaders;

        await auth.applyAuthentication(
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
        expect(optsOut.env!.foo).to.equal('bar');
        expect(optsOut.env!.PATH).to.equal(process.env.PATH);
        expect(optsOut.env!.BLABBLE).to.equal(process.env.BLABBLE);
    });

    it('should handle empty headers array correctly', async () => {
        // TODO: fix this test for Windows
        if (process.platform === 'win32') {
            return;
        }
        const auth = new ExecAuth();
        (auth as any).execFn = (
            command: string,
            args?: readonly string[],
            options?: child_process.SpawnOptionsWithoutStdio,
        ): child_process.ChildProcessWithoutNullStreams => {
            return {
                stdout: {
                    setEncoding: () => {},
                    on: (_data: string, f: (data: Buffer | string) => void) => {
                        f(Buffer.from(JSON.stringify({ status: { token: 'foo' } })));
                    },
                },
                stderr: {
                    setEncoding: () => {},
                    on: () => {},
                },
                on: (op: string, f: any) => {
                    if (op === 'close') {
                        f(0);
                    }
                },
            } as unknown as child_process.ChildProcessWithoutNullStreams;
        };

        const opts = {} as https.RequestOptions;
        await auth.applyAuthentication(
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
        expect(opts.headers?.Authorization).to.equal('Bearer foo');
    });
});
