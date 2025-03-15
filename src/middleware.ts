import type {
    RequestContext,
    ResponseContext,
    ConfigurationOptions,
    ObservableMiddleware,
} from './gen/index.js';
import { of } from './gen/rxjsStub.js';

function setHeaderMiddleware(key: string, value: string): ObservableMiddleware {
    return {
        pre: (request: RequestContext) => {
            request.setHeaderParam(key, value);
            return of(request);
        },
        post: (response: ResponseContext) => {
            return of(response);
        },
    };
}

// Returns ConfigurationOptions that set a header
export function setHeaderOptions(
    key: string,
    value: string,
    opt?: ConfigurationOptions<ObservableMiddleware>,
): ConfigurationOptions<ObservableMiddleware> {
    const newMiddlware = setHeaderMiddleware(key, value);
    const existingMiddlware = opt?.middleware || [];
    return {
        ...opt,
        middleware: existingMiddlware.concat(newMiddlware),
        middlewareMergeStrategy: 'append', // preserve chained middleware from opt
    };
}
