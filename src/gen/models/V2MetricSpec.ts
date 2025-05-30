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

import { V2ContainerResourceMetricSource } from '../models/V2ContainerResourceMetricSource.js';
import { V2ExternalMetricSource } from '../models/V2ExternalMetricSource.js';
import { V2ObjectMetricSource } from '../models/V2ObjectMetricSource.js';
import { V2PodsMetricSource } from '../models/V2PodsMetricSource.js';
import { V2ResourceMetricSource } from '../models/V2ResourceMetricSource.js';
import { HttpFile } from '../http/http.js';

/**
* MetricSpec specifies how to scale based on a single metric (only `type` and one other matching field should be set at once).
*/
export class V2MetricSpec {
    'containerResource'?: V2ContainerResourceMetricSource;
    'external'?: V2ExternalMetricSource;
    'object'?: V2ObjectMetricSource;
    'pods'?: V2PodsMetricSource;
    'resource'?: V2ResourceMetricSource;
    /**
    * type is the type of metric source.  It should be one of \"ContainerResource\", \"External\", \"Object\", \"Pods\" or \"Resource\", each mapping to a matching field in the object.
    */
    'type': string;

    static readonly discriminator: string | undefined = undefined;

    static readonly mapping: {[index: string]: string} | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "containerResource",
            "baseName": "containerResource",
            "type": "V2ContainerResourceMetricSource",
            "format": ""
        },
        {
            "name": "external",
            "baseName": "external",
            "type": "V2ExternalMetricSource",
            "format": ""
        },
        {
            "name": "object",
            "baseName": "object",
            "type": "V2ObjectMetricSource",
            "format": ""
        },
        {
            "name": "pods",
            "baseName": "pods",
            "type": "V2PodsMetricSource",
            "format": ""
        },
        {
            "name": "resource",
            "baseName": "resource",
            "type": "V2ResourceMetricSource",
            "format": ""
        },
        {
            "name": "type",
            "baseName": "type",
            "type": "string",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return V2MetricSpec.attributeTypeMap;
    }

    public constructor() {
    }
}
