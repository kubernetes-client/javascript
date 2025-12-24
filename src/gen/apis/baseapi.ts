import { Configuration } from '../configuration.js'

/**
 *
 * @export
 */
export const COLLECTION_FORMATS = {
    csv: ",",
    ssv: " ",
    tsv: "\t",
    pipes: "|",
};


/**
 *
 * @export
 * @class BaseAPI
 */
export class BaseAPIRequestFactory {

    protected configuration: Configuration;
    constructor( config: Configuration) {
        this.configuration = config;
    }
};

/**
 *
 * @export
 * @class RequiredError
 * @extends {Error}
 */
export class RequiredError extends Error {
    override name: "RequiredError" = "RequiredError";
    public api: string;
    public method: string;
    public field: string;
    constructor(api: string, method: string, field: string) {
        super("Required parameter " + field + " was null or undefined when calling " + api + "." + method + ".");
        this.api = api;
        this.method = method;
        this.field = field;
    }
}
