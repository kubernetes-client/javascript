import { rejects, strictEqual } from 'node:assert';
import https from 'node:https';
import { OutgoingHttpHeaders } from 'node:http';

import { ExecAuth } from './exec_auth.js';
import { User } from './config_types.js';

import child_process from 'node:child_process';

describe('ExecAuth', () => {
    it('should claim correctly', () => {
        const auth = new ExecAuth();

        const unk: unknown = null;
        strictEqual(auth.isAuthProvider(unk as User), false);

        const empty = {} as User;
        strictEqual(auth.isAuthProvider(empty), false);

        const exec = {
            exec: {},
        } as User;
        strictEqual(auth.isAuthProvider(exec), true);

        const execName = {
            authProvider: {
                name: 'exec',
            },
        } as User;
        strictEqual(auth.isAuthProvider(execName), true);

        const execConfig = {
            authProvider: {
                config: {
                    exec: {},
                },
            },
        } as User;
        strictEqual(auth.isAuthProvider(execConfig), true);

        const azureConfig = {
            authProvider: {
                name: 'azure',
                config: {
                    azure: {},
                },
            },
        } as User;
        strictEqual(auth.isAuthProvider(azureConfig), false);
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
        strictEqual(opts.headers.Authorization, 'Bearer foo');
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
        strictEqual(opts.headers.Authorization, undefined);
        strictEqual(opts.cert, 'foo');
        strictEqual(opts.key, 'bar');
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
        strictEqual(opts.headers.Authorization, `Bearer ${tokenValue}`);
        strictEqual(execCount, 1);

        // old token should be expired, set expiration for the new token for the future.
        expire = '29 Mar 2095 00:00:00 GMT';
        tokenValue = 'bar';
        await auth.applyAuthentication(user, opts);
        strictEqual(opts.headers.Authorization, `Bearer ${tokenValue}`);
        strictEqual(execCount, 2);

        // Should use cached token, execCount should stay at two, token shouldn't change
        tokenValue = 'baz';
        await auth.applyAuthentication(user, opts);
        strictEqual(opts.headers.Authorization, 'Bearer bar');
        strictEqual(execCount, 2);
    });

    it('should return null on no exec info', async () => {
        const auth = new ExecAuth();
        const opts = {} as https.RequestOptions;
        opts.headers = {} as OutgoingHttpHeaders;

        await auth.applyAuthentication({} as User, opts);
        strictEqual(opts.headers.Authorization, undefined);
    });

    it('should handle returned errors correctly', async () => {
        const auth = new ExecAuth();
        (auth as any).execFn = (
            command: string,
            args?: readonly string[],
            options?: child_process.SpawnOptionsWithoutStdio,
        ): child_process.ChildProcessWithoutNullStreams => {
            return {
                stdout: {
                    setEncoding: () => {},
                    on: () => {},
                },
                stderr: {
                    setEncoding: () => {},
                    on: () => {},
                },
                on: (op: string, f: any) => {
                    if (op === 'error') {
                        f(new Error('Some error!'));
                    }
                    if (op === 'close') {
                        f(1);
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
        await rejects(promise, { name: 'Error' });
    });

    it('should throw on spawnSync errors', async () => {
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
        await rejects(promise, { name: 'Error' });
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
        return rejects(promise);
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
        strictEqual(optsOut.env!.foo, 'bar');
        strictEqual(optsOut.env!.PATH, process.env.PATH);
        strictEqual(optsOut.env!.BLABBLE, process.env.BLABBLE);
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
        strictEqual(opts.headers?.Authorization, 'Bearer foo');
    });
    it('should handle null credentials correctly', async () => {
        const auth = new ExecAuth();
        // Fake out Typescript
        const res = (auth as any).getToken(null);
        strictEqual(res, null);
    });

    it('should handle parse errors correctly', async () => {
        const auth = new ExecAuth();
        (auth as any).execFn = (
            command: string,
            args?: readonly string[],
            options?: child_process.SpawnOptionsWithoutStdio,
        ): child_process.ChildProcessWithoutNullStreams => {
            return {
                stdout: {
                    setEncoding: () => {},
                    on: () => {},
                },
                stderr: {
                    setEncoding: () => {},
                    on: () => {},
                },
                on: (op: string, f: any) => {
                    if (op === 'data') {
                        // Invalid JSON
                        f('foo');
                    }
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
                        command: '/path/to/bin',
                    },
                },
            },
        };
        const opts = {} as https.RequestOptions;
        opts.headers = {} as OutgoingHttpHeaders;

        const promise = auth.applyAuthentication(user, opts);
        await rejects(promise, { name: 'SyntaxError' });
    });
});
