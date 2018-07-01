import api = require('./api');
export declare class Core_v1Api extends api.Core_v1Api {
    constructor(baseUri: string);
    setDefaultAuthentication(auth: api.Authentication): void;
}
export declare class Extensions_v1beta1Api extends api.Extensions_v1beta1Api {
    constructor(baseUri: string);
    setDefaultAuthentication(auth: api.Authentication): void;
}
