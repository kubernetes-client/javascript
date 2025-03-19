import { RequestContext, ConfigurationOptions, HttpMethod, ObservableMiddleware } from './gen/index.js';
import { deepStrictEqual } from 'node:assert';
import { setHeaderMiddleware, setHeaderOptions } from './middleware.js';

describe('Middleware', async () => {
    describe('setHeaderMiddleware', async () => {
        it('should set a header when it is blank', async () => {
            const reqContext = new RequestContext('http://nowhere.com', HttpMethod.GET);
            deepStrictEqual(reqContext.getHeaders(), {});
            const headerMiddleware = setHeaderMiddleware('test-key', 'test-value');
            const postMiddlewareRequestObservable = await headerMiddleware.pre(reqContext);
            const postMiddlewareRequest = await postMiddlewareRequestObservable.toPromise();
            deepStrictEqual(postMiddlewareRequest.getHeaders(), { 'test-key': 'test-value' });
        });

        it('should replace a header if it is already specified', async () => {
            const reqContext = new RequestContext('http://nowhere.com', HttpMethod.GET);
            reqContext.setHeaderParam('test-key', 'wrong-value');
            deepStrictEqual(reqContext.getHeaders(), { 'test-key': 'wrong-value' });
            const headerMiddleware = setHeaderMiddleware('test-key', 'test-value');
            const postMiddlewareRequest = await headerMiddleware.pre(reqContext);
            await postMiddlewareRequest.toPromise().then((request) => {
                deepStrictEqual(request.getHeaders(), { 'test-key': 'test-value' });
            });
        });
    });

    describe('setHeaderOptions', async () => {
        it('should add middleware to set header with no input options arg', async () => {
            const reqContext = new RequestContext('http://nowhere.com', HttpMethod.GET);
            deepStrictEqual(reqContext.getHeaders(), {});
            const testConfigurationOptions: ConfigurationOptions<ObservableMiddleware> = {};
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

            await postMiddlewareRequest.toPromise().then((request) => {
                deepStrictEqual(request.getHeaders(), { 'test-key': 'test-value' });
            });
        });
    });
});
