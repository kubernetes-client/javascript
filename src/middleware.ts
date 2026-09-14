import type {
    RequestContext,
    ResponseContext,
    ConfigurationOptions,
    ObservableMiddleware,
} from './gen/index.js';
import { of } from './gen/rxjsStub.js';

export function setHeaderMiddleware(key: string, value: string): ObservableMiddleware {
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

/**
 * Aborts a request after the given number of milliseconds, regardless of request activity.
 *
 * Uses Node.js's native AbortSignal.timeout(), whose timer does not keep the process running and
 * can be reclaimed after the signal is no longer referenced. Streaming response bodies must be
 * consumed or canceled so the HTTP client can release its abort listeners.
 */
export function requestTimeoutMiddleware(milliseconds: number): ObservableMiddleware {
    return {
        pre: (request: RequestContext) => {
            request.setSignal(AbortSignal.timeout(milliseconds));
            return of(request);
        },
        post: (response: ResponseContext) => {
            return of(response);
        },
    };
}

/** Returns call options that abort a request after the given number of milliseconds. */
export function setRequestTimeoutOptions(
    milliseconds: number,
    opt?: ConfigurationOptions<ObservableMiddleware>,
): ConfigurationOptions<ObservableMiddleware> {
    const existingMiddleware = opt?.middleware || [];
    return {
        ...opt,
        middleware: existingMiddleware.concat(requestTimeoutMiddleware(milliseconds)),
        middlewareMergeStrategy: 'append',
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
