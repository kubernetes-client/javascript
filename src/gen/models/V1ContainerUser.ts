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

import { V1LinuxContainerUser } from '../models/V1LinuxContainerUser.js';
import { HttpFile } from '../http/http.js';

/**
* ContainerUser represents user identity information
*/
export class V1ContainerUser {
    'linux'?: V1LinuxContainerUser;

    static readonly discriminator: string | undefined = undefined;

    static readonly mapping: {[index: string]: string} | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "linux",
            "baseName": "linux",
            "type": "V1LinuxContainerUser",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return V1ContainerUser.attributeTypeMap;
    }

    public constructor() {
    }
}
