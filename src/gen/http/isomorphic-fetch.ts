import {HttpLibrary, RequestContext, ResponseContext} from './http.js';
import { from, Observable } from '../rxjsStub.js';
import fetch from "node-fetch";

export class IsomorphicFetchHttpLibrary implements HttpLibrary {

    public send(request: RequestContext): Observable<ResponseContext> {
        let method = request.getHttpMethod().toString();
        let body = request.getBody();

        const controller = new AbortController();
        const userSignal = request.getSignal();

        //if the user already set a signal, pipe abort events
        if(userSignal){
          userSignal.addEventListener("abort", () => controller.abort())
        }

        const timeout = request.getTimeout();
        let timeoutId : NodeJS.Timeout | undefined;
        if(timeout){
          timeoutId = setTimeout (() => {
              controller.abort()
          }, timeout)
        }

        const resultPromise = fetch(request.getUrl(), {
            method: method,
            body: body as any,
            headers: request.getHeaders(),
            signal: controller.signal,
            agent: request.getAgent(),
        }).then((resp: any) => {

            if(timeoutId){
              clearTimeout(timeoutId)
            }

            const headers: { [name: string]: string } = {};
            resp.headers.forEach((value: string, name: string) => {
              headers[name] = value;
            });

            const body = {
              text: () => resp.text(),
              binary: () => resp.buffer()
            };
            return new ResponseContext(resp.status, headers, body);
        });

        return from<Promise<ResponseContext>>(resultPromise);

    }
}
