import { after, before, describe, it } from 'node:test';
import { deepStrictEqual, rejects, strictEqual, throws } from 'node:assert';
import child_process from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { KubeConfig } from './config.js';
import { ExecAuth } from './exec_auth.js';
import {
    checkExecCredentialPluginPolicy,
    ExecCredentialPluginDeniedError,
    ExecCredentialPluginPolicy,
    lookPath,
    parseKubercExecCredentialPluginPolicy,
    validateExecCredentialPluginPolicy,
} from './exec_credential_policy.js';

const isWindows = process.platform === 'win32';

describe('ExecCredentialPluginPolicy', () => {
    let tmpDir: string;
    let binDir: string;
    let otherDir: string;
    let pluginPath: string;
    let otherPluginPath: string;
    let env: NodeJS.ProcessEnv;

    before(() => {
        tmpDir = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'exec-policy-')));
        binDir = path.join(tmpDir, 'bin');
        otherDir = path.join(tmpDir, 'other');
        fs.mkdirSync(binDir);
        fs.mkdirSync(otherDir);
        pluginPath = path.join(binDir, 'my-plugin');
        otherPluginPath = path.join(otherDir, 'my-plugin');
        fs.writeFileSync(pluginPath, '#!/bin/sh\n', { mode: 0o755 });
        fs.writeFileSync(otherPluginPath, '#!/bin/sh\n', { mode: 0o755 });
        fs.writeFileSync(path.join(binDir, 'not-executable'), '', { mode: 0o644 });
        env = { PATH: binDir };
    });

    after(() => {
        fs.rmSync(tmpDir, { recursive: true, force: true });
    });

    describe('validate', () => {
        it('should accept valid policies', () => {
            validateExecCredentialPluginPolicy(undefined);
            validateExecCredentialPluginPolicy({});
            validateExecCredentialPluginPolicy({ credentialPluginPolicy: '' });
            validateExecCredentialPluginPolicy({ credentialPluginPolicy: 'AllowAll' });
            validateExecCredentialPluginPolicy({ credentialPluginPolicy: 'DenyAll' });
            validateExecCredentialPluginPolicy({
                credentialPluginPolicy: 'Allowlist',
                credentialPluginAllowlist: [{ command: 'foo' }, { command: '/usr/bin/bar' }, { name: 'baz' }],
            });
        });

        it('should reject an unknown policy', () => {
            throws(
                () => validateExecCredentialPluginPolicy({ credentialPluginPolicy: 'Foo' as any }),
                /unknown plugin policy/,
            );
        });

        it('should reject an allowlist with a non Allowlist policy', () => {
            for (const credentialPluginPolicy of [undefined, '', 'AllowAll', 'DenyAll'] as const) {
                throws(
                    () =>
                        validateExecCredentialPluginPolicy({
                            credentialPluginPolicy,
                            credentialPluginAllowlist: [{ command: 'foo' }],
                        }),
                    /allowlist is set/,
                );
                throws(
                    () =>
                        validateExecCredentialPluginPolicy({
                            credentialPluginPolicy,
                            credentialPluginAllowlist: [],
                        }),
                    /allowlist is set/,
                );
            }
        });

        it('should reject a missing or empty allowlist', () => {
            throws(
                () => validateExecCredentialPluginPolicy({ credentialPluginPolicy: 'Allowlist' }),
                /allowlist is unspecified/,
            );
            throws(
                () =>
                    validateExecCredentialPluginPolicy({
                        credentialPluginPolicy: 'Allowlist',
                        credentialPluginAllowlist: [],
                    }),
                /allowlist is empty/,
            );
        });

        it('should reject invalid allowlist entries', () => {
            const check = (entry: any, msg: RegExp) =>
                throws(
                    () =>
                        validateExecCredentialPluginPolicy({
                            credentialPluginPolicy: 'Allowlist',
                            credentialPluginAllowlist: [{ command: 'ok' }, entry],
                        }),
                    msg,
                );
            check({}, /empty allowlist entry #2/);
            check({ command: '' }, /empty allowlist entry #2/);
            check({ name: 'foo', command: 'foo' }, /both 'name' and 'command'/);
            check({ command: './foo' }, /non-normalized/);
            check({ command: '/usr/bin/../bin/foo' }, /non-normalized/);
            check(null, /invalid allowlist entry #2/);
        });
    });

    describe('lookPath', { skip: isWindows }, () => {
        it('should resolve basenames using PATH', () => {
            strictEqual(lookPath('my-plugin', env), pluginPath);
            strictEqual(
                lookPath('my-plugin', { PATH: [otherDir, binDir].join(path.delimiter) }),
                otherPluginPath,
            );
            strictEqual(lookPath('missing', env), null);
            strictEqual(lookPath('not-executable', env), null);
            strictEqual(lookPath('my-plugin', {}), null);
        });

        it('should ignore relative PATH entries', () => {
            strictEqual(lookPath('my-plugin', { PATH: path.relative(process.cwd(), binDir) }), null);
        });

        it('should resolve paths', () => {
            strictEqual(lookPath(pluginPath, {}), pluginPath);
            strictEqual(lookPath(path.relative(process.cwd(), pluginPath), {}), pluginPath);
            strictEqual(lookPath(binDir, {}), null);
        });
    });

    describe('check', () => {
        it('should allow everything by default', () => {
            strictEqual(checkExecCredentialPluginPolicy(undefined, 'anything', env), 'anything');
            strictEqual(checkExecCredentialPluginPolicy({}, 'anything', env), 'anything');
            strictEqual(
                checkExecCredentialPluginPolicy({ credentialPluginPolicy: 'AllowAll' }, 'anything', env),
                'anything',
            );
        });

        it('should deny everything with DenyAll', () => {
            throws(
                () =>
                    checkExecCredentialPluginPolicy({ credentialPluginPolicy: 'DenyAll' }, 'my-plugin', env),
                (err: Error) => err instanceof ExecCredentialPluginDeniedError && /DenyAll/.test(err.message),
            );
        });

        it('should reject misconfigured policies', () => {
            throws(() =>
                checkExecCredentialPluginPolicy({ credentialPluginPolicy: 'Allowlist' }, 'my-plugin', env),
            );
        });

        describe('Allowlist', { skip: isWindows }, () => {
            const allowlist = (...commands: string[]): ExecCredentialPluginPolicy => ({
                credentialPluginPolicy: 'Allowlist',
                credentialPluginAllowlist: commands.map((command) => ({ command })),
            });

            it('should allow an exact basename match and return the resolved path', () => {
                strictEqual(
                    checkExecCredentialPluginPolicy(allowlist('my-plugin'), 'my-plugin', env),
                    pluginPath,
                );
            });

            it('should allow the deprecated name field', () => {
                strictEqual(
                    checkExecCredentialPluginPolicy(
                        {
                            credentialPluginPolicy: 'Allowlist',
                            credentialPluginAllowlist: [{ name: 'my-plugin' }],
                        },
                        'my-plugin',
                        env,
                    ),
                    pluginPath,
                );
            });

            it('should allow a full path entry when the command resolves to it', () => {
                strictEqual(
                    checkExecCredentialPluginPolicy(allowlist(pluginPath), 'my-plugin', env),
                    pluginPath,
                );
                strictEqual(
                    checkExecCredentialPluginPolicy(allowlist(pluginPath), pluginPath, env),
                    pluginPath,
                );
            });

            it('should allow a full path command when a basename entry resolves to it', () => {
                strictEqual(
                    checkExecCredentialPluginPolicy(allowlist('my-plugin'), pluginPath, env),
                    pluginPath,
                );
            });

            it('should deny a same-named executable in another directory', () => {
                throws(
                    () => checkExecCredentialPluginPolicy(allowlist('my-plugin'), otherPluginPath, env),
                    ExecCredentialPluginDeniedError,
                );
                throws(
                    () => checkExecCredentialPluginPolicy(allowlist(otherPluginPath), 'my-plugin', env),
                    ExecCredentialPluginDeniedError,
                );
            });

            it('should deny plugins not in the allowlist', () => {
                throws(
                    () => checkExecCredentialPluginPolicy(allowlist('foo', '/usr/bin/bar'), 'my-plugin', env),
                    /not permitted by the credential plugin allowlist/,
                );
            });

            it('should deny plugins which cannot be resolved', () => {
                throws(
                    () => checkExecCredentialPluginPolicy(allowlist('missing'), 'missing', env),
                    /cannot be resolved/,
                );
            });

            it('should not resolve symlinks', () => {
                const link = path.join(otherDir, 'link-plugin');
                fs.symlinkSync(pluginPath, link);
                try {
                    throws(
                        () => checkExecCredentialPluginPolicy(allowlist(link), pluginPath, env),
                        ExecCredentialPluginDeniedError,
                    );
                    strictEqual(checkExecCredentialPluginPolicy(allowlist(link), link, env), link);
                } finally {
                    fs.unlinkSync(link);
                }
            });
        });
    });

    describe('kuberc', () => {
        it('should parse the credential plugin policy', () => {
            const policy = parseKubercExecCredentialPluginPolicy(`
apiVersion: kubectl.config.k8s.io/v1beta1
kind: Preference
defaults:
  - command: delete
    options:
      - name: interactive
        default: "true"
credentialPluginPolicy: Allowlist
credentialPluginAllowlist:
  - command: my-trusted-binary
  - command: /usr/local/bin/my-other-trusted-binary
`);
            deepStrictEqual(policy, {
                credentialPluginPolicy: 'Allowlist',
                credentialPluginAllowlist: [
                    { command: 'my-trusted-binary' },
                    { command: '/usr/local/bin/my-other-trusted-binary' },
                ],
            });
        });

        it('should default to AllowAll', () => {
            deepStrictEqual(
                parseKubercExecCredentialPluginPolicy(
                    'apiVersion: kubectl.config.k8s.io/v1beta1\nkind: Preference\n',
                ),
                { credentialPluginPolicy: undefined, credentialPluginAllowlist: undefined },
            );
            deepStrictEqual(parseKubercExecCredentialPluginPolicy(''), {});
        });

        it('should reject invalid kuberc files', () => {
            throws(
                () => parseKubercExecCredentialPluginPolicy('apiVersion: v1\nkind: Config\n'),
                /invalid kuberc/,
            );
            throws(
                () =>
                    parseKubercExecCredentialPluginPolicy(
                        'apiVersion: kubectl.config.k8s.io/v1beta1\nkind: Preference\ncredentialPluginPolicy: Allowlist\ncredentialPluginAllowlist:\n  - command: ""\n',
                    ),
                /empty allowlist entry/,
            );
            throws(
                () =>
                    parseKubercExecCredentialPluginPolicy(
                        'apiVersion: kubectl.config.k8s.io/v1beta1\nkind: Preference\ncredentialPluginPolicy: DenyAll\ncredentialPluginAllowlist:\n  - command: foo\n',
                    ),
                /allowlist is set/,
            );
        });

        describe('KubeConfig.loadExecCredentialPluginPolicyFromKuberc', () => {
            const saved = {
                HOME: process.env.HOME,
                KUBERC: process.env.KUBERC,
                KUBECTL_KUBERC: process.env.KUBECTL_KUBERC,
            };
            const restore = () => {
                for (const [key, value] of Object.entries(saved)) {
                    if (value === undefined) {
                        Reflect.deleteProperty(process.env, key);
                    } else {
                        process.env[key] = value;
                    }
                }
            };
            const denyAll =
                'apiVersion: kubectl.config.k8s.io/v1beta1\nkind: Preference\ncredentialPluginPolicy: DenyAll\n';

            after(restore);

            it('should load an explicit file', () => {
                const file = path.join(tmpDir, 'explicit-kuberc');
                fs.writeFileSync(file, denyAll);
                const kc = new KubeConfig();
                deepStrictEqual(kc.loadExecCredentialPluginPolicyFromKuberc(file), {
                    credentialPluginPolicy: 'DenyAll',
                    credentialPluginAllowlist: undefined,
                });
                throws(() => kc.loadExecCredentialPluginPolicyFromKuberc(path.join(tmpDir, 'missing')));
            });

            it('should honor KUBERC and the default location', { skip: isWindows }, () => {
                const home = path.join(tmpDir, 'home');
                fs.mkdirSync(path.join(home, '.kube'), { recursive: true });
                process.env.HOME = home;
                delete process.env.KUBERC;
                delete process.env.KUBECTL_KUBERC;
                const kc = new KubeConfig();

                // missing default file is not an error
                strictEqual(kc.loadExecCredentialPluginPolicyFromKuberc(), undefined);

                fs.writeFileSync(path.join(home, '.kube', 'kuberc'), denyAll);
                strictEqual(kc.loadExecCredentialPluginPolicyFromKuberc()?.credentialPluginPolicy, 'DenyAll');

                process.env.KUBERC = 'off';
                strictEqual(kc.loadExecCredentialPluginPolicyFromKuberc(), undefined);

                process.env.KUBERC = path.join(tmpDir, 'missing');
                throws(() => kc.loadExecCredentialPluginPolicyFromKuberc());

                delete process.env.KUBERC;
                process.env.KUBECTL_KUBERC = 'false';
                strictEqual(kc.loadExecCredentialPluginPolicyFromKuberc(), undefined);
                restore();
            });
        });
    });

    describe('ExecAuth', () => {
        const user = (command: string, envVars?: { name: string; value: string }[]) => ({
            name: 'user',
            exec: { command, env: envVars },
        });
        const fakeExec = (calls: string[]) => (command: string) => {
            calls.push(command);
            return {
                stdout: {
                    setEncoding: () => {},
                    on: (_data: string, f: (data: string) => void) => {
                        f(JSON.stringify({ status: { token: 'foo' } }));
                    },
                },
                stderr: { setEncoding: () => {}, on: () => {} },
                on: (op: string, f: any) => {
                    if (op === 'close') {
                        f(0);
                    }
                },
            } as unknown as child_process.ChildProcessWithoutNullStreams;
        };

        it('should not start a process when denied', async () => {
            const auth = new ExecAuth({ credentialPluginPolicy: 'DenyAll' });
            const calls: string[] = [];
            (auth as any).execFn = fakeExec(calls);
            await rejects(auth.applyAuthentication(user('my-plugin'), {}), ExecCredentialPluginDeniedError);
            deepStrictEqual(calls, []);
        });

        it('should reject invalid policies', () => {
            throws(() => new ExecAuth({ credentialPluginPolicy: 'Allowlist' }));
            const kc = new KubeConfig();
            throws(() => kc.setExecCredentialPluginPolicy({ credentialPluginPolicy: 'Allowlist' }));
        });

        it('should run the resolved path for allowlisted plugins', { skip: isWindows }, async () => {
            const savedPath = process.env.PATH;
            process.env.PATH = binDir;
            try {
                const auth = new ExecAuth({
                    credentialPluginPolicy: 'Allowlist',
                    credentialPluginAllowlist: [{ command: 'my-plugin' }],
                });
                const calls: string[] = [];
                (auth as any).execFn = fakeExec(calls);
                const opts = { headers: {} } as any;
                // a kubeconfig supplied PATH must not change which executable is started
                await auth.applyAuthentication(user('my-plugin', [{ name: 'PATH', value: otherDir }]), opts);
                deepStrictEqual(calls, [pluginPath]);
                strictEqual(opts.headers.Authorization, ['Bearer', 'foo'].join(' '));
            } finally {
                process.env.PATH = savedPath;
            }
        });

        it('should apply policy changes to cached credentials', async () => {
            const auth = new ExecAuth();
            const calls: string[] = [];
            (auth as any).execFn = fakeExec(calls);
            await auth.applyAuthentication(user('my-plugin'), {});
            strictEqual(calls.length, 1);
            auth.setPolicy({ credentialPluginPolicy: 'DenyAll' });
            await rejects(auth.applyAuthentication(user('my-plugin'), {}), ExecCredentialPluginDeniedError);
            strictEqual(calls.length, 1);
        });

        it('should be applied by KubeConfig', async () => {
            const kc = new KubeConfig();
            kc.loadFromClusterAndUser(
                { name: 'c', server: 'https://localhost', skipTLSVerify: false },
                user('my-plugin') as any,
            );
            kc.setExecCredentialPluginPolicy({ credentialPluginPolicy: 'DenyAll' });
            await rejects(kc.applyToHTTPSOptions({}), ExecCredentialPluginDeniedError);
        });
    });
});
