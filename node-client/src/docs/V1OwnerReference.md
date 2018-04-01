# KubernetesJsClient.V1OwnerReference

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**apiVersion** | **String** | API version of the referent. | 
**blockOwnerDeletion** | **Boolean** | If true, AND if the owner has the \&quot;foregroundDeletion\&quot; finalizer, then the owner cannot be deleted from the key-value store until this reference is removed. Defaults to false. To set this field, a user needs \&quot;delete\&quot; permission of the owner, otherwise 422 (Unprocessable Entity) will be returned. | [optional] 
**controller** | **Boolean** | If true, this reference points to the managing controller. | [optional] 
**kind** | **String** | Kind of the referent. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#types-kinds | 
**name** | **String** | Name of the referent. More info: http://kubernetes.io/docs/user-guide/identifiers#names | 
**uid** | **String** | UID of the referent. More info: http://kubernetes.io/docs/user-guide/identifiers#uids | 


