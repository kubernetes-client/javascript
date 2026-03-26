---
id: CoreApi
title: CoreApi
sidebar_label: CoreApi
sidebar_position: 1
---
# CoreApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getAPIVersions**](/docs/api-reference/core-resources/CoreApi#getAPIVersions) | **GET** /api/ |

### getAPIVersions

<a id="getAPIVersions"></a>

> V1APIVersions getAPIVersions()

get available API versions

### Example

<a id="Example"></a>
```typescript
import { createConfiguration, CoreApi } from '@kubernetes/client-node';

const configuration = createConfiguration();
const apiInstance = new CoreApi(configuration);

const request = {};

const data = await apiInstance.getAPIVersions(request);
console.log('API called successfully. Returned data:', data);
```

### Parameters

<a id="Parameters"></a>
This endpoint does not need any parameter.

### Return type

V1APIVersions

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

