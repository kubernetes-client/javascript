import { KubernetesObject } from '../../types';

export class kubectlGet<ApiType extends KubernetesObject> {
    private apiTypeClass: new () => ApiType;

    constructor(apiTypeClass: new () => ApiType) {
        this.apiTypeClass = apiTypeClass;
    }
}
