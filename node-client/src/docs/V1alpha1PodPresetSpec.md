# KubernetesJsClient.V1alpha1PodPresetSpec

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**env** | [**[V1EnvVar]**](V1EnvVar.md) | Env defines the collection of EnvVar to inject into containers. | [optional] 
**envFrom** | [**[V1EnvFromSource]**](V1EnvFromSource.md) | EnvFrom defines the collection of EnvFromSource to inject into containers. | [optional] 
**selector** | [**V1LabelSelector**](V1LabelSelector.md) | Selector is a label query over a set of resources, in this case pods. Required. | [optional] 
**volumeMounts** | [**[V1VolumeMount]**](V1VolumeMount.md) | VolumeMounts defines the collection of VolumeMount to inject into containers. | [optional] 
**volumes** | [**[V1Volume]**](V1Volume.md) | Volumes defines the collection of Volume to inject into the pod. | [optional] 


