/**
 * Kubernetes
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * OpenAPI spec version: v1.22.2
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { V2beta2CrossVersionObjectReference } from '../models/V2beta2CrossVersionObjectReference';
import { V2beta2MetricIdentifier } from '../models/V2beta2MetricIdentifier';
import { V2beta2MetricTarget } from '../models/V2beta2MetricTarget';
import { HttpFile } from '../http/http';

/**
* ObjectMetricSource indicates how to scale on a metric describing a kubernetes object (for example, hits-per-second on an Ingress object).
*/
export class V2beta2ObjectMetricSource {
    'describedObject': V2beta2CrossVersionObjectReference;
    'metric': V2beta2MetricIdentifier;
    'target': V2beta2MetricTarget;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "describedObject",
            "baseName": "describedObject",
            "type": "V2beta2CrossVersionObjectReference",
            "format": ""
        },
        {
            "name": "metric",
            "baseName": "metric",
            "type": "V2beta2MetricIdentifier",
            "format": ""
        },
        {
            "name": "target",
            "baseName": "target",
            "type": "V2beta2MetricTarget",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return V2beta2ObjectMetricSource.attributeTypeMap;
    }

    public constructor() {
    }
}
