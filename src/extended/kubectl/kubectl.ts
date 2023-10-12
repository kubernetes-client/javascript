import { KubernetesObject, KubernetesListObject } from '../../types';
import { kubectlGet } from './kubectl-get';
import { genericKubernetesApi } from '../util/generic/generic-kubernetes-api';

/**
 * Kubectl provides a set of helper functions that has the same functionalities as corresponding
 * kubectl commands.
 */

export class kubectl {
    /** Equivalent for `kubectl get` */
    static get<ApiType extends KubernetesObject>(apiTypeClass: new () => ApiType): kubectlGet<ApiType> {
        return new kubectlGet(apiTypeClass);
    }

    static ApiClientBuilder = class {
        apiClient: any;
        skipDiscovery: boolean;

        constructor() {
            this.apiClient = Configuration.getDefaultApiClient();
            this.skipDiscovery = false;
        }

        async refreshDiscovery() {
            if (this.skipDiscovery) {
                return;
            }

            try {
                await ModelMapper.refresh(new Discovery(this.apiClient));
            } catch (e) {
                console.error(e);
            }
        }

        getGenericApi<ApiType extends KubernetesObject>(apiTypeClass: new () => ApiType) {
            const apiListTypeClassName = 'list' + apiTypeClass.name;

            try {
                const apiTypeListClass = require(apiListTypeClassName);
                return this.getGenericApiWithType(apiTypeClass, apiTypeListClass);
            } catch (e) {
                throw new Error(`No such api list type class ${apiListTypeClassName}`);
            }
        }

        getGenericApiWithType<
            ApiType extends KubernetesObject,
            ApiListType extends KubernetesListObject<ApiType>,
        >(
            apiTypeClass: new () => ApiType,
            apiListTypeClass: new () => ApiListType,
        ): genericKubernetesApi<ApiType, ApiListType> {
            const groupVersionResource = ModelMapper.getGroupVersionResourceByClass(apiTypeClass);
            if (!groupVersionResource) {
                throw new Error(`Unexpected unknown resource type: ${apiTypeClass}`);
            }
            const api = new genericKubernetesApi(
                apiTypeClass,
                apiListTypeClass,
                groupVersionResource.group,
                groupVersionResource.version,
                groupVersionResource.resource,
                this.apiClient,
            );
            return api;
        }

        // apiClient(apiClient) {
        //     this.apiClient = apiClient;
        //     return this;
        // }

        // skipDiscovery() {
        //     this.skipDiscovery = true;
        //     return this;
        // }
    };
}
