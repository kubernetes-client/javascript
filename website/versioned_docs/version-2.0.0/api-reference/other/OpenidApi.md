---
id: OpenidApi
title: OpenidApi
sidebar_label: OpenidApi
sidebar_position: 11
---
# OpenidApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getServiceAccountIssuerOpenIDKeyset**](/docs/api-reference/other/OpenidApi#getServiceAccountIssuerOpenIDKeyset) | **GET** /openid/v1/jwks |

### getServiceAccountIssuerOpenIDKeyset

<a id="getServiceAccountIssuerOpenIDKeyset"></a>

> string getServiceAccountIssuerOpenIDKeyset()

get service account issuer OpenID JSON Web Key Set (contains public token verification keys)

### Example

<a id="Example"></a>
```typescript
import { createConfiguration, OpenidApi } from '@kubernetes/client-node';

const configuration = createConfiguration();
const apiInstance = new OpenidApi(configuration);

const request = {};

const data = await apiInstance.getServiceAccountIssuerOpenIDKeyset(request);
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
 - **Accept**: application/jwk-set+json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**401** | Unauthorized |  -  |

