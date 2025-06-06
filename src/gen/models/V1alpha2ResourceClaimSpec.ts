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

import { V1alpha2ResourceClaimParametersReference } from '../models/V1alpha2ResourceClaimParametersReference.js';
import { HttpFile } from '../http/http.js';

/**
* ResourceClaimSpec defines how a resource is to be allocated.
*/
export class V1alpha2ResourceClaimSpec {
    /**
    * Allocation can start immediately or when a Pod wants to use the resource. \"WaitForFirstConsumer\" is the default.
    */
    'allocationMode'?: string;
    'parametersRef'?: V1alpha2ResourceClaimParametersReference;
    /**
    * ResourceClassName references the driver and additional parameters via the name of a ResourceClass that was created as part of the driver deployment.
    */
    'resourceClassName': string;

    static readonly discriminator: string | undefined = undefined;

    static readonly mapping: {[index: string]: string} | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "allocationMode",
            "baseName": "allocationMode",
            "type": "string",
            "format": ""
        },
        {
            "name": "parametersRef",
            "baseName": "parametersRef",
            "type": "V1alpha2ResourceClaimParametersReference",
            "format": ""
        },
        {
            "name": "resourceClassName",
            "baseName": "resourceClassName",
            "type": "string",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return V1alpha2ResourceClaimSpec.attributeTypeMap;
    }

    public constructor() {
    }
}
