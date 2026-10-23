import fs from 'node:fs';
import path from 'node:path';
import * as yaml from 'js-yaml';

/**
 * Policy types for exec credential plugins, matching the `credentialPluginPolicy`
 * field of a kubectl `kuberc` file.
 * See https://kubernetes.io/docs/reference/kubectl/kuberc/#credential-plugin-policy
 */
export type ExecCredentialPluginPolicyType = 'AllowAll' | 'DenyAll' | 'Allowlist';

/**
 * A single entry of the `credentialPluginAllowlist`.
 */
export interface ExecCredentialPluginAllowlistEntry {
    /**
     * The basename or full path of a credential plugin which may be executed.
     */
    readonly command?: string;
    /**
     * Deprecated alias for `command`. Specifying both `name` and `command` is an error.
     */
    readonly name?: string;
}

/**
 * Application controlled policy for kubeconfig `exec` credential plugins.
 * The field names and semantics match the kubectl `kuberc` file.
 */
export interface ExecCredentialPluginPolicy {
    /**
     * An unspecified or empty policy is identical to `AllowAll`.
     */
    readonly credentialPluginPolicy?: ExecCredentialPluginPolicyType | '';
    /**
     * Required when the policy is `Allowlist`, and must not be set otherwise.
     */
    readonly credentialPluginAllowlist?: readonly ExecCredentialPluginAllowlistEntry[];
}

const KUBERC_API_VERSIONS = ['kubectl.config.k8s.io/v1beta1', 'kubectl.config.k8s.io/v1'];
const KUBERC_KIND = 'Preference';

/**
 * Thrown when an exec credential plugin is not permitted to run by the configured policy.
 * The error is thrown before any process is started.
 */
export class ExecCredentialPluginDeniedError extends Error {
    public readonly command: string;

    constructor(command: string, reason: string) {
        super(`Exec credential plugin '${command}' not allowed: ${reason}`);
        this.name = 'ExecCredentialPluginDeniedError';
        this.command = command;
    }
}

function cleanPath(p: string): string {
    const normalized = path.normalize(p);
    const root = path.parse(normalized).root;
    let result = normalized;
    while (result.length > root.length && (result.endsWith('/') || result.endsWith(path.sep))) {
        result = result.slice(0, -1);
    }
    return result;
}

function allowlistCommand(entry: ExecCredentialPluginAllowlistEntry, index: number): string {
    if (entry === null || typeof entry !== 'object') {
        throw new Error(`misconfigured credential plugin allowlist: invalid allowlist entry #${index + 1}`);
    }
    const hasCommand = entry.command !== undefined && entry.command !== null && entry.command !== '';
    const hasName = entry.name !== undefined && entry.name !== null && entry.name !== '';
    if (hasCommand && hasName) {
        throw new Error(
            `misconfigured credential plugin allowlist: entry #${index + 1} specifies both 'name' and 'command'`,
        );
    }
    const command = hasCommand ? entry.command : entry.name;
    if (!hasCommand && !hasName) {
        throw new Error(`misconfigured credential plugin allowlist: empty allowlist entry #${index + 1}`);
    }
    if (typeof command !== 'string') {
        throw new Error(`misconfigured credential plugin allowlist: invalid allowlist entry #${index + 1}`);
    }
    const cleaned = cleanPath(command);
    if (cleaned !== command) {
        throw new Error(`non-normalized file path: '${command}' vs '${cleaned}'`);
    }
    return command;
}

/**
 * Validates an exec credential plugin policy, throwing an Error if it is misconfigured.
 * @param policy the policy to validate, undefined is treated as `AllowAll`.
 */
export function validateExecCredentialPluginPolicy(policy?: ExecCredentialPluginPolicy | null): void {
    if (!policy) {
        return;
    }
    const type = policy.credentialPluginPolicy as string | null | undefined;
    switch (type) {
        case undefined:
        case null:
        case '':
        case 'AllowAll':
        case 'DenyAll':
            if (policy.credentialPluginAllowlist !== undefined && policy.credentialPluginAllowlist !== null) {
                throw new Error(
                    `misconfigured credential plugin allowlist: plugin policy is '${type ?? ''}' but allowlist is set`,
                );
            }
            return;
        case 'Allowlist': {
            const list = policy.credentialPluginAllowlist;
            if (list === undefined || list === null) {
                throw new Error("credential plugin policy set to 'Allowlist', but allowlist is unspecified");
            }
            if (!Array.isArray(list)) {
                throw new Error('misconfigured credential plugin allowlist: allowlist must be a list');
            }
            if (list.length === 0) {
                throw new Error(
                    "credential plugin policy set to 'Allowlist', but allowlist is empty; use 'DenyAll' policy instead",
                );
            }
            list.forEach((entry, ix) => allowlistCommand(entry, ix));
            return;
        }
        default:
            throw new Error(`unknown plugin policy: '${type}'`);
    }
}

