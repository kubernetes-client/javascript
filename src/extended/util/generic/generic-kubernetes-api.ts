import { KubernetesObject, KubernetesListObject } from '../../../types';
import { CustomObjectsApi } from '../../../api';
import { Request } from 'request';
// import { request } from 'http';
import request from 'request';

export class genericKubernetesApi<
    ApiType extends KubernetesObject,
    ApiListType extends KubernetesListObject<ApiType>,
> {
    private apiTypeClass!: new () => ApiType;
    private apiListTypeClass!: new () => ApiListType;
    private apiGroup!: String;
    private apiVersion!: String;
    private resourcePlural!: String;
    private apiClient!: any;
    // private customObjectsApi: CustomObjectsApi;

    /**
     * Instantiates a new Generic kubernetes api.
     *
     * @param apiTypeClass the api type class, e.g. V1Job.class
     * @param apiListTypeClass the api list type class e.g. V1JobList.class
     * @param apiGroup the api group
     * @param apiVersion the api version
     * @param resourcePlural the resource plural, e.g. "jobs"
     * @param apiClient the api client
     */
    constructor(
        apiTypeClass: new () => ApiType,
        apiListTypeClass: new () => ApiListType,
        apiGroup: String,
        apiVersion: String,
        resourcePlural: String,
        apiClient: any,
    ) {
        this.apiTypeClass = apiTypeClass;
        this.apiListTypeClass = apiListTypeClass;
        this.apiGroup = apiGroup;
        this.apiVersion = apiVersion;
        this.resourcePlural = resourcePlural;
        // this.customObjectsApi = new CustomObjectsApi(apiClient);
        this.apiClient = apiClient;
    }

    /**
     * List kubernetes api response cluster-scoped.
     *
     * @return the kubernetes api response
     */
    public list() {
        return request.get(this.apiClient);
    }
}
