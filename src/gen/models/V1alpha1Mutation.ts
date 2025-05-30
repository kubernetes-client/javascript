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

import { V1alpha1ApplyConfiguration } from '../models/V1alpha1ApplyConfiguration.js';
import { V1alpha1JSONPatch } from '../models/V1alpha1JSONPatch.js';
import { HttpFile } from '../http/http.js';

/**
* Mutation specifies the CEL expression which is used to apply the Mutation.
*/
export class V1alpha1Mutation {
    'applyConfiguration'?: V1alpha1ApplyConfiguration;
    'jsonPatch'?: V1alpha1JSONPatch;
    /**
    * patchType indicates the patch strategy used. Allowed values are \"ApplyConfiguration\" and \"JSONPatch\". Required.
    */
    'patchType': string;

    static readonly discriminator: string | undefined = undefined;

    static readonly mapping: {[index: string]: string} | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "applyConfiguration",
            "baseName": "applyConfiguration",
            "type": "V1alpha1ApplyConfiguration",
            "format": ""
        },
        {
            "name": "jsonPatch",
            "baseName": "jsonPatch",
            "type": "V1alpha1JSONPatch",
            "format": ""
        },
        {
            "name": "patchType",
            "baseName": "patchType",
            "type": "string",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return V1alpha1Mutation.attributeTypeMap;
    }

    public constructor() {
    }
}
