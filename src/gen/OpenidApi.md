# .OpenidApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getServiceAccountIssuerOpenIDKeyset**](OpenidApi.md#getServiceAccountIssuerOpenIDKeyset) | **GET** /openid/v1/jwks/ | 


# **getServiceAccountIssuerOpenIDKeyset**
> string getServiceAccountIssuerOpenIDKeyset()

get service account issuer OpenID JSON Web Key Set (contains public token verification keys)

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .OpenidApi(configuration);

let body:any = {};

apiInstance.getServiceAccountIssuerOpenIDKeyset(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters
This endpoint does not need any parameter.


### Return type

**string**

### Authorization

[BearerToken](README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/jwk-set+json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


