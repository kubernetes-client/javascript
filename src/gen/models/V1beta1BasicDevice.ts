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

import { V1beta1DeviceAttribute } from '../models/V1beta1DeviceAttribute.js';
import { V1beta1DeviceCapacity } from '../models/V1beta1DeviceCapacity.js';
import { HttpFile } from '../http/http.js';

/**
* BasicDevice defines one device instance.
*/
export class V1beta1BasicDevice {
    /**
    * Attributes defines the set of attributes for this device. The name of each attribute must be unique in that set.  The maximum number of attributes and capacities combined is 32.
    */
    'attributes'?: { [key: string]: V1beta1DeviceAttribute; };
    /**
    * Capacity defines the set of capacities for this device. The name of each capacity must be unique in that set.  The maximum number of attributes and capacities combined is 32.
    */
    'capacity'?: { [key: string]: V1beta1DeviceCapacity; };

    static readonly discriminator: string | undefined = undefined;

    static readonly mapping: {[index: string]: string} | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "attributes",
            "baseName": "attributes",
            "type": "{ [key: string]: V1beta1DeviceAttribute; }",
            "format": ""
        },
        {
            "name": "capacity",
            "baseName": "capacity",
            "type": "{ [key: string]: V1beta1DeviceCapacity; }",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return V1beta1BasicDevice.attributeTypeMap;
    }

    public constructor() {
    }
}
