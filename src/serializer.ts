import { ObjectSerializer as InternalSerializer, V1ObjectMeta } from './gen/models/ObjectSerializer';

type AttributeType = {
    name: string;
    baseName: string;
    type: string;
    format: string;
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
            format: '',
        },
        {
            name: 'kind',
            baseName: 'kind',
            type: 'string',
            format: '',
        },
        {
            name: 'metadata',
            baseName: 'metadata',
            type: 'V1ObjectMeta',
            format: '',
        },
    ];
}

const isKubernetesObject = (data: unknown): boolean =>
    !!data && typeof data === 'object' && 'apiVersion' in data && 'kind' in data;

/**
 * Wraps the ObjectSerializer to support custom resources and generic Kubernetes objects.
 */
export class ObjectSerializer extends InternalSerializer {
    public static serialize(data: any, type: string, format: string = ''): any {
        const obj = InternalSerializer.serialize(data, type, format);
        if (obj !== data) {
            return obj;
        }

        if (!isKubernetesObject(data)) {
            return obj;
        }

        const instance: Record<string, any> = {};
        for (const attributeType of KubernetesObject.attributeTypeMap) {
            const value = data[attributeType.baseName];
            if (value !== undefined) {
                instance[attributeType.name] = InternalSerializer.serialize(
                    data[attributeType.baseName],
                    attributeType.type,
                    attributeType.format,
                );
            }
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

    public static deserialize(data: any, type: string, format: string = ''): any {
        const obj = InternalSerializer.deserialize(data, type, format);
        if (obj !== data) {
            // the serializer knows the type and already deserialized it.
            return obj;
        }

        if (!isKubernetesObject(data)) {
            return obj;
        }

        const instance = new KubernetesObject();
        for (const attributeType of KubernetesObject.attributeTypeMap) {
            const value = data[attributeType.baseName];
            if (value !== undefined) {
                instance[attributeType.name] = InternalSerializer.deserialize(
                    data[attributeType.baseName],
                    attributeType.type,
                    attributeType.format,
                );
            }
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
}
