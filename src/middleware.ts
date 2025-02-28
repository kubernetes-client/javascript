import type { RequestContext, ResponseContext, ConfigurationOptions, Middleware } from './gen/index.js';
import { PromiseMiddleware } from './gen/middleware.js';

// setHeaderMiddleware returns Middleware[] that sets a header value
export function setHeaderMiddleware(key: string, value: string): Middleware[] {
    return [
        {
            pre: async (c: RequestContext) => {
                c.setHeaderParam(key, value);
                return c;
            },
            post: async (c: ResponseContext) => {
                return c;
            },
        },
    ];
}

// Returns ConfigurationOptions that set a header
export function setHeaderOptions(
    key: string,
    value: string,
    opt?: ConfigurationOptions<PromiseMiddleware>,
): ConfigurationOptions<PromiseMiddleware> {
    const newMiddlware = setHeaderMiddleware(key, value);
    const existingMiddlware = opt?.middleware || [];
    return {
        ...opt,
        middleware: existingMiddlware.concat(newMiddlware),
        middlewareMergeStrategy: 'append', // preserve chained middleware from opt
    };
}
