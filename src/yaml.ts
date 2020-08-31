import * as yaml from 'js-yaml';

export function loadYaml<T = any>(data: string, opts?: yaml.LoadOptions): T | undefined {
    return (yaml.safeLoad(data, opts) as unknown) as T | undefined;
}

export function loadAllYaml(data: string, opts?: yaml.LoadOptions): any[] {
    return yaml.safeLoadAll(data, undefined, opts);
}

export function dumpYaml(object: any, opts?: yaml.DumpOptions): string {
    return yaml.safeDump(object, opts);
}
