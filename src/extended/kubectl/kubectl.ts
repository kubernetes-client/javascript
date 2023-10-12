import { KubernetesObject } from '../../types';
import { kubectlGet } from './kubectl-get';

/**
 * Kubectl provides a set of helper functions that has the same functionalities as corresponding
 * kubectl commands.
 */

class kubectl {
    /** Equivalent for `kubectl get` */
    static get<ApiType extends KubernetesObject>(apiTypeClass: new () => ApiType): kubectlGet<ApiType> {
        return new kubectlGet(apiTypeClass);
    }
}
