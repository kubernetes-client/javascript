import { JSONPath } from 'jsonpath-plus';

export function jsonpath(path: string, json: object): any {
    return JSONPath({
        path,
        json,

        preventEval: true,
    });
}
