# KubernetesJsClient.V1beta2Deployment

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**apiVersion** | **String** | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#resources | [optional] 
**kind** | **String** | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#types-kinds | [optional] 
**metadata** | [**V1ObjectMeta**](V1ObjectMeta.md) | Standard object metadata. | [optional] 
**spec** | [**V1beta2DeploymentSpec**](V1beta2DeploymentSpec.md) | Specification of the desired behavior of the Deployment. | [optional] 
**status** | [**V1beta2DeploymentStatus**](V1beta2DeploymentStatus.md) | Most recently observed status of the Deployment. | [optional] 


