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

import { V1TopologySelectorLabelRequirement } from '../models/V1TopologySelectorLabelRequirement.js';
import { HttpFile } from '../http/http.js';

/**
* A topology selector term represents the result of label queries. A null or empty topology selector term matches no objects. The requirements of them are ANDed. It provides a subset of functionality as NodeSelectorTerm. This is an alpha feature and may change in the future.
*/
export class V1TopologySelectorTerm {
    /**
    * A list of topology selector requirements by labels.
    */
    'matchLabelExpressions'?: Array<V1TopologySelectorLabelRequirement>;

    static readonly discriminator: string | undefined = undefined;

    static readonly mapping: {[index: string]: string} | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "matchLabelExpressions",
            "baseName": "matchLabelExpressions",
            "type": "Array<V1TopologySelectorLabelRequirement>",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return V1TopologySelectorTerm.attributeTypeMap;
    }

    public constructor() {
    }
}
