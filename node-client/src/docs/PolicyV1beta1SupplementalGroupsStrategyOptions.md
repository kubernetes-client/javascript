# KubernetesJsClient.PolicyV1beta1SupplementalGroupsStrategyOptions

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**ranges** | [**[PolicyV1beta1IDRange]**](PolicyV1beta1IDRange.md) | Ranges are the allowed ranges of supplemental groups.  If you would like to force a single supplemental group then supply a single range with the same start and end. | [optional] 
**rule** | **String** | Rule is the strategy that will dictate what supplemental groups is used in the SecurityContext. | [optional] 


