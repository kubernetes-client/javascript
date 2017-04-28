# KubernetesJsClient.Apps_v1beta1Api

All URIs are relative to *https://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createNamespacedDeployment**](Apps_v1beta1Api.md#createNamespacedDeployment) | **POST** /apis/apps/v1beta1/namespaces/{namespace}/deployments | 
[**createNamespacedDeploymentRollbackRollback**](Apps_v1beta1Api.md#createNamespacedDeploymentRollbackRollback) | **POST** /apis/apps/v1beta1/namespaces/{namespace}/deployments/{name}/rollback | 
[**createNamespacedStatefulSet**](Apps_v1beta1Api.md#createNamespacedStatefulSet) | **POST** /apis/apps/v1beta1/namespaces/{namespace}/statefulsets | 
[**deleteCollectionNamespacedDeployment**](Apps_v1beta1Api.md#deleteCollectionNamespacedDeployment) | **DELETE** /apis/apps/v1beta1/namespaces/{namespace}/deployments | 
[**deleteCollectionNamespacedStatefulSet**](Apps_v1beta1Api.md#deleteCollectionNamespacedStatefulSet) | **DELETE** /apis/apps/v1beta1/namespaces/{namespace}/statefulsets | 
[**deleteNamespacedDeployment**](Apps_v1beta1Api.md#deleteNamespacedDeployment) | **DELETE** /apis/apps/v1beta1/namespaces/{namespace}/deployments/{name} | 
[**deleteNamespacedStatefulSet**](Apps_v1beta1Api.md#deleteNamespacedStatefulSet) | **DELETE** /apis/apps/v1beta1/namespaces/{namespace}/statefulsets/{name} | 
[**getAPIResources**](Apps_v1beta1Api.md#getAPIResources) | **GET** /apis/apps/v1beta1/ | 
[**listDeploymentForAllNamespaces**](Apps_v1beta1Api.md#listDeploymentForAllNamespaces) | **GET** /apis/apps/v1beta1/deployments | 
[**listNamespacedDeployment**](Apps_v1beta1Api.md#listNamespacedDeployment) | **GET** /apis/apps/v1beta1/namespaces/{namespace}/deployments | 
[**listNamespacedStatefulSet**](Apps_v1beta1Api.md#listNamespacedStatefulSet) | **GET** /apis/apps/v1beta1/namespaces/{namespace}/statefulsets | 
[**listStatefulSetForAllNamespaces**](Apps_v1beta1Api.md#listStatefulSetForAllNamespaces) | **GET** /apis/apps/v1beta1/statefulsets | 
[**patchNamespacedDeployment**](Apps_v1beta1Api.md#patchNamespacedDeployment) | **PATCH** /apis/apps/v1beta1/namespaces/{namespace}/deployments/{name} | 
[**patchNamespacedDeploymentStatus**](Apps_v1beta1Api.md#patchNamespacedDeploymentStatus) | **PATCH** /apis/apps/v1beta1/namespaces/{namespace}/deployments/{name}/status | 
[**patchNamespacedScaleScale**](Apps_v1beta1Api.md#patchNamespacedScaleScale) | **PATCH** /apis/apps/v1beta1/namespaces/{namespace}/deployments/{name}/scale | 
[**patchNamespacedStatefulSet**](Apps_v1beta1Api.md#patchNamespacedStatefulSet) | **PATCH** /apis/apps/v1beta1/namespaces/{namespace}/statefulsets/{name} | 
[**patchNamespacedStatefulSetStatus**](Apps_v1beta1Api.md#patchNamespacedStatefulSetStatus) | **PATCH** /apis/apps/v1beta1/namespaces/{namespace}/statefulsets/{name}/status | 
[**readNamespacedDeployment**](Apps_v1beta1Api.md#readNamespacedDeployment) | **GET** /apis/apps/v1beta1/namespaces/{namespace}/deployments/{name} | 
[**readNamespacedDeploymentStatus**](Apps_v1beta1Api.md#readNamespacedDeploymentStatus) | **GET** /apis/apps/v1beta1/namespaces/{namespace}/deployments/{name}/status | 
[**readNamespacedScaleScale**](Apps_v1beta1Api.md#readNamespacedScaleScale) | **GET** /apis/apps/v1beta1/namespaces/{namespace}/deployments/{name}/scale | 
[**readNamespacedStatefulSet**](Apps_v1beta1Api.md#readNamespacedStatefulSet) | **GET** /apis/apps/v1beta1/namespaces/{namespace}/statefulsets/{name} | 
[**readNamespacedStatefulSetStatus**](Apps_v1beta1Api.md#readNamespacedStatefulSetStatus) | **GET** /apis/apps/v1beta1/namespaces/{namespace}/statefulsets/{name}/status | 
[**replaceNamespacedDeployment**](Apps_v1beta1Api.md#replaceNamespacedDeployment) | **PUT** /apis/apps/v1beta1/namespaces/{namespace}/deployments/{name} | 
[**replaceNamespacedDeploymentStatus**](Apps_v1beta1Api.md#replaceNamespacedDeploymentStatus) | **PUT** /apis/apps/v1beta1/namespaces/{namespace}/deployments/{name}/status | 
[**replaceNamespacedScaleScale**](Apps_v1beta1Api.md#replaceNamespacedScaleScale) | **PUT** /apis/apps/v1beta1/namespaces/{namespace}/deployments/{name}/scale | 
[**replaceNamespacedStatefulSet**](Apps_v1beta1Api.md#replaceNamespacedStatefulSet) | **PUT** /apis/apps/v1beta1/namespaces/{namespace}/statefulsets/{name} | 
[**replaceNamespacedStatefulSetStatus**](Apps_v1beta1Api.md#replaceNamespacedStatefulSetStatus) | **PUT** /apis/apps/v1beta1/namespaces/{namespace}/statefulsets/{name}/status | 


<a name="createNamespacedDeployment"></a>
# **createNamespacedDeployment**
> AppsV1beta1Deployment createNamespacedDeployment(namespacebody, opts)



create a Deployment

### Example
```javascript
var KubernetesJsClient = require('kubernetes-js-kubernetes.client');
var defaultClient = KubernetesJsClient.ApiClient.default;

// Configure API key authorization: BearerToken
var BearerToken = defaultClient.authentications['BearerToken'];
BearerToken.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//BearerToken.apiKeyPrefix = 'Token';

var apiInstance = new KubernetesJsClient.Apps_v1beta1Api();

var namespace = "namespace_example"; // String | object name and auth scope, such as for teams and projects

var body = new KubernetesJsClient.AppsV1beta1Deployment(); // AppsV1beta1Deployment | 

var opts = { 
  'pretty': "pretty_example", // String | If 'true', then the output is pretty printed.
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.createNamespacedDeployment(namespacebody, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **namespace** | **String**| object name and auth scope, such as for teams and projects | 
 **body** | [**AppsV1beta1Deployment**](AppsV1beta1Deployment.md)|  | 
 **pretty** | **String**| If &#39;true&#39;, then the output is pretty printed. | [optional] 

### Return type

[**AppsV1beta1Deployment**](AppsV1beta1Deployment.md)

### Authorization

[BearerToken](../README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: */*
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf

<a name="createNamespacedDeploymentRollbackRollback"></a>
# **createNamespacedDeploymentRollbackRollback**
> AppsV1beta1DeploymentRollback createNamespacedDeploymentRollbackRollback(name, namespace, body, opts)



create rollback of a DeploymentRollback

### Example
```javascript
var KubernetesJsClient = require('kubernetes-js-kubernetes.client');
var defaultClient = KubernetesJsClient.ApiClient.default;

// Configure API key authorization: BearerToken
var BearerToken = defaultClient.authentications['BearerToken'];
BearerToken.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//BearerToken.apiKeyPrefix = 'Token';

var apiInstance = new KubernetesJsClient.Apps_v1beta1Api();

var name = "name_example"; // String | name of the DeploymentRollback

var namespace = "namespace_example"; // String | object name and auth scope, such as for teams and projects

var body = new KubernetesJsClient.AppsV1beta1DeploymentRollback(); // AppsV1beta1DeploymentRollback | 

var opts = { 
  'pretty': "pretty_example" // String | If 'true', then the output is pretty printed.
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.createNamespacedDeploymentRollbackRollback(name, namespace, body, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **name** | **String**| name of the DeploymentRollback | 
 **namespace** | **String**| object name and auth scope, such as for teams and projects | 
 **body** | [**AppsV1beta1DeploymentRollback**](AppsV1beta1DeploymentRollback.md)|  | 
 **pretty** | **String**| If &#39;true&#39;, then the output is pretty printed. | [optional] 

### Return type

[**AppsV1beta1DeploymentRollback**](AppsV1beta1DeploymentRollback.md)

### Authorization

[BearerToken](../README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: */*
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf

<a name="createNamespacedStatefulSet"></a>
# **createNamespacedStatefulSet**
> V1beta1StatefulSet createNamespacedStatefulSet(namespacebody, opts)



create a StatefulSet

### Example
```javascript
var KubernetesJsClient = require('kubernetes-js-kubernetes.client');
var defaultClient = KubernetesJsClient.ApiClient.default;

// Configure API key authorization: BearerToken
var BearerToken = defaultClient.authentications['BearerToken'];
BearerToken.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//BearerToken.apiKeyPrefix = 'Token';

var apiInstance = new KubernetesJsClient.Apps_v1beta1Api();

var namespace = "namespace_example"; // String | object name and auth scope, such as for teams and projects

var body = new KubernetesJsClient.V1beta1StatefulSet(); // V1beta1StatefulSet | 

var opts = { 
  'pretty': "pretty_example", // String | If 'true', then the output is pretty printed.
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.createNamespacedStatefulSet(namespacebody, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **namespace** | **String**| object name and auth scope, such as for teams and projects | 
 **body** | [**V1beta1StatefulSet**](V1beta1StatefulSet.md)|  | 
 **pretty** | **String**| If &#39;true&#39;, then the output is pretty printed. | [optional] 

### Return type

[**V1beta1StatefulSet**](V1beta1StatefulSet.md)

### Authorization

[BearerToken](../README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: */*
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf

<a name="deleteCollectionNamespacedDeployment"></a>
# **deleteCollectionNamespacedDeployment**
> V1Status deleteCollectionNamespacedDeployment(namespace, opts)



delete collection of Deployment

### Example
```javascript
var KubernetesJsClient = require('kubernetes-js-kubernetes.client');
var defaultClient = KubernetesJsClient.ApiClient.default;

// Configure API key authorization: BearerToken
var BearerToken = defaultClient.authentications['BearerToken'];
BearerToken.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//BearerToken.apiKeyPrefix = 'Token';

var apiInstance = new KubernetesJsClient.Apps_v1beta1Api();

var namespace = "namespace_example"; // String | object name and auth scope, such as for teams and projects

var opts = { 
  'pretty': "pretty_example", // String | If 'true', then the output is pretty printed.
  'fieldSelector': "fieldSelector_example", // String | A selector to restrict the list of returned objects by their fields. Defaults to everything.
  'labelSelector': "labelSelector_example", // String | A selector to restrict the list of returned objects by their labels. Defaults to everything.
  'resourceVersion': "resourceVersion_example", // String | When specified with a watch call, shows changes that occur after that particular version of a resource. Defaults to changes from the beginning of history. When specified for list: - if unset, then the result is returned from remote storage based on quorum-read flag; - if it's 0, then we simply return what we currently have in cache, no guarantee; - if set to non zero, then the result is at least as fresh as given rv.
  'timeoutSeconds': 56, // Number | Timeout for the list/watch call.
  'watch': true // Boolean | Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.deleteCollectionNamespacedDeployment(namespace, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **namespace** | **String**| object name and auth scope, such as for teams and projects | 
 **pretty** | **String**| If &#39;true&#39;, then the output is pretty printed. | [optional] 
 **fieldSelector** | **String**| A selector to restrict the list of returned objects by their fields. Defaults to everything. | [optional] 
 **labelSelector** | **String**| A selector to restrict the list of returned objects by their labels. Defaults to everything. | [optional] 
 **resourceVersion** | **String**| When specified with a watch call, shows changes that occur after that particular version of a resource. Defaults to changes from the beginning of history. When specified for list: - if unset, then the result is returned from remote storage based on quorum-read flag; - if it&#39;s 0, then we simply return what we currently have in cache, no guarantee; - if set to non zero, then the result is at least as fresh as given rv. | [optional] 
 **timeoutSeconds** | **Number**| Timeout for the list/watch call. | [optional] 
 **watch** | **Boolean**| Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion. | [optional] 

### Return type

[**V1Status**](V1Status.md)

### Authorization

[BearerToken](../README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: */*
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf

<a name="deleteCollectionNamespacedStatefulSet"></a>
# **deleteCollectionNamespacedStatefulSet**
> V1Status deleteCollectionNamespacedStatefulSet(namespace, opts)



delete collection of StatefulSet

### Example
```javascript
var KubernetesJsClient = require('kubernetes-js-kubernetes.client');
var defaultClient = KubernetesJsClient.ApiClient.default;

// Configure API key authorization: BearerToken
var BearerToken = defaultClient.authentications['BearerToken'];
BearerToken.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//BearerToken.apiKeyPrefix = 'Token';

var apiInstance = new KubernetesJsClient.Apps_v1beta1Api();

var namespace = "namespace_example"; // String | object name and auth scope, such as for teams and projects

var opts = { 
  'pretty': "pretty_example", // String | If 'true', then the output is pretty printed.
  'fieldSelector': "fieldSelector_example", // String | A selector to restrict the list of returned objects by their fields. Defaults to everything.
  'labelSelector': "labelSelector_example", // String | A selector to restrict the list of returned objects by their labels. Defaults to everything.
  'resourceVersion': "resourceVersion_example", // String | When specified with a watch call, shows changes that occur after that particular version of a resource. Defaults to changes from the beginning of history. When specified for list: - if unset, then the result is returned from remote storage based on quorum-read flag; - if it's 0, then we simply return what we currently have in cache, no guarantee; - if set to non zero, then the result is at least as fresh as given rv.
  'timeoutSeconds': 56, // Number | Timeout for the list/watch call.
  'watch': true // Boolean | Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.deleteCollectionNamespacedStatefulSet(namespace, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **namespace** | **String**| object name and auth scope, such as for teams and projects | 
 **pretty** | **String**| If &#39;true&#39;, then the output is pretty printed. | [optional] 
 **fieldSelector** | **String**| A selector to restrict the list of returned objects by their fields. Defaults to everything. | [optional] 
 **labelSelector** | **String**| A selector to restrict the list of returned objects by their labels. Defaults to everything. | [optional] 
 **resourceVersion** | **String**| When specified with a watch call, shows changes that occur after that particular version of a resource. Defaults to changes from the beginning of history. When specified for list: - if unset, then the result is returned from remote storage based on quorum-read flag; - if it&#39;s 0, then we simply return what we currently have in cache, no guarantee; - if set to non zero, then the result is at least as fresh as given rv. | [optional] 
 **timeoutSeconds** | **Number**| Timeout for the list/watch call. | [optional] 
 **watch** | **Boolean**| Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion. | [optional] 

### Return type

[**V1Status**](V1Status.md)

### Authorization

[BearerToken](../README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: */*
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf

<a name="deleteNamespacedDeployment"></a>
# **deleteNamespacedDeployment**
> V1Status deleteNamespacedDeployment(name, namespace, body, opts)



delete a Deployment

### Example
```javascript
var KubernetesJsClient = require('kubernetes-js-kubernetes.client');
var defaultClient = KubernetesJsClient.ApiClient.default;

// Configure API key authorization: BearerToken
var BearerToken = defaultClient.authentications['BearerToken'];
BearerToken.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//BearerToken.apiKeyPrefix = 'Token';

var apiInstance = new KubernetesJsClient.Apps_v1beta1Api();

var name = "name_example"; // String | name of the Deployment

var namespace = "namespace_example"; // String | object name and auth scope, such as for teams and projects

var body = new KubernetesJsClient.V1DeleteOptions(); // V1DeleteOptions | 

var opts = { 
  'pretty': "pretty_example" // String | If 'true', then the output is pretty printed.
  'gracePeriodSeconds': 56, // Number | The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.
  'orphanDependents': true, // Boolean | Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \"orphan\" finalizer will be added to/removed from the object's finalizers list. Either this field or PropagationPolicy may be set, but not both.
  'propagationPolicy': "propagationPolicy_example" // String | Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy.
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.deleteNamespacedDeployment(name, namespace, body, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **name** | **String**| name of the Deployment | 
 **namespace** | **String**| object name and auth scope, such as for teams and projects | 
 **body** | [**V1DeleteOptions**](V1DeleteOptions.md)|  | 
 **pretty** | **String**| If &#39;true&#39;, then the output is pretty printed. | [optional] 
 **gracePeriodSeconds** | **Number**| The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately. | [optional] 
 **orphanDependents** | **Boolean**| Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both. | [optional] 
 **propagationPolicy** | **String**| Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. | [optional] 

### Return type

[**V1Status**](V1Status.md)

### Authorization

[BearerToken](../README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: */*
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf

<a name="deleteNamespacedStatefulSet"></a>
# **deleteNamespacedStatefulSet**
> V1Status deleteNamespacedStatefulSet(name, namespace, body, opts)



delete a StatefulSet

### Example
```javascript
var KubernetesJsClient = require('kubernetes-js-kubernetes.client');
var defaultClient = KubernetesJsClient.ApiClient.default;

// Configure API key authorization: BearerToken
var BearerToken = defaultClient.authentications['BearerToken'];
BearerToken.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//BearerToken.apiKeyPrefix = 'Token';

var apiInstance = new KubernetesJsClient.Apps_v1beta1Api();

var name = "name_example"; // String | name of the StatefulSet

var namespace = "namespace_example"; // String | object name and auth scope, such as for teams and projects

var body = new KubernetesJsClient.V1DeleteOptions(); // V1DeleteOptions | 

var opts = { 
  'pretty': "pretty_example" // String | If 'true', then the output is pretty printed.
  'gracePeriodSeconds': 56, // Number | The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.
  'orphanDependents': true, // Boolean | Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \"orphan\" finalizer will be added to/removed from the object's finalizers list. Either this field or PropagationPolicy may be set, but not both.
  'propagationPolicy': "propagationPolicy_example" // String | Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy.
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.deleteNamespacedStatefulSet(name, namespace, body, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **name** | **String**| name of the StatefulSet | 
 **namespace** | **String**| object name and auth scope, such as for teams and projects | 
 **body** | [**V1DeleteOptions**](V1DeleteOptions.md)|  | 
 **pretty** | **String**| If &#39;true&#39;, then the output is pretty printed. | [optional] 
 **gracePeriodSeconds** | **Number**| The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately. | [optional] 
 **orphanDependents** | **Boolean**| Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both. | [optional] 
 **propagationPolicy** | **String**| Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. | [optional] 

### Return type

[**V1Status**](V1Status.md)

### Authorization

[BearerToken](../README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: */*
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf

<a name="getAPIResources"></a>
# **getAPIResources**
> V1APIResourceList getAPIResources()



get available resources

### Example
```javascript
var KubernetesJsClient = require('kubernetes-js-kubernetes.client');
var defaultClient = KubernetesJsClient.ApiClient.default;

// Configure API key authorization: BearerToken
var BearerToken = defaultClient.authentications['BearerToken'];
BearerToken.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//BearerToken.apiKeyPrefix = 'Token';

var apiInstance = new KubernetesJsClient.Apps_v1beta1Api();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getAPIResources(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**V1APIResourceList**](V1APIResourceList.md)

### Authorization

[BearerToken](../README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: application/json, application/yaml, application/vnd.kubernetes.protobuf
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf

<a name="listDeploymentForAllNamespaces"></a>
# **listDeploymentForAllNamespaces**
> AppsV1beta1DeploymentList listDeploymentForAllNamespaces(opts)



list or watch objects of kind Deployment

### Example
```javascript
var KubernetesJsClient = require('kubernetes-js-kubernetes.client');
var defaultClient = KubernetesJsClient.ApiClient.default;

// Configure API key authorization: BearerToken
var BearerToken = defaultClient.authentications['BearerToken'];
BearerToken.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//BearerToken.apiKeyPrefix = 'Token';

var apiInstance = new KubernetesJsClient.Apps_v1beta1Api();

var opts = { 
  'fieldSelector': "fieldSelector_example", // String | A selector to restrict the list of returned objects by their fields. Defaults to everything.
  'labelSelector': "labelSelector_example", // String | A selector to restrict the list of returned objects by their labels. Defaults to everything.
  'pretty': "pretty_example", // String | If 'true', then the output is pretty printed.
  'resourceVersion': "resourceVersion_example", // String | When specified with a watch call, shows changes that occur after that particular version of a resource. Defaults to changes from the beginning of history. When specified for list: - if unset, then the result is returned from remote storage based on quorum-read flag; - if it's 0, then we simply return what we currently have in cache, no guarantee; - if set to non zero, then the result is at least as fresh as given rv.
  'timeoutSeconds': 56, // Number | Timeout for the list/watch call.
  'watch': true // Boolean | Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.listDeploymentForAllNamespaces(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **fieldSelector** | **String**| A selector to restrict the list of returned objects by their fields. Defaults to everything. | [optional] 
 **labelSelector** | **String**| A selector to restrict the list of returned objects by their labels. Defaults to everything. | [optional] 
 **pretty** | **String**| If &#39;true&#39;, then the output is pretty printed. | [optional] 
 **resourceVersion** | **String**| When specified with a watch call, shows changes that occur after that particular version of a resource. Defaults to changes from the beginning of history. When specified for list: - if unset, then the result is returned from remote storage based on quorum-read flag; - if it&#39;s 0, then we simply return what we currently have in cache, no guarantee; - if set to non zero, then the result is at least as fresh as given rv. | [optional] 
 **timeoutSeconds** | **Number**| Timeout for the list/watch call. | [optional] 
 **watch** | **Boolean**| Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion. | [optional] 

### Return type

[**AppsV1beta1DeploymentList**](AppsV1beta1DeploymentList.md)

### Authorization

[BearerToken](../README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: */*
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf, application/json;stream=watch, application/vnd.kubernetes.protobuf;stream=watch

<a name="listNamespacedDeployment"></a>
# **listNamespacedDeployment**
> AppsV1beta1DeploymentList listNamespacedDeployment(namespace, opts)



list or watch objects of kind Deployment

### Example
```javascript
var KubernetesJsClient = require('kubernetes-js-kubernetes.client');
var defaultClient = KubernetesJsClient.ApiClient.default;

// Configure API key authorization: BearerToken
var BearerToken = defaultClient.authentications['BearerToken'];
BearerToken.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//BearerToken.apiKeyPrefix = 'Token';

var apiInstance = new KubernetesJsClient.Apps_v1beta1Api();

var namespace = "namespace_example"; // String | object name and auth scope, such as for teams and projects

var opts = { 
  'pretty': "pretty_example", // String | If 'true', then the output is pretty printed.
  'fieldSelector': "fieldSelector_example", // String | A selector to restrict the list of returned objects by their fields. Defaults to everything.
  'labelSelector': "labelSelector_example", // String | A selector to restrict the list of returned objects by their labels. Defaults to everything.
  'resourceVersion': "resourceVersion_example", // String | When specified with a watch call, shows changes that occur after that particular version of a resource. Defaults to changes from the beginning of history. When specified for list: - if unset, then the result is returned from remote storage based on quorum-read flag; - if it's 0, then we simply return what we currently have in cache, no guarantee; - if set to non zero, then the result is at least as fresh as given rv.
  'timeoutSeconds': 56, // Number | Timeout for the list/watch call.
  'watch': true // Boolean | Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.listNamespacedDeployment(namespace, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **namespace** | **String**| object name and auth scope, such as for teams and projects | 
 **pretty** | **String**| If &#39;true&#39;, then the output is pretty printed. | [optional] 
 **fieldSelector** | **String**| A selector to restrict the list of returned objects by their fields. Defaults to everything. | [optional] 
 **labelSelector** | **String**| A selector to restrict the list of returned objects by their labels. Defaults to everything. | [optional] 
 **resourceVersion** | **String**| When specified with a watch call, shows changes that occur after that particular version of a resource. Defaults to changes from the beginning of history. When specified for list: - if unset, then the result is returned from remote storage based on quorum-read flag; - if it&#39;s 0, then we simply return what we currently have in cache, no guarantee; - if set to non zero, then the result is at least as fresh as given rv. | [optional] 
 **timeoutSeconds** | **Number**| Timeout for the list/watch call. | [optional] 
 **watch** | **Boolean**| Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion. | [optional] 

### Return type

[**AppsV1beta1DeploymentList**](AppsV1beta1DeploymentList.md)

### Authorization

[BearerToken](../README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: */*
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf, application/json;stream=watch, application/vnd.kubernetes.protobuf;stream=watch

<a name="listNamespacedStatefulSet"></a>
# **listNamespacedStatefulSet**
> V1beta1StatefulSetList listNamespacedStatefulSet(namespace, opts)



list or watch objects of kind StatefulSet

### Example
```javascript
var KubernetesJsClient = require('kubernetes-js-kubernetes.client');
var defaultClient = KubernetesJsClient.ApiClient.default;

// Configure API key authorization: BearerToken
var BearerToken = defaultClient.authentications['BearerToken'];
BearerToken.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//BearerToken.apiKeyPrefix = 'Token';

var apiInstance = new KubernetesJsClient.Apps_v1beta1Api();

var namespace = "namespace_example"; // String | object name and auth scope, such as for teams and projects

var opts = { 
  'pretty': "pretty_example", // String | If 'true', then the output is pretty printed.
  'fieldSelector': "fieldSelector_example", // String | A selector to restrict the list of returned objects by their fields. Defaults to everything.
  'labelSelector': "labelSelector_example", // String | A selector to restrict the list of returned objects by their labels. Defaults to everything.
  'resourceVersion': "resourceVersion_example", // String | When specified with a watch call, shows changes that occur after that particular version of a resource. Defaults to changes from the beginning of history. When specified for list: - if unset, then the result is returned from remote storage based on quorum-read flag; - if it's 0, then we simply return what we currently have in cache, no guarantee; - if set to non zero, then the result is at least as fresh as given rv.
  'timeoutSeconds': 56, // Number | Timeout for the list/watch call.
  'watch': true // Boolean | Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.listNamespacedStatefulSet(namespace, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **namespace** | **String**| object name and auth scope, such as for teams and projects | 
 **pretty** | **String**| If &#39;true&#39;, then the output is pretty printed. | [optional] 
 **fieldSelector** | **String**| A selector to restrict the list of returned objects by their fields. Defaults to everything. | [optional] 
 **labelSelector** | **String**| A selector to restrict the list of returned objects by their labels. Defaults to everything. | [optional] 
 **resourceVersion** | **String**| When specified with a watch call, shows changes that occur after that particular version of a resource. Defaults to changes from the beginning of history. When specified for list: - if unset, then the result is returned from remote storage based on quorum-read flag; - if it&#39;s 0, then we simply return what we currently have in cache, no guarantee; - if set to non zero, then the result is at least as fresh as given rv. | [optional] 
 **timeoutSeconds** | **Number**| Timeout for the list/watch call. | [optional] 
 **watch** | **Boolean**| Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion. | [optional] 

### Return type

[**V1beta1StatefulSetList**](V1beta1StatefulSetList.md)

### Authorization

[BearerToken](../README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: */*
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf, application/json;stream=watch, application/vnd.kubernetes.protobuf;stream=watch

<a name="listStatefulSetForAllNamespaces"></a>
# **listStatefulSetForAllNamespaces**
> V1beta1StatefulSetList listStatefulSetForAllNamespaces(opts)



list or watch objects of kind StatefulSet

### Example
```javascript
var KubernetesJsClient = require('kubernetes-js-kubernetes.client');
var defaultClient = KubernetesJsClient.ApiClient.default;

// Configure API key authorization: BearerToken
var BearerToken = defaultClient.authentications['BearerToken'];
BearerToken.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//BearerToken.apiKeyPrefix = 'Token';

var apiInstance = new KubernetesJsClient.Apps_v1beta1Api();

var opts = { 
  'fieldSelector': "fieldSelector_example", // String | A selector to restrict the list of returned objects by their fields. Defaults to everything.
  'labelSelector': "labelSelector_example", // String | A selector to restrict the list of returned objects by their labels. Defaults to everything.
  'pretty': "pretty_example", // String | If 'true', then the output is pretty printed.
  'resourceVersion': "resourceVersion_example", // String | When specified with a watch call, shows changes that occur after that particular version of a resource. Defaults to changes from the beginning of history. When specified for list: - if unset, then the result is returned from remote storage based on quorum-read flag; - if it's 0, then we simply return what we currently have in cache, no guarantee; - if set to non zero, then the result is at least as fresh as given rv.
  'timeoutSeconds': 56, // Number | Timeout for the list/watch call.
  'watch': true // Boolean | Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.listStatefulSetForAllNamespaces(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **fieldSelector** | **String**| A selector to restrict the list of returned objects by their fields. Defaults to everything. | [optional] 
 **labelSelector** | **String**| A selector to restrict the list of returned objects by their labels. Defaults to everything. | [optional] 
 **pretty** | **String**| If &#39;true&#39;, then the output is pretty printed. | [optional] 
 **resourceVersion** | **String**| When specified with a watch call, shows changes that occur after that particular version of a resource. Defaults to changes from the beginning of history. When specified for list: - if unset, then the result is returned from remote storage based on quorum-read flag; - if it&#39;s 0, then we simply return what we currently have in cache, no guarantee; - if set to non zero, then the result is at least as fresh as given rv. | [optional] 
 **timeoutSeconds** | **Number**| Timeout for the list/watch call. | [optional] 
 **watch** | **Boolean**| Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion. | [optional] 

### Return type

[**V1beta1StatefulSetList**](V1beta1StatefulSetList.md)

### Authorization

[BearerToken](../README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: */*
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf, application/json;stream=watch, application/vnd.kubernetes.protobuf;stream=watch

<a name="patchNamespacedDeployment"></a>
# **patchNamespacedDeployment**
> AppsV1beta1Deployment patchNamespacedDeployment(name, namespace, body, opts)



partially update the specified Deployment

### Example
```javascript
var KubernetesJsClient = require('kubernetes-js-kubernetes.client');
var defaultClient = KubernetesJsClient.ApiClient.default;

// Configure API key authorization: BearerToken
var BearerToken = defaultClient.authentications['BearerToken'];
BearerToken.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//BearerToken.apiKeyPrefix = 'Token';

var apiInstance = new KubernetesJsClient.Apps_v1beta1Api();

var name = "name_example"; // String | name of the Deployment

var namespace = "namespace_example"; // String | object name and auth scope, such as for teams and projects

var body = null; // Object | 

var opts = { 
  'pretty': "pretty_example" // String | If 'true', then the output is pretty printed.
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.patchNamespacedDeployment(name, namespace, body, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **name** | **String**| name of the Deployment | 
 **namespace** | **String**| object name and auth scope, such as for teams and projects | 
 **body** | **Object**|  | 
 **pretty** | **String**| If &#39;true&#39;, then the output is pretty printed. | [optional] 

### Return type

[**AppsV1beta1Deployment**](AppsV1beta1Deployment.md)

### Authorization

[BearerToken](../README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: application/json-patch+json, application/merge-patch+json, application/strategic-merge-patch+json
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf

<a name="patchNamespacedDeploymentStatus"></a>
# **patchNamespacedDeploymentStatus**
> AppsV1beta1Deployment patchNamespacedDeploymentStatus(name, namespace, body, opts)



partially update status of the specified Deployment

### Example
```javascript
var KubernetesJsClient = require('kubernetes-js-kubernetes.client');
var defaultClient = KubernetesJsClient.ApiClient.default;

// Configure API key authorization: BearerToken
var BearerToken = defaultClient.authentications['BearerToken'];
BearerToken.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//BearerToken.apiKeyPrefix = 'Token';

var apiInstance = new KubernetesJsClient.Apps_v1beta1Api();

var name = "name_example"; // String | name of the Deployment

var namespace = "namespace_example"; // String | object name and auth scope, such as for teams and projects

var body = null; // Object | 

var opts = { 
  'pretty': "pretty_example" // String | If 'true', then the output is pretty printed.
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.patchNamespacedDeploymentStatus(name, namespace, body, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **name** | **String**| name of the Deployment | 
 **namespace** | **String**| object name and auth scope, such as for teams and projects | 
 **body** | **Object**|  | 
 **pretty** | **String**| If &#39;true&#39;, then the output is pretty printed. | [optional] 

### Return type

[**AppsV1beta1Deployment**](AppsV1beta1Deployment.md)

### Authorization

[BearerToken](../README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: application/json-patch+json, application/merge-patch+json, application/strategic-merge-patch+json
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf

<a name="patchNamespacedScaleScale"></a>
# **patchNamespacedScaleScale**
> AppsV1beta1Scale patchNamespacedScaleScale(name, namespace, body, opts)



partially update scale of the specified Scale

### Example
```javascript
var KubernetesJsClient = require('kubernetes-js-kubernetes.client');
var defaultClient = KubernetesJsClient.ApiClient.default;

// Configure API key authorization: BearerToken
var BearerToken = defaultClient.authentications['BearerToken'];
BearerToken.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//BearerToken.apiKeyPrefix = 'Token';

var apiInstance = new KubernetesJsClient.Apps_v1beta1Api();

var name = "name_example"; // String | name of the Scale

var namespace = "namespace_example"; // String | object name and auth scope, such as for teams and projects

var body = null; // Object | 

var opts = { 
  'pretty': "pretty_example" // String | If 'true', then the output is pretty printed.
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.patchNamespacedScaleScale(name, namespace, body, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **name** | **String**| name of the Scale | 
 **namespace** | **String**| object name and auth scope, such as for teams and projects | 
 **body** | **Object**|  | 
 **pretty** | **String**| If &#39;true&#39;, then the output is pretty printed. | [optional] 

### Return type

[**AppsV1beta1Scale**](AppsV1beta1Scale.md)

### Authorization

[BearerToken](../README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: application/json-patch+json, application/merge-patch+json, application/strategic-merge-patch+json
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf

<a name="patchNamespacedStatefulSet"></a>
# **patchNamespacedStatefulSet**
> V1beta1StatefulSet patchNamespacedStatefulSet(name, namespace, body, opts)



partially update the specified StatefulSet

### Example
```javascript
var KubernetesJsClient = require('kubernetes-js-kubernetes.client');
var defaultClient = KubernetesJsClient.ApiClient.default;

// Configure API key authorization: BearerToken
var BearerToken = defaultClient.authentications['BearerToken'];
BearerToken.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//BearerToken.apiKeyPrefix = 'Token';

var apiInstance = new KubernetesJsClient.Apps_v1beta1Api();

var name = "name_example"; // String | name of the StatefulSet

var namespace = "namespace_example"; // String | object name and auth scope, such as for teams and projects

var body = null; // Object | 

var opts = { 
  'pretty': "pretty_example" // String | If 'true', then the output is pretty printed.
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.patchNamespacedStatefulSet(name, namespace, body, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **name** | **String**| name of the StatefulSet | 
 **namespace** | **String**| object name and auth scope, such as for teams and projects | 
 **body** | **Object**|  | 
 **pretty** | **String**| If &#39;true&#39;, then the output is pretty printed. | [optional] 

### Return type

[**V1beta1StatefulSet**](V1beta1StatefulSet.md)

### Authorization

[BearerToken](../README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: application/json-patch+json, application/merge-patch+json, application/strategic-merge-patch+json
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf

<a name="patchNamespacedStatefulSetStatus"></a>
# **patchNamespacedStatefulSetStatus**
> V1beta1StatefulSet patchNamespacedStatefulSetStatus(name, namespace, body, opts)



partially update status of the specified StatefulSet

### Example
```javascript
var KubernetesJsClient = require('kubernetes-js-kubernetes.client');
var defaultClient = KubernetesJsClient.ApiClient.default;

// Configure API key authorization: BearerToken
var BearerToken = defaultClient.authentications['BearerToken'];
BearerToken.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//BearerToken.apiKeyPrefix = 'Token';

var apiInstance = new KubernetesJsClient.Apps_v1beta1Api();

var name = "name_example"; // String | name of the StatefulSet

var namespace = "namespace_example"; // String | object name and auth scope, such as for teams and projects

var body = null; // Object | 

var opts = { 
  'pretty': "pretty_example" // String | If 'true', then the output is pretty printed.
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.patchNamespacedStatefulSetStatus(name, namespace, body, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **name** | **String**| name of the StatefulSet | 
 **namespace** | **String**| object name and auth scope, such as for teams and projects | 
 **body** | **Object**|  | 
 **pretty** | **String**| If &#39;true&#39;, then the output is pretty printed. | [optional] 

### Return type

[**V1beta1StatefulSet**](V1beta1StatefulSet.md)

### Authorization

[BearerToken](../README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: application/json-patch+json, application/merge-patch+json, application/strategic-merge-patch+json
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf

<a name="readNamespacedDeployment"></a>
# **readNamespacedDeployment**
> AppsV1beta1Deployment readNamespacedDeployment(name, namespace, , opts)



read the specified Deployment

### Example
```javascript
var KubernetesJsClient = require('kubernetes-js-kubernetes.client');
var defaultClient = KubernetesJsClient.ApiClient.default;

// Configure API key authorization: BearerToken
var BearerToken = defaultClient.authentications['BearerToken'];
BearerToken.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//BearerToken.apiKeyPrefix = 'Token';

var apiInstance = new KubernetesJsClient.Apps_v1beta1Api();

var name = "name_example"; // String | name of the Deployment

var namespace = "namespace_example"; // String | object name and auth scope, such as for teams and projects

var opts = { 
  'pretty': "pretty_example" // String | If 'true', then the output is pretty printed.
  'exact': true, // Boolean | Should the export be exact.  Exact export maintains cluster-specific fields like 'Namespace'.
  '_export': true // Boolean | Should this value be exported.  Export strips fields that a user can not specify.
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.readNamespacedDeployment(name, namespace, , opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **name** | **String**| name of the Deployment | 
 **namespace** | **String**| object name and auth scope, such as for teams and projects | 
 **pretty** | **String**| If &#39;true&#39;, then the output is pretty printed. | [optional] 
 **exact** | **Boolean**| Should the export be exact.  Exact export maintains cluster-specific fields like &#39;Namespace&#39;. | [optional] 
 **_export** | **Boolean**| Should this value be exported.  Export strips fields that a user can not specify. | [optional] 

### Return type

[**AppsV1beta1Deployment**](AppsV1beta1Deployment.md)

### Authorization

[BearerToken](../README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: */*
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf

<a name="readNamespacedDeploymentStatus"></a>
# **readNamespacedDeploymentStatus**
> AppsV1beta1Deployment readNamespacedDeploymentStatus(name, namespace, , opts)



read status of the specified Deployment

### Example
```javascript
var KubernetesJsClient = require('kubernetes-js-kubernetes.client');
var defaultClient = KubernetesJsClient.ApiClient.default;

// Configure API key authorization: BearerToken
var BearerToken = defaultClient.authentications['BearerToken'];
BearerToken.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//BearerToken.apiKeyPrefix = 'Token';

var apiInstance = new KubernetesJsClient.Apps_v1beta1Api();

var name = "name_example"; // String | name of the Deployment

var namespace = "namespace_example"; // String | object name and auth scope, such as for teams and projects

var opts = { 
  'pretty': "pretty_example" // String | If 'true', then the output is pretty printed.
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.readNamespacedDeploymentStatus(name, namespace, , opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **name** | **String**| name of the Deployment | 
 **namespace** | **String**| object name and auth scope, such as for teams and projects | 
 **pretty** | **String**| If &#39;true&#39;, then the output is pretty printed. | [optional] 

### Return type

[**AppsV1beta1Deployment**](AppsV1beta1Deployment.md)

### Authorization

[BearerToken](../README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: */*
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf

<a name="readNamespacedScaleScale"></a>
# **readNamespacedScaleScale**
> AppsV1beta1Scale readNamespacedScaleScale(name, namespace, , opts)



read scale of the specified Scale

### Example
```javascript
var KubernetesJsClient = require('kubernetes-js-kubernetes.client');
var defaultClient = KubernetesJsClient.ApiClient.default;

// Configure API key authorization: BearerToken
var BearerToken = defaultClient.authentications['BearerToken'];
BearerToken.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//BearerToken.apiKeyPrefix = 'Token';

var apiInstance = new KubernetesJsClient.Apps_v1beta1Api();

var name = "name_example"; // String | name of the Scale

var namespace = "namespace_example"; // String | object name and auth scope, such as for teams and projects

var opts = { 
  'pretty': "pretty_example" // String | If 'true', then the output is pretty printed.
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.readNamespacedScaleScale(name, namespace, , opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **name** | **String**| name of the Scale | 
 **namespace** | **String**| object name and auth scope, such as for teams and projects | 
 **pretty** | **String**| If &#39;true&#39;, then the output is pretty printed. | [optional] 

### Return type

[**AppsV1beta1Scale**](AppsV1beta1Scale.md)

### Authorization

[BearerToken](../README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: */*
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf

<a name="readNamespacedStatefulSet"></a>
# **readNamespacedStatefulSet**
> V1beta1StatefulSet readNamespacedStatefulSet(name, namespace, , opts)



read the specified StatefulSet

### Example
```javascript
var KubernetesJsClient = require('kubernetes-js-kubernetes.client');
var defaultClient = KubernetesJsClient.ApiClient.default;

// Configure API key authorization: BearerToken
var BearerToken = defaultClient.authentications['BearerToken'];
BearerToken.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//BearerToken.apiKeyPrefix = 'Token';

var apiInstance = new KubernetesJsClient.Apps_v1beta1Api();

var name = "name_example"; // String | name of the StatefulSet

var namespace = "namespace_example"; // String | object name and auth scope, such as for teams and projects

var opts = { 
  'pretty': "pretty_example" // String | If 'true', then the output is pretty printed.
  'exact': true, // Boolean | Should the export be exact.  Exact export maintains cluster-specific fields like 'Namespace'.
  '_export': true // Boolean | Should this value be exported.  Export strips fields that a user can not specify.
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.readNamespacedStatefulSet(name, namespace, , opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **name** | **String**| name of the StatefulSet | 
 **namespace** | **String**| object name and auth scope, such as for teams and projects | 
 **pretty** | **String**| If &#39;true&#39;, then the output is pretty printed. | [optional] 
 **exact** | **Boolean**| Should the export be exact.  Exact export maintains cluster-specific fields like &#39;Namespace&#39;. | [optional] 
 **_export** | **Boolean**| Should this value be exported.  Export strips fields that a user can not specify. | [optional] 

### Return type

[**V1beta1StatefulSet**](V1beta1StatefulSet.md)

### Authorization

[BearerToken](../README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: */*
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf

<a name="readNamespacedStatefulSetStatus"></a>
# **readNamespacedStatefulSetStatus**
> V1beta1StatefulSet readNamespacedStatefulSetStatus(name, namespace, , opts)



read status of the specified StatefulSet

### Example
```javascript
var KubernetesJsClient = require('kubernetes-js-kubernetes.client');
var defaultClient = KubernetesJsClient.ApiClient.default;

// Configure API key authorization: BearerToken
var BearerToken = defaultClient.authentications['BearerToken'];
BearerToken.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//BearerToken.apiKeyPrefix = 'Token';

var apiInstance = new KubernetesJsClient.Apps_v1beta1Api();

var name = "name_example"; // String | name of the StatefulSet

var namespace = "namespace_example"; // String | object name and auth scope, such as for teams and projects

var opts = { 
  'pretty': "pretty_example" // String | If 'true', then the output is pretty printed.
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.readNamespacedStatefulSetStatus(name, namespace, , opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **name** | **String**| name of the StatefulSet | 
 **namespace** | **String**| object name and auth scope, such as for teams and projects | 
 **pretty** | **String**| If &#39;true&#39;, then the output is pretty printed. | [optional] 

### Return type

[**V1beta1StatefulSet**](V1beta1StatefulSet.md)

### Authorization

[BearerToken](../README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: */*
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf

<a name="replaceNamespacedDeployment"></a>
# **replaceNamespacedDeployment**
> AppsV1beta1Deployment replaceNamespacedDeployment(name, namespace, body, opts)



replace the specified Deployment

### Example
```javascript
var KubernetesJsClient = require('kubernetes-js-kubernetes.client');
var defaultClient = KubernetesJsClient.ApiClient.default;

// Configure API key authorization: BearerToken
var BearerToken = defaultClient.authentications['BearerToken'];
BearerToken.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//BearerToken.apiKeyPrefix = 'Token';

var apiInstance = new KubernetesJsClient.Apps_v1beta1Api();

var name = "name_example"; // String | name of the Deployment

var namespace = "namespace_example"; // String | object name and auth scope, such as for teams and projects

var body = new KubernetesJsClient.AppsV1beta1Deployment(); // AppsV1beta1Deployment | 

var opts = { 
  'pretty': "pretty_example" // String | If 'true', then the output is pretty printed.
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.replaceNamespacedDeployment(name, namespace, body, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **name** | **String**| name of the Deployment | 
 **namespace** | **String**| object name and auth scope, such as for teams and projects | 
 **body** | [**AppsV1beta1Deployment**](AppsV1beta1Deployment.md)|  | 
 **pretty** | **String**| If &#39;true&#39;, then the output is pretty printed. | [optional] 

### Return type

[**AppsV1beta1Deployment**](AppsV1beta1Deployment.md)

### Authorization

[BearerToken](../README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: */*
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf

<a name="replaceNamespacedDeploymentStatus"></a>
# **replaceNamespacedDeploymentStatus**
> AppsV1beta1Deployment replaceNamespacedDeploymentStatus(name, namespace, body, opts)



replace status of the specified Deployment

### Example
```javascript
var KubernetesJsClient = require('kubernetes-js-kubernetes.client');
var defaultClient = KubernetesJsClient.ApiClient.default;

// Configure API key authorization: BearerToken
var BearerToken = defaultClient.authentications['BearerToken'];
BearerToken.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//BearerToken.apiKeyPrefix = 'Token';

var apiInstance = new KubernetesJsClient.Apps_v1beta1Api();

var name = "name_example"; // String | name of the Deployment

var namespace = "namespace_example"; // String | object name and auth scope, such as for teams and projects

var body = new KubernetesJsClient.AppsV1beta1Deployment(); // AppsV1beta1Deployment | 

var opts = { 
  'pretty': "pretty_example" // String | If 'true', then the output is pretty printed.
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.replaceNamespacedDeploymentStatus(name, namespace, body, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **name** | **String**| name of the Deployment | 
 **namespace** | **String**| object name and auth scope, such as for teams and projects | 
 **body** | [**AppsV1beta1Deployment**](AppsV1beta1Deployment.md)|  | 
 **pretty** | **String**| If &#39;true&#39;, then the output is pretty printed. | [optional] 

### Return type

[**AppsV1beta1Deployment**](AppsV1beta1Deployment.md)

### Authorization

[BearerToken](../README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: */*
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf

<a name="replaceNamespacedScaleScale"></a>
# **replaceNamespacedScaleScale**
> AppsV1beta1Scale replaceNamespacedScaleScale(name, namespace, body, opts)



replace scale of the specified Scale

### Example
```javascript
var KubernetesJsClient = require('kubernetes-js-kubernetes.client');
var defaultClient = KubernetesJsClient.ApiClient.default;

// Configure API key authorization: BearerToken
var BearerToken = defaultClient.authentications['BearerToken'];
BearerToken.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//BearerToken.apiKeyPrefix = 'Token';

var apiInstance = new KubernetesJsClient.Apps_v1beta1Api();

var name = "name_example"; // String | name of the Scale

var namespace = "namespace_example"; // String | object name and auth scope, such as for teams and projects

var body = new KubernetesJsClient.AppsV1beta1Scale(); // AppsV1beta1Scale | 

var opts = { 
  'pretty': "pretty_example" // String | If 'true', then the output is pretty printed.
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.replaceNamespacedScaleScale(name, namespace, body, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **name** | **String**| name of the Scale | 
 **namespace** | **String**| object name and auth scope, such as for teams and projects | 
 **body** | [**AppsV1beta1Scale**](AppsV1beta1Scale.md)|  | 
 **pretty** | **String**| If &#39;true&#39;, then the output is pretty printed. | [optional] 

### Return type

[**AppsV1beta1Scale**](AppsV1beta1Scale.md)

### Authorization

[BearerToken](../README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: */*
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf

<a name="replaceNamespacedStatefulSet"></a>
# **replaceNamespacedStatefulSet**
> V1beta1StatefulSet replaceNamespacedStatefulSet(name, namespace, body, opts)



replace the specified StatefulSet

### Example
```javascript
var KubernetesJsClient = require('kubernetes-js-kubernetes.client');
var defaultClient = KubernetesJsClient.ApiClient.default;

// Configure API key authorization: BearerToken
var BearerToken = defaultClient.authentications['BearerToken'];
BearerToken.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//BearerToken.apiKeyPrefix = 'Token';

var apiInstance = new KubernetesJsClient.Apps_v1beta1Api();

var name = "name_example"; // String | name of the StatefulSet

var namespace = "namespace_example"; // String | object name and auth scope, such as for teams and projects

var body = new KubernetesJsClient.V1beta1StatefulSet(); // V1beta1StatefulSet | 

var opts = { 
  'pretty': "pretty_example" // String | If 'true', then the output is pretty printed.
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.replaceNamespacedStatefulSet(name, namespace, body, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **name** | **String**| name of the StatefulSet | 
 **namespace** | **String**| object name and auth scope, such as for teams and projects | 
 **body** | [**V1beta1StatefulSet**](V1beta1StatefulSet.md)|  | 
 **pretty** | **String**| If &#39;true&#39;, then the output is pretty printed. | [optional] 

### Return type

[**V1beta1StatefulSet**](V1beta1StatefulSet.md)

### Authorization

[BearerToken](../README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: */*
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf

<a name="replaceNamespacedStatefulSetStatus"></a>
# **replaceNamespacedStatefulSetStatus**
> V1beta1StatefulSet replaceNamespacedStatefulSetStatus(name, namespace, body, opts)



replace status of the specified StatefulSet

### Example
```javascript
var KubernetesJsClient = require('kubernetes-js-kubernetes.client');
var defaultClient = KubernetesJsClient.ApiClient.default;

// Configure API key authorization: BearerToken
var BearerToken = defaultClient.authentications['BearerToken'];
BearerToken.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//BearerToken.apiKeyPrefix = 'Token';

var apiInstance = new KubernetesJsClient.Apps_v1beta1Api();

var name = "name_example"; // String | name of the StatefulSet

var namespace = "namespace_example"; // String | object name and auth scope, such as for teams and projects

var body = new KubernetesJsClient.V1beta1StatefulSet(); // V1beta1StatefulSet | 

var opts = { 
  'pretty': "pretty_example" // String | If 'true', then the output is pretty printed.
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.replaceNamespacedStatefulSetStatus(name, namespace, body, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **name** | **String**| name of the StatefulSet | 
 **namespace** | **String**| object name and auth scope, such as for teams and projects | 
 **body** | [**V1beta1StatefulSet**](V1beta1StatefulSet.md)|  | 
 **pretty** | **String**| If &#39;true&#39;, then the output is pretty printed. | [optional] 

### Return type

[**V1beta1StatefulSet**](V1beta1StatefulSet.md)

### Authorization

[BearerToken](../README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: */*
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf

