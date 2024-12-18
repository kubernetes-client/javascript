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

import { HttpFile } from '../http/http.js';

/**
* DeviceRequestAllocationResult contains the allocation result for one request.
*/
export class V1alpha3DeviceRequestAllocationResult {
    /**
    * AdminAccess indicates that this device was allocated for administrative access. See the corresponding request field for a definition of mode.  This is an alpha field and requires enabling the DRAAdminAccess feature gate. Admin access is disabled if this field is unset or set to false, otherwise it is enabled.
    */
    'adminAccess'?: boolean;
    /**
    * Device references one device instance via its name in the driver\'s resource pool. It must be a DNS label.
    */
    'device': string;
    /**
    * Driver specifies the name of the DRA driver whose kubelet plugin should be invoked to process the allocation once the claim is needed on a node.  Must be a DNS subdomain and should end with a DNS domain owned by the vendor of the driver.
    */
    'driver': string;
    /**
    * This name together with the driver name and the device name field identify which device was allocated (`<driver name>/<pool name>/<device name>`).  Must not be longer than 253 characters and may contain one or more DNS sub-domains separated by slashes.
    */
    'pool': string;
    /**
    * Request is the name of the request in the claim which caused this device to be allocated. Multiple devices may have been allocated per request.
    */
    'request': string;

    static readonly discriminator: string | undefined = undefined;

    static readonly mapping: {[index: string]: string} | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "adminAccess",
            "baseName": "adminAccess",
            "type": "boolean",
            "format": ""
        },
        {
            "name": "device",
            "baseName": "device",
            "type": "string",
            "format": ""
        },
        {
            "name": "driver",
            "baseName": "driver",
            "type": "string",
            "format": ""
        },
        {
            "name": "pool",
            "baseName": "pool",
            "type": "string",
            "format": ""
        },
        {
            "name": "request",
            "baseName": "request",
            "type": "string",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return V1alpha3DeviceRequestAllocationResult.attributeTypeMap;
    }

    public constructor() {
    }
}