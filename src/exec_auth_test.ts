import { expect } from 'chai';
import * as shell from 'shelljs';

import execa = require('execa');
import { ExecAuth } from './exec_auth';

describe('ExecAuth', () => {
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

        const token = auth.getToken({
            name: 'user',
            authProvider: {
                config: {
                    exec: {
                        command: 'echo',
                    },
                },
            },
        });
        expect(token).to.equal('Bearer foo');
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
        const token = auth.getToken({
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
        });
        expect(optsOut.env.foo).to.equal('bar');
        expect(optsOut.env.PATH).to.equal(process.env.PATH);
        expect(optsOut.env.BLABBLE).to.equal(process.env.BLABBLE);
    });
});
