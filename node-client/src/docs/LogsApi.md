# KubernetesJsClient.LogsApi

All URIs are relative to *https://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**logFileHandler**](LogsApi.md#logFileHandler) | **GET** /logs/{logpath} | 
[**logFileListHandler**](LogsApi.md#logFileListHandler) | **GET** /logs/ | 


<a name="logFileHandler"></a>
# **logFileHandler**
> logFileHandler(logpath)



### Example
```javascript
import KubernetesJsClient from 'kubernetes-js-client';
let defaultClient = KubernetesJsClient.ApiClient.instance;

// Configure API key authorization: BearerToken
let BearerToken = defaultClient.authentications['BearerToken'];
BearerToken.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//BearerToken.apiKeyPrefix = 'Token';

let apiInstance = new KubernetesJsClient.LogsApi();

let logpath = "logpath_example"; // String | path to the log


apiInstance.logFileHandler(logpath, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **logpath** | **String**| path to the log | 

### Return type

null (empty response body)

### Authorization

[BearerToken](../README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="logFileListHandler"></a>
# **logFileListHandler**
> logFileListHandler()



### Example
```javascript
import KubernetesJsClient from 'kubernetes-js-client';
let defaultClient = KubernetesJsClient.ApiClient.instance;

// Configure API key authorization: BearerToken
let BearerToken = defaultClient.authentications['BearerToken'];
BearerToken.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//BearerToken.apiKeyPrefix = 'Token';

let apiInstance = new KubernetesJsClient.LogsApi();

apiInstance.logFileListHandler((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters
This endpoint does not need any parameter.

### Return type

null (empty response body)

### Authorization

[BearerToken](../README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

