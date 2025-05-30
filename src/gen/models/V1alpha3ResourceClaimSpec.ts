/**
 * Kubernetes
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * OpenAPI spec version: v1.33.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { V1alpha3DeviceClaim } from '../models/V1alpha3DeviceClaim.js';
import { HttpFile } from '../http/http.js';

/**
* ResourceClaimSpec defines what is being requested in a ResourceClaim and how to configure it.
*/
export class V1alpha3ResourceClaimSpec {
    'devices'?: V1alpha3DeviceClaim;

    static readonly discriminator: string | undefined = undefined;

    static readonly mapping: {[index: string]: string} | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "devices",
            "baseName": "devices",
            "type": "V1alpha3DeviceClaim",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return V1alpha3ResourceClaimSpec.attributeTypeMap;
    }

    public constructor() {
    }
}
