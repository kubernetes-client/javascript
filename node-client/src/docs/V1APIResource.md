# KubernetesJsClient.V1APIResource

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**categories** | **[String]** | categories is a list of the grouped resources this resource belongs to (e.g. &#39;all&#39;) | [optional] 
**group** | **String** | group is the preferred group of the resource.  Empty implies the group of the containing resource list. For subresources, this may have a different value, for example: Scale\&quot;. | [optional] 
**kind** | **String** | kind is the kind for the resource (e.g. &#39;Foo&#39; is the kind for a resource &#39;foo&#39;) | 
**name** | **String** | name is the plural name of the resource. | 
**namespaced** | **Boolean** | namespaced indicates if a resource is namespaced or not. | 
**shortNames** | **[String]** | shortNames is a list of suggested short names of the resource. | [optional] 
**singularName** | **String** | singularName is the singular name of the resource.  This allows clients to handle plural and singular opaquely. The singularName is more correct for reporting status on a single item and both singular and plural are allowed from the kubectl CLI interface. | 
**verbs** | **[String]** | verbs is a list of supported kube verbs (this includes get, list, watch, create, update, patch, delete, deletecollection, and proxy) | 
**version** | **String** | version is the preferred version of the resource.  Empty implies the version of the containing resource list For subresources, this may have a different value, for example: v1 (while inside a v1beta1 version of the core resource&#39;s group)\&quot;. | [optional] 


