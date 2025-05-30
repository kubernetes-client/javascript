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

import { V1ObjectReference } from '../models/V1ObjectReference.js';
import { HttpFile } from '../http/http.js';

/**
* CronJobStatus represents the current state of a cron job.
*/
export class V1CronJobStatus {
    /**
    * A list of pointers to currently running jobs.
    */
    'active'?: Array<V1ObjectReference>;
    /**
    * Information when was the last time the job was successfully scheduled.
    */
    'lastScheduleTime'?: Date;
    /**
    * Information when was the last time the job successfully completed.
    */
    'lastSuccessfulTime'?: Date;

    static readonly discriminator: string | undefined = undefined;

    static readonly mapping: {[index: string]: string} | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "active",
            "baseName": "active",
            "type": "Array<V1ObjectReference>",
            "format": ""
        },
        {
            "name": "lastScheduleTime",
            "baseName": "lastScheduleTime",
            "type": "Date",
            "format": "date-time"
        },
        {
            "name": "lastSuccessfulTime",
            "baseName": "lastSuccessfulTime",
            "type": "Date",
            "format": "date-time"
        }    ];

    static getAttributeTypeMap() {
        return V1CronJobStatus.attributeTypeMap;
    }

    public constructor() {
    }
}