function isExecutableFile(file: string, platform: string): boolean {
    try {
        const stat = fs.statSync(file);
        if (!stat.isFile()) {
            return false;
        }
        return platform === 'win32' || (stat.mode & 0o111) !== 0;
    } catch {
        return false;
    }
}

function findExecutable(file: string, platform: string, env: NodeJS.ProcessEnv): string | null {
    if (platform !== 'win32' || path.extname(file) !== '') {
        if (isExecutableFile(file, platform)) {
            return file;
        }
        if (platform !== 'win32') {
            return null;
        }
    }
    const exts = (env.PATHEXT || '.COM;.EXE;.BAT;.CMD').split(';').filter((ext) => ext.length > 0);
    for (const ext of exts) {
        if (isExecutableFile(file + ext, platform)) {
            return file + ext;
        }
    }
    return null;
}

/**
 * Resolves a command to the full path of an executable, similar to `exec.LookPath` in Go.
 * Commands containing a path separator are resolved relative to the current directory,
 * other commands are looked up in the absolute directories of `PATH`.
 * Neither symlinks nor shell globs are resolved.
 */
export function lookPath(
    command: string,
    env: NodeJS.ProcessEnv = process.env,
    platform: string = process.platform,
): string | null {
    if (!command) {
        return null;
    }
    if (path.basename(command) !== command || path.isAbsolute(command)) {
        return findExecutable(path.resolve(command), platform, env);
    }
    const searchPath = (platform === 'win32' ? (env.Path ?? env.PATH) : env.PATH) || '';
    for (const dir of searchPath.split(path.delimiter)) {
        // Relative PATH entries are ignored, they would depend on the current directory.
        if (!dir || !path.isAbsolute(dir)) {
            continue;
        }
        const found = findExecutable(path.join(dir, command), platform, env);
        if (found) {
            return found;
        }
    }
    return null;
}

/**
 * Checks an exec credential plugin command against a policy.
 *
 * @param policy the policy to apply, undefined is treated as `AllowAll`.
 * @param command the `command` of the kubeconfig exec configuration.
 * @param env the environment used to resolve the command, defaults to the process environment.
 * @returns the command which should be executed. For `AllowAll` this is the command unchanged;
 *     for `Allowlist` this is the resolved full path of the executable, so that the plugin
 *     environment can not change which executable is started.
 * @throws ExecCredentialPluginDeniedError if the plugin is not permitted to run.
 */
export function checkExecCredentialPluginPolicy(
    policy: ExecCredentialPluginPolicy | undefined | null,
    command: string,
    env: NodeJS.ProcessEnv = process.env,
): string {
    validateExecCredentialPluginPolicy(policy);
    const type = policy?.credentialPluginPolicy;
    if (!type || type === 'AllowAll') {
        return command;
    }
    if (type === 'DenyAll') {
        throw new ExecCredentialPluginDeniedError(command, "policy set to 'DenyAll'");
    }

    const entries = policy!.credentialPluginAllowlist!.map((entry, ix) => allowlistCommand(entry, ix));
    const cleaned = cleanPath(command);
    const resolved = lookPath(cleaned, env);
    if (!resolved) {
        throw new ExecCredentialPluginDeniedError(
            command,
            'plugin path cannot be resolved for credential plugin allowlist check',
        );
    }
    if (entries.includes(command) || entries.includes(cleaned) || entries.includes(resolved)) {
        return resolved;
    }
    for (const entry of entries) {
        if (lookPath(entry, env) === resolved) {
            return resolved;
        }
    }
    throw new ExecCredentialPluginDeniedError(
        command,
        'plugin is not permitted by the credential plugin allowlist',
    );
}

/**
 * Parses the credential plugin policy from the contents of a kubectl `kuberc` file.
 * Other preferences in the file (aliases, defaults) are ignored.
 * @param content the YAML contents of a kuberc file.
 */
export function parseKubercExecCredentialPluginPolicy(content: string): ExecCredentialPluginPolicy {
    if (content.trim() === '') {
        return {};
    }
    const obj = yaml.load(content) as any;
    if (obj === undefined || obj === null) {
        return {};
    }
    if (typeof obj !== 'object' || Array.isArray(obj)) {
        throw new Error('invalid kuberc: expected an object');
    }
    if (!KUBERC_API_VERSIONS.includes(obj.apiVersion) || obj.kind !== KUBERC_KIND) {
        throw new Error(
            `invalid kuberc: unsupported apiVersion '${obj.apiVersion}' or kind '${obj.kind}', expected one of ` +
                `${KUBERC_API_VERSIONS.join(', ')} and kind '${KUBERC_KIND}'`,
        );
    }
    const policy: ExecCredentialPluginPolicy = {
        credentialPluginPolicy: obj.credentialPluginPolicy,
        credentialPluginAllowlist: obj.credentialPluginAllowlist,
    };
    validateExecCredentialPluginPolicy(policy);
    return policy;
}
