import { RequestContext, HttpMethod } from '../src/gen/http/http.ts';
import { IsomorphicFetchHttpLibrary } from '../src/gen/http/isomorphic-fetch.ts';

const http = new IsomorphicFetchHttpLibrary();

// URL that delays response for 5 seconds
const req = new RequestContext('https://httpbin.org/delay/5', HttpMethod.GET);
req.setTimeout(2000); // 2s timeout

http.send(req)
    .toPromise?.()
    .then(console.log)
    .catch((err) => console.error('TIMED OUT:', err));
