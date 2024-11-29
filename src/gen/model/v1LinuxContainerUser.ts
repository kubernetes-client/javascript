/**
 * Kubernetes
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: release-1.31
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { RequestFile } from './models';

/**
* LinuxContainerUser represents user identity information in Linux containers
*/
export class V1LinuxContainerUser {
    /**
    * GID is the primary gid initially attached to the first process in the container
    */
    'gid': number;
    /**
    * SupplementalGroups are the supplemental groups initially attached to the first process in the container
    */
    'supplementalGroups'?: Array<number>;
    /**
    * UID is the primary uid initially attached to the first process in the container
    */
    'uid': number;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "gid",
            "baseName": "gid",
            "type": "number"
        },
        {
            "name": "supplementalGroups",
            "baseName": "supplementalGroups",
            "type": "Array<number>"
        },
        {
            "name": "uid",
            "baseName": "uid",
            "type": "number"
        }    ];

    static getAttributeTypeMap() {
        return V1LinuxContainerUser.attributeTypeMap;
    }
}
