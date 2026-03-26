---
id: WellKnownApi
title: WellKnownApi
sidebar_label: WellKnownApi
sidebar_position: 18
---
# WellKnownApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getServiceAccountIssuerOpenIDConfiguration**](/docs/api-reference/other/WellKnownApi#getServiceAccountIssuerOpenIDConfiguration) | **GET** /.well-known/openid-configuration |

### getServiceAccountIssuerOpenIDConfiguration

<a id="getServiceAccountIssuerOpenIDConfiguration"></a>

> string getServiceAccountIssuerOpenIDConfiguration()

get service account issuer OpenID configuration, also known as the \'OIDC discovery doc\'

### Example

<a id="Example"></a>
```typescript
import { createConfiguration, WellKnownApi } from '@kubernetes/client-node';

const configuration = createConfiguration();
const apiInstance = new WellKnownApi(configuration);

const request = {};

const data = await apiInstance.getServiceAccountIssuerOpenIDConfiguration(request);
console.log('API called successfully. Returned data:', data);
```

### Parameters

<a id="Parameters"></a>
This endpoint does not need any parameter.

### Return type

string

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

