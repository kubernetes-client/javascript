import type { RequestContext, ResponseContext, ConfigurationOptions, Middleware } from './gen/index.js';
import { PromiseMiddleware } from './gen/middleware.js';

// withHeaderMiddleware returns Middleware[] that sets a header value
export function withHeaderMiddleware(key: string, value: string): Middleware[] {
    return [
        {
            pre: (c: RequestContext) => {
                return new Promise<RequestContext>((resolve) => {
                    c.setHeaderParam(key, value);
                    resolve(c);
                });
            },
            post: (c: ResponseContext) => {
                return new Promise<ResponseContext>((resolve) => {
                    resolve(c);
                });
            },
        },
    ];
}

// Returns ConfigurationOptions that set a header
export function withHeaderOptions(
    key: string,
    value: string,
    opt?: ConfigurationOptions<PromiseMiddleware>,
): ConfigurationOptions<PromiseMiddleware> {
    const newMiddlware = withHeaderMiddleware(key, value);
    const existingMiddlware = opt?.middleware || [];
    return {
        ...opt,
        middleware: existingMiddlware.concat(newMiddlware),
        middlewareMergeStrategy: 'append', // preserve chained middleware from opt
    };
}
