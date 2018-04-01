# KubernetesJsClient.V1ResourceQuotaSpec

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**hard** | **{String: String}** | Hard is the set of desired hard limits for each named resource. More info: https://kubernetes.io/docs/concepts/policy/resource-quotas/ | [optional] 
**scopes** | **[String]** | A collection of filters that must match each object tracked by a quota. If not specified, the quota matches all objects. | [optional] 


