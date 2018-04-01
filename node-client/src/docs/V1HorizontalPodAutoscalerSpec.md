# KubernetesJsClient.V1HorizontalPodAutoscalerSpec

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**maxReplicas** | **Number** | upper limit for the number of pods that can be set by the autoscaler; cannot be smaller than MinReplicas. | 
**minReplicas** | **Number** | lower limit for the number of pods that can be set by the autoscaler, default 1. | [optional] 
**scaleTargetRef** | [**V1CrossVersionObjectReference**](V1CrossVersionObjectReference.md) | reference to scaled resource; horizontal pod autoscaler will learn the current resource consumption and will set the desired number of pods by using its Scale subresource. | 
**targetCPUUtilizationPercentage** | **Number** | target average CPU utilization (represented as a percentage of requested CPU) over all the pods; if not specified the default autoscaling policy will be used. | [optional] 


