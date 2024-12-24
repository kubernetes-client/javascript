import { ObjectSerializer } from './api';
import { V1ObjectMeta } from './gen/model/v1ObjectMeta';
import { V1ListMeta } from './gen/model/v1ListMeta';

type AttributeType = {
    name: string;
    baseName: string;
    type: string;
};

class KubernetesObject {
    /**
     * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
     */
    'apiVersion'?: string;
    /**
     * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
     */
    'kind'?: string;
    'metadata'?: V1ObjectMeta;

    static attributeTypeMap: AttributeType[] = [
        {
            name: 'apiVersion',
            baseName: 'apiVersion',
            type: 'string',
        },
        {
            name: 'kind',
            baseName: 'kind',
            type: 'string',
        },
        {
            name: 'metadata',
            baseName: 'metadata',
            type: 'V1ObjectMeta',
        },
    ];
}

class KubernetesObjectList {
    /**
     * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
     */
    'apiVersion'?: string;
    /**
     * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
     */
    'kind'?: string;
    'metadata'?: V1ListMeta;
    'items'?: KubernetesObject[];

    static attributeTypeMap: AttributeType[] = [
        {
            name: 'apiVersion',
            baseName: 'apiVersion',
            type: 'string',
        },
        {
            name: 'kind',
            baseName: 'kind',
            type: 'string',
        },
        {
            name: 'metadata',
            baseName: 'metadata',
            type: 'V1ListMeta',
        },
    ];
}

const isKubernetesObject = (data: unknown): boolean =>
    !!data && typeof data === 'object' && 'apiVersion' in data && 'kind' in data;

const isKubernetesObjectList = (data: any): boolean => isKubernetesObject(data) && 'items' in data;

const getClassOfKubernetesInstance = (data: any): any => {
    if (!isKubernetesObject(data)) {
        return null;
    }
    if (isKubernetesObjectList(data)) {
        return KubernetesObjectList;
    }
    return KubernetesObject;
};

/**
 * Wraps the ObjectSerializer to support custom resources and generic Kubernetes objects.
 */
class KubernetesObjectSerializer {
    private static _instance: KubernetesObjectSerializer;

    public static get instance(): KubernetesObjectSerializer {
        if (this._instance) {
            return this._instance;
        }
        this._instance = new KubernetesObjectSerializer();
        return this._instance;
    }

    private constructor() {}

    public serialize(data: any, type: string): any {
        const obj = ObjectSerializer.serialize(data, type);
        if (obj !== data) {
            return obj;
        }

        if (!isKubernetesObject(data)) {
            return obj;
        }

        const instance: Record<string, any> = {};
        for (const attributeType of KubernetesObject.attributeTypeMap) {
            instance[attributeType.name] = ObjectSerializer.serialize(
                data[attributeType.baseName],
                attributeType.type,
            );
        }
        // add all unknown properties as is.
        for (const [key, value] of Object.entries(data)) {
            if (KubernetesObject.attributeTypeMap.find((t) => t.name === key)) {
                continue;
            }
            instance[key] = value;
        }
        return instance;
    }

    public deserialize(data: any, type: string): any {
        const obj = ObjectSerializer.deserialize(data, type);
        if (obj !== data) {
            // the serializer knows the type and already deserialized it.
            return obj;
        }

        const kubernetesClass = getClassOfKubernetesInstance(data);
        if (!kubernetesClass) {
            return obj;
        }

        const instance = new kubernetesClass();
        for (const attributeType of kubernetesClass.attributeTypeMap) {
            instance[attributeType.name] = ObjectSerializer.deserialize(
                data[attributeType.baseName],
                attributeType.type,
            );
        }
        // add all unknown properties as is.
        for (const [key, value] of Object.entries(data)) {
            if (KubernetesObject.attributeTypeMap.find((t) => t.name === key)) {
                continue;
            }
            instance[key] = value;
        }
        if (instance.items) {
            instance.items = instance.items.map((item: any) => this.deserialize(item, ''));
        }

        return instance;
    }
}

export default KubernetesObjectSerializer.instance;
