import {
    RequestContext,
    ResponseContext,
    ConfigurationOptions,
    Middleware,
    HttpMethod,
} from './gen/index.js';
import { deepStrictEqual, ok, rejects, strictEqual } from 'node:assert';
import { setHeaderMiddleware, setHeaderOptions } from './middleware.js';
import { PromiseMiddleware } from './gen/middleware.js';

describe('Middleware', async () => {
    describe('setHeaderMiddleware', async () => {
        it('should set a header when it is blank', async () => {
            const reqContext = new RequestContext('http://nowhere.com', HttpMethod.GET);
            deepStrictEqual(reqContext.getHeaders(), {});
            const headerMiddleware = setHeaderMiddleware('test-key', 'test-value');
            const postMiddlewareRequest = await headerMiddleware[0].pre(reqContext);
            deepStrictEqual(postMiddlewareRequest.getHeaders(), { 'test-key': 'test-value' });
        });

        it('should replace a header if it is already specified', async () => {
            const reqContext = new RequestContext('http://nowhere.com', HttpMethod.GET);
            reqContext.setHeaderParam('test-key', 'wrong-value');
            deepStrictEqual(reqContext.getHeaders(), { 'test-key': 'wrong-value' });
            const headerMiddleware = setHeaderMiddleware('test-key', 'test-value');
            const postMiddlewareRequest = await headerMiddleware[0].pre(reqContext);
            deepStrictEqual(postMiddlewareRequest.getHeaders(), { 'test-key': 'test-value' });
        });
    });

    describe('setHeaderOptions', async () => {
        it('should add middleware to set header with no input options arg', async () => {
            const reqContext = new RequestContext('http://nowhere.com', HttpMethod.GET);
            deepStrictEqual(reqContext.getHeaders(), {});
            const testConfigurationOptions: ConfigurationOptions<PromiseMiddleware> = {};
            const headerConfigurationOptions = setHeaderOptions(
                'test-key',
                'test-value',
                testConfigurationOptions,
            );
            if (
                headerConfigurationOptions.middleware === undefined ||
                headerConfigurationOptions.middleware.length < 1
            ) {
                throw new Error('missing middleware in ConfigurationOptions');
            }
            const postMiddlewareRequest = await headerConfigurationOptions.middleware[0].pre(reqContext);
            deepStrictEqual(postMiddlewareRequest.getHeaders(), { 'test-key': 'test-value' });
        });
    });
});
