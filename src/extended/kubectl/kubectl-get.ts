import { KubernetesObject, KubernetesListObject } from '../../types';
import { genericKubernetesApi } from '../util/generic/generic-kubernetes-api';
import { kubectl } from './kubectl';

export class kubectlGet<ApiType extends KubernetesObject> extends kubectl.ApiClientBuilder {
    private apiTypeClass: new () => ApiType;

    constructor(apiTypeClass: new () => ApiType) {
        super();
        this.apiTypeClass = apiTypeClass;
    }

    public execute() {
        // refreshDiscovery();

        let api: genericKubernetesApi<ApiType, KubernetesListObject<ApiType>> = this.getGenericApi(
            this.apiTypeClass,
        );
        try {
            // if (isNamespaced()) {
            // return api.list(namespace, listOptions).throwsApiException().getObject().getItems();
            // } else {
            // return api.list(listOptions).throwsApiException().getObject().getItems();
            // }
        } catch (e) {
            // throw new KubectlException(e);
            console.error(e);
        }
    }
}
