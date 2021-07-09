import * as yaml from 'js-yaml';

export function loadYaml<T>(data: string, opts?: yaml.LoadOptions): T {
    return (yaml.load(data, opts) as any) as T;
}

export function loadAllYaml(data: string, opts?: yaml.LoadOptions): any[] {
    return yaml.loadAll(data, undefined, opts);
}

export function dumpYaml(object: any, opts?: yaml.DumpOptions): string {
    return yaml.dump(object, opts);
}
