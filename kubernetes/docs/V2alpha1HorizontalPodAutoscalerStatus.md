# KubernetesJsClient.V2alpha1HorizontalPodAutoscalerStatus

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**currentMetrics** | [**[V2alpha1MetricStatus]**](V2alpha1MetricStatus.md) | currentMetrics is the last read state of the metrics used by this autoscaler. | 
**currentReplicas** | **Number** | currentReplicas is current number of replicas of pods managed by this autoscaler, as last seen by the autoscaler. | 
**desiredReplicas** | **Number** | desiredReplicas is the desired number of replicas of pods managed by this autoscaler, as last calculated by the autoscaler. | 
**lastScaleTime** | **Date** | lastScaleTime is the last time the HorizontalPodAutoscaler scaled the number of pods, used by the autoscaler to control how often the number of pods is changed. | [optional] 
**observedGeneration** | **Number** | observedGeneration is the most recent generation observed by this autoscaler. | [optional] 


