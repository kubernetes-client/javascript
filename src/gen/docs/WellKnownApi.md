# .WellKnownApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getServiceAccountIssuerOpenIDConfiguration**](WellKnownApi.md#getServiceAccountIssuerOpenIDConfiguration) | **GET** /.well-known/openid-configuration | 


# **getServiceAccountIssuerOpenIDConfiguration**
> string getServiceAccountIssuerOpenIDConfiguration()

get service account issuer OpenID configuration, also known as the \'OIDC discovery doc\'

### Example


```typescript
import { createConfiguration, WellKnownApi } from '';

const configuration = createConfiguration();
const apiInstance = new WellKnownApi(configuration);

const request = {};

const data = await apiInstance.getServiceAccountIssuerOpenIDConfiguration(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**string**

### Authorization

[BearerToken](README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


