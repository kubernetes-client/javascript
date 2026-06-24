---
sidebar_position: 1
title: TestApi
---

# TestApi

All URIs are relative to _http://localhost_

| Method                                              | HTTP request    | Description |
| --------------------------------------------------- | --------------- | ----------- |
| [**testMethod**](TestApi.md#testMethod)             | **GET** /test/  |
| [**anotherOperation**](TestApi.md#anotherOperation) | **POST** /test/ |

# testMethod

> V1Pod testMethod()

This tests various edge cases

### Example

```typescript
import { TestApi } from '@kubernetes/client-node';

const configuration = createConfiguration();
const apiInstance = new TestApi(configuration);

const request = {};

const data = await apiInstance.testMethod(request);
console.log('API called successfully. Returned data:', data);
```

### Parameters

This endpoint does not need any parameter.

### Return type

V1Pod

### Authorization

[BearerToken](README.md#BearerToken)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description  | Response headers |
| ----------- | ------------ | ---------------- |
| **200**     | OK           | -                |
| **401**     | Unauthorized | -                |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# anotherOperation

> string anotherOperation()

Another operation with internal links

### Example

```typescript
import { TestApi } from '@kubernetes/client-node';

const configuration = createConfiguration();
const apiInstance = new TestApi(configuration);

const request = {};

const data = await apiInstance.anotherOperation(request);
console.log('API called successfully. Returned data:', data);
```

See [**testMethod**](TestApi.md#testMethod) for more details.

### Parameters

This endpoint does not need any parameter.

### Return type

string

### Authorization

[BearerToken](README.md#BearerToken)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description  | Response headers |
| ----------- | ------------ | ---------------- |
| **200**     | OK           | -                |
| **401**     | Unauthorized | -                |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)
