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

import { V1ObjectMeta } from '../models/V1ObjectMeta.js';
import { V1beta1ValidatingAdmissionPolicySpec } from '../models/V1beta1ValidatingAdmissionPolicySpec.js';
import { V1beta1ValidatingAdmissionPolicyStatus } from '../models/V1beta1ValidatingAdmissionPolicyStatus.js';
import { HttpFile } from '../http/http.js';

/**
* ValidatingAdmissionPolicy describes the definition of an admission validation policy that accepts or rejects an object without changing it.
*/
export class V1beta1ValidatingAdmissionPolicy {
    /**
    * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
    */
    'apiVersion'?: string;
    /**
    * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
    */
    'kind'?: string;
    'metadata'?: V1ObjectMeta;
    'spec'?: V1beta1ValidatingAdmissionPolicySpec;
    'status'?: V1beta1ValidatingAdmissionPolicyStatus;

    static readonly discriminator: string | undefined = undefined;

    static readonly mapping: {[index: string]: string} | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "apiVersion",
            "baseName": "apiVersion",
            "type": "string",
            "format": ""
        },
        {
            "name": "kind",
            "baseName": "kind",
            "type": "string",
            "format": ""
        },
        {
            "name": "metadata",
            "baseName": "metadata",
            "type": "V1ObjectMeta",
            "format": ""
        },
        {
            "name": "spec",
            "baseName": "spec",
            "type": "V1beta1ValidatingAdmissionPolicySpec",
            "format": ""
        },
        {
            "name": "status",
            "baseName": "status",
            "type": "V1beta1ValidatingAdmissionPolicyStatus",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return V1beta1ValidatingAdmissionPolicy.attributeTypeMap;
    }

    public constructor() {
    }
}
