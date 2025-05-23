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

import { V1PodFailurePolicyRule } from '../models/V1PodFailurePolicyRule.js';
import { HttpFile } from '../http/http.js';

/**
* PodFailurePolicy describes how failed pods influence the backoffLimit.
*/
export class V1PodFailurePolicy {
    /**
    * A list of pod failure policy rules. The rules are evaluated in order. Once a rule matches a Pod failure, the remaining of the rules are ignored. When no rule matches the Pod failure, the default handling applies - the counter of pod failures is incremented and it is checked against the backoffLimit. At most 20 elements are allowed.
    */
    'rules': Array<V1PodFailurePolicyRule>;

    static readonly discriminator: string | undefined = undefined;

    static readonly mapping: {[index: string]: string} | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "rules",
            "baseName": "rules",
            "type": "Array<V1PodFailurePolicyRule>",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return V1PodFailurePolicy.attributeTypeMap;
    }

    public constructor() {
    }
}
