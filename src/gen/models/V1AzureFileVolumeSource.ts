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

import { HttpFile } from '../http/http.js';

/**
* AzureFile represents an Azure File Service mount on the host and bind mount to the pod.
*/
export class V1AzureFileVolumeSource {
    /**
    * readOnly defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.
    */
    'readOnly'?: boolean;
    /**
    * secretName is the  name of secret that contains Azure Storage Account Name and Key
    */
    'secretName': string;
    /**
    * shareName is the azure share Name
    */
    'shareName': string;

    static readonly discriminator: string | undefined = undefined;

    static readonly mapping: {[index: string]: string} | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "readOnly",
            "baseName": "readOnly",
            "type": "boolean",
            "format": ""
        },
        {
            "name": "secretName",
            "baseName": "secretName",
            "type": "string",
            "format": ""
        },
        {
            "name": "shareName",
            "baseName": "shareName",
            "type": "string",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return V1AzureFileVolumeSource.attributeTypeMap;
    }

    public constructor() {
    }
}
