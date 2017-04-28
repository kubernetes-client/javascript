# KubernetesJsClient.V1ResourceRequirements

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**limits** | **{String: String}** | Limits describes the maximum amount of compute resources allowed. More info: http://kubernetes.io/docs/user-guide/compute-resources/ | [optional] 
**requests** | **{String: String}** | Requests describes the minimum amount of compute resources required. If Requests is omitted for a container, it defaults to Limits if that is explicitly specified, otherwise to an implementation-defined value. More info: http://kubernetes.io/docs/user-guide/compute-resources/ | [optional] 


