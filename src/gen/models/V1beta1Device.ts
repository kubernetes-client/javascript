/**
 * Kubernetes
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * OpenAPI spec version: v1.32.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { V1beta1BasicDevice } from '../models/V1beta1BasicDevice.js';
import { HttpFile } from '../http/http.js';

/**
* Device represents one individual hardware instance that can be selected based on its attributes. Besides the name, exactly one field must be set.
*/
export class V1beta1Device {
    'basic'?: V1beta1BasicDevice;
    /**
    * Name is unique identifier among all devices managed by the driver in the pool. It must be a DNS label.
    */
    'name': string;

    static readonly discriminator: string | undefined = undefined;

    static readonly mapping: {[index: string]: string} | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "basic",
            "baseName": "basic",
            "type": "V1beta1BasicDevice",
            "format": ""
        },
        {
            "name": "name",
            "baseName": "name",
            "type": "string",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return V1beta1Device.attributeTypeMap;
    }

    public constructor() {
    }
}