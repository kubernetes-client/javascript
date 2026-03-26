---
id: ApisApi
title: ApisApi
sidebar_label: ApisApi
sidebar_position: 1
---
# ApisApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getAPIVersions**](/docs/api-reference/other/ApisApi#getAPIVersions) | **GET** /apis/ |

### getAPIVersions

<a id="getAPIVersions"></a>

> V1APIGroupList getAPIVersions()

get available API versions

### Example

<a id="Example"></a>
```typescript
import { createConfiguration, ApisApi } from '@kubernetes/client-node';

const configuration = createConfiguration();
const apiInstance = new ApisApi(configuration);

const request = {};

const data = await apiInstance.getAPIVersions(request);
console.log('API called successfully. Returned data:', data);
```

### Parameters

<a id="Parameters"></a>
This endpoint does not need any parameter.

### Return type

V1APIGroupList

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

