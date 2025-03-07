/**
 * Kubernetes
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * OpenAPI spec version: v1.30.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { V1alpha2ResourceRequest } from '../models/V1alpha2ResourceRequest.js';
import { HttpFile } from '../http/http.js';

/**
* DriverRequests describes all resources that are needed from one particular driver.
*/
export class V1alpha2DriverRequests {
    /**
    * DriverName is the name used by the DRA driver kubelet plugin.
    */
    'driverName'?: string;
    /**
    * Requests describes all resources that are needed from the driver.
    */
    'requests'?: Array<V1alpha2ResourceRequest>;
    /**
    * VendorParameters are arbitrary setup parameters for all requests of the claim. They are ignored while allocating the claim.
    */
    'vendorParameters'?: any;

    static readonly discriminator: string | undefined = undefined;

    static readonly mapping: {[index: string]: string} | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "driverName",
            "baseName": "driverName",
            "type": "string",
            "format": ""
        },
        {
            "name": "requests",
            "baseName": "requests",
            "type": "Array<V1alpha2ResourceRequest>",
            "format": ""
        },
        {
            "name": "vendorParameters",
            "baseName": "vendorParameters",
            "type": "any",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return V1alpha2DriverRequests.attributeTypeMap;
    }

    public constructor() {
    }
}
