# KubernetesJsClient.Certificates_v1beta1Api

All URIs are relative to *https://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createCertificateSigningRequest**](Certificates_v1beta1Api.md#createCertificateSigningRequest) | **POST** /apis/certificates.k8s.io/v1beta1/certificatesigningrequests | 
[**deleteCertificateSigningRequest**](Certificates_v1beta1Api.md#deleteCertificateSigningRequest) | **DELETE** /apis/certificates.k8s.io/v1beta1/certificatesigningrequests/{name} | 
[**deleteCollectionCertificateSigningRequest**](Certificates_v1beta1Api.md#deleteCollectionCertificateSigningRequest) | **DELETE** /apis/certificates.k8s.io/v1beta1/certificatesigningrequests | 
[**getAPIResources**](Certificates_v1beta1Api.md#getAPIResources) | **GET** /apis/certificates.k8s.io/v1beta1/ | 
[**listCertificateSigningRequest**](Certificates_v1beta1Api.md#listCertificateSigningRequest) | **GET** /apis/certificates.k8s.io/v1beta1/certificatesigningrequests | 
[**patchCertificateSigningRequest**](Certificates_v1beta1Api.md#patchCertificateSigningRequest) | **PATCH** /apis/certificates.k8s.io/v1beta1/certificatesigningrequests/{name} | 
[**readCertificateSigningRequest**](Certificates_v1beta1Api.md#readCertificateSigningRequest) | **GET** /apis/certificates.k8s.io/v1beta1/certificatesigningrequests/{name} | 
[**replaceCertificateSigningRequest**](Certificates_v1beta1Api.md#replaceCertificateSigningRequest) | **PUT** /apis/certificates.k8s.io/v1beta1/certificatesigningrequests/{name} | 
[**replaceCertificateSigningRequestApproval**](Certificates_v1beta1Api.md#replaceCertificateSigningRequestApproval) | **PUT** /apis/certificates.k8s.io/v1beta1/certificatesigningrequests/{name}/approval | 
[**replaceCertificateSigningRequestStatus**](Certificates_v1beta1Api.md#replaceCertificateSigningRequestStatus) | **PUT** /apis/certificates.k8s.io/v1beta1/certificatesigningrequests/{name}/status | 


<a name="createCertificateSigningRequest"></a>
# **createCertificateSigningRequest**
> V1beta1CertificateSigningRequest createCertificateSigningRequest(body, opts)



create a CertificateSigningRequest

### Example
```javascript
var KubernetesJsClient = require('kubernetes-js-kubernetes.client');
var defaultClient = KubernetesJsClient.ApiClient.default;

// Configure API key authorization: BearerToken
var BearerToken = defaultClient.authentications['BearerToken'];
BearerToken.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//BearerToken.apiKeyPrefix = 'Token';

var apiInstance = new KubernetesJsClient.Certificates_v1beta1Api();

var body = new KubernetesJsClient.V1beta1CertificateSigningRequest(); // V1beta1CertificateSigningRequest | 

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
apiInstance.createCertificateSigningRequest(body, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**V1beta1CertificateSigningRequest**](V1beta1CertificateSigningRequest.md)|  | 
 **pretty** | **String**| If &#39;true&#39;, then the output is pretty printed. | [optional] 

### Return type

[**V1beta1CertificateSigningRequest**](V1beta1CertificateSigningRequest.md)

### Authorization

[BearerToken](../README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: */*
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf

<a name="deleteCertificateSigningRequest"></a>
# **deleteCertificateSigningRequest**
> V1Status deleteCertificateSigningRequest(name, body, opts)



delete a CertificateSigningRequest

### Example
```javascript
var KubernetesJsClient = require('kubernetes-js-kubernetes.client');
var defaultClient = KubernetesJsClient.ApiClient.default;

// Configure API key authorization: BearerToken
var BearerToken = defaultClient.authentications['BearerToken'];
BearerToken.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//BearerToken.apiKeyPrefix = 'Token';

var apiInstance = new KubernetesJsClient.Certificates_v1beta1Api();

var name = "name_example"; // String | name of the CertificateSigningRequest

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
apiInstance.deleteCertificateSigningRequest(name, body, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **name** | **String**| name of the CertificateSigningRequest | 
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

<a name="deleteCollectionCertificateSigningRequest"></a>
# **deleteCollectionCertificateSigningRequest**
> V1Status deleteCollectionCertificateSigningRequest(opts)



delete collection of CertificateSigningRequest

### Example
```javascript
var KubernetesJsClient = require('kubernetes-js-kubernetes.client');
var defaultClient = KubernetesJsClient.ApiClient.default;

// Configure API key authorization: BearerToken
var BearerToken = defaultClient.authentications['BearerToken'];
BearerToken.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//BearerToken.apiKeyPrefix = 'Token';

var apiInstance = new KubernetesJsClient.Certificates_v1beta1Api();

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
apiInstance.deleteCollectionCertificateSigningRequest(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
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

var apiInstance = new KubernetesJsClient.Certificates_v1beta1Api();

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

<a name="listCertificateSigningRequest"></a>
# **listCertificateSigningRequest**
> V1beta1CertificateSigningRequestList listCertificateSigningRequest(opts)



list or watch objects of kind CertificateSigningRequest

### Example
```javascript
var KubernetesJsClient = require('kubernetes-js-kubernetes.client');
var defaultClient = KubernetesJsClient.ApiClient.default;

// Configure API key authorization: BearerToken
var BearerToken = defaultClient.authentications['BearerToken'];
BearerToken.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//BearerToken.apiKeyPrefix = 'Token';

var apiInstance = new KubernetesJsClient.Certificates_v1beta1Api();

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
apiInstance.listCertificateSigningRequest(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **pretty** | **String**| If &#39;true&#39;, then the output is pretty printed. | [optional] 
 **fieldSelector** | **String**| A selector to restrict the list of returned objects by their fields. Defaults to everything. | [optional] 
 **labelSelector** | **String**| A selector to restrict the list of returned objects by their labels. Defaults to everything. | [optional] 
 **resourceVersion** | **String**| When specified with a watch call, shows changes that occur after that particular version of a resource. Defaults to changes from the beginning of history. When specified for list: - if unset, then the result is returned from remote storage based on quorum-read flag; - if it&#39;s 0, then we simply return what we currently have in cache, no guarantee; - if set to non zero, then the result is at least as fresh as given rv. | [optional] 
 **timeoutSeconds** | **Number**| Timeout for the list/watch call. | [optional] 
 **watch** | **Boolean**| Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion. | [optional] 

### Return type

[**V1beta1CertificateSigningRequestList**](V1beta1CertificateSigningRequestList.md)

### Authorization

[BearerToken](../README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: */*
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf, application/json;stream=watch, application/vnd.kubernetes.protobuf;stream=watch

<a name="patchCertificateSigningRequest"></a>
# **patchCertificateSigningRequest**
> V1beta1CertificateSigningRequest patchCertificateSigningRequest(name, body, opts)



partially update the specified CertificateSigningRequest

### Example
```javascript
var KubernetesJsClient = require('kubernetes-js-kubernetes.client');
var defaultClient = KubernetesJsClient.ApiClient.default;

// Configure API key authorization: BearerToken
var BearerToken = defaultClient.authentications['BearerToken'];
BearerToken.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//BearerToken.apiKeyPrefix = 'Token';

var apiInstance = new KubernetesJsClient.Certificates_v1beta1Api();

var name = "name_example"; // String | name of the CertificateSigningRequest

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
apiInstance.patchCertificateSigningRequest(name, body, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **name** | **String**| name of the CertificateSigningRequest | 
 **body** | **Object**|  | 
 **pretty** | **String**| If &#39;true&#39;, then the output is pretty printed. | [optional] 

### Return type

[**V1beta1CertificateSigningRequest**](V1beta1CertificateSigningRequest.md)

### Authorization

[BearerToken](../README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: application/json-patch+json, application/merge-patch+json, application/strategic-merge-patch+json
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf

<a name="readCertificateSigningRequest"></a>
# **readCertificateSigningRequest**
> V1beta1CertificateSigningRequest readCertificateSigningRequest(name, , opts)



read the specified CertificateSigningRequest

### Example
```javascript
var KubernetesJsClient = require('kubernetes-js-kubernetes.client');
var defaultClient = KubernetesJsClient.ApiClient.default;

// Configure API key authorization: BearerToken
var BearerToken = defaultClient.authentications['BearerToken'];
BearerToken.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//BearerToken.apiKeyPrefix = 'Token';

var apiInstance = new KubernetesJsClient.Certificates_v1beta1Api();

var name = "name_example"; // String | name of the CertificateSigningRequest

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
apiInstance.readCertificateSigningRequest(name, , opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **name** | **String**| name of the CertificateSigningRequest | 
 **pretty** | **String**| If &#39;true&#39;, then the output is pretty printed. | [optional] 
 **exact** | **Boolean**| Should the export be exact.  Exact export maintains cluster-specific fields like &#39;Namespace&#39;. | [optional] 
 **_export** | **Boolean**| Should this value be exported.  Export strips fields that a user can not specify. | [optional] 

### Return type

[**V1beta1CertificateSigningRequest**](V1beta1CertificateSigningRequest.md)

### Authorization

[BearerToken](../README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: */*
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf

<a name="replaceCertificateSigningRequest"></a>
# **replaceCertificateSigningRequest**
> V1beta1CertificateSigningRequest replaceCertificateSigningRequest(name, body, opts)



replace the specified CertificateSigningRequest

### Example
```javascript
var KubernetesJsClient = require('kubernetes-js-kubernetes.client');
var defaultClient = KubernetesJsClient.ApiClient.default;

// Configure API key authorization: BearerToken
var BearerToken = defaultClient.authentications['BearerToken'];
BearerToken.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//BearerToken.apiKeyPrefix = 'Token';

var apiInstance = new KubernetesJsClient.Certificates_v1beta1Api();

var name = "name_example"; // String | name of the CertificateSigningRequest

var body = new KubernetesJsClient.V1beta1CertificateSigningRequest(); // V1beta1CertificateSigningRequest | 

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
apiInstance.replaceCertificateSigningRequest(name, body, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **name** | **String**| name of the CertificateSigningRequest | 
 **body** | [**V1beta1CertificateSigningRequest**](V1beta1CertificateSigningRequest.md)|  | 
 **pretty** | **String**| If &#39;true&#39;, then the output is pretty printed. | [optional] 

### Return type

[**V1beta1CertificateSigningRequest**](V1beta1CertificateSigningRequest.md)

### Authorization

[BearerToken](../README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: */*
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf

<a name="replaceCertificateSigningRequestApproval"></a>
# **replaceCertificateSigningRequestApproval**
> V1beta1CertificateSigningRequest replaceCertificateSigningRequestApproval(name, body, opts)



replace approval of the specified CertificateSigningRequest

### Example
```javascript
var KubernetesJsClient = require('kubernetes-js-kubernetes.client');
var defaultClient = KubernetesJsClient.ApiClient.default;

// Configure API key authorization: BearerToken
var BearerToken = defaultClient.authentications['BearerToken'];
BearerToken.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//BearerToken.apiKeyPrefix = 'Token';

var apiInstance = new KubernetesJsClient.Certificates_v1beta1Api();

var name = "name_example"; // String | name of the CertificateSigningRequest

var body = new KubernetesJsClient.V1beta1CertificateSigningRequest(); // V1beta1CertificateSigningRequest | 

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
apiInstance.replaceCertificateSigningRequestApproval(name, body, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **name** | **String**| name of the CertificateSigningRequest | 
 **body** | [**V1beta1CertificateSigningRequest**](V1beta1CertificateSigningRequest.md)|  | 
 **pretty** | **String**| If &#39;true&#39;, then the output is pretty printed. | [optional] 

### Return type

[**V1beta1CertificateSigningRequest**](V1beta1CertificateSigningRequest.md)

### Authorization

[BearerToken](../README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: */*
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf

<a name="replaceCertificateSigningRequestStatus"></a>
# **replaceCertificateSigningRequestStatus**
> V1beta1CertificateSigningRequest replaceCertificateSigningRequestStatus(name, body, opts)



replace status of the specified CertificateSigningRequest

### Example
```javascript
var KubernetesJsClient = require('kubernetes-js-kubernetes.client');
var defaultClient = KubernetesJsClient.ApiClient.default;

// Configure API key authorization: BearerToken
var BearerToken = defaultClient.authentications['BearerToken'];
BearerToken.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//BearerToken.apiKeyPrefix = 'Token';

var apiInstance = new KubernetesJsClient.Certificates_v1beta1Api();

var name = "name_example"; // String | name of the CertificateSigningRequest

var body = new KubernetesJsClient.V1beta1CertificateSigningRequest(); // V1beta1CertificateSigningRequest | 

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
apiInstance.replaceCertificateSigningRequestStatus(name, body, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **name** | **String**| name of the CertificateSigningRequest | 
 **body** | [**V1beta1CertificateSigningRequest**](V1beta1CertificateSigningRequest.md)|  | 
 **pretty** | **String**| If &#39;true&#39;, then the output is pretty printed. | [optional] 

### Return type

[**V1beta1CertificateSigningRequest**](V1beta1CertificateSigningRequest.md)

### Authorization

[BearerToken](../README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: */*
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf

