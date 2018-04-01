# KubernetesJsClient.V2beta1HorizontalPodAutoscaler

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**apiVersion** | **String** | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#resources | [optional] 
**kind** | **String** | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#types-kinds | [optional] 
**metadata** | [**V1ObjectMeta**](V1ObjectMeta.md) | metadata is the standard object metadata. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#metadata | [optional] 
**spec** | [**V2beta1HorizontalPodAutoscalerSpec**](V2beta1HorizontalPodAutoscalerSpec.md) | spec is the specification for the behaviour of the autoscaler. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#spec-and-status. | [optional] 
**status** | [**V2beta1HorizontalPodAutoscalerStatus**](V2beta1HorizontalPodAutoscalerStatus.md) | status is the current information about the autoscaler. | [optional] 


