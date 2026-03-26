---
id: CustomObjectsApi
title: CustomObjectsApi
sidebar_label: CustomObjectsApi
sidebar_position: 5
---
# CustomObjectsApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createClusterCustomObject**](/docs/api-reference/other/CustomObjectsApi#createClusterCustomObject) | **POST** /apis/{group}/{version}/{plural} |
[**createNamespacedCustomObject**](/docs/api-reference/other/CustomObjectsApi#createNamespacedCustomObject) | **POST** /apis/{group}/{version}/namespaces/{namespace}/{plural} |
[**deleteClusterCustomObject**](/docs/api-reference/other/CustomObjectsApi#deleteClusterCustomObject) | **DELETE** /apis/{group}/{version}/{plural}/{name} |
[**deleteCollectionClusterCustomObject**](/docs/api-reference/other/CustomObjectsApi#deleteCollectionClusterCustomObject) | **DELETE** /apis/{group}/{version}/{plural} |
[**deleteCollectionNamespacedCustomObject**](/docs/api-reference/other/CustomObjectsApi#deleteCollectionNamespacedCustomObject) | **DELETE** /apis/{group}/{version}/namespaces/{namespace}/{plural} |
[**deleteNamespacedCustomObject**](/docs/api-reference/other/CustomObjectsApi#deleteNamespacedCustomObject) | **DELETE** /apis/{group}/{version}/namespaces/{namespace}/{plural}/{name} |
[**getAPIResources**](/docs/api-reference/other/CustomObjectsApi#getAPIResources) | **GET** /apis/{group}/{version} |
[**getClusterCustomObject**](/docs/api-reference/other/CustomObjectsApi#getClusterCustomObject) | **GET** /apis/{group}/{version}/{plural}/{name} |
[**getClusterCustomObjectScale**](/docs/api-reference/other/CustomObjectsApi#getClusterCustomObjectScale) | **GET** /apis/{group}/{version}/{plural}/{name}/scale |
[**getClusterCustomObjectStatus**](/docs/api-reference/other/CustomObjectsApi#getClusterCustomObjectStatus) | **GET** /apis/{group}/{version}/{plural}/{name}/status |
[**getNamespacedCustomObject**](/docs/api-reference/other/CustomObjectsApi#getNamespacedCustomObject) | **GET** /apis/{group}/{version}/namespaces/{namespace}/{plural}/{name} |
[**getNamespacedCustomObjectScale**](/docs/api-reference/other/CustomObjectsApi#getNamespacedCustomObjectScale) | **GET** /apis/{group}/{version}/namespaces/{namespace}/{plural}/{name}/scale |
[**getNamespacedCustomObjectStatus**](/docs/api-reference/other/CustomObjectsApi#getNamespacedCustomObjectStatus) | **GET** /apis/{group}/{version}/namespaces/{namespace}/{plural}/{name}/status |
[**listClusterCustomObject**](/docs/api-reference/other/CustomObjectsApi#listClusterCustomObject) | **GET** /apis/{group}/{version}/{plural} |
[**listCustomObjectForAllNamespaces**](/docs/api-reference/other/CustomObjectsApi#listCustomObjectForAllNamespaces) | **GET** /apis/{group}/{version}/{resource_plural} |
[**listNamespacedCustomObject**](/docs/api-reference/other/CustomObjectsApi#listNamespacedCustomObject) | **GET** /apis/{group}/{version}/namespaces/{namespace}/{plural} |
[**patchClusterCustomObject**](/docs/api-reference/other/CustomObjectsApi#patchClusterCustomObject) | **PATCH** /apis/{group}/{version}/{plural}/{name} |
[**patchClusterCustomObjectScale**](/docs/api-reference/other/CustomObjectsApi#patchClusterCustomObjectScale) | **PATCH** /apis/{group}/{version}/{plural}/{name}/scale |
[**patchClusterCustomObjectStatus**](/docs/api-reference/other/CustomObjectsApi#patchClusterCustomObjectStatus) | **PATCH** /apis/{group}/{version}/{plural}/{name}/status |
[**patchNamespacedCustomObject**](/docs/api-reference/other/CustomObjectsApi#patchNamespacedCustomObject) | **PATCH** /apis/{group}/{version}/namespaces/{namespace}/{plural}/{name} |
[**patchNamespacedCustomObjectScale**](/docs/api-reference/other/CustomObjectsApi#patchNamespacedCustomObjectScale) | **PATCH** /apis/{group}/{version}/namespaces/{namespace}/{plural}/{name}/scale |
[**patchNamespacedCustomObjectStatus**](/docs/api-reference/other/CustomObjectsApi#patchNamespacedCustomObjectStatus) | **PATCH** /apis/{group}/{version}/namespaces/{namespace}/{plural}/{name}/status |
[**replaceClusterCustomObject**](/docs/api-reference/other/CustomObjectsApi#replaceClusterCustomObject) | **PUT** /apis/{group}/{version}/{plural}/{name} |
[**replaceClusterCustomObjectScale**](/docs/api-reference/other/CustomObjectsApi#replaceClusterCustomObjectScale) | **PUT** /apis/{group}/{version}/{plural}/{name}/scale |
[**replaceClusterCustomObjectStatus**](/docs/api-reference/other/CustomObjectsApi#replaceClusterCustomObjectStatus) | **PUT** /apis/{group}/{version}/{plural}/{name}/status |
[**replaceNamespacedCustomObject**](/docs/api-reference/other/CustomObjectsApi#replaceNamespacedCustomObject) | **PUT** /apis/{group}/{version}/namespaces/{namespace}/{plural}/{name} |
[**replaceNamespacedCustomObjectScale**](/docs/api-reference/other/CustomObjectsApi#replaceNamespacedCustomObjectScale) | **PUT** /apis/{group}/{version}/namespaces/{namespace}/{plural}/{name}/scale |
[**replaceNamespacedCustomObjectStatus**](/docs/api-reference/other/CustomObjectsApi#replaceNamespacedCustomObjectStatus) | **PUT** /apis/{group}/{version}/namespaces/{namespace}/{plural}/{name}/status |

### createClusterCustomObject

<a id="createClusterCustomObject"></a>

> any createClusterCustomObject(body)

Creates a cluster scoped Custom object

### Example

<a id="Example"></a>
```typescript
import { createConfiguration, CustomObjectsApi } from '@kubernetes/client-node';
import type { CustomObjectsApiCreateClusterCustomObjectRequest } from '@kubernetes/client-node';

const configuration = createConfiguration();
const apiInstance = new CustomObjectsApi(configuration);

const request: CustomObjectsApiCreateClusterCustomObjectRequest = {
    // The custom resource\'s group name
  group: "group_example",
    // The custom resource\'s version
  version: "version_example",
    // The custom resource\'s plural name. For TPRs this would be lowercase plural kind.
  plural: "plural_example",
    // The JSON schema of the Resource to create.
  body: {},
    // If \'true\', then the output is pretty printed. (optional)
  pretty: "pretty_example",
    // When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed (optional)
  dryRun: "dryRun_example",
    // fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch). (optional)
  fieldManager: "fieldManager_example",
    // fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. (optional) (optional)
  fieldValidation: "fieldValidation_example",
};

const data = await apiInstance.createClusterCustomObject(request);
console.log('API called successfully. Returned data:', data);
```

### Parameters

<a id="Parameters"></a>
Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **any**| The JSON schema of the Resource to create. |
 **group** | [**string**] | The custom resource\&#39;s group name | defaults to undefined
 **version** | [**string**] | The custom resource\&#39;s version | defaults to undefined
 **plural** | [**string**] | The custom resource\&#39;s plural name. For TPRs this would be lowercase plural kind. | defaults to undefined
 **pretty** | [**string**] | If \&#39;true\&#39;, then the output is pretty printed. | (optional) defaults to undefined
 **dryRun** | [**string**] | When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed | (optional) defaults to undefined
 **fieldManager** | [**string**] | fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch). | (optional) defaults to undefined
 **fieldValidation** | [**string**] | fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. (optional) | (optional) defaults to undefined

### Return type

any

### Authorization

<a id="Authorization"></a>
[BearerToken](#authorization)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**201** | Created |  -  |
**401** | Unauthorized |  -  |

### createNamespacedCustomObject

<a id="createNamespacedCustomObject"></a>

> any createNamespacedCustomObject(body)

Creates a namespace scoped Custom object

### Example

<a id="Example"></a>
```typescript
import { createConfiguration, CustomObjectsApi } from '@kubernetes/client-node';
import type { CustomObjectsApiCreateNamespacedCustomObjectRequest } from '@kubernetes/client-node';

const configuration = createConfiguration();
const apiInstance = new CustomObjectsApi(configuration);

const request: CustomObjectsApiCreateNamespacedCustomObjectRequest = {
    // The custom resource\'s group name
  group: "group_example",
    // The custom resource\'s version
  version: "version_example",
    // The custom resource\'s namespace
  namespace: "namespace_example",
    // The custom resource\'s plural name. For TPRs this would be lowercase plural kind.
  plural: "plural_example",
    // The JSON schema of the Resource to create.
  body: {},
    // If \'true\', then the output is pretty printed. (optional)
  pretty: "pretty_example",
    // When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed (optional)
  dryRun: "dryRun_example",
    // fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. (optional)
  fieldManager: "fieldManager_example",
    // fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. (optional) (optional)
  fieldValidation: "fieldValidation_example",
};

const data = await apiInstance.createNamespacedCustomObject(request);
console.log('API called successfully. Returned data:', data);
```

### Parameters

<a id="Parameters"></a>
Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **any**| The JSON schema of the Resource to create. |
 **group** | [**string**] | The custom resource\&#39;s group name | defaults to undefined
 **version** | [**string**] | The custom resource\&#39;s version | defaults to undefined
 **namespace** | [**string**] | The custom resource\&#39;s namespace | defaults to undefined
 **plural** | [**string**] | The custom resource\&#39;s plural name. For TPRs this would be lowercase plural kind. | defaults to undefined
 **pretty** | [**string**] | If \&#39;true\&#39;, then the output is pretty printed. | (optional) defaults to undefined
 **dryRun** | [**string**] | When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed | (optional) defaults to undefined
 **fieldManager** | [**string**] | fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. | (optional) defaults to undefined
 **fieldValidation** | [**string**] | fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. (optional) | (optional) defaults to undefined

### Return type

any

### Authorization

<a id="Authorization"></a>
[BearerToken](#authorization)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**201** | Created |  -  |
**401** | Unauthorized |  -  |

### deleteClusterCustomObject

<a id="deleteClusterCustomObject"></a>

> any deleteClusterCustomObject()

Deletes the specified cluster scoped custom object

### Example

<a id="Example"></a>
```typescript
import { createConfiguration, CustomObjectsApi } from '@kubernetes/client-node';
import type { CustomObjectsApiDeleteClusterCustomObjectRequest } from '@kubernetes/client-node';

const configuration = createConfiguration();
const apiInstance = new CustomObjectsApi(configuration);

const request: CustomObjectsApiDeleteClusterCustomObjectRequest = {
    // the custom resource\'s group
  group: "group_example",
    // the custom resource\'s version
  version: "version_example",
    // the custom object\'s plural name. For TPRs this would be lowercase plural kind.
  plural: "plural_example",
    // the custom object\'s name
  name: "name_example",
    // The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately. (optional)
  gracePeriodSeconds: 1,
    // Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \"orphan\" finalizer will be added to/removed from the object\'s finalizers list. Either this field or PropagationPolicy may be set, but not both. (optional)
  orphanDependents: true,
    // Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. (optional)
  propagationPolicy: "propagationPolicy_example",
    // When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed (optional)
  dryRun: "dryRun_example",

  body: {
    apiVersion: "apiVersion_example",
    dryRun: [
      "dryRun_example",
    ],
    gracePeriodSeconds: 1,
    ignoreStoreReadErrorWithClusterBreakingPotential: true,
    kind: "kind_example",
    orphanDependents: true,
    preconditions: {
      resourceVersion: "resourceVersion_example",
      uid: "uid_example",
    },
    propagationPolicy: "propagationPolicy_example",
  },
};

const data = await apiInstance.deleteClusterCustomObject(request);
console.log('API called successfully. Returned data:', data);
```

### Parameters

<a id="Parameters"></a>
Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **V1DeleteOptions**|  |
 **group** | [**string**] | the custom resource\&#39;s group | defaults to undefined
 **version** | [**string**] | the custom resource\&#39;s version | defaults to undefined
 **plural** | [**string**] | the custom object\&#39;s plural name. For TPRs this would be lowercase plural kind. | defaults to undefined
 **name** | [**string**] | the custom object\&#39;s name | defaults to undefined
 **gracePeriodSeconds** | [**number**] | The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately. | (optional) defaults to undefined
 **orphanDependents** | [**boolean**] | Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object\&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both. | (optional) defaults to undefined
 **propagationPolicy** | [**string**] | Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. | (optional) defaults to undefined
 **dryRun** | [**string**] | When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed | (optional) defaults to undefined

### Return type

any

### Authorization

<a id="Authorization"></a>
[BearerToken](#authorization)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**401** | Unauthorized |  -  |

### deleteCollectionClusterCustomObject

<a id="deleteCollectionClusterCustomObject"></a>

> any deleteCollectionClusterCustomObject()

Delete collection of cluster scoped custom objects

### Example

<a id="Example"></a>
```typescript
import { createConfiguration, CustomObjectsApi } from '@kubernetes/client-node';
import type { CustomObjectsApiDeleteCollectionClusterCustomObjectRequest } from '@kubernetes/client-node';

const configuration = createConfiguration();
const apiInstance = new CustomObjectsApi(configuration);

const request: CustomObjectsApiDeleteCollectionClusterCustomObjectRequest = {
    // The custom resource\'s group name
  group: "group_example",
    // The custom resource\'s version
  version: "version_example",
    // The custom resource\'s plural name. For TPRs this would be lowercase plural kind.
  plural: "plural_example",
    // If \'true\', then the output is pretty printed. (optional)
  pretty: "pretty_example",
    // A selector to restrict the list of returned objects by their labels. Defaults to everything. (optional)
  labelSelector: "labelSelector_example",
    // The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately. (optional)
  gracePeriodSeconds: 1,
    // Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \"orphan\" finalizer will be added to/removed from the object\'s finalizers list. Either this field or PropagationPolicy may be set, but not both. (optional)
  orphanDependents: true,
    // Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. (optional)
  propagationPolicy: "propagationPolicy_example",
    // When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed (optional)
  dryRun: "dryRun_example",

  body: {
    apiVersion: "apiVersion_example",
    dryRun: [
      "dryRun_example",
    ],
    gracePeriodSeconds: 1,
    ignoreStoreReadErrorWithClusterBreakingPotential: true,
    kind: "kind_example",
    orphanDependents: true,
    preconditions: {
      resourceVersion: "resourceVersion_example",
      uid: "uid_example",
    },
    propagationPolicy: "propagationPolicy_example",
  },
};

const data = await apiInstance.deleteCollectionClusterCustomObject(request);
console.log('API called successfully. Returned data:', data);
```

### Parameters

<a id="Parameters"></a>
Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **V1DeleteOptions**|  |
 **group** | [**string**] | The custom resource\&#39;s group name | defaults to undefined
 **version** | [**string**] | The custom resource\&#39;s version | defaults to undefined
 **plural** | [**string**] | The custom resource\&#39;s plural name. For TPRs this would be lowercase plural kind. | defaults to undefined
 **pretty** | [**string**] | If \&#39;true\&#39;, then the output is pretty printed. | (optional) defaults to undefined
 **labelSelector** | [**string**] | A selector to restrict the list of returned objects by their labels. Defaults to everything. | (optional) defaults to undefined
 **gracePeriodSeconds** | [**number**] | The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately. | (optional) defaults to undefined
 **orphanDependents** | [**boolean**] | Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object\&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both. | (optional) defaults to undefined
 **propagationPolicy** | [**string**] | Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. | (optional) defaults to undefined
 **dryRun** | [**string**] | When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed | (optional) defaults to undefined

### Return type

any

### Authorization

<a id="Authorization"></a>
[BearerToken](#authorization)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**401** | Unauthorized |  -  |

### deleteCollectionNamespacedCustomObject

<a id="deleteCollectionNamespacedCustomObject"></a>

> any deleteCollectionNamespacedCustomObject()

Delete collection of namespace scoped custom objects

### Example

<a id="Example"></a>
```typescript
import { createConfiguration, CustomObjectsApi } from '@kubernetes/client-node';
import type { CustomObjectsApiDeleteCollectionNamespacedCustomObjectRequest } from '@kubernetes/client-node';

const configuration = createConfiguration();
const apiInstance = new CustomObjectsApi(configuration);

const request: CustomObjectsApiDeleteCollectionNamespacedCustomObjectRequest = {
    // The custom resource\'s group name
  group: "group_example",
    // The custom resource\'s version
  version: "version_example",
    // The custom resource\'s namespace
  namespace: "namespace_example",
    // The custom resource\'s plural name. For TPRs this would be lowercase plural kind.
  plural: "plural_example",
    // If \'true\', then the output is pretty printed. (optional)
  pretty: "pretty_example",
    // A selector to restrict the list of returned objects by their labels. Defaults to everything. (optional)
  labelSelector: "labelSelector_example",
    // The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately. (optional)
  gracePeriodSeconds: 1,
    // Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \"orphan\" finalizer will be added to/removed from the object\'s finalizers list. Either this field or PropagationPolicy may be set, but not both. (optional)
  orphanDependents: true,
    // Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. (optional)
  propagationPolicy: "propagationPolicy_example",
    // When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed (optional)
  dryRun: "dryRun_example",
    // A selector to restrict the list of returned objects by their fields. Defaults to everything. (optional)
  fieldSelector: "fieldSelector_example",

  body: {
    apiVersion: "apiVersion_example",
    dryRun: [
      "dryRun_example",
    ],
    gracePeriodSeconds: 1,
    ignoreStoreReadErrorWithClusterBreakingPotential: true,
    kind: "kind_example",
    orphanDependents: true,
    preconditions: {
      resourceVersion: "resourceVersion_example",
      uid: "uid_example",
    },
    propagationPolicy: "propagationPolicy_example",
  },
};

const data = await apiInstance.deleteCollectionNamespacedCustomObject(request);
console.log('API called successfully. Returned data:', data);
```

### Parameters

<a id="Parameters"></a>
Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **V1DeleteOptions**|  |
 **group** | [**string**] | The custom resource\&#39;s group name | defaults to undefined
 **version** | [**string**] | The custom resource\&#39;s version | defaults to undefined
 **namespace** | [**string**] | The custom resource\&#39;s namespace | defaults to undefined
 **plural** | [**string**] | The custom resource\&#39;s plural name. For TPRs this would be lowercase plural kind. | defaults to undefined
 **pretty** | [**string**] | If \&#39;true\&#39;, then the output is pretty printed. | (optional) defaults to undefined
 **labelSelector** | [**string**] | A selector to restrict the list of returned objects by their labels. Defaults to everything. | (optional) defaults to undefined
 **gracePeriodSeconds** | [**number**] | The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately. | (optional) defaults to undefined
 **orphanDependents** | [**boolean**] | Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object\&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both. | (optional) defaults to undefined
 **propagationPolicy** | [**string**] | Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. | (optional) defaults to undefined
 **dryRun** | [**string**] | When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed | (optional) defaults to undefined
 **fieldSelector** | [**string**] | A selector to restrict the list of returned objects by their fields. Defaults to everything. | (optional) defaults to undefined

### Return type

any

### Authorization

<a id="Authorization"></a>
[BearerToken](#authorization)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**401** | Unauthorized |  -  |

### deleteNamespacedCustomObject

<a id="deleteNamespacedCustomObject"></a>

> any deleteNamespacedCustomObject()

Deletes the specified namespace scoped custom object

### Example

<a id="Example"></a>
```typescript
import { createConfiguration, CustomObjectsApi } from '@kubernetes/client-node';
import type { CustomObjectsApiDeleteNamespacedCustomObjectRequest } from '@kubernetes/client-node';

const configuration = createConfiguration();
const apiInstance = new CustomObjectsApi(configuration);

const request: CustomObjectsApiDeleteNamespacedCustomObjectRequest = {
    // the custom resource\'s group
  group: "group_example",
    // the custom resource\'s version
  version: "version_example",
    // The custom resource\'s namespace
  namespace: "namespace_example",
    // the custom resource\'s plural name. For TPRs this would be lowercase plural kind.
  plural: "plural_example",
    // the custom object\'s name
  name: "name_example",
    // The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately. (optional)
  gracePeriodSeconds: 1,
    // Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \"orphan\" finalizer will be added to/removed from the object\'s finalizers list. Either this field or PropagationPolicy may be set, but not both. (optional)
  orphanDependents: true,
    // Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. (optional)
  propagationPolicy: "propagationPolicy_example",
    // When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed (optional)
  dryRun: "dryRun_example",

  body: {
    apiVersion: "apiVersion_example",
    dryRun: [
      "dryRun_example",
    ],
    gracePeriodSeconds: 1,
    ignoreStoreReadErrorWithClusterBreakingPotential: true,
    kind: "kind_example",
    orphanDependents: true,
    preconditions: {
      resourceVersion: "resourceVersion_example",
      uid: "uid_example",
    },
    propagationPolicy: "propagationPolicy_example",
  },
};

const data = await apiInstance.deleteNamespacedCustomObject(request);
console.log('API called successfully. Returned data:', data);
```

### Parameters

<a id="Parameters"></a>
Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **V1DeleteOptions**|  |
 **group** | [**string**] | the custom resource\&#39;s group | defaults to undefined
 **version** | [**string**] | the custom resource\&#39;s version | defaults to undefined
 **namespace** | [**string**] | The custom resource\&#39;s namespace | defaults to undefined
 **plural** | [**string**] | the custom resource\&#39;s plural name. For TPRs this would be lowercase plural kind. | defaults to undefined
 **name** | [**string**] | the custom object\&#39;s name | defaults to undefined
 **gracePeriodSeconds** | [**number**] | The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately. | (optional) defaults to undefined
 **orphanDependents** | [**boolean**] | Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object\&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both. | (optional) defaults to undefined
 **propagationPolicy** | [**string**] | Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. | (optional) defaults to undefined
 **dryRun** | [**string**] | When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed | (optional) defaults to undefined

### Return type

any

### Authorization

<a id="Authorization"></a>
[BearerToken](#authorization)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**401** | Unauthorized |  -  |

### getAPIResources

<a id="getAPIResources"></a>

> V1APIResourceList getAPIResources()

get available resources

### Example

<a id="Example"></a>
```typescript
import { createConfiguration, CustomObjectsApi } from '@kubernetes/client-node';
import type { CustomObjectsApiGetAPIResourcesRequest } from '@kubernetes/client-node';

const configuration = createConfiguration();
const apiInstance = new CustomObjectsApi(configuration);

const request: CustomObjectsApiGetAPIResourcesRequest = {
    // The custom resource\'s group name
  group: "group_example",
    // The custom resource\'s version
  version: "version_example",
};

const data = await apiInstance.getAPIResources(request);
console.log('API called successfully. Returned data:', data);
```

### Parameters

<a id="Parameters"></a>
Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **group** | [**string**] | The custom resource\&#39;s group name | defaults to undefined
 **version** | [**string**] | The custom resource\&#39;s version | defaults to undefined

### Return type

V1APIResourceList

### Authorization

<a id="Authorization"></a>
[BearerToken](#authorization)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**401** | Unauthorized |  -  |

### getClusterCustomObject

<a id="getClusterCustomObject"></a>

> any getClusterCustomObject()

Returns a cluster scoped custom object

### Example

<a id="Example"></a>
```typescript
import { createConfiguration, CustomObjectsApi } from '@kubernetes/client-node';
import type { CustomObjectsApiGetClusterCustomObjectRequest } from '@kubernetes/client-node';

const configuration = createConfiguration();
const apiInstance = new CustomObjectsApi(configuration);

const request: CustomObjectsApiGetClusterCustomObjectRequest = {
    // the custom resource\'s group
  group: "group_example",
    // the custom resource\'s version
  version: "version_example",
    // the custom object\'s plural name. For TPRs this would be lowercase plural kind.
  plural: "plural_example",
    // the custom object\'s name
  name: "name_example",
};

const data = await apiInstance.getClusterCustomObject(request);
console.log('API called successfully. Returned data:', data);
```

### Parameters

<a id="Parameters"></a>
Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **group** | [**string**] | the custom resource\&#39;s group | defaults to undefined
 **version** | [**string**] | the custom resource\&#39;s version | defaults to undefined
 **plural** | [**string**] | the custom object\&#39;s plural name. For TPRs this would be lowercase plural kind. | defaults to undefined
 **name** | [**string**] | the custom object\&#39;s name | defaults to undefined

### Return type

any

### Authorization

<a id="Authorization"></a>
[BearerToken](#authorization)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | A single Resource |  -  |
**401** | Unauthorized |  -  |

### getClusterCustomObjectScale

<a id="getClusterCustomObjectScale"></a>

> any getClusterCustomObjectScale()

read scale of the specified custom object

### Example

<a id="Example"></a>
```typescript
import { createConfiguration, CustomObjectsApi } from '@kubernetes/client-node';
import type { CustomObjectsApiGetClusterCustomObjectScaleRequest } from '@kubernetes/client-node';

const configuration = createConfiguration();
const apiInstance = new CustomObjectsApi(configuration);

const request: CustomObjectsApiGetClusterCustomObjectScaleRequest = {
    // the custom resource\'s group
  group: "group_example",
    // the custom resource\'s version
  version: "version_example",
    // the custom resource\'s plural name. For TPRs this would be lowercase plural kind.
  plural: "plural_example",
    // the custom object\'s name
  name: "name_example",
};

const data = await apiInstance.getClusterCustomObjectScale(request);
console.log('API called successfully. Returned data:', data);
```

### Parameters

<a id="Parameters"></a>
Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **group** | [**string**] | the custom resource\&#39;s group | defaults to undefined
 **version** | [**string**] | the custom resource\&#39;s version | defaults to undefined
 **plural** | [**string**] | the custom resource\&#39;s plural name. For TPRs this would be lowercase plural kind. | defaults to undefined
 **name** | [**string**] | the custom object\&#39;s name | defaults to undefined

### Return type

any

### Authorization

<a id="Authorization"></a>
[BearerToken](#authorization)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**401** | Unauthorized |  -  |

### getClusterCustomObjectStatus

<a id="getClusterCustomObjectStatus"></a>

> any getClusterCustomObjectStatus()

read status of the specified cluster scoped custom object

### Example

<a id="Example"></a>
```typescript
import { createConfiguration, CustomObjectsApi } from '@kubernetes/client-node';
import type { CustomObjectsApiGetClusterCustomObjectStatusRequest } from '@kubernetes/client-node';

const configuration = createConfiguration();
const apiInstance = new CustomObjectsApi(configuration);

const request: CustomObjectsApiGetClusterCustomObjectStatusRequest = {
    // the custom resource\'s group
  group: "group_example",
    // the custom resource\'s version
  version: "version_example",
    // the custom resource\'s plural name. For TPRs this would be lowercase plural kind.
  plural: "plural_example",
    // the custom object\'s name
  name: "name_example",
};

const data = await apiInstance.getClusterCustomObjectStatus(request);
console.log('API called successfully. Returned data:', data);
```

### Parameters

<a id="Parameters"></a>
Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **group** | [**string**] | the custom resource\&#39;s group | defaults to undefined
 **version** | [**string**] | the custom resource\&#39;s version | defaults to undefined
 **plural** | [**string**] | the custom resource\&#39;s plural name. For TPRs this would be lowercase plural kind. | defaults to undefined
 **name** | [**string**] | the custom object\&#39;s name | defaults to undefined

### Return type

any

### Authorization

<a id="Authorization"></a>
[BearerToken](#authorization)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**401** | Unauthorized |  -  |

### getNamespacedCustomObject

<a id="getNamespacedCustomObject"></a>

> any getNamespacedCustomObject()

Returns a namespace scoped custom object

### Example

<a id="Example"></a>
```typescript
import { createConfiguration, CustomObjectsApi } from '@kubernetes/client-node';
import type { CustomObjectsApiGetNamespacedCustomObjectRequest } from '@kubernetes/client-node';

const configuration = createConfiguration();
const apiInstance = new CustomObjectsApi(configuration);

const request: CustomObjectsApiGetNamespacedCustomObjectRequest = {
    // the custom resource\'s group
  group: "group_example",
    // the custom resource\'s version
  version: "version_example",
    // The custom resource\'s namespace
  namespace: "namespace_example",
    // the custom resource\'s plural name. For TPRs this would be lowercase plural kind.
  plural: "plural_example",
    // the custom object\'s name
  name: "name_example",
};

const data = await apiInstance.getNamespacedCustomObject(request);
console.log('API called successfully. Returned data:', data);
```

### Parameters

<a id="Parameters"></a>
Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **group** | [**string**] | the custom resource\&#39;s group | defaults to undefined
 **version** | [**string**] | the custom resource\&#39;s version | defaults to undefined
 **namespace** | [**string**] | The custom resource\&#39;s namespace | defaults to undefined
 **plural** | [**string**] | the custom resource\&#39;s plural name. For TPRs this would be lowercase plural kind. | defaults to undefined
 **name** | [**string**] | the custom object\&#39;s name | defaults to undefined

### Return type

any

### Authorization

<a id="Authorization"></a>
[BearerToken](#authorization)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | A single Resource |  -  |
**401** | Unauthorized |  -  |

### getNamespacedCustomObjectScale

<a id="getNamespacedCustomObjectScale"></a>

> any getNamespacedCustomObjectScale()

read scale of the specified namespace scoped custom object

### Example

<a id="Example"></a>
```typescript
import { createConfiguration, CustomObjectsApi } from '@kubernetes/client-node';
import type { CustomObjectsApiGetNamespacedCustomObjectScaleRequest } from '@kubernetes/client-node';

const configuration = createConfiguration();
const apiInstance = new CustomObjectsApi(configuration);

const request: CustomObjectsApiGetNamespacedCustomObjectScaleRequest = {
    // the custom resource\'s group
  group: "group_example",
    // the custom resource\'s version
  version: "version_example",
    // The custom resource\'s namespace
  namespace: "namespace_example",
    // the custom resource\'s plural name. For TPRs this would be lowercase plural kind.
  plural: "plural_example",
    // the custom object\'s name
  name: "name_example",
};

const data = await apiInstance.getNamespacedCustomObjectScale(request);
console.log('API called successfully. Returned data:', data);
```

### Parameters

<a id="Parameters"></a>
Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **group** | [**string**] | the custom resource\&#39;s group | defaults to undefined
 **version** | [**string**] | the custom resource\&#39;s version | defaults to undefined
 **namespace** | [**string**] | The custom resource\&#39;s namespace | defaults to undefined
 **plural** | [**string**] | the custom resource\&#39;s plural name. For TPRs this would be lowercase plural kind. | defaults to undefined
 **name** | [**string**] | the custom object\&#39;s name | defaults to undefined

### Return type

any

### Authorization

<a id="Authorization"></a>
[BearerToken](#authorization)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**401** | Unauthorized |  -  |

### getNamespacedCustomObjectStatus

<a id="getNamespacedCustomObjectStatus"></a>

> any getNamespacedCustomObjectStatus()

read status of the specified namespace scoped custom object

### Example

<a id="Example"></a>
```typescript
import { createConfiguration, CustomObjectsApi } from '@kubernetes/client-node';
import type { CustomObjectsApiGetNamespacedCustomObjectStatusRequest } from '@kubernetes/client-node';

const configuration = createConfiguration();
const apiInstance = new CustomObjectsApi(configuration);

const request: CustomObjectsApiGetNamespacedCustomObjectStatusRequest = {
    // the custom resource\'s group
  group: "group_example",
    // the custom resource\'s version
  version: "version_example",
    // The custom resource\'s namespace
  namespace: "namespace_example",
    // the custom resource\'s plural name. For TPRs this would be lowercase plural kind.
  plural: "plural_example",
    // the custom object\'s name
  name: "name_example",
};

const data = await apiInstance.getNamespacedCustomObjectStatus(request);
console.log('API called successfully. Returned data:', data);
```

### Parameters

<a id="Parameters"></a>
Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **group** | [**string**] | the custom resource\&#39;s group | defaults to undefined
 **version** | [**string**] | the custom resource\&#39;s version | defaults to undefined
 **namespace** | [**string**] | The custom resource\&#39;s namespace | defaults to undefined
 **plural** | [**string**] | the custom resource\&#39;s plural name. For TPRs this would be lowercase plural kind. | defaults to undefined
 **name** | [**string**] | the custom object\&#39;s name | defaults to undefined

### Return type

any

### Authorization

<a id="Authorization"></a>
[BearerToken](#authorization)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**401** | Unauthorized |  -  |

### listClusterCustomObject

<a id="listClusterCustomObject"></a>

> any listClusterCustomObject()

list or watch cluster scoped custom objects

### Example

<a id="Example"></a>
```typescript
import { createConfiguration, CustomObjectsApi } from '@kubernetes/client-node';
import type { CustomObjectsApiListClusterCustomObjectRequest } from '@kubernetes/client-node';

const configuration = createConfiguration();
const apiInstance = new CustomObjectsApi(configuration);

const request: CustomObjectsApiListClusterCustomObjectRequest = {
    // The custom resource\'s group name
  group: "group_example",
    // The custom resource\'s version
  version: "version_example",
    // The custom resource\'s plural name. For TPRs this would be lowercase plural kind.
  plural: "plural_example",
    // If \'true\', then the output is pretty printed. (optional)
  pretty: "pretty_example",
    // allowWatchBookmarks requests watch events with type \"BOOKMARK\". Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server\'s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored. If the feature gate WatchBookmarks is not enabled in apiserver, this field is ignored. (optional)
  allowWatchBookmarks: true,
    // The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \"next key\".  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications. (optional)
  _continue: "continue_example",
    // A selector to restrict the list of returned objects by their fields. Defaults to everything. (optional)
  fieldSelector: "fieldSelector_example",
    // A selector to restrict the list of returned objects by their labels. Defaults to everything. (optional)
  labelSelector: "labelSelector_example",
    // limit is a maximum number of responses to return for a list call. If more items exist, the server will set the `continue` field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned. (optional)
  limit: 1,
    // When specified with a watch call, shows changes that occur after that particular version of a resource. Defaults to changes from the beginning of history. When specified for list: - if unset, then the result is returned from remote storage based on quorum-read flag; - if it\'s 0, then we simply return what we currently have in cache, no guarantee; - if set to non zero, then the result is at least as fresh as given rv. (optional)
  resourceVersion: "resourceVersion_example",
    // resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset (optional)
  resourceVersionMatch: "resourceVersionMatch_example",
    // Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity. (optional)
  timeoutSeconds: 1,
    // Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. (optional)
  watch: true,
};

const data = await apiInstance.listClusterCustomObject(request);
console.log('API called successfully. Returned data:', data);
```

### Parameters

<a id="Parameters"></a>
Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **group** | [**string**] | The custom resource\&#39;s group name | defaults to undefined
 **version** | [**string**] | The custom resource\&#39;s version | defaults to undefined
 **plural** | [**string**] | The custom resource\&#39;s plural name. For TPRs this would be lowercase plural kind. | defaults to undefined
 **pretty** | [**string**] | If \&#39;true\&#39;, then the output is pretty printed. | (optional) defaults to undefined
 **allowWatchBookmarks** | [**boolean**] | allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server\&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored. If the feature gate WatchBookmarks is not enabled in apiserver, this field is ignored. | (optional) defaults to undefined
 **_continue** | [**string**] | The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications. | (optional) defaults to undefined
 **fieldSelector** | [**string**] | A selector to restrict the list of returned objects by their fields. Defaults to everything. | (optional) defaults to undefined
 **labelSelector** | [**string**] | A selector to restrict the list of returned objects by their labels. Defaults to everything. | (optional) defaults to undefined
 **limit** | [**number**] | limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned. | (optional) defaults to undefined
 **resourceVersion** | [**string**] | When specified with a watch call, shows changes that occur after that particular version of a resource. Defaults to changes from the beginning of history. When specified for list: - if unset, then the result is returned from remote storage based on quorum-read flag; - if it\&#39;s 0, then we simply return what we currently have in cache, no guarantee; - if set to non zero, then the result is at least as fresh as given rv. | (optional) defaults to undefined
 **resourceVersionMatch** | [**string**] | resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset | (optional) defaults to undefined
 **timeoutSeconds** | [**number**] | Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity. | (optional) defaults to undefined
 **watch** | [**boolean**] | Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. | (optional) defaults to undefined

### Return type

any

### Authorization

<a id="Authorization"></a>
[BearerToken](#authorization)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/json;stream=watch

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**401** | Unauthorized |  -  |

### listCustomObjectForAllNamespaces

<a id="listCustomObjectForAllNamespaces"></a>

> any listCustomObjectForAllNamespaces()

list or watch namespace scoped custom objects

### Example

<a id="Example"></a>
```typescript
import { createConfiguration, CustomObjectsApi } from '@kubernetes/client-node';
import type { CustomObjectsApiListCustomObjectForAllNamespacesRequest } from '@kubernetes/client-node';

const configuration = createConfiguration();
const apiInstance = new CustomObjectsApi(configuration);

const request: CustomObjectsApiListCustomObjectForAllNamespacesRequest = {
    // The custom resource\'s group name
  group: "group_example",
    // The custom resource\'s version
  version: "version_example",
    // The custom resource\'s plural name. For TPRs this would be lowercase plural kind.
  resourcePlural: "resource_plural_example",
    // If \'true\', then the output is pretty printed. (optional)
  pretty: "pretty_example",
    // allowWatchBookmarks requests watch events with type \"BOOKMARK\". Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server\'s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored. If the feature gate WatchBookmarks is not enabled in apiserver, this field is ignored. (optional)
  allowWatchBookmarks: true,
    // The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \"next key\".  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications. (optional)
  _continue: "continue_example",
    // A selector to restrict the list of returned objects by their fields. Defaults to everything. (optional)
  fieldSelector: "fieldSelector_example",
    // A selector to restrict the list of returned objects by their labels. Defaults to everything. (optional)
  labelSelector: "labelSelector_example",
    // limit is a maximum number of responses to return for a list call. If more items exist, the server will set the `continue` field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned. (optional)
  limit: 1,
    // When specified with a watch call, shows changes that occur after that particular version of a resource. Defaults to changes from the beginning of history. When specified for list: - if unset, then the result is returned from remote storage based on quorum-read flag; - if it\'s 0, then we simply return what we currently have in cache, no guarantee; - if set to non zero, then the result is at least as fresh as given rv. (optional)
  resourceVersion: "resourceVersion_example",
    // resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset (optional)
  resourceVersionMatch: "resourceVersionMatch_example",
    // Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity. (optional)
  timeoutSeconds: 1,
    // Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. (optional)
  watch: true,
};

const data = await apiInstance.listCustomObjectForAllNamespaces(request);
console.log('API called successfully. Returned data:', data);
```

### Parameters

<a id="Parameters"></a>
Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **group** | [**string**] | The custom resource\&#39;s group name | defaults to undefined
 **version** | [**string**] | The custom resource\&#39;s version | defaults to undefined
 **resourcePlural** | [**string**] | The custom resource\&#39;s plural name. For TPRs this would be lowercase plural kind. | defaults to undefined
 **pretty** | [**string**] | If \&#39;true\&#39;, then the output is pretty printed. | (optional) defaults to undefined
 **allowWatchBookmarks** | [**boolean**] | allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server\&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored. If the feature gate WatchBookmarks is not enabled in apiserver, this field is ignored. | (optional) defaults to undefined
 **_continue** | [**string**] | The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications. | (optional) defaults to undefined
 **fieldSelector** | [**string**] | A selector to restrict the list of returned objects by their fields. Defaults to everything. | (optional) defaults to undefined
 **labelSelector** | [**string**] | A selector to restrict the list of returned objects by their labels. Defaults to everything. | (optional) defaults to undefined
 **limit** | [**number**] | limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned. | (optional) defaults to undefined
 **resourceVersion** | [**string**] | When specified with a watch call, shows changes that occur after that particular version of a resource. Defaults to changes from the beginning of history. When specified for list: - if unset, then the result is returned from remote storage based on quorum-read flag; - if it\&#39;s 0, then we simply return what we currently have in cache, no guarantee; - if set to non zero, then the result is at least as fresh as given rv. | (optional) defaults to undefined
 **resourceVersionMatch** | [**string**] | resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset | (optional) defaults to undefined
 **timeoutSeconds** | [**number**] | Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity. | (optional) defaults to undefined
 **watch** | [**boolean**] | Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. | (optional) defaults to undefined

### Return type

any

### Authorization

<a id="Authorization"></a>
[BearerToken](#authorization)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/json;stream=watch

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**401** | Unauthorized |  -  |

### listNamespacedCustomObject

<a id="listNamespacedCustomObject"></a>

> any listNamespacedCustomObject()

list or watch namespace scoped custom objects

### Example

<a id="Example"></a>
```typescript
import { createConfiguration, CustomObjectsApi } from '@kubernetes/client-node';
import type { CustomObjectsApiListNamespacedCustomObjectRequest } from '@kubernetes/client-node';

const configuration = createConfiguration();
const apiInstance = new CustomObjectsApi(configuration);

const request: CustomObjectsApiListNamespacedCustomObjectRequest = {
    // The custom resource\'s group name
  group: "group_example",
    // The custom resource\'s version
  version: "version_example",
    // The custom resource\'s namespace
  namespace: "namespace_example",
    // The custom resource\'s plural name. For TPRs this would be lowercase plural kind.
  plural: "plural_example",
    // If \'true\', then the output is pretty printed. (optional)
  pretty: "pretty_example",
    // allowWatchBookmarks requests watch events with type \"BOOKMARK\". Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server\'s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored. If the feature gate WatchBookmarks is not enabled in apiserver, this field is ignored. (optional)
  allowWatchBookmarks: true,
    // The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \"next key\".  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications. (optional)
  _continue: "continue_example",
    // A selector to restrict the list of returned objects by their fields. Defaults to everything. (optional)
  fieldSelector: "fieldSelector_example",
    // A selector to restrict the list of returned objects by their labels. Defaults to everything. (optional)
  labelSelector: "labelSelector_example",
    // limit is a maximum number of responses to return for a list call. If more items exist, the server will set the `continue` field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned. (optional)
  limit: 1,
    // When specified with a watch call, shows changes that occur after that particular version of a resource. Defaults to changes from the beginning of history. When specified for list: - if unset, then the result is returned from remote storage based on quorum-read flag; - if it\'s 0, then we simply return what we currently have in cache, no guarantee; - if set to non zero, then the result is at least as fresh as given rv. (optional)
  resourceVersion: "resourceVersion_example",
    // resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset (optional)
  resourceVersionMatch: "resourceVersionMatch_example",
    // Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity. (optional)
  timeoutSeconds: 1,
    // Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. (optional)
  watch: true,
};

const data = await apiInstance.listNamespacedCustomObject(request);
console.log('API called successfully. Returned data:', data);
```

### Parameters

<a id="Parameters"></a>
Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **group** | [**string**] | The custom resource\&#39;s group name | defaults to undefined
 **version** | [**string**] | The custom resource\&#39;s version | defaults to undefined
 **namespace** | [**string**] | The custom resource\&#39;s namespace | defaults to undefined
 **plural** | [**string**] | The custom resource\&#39;s plural name. For TPRs this would be lowercase plural kind. | defaults to undefined
 **pretty** | [**string**] | If \&#39;true\&#39;, then the output is pretty printed. | (optional) defaults to undefined
 **allowWatchBookmarks** | [**boolean**] | allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server\&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored. If the feature gate WatchBookmarks is not enabled in apiserver, this field is ignored. | (optional) defaults to undefined
 **_continue** | [**string**] | The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications. | (optional) defaults to undefined
 **fieldSelector** | [**string**] | A selector to restrict the list of returned objects by their fields. Defaults to everything. | (optional) defaults to undefined
 **labelSelector** | [**string**] | A selector to restrict the list of returned objects by their labels. Defaults to everything. | (optional) defaults to undefined
 **limit** | [**number**] | limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned. | (optional) defaults to undefined
 **resourceVersion** | [**string**] | When specified with a watch call, shows changes that occur after that particular version of a resource. Defaults to changes from the beginning of history. When specified for list: - if unset, then the result is returned from remote storage based on quorum-read flag; - if it\&#39;s 0, then we simply return what we currently have in cache, no guarantee; - if set to non zero, then the result is at least as fresh as given rv. | (optional) defaults to undefined
 **resourceVersionMatch** | [**string**] | resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset | (optional) defaults to undefined
 **timeoutSeconds** | [**number**] | Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity. | (optional) defaults to undefined
 **watch** | [**boolean**] | Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. | (optional) defaults to undefined

### Return type

any

### Authorization

<a id="Authorization"></a>
[BearerToken](#authorization)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/json;stream=watch

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**401** | Unauthorized |  -  |

### patchClusterCustomObject

<a id="patchClusterCustomObject"></a>

> any patchClusterCustomObject(body)

patch the specified cluster scoped custom object

### Example

<a id="Example"></a>
```typescript
import { createConfiguration, CustomObjectsApi } from '@kubernetes/client-node';
import type { CustomObjectsApiPatchClusterCustomObjectRequest } from '@kubernetes/client-node';

const configuration = createConfiguration();
const apiInstance = new CustomObjectsApi(configuration);

const request: CustomObjectsApiPatchClusterCustomObjectRequest = {
    // the custom resource\'s group
  group: "group_example",
    // the custom resource\'s version
  version: "version_example",
    // the custom object\'s plural name. For TPRs this would be lowercase plural kind.
  plural: "plural_example",
    // the custom object\'s name
  name: "name_example",
    // The JSON schema of the Resource to patch.
  body: {},
    // When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed (optional)
  dryRun: "dryRun_example",
    // fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch). (optional)
  fieldManager: "fieldManager_example",
    // fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. (optional) (optional)
  fieldValidation: "fieldValidation_example",
    // Force is going to \"force\" Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests. (optional)
  force: true,
};

const data = await apiInstance.patchClusterCustomObject(request);
console.log('API called successfully. Returned data:', data);
```

### Parameters

<a id="Parameters"></a>
Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **any**| The JSON schema of the Resource to patch. |
 **group** | [**string**] | the custom resource\&#39;s group | defaults to undefined
 **version** | [**string**] | the custom resource\&#39;s version | defaults to undefined
 **plural** | [**string**] | the custom object\&#39;s plural name. For TPRs this would be lowercase plural kind. | defaults to undefined
 **name** | [**string**] | the custom object\&#39;s name | defaults to undefined
 **dryRun** | [**string**] | When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed | (optional) defaults to undefined
 **fieldManager** | [**string**] | fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch). | (optional) defaults to undefined
 **fieldValidation** | [**string**] | fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. (optional) | (optional) defaults to undefined
 **force** | [**boolean**] | Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests. | (optional) defaults to undefined

### Return type

any

### Authorization

<a id="Authorization"></a>
[BearerToken](#authorization)

### HTTP request headers

 - **Content-Type**: application/json-patch+json, application/merge-patch+json
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**401** | Unauthorized |  -  |

### patchClusterCustomObjectScale

<a id="patchClusterCustomObjectScale"></a>

> any patchClusterCustomObjectScale(body)

partially update scale of the specified cluster scoped custom object

### Example

<a id="Example"></a>
```typescript
import { createConfiguration, CustomObjectsApi } from '@kubernetes/client-node';
import type { CustomObjectsApiPatchClusterCustomObjectScaleRequest } from '@kubernetes/client-node';

const configuration = createConfiguration();
const apiInstance = new CustomObjectsApi(configuration);

const request: CustomObjectsApiPatchClusterCustomObjectScaleRequest = {
    // the custom resource\'s group
  group: "group_example",
    // the custom resource\'s version
  version: "version_example",
    // the custom resource\'s plural name. For TPRs this would be lowercase plural kind.
  plural: "plural_example",
    // the custom object\'s name
  name: "name_example",

  body: {},
    // When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed (optional)
  dryRun: "dryRun_example",
    // fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch). (optional)
  fieldManager: "fieldManager_example",
    // fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. (optional) (optional)
  fieldValidation: "fieldValidation_example",
    // Force is going to \"force\" Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests. (optional)
  force: true,
};

const data = await apiInstance.patchClusterCustomObjectScale(request);
console.log('API called successfully. Returned data:', data);
```

### Parameters

<a id="Parameters"></a>
Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **any**|  |
 **group** | [**string**] | the custom resource\&#39;s group | defaults to undefined
 **version** | [**string**] | the custom resource\&#39;s version | defaults to undefined
 **plural** | [**string**] | the custom resource\&#39;s plural name. For TPRs this would be lowercase plural kind. | defaults to undefined
 **name** | [**string**] | the custom object\&#39;s name | defaults to undefined
 **dryRun** | [**string**] | When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed | (optional) defaults to undefined
 **fieldManager** | [**string**] | fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch). | (optional) defaults to undefined
 **fieldValidation** | [**string**] | fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. (optional) | (optional) defaults to undefined
 **force** | [**boolean**] | Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests. | (optional) defaults to undefined

### Return type

any

### Authorization

<a id="Authorization"></a>
[BearerToken](#authorization)

### HTTP request headers

 - **Content-Type**: application/json-patch+json, application/merge-patch+json
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**401** | Unauthorized |  -  |

### patchClusterCustomObjectStatus

<a id="patchClusterCustomObjectStatus"></a>

> any patchClusterCustomObjectStatus(body)

partially update status of the specified cluster scoped custom object

### Example

<a id="Example"></a>
```typescript
import { createConfiguration, CustomObjectsApi } from '@kubernetes/client-node';
import type { CustomObjectsApiPatchClusterCustomObjectStatusRequest } from '@kubernetes/client-node';

const configuration = createConfiguration();
const apiInstance = new CustomObjectsApi(configuration);

const request: CustomObjectsApiPatchClusterCustomObjectStatusRequest = {
    // the custom resource\'s group
  group: "group_example",
    // the custom resource\'s version
  version: "version_example",
    // the custom resource\'s plural name. For TPRs this would be lowercase plural kind.
  plural: "plural_example",
    // the custom object\'s name
  name: "name_example",

  body: {},
    // When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed (optional)
  dryRun: "dryRun_example",
    // fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch). (optional)
  fieldManager: "fieldManager_example",
    // fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. (optional) (optional)
  fieldValidation: "fieldValidation_example",
    // Force is going to \"force\" Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests. (optional)
  force: true,
};

const data = await apiInstance.patchClusterCustomObjectStatus(request);
console.log('API called successfully. Returned data:', data);
```

### Parameters

<a id="Parameters"></a>
Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **any**|  |
 **group** | [**string**] | the custom resource\&#39;s group | defaults to undefined
 **version** | [**string**] | the custom resource\&#39;s version | defaults to undefined
 **plural** | [**string**] | the custom resource\&#39;s plural name. For TPRs this would be lowercase plural kind. | defaults to undefined
 **name** | [**string**] | the custom object\&#39;s name | defaults to undefined
 **dryRun** | [**string**] | When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed | (optional) defaults to undefined
 **fieldManager** | [**string**] | fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch). | (optional) defaults to undefined
 **fieldValidation** | [**string**] | fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. (optional) | (optional) defaults to undefined
 **force** | [**boolean**] | Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests. | (optional) defaults to undefined

### Return type

any

### Authorization

<a id="Authorization"></a>
[BearerToken](#authorization)

### HTTP request headers

 - **Content-Type**: application/json-patch+json, application/merge-patch+json
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**401** | Unauthorized |  -  |

### patchNamespacedCustomObject

<a id="patchNamespacedCustomObject"></a>

> any patchNamespacedCustomObject(body)

patch the specified namespace scoped custom object

### Example

<a id="Example"></a>
```typescript
import { createConfiguration, CustomObjectsApi } from '@kubernetes/client-node';
import type { CustomObjectsApiPatchNamespacedCustomObjectRequest } from '@kubernetes/client-node';

const configuration = createConfiguration();
const apiInstance = new CustomObjectsApi(configuration);

const request: CustomObjectsApiPatchNamespacedCustomObjectRequest = {
    // the custom resource\'s group
  group: "group_example",
    // the custom resource\'s version
  version: "version_example",
    // The custom resource\'s namespace
  namespace: "namespace_example",
    // the custom resource\'s plural name. For TPRs this would be lowercase plural kind.
  plural: "plural_example",
    // the custom object\'s name
  name: "name_example",
    // The JSON schema of the Resource to patch.
  body: {},
    // When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed (optional)
  dryRun: "dryRun_example",
    // fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch). (optional)
  fieldManager: "fieldManager_example",
    // fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. (optional) (optional)
  fieldValidation: "fieldValidation_example",
    // Force is going to \"force\" Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests. (optional)
  force: true,
};

const data = await apiInstance.patchNamespacedCustomObject(request);
console.log('API called successfully. Returned data:', data);
```

### Parameters

<a id="Parameters"></a>
Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **any**| The JSON schema of the Resource to patch. |
 **group** | [**string**] | the custom resource\&#39;s group | defaults to undefined
 **version** | [**string**] | the custom resource\&#39;s version | defaults to undefined
 **namespace** | [**string**] | The custom resource\&#39;s namespace | defaults to undefined
 **plural** | [**string**] | the custom resource\&#39;s plural name. For TPRs this would be lowercase plural kind. | defaults to undefined
 **name** | [**string**] | the custom object\&#39;s name | defaults to undefined
 **dryRun** | [**string**] | When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed | (optional) defaults to undefined
 **fieldManager** | [**string**] | fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch). | (optional) defaults to undefined
 **fieldValidation** | [**string**] | fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. (optional) | (optional) defaults to undefined
 **force** | [**boolean**] | Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests. | (optional) defaults to undefined

### Return type

any

### Authorization

<a id="Authorization"></a>
[BearerToken](#authorization)

### HTTP request headers

 - **Content-Type**: application/json-patch+json, application/merge-patch+json
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**401** | Unauthorized |  -  |

### patchNamespacedCustomObjectScale

<a id="patchNamespacedCustomObjectScale"></a>

> any patchNamespacedCustomObjectScale(body)

partially update scale of the specified namespace scoped custom object

### Example

<a id="Example"></a>
```typescript
import { createConfiguration, CustomObjectsApi } from '@kubernetes/client-node';
import type { CustomObjectsApiPatchNamespacedCustomObjectScaleRequest } from '@kubernetes/client-node';

const configuration = createConfiguration();
const apiInstance = new CustomObjectsApi(configuration);

const request: CustomObjectsApiPatchNamespacedCustomObjectScaleRequest = {
    // the custom resource\'s group
  group: "group_example",
    // the custom resource\'s version
  version: "version_example",
    // The custom resource\'s namespace
  namespace: "namespace_example",
    // the custom resource\'s plural name. For TPRs this would be lowercase plural kind.
  plural: "plural_example",
    // the custom object\'s name
  name: "name_example",

  body: {},
    // When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed (optional)
  dryRun: "dryRun_example",
    // fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch). (optional)
  fieldManager: "fieldManager_example",
    // fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. (optional) (optional)
  fieldValidation: "fieldValidation_example",
    // Force is going to \"force\" Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests. (optional)
  force: true,
};

const data = await apiInstance.patchNamespacedCustomObjectScale(request);
console.log('API called successfully. Returned data:', data);
```

### Parameters

<a id="Parameters"></a>
Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **any**|  |
 **group** | [**string**] | the custom resource\&#39;s group | defaults to undefined
 **version** | [**string**] | the custom resource\&#39;s version | defaults to undefined
 **namespace** | [**string**] | The custom resource\&#39;s namespace | defaults to undefined
 **plural** | [**string**] | the custom resource\&#39;s plural name. For TPRs this would be lowercase plural kind. | defaults to undefined
 **name** | [**string**] | the custom object\&#39;s name | defaults to undefined
 **dryRun** | [**string**] | When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed | (optional) defaults to undefined
 **fieldManager** | [**string**] | fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch). | (optional) defaults to undefined
 **fieldValidation** | [**string**] | fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. (optional) | (optional) defaults to undefined
 **force** | [**boolean**] | Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests. | (optional) defaults to undefined

### Return type

any

### Authorization

<a id="Authorization"></a>
[BearerToken](#authorization)

### HTTP request headers

 - **Content-Type**: application/json-patch+json, application/merge-patch+json, application/apply-patch+yaml
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**401** | Unauthorized |  -  |

### patchNamespacedCustomObjectStatus

<a id="patchNamespacedCustomObjectStatus"></a>

> any patchNamespacedCustomObjectStatus(body)

partially update status of the specified namespace scoped custom object

### Example

<a id="Example"></a>
```typescript
import { createConfiguration, CustomObjectsApi } from '@kubernetes/client-node';
import type { CustomObjectsApiPatchNamespacedCustomObjectStatusRequest } from '@kubernetes/client-node';

const configuration = createConfiguration();
const apiInstance = new CustomObjectsApi(configuration);

const request: CustomObjectsApiPatchNamespacedCustomObjectStatusRequest = {
    // the custom resource\'s group
  group: "group_example",
    // the custom resource\'s version
  version: "version_example",
    // The custom resource\'s namespace
  namespace: "namespace_example",
    // the custom resource\'s plural name. For TPRs this would be lowercase plural kind.
  plural: "plural_example",
    // the custom object\'s name
  name: "name_example",

  body: {},
    // When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed (optional)
  dryRun: "dryRun_example",
    // fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch). (optional)
  fieldManager: "fieldManager_example",
    // fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. (optional) (optional)
  fieldValidation: "fieldValidation_example",
    // Force is going to \"force\" Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests. (optional)
  force: true,
};

const data = await apiInstance.patchNamespacedCustomObjectStatus(request);
console.log('API called successfully. Returned data:', data);
```

### Parameters

<a id="Parameters"></a>
Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **any**|  |
 **group** | [**string**] | the custom resource\&#39;s group | defaults to undefined
 **version** | [**string**] | the custom resource\&#39;s version | defaults to undefined
 **namespace** | [**string**] | The custom resource\&#39;s namespace | defaults to undefined
 **plural** | [**string**] | the custom resource\&#39;s plural name. For TPRs this would be lowercase plural kind. | defaults to undefined
 **name** | [**string**] | the custom object\&#39;s name | defaults to undefined
 **dryRun** | [**string**] | When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed | (optional) defaults to undefined
 **fieldManager** | [**string**] | fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch). | (optional) defaults to undefined
 **fieldValidation** | [**string**] | fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. (optional) | (optional) defaults to undefined
 **force** | [**boolean**] | Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests. | (optional) defaults to undefined

### Return type

any

### Authorization

<a id="Authorization"></a>
[BearerToken](#authorization)

### HTTP request headers

 - **Content-Type**: application/json-patch+json, application/merge-patch+json, application/apply-patch+yaml
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**401** | Unauthorized |  -  |

### replaceClusterCustomObject

<a id="replaceClusterCustomObject"></a>

> any replaceClusterCustomObject(body)

replace the specified cluster scoped custom object

### Example

<a id="Example"></a>
```typescript
import { createConfiguration, CustomObjectsApi } from '@kubernetes/client-node';
import type { CustomObjectsApiReplaceClusterCustomObjectRequest } from '@kubernetes/client-node';

const configuration = createConfiguration();
const apiInstance = new CustomObjectsApi(configuration);

const request: CustomObjectsApiReplaceClusterCustomObjectRequest = {
    // the custom resource\'s group
  group: "group_example",
    // the custom resource\'s version
  version: "version_example",
    // the custom object\'s plural name. For TPRs this would be lowercase plural kind.
  plural: "plural_example",
    // the custom object\'s name
  name: "name_example",
    // The JSON schema of the Resource to replace.
  body: {},
    // When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed (optional)
  dryRun: "dryRun_example",
    // fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. (optional)
  fieldManager: "fieldManager_example",
    // fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. (optional) (optional)
  fieldValidation: "fieldValidation_example",
};

const data = await apiInstance.replaceClusterCustomObject(request);
console.log('API called successfully. Returned data:', data);
```

### Parameters

<a id="Parameters"></a>
Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **any**| The JSON schema of the Resource to replace. |
 **group** | [**string**] | the custom resource\&#39;s group | defaults to undefined
 **version** | [**string**] | the custom resource\&#39;s version | defaults to undefined
 **plural** | [**string**] | the custom object\&#39;s plural name. For TPRs this would be lowercase plural kind. | defaults to undefined
 **name** | [**string**] | the custom object\&#39;s name | defaults to undefined
 **dryRun** | [**string**] | When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed | (optional) defaults to undefined
 **fieldManager** | [**string**] | fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. | (optional) defaults to undefined
 **fieldValidation** | [**string**] | fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. (optional) | (optional) defaults to undefined

### Return type

any

### Authorization

<a id="Authorization"></a>
[BearerToken](#authorization)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**401** | Unauthorized |  -  |

### replaceClusterCustomObjectScale

<a id="replaceClusterCustomObjectScale"></a>

> any replaceClusterCustomObjectScale(body)

replace scale of the specified cluster scoped custom object

### Example

<a id="Example"></a>
```typescript
import { createConfiguration, CustomObjectsApi } from '@kubernetes/client-node';
import type { CustomObjectsApiReplaceClusterCustomObjectScaleRequest } from '@kubernetes/client-node';

const configuration = createConfiguration();
const apiInstance = new CustomObjectsApi(configuration);

const request: CustomObjectsApiReplaceClusterCustomObjectScaleRequest = {
    // the custom resource\'s group
  group: "group_example",
    // the custom resource\'s version
  version: "version_example",
    // the custom resource\'s plural name. For TPRs this would be lowercase plural kind.
  plural: "plural_example",
    // the custom object\'s name
  name: "name_example",

  body: {},
    // When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed (optional)
  dryRun: "dryRun_example",
    // fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. (optional)
  fieldManager: "fieldManager_example",
    // fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. (optional) (optional)
  fieldValidation: "fieldValidation_example",
};

const data = await apiInstance.replaceClusterCustomObjectScale(request);
console.log('API called successfully. Returned data:', data);
```

### Parameters

<a id="Parameters"></a>
Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **any**|  |
 **group** | [**string**] | the custom resource\&#39;s group | defaults to undefined
 **version** | [**string**] | the custom resource\&#39;s version | defaults to undefined
 **plural** | [**string**] | the custom resource\&#39;s plural name. For TPRs this would be lowercase plural kind. | defaults to undefined
 **name** | [**string**] | the custom object\&#39;s name | defaults to undefined
 **dryRun** | [**string**] | When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed | (optional) defaults to undefined
 **fieldManager** | [**string**] | fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. | (optional) defaults to undefined
 **fieldValidation** | [**string**] | fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. (optional) | (optional) defaults to undefined

### Return type

any

### Authorization

<a id="Authorization"></a>
[BearerToken](#authorization)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**201** | Created |  -  |
**401** | Unauthorized |  -  |

### replaceClusterCustomObjectStatus

<a id="replaceClusterCustomObjectStatus"></a>

> any replaceClusterCustomObjectStatus(body)

replace status of the cluster scoped specified custom object

### Example

<a id="Example"></a>
```typescript
import { createConfiguration, CustomObjectsApi } from '@kubernetes/client-node';
import type { CustomObjectsApiReplaceClusterCustomObjectStatusRequest } from '@kubernetes/client-node';

const configuration = createConfiguration();
const apiInstance = new CustomObjectsApi(configuration);

const request: CustomObjectsApiReplaceClusterCustomObjectStatusRequest = {
    // the custom resource\'s group
  group: "group_example",
    // the custom resource\'s version
  version: "version_example",
    // the custom resource\'s plural name. For TPRs this would be lowercase plural kind.
  plural: "plural_example",
    // the custom object\'s name
  name: "name_example",

  body: {},
    // When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed (optional)
  dryRun: "dryRun_example",
    // fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. (optional)
  fieldManager: "fieldManager_example",
    // fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. (optional) (optional)
  fieldValidation: "fieldValidation_example",
};

const data = await apiInstance.replaceClusterCustomObjectStatus(request);
console.log('API called successfully. Returned data:', data);
```

### Parameters

<a id="Parameters"></a>
Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **any**|  |
 **group** | [**string**] | the custom resource\&#39;s group | defaults to undefined
 **version** | [**string**] | the custom resource\&#39;s version | defaults to undefined
 **plural** | [**string**] | the custom resource\&#39;s plural name. For TPRs this would be lowercase plural kind. | defaults to undefined
 **name** | [**string**] | the custom object\&#39;s name | defaults to undefined
 **dryRun** | [**string**] | When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed | (optional) defaults to undefined
 **fieldManager** | [**string**] | fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. | (optional) defaults to undefined
 **fieldValidation** | [**string**] | fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. (optional) | (optional) defaults to undefined

### Return type

any

### Authorization

<a id="Authorization"></a>
[BearerToken](#authorization)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**201** | Created |  -  |
**401** | Unauthorized |  -  |

### replaceNamespacedCustomObject

<a id="replaceNamespacedCustomObject"></a>

> any replaceNamespacedCustomObject(body)

replace the specified namespace scoped custom object

### Example

<a id="Example"></a>
```typescript
import { createConfiguration, CustomObjectsApi } from '@kubernetes/client-node';
import type { CustomObjectsApiReplaceNamespacedCustomObjectRequest } from '@kubernetes/client-node';

const configuration = createConfiguration();
const apiInstance = new CustomObjectsApi(configuration);

const request: CustomObjectsApiReplaceNamespacedCustomObjectRequest = {
    // the custom resource\'s group
  group: "group_example",
    // the custom resource\'s version
  version: "version_example",
    // The custom resource\'s namespace
  namespace: "namespace_example",
    // the custom resource\'s plural name. For TPRs this would be lowercase plural kind.
  plural: "plural_example",
    // the custom object\'s name
  name: "name_example",
    // The JSON schema of the Resource to replace.
  body: {},
    // When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed (optional)
  dryRun: "dryRun_example",
    // fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. (optional)
  fieldManager: "fieldManager_example",
    // fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. (optional) (optional)
  fieldValidation: "fieldValidation_example",
};

const data = await apiInstance.replaceNamespacedCustomObject(request);
console.log('API called successfully. Returned data:', data);
```

### Parameters

<a id="Parameters"></a>
Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **any**| The JSON schema of the Resource to replace. |
 **group** | [**string**] | the custom resource\&#39;s group | defaults to undefined
 **version** | [**string**] | the custom resource\&#39;s version | defaults to undefined
 **namespace** | [**string**] | The custom resource\&#39;s namespace | defaults to undefined
 **plural** | [**string**] | the custom resource\&#39;s plural name. For TPRs this would be lowercase plural kind. | defaults to undefined
 **name** | [**string**] | the custom object\&#39;s name | defaults to undefined
 **dryRun** | [**string**] | When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed | (optional) defaults to undefined
 **fieldManager** | [**string**] | fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. | (optional) defaults to undefined
 **fieldValidation** | [**string**] | fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. (optional) | (optional) defaults to undefined

### Return type

any

### Authorization

<a id="Authorization"></a>
[BearerToken](#authorization)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**401** | Unauthorized |  -  |

### replaceNamespacedCustomObjectScale

<a id="replaceNamespacedCustomObjectScale"></a>

> any replaceNamespacedCustomObjectScale(body)

replace scale of the specified namespace scoped custom object

### Example

<a id="Example"></a>
```typescript
import { createConfiguration, CustomObjectsApi } from '@kubernetes/client-node';
import type { CustomObjectsApiReplaceNamespacedCustomObjectScaleRequest } from '@kubernetes/client-node';

const configuration = createConfiguration();
const apiInstance = new CustomObjectsApi(configuration);

const request: CustomObjectsApiReplaceNamespacedCustomObjectScaleRequest = {
    // the custom resource\'s group
  group: "group_example",
    // the custom resource\'s version
  version: "version_example",
    // The custom resource\'s namespace
  namespace: "namespace_example",
    // the custom resource\'s plural name. For TPRs this would be lowercase plural kind.
  plural: "plural_example",
    // the custom object\'s name
  name: "name_example",

  body: {},
    // When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed (optional)
  dryRun: "dryRun_example",
    // fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. (optional)
  fieldManager: "fieldManager_example",
    // fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. (optional) (optional)
  fieldValidation: "fieldValidation_example",
};

const data = await apiInstance.replaceNamespacedCustomObjectScale(request);
console.log('API called successfully. Returned data:', data);
```

### Parameters

<a id="Parameters"></a>
Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **any**|  |
 **group** | [**string**] | the custom resource\&#39;s group | defaults to undefined
 **version** | [**string**] | the custom resource\&#39;s version | defaults to undefined
 **namespace** | [**string**] | The custom resource\&#39;s namespace | defaults to undefined
 **plural** | [**string**] | the custom resource\&#39;s plural name. For TPRs this would be lowercase plural kind. | defaults to undefined
 **name** | [**string**] | the custom object\&#39;s name | defaults to undefined
 **dryRun** | [**string**] | When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed | (optional) defaults to undefined
 **fieldManager** | [**string**] | fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. | (optional) defaults to undefined
 **fieldValidation** | [**string**] | fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. (optional) | (optional) defaults to undefined

### Return type

any

### Authorization

<a id="Authorization"></a>
[BearerToken](#authorization)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**201** | Created |  -  |
**401** | Unauthorized |  -  |

### replaceNamespacedCustomObjectStatus

<a id="replaceNamespacedCustomObjectStatus"></a>

> any replaceNamespacedCustomObjectStatus(body)

replace status of the specified namespace scoped custom object

### Example

<a id="Example"></a>
```typescript
import { createConfiguration, CustomObjectsApi } from '@kubernetes/client-node';
import type { CustomObjectsApiReplaceNamespacedCustomObjectStatusRequest } from '@kubernetes/client-node';

const configuration = createConfiguration();
const apiInstance = new CustomObjectsApi(configuration);

const request: CustomObjectsApiReplaceNamespacedCustomObjectStatusRequest = {
    // the custom resource\'s group
  group: "group_example",
    // the custom resource\'s version
  version: "version_example",
    // The custom resource\'s namespace
  namespace: "namespace_example",
    // the custom resource\'s plural name. For TPRs this would be lowercase plural kind.
  plural: "plural_example",
    // the custom object\'s name
  name: "name_example",

  body: {},
    // When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed (optional)
  dryRun: "dryRun_example",
    // fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. (optional)
  fieldManager: "fieldManager_example",
    // fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. (optional) (optional)
  fieldValidation: "fieldValidation_example",
};

const data = await apiInstance.replaceNamespacedCustomObjectStatus(request);
console.log('API called successfully. Returned data:', data);
```

### Parameters

<a id="Parameters"></a>
Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **any**|  |
 **group** | [**string**] | the custom resource\&#39;s group | defaults to undefined
 **version** | [**string**] | the custom resource\&#39;s version | defaults to undefined
 **namespace** | [**string**] | The custom resource\&#39;s namespace | defaults to undefined
 **plural** | [**string**] | the custom resource\&#39;s plural name. For TPRs this would be lowercase plural kind. | defaults to undefined
 **name** | [**string**] | the custom object\&#39;s name | defaults to undefined
 **dryRun** | [**string**] | When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed | (optional) defaults to undefined
 **fieldManager** | [**string**] | fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. | (optional) defaults to undefined
 **fieldValidation** | [**string**] | fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. (optional) | (optional) defaults to undefined

### Return type

any

### Authorization

<a id="Authorization"></a>
[BearerToken](#authorization)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**201** | Created |  -  |
**401** | Unauthorized |  -  |

