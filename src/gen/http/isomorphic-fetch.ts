import {HttpLibrary, RequestContext, ResponseContext} from './http.js';
import { from, Observable } from '../rxjsStub.js';

export class IsomorphicFetchHttpLibrary implements HttpLibrary {

    public send(request: RequestContext): Observable<ResponseContext> {
        let method = request.getHttpMethod().toString();
        let body = request.getBody();

        const resultPromise = fetch(request.getUrl(), {
            method: method,
            body: body as any,
            headers: request.getHeaders(),
            signal: request.getSignal(),
            agent: request.getAgent(),
        } as any).then((resp: any) => {
            const headers: { [name: string]: string } = {};
            resp.headers.forEach((value: string, name: string) => {
              headers[name] = value;
            });

            const body = {
              text: () => resp.text(),
              binary: () => resp.arrayBuffer().then((ab: ArrayBuffer) => Buffer.from(ab))
            };
            return new ResponseContext(resp.status, headers, body);
        });

        return from<Promise<ResponseContext>>(resultPromise);

    }
}
