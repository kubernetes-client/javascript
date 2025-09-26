# .BatchV1Api

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createNamespacedCronJob**](BatchV1Api.md#createNamespacedCronJob) | **POST** /apis/batch/v1/namespaces/{namespace}/cronjobs | 
[**createNamespacedJob**](BatchV1Api.md#createNamespacedJob) | **POST** /apis/batch/v1/namespaces/{namespace}/jobs | 
[**deleteCollectionNamespacedCronJob**](BatchV1Api.md#deleteCollectionNamespacedCronJob) | **DELETE** /apis/batch/v1/namespaces/{namespace}/cronjobs | 
[**deleteCollectionNamespacedJob**](BatchV1Api.md#deleteCollectionNamespacedJob) | **DELETE** /apis/batch/v1/namespaces/{namespace}/jobs | 
[**deleteNamespacedCronJob**](BatchV1Api.md#deleteNamespacedCronJob) | **DELETE** /apis/batch/v1/namespaces/{namespace}/cronjobs/{name} | 
[**deleteNamespacedJob**](BatchV1Api.md#deleteNamespacedJob) | **DELETE** /apis/batch/v1/namespaces/{namespace}/jobs/{name} | 
[**getAPIResources**](BatchV1Api.md#getAPIResources) | **GET** /apis/batch/v1/ | 
[**listCronJobForAllNamespaces**](BatchV1Api.md#listCronJobForAllNamespaces) | **GET** /apis/batch/v1/cronjobs | 
[**listJobForAllNamespaces**](BatchV1Api.md#listJobForAllNamespaces) | **GET** /apis/batch/v1/jobs | 
[**listNamespacedCronJob**](BatchV1Api.md#listNamespacedCronJob) | **GET** /apis/batch/v1/namespaces/{namespace}/cronjobs | 
[**listNamespacedJob**](BatchV1Api.md#listNamespacedJob) | **GET** /apis/batch/v1/namespaces/{namespace}/jobs | 
[**patchNamespacedCronJob**](BatchV1Api.md#patchNamespacedCronJob) | **PATCH** /apis/batch/v1/namespaces/{namespace}/cronjobs/{name} | 
[**patchNamespacedCronJobStatus**](BatchV1Api.md#patchNamespacedCronJobStatus) | **PATCH** /apis/batch/v1/namespaces/{namespace}/cronjobs/{name}/status | 
[**patchNamespacedJob**](BatchV1Api.md#patchNamespacedJob) | **PATCH** /apis/batch/v1/namespaces/{namespace}/jobs/{name} | 
[**patchNamespacedJobStatus**](BatchV1Api.md#patchNamespacedJobStatus) | **PATCH** /apis/batch/v1/namespaces/{namespace}/jobs/{name}/status | 
[**readNamespacedCronJob**](BatchV1Api.md#readNamespacedCronJob) | **GET** /apis/batch/v1/namespaces/{namespace}/cronjobs/{name} | 
[**readNamespacedCronJobStatus**](BatchV1Api.md#readNamespacedCronJobStatus) | **GET** /apis/batch/v1/namespaces/{namespace}/cronjobs/{name}/status | 
[**readNamespacedJob**](BatchV1Api.md#readNamespacedJob) | **GET** /apis/batch/v1/namespaces/{namespace}/jobs/{name} | 
[**readNamespacedJobStatus**](BatchV1Api.md#readNamespacedJobStatus) | **GET** /apis/batch/v1/namespaces/{namespace}/jobs/{name}/status | 
[**replaceNamespacedCronJob**](BatchV1Api.md#replaceNamespacedCronJob) | **PUT** /apis/batch/v1/namespaces/{namespace}/cronjobs/{name} | 
[**replaceNamespacedCronJobStatus**](BatchV1Api.md#replaceNamespacedCronJobStatus) | **PUT** /apis/batch/v1/namespaces/{namespace}/cronjobs/{name}/status | 
[**replaceNamespacedJob**](BatchV1Api.md#replaceNamespacedJob) | **PUT** /apis/batch/v1/namespaces/{namespace}/jobs/{name} | 
[**replaceNamespacedJobStatus**](BatchV1Api.md#replaceNamespacedJobStatus) | **PUT** /apis/batch/v1/namespaces/{namespace}/jobs/{name}/status | 


# **createNamespacedCronJob**
> V1CronJob createNamespacedCronJob(body)

create a CronJob

### Example


```typescript
import { createConfiguration, BatchV1Api } from '';
import type { BatchV1ApiCreateNamespacedCronJobRequest } from '';

const configuration = createConfiguration();
const apiInstance = new BatchV1Api(configuration);

const request: BatchV1ApiCreateNamespacedCronJobRequest = {
    // object name and auth scope, such as for teams and projects
  namespace: "namespace_example",
  
  body: {
    apiVersion: "apiVersion_example",
    kind: "kind_example",
    metadata: {
      annotations: {
        "key": "key_example",
      },
      creationTimestamp: new Date('1970-01-01T00:00:00.00Z'),
      deletionGracePeriodSeconds: 1,
      deletionTimestamp: new Date('1970-01-01T00:00:00.00Z'),
      finalizers: [
        "finalizers_example",
      ],
      generateName: "generateName_example",
      generation: 1,
      labels: {
        "key": "key_example",
      },
      managedFields: [
        {
          apiVersion: "apiVersion_example",
          fieldsType: "fieldsType_example",
          fieldsV1: {},
          manager: "manager_example",
          operation: "operation_example",
          subresource: "subresource_example",
          time: new Date('1970-01-01T00:00:00.00Z'),
        },
      ],
      name: "name_example",
      namespace: "namespace_example",
      ownerReferences: [
        {
          apiVersion: "apiVersion_example",
          blockOwnerDeletion: true,
          controller: true,
          kind: "kind_example",
          name: "name_example",
          uid: "uid_example",
        },
      ],
      resourceVersion: "resourceVersion_example",
      selfLink: "selfLink_example",
      uid: "uid_example",
    },
    spec: {
      concurrencyPolicy: "concurrencyPolicy_example",
      failedJobsHistoryLimit: 1,
      jobTemplate: {
        metadata: {
          annotations: {
            "key": "key_example",
          },
          creationTimestamp: new Date('1970-01-01T00:00:00.00Z'),
          deletionGracePeriodSeconds: 1,
          deletionTimestamp: new Date('1970-01-01T00:00:00.00Z'),
          finalizers: [
            "finalizers_example",
          ],
          generateName: "generateName_example",
          generation: 1,
          labels: {
            "key": "key_example",
          },
          managedFields: [
            {
              apiVersion: "apiVersion_example",
              fieldsType: "fieldsType_example",
              fieldsV1: {},
              manager: "manager_example",
              operation: "operation_example",
              subresource: "subresource_example",
              time: new Date('1970-01-01T00:00:00.00Z'),
            },
          ],
          name: "name_example",
          namespace: "namespace_example",
          ownerReferences: [
            {
              apiVersion: "apiVersion_example",
              blockOwnerDeletion: true,
              controller: true,
              kind: "kind_example",
              name: "name_example",
              uid: "uid_example",
            },
          ],
          resourceVersion: "resourceVersion_example",
          selfLink: "selfLink_example",
          uid: "uid_example",
        },
        spec: {
          activeDeadlineSeconds: 1,
          backoffLimit: 1,
          backoffLimitPerIndex: 1,
          completionMode: "completionMode_example",
          completions: 1,
          managedBy: "managedBy_example",
          manualSelector: true,
          maxFailedIndexes: 1,
          parallelism: 1,
          podFailurePolicy: {
            rules: [
              {
                action: "action_example",
                onExitCodes: {
                  containerName: "containerName_example",
                  operator: "operator_example",
                  values: [
                    1,
                  ],
                },
                onPodConditions: [
                  {
                    status: "status_example",
                    type: "type_example",
                  },
                ],
              },
            ],
          },
          podReplacementPolicy: "podReplacementPolicy_example",
          selector: {
            matchExpressions: [
              {
                key: "key_example",
                operator: "operator_example",
                values: [
                  "values_example",
                ],
              },
            ],
            matchLabels: {
              "key": "key_example",
            },
          },
          successPolicy: {
            rules: [
              {
                succeededCount: 1,
                succeededIndexes: "succeededIndexes_example",
              },
            ],
          },
          suspend: true,
          template: {
            metadata: {
              annotations: {
                "key": "key_example",
              },
              creationTimestamp: new Date('1970-01-01T00:00:00.00Z'),
              deletionGracePeriodSeconds: 1,
              deletionTimestamp: new Date('1970-01-01T00:00:00.00Z'),
              finalizers: [
                "finalizers_example",
              ],
              generateName: "generateName_example",
              generation: 1,
              labels: {
                "key": "key_example",
              },
              managedFields: [
                {
                  apiVersion: "apiVersion_example",
                  fieldsType: "fieldsType_example",
                  fieldsV1: {},
                  manager: "manager_example",
                  operation: "operation_example",
                  subresource: "subresource_example",
                  time: new Date('1970-01-01T00:00:00.00Z'),
                },
              ],
              name: "name_example",
              namespace: "namespace_example",
              ownerReferences: [
                {
                  apiVersion: "apiVersion_example",
                  blockOwnerDeletion: true,
                  controller: true,
                  kind: "kind_example",
                  name: "name_example",
                  uid: "uid_example",
                },
              ],
              resourceVersion: "resourceVersion_example",
              selfLink: "selfLink_example",
              uid: "uid_example",
            },
            spec: {
              activeDeadlineSeconds: 1,
              affinity: {
                nodeAffinity: {
                  preferredDuringSchedulingIgnoredDuringExecution: [
                    {
                      preference: {
                        matchExpressions: [
                          {
                            key: "key_example",
                            operator: "operator_example",
                            values: [
                              "values_example",
                            ],
                          },
                        ],
                        matchFields: [
                          {
                            key: "key_example",
                            operator: "operator_example",
                            values: [
                              "values_example",
                            ],
                          },
                        ],
                      },
                      weight: 1,
                    },
                  ],
                  requiredDuringSchedulingIgnoredDuringExecution: {
                    nodeSelectorTerms: [
                      {
                        matchExpressions: [
                          {
                            key: "key_example",
                            operator: "operator_example",
                            values: [
                              "values_example",
                            ],
                          },
                        ],
                        matchFields: [
                          {
                            key: "key_example",
                            operator: "operator_example",
                            values: [
                              "values_example",
                            ],
                          },
                        ],
                      },
                    ],
                  },
                },
                podAffinity: {
                  preferredDuringSchedulingIgnoredDuringExecution: [
                    {
                      podAffinityTerm: {
                        labelSelector: {
                          matchExpressions: [
                            {
                              key: "key_example",
                              operator: "operator_example",
                              values: [
                                "values_example",
                              ],
                            },
                          ],
                          matchLabels: {
                            "key": "key_example",
                          },
                        },
                        matchLabelKeys: [
                          "matchLabelKeys_example",
                        ],
                        mismatchLabelKeys: [
                          "mismatchLabelKeys_example",
                        ],
                        namespaceSelector: {
                          matchExpressions: [
                            {
                              key: "key_example",
                              operator: "operator_example",
                              values: [
                                "values_example",
                              ],
                            },
                          ],
                          matchLabels: {
                            "key": "key_example",
                          },
                        },
                        namespaces: [
                          "namespaces_example",
                        ],
                        topologyKey: "topologyKey_example",
                      },
                      weight: 1,
                    },
                  ],
                  requiredDuringSchedulingIgnoredDuringExecution: [
                    {
                      labelSelector: {
                        matchExpressions: [
                          {
                            key: "key_example",
                            operator: "operator_example",
                            values: [
                              "values_example",
                            ],
                          },
                        ],
                        matchLabels: {
                          "key": "key_example",
                        },
                      },
                      matchLabelKeys: [
                        "matchLabelKeys_example",
                      ],
                      mismatchLabelKeys: [
                        "mismatchLabelKeys_example",
                      ],
                      namespaceSelector: {
                        matchExpressions: [
                          {
                            key: "key_example",
                            operator: "operator_example",
                            values: [
                              "values_example",
                            ],
                          },
                        ],
                        matchLabels: {
                          "key": "key_example",
                        },
                      },
                      namespaces: [
                        "namespaces_example",
                      ],
                      topologyKey: "topologyKey_example",
                    },
                  ],
                },
                podAntiAffinity: {
                  preferredDuringSchedulingIgnoredDuringExecution: [
                    {
                      podAffinityTerm: {
                        labelSelector: {
                          matchExpressions: [
                            {
                              key: "key_example",
                              operator: "operator_example",
                              values: [
                                "values_example",
                              ],
                            },
                          ],
                          matchLabels: {
                            "key": "key_example",
                          },
                        },
                        matchLabelKeys: [
                          "matchLabelKeys_example",
                        ],
                        mismatchLabelKeys: [
                          "mismatchLabelKeys_example",
                        ],
                        namespaceSelector: {
                          matchExpressions: [
                            {
                              key: "key_example",
                              operator: "operator_example",
                              values: [
                                "values_example",
                              ],
                            },
                          ],
                          matchLabels: {
                            "key": "key_example",
                          },
                        },
                        namespaces: [
                          "namespaces_example",
                        ],
                        topologyKey: "topologyKey_example",
                      },
                      weight: 1,
                    },
                  ],
                  requiredDuringSchedulingIgnoredDuringExecution: [
                    {
                      labelSelector: {
                        matchExpressions: [
                          {
                            key: "key_example",
                            operator: "operator_example",
                            values: [
                              "values_example",
                            ],
                          },
                        ],
                        matchLabels: {
                          "key": "key_example",
                        },
                      },
                      matchLabelKeys: [
                        "matchLabelKeys_example",
                      ],
                      mismatchLabelKeys: [
                        "mismatchLabelKeys_example",
                      ],
                      namespaceSelector: {
                        matchExpressions: [
                          {
                            key: "key_example",
                            operator: "operator_example",
                            values: [
                              "values_example",
                            ],
                          },
                        ],
                        matchLabels: {
                          "key": "key_example",
                        },
                      },
                      namespaces: [
                        "namespaces_example",
                      ],
                      topologyKey: "topologyKey_example",
                    },
                  ],
                },
              },
              automountServiceAccountToken: true,
              containers: [
                {
                  args: [
                    "args_example",
                  ],
                  command: [
                    "command_example",
                  ],
                  env: [
                    {
                      name: "name_example",
                      value: "value_example",
                      valueFrom: {
                        configMapKeyRef: {
                          key: "key_example",
                          name: "name_example",
                          optional: true,
                        },
                        fieldRef: {
                          apiVersion: "apiVersion_example",
                          fieldPath: "fieldPath_example",
                        },
                        fileKeyRef: {
                          key: "key_example",
                          optional: true,
                          path: "path_example",
                          volumeName: "volumeName_example",
                        },
                        resourceFieldRef: {
                          containerName: "containerName_example",
                          divisor: "divisor_example",
                          resource: "resource_example",
                        },
                        secretKeyRef: {
                          key: "key_example",
                          name: "name_example",
                          optional: true,
                        },
                      },
                    },
                  ],
                  envFrom: [
                    {
                      configMapRef: {
                        name: "name_example",
                        optional: true,
                      },
                      prefix: "prefix_example",
                      secretRef: {
                        name: "name_example",
                        optional: true,
                      },
                    },
                  ],
                  image: "image_example",
                  imagePullPolicy: "imagePullPolicy_example",
                  lifecycle: {
                    postStart: {
                      exec: {
                        command: [
                          "command_example",
                        ],
                      },
                      httpGet: {
                        host: "host_example",
                        httpHeaders: [
                          {
                            name: "name_example",
                            value: "value_example",
                          },
                        ],
                        path: "path_example",
                        port: "port_example",
                        scheme: "scheme_example",
                      },
                      sleep: {
                        seconds: 1,
                      },
                      tcpSocket: {
                        host: "host_example",
                        port: "port_example",
                      },
                    },
                    preStop: {
                      exec: {
                        command: [
                          "command_example",
                        ],
                      },
                      httpGet: {
                        host: "host_example",
                        httpHeaders: [
                          {
                            name: "name_example",
                            value: "value_example",
                          },
                        ],
                        path: "path_example",
                        port: "port_example",
                        scheme: "scheme_example",
                      },
                      sleep: {
                        seconds: 1,
                      },
                      tcpSocket: {
                        host: "host_example",
                        port: "port_example",
                      },
                    },
                    stopSignal: "stopSignal_example",
                  },
                  livenessProbe: {
                    exec: {
                      command: [
                        "command_example",
                      ],
                    },
                    failureThreshold: 1,
                    grpc: {
                      port: 1,
                      service: "service_example",
                    },
                    httpGet: {
                      host: "host_example",
                      httpHeaders: [
                        {
                          name: "name_example",
                          value: "value_example",
                        },
                      ],
                      path: "path_example",
                      port: "port_example",
                      scheme: "scheme_example",
                    },
                    initialDelaySeconds: 1,
                    periodSeconds: 1,
                    successThreshold: 1,
                    tcpSocket: {
                      host: "host_example",
                      port: "port_example",
                    },
                    terminationGracePeriodSeconds: 1,
                    timeoutSeconds: 1,
                  },
                  name: "name_example",
                  ports: [
                    {
                      containerPort: 1,
                      hostIP: "hostIP_example",
                      hostPort: 1,
                      name: "name_example",
                      protocol: "protocol_example",
                    },
                  ],
                  readinessProbe: {
                    exec: {
                      command: [
                        "command_example",
                      ],
                    },
                    failureThreshold: 1,
                    grpc: {
                      port: 1,
                      service: "service_example",
                    },
                    httpGet: {
                      host: "host_example",
                      httpHeaders: [
                        {
                          name: "name_example",
                          value: "value_example",
                        },
                      ],
                      path: "path_example",
                      port: "port_example",
                      scheme: "scheme_example",
                    },
                    initialDelaySeconds: 1,
                    periodSeconds: 1,
                    successThreshold: 1,
                    tcpSocket: {
                      host: "host_example",
                      port: "port_example",
                    },
                    terminationGracePeriodSeconds: 1,
                    timeoutSeconds: 1,
                  },
                  resizePolicy: [
                    {
                      resourceName: "resourceName_example",
                      restartPolicy: "restartPolicy_example",
                    },
                  ],
                  resources: {
                    claims: [
                      {
                        name: "name_example",
                        request: "request_example",
                      },
                    ],
                    limits: {
                      "key": "key_example",
                    },
                    requests: {
                      "key": "key_example",
                    },
                  },
                  restartPolicy: "restartPolicy_example",
                  restartPolicyRules: [
                    {
                      action: "action_example",
                      exitCodes: {
                        operator: "operator_example",
                        values: [
                          1,
                        ],
                      },
                    },
                  ],
                  securityContext: {
                    allowPrivilegeEscalation: true,
                    appArmorProfile: {
                      localhostProfile: "localhostProfile_example",
                      type: "type_example",
                    },
                    capabilities: {
                      add: [
                        "add_example",
                      ],
                      drop: [
                        "drop_example",
                      ],
                    },
                    privileged: true,
                    procMount: "procMount_example",
                    readOnlyRootFilesystem: true,
                    runAsGroup: 1,
                    runAsNonRoot: true,
                    runAsUser: 1,
                    seLinuxOptions: {
                      level: "level_example",
                      role: "role_example",
                      type: "type_example",
                      user: "user_example",
                    },
                    seccompProfile: {
                      localhostProfile: "localhostProfile_example",
                      type: "type_example",
                    },
                    windowsOptions: {
                      gmsaCredentialSpec: "gmsaCredentialSpec_example",
                      gmsaCredentialSpecName: "gmsaCredentialSpecName_example",
                      hostProcess: true,
                      runAsUserName: "runAsUserName_example",
                    },
                  },
                  startupProbe: {
                    exec: {
                      command: [
                        "command_example",
                      ],
                    },
                    failureThreshold: 1,
                    grpc: {
                      port: 1,
                      service: "service_example",
                    },
                    httpGet: {
                      host: "host_example",
                      httpHeaders: [
                        {
                          name: "name_example",
                          value: "value_example",
                        },
                      ],
                      path: "path_example",
                      port: "port_example",
                      scheme: "scheme_example",
                    },
                    initialDelaySeconds: 1,
                    periodSeconds: 1,
                    successThreshold: 1,
                    tcpSocket: {
                      host: "host_example",
                      port: "port_example",
                    },
                    terminationGracePeriodSeconds: 1,
                    timeoutSeconds: 1,
                  },
                  stdin: true,
                  stdinOnce: true,
                  terminationMessagePath: "terminationMessagePath_example",
                  terminationMessagePolicy: "terminationMessagePolicy_example",
                  tty: true,
                  volumeDevices: [
                    {
                      devicePath: "devicePath_example",
                      name: "name_example",
                    },
                  ],
                  volumeMounts: [
                    {
                      mountPath: "mountPath_example",
                      mountPropagation: "mountPropagation_example",
                      name: "name_example",
                      readOnly: true,
                      recursiveReadOnly: "recursiveReadOnly_example",
                      subPath: "subPath_example",
                      subPathExpr: "subPathExpr_example",
                    },
                  ],
                  workingDir: "workingDir_example",
                },
              ],
              dnsConfig: {
                nameservers: [
                  "nameservers_example",
                ],
                options: [
                  {
                    name: "name_example",
                    value: "value_example",
                  },
                ],
                searches: [
                  "searches_example",
                ],
              },
              dnsPolicy: "dnsPolicy_example",
              enableServiceLinks: true,
              ephemeralContainers: [
                {
                  args: [
                    "args_example",
                  ],
                  command: [
                    "command_example",
                  ],
                  env: [
                    {
                      name: "name_example",
                      value: "value_example",
                      valueFrom: {
                        configMapKeyRef: {
                          key: "key_example",
                          name: "name_example",
                          optional: true,
                        },
                        fieldRef: {
                          apiVersion: "apiVersion_example",
                          fieldPath: "fieldPath_example",
                        },
                        fileKeyRef: {
                          key: "key_example",
                          optional: true,
                          path: "path_example",
                          volumeName: "volumeName_example",
                        },
                        resourceFieldRef: {
                          containerName: "containerName_example",
                          divisor: "divisor_example",
                          resource: "resource_example",
                        },
                        secretKeyRef: {
                          key: "key_example",
                          name: "name_example",
                          optional: true,
                        },
                      },
                    },
                  ],
                  envFrom: [
                    {
                      configMapRef: {
                        name: "name_example",
                        optional: true,
                      },
                      prefix: "prefix_example",
                      secretRef: {
                        name: "name_example",
                        optional: true,
                      },
                    },
                  ],
                  image: "image_example",
                  imagePullPolicy: "imagePullPolicy_example",
                  lifecycle: {
                    postStart: {
                      exec: {
                        command: [
                          "command_example",
                        ],
                      },
                      httpGet: {
                        host: "host_example",
                        httpHeaders: [
                          {
                            name: "name_example",
                            value: "value_example",
                          },
                        ],
                        path: "path_example",
                        port: "port_example",
                        scheme: "scheme_example",
                      },
                      sleep: {
                        seconds: 1,
                      },
                      tcpSocket: {
                        host: "host_example",
                        port: "port_example",
                      },
                    },
                    preStop: {
                      exec: {
                        command: [
                          "command_example",
                        ],
                      },
                      httpGet: {
                        host: "host_example",
                        httpHeaders: [
                          {
                            name: "name_example",
                            value: "value_example",
                          },
                        ],
                        path: "path_example",
                        port: "port_example",
                        scheme: "scheme_example",
                      },
                      sleep: {
                        seconds: 1,
                      },
                      tcpSocket: {
                        host: "host_example",
                        port: "port_example",
                      },
                    },
                    stopSignal: "stopSignal_example",
                  },
                  livenessProbe: {
                    exec: {
                      command: [
                        "command_example",
                      ],
                    },
                    failureThreshold: 1,
                    grpc: {
                      port: 1,
                      service: "service_example",
                    },
                    httpGet: {
                      host: "host_example",
                      httpHeaders: [
                        {
                          name: "name_example",
                          value: "value_example",
                        },
                      ],
                      path: "path_example",
                      port: "port_example",
                      scheme: "scheme_example",
                    },
                    initialDelaySeconds: 1,
                    periodSeconds: 1,
                    successThreshold: 1,
                    tcpSocket: {
                      host: "host_example",
                      port: "port_example",
                    },
                    terminationGracePeriodSeconds: 1,
                    timeoutSeconds: 1,
                  },
                  name: "name_example",
                  ports: [
                    {
                      containerPort: 1,
                      hostIP: "hostIP_example",
                      hostPort: 1,
                      name: "name_example",
                      protocol: "protocol_example",
                    },
                  ],
                  readinessProbe: {
                    exec: {
                      command: [
                        "command_example",
                      ],
                    },
                    failureThreshold: 1,
                    grpc: {
                      port: 1,
                      service: "service_example",
                    },
                    httpGet: {
                      host: "host_example",
                      httpHeaders: [
                        {
                          name: "name_example",
                          value: "value_example",
                        },
                      ],
                      path: "path_example",
                      port: "port_example",
                      scheme: "scheme_example",
                    },
                    initialDelaySeconds: 1,
                    periodSeconds: 1,
                    successThreshold: 1,
                    tcpSocket: {
                      host: "host_example",
                      port: "port_example",
                    },
                    terminationGracePeriodSeconds: 1,
                    timeoutSeconds: 1,
                  },
                  resizePolicy: [
                    {
                      resourceName: "resourceName_example",
                      restartPolicy: "restartPolicy_example",
                    },
                  ],
                  resources: {
                    claims: [
                      {
                        name: "name_example",
                        request: "request_example",
                      },
                    ],
                    limits: {
                      "key": "key_example",
                    },
                    requests: {
                      "key": "key_example",
                    },
                  },
                  restartPolicy: "restartPolicy_example",
                  restartPolicyRules: [
                    {
                      action: "action_example",
                      exitCodes: {
                        operator: "operator_example",
                        values: [
                          1,
                        ],
                      },
                    },
                  ],
                  securityContext: {
                    allowPrivilegeEscalation: true,
                    appArmorProfile: {
                      localhostProfile: "localhostProfile_example",
                      type: "type_example",
                    },
                    capabilities: {
                      add: [
                        "add_example",
                      ],
                      drop: [
                        "drop_example",
                      ],
                    },
                    privileged: true,
                    procMount: "procMount_example",
                    readOnlyRootFilesystem: true,
                    runAsGroup: 1,
                    runAsNonRoot: true,
                    runAsUser: 1,
                    seLinuxOptions: {
                      level: "level_example",
                      role: "role_example",
                      type: "type_example",
                      user: "user_example",
                    },
                    seccompProfile: {
                      localhostProfile: "localhostProfile_example",
                      type: "type_example",
                    },
                    windowsOptions: {
                      gmsaCredentialSpec: "gmsaCredentialSpec_example",
                      gmsaCredentialSpecName: "gmsaCredentialSpecName_example",
                      hostProcess: true,
                      runAsUserName: "runAsUserName_example",
                    },
                  },
                  startupProbe: {
                    exec: {
                      command: [
                        "command_example",
                      ],
                    },
                    failureThreshold: 1,
                    grpc: {
                      port: 1,
                      service: "service_example",
                    },
                    httpGet: {
                      host: "host_example",
                      httpHeaders: [
                        {
                          name: "name_example",
                          value: "value_example",
                        },
                      ],
                      path: "path_example",
                      port: "port_example",
                      scheme: "scheme_example",
                    },
                    initialDelaySeconds: 1,
                    periodSeconds: 1,
                    successThreshold: 1,
                    tcpSocket: {
                      host: "host_example",
                      port: "port_example",
                    },
                    terminationGracePeriodSeconds: 1,
                    timeoutSeconds: 1,
                  },
                  stdin: true,
                  stdinOnce: true,
                  targetContainerName: "targetContainerName_example",
                  terminationMessagePath: "terminationMessagePath_example",
                  terminationMessagePolicy: "terminationMessagePolicy_example",
                  tty: true,
                  volumeDevices: [
                    {
                      devicePath: "devicePath_example",
                      name: "name_example",
                    },
                  ],
                  volumeMounts: [
                    {
                      mountPath: "mountPath_example",
                      mountPropagation: "mountPropagation_example",
                      name: "name_example",
                      readOnly: true,
                      recursiveReadOnly: "recursiveReadOnly_example",
                      subPath: "subPath_example",
                      subPathExpr: "subPathExpr_example",
                    },
                  ],
                  workingDir: "workingDir_example",
                },
              ],
              hostAliases: [
                {
                  hostnames: [
                    "hostnames_example",
                  ],
                  ip: "ip_example",
                },
              ],
              hostIPC: true,
              hostNetwork: true,
              hostPID: true,
              hostUsers: true,
              hostname: "hostname_example",
              hostnameOverride: "hostnameOverride_example",
              imagePullSecrets: [
                {
                  name: "name_example",
                },
              ],
              initContainers: [
                {
                  args: [
                    "args_example",
                  ],
                  command: [
                    "command_example",
                  ],
                  env: [
                    {
                      name: "name_example",
                      value: "value_example",
                      valueFrom: {
                        configMapKeyRef: {
                          key: "key_example",
                          name: "name_example",
                          optional: true,
                        },
                        fieldRef: {
                          apiVersion: "apiVersion_example",
                          fieldPath: "fieldPath_example",
                        },
                        fileKeyRef: {
                          key: "key_example",
                          optional: true,
                          path: "path_example",
                          volumeName: "volumeName_example",
                        },
                        resourceFieldRef: {
                          containerName: "containerName_example",
                          divisor: "divisor_example",
                          resource: "resource_example",
                        },
                        secretKeyRef: {
                          key: "key_example",
                          name: "name_example",
                          optional: true,
                        },
                      },
                    },
                  ],
                  envFrom: [
                    {
                      configMapRef: {
                        name: "name_example",
                        optional: true,
                      },
                      prefix: "prefix_example",
                      secretRef: {
                        name: "name_example",
                        optional: true,
                      },
                    },
                  ],
                  image: "image_example",
                  imagePullPolicy: "imagePullPolicy_example",
                  lifecycle: {
                    postStart: {
                      exec: {
                        command: [
                          "command_example",
                        ],
                      },
                      httpGet: {
                        host: "host_example",
                        httpHeaders: [
                          {
                            name: "name_example",
                            value: "value_example",
                          },
                        ],
                        path: "path_example",
                        port: "port_example",
                        scheme: "scheme_example",
                      },
                      sleep: {
                        seconds: 1,
                      },
                      tcpSocket: {
                        host: "host_example",
                        port: "port_example",
                      },
                    },
                    preStop: {
                      exec: {
                        command: [
                          "command_example",
                        ],
                      },
                      httpGet: {
                        host: "host_example",
                        httpHeaders: [
                          {
                            name: "name_example",
                            value: "value_example",
                          },
                        ],
                        path: "path_example",
                        port: "port_example",
                        scheme: "scheme_example",
                      },
                      sleep: {
                        seconds: 1,
                      },
                      tcpSocket: {
                        host: "host_example",
                        port: "port_example",
                      },
                    },
                    stopSignal: "stopSignal_example",
                  },
                  livenessProbe: {
                    exec: {
                      command: [
                        "command_example",
                      ],
                    },
                    failureThreshold: 1,
                    grpc: {
                      port: 1,
                      service: "service_example",
                    },
                    httpGet: {
                      host: "host_example",
                      httpHeaders: [
                        {
                          name: "name_example",
                          value: "value_example",
                        },
                      ],
                      path: "path_example",
                      port: "port_example",
                      scheme: "scheme_example",
                    },
                    initialDelaySeconds: 1,
                    periodSeconds: 1,
                    successThreshold: 1,
                    tcpSocket: {
                      host: "host_example",
                      port: "port_example",
                    },
                    terminationGracePeriodSeconds: 1,
                    timeoutSeconds: 1,
                  },
                  name: "name_example",
                  ports: [
                    {
                      containerPort: 1,
                      hostIP: "hostIP_example",
                      hostPort: 1,
                      name: "name_example",
                      protocol: "protocol_example",
                    },
                  ],
                  readinessProbe: {
                    exec: {
                      command: [
                        "command_example",
                      ],
                    },
                    failureThreshold: 1,
                    grpc: {
                      port: 1,
                      service: "service_example",
                    },
                    httpGet: {
                      host: "host_example",
                      httpHeaders: [
                        {
                          name: "name_example",
                          value: "value_example",
                        },
                      ],
                      path: "path_example",
                      port: "port_example",
                      scheme: "scheme_example",
                    },
                    initialDelaySeconds: 1,
                    periodSeconds: 1,
                    successThreshold: 1,
                    tcpSocket: {
                      host: "host_example",
                      port: "port_example",
                    },
                    terminationGracePeriodSeconds: 1,
                    timeoutSeconds: 1,
                  },
                  resizePolicy: [
                    {
                      resourceName: "resourceName_example",
                      restartPolicy: "restartPolicy_example",
                    },
                  ],
                  resources: {
                    claims: [
                      {
                        name: "name_example",
                        request: "request_example",
                      },
                    ],
                    limits: {
                      "key": "key_example",
                    },
                    requests: {
                      "key": "key_example",
                    },
                  },
                  restartPolicy: "restartPolicy_example",
                  restartPolicyRules: [
                    {
                      action: "action_example",
                      exitCodes: {
                        operator: "operator_example",
                        values: [
                          1,
                        ],
                      },
                    },
                  ],
                  securityContext: {
                    allowPrivilegeEscalation: true,
                    appArmorProfile: {
                      localhostProfile: "localhostProfile_example",
                      type: "type_example",
                    },
                    capabilities: {
                      add: [
                        "add_example",
                      ],
                      drop: [
                        "drop_example",
                      ],
                    },
                    privileged: true,
                    procMount: "procMount_example",
                    readOnlyRootFilesystem: true,
                    runAsGroup: 1,
                    runAsNonRoot: true,
                    runAsUser: 1,
                    seLinuxOptions: {
                      level: "level_example",
                      role: "role_example",
                      type: "type_example",
                      user: "user_example",
                    },
                    seccompProfile: {
                      localhostProfile: "localhostProfile_example",
                      type: "type_example",
                    },
                    windowsOptions: {
                      gmsaCredentialSpec: "gmsaCredentialSpec_example",
                      gmsaCredentialSpecName: "gmsaCredentialSpecName_example",
                      hostProcess: true,
                      runAsUserName: "runAsUserName_example",
                    },
                  },
                  startupProbe: {
                    exec: {
                      command: [
                        "command_example",
                      ],
                    },
                    failureThreshold: 1,
                    grpc: {
                      port: 1,
                      service: "service_example",
                    },
                    httpGet: {
                      host: "host_example",
                      httpHeaders: [
                        {
                          name: "name_example",
                          value: "value_example",
                        },
                      ],
                      path: "path_example",
                      port: "port_example",
                      scheme: "scheme_example",
                    },
                    initialDelaySeconds: 1,
                    periodSeconds: 1,
                    successThreshold: 1,
                    tcpSocket: {
                      host: "host_example",
                      port: "port_example",
                    },
                    terminationGracePeriodSeconds: 1,
                    timeoutSeconds: 1,
                  },
                  stdin: true,
                  stdinOnce: true,
                  terminationMessagePath: "terminationMessagePath_example",
                  terminationMessagePolicy: "terminationMessagePolicy_example",
                  tty: true,
                  volumeDevices: [
                    {
                      devicePath: "devicePath_example",
                      name: "name_example",
                    },
                  ],
                  volumeMounts: [
                    {
                      mountPath: "mountPath_example",
                      mountPropagation: "mountPropagation_example",
                      name: "name_example",
                      readOnly: true,
                      recursiveReadOnly: "recursiveReadOnly_example",
                      subPath: "subPath_example",
                      subPathExpr: "subPathExpr_example",
                    },
                  ],
                  workingDir: "workingDir_example",
                },
              ],
              nodeName: "nodeName_example",
              nodeSelector: {
                "key": "key_example",
              },
              os: {
                name: "name_example",
              },
              overhead: {
                "key": "key_example",
              },
              preemptionPolicy: "preemptionPolicy_example",
              priority: 1,
              priorityClassName: "priorityClassName_example",
              readinessGates: [
                {
                  conditionType: "conditionType_example",
                },
              ],
              resourceClaims: [
                {
                  name: "name_example",
                  resourceClaimName: "resourceClaimName_example",
                  resourceClaimTemplateName: "resourceClaimTemplateName_example",
                },
              ],
              resources: {
                claims: [
                  {
                    name: "name_example",
                    request: "request_example",
                  },
                ],
                limits: {
                  "key": "key_example",
                },
                requests: {
                  "key": "key_example",
                },
              },
              restartPolicy: "restartPolicy_example",
              runtimeClassName: "runtimeClassName_example",
              schedulerName: "schedulerName_example",
              schedulingGates: [
                {
                  name: "name_example",
                },
              ],
              securityContext: {
                appArmorProfile: {
                  localhostProfile: "localhostProfile_example",
                  type: "type_example",
                },
                fsGroup: 1,
                fsGroupChangePolicy: "fsGroupChangePolicy_example",
                runAsGroup: 1,
                runAsNonRoot: true,
                runAsUser: 1,
                seLinuxChangePolicy: "seLinuxChangePolicy_example",
                seLinuxOptions: {
                  level: "level_example",
                  role: "role_example",
                  type: "type_example",
                  user: "user_example",
                },
                seccompProfile: {
                  localhostProfile: "localhostProfile_example",
                  type: "type_example",
                },
                supplementalGroups: [
                  1,
                ],
                supplementalGroupsPolicy: "supplementalGroupsPolicy_example",
                sysctls: [
                  {
                    name: "name_example",
                    value: "value_example",
                  },
                ],
                windowsOptions: {
                  gmsaCredentialSpec: "gmsaCredentialSpec_example",
                  gmsaCredentialSpecName: "gmsaCredentialSpecName_example",
                  hostProcess: true,
                  runAsUserName: "runAsUserName_example",
                },
              },
              serviceAccount: "serviceAccount_example",
              serviceAccountName: "serviceAccountName_example",
              setHostnameAsFQDN: true,
              shareProcessNamespace: true,
              subdomain: "subdomain_example",
              terminationGracePeriodSeconds: 1,
              tolerations: [
                {
                  effect: "effect_example",
                  key: "key_example",
                  operator: "operator_example",
                  tolerationSeconds: 1,
                  value: "value_example",
                },
              ],
              topologySpreadConstraints: [
                {
                  labelSelector: {
                    matchExpressions: [
                      {
                        key: "key_example",
                        operator: "operator_example",
                        values: [
                          "values_example",
                        ],
                      },
                    ],
                    matchLabels: {
                      "key": "key_example",
                    },
                  },
                  matchLabelKeys: [
                    "matchLabelKeys_example",
                  ],
                  maxSkew: 1,
                  minDomains: 1,
                  nodeAffinityPolicy: "nodeAffinityPolicy_example",
                  nodeTaintsPolicy: "nodeTaintsPolicy_example",
                  topologyKey: "topologyKey_example",
                  whenUnsatisfiable: "whenUnsatisfiable_example",
                },
              ],
              volumes: [
                {
                  awsElasticBlockStore: {
                    fsType: "fsType_example",
                    partition: 1,
                    readOnly: true,
                    volumeID: "volumeID_example",
                  },
                  azureDisk: {
                    cachingMode: "cachingMode_example",
                    diskName: "diskName_example",
                    diskURI: "diskURI_example",
                    fsType: "fsType_example",
                    kind: "kind_example",
                    readOnly: true,
                  },
                  azureFile: {
                    readOnly: true,
                    secretName: "secretName_example",
                    shareName: "shareName_example",
                  },
                  cephfs: {
                    monitors: [
                      "monitors_example",
                    ],
                    path: "path_example",
                    readOnly: true,
                    secretFile: "secretFile_example",
                    secretRef: {
                      name: "name_example",
                    },
                    user: "user_example",
                  },
                  cinder: {
                    fsType: "fsType_example",
                    readOnly: true,
                    secretRef: {
                      name: "name_example",
                    },
                    volumeID: "volumeID_example",
                  },
                  configMap: {
                    defaultMode: 1,
                    items: [
                      {
                        key: "key_example",
                        mode: 1,
                        path: "path_example",
                      },
                    ],
                    name: "name_example",
                    optional: true,
                  },
                  csi: {
                    driver: "driver_example",
                    fsType: "fsType_example",
                    nodePublishSecretRef: {
                      name: "name_example",
                    },
                    readOnly: true,
                    volumeAttributes: {
                      "key": "key_example",
                    },
                  },
                  downwardAPI: {
                    defaultMode: 1,
                    items: [
                      {
                        fieldRef: {
                          apiVersion: "apiVersion_example",
                          fieldPath: "fieldPath_example",
                        },
                        mode: 1,
                        path: "path_example",
                        resourceFieldRef: {
                          containerName: "containerName_example",
                          divisor: "divisor_example",
                          resource: "resource_example",
                        },
                      },
                    ],
                  },
                  emptyDir: {
                    medium: "medium_example",
                    sizeLimit: "sizeLimit_example",
                  },
                  ephemeral: {
                    volumeClaimTemplate: {
                      metadata: {
                        annotations: {
                          "key": "key_example",
                        },
                        creationTimestamp: new Date('1970-01-01T00:00:00.00Z'),
                        deletionGracePeriodSeconds: 1,
                        deletionTimestamp: new Date('1970-01-01T00:00:00.00Z'),
                        finalizers: [
                          "finalizers_example",
                        ],
                        generateName: "generateName_example",
                        generation: 1,
                        labels: {
                          "key": "key_example",
                        },
                        managedFields: [
                          {
                            apiVersion: "apiVersion_example",
                            fieldsType: "fieldsType_example",
                            fieldsV1: {},
                            manager: "manager_example",
                            operation: "operation_example",
                            subresource: "subresource_example",
                            time: new Date('1970-01-01T00:00:00.00Z'),
                          },
                        ],
                        name: "name_example",
                        namespace: "namespace_example",
                        ownerReferences: [
                          {
                            apiVersion: "apiVersion_example",
                            blockOwnerDeletion: true,
                            controller: true,
                            kind: "kind_example",
                            name: "name_example",
                            uid: "uid_example",
                          },
                        ],
                        resourceVersion: "resourceVersion_example",
                        selfLink: "selfLink_example",
                        uid: "uid_example",
                      },
                      spec: {
                        accessModes: [
                          "accessModes_example",
                        ],
                        dataSource: {
                          apiGroup: "apiGroup_example",
                          kind: "kind_example",
                          name: "name_example",
                        },
                        dataSourceRef: {
                          apiGroup: "apiGroup_example",
                          kind: "kind_example",
                          name: "name_example",
                          namespace: "namespace_example",
                        },
                        resources: {
                          limits: {
                            "key": "key_example",
                          },
                          requests: {
                            "key": "key_example",
                          },
                        },
                        selector: {
                          matchExpressions: [
                            {
                              key: "key_example",
                              operator: "operator_example",
                              values: [
                                "values_example",
                              ],
                            },
                          ],
                          matchLabels: {
                            "key": "key_example",
                          },
                        },
                        storageClassName: "storageClassName_example",
                        volumeAttributesClassName: "volumeAttributesClassName_example",
                        volumeMode: "volumeMode_example",
                        volumeName: "volumeName_example",
                      },
                    },
                  },
                  fc: {
                    fsType: "fsType_example",
                    lun: 1,
                    readOnly: true,
                    targetWWNs: [
                      "targetWWNs_example",
                    ],
                    wwids: [
                      "wwids_example",
                    ],
                  },
                  flexVolume: {
                    driver: "driver_example",
                    fsType: "fsType_example",
                    options: {
                      "key": "key_example",
                    },
                    readOnly: true,
                    secretRef: {
                      name: "name_example",
                    },
                  },
                  flocker: {
                    datasetName: "datasetName_example",
                    datasetUUID: "datasetUUID_example",
                  },
                  gcePersistentDisk: {
                    fsType: "fsType_example",
                    partition: 1,
                    pdName: "pdName_example",
                    readOnly: true,
                  },
                  gitRepo: {
                    directory: "directory_example",
                    repository: "repository_example",
                    revision: "revision_example",
                  },
                  glusterfs: {
                    endpoints: "endpoints_example",
                    path: "path_example",
                    readOnly: true,
                  },
                  hostPath: {
                    path: "path_example",
                    type: "type_example",
                  },
                  image: {
                    pullPolicy: "pullPolicy_example",
                    reference: "reference_example",
                  },
                  iscsi: {
                    chapAuthDiscovery: true,
                    chapAuthSession: true,
                    fsType: "fsType_example",
                    initiatorName: "initiatorName_example",
                    iqn: "iqn_example",
                    iscsiInterface: "iscsiInterface_example",
                    lun: 1,
                    portals: [
                      "portals_example",
                    ],
                    readOnly: true,
                    secretRef: {
                      name: "name_example",
                    },
                    targetPortal: "targetPortal_example",
                  },
                  name: "name_example",
                  nfs: {
                    path: "path_example",
                    readOnly: true,
                    server: "server_example",
                  },
                  persistentVolumeClaim: {
                    claimName: "claimName_example",
                    readOnly: true,
                  },
                  photonPersistentDisk: {
                    fsType: "fsType_example",
                    pdID: "pdID_example",
                  },
                  portworxVolume: {
                    fsType: "fsType_example",
                    readOnly: true,
                    volumeID: "volumeID_example",
                  },
                  projected: {
                    defaultMode: 1,
                    sources: [
                      {
                        clusterTrustBundle: {
                          labelSelector: {
                            matchExpressions: [
                              {
                                key: "key_example",
                                operator: "operator_example",
                                values: [
                                  "values_example",
                                ],
                              },
                            ],
                            matchLabels: {
                              "key": "key_example",
                            },
                          },
                          name: "name_example",
                          optional: true,
                          path: "path_example",
                          signerName: "signerName_example",
                        },
                        configMap: {
                          items: [
                            {
                              key: "key_example",
                              mode: 1,
                              path: "path_example",
                            },
                          ],
                          name: "name_example",
                          optional: true,
                        },
                        downwardAPI: {
                          items: [
                            {
                              fieldRef: {
                                apiVersion: "apiVersion_example",
                                fieldPath: "fieldPath_example",
                              },
                              mode: 1,
                              path: "path_example",
                              resourceFieldRef: {
                                containerName: "containerName_example",
                                divisor: "divisor_example",
                                resource: "resource_example",
                              },
                            },
                          ],
                        },
                        podCertificate: {
                          certificateChainPath: "certificateChainPath_example",
                          credentialBundlePath: "credentialBundlePath_example",
                          keyPath: "keyPath_example",
                          keyType: "keyType_example",
                          maxExpirationSeconds: 1,
                          signerName: "signerName_example",
                        },
                        secret: {
                          items: [
                            {
                              key: "key_example",
                              mode: 1,
                              path: "path_example",
                            },
                          ],
                          name: "name_example",
                          optional: true,
                        },
                        serviceAccountToken: {
                          audience: "audience_example",
                          expirationSeconds: 1,
                          path: "path_example",
                        },
                      },
                    ],
                  },
                  quobyte: {
                    group: "group_example",
                    readOnly: true,
                    registry: "registry_example",
                    tenant: "tenant_example",
                    user: "user_example",
                    volume: "volume_example",
                  },
                  rbd: {
                    fsType: "fsType_example",
                    image: "image_example",
                    keyring: "keyring_example",
                    monitors: [
                      "monitors_example",
                    ],
                    pool: "pool_example",
                    readOnly: true,
                    secretRef: {
                      name: "name_example",
                    },
                    user: "user_example",
                  },
                  scaleIO: {
                    fsType: "fsType_example",
                    gateway: "gateway_example",
                    protectionDomain: "protectionDomain_example",
                    readOnly: true,
                    secretRef: {
                      name: "name_example",
                    },
                    sslEnabled: true,
                    storageMode: "storageMode_example",
                    storagePool: "storagePool_example",
                    system: "system_example",
                    volumeName: "volumeName_example",
                  },
                  secret: {
                    defaultMode: 1,
                    items: [
                      {
                        key: "key_example",
                        mode: 1,
                        path: "path_example",
                      },
                    ],
                    optional: true,
                    secretName: "secretName_example",
                  },
                  storageos: {
                    fsType: "fsType_example",
                    readOnly: true,
                    secretRef: {
                      name: "name_example",
                    },
                    volumeName: "volumeName_example",
                    volumeNamespace: "volumeNamespace_example",
                  },
                  vsphereVolume: {
                    fsType: "fsType_example",
                    storagePolicyID: "storagePolicyID_example",
                    storagePolicyName: "storagePolicyName_example",
                    volumePath: "volumePath_example",
                  },
                },
              ],
            },
          },
          ttlSecondsAfterFinished: 1,
        },
      },
      schedule: "schedule_example",
      startingDeadlineSeconds: 1,
      successfulJobsHistoryLimit: 1,
      suspend: true,
      timeZone: "timeZone_example",
    },
    status: {
      active: [
        {
          apiVersion: "apiVersion_example",
          fieldPath: "fieldPath_example",
          kind: "kind_example",
          name: "name_example",
          namespace: "namespace_example",
          resourceVersion: "resourceVersion_example",
          uid: "uid_example",
        },
      ],
      lastScheduleTime: new Date('1970-01-01T00:00:00.00Z'),
      lastSuccessfulTime: new Date('1970-01-01T00:00:00.00Z'),
    },
  },
    // If \'true\', then the output is pretty printed. Defaults to \'false\' unless the user-agent indicates a browser or command-line HTTP tool (curl and wget). (optional)
  pretty: "pretty_example",
    // When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed (optional)
  dryRun: "dryRun_example",
    // fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. (optional)
  fieldManager: "fieldManager_example",
    // fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. (optional)
  fieldValidation: "fieldValidation_example",
};

const data = await apiInstance.createNamespacedCronJob(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **V1CronJob**|  |
 **namespace** | [**string**] | object name and auth scope, such as for teams and projects | defaults to undefined
 **pretty** | [**string**] | If \&#39;true\&#39;, then the output is pretty printed. Defaults to \&#39;false\&#39; unless the user-agent indicates a browser or command-line HTTP tool (curl and wget). | (optional) defaults to undefined
 **dryRun** | [**string**] | When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed | (optional) defaults to undefined
 **fieldManager** | [**string**] | fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. | (optional) defaults to undefined
 **fieldValidation** | [**string**] | fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. | (optional) defaults to undefined


### Return type

**V1CronJob**

### Authorization

[BearerToken](README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf, application/cbor


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**201** | Created |  -  |
**202** | Accepted |  -  |
**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **createNamespacedJob**
> V1Job createNamespacedJob(body)

create a Job

### Example


```typescript
import { createConfiguration, BatchV1Api } from '';
import type { BatchV1ApiCreateNamespacedJobRequest } from '';

const configuration = createConfiguration();
const apiInstance = new BatchV1Api(configuration);

const request: BatchV1ApiCreateNamespacedJobRequest = {
    // object name and auth scope, such as for teams and projects
  namespace: "namespace_example",
  
  body: {
    apiVersion: "apiVersion_example",
    kind: "kind_example",
    metadata: {
      annotations: {
        "key": "key_example",
      },
      creationTimestamp: new Date('1970-01-01T00:00:00.00Z'),
      deletionGracePeriodSeconds: 1,
      deletionTimestamp: new Date('1970-01-01T00:00:00.00Z'),
      finalizers: [
        "finalizers_example",
      ],
      generateName: "generateName_example",
      generation: 1,
      labels: {
        "key": "key_example",
      },
      managedFields: [
        {
          apiVersion: "apiVersion_example",
          fieldsType: "fieldsType_example",
          fieldsV1: {},
          manager: "manager_example",
          operation: "operation_example",
          subresource: "subresource_example",
          time: new Date('1970-01-01T00:00:00.00Z'),
        },
      ],
      name: "name_example",
      namespace: "namespace_example",
      ownerReferences: [
        {
          apiVersion: "apiVersion_example",
          blockOwnerDeletion: true,
          controller: true,
          kind: "kind_example",
          name: "name_example",
          uid: "uid_example",
        },
      ],
      resourceVersion: "resourceVersion_example",
      selfLink: "selfLink_example",
      uid: "uid_example",
    },
    spec: {
      activeDeadlineSeconds: 1,
      backoffLimit: 1,
      backoffLimitPerIndex: 1,
      completionMode: "completionMode_example",
      completions: 1,
      managedBy: "managedBy_example",
      manualSelector: true,
      maxFailedIndexes: 1,
      parallelism: 1,
      podFailurePolicy: {
        rules: [
          {
            action: "action_example",
            onExitCodes: {
              containerName: "containerName_example",
              operator: "operator_example",
              values: [
                1,
              ],
            },
            onPodConditions: [
              {
                status: "status_example",
                type: "type_example",
              },
            ],
          },
        ],
      },
      podReplacementPolicy: "podReplacementPolicy_example",
      selector: {
        matchExpressions: [
          {
            key: "key_example",
            operator: "operator_example",
            values: [
              "values_example",
            ],
          },
        ],
        matchLabels: {
          "key": "key_example",
        },
      },
      successPolicy: {
        rules: [
          {
            succeededCount: 1,
            succeededIndexes: "succeededIndexes_example",
          },
        ],
      },
      suspend: true,
      template: {
        metadata: {
          annotations: {
            "key": "key_example",
          },
          creationTimestamp: new Date('1970-01-01T00:00:00.00Z'),
          deletionGracePeriodSeconds: 1,
          deletionTimestamp: new Date('1970-01-01T00:00:00.00Z'),
          finalizers: [
            "finalizers_example",
          ],
          generateName: "generateName_example",
          generation: 1,
          labels: {
            "key": "key_example",
          },
          managedFields: [
            {
              apiVersion: "apiVersion_example",
              fieldsType: "fieldsType_example",
              fieldsV1: {},
              manager: "manager_example",
              operation: "operation_example",
              subresource: "subresource_example",
              time: new Date('1970-01-01T00:00:00.00Z'),
            },
          ],
          name: "name_example",
          namespace: "namespace_example",
          ownerReferences: [
            {
              apiVersion: "apiVersion_example",
              blockOwnerDeletion: true,
              controller: true,
              kind: "kind_example",
              name: "name_example",
              uid: "uid_example",
            },
          ],
          resourceVersion: "resourceVersion_example",
          selfLink: "selfLink_example",
          uid: "uid_example",
        },
        spec: {
          activeDeadlineSeconds: 1,
          affinity: {
            nodeAffinity: {
              preferredDuringSchedulingIgnoredDuringExecution: [
                {
                  preference: {
                    matchExpressions: [
                      {
                        key: "key_example",
                        operator: "operator_example",
                        values: [
                          "values_example",
                        ],
                      },
                    ],
                    matchFields: [
                      {
                        key: "key_example",
                        operator: "operator_example",
                        values: [
                          "values_example",
                        ],
                      },
                    ],
                  },
                  weight: 1,
                },
              ],
              requiredDuringSchedulingIgnoredDuringExecution: {
                nodeSelectorTerms: [
                  {
                    matchExpressions: [
                      {
                        key: "key_example",
                        operator: "operator_example",
                        values: [
                          "values_example",
                        ],
                      },
                    ],
                    matchFields: [
                      {
                        key: "key_example",
                        operator: "operator_example",
                        values: [
                          "values_example",
                        ],
                      },
                    ],
                  },
                ],
              },
            },
            podAffinity: {
              preferredDuringSchedulingIgnoredDuringExecution: [
                {
                  podAffinityTerm: {
                    labelSelector: {
                      matchExpressions: [
                        {
                          key: "key_example",
                          operator: "operator_example",
                          values: [
                            "values_example",
                          ],
                        },
                      ],
                      matchLabels: {
                        "key": "key_example",
                      },
                    },
                    matchLabelKeys: [
                      "matchLabelKeys_example",
                    ],
                    mismatchLabelKeys: [
                      "mismatchLabelKeys_example",
                    ],
                    namespaceSelector: {
                      matchExpressions: [
                        {
                          key: "key_example",
                          operator: "operator_example",
                          values: [
                            "values_example",
                          ],
                        },
                      ],
                      matchLabels: {
                        "key": "key_example",
                      },
                    },
                    namespaces: [
                      "namespaces_example",
                    ],
                    topologyKey: "topologyKey_example",
                  },
                  weight: 1,
                },
              ],
              requiredDuringSchedulingIgnoredDuringExecution: [
                {
                  labelSelector: {
                    matchExpressions: [
                      {
                        key: "key_example",
                        operator: "operator_example",
                        values: [
                          "values_example",
                        ],
                      },
                    ],
                    matchLabels: {
                      "key": "key_example",
                    },
                  },
                  matchLabelKeys: [
                    "matchLabelKeys_example",
                  ],
                  mismatchLabelKeys: [
                    "mismatchLabelKeys_example",
                  ],
                  namespaceSelector: {
                    matchExpressions: [
                      {
                        key: "key_example",
                        operator: "operator_example",
                        values: [
                          "values_example",
                        ],
                      },
                    ],
                    matchLabels: {
                      "key": "key_example",
                    },
                  },
                  namespaces: [
                    "namespaces_example",
                  ],
                  topologyKey: "topologyKey_example",
                },
              ],
            },
            podAntiAffinity: {
              preferredDuringSchedulingIgnoredDuringExecution: [
                {
                  podAffinityTerm: {
                    labelSelector: {
                      matchExpressions: [
                        {
                          key: "key_example",
                          operator: "operator_example",
                          values: [
                            "values_example",
                          ],
                        },
                      ],
                      matchLabels: {
                        "key": "key_example",
                      },
                    },
                    matchLabelKeys: [
                      "matchLabelKeys_example",
                    ],
                    mismatchLabelKeys: [
                      "mismatchLabelKeys_example",
                    ],
                    namespaceSelector: {
                      matchExpressions: [
                        {
                          key: "key_example",
                          operator: "operator_example",
                          values: [
                            "values_example",
                          ],
                        },
                      ],
                      matchLabels: {
                        "key": "key_example",
                      },
                    },
                    namespaces: [
                      "namespaces_example",
                    ],
                    topologyKey: "topologyKey_example",
                  },
                  weight: 1,
                },
              ],
              requiredDuringSchedulingIgnoredDuringExecution: [
                {
                  labelSelector: {
                    matchExpressions: [
                      {
                        key: "key_example",
                        operator: "operator_example",
                        values: [
                          "values_example",
                        ],
                      },
                    ],
                    matchLabels: {
                      "key": "key_example",
                    },
                  },
                  matchLabelKeys: [
                    "matchLabelKeys_example",
                  ],
                  mismatchLabelKeys: [
                    "mismatchLabelKeys_example",
                  ],
                  namespaceSelector: {
                    matchExpressions: [
                      {
                        key: "key_example",
                        operator: "operator_example",
                        values: [
                          "values_example",
                        ],
                      },
                    ],
                    matchLabels: {
                      "key": "key_example",
                    },
                  },
                  namespaces: [
                    "namespaces_example",
                  ],
                  topologyKey: "topologyKey_example",
                },
              ],
            },
          },
          automountServiceAccountToken: true,
          containers: [
            {
              args: [
                "args_example",
              ],
              command: [
                "command_example",
              ],
              env: [
                {
                  name: "name_example",
                  value: "value_example",
                  valueFrom: {
                    configMapKeyRef: {
                      key: "key_example",
                      name: "name_example",
                      optional: true,
                    },
                    fieldRef: {
                      apiVersion: "apiVersion_example",
                      fieldPath: "fieldPath_example",
                    },
                    fileKeyRef: {
                      key: "key_example",
                      optional: true,
                      path: "path_example",
                      volumeName: "volumeName_example",
                    },
                    resourceFieldRef: {
                      containerName: "containerName_example",
                      divisor: "divisor_example",
                      resource: "resource_example",
                    },
                    secretKeyRef: {
                      key: "key_example",
                      name: "name_example",
                      optional: true,
                    },
                  },
                },
              ],
              envFrom: [
                {
                  configMapRef: {
                    name: "name_example",
                    optional: true,
                  },
                  prefix: "prefix_example",
                  secretRef: {
                    name: "name_example",
                    optional: true,
                  },
                },
              ],
              image: "image_example",
              imagePullPolicy: "imagePullPolicy_example",
              lifecycle: {
                postStart: {
                  exec: {
                    command: [
                      "command_example",
                    ],
                  },
                  httpGet: {
                    host: "host_example",
                    httpHeaders: [
                      {
                        name: "name_example",
                        value: "value_example",
                      },
                    ],
                    path: "path_example",
                    port: "port_example",
                    scheme: "scheme_example",
                  },
                  sleep: {
                    seconds: 1,
                  },
                  tcpSocket: {
                    host: "host_example",
                    port: "port_example",
                  },
                },
                preStop: {
                  exec: {
                    command: [
                      "command_example",
                    ],
                  },
                  httpGet: {
                    host: "host_example",
                    httpHeaders: [
                      {
                        name: "name_example",
                        value: "value_example",
                      },
                    ],
                    path: "path_example",
                    port: "port_example",
                    scheme: "scheme_example",
                  },
                  sleep: {
                    seconds: 1,
                  },
                  tcpSocket: {
                    host: "host_example",
                    port: "port_example",
                  },
                },
                stopSignal: "stopSignal_example",
              },
              livenessProbe: {
                exec: {
                  command: [
                    "command_example",
                  ],
                },
                failureThreshold: 1,
                grpc: {
                  port: 1,
                  service: "service_example",
                },
                httpGet: {
                  host: "host_example",
                  httpHeaders: [
                    {
                      name: "name_example",
                      value: "value_example",
                    },
                  ],
                  path: "path_example",
                  port: "port_example",
                  scheme: "scheme_example",
                },
                initialDelaySeconds: 1,
                periodSeconds: 1,
                successThreshold: 1,
                tcpSocket: {
                  host: "host_example",
                  port: "port_example",
                },
                terminationGracePeriodSeconds: 1,
                timeoutSeconds: 1,
              },
              name: "name_example",
              ports: [
                {
                  containerPort: 1,
                  hostIP: "hostIP_example",
                  hostPort: 1,
                  name: "name_example",
                  protocol: "protocol_example",
                },
              ],
              readinessProbe: {
                exec: {
                  command: [
                    "command_example",
                  ],
                },
                failureThreshold: 1,
                grpc: {
                  port: 1,
                  service: "service_example",
                },
                httpGet: {
                  host: "host_example",
                  httpHeaders: [
                    {
                      name: "name_example",
                      value: "value_example",
                    },
                  ],
                  path: "path_example",
                  port: "port_example",
                  scheme: "scheme_example",
                },
                initialDelaySeconds: 1,
                periodSeconds: 1,
                successThreshold: 1,
                tcpSocket: {
                  host: "host_example",
                  port: "port_example",
                },
                terminationGracePeriodSeconds: 1,
                timeoutSeconds: 1,
              },
              resizePolicy: [
                {
                  resourceName: "resourceName_example",
                  restartPolicy: "restartPolicy_example",
                },
              ],
              resources: {
                claims: [
                  {
                    name: "name_example",
                    request: "request_example",
                  },
                ],
                limits: {
                  "key": "key_example",
                },
                requests: {
                  "key": "key_example",
                },
              },
              restartPolicy: "restartPolicy_example",
              restartPolicyRules: [
                {
                  action: "action_example",
                  exitCodes: {
                    operator: "operator_example",
                    values: [
                      1,
                    ],
                  },
                },
              ],
              securityContext: {
                allowPrivilegeEscalation: true,
                appArmorProfile: {
                  localhostProfile: "localhostProfile_example",
                  type: "type_example",
                },
                capabilities: {
                  add: [
                    "add_example",
                  ],
                  drop: [
                    "drop_example",
                  ],
                },
                privileged: true,
                procMount: "procMount_example",
                readOnlyRootFilesystem: true,
                runAsGroup: 1,
                runAsNonRoot: true,
                runAsUser: 1,
                seLinuxOptions: {
                  level: "level_example",
                  role: "role_example",
                  type: "type_example",
                  user: "user_example",
                },
                seccompProfile: {
                  localhostProfile: "localhostProfile_example",
                  type: "type_example",
                },
                windowsOptions: {
                  gmsaCredentialSpec: "gmsaCredentialSpec_example",
                  gmsaCredentialSpecName: "gmsaCredentialSpecName_example",
                  hostProcess: true,
                  runAsUserName: "runAsUserName_example",
                },
              },
              startupProbe: {
                exec: {
                  command: [
                    "command_example",
                  ],
                },
                failureThreshold: 1,
                grpc: {
                  port: 1,
                  service: "service_example",
                },
                httpGet: {
                  host: "host_example",
                  httpHeaders: [
                    {
                      name: "name_example",
                      value: "value_example",
                    },
                  ],
                  path: "path_example",
                  port: "port_example",
                  scheme: "scheme_example",
                },
                initialDelaySeconds: 1,
                periodSeconds: 1,
                successThreshold: 1,
                tcpSocket: {
                  host: "host_example",
                  port: "port_example",
                },
                terminationGracePeriodSeconds: 1,
                timeoutSeconds: 1,
              },
              stdin: true,
              stdinOnce: true,
              terminationMessagePath: "terminationMessagePath_example",
              terminationMessagePolicy: "terminationMessagePolicy_example",
              tty: true,
              volumeDevices: [
                {
                  devicePath: "devicePath_example",
                  name: "name_example",
                },
              ],
              volumeMounts: [
                {
                  mountPath: "mountPath_example",
                  mountPropagation: "mountPropagation_example",
                  name: "name_example",
                  readOnly: true,
                  recursiveReadOnly: "recursiveReadOnly_example",
                  subPath: "subPath_example",
                  subPathExpr: "subPathExpr_example",
                },
              ],
              workingDir: "workingDir_example",
            },
          ],
          dnsConfig: {
            nameservers: [
              "nameservers_example",
            ],
            options: [
              {
                name: "name_example",
                value: "value_example",
              },
            ],
            searches: [
              "searches_example",
            ],
          },
          dnsPolicy: "dnsPolicy_example",
          enableServiceLinks: true,
          ephemeralContainers: [
            {
              args: [
                "args_example",
              ],
              command: [
                "command_example",
              ],
              env: [
                {
                  name: "name_example",
                  value: "value_example",
                  valueFrom: {
                    configMapKeyRef: {
                      key: "key_example",
                      name: "name_example",
                      optional: true,
                    },
                    fieldRef: {
                      apiVersion: "apiVersion_example",
                      fieldPath: "fieldPath_example",
                    },
                    fileKeyRef: {
                      key: "key_example",
                      optional: true,
                      path: "path_example",
                      volumeName: "volumeName_example",
                    },
                    resourceFieldRef: {
                      containerName: "containerName_example",
                      divisor: "divisor_example",
                      resource: "resource_example",
                    },
                    secretKeyRef: {
                      key: "key_example",
                      name: "name_example",
                      optional: true,
                    },
                  },
                },
              ],
              envFrom: [
                {
                  configMapRef: {
                    name: "name_example",
                    optional: true,
                  },
                  prefix: "prefix_example",
                  secretRef: {
                    name: "name_example",
                    optional: true,
                  },
                },
              ],
              image: "image_example",
              imagePullPolicy: "imagePullPolicy_example",
              lifecycle: {
                postStart: {
                  exec: {
                    command: [
                      "command_example",
                    ],
                  },
                  httpGet: {
                    host: "host_example",
                    httpHeaders: [
                      {
                        name: "name_example",
                        value: "value_example",
                      },
                    ],
                    path: "path_example",
                    port: "port_example",
                    scheme: "scheme_example",
                  },
                  sleep: {
                    seconds: 1,
                  },
                  tcpSocket: {
                    host: "host_example",
                    port: "port_example",
                  },
                },
                preStop: {
                  exec: {
                    command: [
                      "command_example",
                    ],
                  },
                  httpGet: {
                    host: "host_example",
                    httpHeaders: [
                      {
                        name: "name_example",
                        value: "value_example",
                      },
                    ],
                    path: "path_example",
                    port: "port_example",
                    scheme: "scheme_example",
                  },
                  sleep: {
                    seconds: 1,
                  },
                  tcpSocket: {
                    host: "host_example",
                    port: "port_example",
                  },
                },
                stopSignal: "stopSignal_example",
              },
              livenessProbe: {
                exec: {
                  command: [
                    "command_example",
                  ],
                },
                failureThreshold: 1,
                grpc: {
                  port: 1,
                  service: "service_example",
                },
                httpGet: {
                  host: "host_example",
                  httpHeaders: [
                    {
                      name: "name_example",
                      value: "value_example",
                    },
                  ],
                  path: "path_example",
                  port: "port_example",
                  scheme: "scheme_example",
                },
                initialDelaySeconds: 1,
                periodSeconds: 1,
                successThreshold: 1,
                tcpSocket: {
                  host: "host_example",
                  port: "port_example",
                },
                terminationGracePeriodSeconds: 1,
                timeoutSeconds: 1,
              },
              name: "name_example",
              ports: [
                {
                  containerPort: 1,
                  hostIP: "hostIP_example",
                  hostPort: 1,
                  name: "name_example",
                  protocol: "protocol_example",
                },
              ],
              readinessProbe: {
                exec: {
                  command: [
                    "command_example",
                  ],
                },
                failureThreshold: 1,
                grpc: {
                  port: 1,
                  service: "service_example",
                },
                httpGet: {
                  host: "host_example",
                  httpHeaders: [
                    {
                      name: "name_example",
                      value: "value_example",
                    },
                  ],
                  path: "path_example",
                  port: "port_example",
                  scheme: "scheme_example",
                },
                initialDelaySeconds: 1,
                periodSeconds: 1,
                successThreshold: 1,
                tcpSocket: {
                  host: "host_example",
                  port: "port_example",
                },
                terminationGracePeriodSeconds: 1,
                timeoutSeconds: 1,
              },
              resizePolicy: [
                {
                  resourceName: "resourceName_example",
                  restartPolicy: "restartPolicy_example",
                },
              ],
              resources: {
                claims: [
                  {
                    name: "name_example",
                    request: "request_example",
                  },
                ],
                limits: {
                  "key": "key_example",
                },
                requests: {
                  "key": "key_example",
                },
              },
              restartPolicy: "restartPolicy_example",
              restartPolicyRules: [
                {
                  action: "action_example",
                  exitCodes: {
                    operator: "operator_example",
                    values: [
                      1,
                    ],
                  },
                },
              ],
              securityContext: {
                allowPrivilegeEscalation: true,
                appArmorProfile: {
                  localhostProfile: "localhostProfile_example",
                  type: "type_example",
                },
                capabilities: {
                  add: [
                    "add_example",
                  ],
                  drop: [
                    "drop_example",
                  ],
                },
                privileged: true,
                procMount: "procMount_example",
                readOnlyRootFilesystem: true,
                runAsGroup: 1,
                runAsNonRoot: true,
                runAsUser: 1,
                seLinuxOptions: {
                  level: "level_example",
                  role: "role_example",
                  type: "type_example",
                  user: "user_example",
                },
                seccompProfile: {
                  localhostProfile: "localhostProfile_example",
                  type: "type_example",
                },
                windowsOptions: {
                  gmsaCredentialSpec: "gmsaCredentialSpec_example",
                  gmsaCredentialSpecName: "gmsaCredentialSpecName_example",
                  hostProcess: true,
                  runAsUserName: "runAsUserName_example",
                },
              },
              startupProbe: {
                exec: {
                  command: [
                    "command_example",
                  ],
                },
                failureThreshold: 1,
                grpc: {
                  port: 1,
                  service: "service_example",
                },
                httpGet: {
                  host: "host_example",
                  httpHeaders: [
                    {
                      name: "name_example",
                      value: "value_example",
                    },
                  ],
                  path: "path_example",
                  port: "port_example",
                  scheme: "scheme_example",
                },
                initialDelaySeconds: 1,
                periodSeconds: 1,
                successThreshold: 1,
                tcpSocket: {
                  host: "host_example",
                  port: "port_example",
                },
                terminationGracePeriodSeconds: 1,
                timeoutSeconds: 1,
              },
              stdin: true,
              stdinOnce: true,
              targetContainerName: "targetContainerName_example",
              terminationMessagePath: "terminationMessagePath_example",
              terminationMessagePolicy: "terminationMessagePolicy_example",
              tty: true,
              volumeDevices: [
                {
                  devicePath: "devicePath_example",
                  name: "name_example",
                },
              ],
              volumeMounts: [
                {
                  mountPath: "mountPath_example",
                  mountPropagation: "mountPropagation_example",
                  name: "name_example",
                  readOnly: true,
                  recursiveReadOnly: "recursiveReadOnly_example",
                  subPath: "subPath_example",
                  subPathExpr: "subPathExpr_example",
                },
              ],
              workingDir: "workingDir_example",
            },
          ],
          hostAliases: [
            {
              hostnames: [
                "hostnames_example",
              ],
              ip: "ip_example",
            },
          ],
          hostIPC: true,
          hostNetwork: true,
          hostPID: true,
          hostUsers: true,
          hostname: "hostname_example",
          hostnameOverride: "hostnameOverride_example",
          imagePullSecrets: [
            {
              name: "name_example",
            },
          ],
          initContainers: [
            {
              args: [
                "args_example",
              ],
              command: [
                "command_example",
              ],
              env: [
                {
                  name: "name_example",
                  value: "value_example",
                  valueFrom: {
                    configMapKeyRef: {
                      key: "key_example",
                      name: "name_example",
                      optional: true,
                    },
                    fieldRef: {
                      apiVersion: "apiVersion_example",
                      fieldPath: "fieldPath_example",
                    },
                    fileKeyRef: {
                      key: "key_example",
                      optional: true,
                      path: "path_example",
                      volumeName: "volumeName_example",
                    },
                    resourceFieldRef: {
                      containerName: "containerName_example",
                      divisor: "divisor_example",
                      resource: "resource_example",
                    },
                    secretKeyRef: {
                      key: "key_example",
                      name: "name_example",
                      optional: true,
                    },
                  },
                },
              ],
              envFrom: [
                {
                  configMapRef: {
                    name: "name_example",
                    optional: true,
                  },
                  prefix: "prefix_example",
                  secretRef: {
                    name: "name_example",
                    optional: true,
                  },
                },
              ],
              image: "image_example",
              imagePullPolicy: "imagePullPolicy_example",
              lifecycle: {
                postStart: {
                  exec: {
                    command: [
                      "command_example",
                    ],
                  },
                  httpGet: {
                    host: "host_example",
                    httpHeaders: [
                      {
                        name: "name_example",
                        value: "value_example",
                      },
                    ],
                    path: "path_example",
                    port: "port_example",
                    scheme: "scheme_example",
                  },
                  sleep: {
                    seconds: 1,
                  },
                  tcpSocket: {
                    host: "host_example",
                    port: "port_example",
                  },
                },
                preStop: {
                  exec: {
                    command: [
                      "command_example",
                    ],
                  },
                  httpGet: {
                    host: "host_example",
                    httpHeaders: [
                      {
                        name: "name_example",
                        value: "value_example",
                      },
                    ],
                    path: "path_example",
                    port: "port_example",
                    scheme: "scheme_example",
                  },
                  sleep: {
                    seconds: 1,
                  },
                  tcpSocket: {
                    host: "host_example",
                    port: "port_example",
                  },
                },
                stopSignal: "stopSignal_example",
              },
              livenessProbe: {
                exec: {
                  command: [
                    "command_example",
                  ],
                },
                failureThreshold: 1,
                grpc: {
                  port: 1,
                  service: "service_example",
                },
                httpGet: {
                  host: "host_example",
                  httpHeaders: [
                    {
                      name: "name_example",
                      value: "value_example",
                    },
                  ],
                  path: "path_example",
                  port: "port_example",
                  scheme: "scheme_example",
                },
                initialDelaySeconds: 1,
                periodSeconds: 1,
                successThreshold: 1,
                tcpSocket: {
                  host: "host_example",
                  port: "port_example",
                },
                terminationGracePeriodSeconds: 1,
                timeoutSeconds: 1,
              },
              name: "name_example",
              ports: [
                {
                  containerPort: 1,
                  hostIP: "hostIP_example",
                  hostPort: 1,
                  name: "name_example",
                  protocol: "protocol_example",
                },
              ],
              readinessProbe: {
                exec: {
                  command: [
                    "command_example",
                  ],
                },
                failureThreshold: 1,
                grpc: {
                  port: 1,
                  service: "service_example",
                },
                httpGet: {
                  host: "host_example",
                  httpHeaders: [
                    {
                      name: "name_example",
                      value: "value_example",
                    },
                  ],
                  path: "path_example",
                  port: "port_example",
                  scheme: "scheme_example",
                },
                initialDelaySeconds: 1,
                periodSeconds: 1,
                successThreshold: 1,
                tcpSocket: {
                  host: "host_example",
                  port: "port_example",
                },
                terminationGracePeriodSeconds: 1,
                timeoutSeconds: 1,
              },
              resizePolicy: [
                {
                  resourceName: "resourceName_example",
                  restartPolicy: "restartPolicy_example",
                },
              ],
              resources: {
                claims: [
                  {
                    name: "name_example",
                    request: "request_example",
                  },
                ],
                limits: {
                  "key": "key_example",
                },
                requests: {
                  "key": "key_example",
                },
              },
              restartPolicy: "restartPolicy_example",
              restartPolicyRules: [
                {
                  action: "action_example",
                  exitCodes: {
                    operator: "operator_example",
                    values: [
                      1,
                    ],
                  },
                },
              ],
              securityContext: {
                allowPrivilegeEscalation: true,
                appArmorProfile: {
                  localhostProfile: "localhostProfile_example",
                  type: "type_example",
                },
                capabilities: {
                  add: [
                    "add_example",
                  ],
                  drop: [
                    "drop_example",
                  ],
                },
                privileged: true,
                procMount: "procMount_example",
                readOnlyRootFilesystem: true,
                runAsGroup: 1,
                runAsNonRoot: true,
                runAsUser: 1,
                seLinuxOptions: {
                  level: "level_example",
                  role: "role_example",
                  type: "type_example",
                  user: "user_example",
                },
                seccompProfile: {
                  localhostProfile: "localhostProfile_example",
                  type: "type_example",
                },
                windowsOptions: {
                  gmsaCredentialSpec: "gmsaCredentialSpec_example",
                  gmsaCredentialSpecName: "gmsaCredentialSpecName_example",
                  hostProcess: true,
                  runAsUserName: "runAsUserName_example",
                },
              },
              startupProbe: {
                exec: {
                  command: [
                    "command_example",
                  ],
                },
                failureThreshold: 1,
                grpc: {
                  port: 1,
                  service: "service_example",
                },
                httpGet: {
                  host: "host_example",
                  httpHeaders: [
                    {
                      name: "name_example",
                      value: "value_example",
                    },
                  ],
                  path: "path_example",
                  port: "port_example",
                  scheme: "scheme_example",
                },
                initialDelaySeconds: 1,
                periodSeconds: 1,
                successThreshold: 1,
                tcpSocket: {
                  host: "host_example",
                  port: "port_example",
                },
                terminationGracePeriodSeconds: 1,
                timeoutSeconds: 1,
              },
              stdin: true,
              stdinOnce: true,
              terminationMessagePath: "terminationMessagePath_example",
              terminationMessagePolicy: "terminationMessagePolicy_example",
              tty: true,
              volumeDevices: [
                {
                  devicePath: "devicePath_example",
                  name: "name_example",
                },
              ],
              volumeMounts: [
                {
                  mountPath: "mountPath_example",
                  mountPropagation: "mountPropagation_example",
                  name: "name_example",
                  readOnly: true,
                  recursiveReadOnly: "recursiveReadOnly_example",
                  subPath: "subPath_example",
                  subPathExpr: "subPathExpr_example",
                },
              ],
              workingDir: "workingDir_example",
            },
          ],
          nodeName: "nodeName_example",
          nodeSelector: {
            "key": "key_example",
          },
          os: {
            name: "name_example",
          },
          overhead: {
            "key": "key_example",
          },
          preemptionPolicy: "preemptionPolicy_example",
          priority: 1,
          priorityClassName: "priorityClassName_example",
          readinessGates: [
            {
              conditionType: "conditionType_example",
            },
          ],
          resourceClaims: [
            {
              name: "name_example",
              resourceClaimName: "resourceClaimName_example",
              resourceClaimTemplateName: "resourceClaimTemplateName_example",
            },
          ],
          resources: {
            claims: [
              {
                name: "name_example",
                request: "request_example",
              },
            ],
            limits: {
              "key": "key_example",
            },
            requests: {
              "key": "key_example",
            },
          },
          restartPolicy: "restartPolicy_example",
          runtimeClassName: "runtimeClassName_example",
          schedulerName: "schedulerName_example",
          schedulingGates: [
            {
              name: "name_example",
            },
          ],
          securityContext: {
            appArmorProfile: {
              localhostProfile: "localhostProfile_example",
              type: "type_example",
            },
            fsGroup: 1,
            fsGroupChangePolicy: "fsGroupChangePolicy_example",
            runAsGroup: 1,
            runAsNonRoot: true,
            runAsUser: 1,
            seLinuxChangePolicy: "seLinuxChangePolicy_example",
            seLinuxOptions: {
              level: "level_example",
              role: "role_example",
              type: "type_example",
              user: "user_example",
            },
            seccompProfile: {
              localhostProfile: "localhostProfile_example",
              type: "type_example",
            },
            supplementalGroups: [
              1,
            ],
            supplementalGroupsPolicy: "supplementalGroupsPolicy_example",
            sysctls: [
              {
                name: "name_example",
                value: "value_example",
              },
            ],
            windowsOptions: {
              gmsaCredentialSpec: "gmsaCredentialSpec_example",
              gmsaCredentialSpecName: "gmsaCredentialSpecName_example",
              hostProcess: true,
              runAsUserName: "runAsUserName_example",
            },
          },
          serviceAccount: "serviceAccount_example",
          serviceAccountName: "serviceAccountName_example",
          setHostnameAsFQDN: true,
          shareProcessNamespace: true,
          subdomain: "subdomain_example",
          terminationGracePeriodSeconds: 1,
          tolerations: [
            {
              effect: "effect_example",
              key: "key_example",
              operator: "operator_example",
              tolerationSeconds: 1,
              value: "value_example",
            },
          ],
          topologySpreadConstraints: [
            {
              labelSelector: {
                matchExpressions: [
                  {
                    key: "key_example",
                    operator: "operator_example",
                    values: [
                      "values_example",
                    ],
                  },
                ],
                matchLabels: {
                  "key": "key_example",
                },
              },
              matchLabelKeys: [
                "matchLabelKeys_example",
              ],
              maxSkew: 1,
              minDomains: 1,
              nodeAffinityPolicy: "nodeAffinityPolicy_example",
              nodeTaintsPolicy: "nodeTaintsPolicy_example",
              topologyKey: "topologyKey_example",
              whenUnsatisfiable: "whenUnsatisfiable_example",
            },
          ],
          volumes: [
            {
              awsElasticBlockStore: {
                fsType: "fsType_example",
                partition: 1,
                readOnly: true,
                volumeID: "volumeID_example",
              },
              azureDisk: {
                cachingMode: "cachingMode_example",
                diskName: "diskName_example",
                diskURI: "diskURI_example",
                fsType: "fsType_example",
                kind: "kind_example",
                readOnly: true,
              },
              azureFile: {
                readOnly: true,
                secretName: "secretName_example",
                shareName: "shareName_example",
              },
              cephfs: {
                monitors: [
                  "monitors_example",
                ],
                path: "path_example",
                readOnly: true,
                secretFile: "secretFile_example",
                secretRef: {
                  name: "name_example",
                },
                user: "user_example",
              },
              cinder: {
                fsType: "fsType_example",
                readOnly: true,
                secretRef: {
                  name: "name_example",
                },
                volumeID: "volumeID_example",
              },
              configMap: {
                defaultMode: 1,
                items: [
                  {
                    key: "key_example",
                    mode: 1,
                    path: "path_example",
                  },
                ],
                name: "name_example",
                optional: true,
              },
              csi: {
                driver: "driver_example",
                fsType: "fsType_example",
                nodePublishSecretRef: {
                  name: "name_example",
                },
                readOnly: true,
                volumeAttributes: {
                  "key": "key_example",
                },
              },
              downwardAPI: {
                defaultMode: 1,
                items: [
                  {
                    fieldRef: {
                      apiVersion: "apiVersion_example",
                      fieldPath: "fieldPath_example",
                    },
                    mode: 1,
                    path: "path_example",
                    resourceFieldRef: {
                      containerName: "containerName_example",
                      divisor: "divisor_example",
                      resource: "resource_example",
                    },
                  },
                ],
              },
              emptyDir: {
                medium: "medium_example",
                sizeLimit: "sizeLimit_example",
              },
              ephemeral: {
                volumeClaimTemplate: {
                  metadata: {
                    annotations: {
                      "key": "key_example",
                    },
                    creationTimestamp: new Date('1970-01-01T00:00:00.00Z'),
                    deletionGracePeriodSeconds: 1,
                    deletionTimestamp: new Date('1970-01-01T00:00:00.00Z'),
                    finalizers: [
                      "finalizers_example",
                    ],
                    generateName: "generateName_example",
                    generation: 1,
                    labels: {
                      "key": "key_example",
                    },
                    managedFields: [
                      {
                        apiVersion: "apiVersion_example",
                        fieldsType: "fieldsType_example",
                        fieldsV1: {},
                        manager: "manager_example",
                        operation: "operation_example",
                        subresource: "subresource_example",
                        time: new Date('1970-01-01T00:00:00.00Z'),
                      },
                    ],
                    name: "name_example",
                    namespace: "namespace_example",
                    ownerReferences: [
                      {
                        apiVersion: "apiVersion_example",
                        blockOwnerDeletion: true,
                        controller: true,
                        kind: "kind_example",
                        name: "name_example",
                        uid: "uid_example",
                      },
                    ],
                    resourceVersion: "resourceVersion_example",
                    selfLink: "selfLink_example",
                    uid: "uid_example",
                  },
                  spec: {
                    accessModes: [
                      "accessModes_example",
                    ],
                    dataSource: {
                      apiGroup: "apiGroup_example",
                      kind: "kind_example",
                      name: "name_example",
                    },
                    dataSourceRef: {
                      apiGroup: "apiGroup_example",
                      kind: "kind_example",
                      name: "name_example",
                      namespace: "namespace_example",
                    },
                    resources: {
                      limits: {
                        "key": "key_example",
                      },
                      requests: {
                        "key": "key_example",
                      },
                    },
                    selector: {
                      matchExpressions: [
                        {
                          key: "key_example",
                          operator: "operator_example",
                          values: [
                            "values_example",
                          ],
                        },
                      ],
                      matchLabels: {
                        "key": "key_example",
                      },
                    },
                    storageClassName: "storageClassName_example",
                    volumeAttributesClassName: "volumeAttributesClassName_example",
                    volumeMode: "volumeMode_example",
                    volumeName: "volumeName_example",
                  },
                },
              },
              fc: {
                fsType: "fsType_example",
                lun: 1,
                readOnly: true,
                targetWWNs: [
                  "targetWWNs_example",
                ],
                wwids: [
                  "wwids_example",
                ],
              },
              flexVolume: {
                driver: "driver_example",
                fsType: "fsType_example",
                options: {
                  "key": "key_example",
                },
                readOnly: true,
                secretRef: {
                  name: "name_example",
                },
              },
              flocker: {
                datasetName: "datasetName_example",
                datasetUUID: "datasetUUID_example",
              },
              gcePersistentDisk: {
                fsType: "fsType_example",
                partition: 1,
                pdName: "pdName_example",
                readOnly: true,
              },
              gitRepo: {
                directory: "directory_example",
                repository: "repository_example",
                revision: "revision_example",
              },
              glusterfs: {
                endpoints: "endpoints_example",
                path: "path_example",
                readOnly: true,
              },
              hostPath: {
                path: "path_example",
                type: "type_example",
              },
              image: {
                pullPolicy: "pullPolicy_example",
                reference: "reference_example",
              },
              iscsi: {
                chapAuthDiscovery: true,
                chapAuthSession: true,
                fsType: "fsType_example",
                initiatorName: "initiatorName_example",
                iqn: "iqn_example",
                iscsiInterface: "iscsiInterface_example",
                lun: 1,
                portals: [
                  "portals_example",
                ],
                readOnly: true,
                secretRef: {
                  name: "name_example",
                },
                targetPortal: "targetPortal_example",
              },
              name: "name_example",
              nfs: {
                path: "path_example",
                readOnly: true,
                server: "server_example",
              },
              persistentVolumeClaim: {
                claimName: "claimName_example",
                readOnly: true,
              },
              photonPersistentDisk: {
                fsType: "fsType_example",
                pdID: "pdID_example",
              },
              portworxVolume: {
                fsType: "fsType_example",
                readOnly: true,
                volumeID: "volumeID_example",
              },
              projected: {
                defaultMode: 1,
                sources: [
                  {
                    clusterTrustBundle: {
                      labelSelector: {
                        matchExpressions: [
                          {
                            key: "key_example",
                            operator: "operator_example",
                            values: [
                              "values_example",
                            ],
                          },
                        ],
                        matchLabels: {
                          "key": "key_example",
                        },
                      },
                      name: "name_example",
                      optional: true,
                      path: "path_example",
                      signerName: "signerName_example",
                    },
                    configMap: {
                      items: [
                        {
                          key: "key_example",
                          mode: 1,
                          path: "path_example",
                        },
                      ],
                      name: "name_example",
                      optional: true,
                    },
                    downwardAPI: {
                      items: [
                        {
                          fieldRef: {
                            apiVersion: "apiVersion_example",
                            fieldPath: "fieldPath_example",
                          },
                          mode: 1,
                          path: "path_example",
                          resourceFieldRef: {
                            containerName: "containerName_example",
                            divisor: "divisor_example",
                            resource: "resource_example",
                          },
                        },
                      ],
                    },
                    podCertificate: {
                      certificateChainPath: "certificateChainPath_example",
                      credentialBundlePath: "credentialBundlePath_example",
                      keyPath: "keyPath_example",
                      keyType: "keyType_example",
                      maxExpirationSeconds: 1,
                      signerName: "signerName_example",
                    },
                    secret: {
                      items: [
                        {
                          key: "key_example",
                          mode: 1,
                          path: "path_example",
                        },
                      ],
                      name: "name_example",
                      optional: true,
                    },
                    serviceAccountToken: {
                      audience: "audience_example",
                      expirationSeconds: 1,
                      path: "path_example",
                    },
                  },
                ],
              },
              quobyte: {
                group: "group_example",
                readOnly: true,
                registry: "registry_example",
                tenant: "tenant_example",
                user: "user_example",
                volume: "volume_example",
              },
              rbd: {
                fsType: "fsType_example",
                image: "image_example",
                keyring: "keyring_example",
                monitors: [
                  "monitors_example",
                ],
                pool: "pool_example",
                readOnly: true,
                secretRef: {
                  name: "name_example",
                },
                user: "user_example",
              },
              scaleIO: {
                fsType: "fsType_example",
                gateway: "gateway_example",
                protectionDomain: "protectionDomain_example",
                readOnly: true,
                secretRef: {
                  name: "name_example",
                },
                sslEnabled: true,
                storageMode: "storageMode_example",
                storagePool: "storagePool_example",
                system: "system_example",
                volumeName: "volumeName_example",
              },
              secret: {
                defaultMode: 1,
                items: [
                  {
                    key: "key_example",
                    mode: 1,
                    path: "path_example",
                  },
                ],
                optional: true,
                secretName: "secretName_example",
              },
              storageos: {
                fsType: "fsType_example",
                readOnly: true,
                secretRef: {
                  name: "name_example",
                },
                volumeName: "volumeName_example",
                volumeNamespace: "volumeNamespace_example",
              },
              vsphereVolume: {
                fsType: "fsType_example",
                storagePolicyID: "storagePolicyID_example",
                storagePolicyName: "storagePolicyName_example",
                volumePath: "volumePath_example",
              },
            },
          ],
        },
      },
      ttlSecondsAfterFinished: 1,
    },
    status: {
      active: 1,
      completedIndexes: "completedIndexes_example",
      completionTime: new Date('1970-01-01T00:00:00.00Z'),
      conditions: [
        {
          lastProbeTime: new Date('1970-01-01T00:00:00.00Z'),
          lastTransitionTime: new Date('1970-01-01T00:00:00.00Z'),
          message: "message_example",
          reason: "reason_example",
          status: "status_example",
          type: "type_example",
        },
      ],
      failed: 1,
      failedIndexes: "failedIndexes_example",
      ready: 1,
      startTime: new Date('1970-01-01T00:00:00.00Z'),
      succeeded: 1,
      terminating: 1,
      uncountedTerminatedPods: {
        failed: [
          "failed_example",
        ],
        succeeded: [
          "succeeded_example",
        ],
      },
    },
  },
    // If \'true\', then the output is pretty printed. Defaults to \'false\' unless the user-agent indicates a browser or command-line HTTP tool (curl and wget). (optional)
  pretty: "pretty_example",
    // When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed (optional)
  dryRun: "dryRun_example",
    // fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. (optional)
  fieldManager: "fieldManager_example",
    // fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. (optional)
  fieldValidation: "fieldValidation_example",
};

const data = await apiInstance.createNamespacedJob(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **V1Job**|  |
 **namespace** | [**string**] | object name and auth scope, such as for teams and projects | defaults to undefined
 **pretty** | [**string**] | If \&#39;true\&#39;, then the output is pretty printed. Defaults to \&#39;false\&#39; unless the user-agent indicates a browser or command-line HTTP tool (curl and wget). | (optional) defaults to undefined
 **dryRun** | [**string**] | When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed | (optional) defaults to undefined
 **fieldManager** | [**string**] | fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. | (optional) defaults to undefined
 **fieldValidation** | [**string**] | fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. | (optional) defaults to undefined


### Return type

**V1Job**

### Authorization

[BearerToken](README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf, application/cbor


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**201** | Created |  -  |
**202** | Accepted |  -  |
**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **deleteCollectionNamespacedCronJob**
> V1Status deleteCollectionNamespacedCronJob()

delete collection of CronJob

### Example


```typescript
import { createConfiguration, BatchV1Api } from '';
import type { BatchV1ApiDeleteCollectionNamespacedCronJobRequest } from '';

const configuration = createConfiguration();
const apiInstance = new BatchV1Api(configuration);

const request: BatchV1ApiDeleteCollectionNamespacedCronJobRequest = {
    // object name and auth scope, such as for teams and projects
  namespace: "namespace_example",
    // If \'true\', then the output is pretty printed. Defaults to \'false\' unless the user-agent indicates a browser or command-line HTTP tool (curl and wget). (optional)
  pretty: "pretty_example",
    // The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \"next key\".  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications. (optional)
  _continue: "continue_example",
    // When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed (optional)
  dryRun: "dryRun_example",
    // A selector to restrict the list of returned objects by their fields. Defaults to everything. (optional)
  fieldSelector: "fieldSelector_example",
    // The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately. (optional)
  gracePeriodSeconds: 1,
    // if set to true, it will trigger an unsafe deletion of the resource in case the normal deletion flow fails with a corrupt object error. A resource is considered corrupt if it can not be retrieved from the underlying storage successfully because of a) its data can not be transformed e.g. decryption failure, or b) it fails to decode into an object. NOTE: unsafe deletion ignores finalizer constraints, skips precondition checks, and removes the object from the storage. WARNING: This may potentially break the cluster if the workload associated with the resource being unsafe-deleted relies on normal deletion flow. Use only if you REALLY know what you are doing. The default value is false, and the user must opt in to enable it (optional)
  ignoreStoreReadErrorWithClusterBreakingPotential: true,
    // A selector to restrict the list of returned objects by their labels. Defaults to everything. (optional)
  labelSelector: "labelSelector_example",
    // limit is a maximum number of responses to return for a list call. If more items exist, the server will set the `continue` field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned. (optional)
  limit: 1,
    // Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \"orphan\" finalizer will be added to/removed from the object\'s finalizers list. Either this field or PropagationPolicy may be set, but not both. (optional)
  orphanDependents: true,
    // Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: \'Orphan\' - orphan the dependents; \'Background\' - allow the garbage collector to delete the dependents in the background; \'Foreground\' - a cascading policy that deletes all dependents in the foreground. (optional)
  propagationPolicy: "propagationPolicy_example",
    // resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset (optional)
  resourceVersion: "resourceVersion_example",
    // resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset (optional)
  resourceVersionMatch: "resourceVersionMatch_example",
    // `sendInitialEvents=true` may be set together with `watch=true`. In that case, the watch stream will begin with synthetic events to produce the current state of objects in the collection. Once all such events have been sent, a synthetic \"Bookmark\" event  will be sent. The bookmark will report the ResourceVersion (RV) corresponding to the set of objects, and be marked with `\"k8s.io/initial-events-end\": \"true\"` annotation. Afterwards, the watch stream will proceed as usual, sending watch events corresponding to changes (subsequent to the RV) to objects watched.  When `sendInitialEvents` option is set, we require `resourceVersionMatch` option to also be set. The semantic of the watch request is as following: - `resourceVersionMatch` = NotOlderThan   is interpreted as \"data at least as new as the provided `resourceVersion`\"   and the bookmark event is send when the state is synced   to a `resourceVersion` at least as fresh as the one provided by the ListOptions.   If `resourceVersion` is unset, this is interpreted as \"consistent read\" and the   bookmark event is send when the state is synced at least to the moment   when request started being processed. - `resourceVersionMatch` set to any other value or unset   Invalid error is returned.  Defaults to true if `resourceVersion=\"\"` or `resourceVersion=\"0\"` (for backward compatibility reasons) and to false otherwise. (optional)
  sendInitialEvents: true,
    // Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity. (optional)
  timeoutSeconds: 1,
  
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

const data = await apiInstance.deleteCollectionNamespacedCronJob(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **V1DeleteOptions**|  |
 **namespace** | [**string**] | object name and auth scope, such as for teams and projects | defaults to undefined
 **pretty** | [**string**] | If \&#39;true\&#39;, then the output is pretty printed. Defaults to \&#39;false\&#39; unless the user-agent indicates a browser or command-line HTTP tool (curl and wget). | (optional) defaults to undefined
 **_continue** | [**string**] | The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications. | (optional) defaults to undefined
 **dryRun** | [**string**] | When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed | (optional) defaults to undefined
 **fieldSelector** | [**string**] | A selector to restrict the list of returned objects by their fields. Defaults to everything. | (optional) defaults to undefined
 **gracePeriodSeconds** | [**number**] | The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately. | (optional) defaults to undefined
 **ignoreStoreReadErrorWithClusterBreakingPotential** | [**boolean**] | if set to true, it will trigger an unsafe deletion of the resource in case the normal deletion flow fails with a corrupt object error. A resource is considered corrupt if it can not be retrieved from the underlying storage successfully because of a) its data can not be transformed e.g. decryption failure, or b) it fails to decode into an object. NOTE: unsafe deletion ignores finalizer constraints, skips precondition checks, and removes the object from the storage. WARNING: This may potentially break the cluster if the workload associated with the resource being unsafe-deleted relies on normal deletion flow. Use only if you REALLY know what you are doing. The default value is false, and the user must opt in to enable it | (optional) defaults to undefined
 **labelSelector** | [**string**] | A selector to restrict the list of returned objects by their labels. Defaults to everything. | (optional) defaults to undefined
 **limit** | [**number**] | limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned. | (optional) defaults to undefined
 **orphanDependents** | [**boolean**] | Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object\&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both. | (optional) defaults to undefined
 **propagationPolicy** | [**string**] | Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: \&#39;Orphan\&#39; - orphan the dependents; \&#39;Background\&#39; - allow the garbage collector to delete the dependents in the background; \&#39;Foreground\&#39; - a cascading policy that deletes all dependents in the foreground. | (optional) defaults to undefined
 **resourceVersion** | [**string**] | resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset | (optional) defaults to undefined
 **resourceVersionMatch** | [**string**] | resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset | (optional) defaults to undefined
 **sendInitialEvents** | [**boolean**] | &#x60;sendInitialEvents&#x3D;true&#x60; may be set together with &#x60;watch&#x3D;true&#x60;. In that case, the watch stream will begin with synthetic events to produce the current state of objects in the collection. Once all such events have been sent, a synthetic \&quot;Bookmark\&quot; event  will be sent. The bookmark will report the ResourceVersion (RV) corresponding to the set of objects, and be marked with &#x60;\&quot;k8s.io/initial-events-end\&quot;: \&quot;true\&quot;&#x60; annotation. Afterwards, the watch stream will proceed as usual, sending watch events corresponding to changes (subsequent to the RV) to objects watched.  When &#x60;sendInitialEvents&#x60; option is set, we require &#x60;resourceVersionMatch&#x60; option to also be set. The semantic of the watch request is as following: - &#x60;resourceVersionMatch&#x60; &#x3D; NotOlderThan   is interpreted as \&quot;data at least as new as the provided &#x60;resourceVersion&#x60;\&quot;   and the bookmark event is send when the state is synced   to a &#x60;resourceVersion&#x60; at least as fresh as the one provided by the ListOptions.   If &#x60;resourceVersion&#x60; is unset, this is interpreted as \&quot;consistent read\&quot; and the   bookmark event is send when the state is synced at least to the moment   when request started being processed. - &#x60;resourceVersionMatch&#x60; set to any other value or unset   Invalid error is returned.  Defaults to true if &#x60;resourceVersion&#x3D;\&quot;\&quot;&#x60; or &#x60;resourceVersion&#x3D;\&quot;0\&quot;&#x60; (for backward compatibility reasons) and to false otherwise. | (optional) defaults to undefined
 **timeoutSeconds** | [**number**] | Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity. | (optional) defaults to undefined


### Return type

**V1Status**

### Authorization

[BearerToken](README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf, application/cbor


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **deleteCollectionNamespacedJob**
> V1Status deleteCollectionNamespacedJob()

delete collection of Job

### Example


```typescript
import { createConfiguration, BatchV1Api } from '';
import type { BatchV1ApiDeleteCollectionNamespacedJobRequest } from '';

const configuration = createConfiguration();
const apiInstance = new BatchV1Api(configuration);

const request: BatchV1ApiDeleteCollectionNamespacedJobRequest = {
    // object name and auth scope, such as for teams and projects
  namespace: "namespace_example",
    // If \'true\', then the output is pretty printed. Defaults to \'false\' unless the user-agent indicates a browser or command-line HTTP tool (curl and wget). (optional)
  pretty: "pretty_example",
    // The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \"next key\".  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications. (optional)
  _continue: "continue_example",
    // When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed (optional)
  dryRun: "dryRun_example",
    // A selector to restrict the list of returned objects by their fields. Defaults to everything. (optional)
  fieldSelector: "fieldSelector_example",
    // The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately. (optional)
  gracePeriodSeconds: 1,
    // if set to true, it will trigger an unsafe deletion of the resource in case the normal deletion flow fails with a corrupt object error. A resource is considered corrupt if it can not be retrieved from the underlying storage successfully because of a) its data can not be transformed e.g. decryption failure, or b) it fails to decode into an object. NOTE: unsafe deletion ignores finalizer constraints, skips precondition checks, and removes the object from the storage. WARNING: This may potentially break the cluster if the workload associated with the resource being unsafe-deleted relies on normal deletion flow. Use only if you REALLY know what you are doing. The default value is false, and the user must opt in to enable it (optional)
  ignoreStoreReadErrorWithClusterBreakingPotential: true,
    // A selector to restrict the list of returned objects by their labels. Defaults to everything. (optional)
  labelSelector: "labelSelector_example",
    // limit is a maximum number of responses to return for a list call. If more items exist, the server will set the `continue` field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned. (optional)
  limit: 1,
    // Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \"orphan\" finalizer will be added to/removed from the object\'s finalizers list. Either this field or PropagationPolicy may be set, but not both. (optional)
  orphanDependents: true,
    // Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: \'Orphan\' - orphan the dependents; \'Background\' - allow the garbage collector to delete the dependents in the background; \'Foreground\' - a cascading policy that deletes all dependents in the foreground. (optional)
  propagationPolicy: "propagationPolicy_example",
    // resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset (optional)
  resourceVersion: "resourceVersion_example",
    // resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset (optional)
  resourceVersionMatch: "resourceVersionMatch_example",
    // `sendInitialEvents=true` may be set together with `watch=true`. In that case, the watch stream will begin with synthetic events to produce the current state of objects in the collection. Once all such events have been sent, a synthetic \"Bookmark\" event  will be sent. The bookmark will report the ResourceVersion (RV) corresponding to the set of objects, and be marked with `\"k8s.io/initial-events-end\": \"true\"` annotation. Afterwards, the watch stream will proceed as usual, sending watch events corresponding to changes (subsequent to the RV) to objects watched.  When `sendInitialEvents` option is set, we require `resourceVersionMatch` option to also be set. The semantic of the watch request is as following: - `resourceVersionMatch` = NotOlderThan   is interpreted as \"data at least as new as the provided `resourceVersion`\"   and the bookmark event is send when the state is synced   to a `resourceVersion` at least as fresh as the one provided by the ListOptions.   If `resourceVersion` is unset, this is interpreted as \"consistent read\" and the   bookmark event is send when the state is synced at least to the moment   when request started being processed. - `resourceVersionMatch` set to any other value or unset   Invalid error is returned.  Defaults to true if `resourceVersion=\"\"` or `resourceVersion=\"0\"` (for backward compatibility reasons) and to false otherwise. (optional)
  sendInitialEvents: true,
    // Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity. (optional)
  timeoutSeconds: 1,
  
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

const data = await apiInstance.deleteCollectionNamespacedJob(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **V1DeleteOptions**|  |
 **namespace** | [**string**] | object name and auth scope, such as for teams and projects | defaults to undefined
 **pretty** | [**string**] | If \&#39;true\&#39;, then the output is pretty printed. Defaults to \&#39;false\&#39; unless the user-agent indicates a browser or command-line HTTP tool (curl and wget). | (optional) defaults to undefined
 **_continue** | [**string**] | The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications. | (optional) defaults to undefined
 **dryRun** | [**string**] | When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed | (optional) defaults to undefined
 **fieldSelector** | [**string**] | A selector to restrict the list of returned objects by their fields. Defaults to everything. | (optional) defaults to undefined
 **gracePeriodSeconds** | [**number**] | The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately. | (optional) defaults to undefined
 **ignoreStoreReadErrorWithClusterBreakingPotential** | [**boolean**] | if set to true, it will trigger an unsafe deletion of the resource in case the normal deletion flow fails with a corrupt object error. A resource is considered corrupt if it can not be retrieved from the underlying storage successfully because of a) its data can not be transformed e.g. decryption failure, or b) it fails to decode into an object. NOTE: unsafe deletion ignores finalizer constraints, skips precondition checks, and removes the object from the storage. WARNING: This may potentially break the cluster if the workload associated with the resource being unsafe-deleted relies on normal deletion flow. Use only if you REALLY know what you are doing. The default value is false, and the user must opt in to enable it | (optional) defaults to undefined
 **labelSelector** | [**string**] | A selector to restrict the list of returned objects by their labels. Defaults to everything. | (optional) defaults to undefined
 **limit** | [**number**] | limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned. | (optional) defaults to undefined
 **orphanDependents** | [**boolean**] | Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object\&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both. | (optional) defaults to undefined
 **propagationPolicy** | [**string**] | Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: \&#39;Orphan\&#39; - orphan the dependents; \&#39;Background\&#39; - allow the garbage collector to delete the dependents in the background; \&#39;Foreground\&#39; - a cascading policy that deletes all dependents in the foreground. | (optional) defaults to undefined
 **resourceVersion** | [**string**] | resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset | (optional) defaults to undefined
 **resourceVersionMatch** | [**string**] | resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset | (optional) defaults to undefined
 **sendInitialEvents** | [**boolean**] | &#x60;sendInitialEvents&#x3D;true&#x60; may be set together with &#x60;watch&#x3D;true&#x60;. In that case, the watch stream will begin with synthetic events to produce the current state of objects in the collection. Once all such events have been sent, a synthetic \&quot;Bookmark\&quot; event  will be sent. The bookmark will report the ResourceVersion (RV) corresponding to the set of objects, and be marked with &#x60;\&quot;k8s.io/initial-events-end\&quot;: \&quot;true\&quot;&#x60; annotation. Afterwards, the watch stream will proceed as usual, sending watch events corresponding to changes (subsequent to the RV) to objects watched.  When &#x60;sendInitialEvents&#x60; option is set, we require &#x60;resourceVersionMatch&#x60; option to also be set. The semantic of the watch request is as following: - &#x60;resourceVersionMatch&#x60; &#x3D; NotOlderThan   is interpreted as \&quot;data at least as new as the provided &#x60;resourceVersion&#x60;\&quot;   and the bookmark event is send when the state is synced   to a &#x60;resourceVersion&#x60; at least as fresh as the one provided by the ListOptions.   If &#x60;resourceVersion&#x60; is unset, this is interpreted as \&quot;consistent read\&quot; and the   bookmark event is send when the state is synced at least to the moment   when request started being processed. - &#x60;resourceVersionMatch&#x60; set to any other value or unset   Invalid error is returned.  Defaults to true if &#x60;resourceVersion&#x3D;\&quot;\&quot;&#x60; or &#x60;resourceVersion&#x3D;\&quot;0\&quot;&#x60; (for backward compatibility reasons) and to false otherwise. | (optional) defaults to undefined
 **timeoutSeconds** | [**number**] | Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity. | (optional) defaults to undefined


### Return type

**V1Status**

### Authorization

[BearerToken](README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf, application/cbor


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **deleteNamespacedCronJob**
> V1Status deleteNamespacedCronJob()

delete a CronJob

### Example


```typescript
import { createConfiguration, BatchV1Api } from '';
import type { BatchV1ApiDeleteNamespacedCronJobRequest } from '';

const configuration = createConfiguration();
const apiInstance = new BatchV1Api(configuration);

const request: BatchV1ApiDeleteNamespacedCronJobRequest = {
    // name of the CronJob
  name: "name_example",
    // object name and auth scope, such as for teams and projects
  namespace: "namespace_example",
    // If \'true\', then the output is pretty printed. Defaults to \'false\' unless the user-agent indicates a browser or command-line HTTP tool (curl and wget). (optional)
  pretty: "pretty_example",
    // When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed (optional)
  dryRun: "dryRun_example",
    // The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately. (optional)
  gracePeriodSeconds: 1,
    // if set to true, it will trigger an unsafe deletion of the resource in case the normal deletion flow fails with a corrupt object error. A resource is considered corrupt if it can not be retrieved from the underlying storage successfully because of a) its data can not be transformed e.g. decryption failure, or b) it fails to decode into an object. NOTE: unsafe deletion ignores finalizer constraints, skips precondition checks, and removes the object from the storage. WARNING: This may potentially break the cluster if the workload associated with the resource being unsafe-deleted relies on normal deletion flow. Use only if you REALLY know what you are doing. The default value is false, and the user must opt in to enable it (optional)
  ignoreStoreReadErrorWithClusterBreakingPotential: true,
    // Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \"orphan\" finalizer will be added to/removed from the object\'s finalizers list. Either this field or PropagationPolicy may be set, but not both. (optional)
  orphanDependents: true,
    // Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: \'Orphan\' - orphan the dependents; \'Background\' - allow the garbage collector to delete the dependents in the background; \'Foreground\' - a cascading policy that deletes all dependents in the foreground. (optional)
  propagationPolicy: "propagationPolicy_example",
  
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

const data = await apiInstance.deleteNamespacedCronJob(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **V1DeleteOptions**|  |
 **name** | [**string**] | name of the CronJob | defaults to undefined
 **namespace** | [**string**] | object name and auth scope, such as for teams and projects | defaults to undefined
 **pretty** | [**string**] | If \&#39;true\&#39;, then the output is pretty printed. Defaults to \&#39;false\&#39; unless the user-agent indicates a browser or command-line HTTP tool (curl and wget). | (optional) defaults to undefined
 **dryRun** | [**string**] | When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed | (optional) defaults to undefined
 **gracePeriodSeconds** | [**number**] | The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately. | (optional) defaults to undefined
 **ignoreStoreReadErrorWithClusterBreakingPotential** | [**boolean**] | if set to true, it will trigger an unsafe deletion of the resource in case the normal deletion flow fails with a corrupt object error. A resource is considered corrupt if it can not be retrieved from the underlying storage successfully because of a) its data can not be transformed e.g. decryption failure, or b) it fails to decode into an object. NOTE: unsafe deletion ignores finalizer constraints, skips precondition checks, and removes the object from the storage. WARNING: This may potentially break the cluster if the workload associated with the resource being unsafe-deleted relies on normal deletion flow. Use only if you REALLY know what you are doing. The default value is false, and the user must opt in to enable it | (optional) defaults to undefined
 **orphanDependents** | [**boolean**] | Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object\&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both. | (optional) defaults to undefined
 **propagationPolicy** | [**string**] | Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: \&#39;Orphan\&#39; - orphan the dependents; \&#39;Background\&#39; - allow the garbage collector to delete the dependents in the background; \&#39;Foreground\&#39; - a cascading policy that deletes all dependents in the foreground. | (optional) defaults to undefined


### Return type

**V1Status**

### Authorization

[BearerToken](README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf, application/cbor


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**202** | Accepted |  -  |
**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **deleteNamespacedJob**
> V1Status deleteNamespacedJob()

delete a Job

### Example


```typescript
import { createConfiguration, BatchV1Api } from '';
import type { BatchV1ApiDeleteNamespacedJobRequest } from '';

const configuration = createConfiguration();
const apiInstance = new BatchV1Api(configuration);

const request: BatchV1ApiDeleteNamespacedJobRequest = {
    // name of the Job
  name: "name_example",
    // object name and auth scope, such as for teams and projects
  namespace: "namespace_example",
    // If \'true\', then the output is pretty printed. Defaults to \'false\' unless the user-agent indicates a browser or command-line HTTP tool (curl and wget). (optional)
  pretty: "pretty_example",
    // When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed (optional)
  dryRun: "dryRun_example",
    // The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately. (optional)
  gracePeriodSeconds: 1,
    // if set to true, it will trigger an unsafe deletion of the resource in case the normal deletion flow fails with a corrupt object error. A resource is considered corrupt if it can not be retrieved from the underlying storage successfully because of a) its data can not be transformed e.g. decryption failure, or b) it fails to decode into an object. NOTE: unsafe deletion ignores finalizer constraints, skips precondition checks, and removes the object from the storage. WARNING: This may potentially break the cluster if the workload associated with the resource being unsafe-deleted relies on normal deletion flow. Use only if you REALLY know what you are doing. The default value is false, and the user must opt in to enable it (optional)
  ignoreStoreReadErrorWithClusterBreakingPotential: true,
    // Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \"orphan\" finalizer will be added to/removed from the object\'s finalizers list. Either this field or PropagationPolicy may be set, but not both. (optional)
  orphanDependents: true,
    // Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: \'Orphan\' - orphan the dependents; \'Background\' - allow the garbage collector to delete the dependents in the background; \'Foreground\' - a cascading policy that deletes all dependents in the foreground. (optional)
  propagationPolicy: "propagationPolicy_example",
  
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

const data = await apiInstance.deleteNamespacedJob(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **V1DeleteOptions**|  |
 **name** | [**string**] | name of the Job | defaults to undefined
 **namespace** | [**string**] | object name and auth scope, such as for teams and projects | defaults to undefined
 **pretty** | [**string**] | If \&#39;true\&#39;, then the output is pretty printed. Defaults to \&#39;false\&#39; unless the user-agent indicates a browser or command-line HTTP tool (curl and wget). | (optional) defaults to undefined
 **dryRun** | [**string**] | When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed | (optional) defaults to undefined
 **gracePeriodSeconds** | [**number**] | The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately. | (optional) defaults to undefined
 **ignoreStoreReadErrorWithClusterBreakingPotential** | [**boolean**] | if set to true, it will trigger an unsafe deletion of the resource in case the normal deletion flow fails with a corrupt object error. A resource is considered corrupt if it can not be retrieved from the underlying storage successfully because of a) its data can not be transformed e.g. decryption failure, or b) it fails to decode into an object. NOTE: unsafe deletion ignores finalizer constraints, skips precondition checks, and removes the object from the storage. WARNING: This may potentially break the cluster if the workload associated with the resource being unsafe-deleted relies on normal deletion flow. Use only if you REALLY know what you are doing. The default value is false, and the user must opt in to enable it | (optional) defaults to undefined
 **orphanDependents** | [**boolean**] | Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object\&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both. | (optional) defaults to undefined
 **propagationPolicy** | [**string**] | Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: \&#39;Orphan\&#39; - orphan the dependents; \&#39;Background\&#39; - allow the garbage collector to delete the dependents in the background; \&#39;Foreground\&#39; - a cascading policy that deletes all dependents in the foreground. | (optional) defaults to undefined


### Return type

**V1Status**

### Authorization

[BearerToken](README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf, application/cbor


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**202** | Accepted |  -  |
**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getAPIResources**
> V1APIResourceList getAPIResources()

get available resources

### Example


```typescript
import { createConfiguration, BatchV1Api } from '';

const configuration = createConfiguration();
const apiInstance = new BatchV1Api(configuration);

const request = {};

const data = await apiInstance.getAPIResources(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**V1APIResourceList**

### Authorization

[BearerToken](README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf, application/cbor


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **listCronJobForAllNamespaces**
> V1CronJobList listCronJobForAllNamespaces()

list or watch objects of kind CronJob

### Example


```typescript
import { createConfiguration, BatchV1Api } from '';
import type { BatchV1ApiListCronJobForAllNamespacesRequest } from '';

const configuration = createConfiguration();
const apiInstance = new BatchV1Api(configuration);

const request: BatchV1ApiListCronJobForAllNamespacesRequest = {
    // allowWatchBookmarks requests watch events with type \"BOOKMARK\". Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server\'s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored. (optional)
  allowWatchBookmarks: true,
    // The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \"next key\".  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications. (optional)
  _continue: "continue_example",
    // A selector to restrict the list of returned objects by their fields. Defaults to everything. (optional)
  fieldSelector: "fieldSelector_example",
    // A selector to restrict the list of returned objects by their labels. Defaults to everything. (optional)
  labelSelector: "labelSelector_example",
    // limit is a maximum number of responses to return for a list call. If more items exist, the server will set the `continue` field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned. (optional)
  limit: 1,
    // If \'true\', then the output is pretty printed. Defaults to \'false\' unless the user-agent indicates a browser or command-line HTTP tool (curl and wget). (optional)
  pretty: "pretty_example",
    // resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset (optional)
  resourceVersion: "resourceVersion_example",
    // resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset (optional)
  resourceVersionMatch: "resourceVersionMatch_example",
    // `sendInitialEvents=true` may be set together with `watch=true`. In that case, the watch stream will begin with synthetic events to produce the current state of objects in the collection. Once all such events have been sent, a synthetic \"Bookmark\" event  will be sent. The bookmark will report the ResourceVersion (RV) corresponding to the set of objects, and be marked with `\"k8s.io/initial-events-end\": \"true\"` annotation. Afterwards, the watch stream will proceed as usual, sending watch events corresponding to changes (subsequent to the RV) to objects watched.  When `sendInitialEvents` option is set, we require `resourceVersionMatch` option to also be set. The semantic of the watch request is as following: - `resourceVersionMatch` = NotOlderThan   is interpreted as \"data at least as new as the provided `resourceVersion`\"   and the bookmark event is send when the state is synced   to a `resourceVersion` at least as fresh as the one provided by the ListOptions.   If `resourceVersion` is unset, this is interpreted as \"consistent read\" and the   bookmark event is send when the state is synced at least to the moment   when request started being processed. - `resourceVersionMatch` set to any other value or unset   Invalid error is returned.  Defaults to true if `resourceVersion=\"\"` or `resourceVersion=\"0\"` (for backward compatibility reasons) and to false otherwise. (optional)
  sendInitialEvents: true,
    // Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity. (optional)
  timeoutSeconds: 1,
    // Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion. (optional)
  watch: true,
};

const data = await apiInstance.listCronJobForAllNamespaces(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **allowWatchBookmarks** | [**boolean**] | allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server\&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored. | (optional) defaults to undefined
 **_continue** | [**string**] | The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications. | (optional) defaults to undefined
 **fieldSelector** | [**string**] | A selector to restrict the list of returned objects by their fields. Defaults to everything. | (optional) defaults to undefined
 **labelSelector** | [**string**] | A selector to restrict the list of returned objects by their labels. Defaults to everything. | (optional) defaults to undefined
 **limit** | [**number**] | limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned. | (optional) defaults to undefined
 **pretty** | [**string**] | If \&#39;true\&#39;, then the output is pretty printed. Defaults to \&#39;false\&#39; unless the user-agent indicates a browser or command-line HTTP tool (curl and wget). | (optional) defaults to undefined
 **resourceVersion** | [**string**] | resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset | (optional) defaults to undefined
 **resourceVersionMatch** | [**string**] | resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset | (optional) defaults to undefined
 **sendInitialEvents** | [**boolean**] | &#x60;sendInitialEvents&#x3D;true&#x60; may be set together with &#x60;watch&#x3D;true&#x60;. In that case, the watch stream will begin with synthetic events to produce the current state of objects in the collection. Once all such events have been sent, a synthetic \&quot;Bookmark\&quot; event  will be sent. The bookmark will report the ResourceVersion (RV) corresponding to the set of objects, and be marked with &#x60;\&quot;k8s.io/initial-events-end\&quot;: \&quot;true\&quot;&#x60; annotation. Afterwards, the watch stream will proceed as usual, sending watch events corresponding to changes (subsequent to the RV) to objects watched.  When &#x60;sendInitialEvents&#x60; option is set, we require &#x60;resourceVersionMatch&#x60; option to also be set. The semantic of the watch request is as following: - &#x60;resourceVersionMatch&#x60; &#x3D; NotOlderThan   is interpreted as \&quot;data at least as new as the provided &#x60;resourceVersion&#x60;\&quot;   and the bookmark event is send when the state is synced   to a &#x60;resourceVersion&#x60; at least as fresh as the one provided by the ListOptions.   If &#x60;resourceVersion&#x60; is unset, this is interpreted as \&quot;consistent read\&quot; and the   bookmark event is send when the state is synced at least to the moment   when request started being processed. - &#x60;resourceVersionMatch&#x60; set to any other value or unset   Invalid error is returned.  Defaults to true if &#x60;resourceVersion&#x3D;\&quot;\&quot;&#x60; or &#x60;resourceVersion&#x3D;\&quot;0\&quot;&#x60; (for backward compatibility reasons) and to false otherwise. | (optional) defaults to undefined
 **timeoutSeconds** | [**number**] | Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity. | (optional) defaults to undefined
 **watch** | [**boolean**] | Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion. | (optional) defaults to undefined


### Return type

**V1CronJobList**

### Authorization

[BearerToken](README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf, application/cbor, application/json;stream=watch, application/vnd.kubernetes.protobuf;stream=watch, application/cbor-seq


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **listJobForAllNamespaces**
> V1JobList listJobForAllNamespaces()

list or watch objects of kind Job

### Example


```typescript
import { createConfiguration, BatchV1Api } from '';
import type { BatchV1ApiListJobForAllNamespacesRequest } from '';

const configuration = createConfiguration();
const apiInstance = new BatchV1Api(configuration);

const request: BatchV1ApiListJobForAllNamespacesRequest = {
    // allowWatchBookmarks requests watch events with type \"BOOKMARK\". Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server\'s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored. (optional)
  allowWatchBookmarks: true,
    // The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \"next key\".  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications. (optional)
  _continue: "continue_example",
    // A selector to restrict the list of returned objects by their fields. Defaults to everything. (optional)
  fieldSelector: "fieldSelector_example",
    // A selector to restrict the list of returned objects by their labels. Defaults to everything. (optional)
  labelSelector: "labelSelector_example",
    // limit is a maximum number of responses to return for a list call. If more items exist, the server will set the `continue` field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned. (optional)
  limit: 1,
    // If \'true\', then the output is pretty printed. Defaults to \'false\' unless the user-agent indicates a browser or command-line HTTP tool (curl and wget). (optional)
  pretty: "pretty_example",
    // resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset (optional)
  resourceVersion: "resourceVersion_example",
    // resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset (optional)
  resourceVersionMatch: "resourceVersionMatch_example",
    // `sendInitialEvents=true` may be set together with `watch=true`. In that case, the watch stream will begin with synthetic events to produce the current state of objects in the collection. Once all such events have been sent, a synthetic \"Bookmark\" event  will be sent. The bookmark will report the ResourceVersion (RV) corresponding to the set of objects, and be marked with `\"k8s.io/initial-events-end\": \"true\"` annotation. Afterwards, the watch stream will proceed as usual, sending watch events corresponding to changes (subsequent to the RV) to objects watched.  When `sendInitialEvents` option is set, we require `resourceVersionMatch` option to also be set. The semantic of the watch request is as following: - `resourceVersionMatch` = NotOlderThan   is interpreted as \"data at least as new as the provided `resourceVersion`\"   and the bookmark event is send when the state is synced   to a `resourceVersion` at least as fresh as the one provided by the ListOptions.   If `resourceVersion` is unset, this is interpreted as \"consistent read\" and the   bookmark event is send when the state is synced at least to the moment   when request started being processed. - `resourceVersionMatch` set to any other value or unset   Invalid error is returned.  Defaults to true if `resourceVersion=\"\"` or `resourceVersion=\"0\"` (for backward compatibility reasons) and to false otherwise. (optional)
  sendInitialEvents: true,
    // Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity. (optional)
  timeoutSeconds: 1,
    // Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion. (optional)
  watch: true,
};

const data = await apiInstance.listJobForAllNamespaces(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **allowWatchBookmarks** | [**boolean**] | allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server\&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored. | (optional) defaults to undefined
 **_continue** | [**string**] | The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications. | (optional) defaults to undefined
 **fieldSelector** | [**string**] | A selector to restrict the list of returned objects by their fields. Defaults to everything. | (optional) defaults to undefined
 **labelSelector** | [**string**] | A selector to restrict the list of returned objects by their labels. Defaults to everything. | (optional) defaults to undefined
 **limit** | [**number**] | limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned. | (optional) defaults to undefined
 **pretty** | [**string**] | If \&#39;true\&#39;, then the output is pretty printed. Defaults to \&#39;false\&#39; unless the user-agent indicates a browser or command-line HTTP tool (curl and wget). | (optional) defaults to undefined
 **resourceVersion** | [**string**] | resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset | (optional) defaults to undefined
 **resourceVersionMatch** | [**string**] | resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset | (optional) defaults to undefined
 **sendInitialEvents** | [**boolean**] | &#x60;sendInitialEvents&#x3D;true&#x60; may be set together with &#x60;watch&#x3D;true&#x60;. In that case, the watch stream will begin with synthetic events to produce the current state of objects in the collection. Once all such events have been sent, a synthetic \&quot;Bookmark\&quot; event  will be sent. The bookmark will report the ResourceVersion (RV) corresponding to the set of objects, and be marked with &#x60;\&quot;k8s.io/initial-events-end\&quot;: \&quot;true\&quot;&#x60; annotation. Afterwards, the watch stream will proceed as usual, sending watch events corresponding to changes (subsequent to the RV) to objects watched.  When &#x60;sendInitialEvents&#x60; option is set, we require &#x60;resourceVersionMatch&#x60; option to also be set. The semantic of the watch request is as following: - &#x60;resourceVersionMatch&#x60; &#x3D; NotOlderThan   is interpreted as \&quot;data at least as new as the provided &#x60;resourceVersion&#x60;\&quot;   and the bookmark event is send when the state is synced   to a &#x60;resourceVersion&#x60; at least as fresh as the one provided by the ListOptions.   If &#x60;resourceVersion&#x60; is unset, this is interpreted as \&quot;consistent read\&quot; and the   bookmark event is send when the state is synced at least to the moment   when request started being processed. - &#x60;resourceVersionMatch&#x60; set to any other value or unset   Invalid error is returned.  Defaults to true if &#x60;resourceVersion&#x3D;\&quot;\&quot;&#x60; or &#x60;resourceVersion&#x3D;\&quot;0\&quot;&#x60; (for backward compatibility reasons) and to false otherwise. | (optional) defaults to undefined
 **timeoutSeconds** | [**number**] | Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity. | (optional) defaults to undefined
 **watch** | [**boolean**] | Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion. | (optional) defaults to undefined


### Return type

**V1JobList**

### Authorization

[BearerToken](README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf, application/cbor, application/json;stream=watch, application/vnd.kubernetes.protobuf;stream=watch, application/cbor-seq


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **listNamespacedCronJob**
> V1CronJobList listNamespacedCronJob()

list or watch objects of kind CronJob

### Example


```typescript
import { createConfiguration, BatchV1Api } from '';
import type { BatchV1ApiListNamespacedCronJobRequest } from '';

const configuration = createConfiguration();
const apiInstance = new BatchV1Api(configuration);

const request: BatchV1ApiListNamespacedCronJobRequest = {
    // object name and auth scope, such as for teams and projects
  namespace: "namespace_example",
    // If \'true\', then the output is pretty printed. Defaults to \'false\' unless the user-agent indicates a browser or command-line HTTP tool (curl and wget). (optional)
  pretty: "pretty_example",
    // allowWatchBookmarks requests watch events with type \"BOOKMARK\". Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server\'s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored. (optional)
  allowWatchBookmarks: true,
    // The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \"next key\".  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications. (optional)
  _continue: "continue_example",
    // A selector to restrict the list of returned objects by their fields. Defaults to everything. (optional)
  fieldSelector: "fieldSelector_example",
    // A selector to restrict the list of returned objects by their labels. Defaults to everything. (optional)
  labelSelector: "labelSelector_example",
    // limit is a maximum number of responses to return for a list call. If more items exist, the server will set the `continue` field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned. (optional)
  limit: 1,
    // resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset (optional)
  resourceVersion: "resourceVersion_example",
    // resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset (optional)
  resourceVersionMatch: "resourceVersionMatch_example",
    // `sendInitialEvents=true` may be set together with `watch=true`. In that case, the watch stream will begin with synthetic events to produce the current state of objects in the collection. Once all such events have been sent, a synthetic \"Bookmark\" event  will be sent. The bookmark will report the ResourceVersion (RV) corresponding to the set of objects, and be marked with `\"k8s.io/initial-events-end\": \"true\"` annotation. Afterwards, the watch stream will proceed as usual, sending watch events corresponding to changes (subsequent to the RV) to objects watched.  When `sendInitialEvents` option is set, we require `resourceVersionMatch` option to also be set. The semantic of the watch request is as following: - `resourceVersionMatch` = NotOlderThan   is interpreted as \"data at least as new as the provided `resourceVersion`\"   and the bookmark event is send when the state is synced   to a `resourceVersion` at least as fresh as the one provided by the ListOptions.   If `resourceVersion` is unset, this is interpreted as \"consistent read\" and the   bookmark event is send when the state is synced at least to the moment   when request started being processed. - `resourceVersionMatch` set to any other value or unset   Invalid error is returned.  Defaults to true if `resourceVersion=\"\"` or `resourceVersion=\"0\"` (for backward compatibility reasons) and to false otherwise. (optional)
  sendInitialEvents: true,
    // Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity. (optional)
  timeoutSeconds: 1,
    // Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion. (optional)
  watch: true,
};

const data = await apiInstance.listNamespacedCronJob(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **namespace** | [**string**] | object name and auth scope, such as for teams and projects | defaults to undefined
 **pretty** | [**string**] | If \&#39;true\&#39;, then the output is pretty printed. Defaults to \&#39;false\&#39; unless the user-agent indicates a browser or command-line HTTP tool (curl and wget). | (optional) defaults to undefined
 **allowWatchBookmarks** | [**boolean**] | allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server\&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored. | (optional) defaults to undefined
 **_continue** | [**string**] | The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications. | (optional) defaults to undefined
 **fieldSelector** | [**string**] | A selector to restrict the list of returned objects by their fields. Defaults to everything. | (optional) defaults to undefined
 **labelSelector** | [**string**] | A selector to restrict the list of returned objects by their labels. Defaults to everything. | (optional) defaults to undefined
 **limit** | [**number**] | limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned. | (optional) defaults to undefined
 **resourceVersion** | [**string**] | resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset | (optional) defaults to undefined
 **resourceVersionMatch** | [**string**] | resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset | (optional) defaults to undefined
 **sendInitialEvents** | [**boolean**] | &#x60;sendInitialEvents&#x3D;true&#x60; may be set together with &#x60;watch&#x3D;true&#x60;. In that case, the watch stream will begin with synthetic events to produce the current state of objects in the collection. Once all such events have been sent, a synthetic \&quot;Bookmark\&quot; event  will be sent. The bookmark will report the ResourceVersion (RV) corresponding to the set of objects, and be marked with &#x60;\&quot;k8s.io/initial-events-end\&quot;: \&quot;true\&quot;&#x60; annotation. Afterwards, the watch stream will proceed as usual, sending watch events corresponding to changes (subsequent to the RV) to objects watched.  When &#x60;sendInitialEvents&#x60; option is set, we require &#x60;resourceVersionMatch&#x60; option to also be set. The semantic of the watch request is as following: - &#x60;resourceVersionMatch&#x60; &#x3D; NotOlderThan   is interpreted as \&quot;data at least as new as the provided &#x60;resourceVersion&#x60;\&quot;   and the bookmark event is send when the state is synced   to a &#x60;resourceVersion&#x60; at least as fresh as the one provided by the ListOptions.   If &#x60;resourceVersion&#x60; is unset, this is interpreted as \&quot;consistent read\&quot; and the   bookmark event is send when the state is synced at least to the moment   when request started being processed. - &#x60;resourceVersionMatch&#x60; set to any other value or unset   Invalid error is returned.  Defaults to true if &#x60;resourceVersion&#x3D;\&quot;\&quot;&#x60; or &#x60;resourceVersion&#x3D;\&quot;0\&quot;&#x60; (for backward compatibility reasons) and to false otherwise. | (optional) defaults to undefined
 **timeoutSeconds** | [**number**] | Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity. | (optional) defaults to undefined
 **watch** | [**boolean**] | Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion. | (optional) defaults to undefined


### Return type

**V1CronJobList**

### Authorization

[BearerToken](README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf, application/cbor, application/json;stream=watch, application/vnd.kubernetes.protobuf;stream=watch, application/cbor-seq


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **listNamespacedJob**
> V1JobList listNamespacedJob()

list or watch objects of kind Job

### Example


```typescript
import { createConfiguration, BatchV1Api } from '';
import type { BatchV1ApiListNamespacedJobRequest } from '';

const configuration = createConfiguration();
const apiInstance = new BatchV1Api(configuration);

const request: BatchV1ApiListNamespacedJobRequest = {
    // object name and auth scope, such as for teams and projects
  namespace: "namespace_example",
    // If \'true\', then the output is pretty printed. Defaults to \'false\' unless the user-agent indicates a browser or command-line HTTP tool (curl and wget). (optional)
  pretty: "pretty_example",
    // allowWatchBookmarks requests watch events with type \"BOOKMARK\". Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server\'s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored. (optional)
  allowWatchBookmarks: true,
    // The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \"next key\".  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications. (optional)
  _continue: "continue_example",
    // A selector to restrict the list of returned objects by their fields. Defaults to everything. (optional)
  fieldSelector: "fieldSelector_example",
    // A selector to restrict the list of returned objects by their labels. Defaults to everything. (optional)
  labelSelector: "labelSelector_example",
    // limit is a maximum number of responses to return for a list call. If more items exist, the server will set the `continue` field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned. (optional)
  limit: 1,
    // resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset (optional)
  resourceVersion: "resourceVersion_example",
    // resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset (optional)
  resourceVersionMatch: "resourceVersionMatch_example",
    // `sendInitialEvents=true` may be set together with `watch=true`. In that case, the watch stream will begin with synthetic events to produce the current state of objects in the collection. Once all such events have been sent, a synthetic \"Bookmark\" event  will be sent. The bookmark will report the ResourceVersion (RV) corresponding to the set of objects, and be marked with `\"k8s.io/initial-events-end\": \"true\"` annotation. Afterwards, the watch stream will proceed as usual, sending watch events corresponding to changes (subsequent to the RV) to objects watched.  When `sendInitialEvents` option is set, we require `resourceVersionMatch` option to also be set. The semantic of the watch request is as following: - `resourceVersionMatch` = NotOlderThan   is interpreted as \"data at least as new as the provided `resourceVersion`\"   and the bookmark event is send when the state is synced   to a `resourceVersion` at least as fresh as the one provided by the ListOptions.   If `resourceVersion` is unset, this is interpreted as \"consistent read\" and the   bookmark event is send when the state is synced at least to the moment   when request started being processed. - `resourceVersionMatch` set to any other value or unset   Invalid error is returned.  Defaults to true if `resourceVersion=\"\"` or `resourceVersion=\"0\"` (for backward compatibility reasons) and to false otherwise. (optional)
  sendInitialEvents: true,
    // Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity. (optional)
  timeoutSeconds: 1,
    // Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion. (optional)
  watch: true,
};

const data = await apiInstance.listNamespacedJob(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **namespace** | [**string**] | object name and auth scope, such as for teams and projects | defaults to undefined
 **pretty** | [**string**] | If \&#39;true\&#39;, then the output is pretty printed. Defaults to \&#39;false\&#39; unless the user-agent indicates a browser or command-line HTTP tool (curl and wget). | (optional) defaults to undefined
 **allowWatchBookmarks** | [**boolean**] | allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server\&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored. | (optional) defaults to undefined
 **_continue** | [**string**] | The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications. | (optional) defaults to undefined
 **fieldSelector** | [**string**] | A selector to restrict the list of returned objects by their fields. Defaults to everything. | (optional) defaults to undefined
 **labelSelector** | [**string**] | A selector to restrict the list of returned objects by their labels. Defaults to everything. | (optional) defaults to undefined
 **limit** | [**number**] | limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned. | (optional) defaults to undefined
 **resourceVersion** | [**string**] | resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset | (optional) defaults to undefined
 **resourceVersionMatch** | [**string**] | resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset | (optional) defaults to undefined
 **sendInitialEvents** | [**boolean**] | &#x60;sendInitialEvents&#x3D;true&#x60; may be set together with &#x60;watch&#x3D;true&#x60;. In that case, the watch stream will begin with synthetic events to produce the current state of objects in the collection. Once all such events have been sent, a synthetic \&quot;Bookmark\&quot; event  will be sent. The bookmark will report the ResourceVersion (RV) corresponding to the set of objects, and be marked with &#x60;\&quot;k8s.io/initial-events-end\&quot;: \&quot;true\&quot;&#x60; annotation. Afterwards, the watch stream will proceed as usual, sending watch events corresponding to changes (subsequent to the RV) to objects watched.  When &#x60;sendInitialEvents&#x60; option is set, we require &#x60;resourceVersionMatch&#x60; option to also be set. The semantic of the watch request is as following: - &#x60;resourceVersionMatch&#x60; &#x3D; NotOlderThan   is interpreted as \&quot;data at least as new as the provided &#x60;resourceVersion&#x60;\&quot;   and the bookmark event is send when the state is synced   to a &#x60;resourceVersion&#x60; at least as fresh as the one provided by the ListOptions.   If &#x60;resourceVersion&#x60; is unset, this is interpreted as \&quot;consistent read\&quot; and the   bookmark event is send when the state is synced at least to the moment   when request started being processed. - &#x60;resourceVersionMatch&#x60; set to any other value or unset   Invalid error is returned.  Defaults to true if &#x60;resourceVersion&#x3D;\&quot;\&quot;&#x60; or &#x60;resourceVersion&#x3D;\&quot;0\&quot;&#x60; (for backward compatibility reasons) and to false otherwise. | (optional) defaults to undefined
 **timeoutSeconds** | [**number**] | Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity. | (optional) defaults to undefined
 **watch** | [**boolean**] | Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion. | (optional) defaults to undefined


### Return type

**V1JobList**

### Authorization

[BearerToken](README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf, application/cbor, application/json;stream=watch, application/vnd.kubernetes.protobuf;stream=watch, application/cbor-seq


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **patchNamespacedCronJob**
> V1CronJob patchNamespacedCronJob(body)

partially update the specified CronJob

### Example


```typescript
import { createConfiguration, BatchV1Api } from '';
import type { BatchV1ApiPatchNamespacedCronJobRequest } from '';

const configuration = createConfiguration();
const apiInstance = new BatchV1Api(configuration);

const request: BatchV1ApiPatchNamespacedCronJobRequest = {
    // name of the CronJob
  name: "name_example",
    // object name and auth scope, such as for teams and projects
  namespace: "namespace_example",
  
  body: {},
    // If \'true\', then the output is pretty printed. Defaults to \'false\' unless the user-agent indicates a browser or command-line HTTP tool (curl and wget). (optional)
  pretty: "pretty_example",
    // When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed (optional)
  dryRun: "dryRun_example",
    // fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch). (optional)
  fieldManager: "fieldManager_example",
    // fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. (optional)
  fieldValidation: "fieldValidation_example",
    // Force is going to \"force\" Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests. (optional)
  force: true,
};

const data = await apiInstance.patchNamespacedCronJob(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **any**|  |
 **name** | [**string**] | name of the CronJob | defaults to undefined
 **namespace** | [**string**] | object name and auth scope, such as for teams and projects | defaults to undefined
 **pretty** | [**string**] | If \&#39;true\&#39;, then the output is pretty printed. Defaults to \&#39;false\&#39; unless the user-agent indicates a browser or command-line HTTP tool (curl and wget). | (optional) defaults to undefined
 **dryRun** | [**string**] | When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed | (optional) defaults to undefined
 **fieldManager** | [**string**] | fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch). | (optional) defaults to undefined
 **fieldValidation** | [**string**] | fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. | (optional) defaults to undefined
 **force** | [**boolean**] | Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests. | (optional) defaults to undefined


### Return type

**V1CronJob**

### Authorization

[BearerToken](README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: application/json-patch+json, application/merge-patch+json, application/strategic-merge-patch+json, application/apply-patch+yaml, application/apply-patch+cbor
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf, application/cbor


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**201** | Created |  -  |
**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **patchNamespacedCronJobStatus**
> V1CronJob patchNamespacedCronJobStatus(body)

partially update status of the specified CronJob

### Example


```typescript
import { createConfiguration, BatchV1Api } from '';
import type { BatchV1ApiPatchNamespacedCronJobStatusRequest } from '';

const configuration = createConfiguration();
const apiInstance = new BatchV1Api(configuration);

const request: BatchV1ApiPatchNamespacedCronJobStatusRequest = {
    // name of the CronJob
  name: "name_example",
    // object name and auth scope, such as for teams and projects
  namespace: "namespace_example",
  
  body: {},
    // If \'true\', then the output is pretty printed. Defaults to \'false\' unless the user-agent indicates a browser or command-line HTTP tool (curl and wget). (optional)
  pretty: "pretty_example",
    // When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed (optional)
  dryRun: "dryRun_example",
    // fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch). (optional)
  fieldManager: "fieldManager_example",
    // fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. (optional)
  fieldValidation: "fieldValidation_example",
    // Force is going to \"force\" Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests. (optional)
  force: true,
};

const data = await apiInstance.patchNamespacedCronJobStatus(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **any**|  |
 **name** | [**string**] | name of the CronJob | defaults to undefined
 **namespace** | [**string**] | object name and auth scope, such as for teams and projects | defaults to undefined
 **pretty** | [**string**] | If \&#39;true\&#39;, then the output is pretty printed. Defaults to \&#39;false\&#39; unless the user-agent indicates a browser or command-line HTTP tool (curl and wget). | (optional) defaults to undefined
 **dryRun** | [**string**] | When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed | (optional) defaults to undefined
 **fieldManager** | [**string**] | fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch). | (optional) defaults to undefined
 **fieldValidation** | [**string**] | fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. | (optional) defaults to undefined
 **force** | [**boolean**] | Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests. | (optional) defaults to undefined


### Return type

**V1CronJob**

### Authorization

[BearerToken](README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: application/json-patch+json, application/merge-patch+json, application/strategic-merge-patch+json, application/apply-patch+yaml, application/apply-patch+cbor
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf, application/cbor


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**201** | Created |  -  |
**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **patchNamespacedJob**
> V1Job patchNamespacedJob(body)

partially update the specified Job

### Example


```typescript
import { createConfiguration, BatchV1Api } from '';
import type { BatchV1ApiPatchNamespacedJobRequest } from '';

const configuration = createConfiguration();
const apiInstance = new BatchV1Api(configuration);

const request: BatchV1ApiPatchNamespacedJobRequest = {
    // name of the Job
  name: "name_example",
    // object name and auth scope, such as for teams and projects
  namespace: "namespace_example",
  
  body: {},
    // If \'true\', then the output is pretty printed. Defaults to \'false\' unless the user-agent indicates a browser or command-line HTTP tool (curl and wget). (optional)
  pretty: "pretty_example",
    // When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed (optional)
  dryRun: "dryRun_example",
    // fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch). (optional)
  fieldManager: "fieldManager_example",
    // fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. (optional)
  fieldValidation: "fieldValidation_example",
    // Force is going to \"force\" Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests. (optional)
  force: true,
};

const data = await apiInstance.patchNamespacedJob(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **any**|  |
 **name** | [**string**] | name of the Job | defaults to undefined
 **namespace** | [**string**] | object name and auth scope, such as for teams and projects | defaults to undefined
 **pretty** | [**string**] | If \&#39;true\&#39;, then the output is pretty printed. Defaults to \&#39;false\&#39; unless the user-agent indicates a browser or command-line HTTP tool (curl and wget). | (optional) defaults to undefined
 **dryRun** | [**string**] | When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed | (optional) defaults to undefined
 **fieldManager** | [**string**] | fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch). | (optional) defaults to undefined
 **fieldValidation** | [**string**] | fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. | (optional) defaults to undefined
 **force** | [**boolean**] | Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests. | (optional) defaults to undefined


### Return type

**V1Job**

### Authorization

[BearerToken](README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: application/json-patch+json, application/merge-patch+json, application/strategic-merge-patch+json, application/apply-patch+yaml, application/apply-patch+cbor
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf, application/cbor


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**201** | Created |  -  |
**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **patchNamespacedJobStatus**
> V1Job patchNamespacedJobStatus(body)

partially update status of the specified Job

### Example


```typescript
import { createConfiguration, BatchV1Api } from '';
import type { BatchV1ApiPatchNamespacedJobStatusRequest } from '';

const configuration = createConfiguration();
const apiInstance = new BatchV1Api(configuration);

const request: BatchV1ApiPatchNamespacedJobStatusRequest = {
    // name of the Job
  name: "name_example",
    // object name and auth scope, such as for teams and projects
  namespace: "namespace_example",
  
  body: {},
    // If \'true\', then the output is pretty printed. Defaults to \'false\' unless the user-agent indicates a browser or command-line HTTP tool (curl and wget). (optional)
  pretty: "pretty_example",
    // When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed (optional)
  dryRun: "dryRun_example",
    // fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch). (optional)
  fieldManager: "fieldManager_example",
    // fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. (optional)
  fieldValidation: "fieldValidation_example",
    // Force is going to \"force\" Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests. (optional)
  force: true,
};

const data = await apiInstance.patchNamespacedJobStatus(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **any**|  |
 **name** | [**string**] | name of the Job | defaults to undefined
 **namespace** | [**string**] | object name and auth scope, such as for teams and projects | defaults to undefined
 **pretty** | [**string**] | If \&#39;true\&#39;, then the output is pretty printed. Defaults to \&#39;false\&#39; unless the user-agent indicates a browser or command-line HTTP tool (curl and wget). | (optional) defaults to undefined
 **dryRun** | [**string**] | When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed | (optional) defaults to undefined
 **fieldManager** | [**string**] | fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch). | (optional) defaults to undefined
 **fieldValidation** | [**string**] | fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. | (optional) defaults to undefined
 **force** | [**boolean**] | Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests. | (optional) defaults to undefined


### Return type

**V1Job**

### Authorization

[BearerToken](README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: application/json-patch+json, application/merge-patch+json, application/strategic-merge-patch+json, application/apply-patch+yaml, application/apply-patch+cbor
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf, application/cbor


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**201** | Created |  -  |
**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **readNamespacedCronJob**
> V1CronJob readNamespacedCronJob()

read the specified CronJob

### Example


```typescript
import { createConfiguration, BatchV1Api } from '';
import type { BatchV1ApiReadNamespacedCronJobRequest } from '';

const configuration = createConfiguration();
const apiInstance = new BatchV1Api(configuration);

const request: BatchV1ApiReadNamespacedCronJobRequest = {
    // name of the CronJob
  name: "name_example",
    // object name and auth scope, such as for teams and projects
  namespace: "namespace_example",
    // If \'true\', then the output is pretty printed. Defaults to \'false\' unless the user-agent indicates a browser or command-line HTTP tool (curl and wget). (optional)
  pretty: "pretty_example",
};

const data = await apiInstance.readNamespacedCronJob(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **name** | [**string**] | name of the CronJob | defaults to undefined
 **namespace** | [**string**] | object name and auth scope, such as for teams and projects | defaults to undefined
 **pretty** | [**string**] | If \&#39;true\&#39;, then the output is pretty printed. Defaults to \&#39;false\&#39; unless the user-agent indicates a browser or command-line HTTP tool (curl and wget). | (optional) defaults to undefined


### Return type

**V1CronJob**

### Authorization

[BearerToken](README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf, application/cbor


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **readNamespacedCronJobStatus**
> V1CronJob readNamespacedCronJobStatus()

read status of the specified CronJob

### Example


```typescript
import { createConfiguration, BatchV1Api } from '';
import type { BatchV1ApiReadNamespacedCronJobStatusRequest } from '';

const configuration = createConfiguration();
const apiInstance = new BatchV1Api(configuration);

const request: BatchV1ApiReadNamespacedCronJobStatusRequest = {
    // name of the CronJob
  name: "name_example",
    // object name and auth scope, such as for teams and projects
  namespace: "namespace_example",
    // If \'true\', then the output is pretty printed. Defaults to \'false\' unless the user-agent indicates a browser or command-line HTTP tool (curl and wget). (optional)
  pretty: "pretty_example",
};

const data = await apiInstance.readNamespacedCronJobStatus(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **name** | [**string**] | name of the CronJob | defaults to undefined
 **namespace** | [**string**] | object name and auth scope, such as for teams and projects | defaults to undefined
 **pretty** | [**string**] | If \&#39;true\&#39;, then the output is pretty printed. Defaults to \&#39;false\&#39; unless the user-agent indicates a browser or command-line HTTP tool (curl and wget). | (optional) defaults to undefined


### Return type

**V1CronJob**

### Authorization

[BearerToken](README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf, application/cbor


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **readNamespacedJob**
> V1Job readNamespacedJob()

read the specified Job

### Example


```typescript
import { createConfiguration, BatchV1Api } from '';
import type { BatchV1ApiReadNamespacedJobRequest } from '';

const configuration = createConfiguration();
const apiInstance = new BatchV1Api(configuration);

const request: BatchV1ApiReadNamespacedJobRequest = {
    // name of the Job
  name: "name_example",
    // object name and auth scope, such as for teams and projects
  namespace: "namespace_example",
    // If \'true\', then the output is pretty printed. Defaults to \'false\' unless the user-agent indicates a browser or command-line HTTP tool (curl and wget). (optional)
  pretty: "pretty_example",
};

const data = await apiInstance.readNamespacedJob(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **name** | [**string**] | name of the Job | defaults to undefined
 **namespace** | [**string**] | object name and auth scope, such as for teams and projects | defaults to undefined
 **pretty** | [**string**] | If \&#39;true\&#39;, then the output is pretty printed. Defaults to \&#39;false\&#39; unless the user-agent indicates a browser or command-line HTTP tool (curl and wget). | (optional) defaults to undefined


### Return type

**V1Job**

### Authorization

[BearerToken](README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf, application/cbor


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **readNamespacedJobStatus**
> V1Job readNamespacedJobStatus()

read status of the specified Job

### Example


```typescript
import { createConfiguration, BatchV1Api } from '';
import type { BatchV1ApiReadNamespacedJobStatusRequest } from '';

const configuration = createConfiguration();
const apiInstance = new BatchV1Api(configuration);

const request: BatchV1ApiReadNamespacedJobStatusRequest = {
    // name of the Job
  name: "name_example",
    // object name and auth scope, such as for teams and projects
  namespace: "namespace_example",
    // If \'true\', then the output is pretty printed. Defaults to \'false\' unless the user-agent indicates a browser or command-line HTTP tool (curl and wget). (optional)
  pretty: "pretty_example",
};

const data = await apiInstance.readNamespacedJobStatus(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **name** | [**string**] | name of the Job | defaults to undefined
 **namespace** | [**string**] | object name and auth scope, such as for teams and projects | defaults to undefined
 **pretty** | [**string**] | If \&#39;true\&#39;, then the output is pretty printed. Defaults to \&#39;false\&#39; unless the user-agent indicates a browser or command-line HTTP tool (curl and wget). | (optional) defaults to undefined


### Return type

**V1Job**

### Authorization

[BearerToken](README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf, application/cbor


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **replaceNamespacedCronJob**
> V1CronJob replaceNamespacedCronJob(body)

replace the specified CronJob

### Example


```typescript
import { createConfiguration, BatchV1Api } from '';
import type { BatchV1ApiReplaceNamespacedCronJobRequest } from '';

const configuration = createConfiguration();
const apiInstance = new BatchV1Api(configuration);

const request: BatchV1ApiReplaceNamespacedCronJobRequest = {
    // name of the CronJob
  name: "name_example",
    // object name and auth scope, such as for teams and projects
  namespace: "namespace_example",
  
  body: {
    apiVersion: "apiVersion_example",
    kind: "kind_example",
    metadata: {
      annotations: {
        "key": "key_example",
      },
      creationTimestamp: new Date('1970-01-01T00:00:00.00Z'),
      deletionGracePeriodSeconds: 1,
      deletionTimestamp: new Date('1970-01-01T00:00:00.00Z'),
      finalizers: [
        "finalizers_example",
      ],
      generateName: "generateName_example",
      generation: 1,
      labels: {
        "key": "key_example",
      },
      managedFields: [
        {
          apiVersion: "apiVersion_example",
          fieldsType: "fieldsType_example",
          fieldsV1: {},
          manager: "manager_example",
          operation: "operation_example",
          subresource: "subresource_example",
          time: new Date('1970-01-01T00:00:00.00Z'),
        },
      ],
      name: "name_example",
      namespace: "namespace_example",
      ownerReferences: [
        {
          apiVersion: "apiVersion_example",
          blockOwnerDeletion: true,
          controller: true,
          kind: "kind_example",
          name: "name_example",
          uid: "uid_example",
        },
      ],
      resourceVersion: "resourceVersion_example",
      selfLink: "selfLink_example",
      uid: "uid_example",
    },
    spec: {
      concurrencyPolicy: "concurrencyPolicy_example",
      failedJobsHistoryLimit: 1,
      jobTemplate: {
        metadata: {
          annotations: {
            "key": "key_example",
          },
          creationTimestamp: new Date('1970-01-01T00:00:00.00Z'),
          deletionGracePeriodSeconds: 1,
          deletionTimestamp: new Date('1970-01-01T00:00:00.00Z'),
          finalizers: [
            "finalizers_example",
          ],
          generateName: "generateName_example",
          generation: 1,
          labels: {
            "key": "key_example",
          },
          managedFields: [
            {
              apiVersion: "apiVersion_example",
              fieldsType: "fieldsType_example",
              fieldsV1: {},
              manager: "manager_example",
              operation: "operation_example",
              subresource: "subresource_example",
              time: new Date('1970-01-01T00:00:00.00Z'),
            },
          ],
          name: "name_example",
          namespace: "namespace_example",
          ownerReferences: [
            {
              apiVersion: "apiVersion_example",
              blockOwnerDeletion: true,
              controller: true,
              kind: "kind_example",
              name: "name_example",
              uid: "uid_example",
            },
          ],
          resourceVersion: "resourceVersion_example",
          selfLink: "selfLink_example",
          uid: "uid_example",
        },
        spec: {
          activeDeadlineSeconds: 1,
          backoffLimit: 1,
          backoffLimitPerIndex: 1,
          completionMode: "completionMode_example",
          completions: 1,
          managedBy: "managedBy_example",
          manualSelector: true,
          maxFailedIndexes: 1,
          parallelism: 1,
          podFailurePolicy: {
            rules: [
              {
                action: "action_example",
                onExitCodes: {
                  containerName: "containerName_example",
                  operator: "operator_example",
                  values: [
                    1,
                  ],
                },
                onPodConditions: [
                  {
                    status: "status_example",
                    type: "type_example",
                  },
                ],
              },
            ],
          },
          podReplacementPolicy: "podReplacementPolicy_example",
          selector: {
            matchExpressions: [
              {
                key: "key_example",
                operator: "operator_example",
                values: [
                  "values_example",
                ],
              },
            ],
            matchLabels: {
              "key": "key_example",
            },
          },
          successPolicy: {
            rules: [
              {
                succeededCount: 1,
                succeededIndexes: "succeededIndexes_example",
              },
            ],
          },
          suspend: true,
          template: {
            metadata: {
              annotations: {
                "key": "key_example",
              },
              creationTimestamp: new Date('1970-01-01T00:00:00.00Z'),
              deletionGracePeriodSeconds: 1,
              deletionTimestamp: new Date('1970-01-01T00:00:00.00Z'),
              finalizers: [
                "finalizers_example",
              ],
              generateName: "generateName_example",
              generation: 1,
              labels: {
                "key": "key_example",
              },
              managedFields: [
                {
                  apiVersion: "apiVersion_example",
                  fieldsType: "fieldsType_example",
                  fieldsV1: {},
                  manager: "manager_example",
                  operation: "operation_example",
                  subresource: "subresource_example",
                  time: new Date('1970-01-01T00:00:00.00Z'),
                },
              ],
              name: "name_example",
              namespace: "namespace_example",
              ownerReferences: [
                {
                  apiVersion: "apiVersion_example",
                  blockOwnerDeletion: true,
                  controller: true,
                  kind: "kind_example",
                  name: "name_example",
                  uid: "uid_example",
                },
              ],
              resourceVersion: "resourceVersion_example",
              selfLink: "selfLink_example",
              uid: "uid_example",
            },
            spec: {
              activeDeadlineSeconds: 1,
              affinity: {
                nodeAffinity: {
                  preferredDuringSchedulingIgnoredDuringExecution: [
                    {
                      preference: {
                        matchExpressions: [
                          {
                            key: "key_example",
                            operator: "operator_example",
                            values: [
                              "values_example",
                            ],
                          },
                        ],
                        matchFields: [
                          {
                            key: "key_example",
                            operator: "operator_example",
                            values: [
                              "values_example",
                            ],
                          },
                        ],
                      },
                      weight: 1,
                    },
                  ],
                  requiredDuringSchedulingIgnoredDuringExecution: {
                    nodeSelectorTerms: [
                      {
                        matchExpressions: [
                          {
                            key: "key_example",
                            operator: "operator_example",
                            values: [
                              "values_example",
                            ],
                          },
                        ],
                        matchFields: [
                          {
                            key: "key_example",
                            operator: "operator_example",
                            values: [
                              "values_example",
                            ],
                          },
                        ],
                      },
                    ],
                  },
                },
                podAffinity: {
                  preferredDuringSchedulingIgnoredDuringExecution: [
                    {
                      podAffinityTerm: {
                        labelSelector: {
                          matchExpressions: [
                            {
                              key: "key_example",
                              operator: "operator_example",
                              values: [
                                "values_example",
                              ],
                            },
                          ],
                          matchLabels: {
                            "key": "key_example",
                          },
                        },
                        matchLabelKeys: [
                          "matchLabelKeys_example",
                        ],
                        mismatchLabelKeys: [
                          "mismatchLabelKeys_example",
                        ],
                        namespaceSelector: {
                          matchExpressions: [
                            {
                              key: "key_example",
                              operator: "operator_example",
                              values: [
                                "values_example",
                              ],
                            },
                          ],
                          matchLabels: {
                            "key": "key_example",
                          },
                        },
                        namespaces: [
                          "namespaces_example",
                        ],
                        topologyKey: "topologyKey_example",
                      },
                      weight: 1,
                    },
                  ],
                  requiredDuringSchedulingIgnoredDuringExecution: [
                    {
                      labelSelector: {
                        matchExpressions: [
                          {
                            key: "key_example",
                            operator: "operator_example",
                            values: [
                              "values_example",
                            ],
                          },
                        ],
                        matchLabels: {
                          "key": "key_example",
                        },
                      },
                      matchLabelKeys: [
                        "matchLabelKeys_example",
                      ],
                      mismatchLabelKeys: [
                        "mismatchLabelKeys_example",
                      ],
                      namespaceSelector: {
                        matchExpressions: [
                          {
                            key: "key_example",
                            operator: "operator_example",
                            values: [
                              "values_example",
                            ],
                          },
                        ],
                        matchLabels: {
                          "key": "key_example",
                        },
                      },
                      namespaces: [
                        "namespaces_example",
                      ],
                      topologyKey: "topologyKey_example",
                    },
                  ],
                },
                podAntiAffinity: {
                  preferredDuringSchedulingIgnoredDuringExecution: [
                    {
                      podAffinityTerm: {
                        labelSelector: {
                          matchExpressions: [
                            {
                              key: "key_example",
                              operator: "operator_example",
                              values: [
                                "values_example",
                              ],
                            },
                          ],
                          matchLabels: {
                            "key": "key_example",
                          },
                        },
                        matchLabelKeys: [
                          "matchLabelKeys_example",
                        ],
                        mismatchLabelKeys: [
                          "mismatchLabelKeys_example",
                        ],
                        namespaceSelector: {
                          matchExpressions: [
                            {
                              key: "key_example",
                              operator: "operator_example",
                              values: [
                                "values_example",
                              ],
                            },
                          ],
                          matchLabels: {
                            "key": "key_example",
                          },
                        },
                        namespaces: [
                          "namespaces_example",
                        ],
                        topologyKey: "topologyKey_example",
                      },
                      weight: 1,
                    },
                  ],
                  requiredDuringSchedulingIgnoredDuringExecution: [
                    {
                      labelSelector: {
                        matchExpressions: [
                          {
                            key: "key_example",
                            operator: "operator_example",
                            values: [
                              "values_example",
                            ],
                          },
                        ],
                        matchLabels: {
                          "key": "key_example",
                        },
                      },
                      matchLabelKeys: [
                        "matchLabelKeys_example",
                      ],
                      mismatchLabelKeys: [
                        "mismatchLabelKeys_example",
                      ],
                      namespaceSelector: {
                        matchExpressions: [
                          {
                            key: "key_example",
                            operator: "operator_example",
                            values: [
                              "values_example",
                            ],
                          },
                        ],
                        matchLabels: {
                          "key": "key_example",
                        },
                      },
                      namespaces: [
                        "namespaces_example",
                      ],
                      topologyKey: "topologyKey_example",
                    },
                  ],
                },
              },
              automountServiceAccountToken: true,
              containers: [
                {
                  args: [
                    "args_example",
                  ],
                  command: [
                    "command_example",
                  ],
                  env: [
                    {
                      name: "name_example",
                      value: "value_example",
                      valueFrom: {
                        configMapKeyRef: {
                          key: "key_example",
                          name: "name_example",
                          optional: true,
                        },
                        fieldRef: {
                          apiVersion: "apiVersion_example",
                          fieldPath: "fieldPath_example",
                        },
                        fileKeyRef: {
                          key: "key_example",
                          optional: true,
                          path: "path_example",
                          volumeName: "volumeName_example",
                        },
                        resourceFieldRef: {
                          containerName: "containerName_example",
                          divisor: "divisor_example",
                          resource: "resource_example",
                        },
                        secretKeyRef: {
                          key: "key_example",
                          name: "name_example",
                          optional: true,
                        },
                      },
                    },
                  ],
                  envFrom: [
                    {
                      configMapRef: {
                        name: "name_example",
                        optional: true,
                      },
                      prefix: "prefix_example",
                      secretRef: {
                        name: "name_example",
                        optional: true,
                      },
                    },
                  ],
                  image: "image_example",
                  imagePullPolicy: "imagePullPolicy_example",
                  lifecycle: {
                    postStart: {
                      exec: {
                        command: [
                          "command_example",
                        ],
                      },
                      httpGet: {
                        host: "host_example",
                        httpHeaders: [
                          {
                            name: "name_example",
                            value: "value_example",
                          },
                        ],
                        path: "path_example",
                        port: "port_example",
                        scheme: "scheme_example",
                      },
                      sleep: {
                        seconds: 1,
                      },
                      tcpSocket: {
                        host: "host_example",
                        port: "port_example",
                      },
                    },
                    preStop: {
                      exec: {
                        command: [
                          "command_example",
                        ],
                      },
                      httpGet: {
                        host: "host_example",
                        httpHeaders: [
                          {
                            name: "name_example",
                            value: "value_example",
                          },
                        ],
                        path: "path_example",
                        port: "port_example",
                        scheme: "scheme_example",
                      },
                      sleep: {
                        seconds: 1,
                      },
                      tcpSocket: {
                        host: "host_example",
                        port: "port_example",
                      },
                    },
                    stopSignal: "stopSignal_example",
                  },
                  livenessProbe: {
                    exec: {
                      command: [
                        "command_example",
                      ],
                    },
                    failureThreshold: 1,
                    grpc: {
                      port: 1,
                      service: "service_example",
                    },
                    httpGet: {
                      host: "host_example",
                      httpHeaders: [
                        {
                          name: "name_example",
                          value: "value_example",
                        },
                      ],
                      path: "path_example",
                      port: "port_example",
                      scheme: "scheme_example",
                    },
                    initialDelaySeconds: 1,
                    periodSeconds: 1,
                    successThreshold: 1,
                    tcpSocket: {
                      host: "host_example",
                      port: "port_example",
                    },
                    terminationGracePeriodSeconds: 1,
                    timeoutSeconds: 1,
                  },
                  name: "name_example",
                  ports: [
                    {
                      containerPort: 1,
                      hostIP: "hostIP_example",
                      hostPort: 1,
                      name: "name_example",
                      protocol: "protocol_example",
                    },
                  ],
                  readinessProbe: {
                    exec: {
                      command: [
                        "command_example",
                      ],
                    },
                    failureThreshold: 1,
                    grpc: {
                      port: 1,
                      service: "service_example",
                    },
                    httpGet: {
                      host: "host_example",
                      httpHeaders: [
                        {
                          name: "name_example",
                          value: "value_example",
                        },
                      ],
                      path: "path_example",
                      port: "port_example",
                      scheme: "scheme_example",
                    },
                    initialDelaySeconds: 1,
                    periodSeconds: 1,
                    successThreshold: 1,
                    tcpSocket: {
                      host: "host_example",
                      port: "port_example",
                    },
                    terminationGracePeriodSeconds: 1,
                    timeoutSeconds: 1,
                  },
                  resizePolicy: [
                    {
                      resourceName: "resourceName_example",
                      restartPolicy: "restartPolicy_example",
                    },
                  ],
                  resources: {
                    claims: [
                      {
                        name: "name_example",
                        request: "request_example",
                      },
                    ],
                    limits: {
                      "key": "key_example",
                    },
                    requests: {
                      "key": "key_example",
                    },
                  },
                  restartPolicy: "restartPolicy_example",
                  restartPolicyRules: [
                    {
                      action: "action_example",
                      exitCodes: {
                        operator: "operator_example",
                        values: [
                          1,
                        ],
                      },
                    },
                  ],
                  securityContext: {
                    allowPrivilegeEscalation: true,
                    appArmorProfile: {
                      localhostProfile: "localhostProfile_example",
                      type: "type_example",
                    },
                    capabilities: {
                      add: [
                        "add_example",
                      ],
                      drop: [
                        "drop_example",
                      ],
                    },
                    privileged: true,
                    procMount: "procMount_example",
                    readOnlyRootFilesystem: true,
                    runAsGroup: 1,
                    runAsNonRoot: true,
                    runAsUser: 1,
                    seLinuxOptions: {
                      level: "level_example",
                      role: "role_example",
                      type: "type_example",
                      user: "user_example",
                    },
                    seccompProfile: {
                      localhostProfile: "localhostProfile_example",
                      type: "type_example",
                    },
                    windowsOptions: {
                      gmsaCredentialSpec: "gmsaCredentialSpec_example",
                      gmsaCredentialSpecName: "gmsaCredentialSpecName_example",
                      hostProcess: true,
                      runAsUserName: "runAsUserName_example",
                    },
                  },
                  startupProbe: {
                    exec: {
                      command: [
                        "command_example",
                      ],
                    },
                    failureThreshold: 1,
                    grpc: {
                      port: 1,
                      service: "service_example",
                    },
                    httpGet: {
                      host: "host_example",
                      httpHeaders: [
                        {
                          name: "name_example",
                          value: "value_example",
                        },
                      ],
                      path: "path_example",
                      port: "port_example",
                      scheme: "scheme_example",
                    },
                    initialDelaySeconds: 1,
                    periodSeconds: 1,
                    successThreshold: 1,
                    tcpSocket: {
                      host: "host_example",
                      port: "port_example",
                    },
                    terminationGracePeriodSeconds: 1,
                    timeoutSeconds: 1,
                  },
                  stdin: true,
                  stdinOnce: true,
                  terminationMessagePath: "terminationMessagePath_example",
                  terminationMessagePolicy: "terminationMessagePolicy_example",
                  tty: true,
                  volumeDevices: [
                    {
                      devicePath: "devicePath_example",
                      name: "name_example",
                    },
                  ],
                  volumeMounts: [
                    {
                      mountPath: "mountPath_example",
                      mountPropagation: "mountPropagation_example",
                      name: "name_example",
                      readOnly: true,
                      recursiveReadOnly: "recursiveReadOnly_example",
                      subPath: "subPath_example",
                      subPathExpr: "subPathExpr_example",
                    },
                  ],
                  workingDir: "workingDir_example",
                },
              ],
              dnsConfig: {
                nameservers: [
                  "nameservers_example",
                ],
                options: [
                  {
                    name: "name_example",
                    value: "value_example",
                  },
                ],
                searches: [
                  "searches_example",
                ],
              },
              dnsPolicy: "dnsPolicy_example",
              enableServiceLinks: true,
              ephemeralContainers: [
                {
                  args: [
                    "args_example",
                  ],
                  command: [
                    "command_example",
                  ],
                  env: [
                    {
                      name: "name_example",
                      value: "value_example",
                      valueFrom: {
                        configMapKeyRef: {
                          key: "key_example",
                          name: "name_example",
                          optional: true,
                        },
                        fieldRef: {
                          apiVersion: "apiVersion_example",
                          fieldPath: "fieldPath_example",
                        },
                        fileKeyRef: {
                          key: "key_example",
                          optional: true,
                          path: "path_example",
                          volumeName: "volumeName_example",
                        },
                        resourceFieldRef: {
                          containerName: "containerName_example",
                          divisor: "divisor_example",
                          resource: "resource_example",
                        },
                        secretKeyRef: {
                          key: "key_example",
                          name: "name_example",
                          optional: true,
                        },
                      },
                    },
                  ],
                  envFrom: [
                    {
                      configMapRef: {
                        name: "name_example",
                        optional: true,
                      },
                      prefix: "prefix_example",
                      secretRef: {
                        name: "name_example",
                        optional: true,
                      },
                    },
                  ],
                  image: "image_example",
                  imagePullPolicy: "imagePullPolicy_example",
                  lifecycle: {
                    postStart: {
                      exec: {
                        command: [
                          "command_example",
                        ],
                      },
                      httpGet: {
                        host: "host_example",
                        httpHeaders: [
                          {
                            name: "name_example",
                            value: "value_example",
                          },
                        ],
                        path: "path_example",
                        port: "port_example",
                        scheme: "scheme_example",
                      },
                      sleep: {
                        seconds: 1,
                      },
                      tcpSocket: {
                        host: "host_example",
                        port: "port_example",
                      },
                    },
                    preStop: {
                      exec: {
                        command: [
                          "command_example",
                        ],
                      },
                      httpGet: {
                        host: "host_example",
                        httpHeaders: [
                          {
                            name: "name_example",
                            value: "value_example",
                          },
                        ],
                        path: "path_example",
                        port: "port_example",
                        scheme: "scheme_example",
                      },
                      sleep: {
                        seconds: 1,
                      },
                      tcpSocket: {
                        host: "host_example",
                        port: "port_example",
                      },
                    },
                    stopSignal: "stopSignal_example",
                  },
                  livenessProbe: {
                    exec: {
                      command: [
                        "command_example",
                      ],
                    },
                    failureThreshold: 1,
                    grpc: {
                      port: 1,
                      service: "service_example",
                    },
                    httpGet: {
                      host: "host_example",
                      httpHeaders: [
                        {
                          name: "name_example",
                          value: "value_example",
                        },
                      ],
                      path: "path_example",
                      port: "port_example",
                      scheme: "scheme_example",
                    },
                    initialDelaySeconds: 1,
                    periodSeconds: 1,
                    successThreshold: 1,
                    tcpSocket: {
                      host: "host_example",
                      port: "port_example",
                    },
                    terminationGracePeriodSeconds: 1,
                    timeoutSeconds: 1,
                  },
                  name: "name_example",
                  ports: [
                    {
                      containerPort: 1,
                      hostIP: "hostIP_example",
                      hostPort: 1,
                      name: "name_example",
                      protocol: "protocol_example",
                    },
                  ],
                  readinessProbe: {
                    exec: {
                      command: [
                        "command_example",
                      ],
                    },
                    failureThreshold: 1,
                    grpc: {
                      port: 1,
                      service: "service_example",
                    },
                    httpGet: {
                      host: "host_example",
                      httpHeaders: [
                        {
                          name: "name_example",
                          value: "value_example",
                        },
                      ],
                      path: "path_example",
                      port: "port_example",
                      scheme: "scheme_example",
                    },
                    initialDelaySeconds: 1,
                    periodSeconds: 1,
                    successThreshold: 1,
                    tcpSocket: {
                      host: "host_example",
                      port: "port_example",
                    },
                    terminationGracePeriodSeconds: 1,
                    timeoutSeconds: 1,
                  },
                  resizePolicy: [
                    {
                      resourceName: "resourceName_example",
                      restartPolicy: "restartPolicy_example",
                    },
                  ],
                  resources: {
                    claims: [
                      {
                        name: "name_example",
                        request: "request_example",
                      },
                    ],
                    limits: {
                      "key": "key_example",
                    },
                    requests: {
                      "key": "key_example",
                    },
                  },
                  restartPolicy: "restartPolicy_example",
                  restartPolicyRules: [
                    {
                      action: "action_example",
                      exitCodes: {
                        operator: "operator_example",
                        values: [
                          1,
                        ],
                      },
                    },
                  ],
                  securityContext: {
                    allowPrivilegeEscalation: true,
                    appArmorProfile: {
                      localhostProfile: "localhostProfile_example",
                      type: "type_example",
                    },
                    capabilities: {
                      add: [
                        "add_example",
                      ],
                      drop: [
                        "drop_example",
                      ],
                    },
                    privileged: true,
                    procMount: "procMount_example",
                    readOnlyRootFilesystem: true,
                    runAsGroup: 1,
                    runAsNonRoot: true,
                    runAsUser: 1,
                    seLinuxOptions: {
                      level: "level_example",
                      role: "role_example",
                      type: "type_example",
                      user: "user_example",
                    },
                    seccompProfile: {
                      localhostProfile: "localhostProfile_example",
                      type: "type_example",
                    },
                    windowsOptions: {
                      gmsaCredentialSpec: "gmsaCredentialSpec_example",
                      gmsaCredentialSpecName: "gmsaCredentialSpecName_example",
                      hostProcess: true,
                      runAsUserName: "runAsUserName_example",
                    },
                  },
                  startupProbe: {
                    exec: {
                      command: [
                        "command_example",
                      ],
                    },
                    failureThreshold: 1,
                    grpc: {
                      port: 1,
                      service: "service_example",
                    },
                    httpGet: {
                      host: "host_example",
                      httpHeaders: [
                        {
                          name: "name_example",
                          value: "value_example",
                        },
                      ],
                      path: "path_example",
                      port: "port_example",
                      scheme: "scheme_example",
                    },
                    initialDelaySeconds: 1,
                    periodSeconds: 1,
                    successThreshold: 1,
                    tcpSocket: {
                      host: "host_example",
                      port: "port_example",
                    },
                    terminationGracePeriodSeconds: 1,
                    timeoutSeconds: 1,
                  },
                  stdin: true,
                  stdinOnce: true,
                  targetContainerName: "targetContainerName_example",
                  terminationMessagePath: "terminationMessagePath_example",
                  terminationMessagePolicy: "terminationMessagePolicy_example",
                  tty: true,
                  volumeDevices: [
                    {
                      devicePath: "devicePath_example",
                      name: "name_example",
                    },
                  ],
                  volumeMounts: [
                    {
                      mountPath: "mountPath_example",
                      mountPropagation: "mountPropagation_example",
                      name: "name_example",
                      readOnly: true,
                      recursiveReadOnly: "recursiveReadOnly_example",
                      subPath: "subPath_example",
                      subPathExpr: "subPathExpr_example",
                    },
                  ],
                  workingDir: "workingDir_example",
                },
              ],
              hostAliases: [
                {
                  hostnames: [
                    "hostnames_example",
                  ],
                  ip: "ip_example",
                },
              ],
              hostIPC: true,
              hostNetwork: true,
              hostPID: true,
              hostUsers: true,
              hostname: "hostname_example",
              hostnameOverride: "hostnameOverride_example",
              imagePullSecrets: [
                {
                  name: "name_example",
                },
              ],
              initContainers: [
                {
                  args: [
                    "args_example",
                  ],
                  command: [
                    "command_example",
                  ],
                  env: [
                    {
                      name: "name_example",
                      value: "value_example",
                      valueFrom: {
                        configMapKeyRef: {
                          key: "key_example",
                          name: "name_example",
                          optional: true,
                        },
                        fieldRef: {
                          apiVersion: "apiVersion_example",
                          fieldPath: "fieldPath_example",
                        },
                        fileKeyRef: {
                          key: "key_example",
                          optional: true,
                          path: "path_example",
                          volumeName: "volumeName_example",
                        },
                        resourceFieldRef: {
                          containerName: "containerName_example",
                          divisor: "divisor_example",
                          resource: "resource_example",
                        },
                        secretKeyRef: {
                          key: "key_example",
                          name: "name_example",
                          optional: true,
                        },
                      },
                    },
                  ],
                  envFrom: [
                    {
                      configMapRef: {
                        name: "name_example",
                        optional: true,
                      },
                      prefix: "prefix_example",
                      secretRef: {
                        name: "name_example",
                        optional: true,
                      },
                    },
                  ],
                  image: "image_example",
                  imagePullPolicy: "imagePullPolicy_example",
                  lifecycle: {
                    postStart: {
                      exec: {
                        command: [
                          "command_example",
                        ],
                      },
                      httpGet: {
                        host: "host_example",
                        httpHeaders: [
                          {
                            name: "name_example",
                            value: "value_example",
                          },
                        ],
                        path: "path_example",
                        port: "port_example",
                        scheme: "scheme_example",
                      },
                      sleep: {
                        seconds: 1,
                      },
                      tcpSocket: {
                        host: "host_example",
                        port: "port_example",
                      },
                    },
                    preStop: {
                      exec: {
                        command: [
                          "command_example",
                        ],
                      },
                      httpGet: {
                        host: "host_example",
                        httpHeaders: [
                          {
                            name: "name_example",
                            value: "value_example",
                          },
                        ],
                        path: "path_example",
                        port: "port_example",
                        scheme: "scheme_example",
                      },
                      sleep: {
                        seconds: 1,
                      },
                      tcpSocket: {
                        host: "host_example",
                        port: "port_example",
                      },
                    },
                    stopSignal: "stopSignal_example",
                  },
                  livenessProbe: {
                    exec: {
                      command: [
                        "command_example",
                      ],
                    },
                    failureThreshold: 1,
                    grpc: {
                      port: 1,
                      service: "service_example",
                    },
                    httpGet: {
                      host: "host_example",
                      httpHeaders: [
                        {
                          name: "name_example",
                          value: "value_example",
                        },
                      ],
                      path: "path_example",
                      port: "port_example",
                      scheme: "scheme_example",
                    },
                    initialDelaySeconds: 1,
                    periodSeconds: 1,
                    successThreshold: 1,
                    tcpSocket: {
                      host: "host_example",
                      port: "port_example",
                    },
                    terminationGracePeriodSeconds: 1,
                    timeoutSeconds: 1,
                  },
                  name: "name_example",
                  ports: [
                    {
                      containerPort: 1,
                      hostIP: "hostIP_example",
                      hostPort: 1,
                      name: "name_example",
                      protocol: "protocol_example",
                    },
                  ],
                  readinessProbe: {
                    exec: {
                      command: [
                        "command_example",
                      ],
                    },
                    failureThreshold: 1,
                    grpc: {
                      port: 1,
                      service: "service_example",
                    },
                    httpGet: {
                      host: "host_example",
                      httpHeaders: [
                        {
                          name: "name_example",
                          value: "value_example",
                        },
                      ],
                      path: "path_example",
                      port: "port_example",
                      scheme: "scheme_example",
                    },
                    initialDelaySeconds: 1,
                    periodSeconds: 1,
                    successThreshold: 1,
                    tcpSocket: {
                      host: "host_example",
                      port: "port_example",
                    },
                    terminationGracePeriodSeconds: 1,
                    timeoutSeconds: 1,
                  },
                  resizePolicy: [
                    {
                      resourceName: "resourceName_example",
                      restartPolicy: "restartPolicy_example",
                    },
                  ],
                  resources: {
                    claims: [
                      {
                        name: "name_example",
                        request: "request_example",
                      },
                    ],
                    limits: {
                      "key": "key_example",
                    },
                    requests: {
                      "key": "key_example",
                    },
                  },
                  restartPolicy: "restartPolicy_example",
                  restartPolicyRules: [
                    {
                      action: "action_example",
                      exitCodes: {
                        operator: "operator_example",
                        values: [
                          1,
                        ],
                      },
                    },
                  ],
                  securityContext: {
                    allowPrivilegeEscalation: true,
                    appArmorProfile: {
                      localhostProfile: "localhostProfile_example",
                      type: "type_example",
                    },
                    capabilities: {
                      add: [
                        "add_example",
                      ],
                      drop: [
                        "drop_example",
                      ],
                    },
                    privileged: true,
                    procMount: "procMount_example",
                    readOnlyRootFilesystem: true,
                    runAsGroup: 1,
                    runAsNonRoot: true,
                    runAsUser: 1,
                    seLinuxOptions: {
                      level: "level_example",
                      role: "role_example",
                      type: "type_example",
                      user: "user_example",
                    },
                    seccompProfile: {
                      localhostProfile: "localhostProfile_example",
                      type: "type_example",
                    },
                    windowsOptions: {
                      gmsaCredentialSpec: "gmsaCredentialSpec_example",
                      gmsaCredentialSpecName: "gmsaCredentialSpecName_example",
                      hostProcess: true,
                      runAsUserName: "runAsUserName_example",
                    },
                  },
                  startupProbe: {
                    exec: {
                      command: [
                        "command_example",
                      ],
                    },
                    failureThreshold: 1,
                    grpc: {
                      port: 1,
                      service: "service_example",
                    },
                    httpGet: {
                      host: "host_example",
                      httpHeaders: [
                        {
                          name: "name_example",
                          value: "value_example",
                        },
                      ],
                      path: "path_example",
                      port: "port_example",
                      scheme: "scheme_example",
                    },
                    initialDelaySeconds: 1,
                    periodSeconds: 1,
                    successThreshold: 1,
                    tcpSocket: {
                      host: "host_example",
                      port: "port_example",
                    },
                    terminationGracePeriodSeconds: 1,
                    timeoutSeconds: 1,
                  },
                  stdin: true,
                  stdinOnce: true,
                  terminationMessagePath: "terminationMessagePath_example",
                  terminationMessagePolicy: "terminationMessagePolicy_example",
                  tty: true,
                  volumeDevices: [
                    {
                      devicePath: "devicePath_example",
                      name: "name_example",
                    },
                  ],
                  volumeMounts: [
                    {
                      mountPath: "mountPath_example",
                      mountPropagation: "mountPropagation_example",
                      name: "name_example",
                      readOnly: true,
                      recursiveReadOnly: "recursiveReadOnly_example",
                      subPath: "subPath_example",
                      subPathExpr: "subPathExpr_example",
                    },
                  ],
                  workingDir: "workingDir_example",
                },
              ],
              nodeName: "nodeName_example",
              nodeSelector: {
                "key": "key_example",
              },
              os: {
                name: "name_example",
              },
              overhead: {
                "key": "key_example",
              },
              preemptionPolicy: "preemptionPolicy_example",
              priority: 1,
              priorityClassName: "priorityClassName_example",
              readinessGates: [
                {
                  conditionType: "conditionType_example",
                },
              ],
              resourceClaims: [
                {
                  name: "name_example",
                  resourceClaimName: "resourceClaimName_example",
                  resourceClaimTemplateName: "resourceClaimTemplateName_example",
                },
              ],
              resources: {
                claims: [
                  {
                    name: "name_example",
                    request: "request_example",
                  },
                ],
                limits: {
                  "key": "key_example",
                },
                requests: {
                  "key": "key_example",
                },
              },
              restartPolicy: "restartPolicy_example",
              runtimeClassName: "runtimeClassName_example",
              schedulerName: "schedulerName_example",
              schedulingGates: [
                {
                  name: "name_example",
                },
              ],
              securityContext: {
                appArmorProfile: {
                  localhostProfile: "localhostProfile_example",
                  type: "type_example",
                },
                fsGroup: 1,
                fsGroupChangePolicy: "fsGroupChangePolicy_example",
                runAsGroup: 1,
                runAsNonRoot: true,
                runAsUser: 1,
                seLinuxChangePolicy: "seLinuxChangePolicy_example",
                seLinuxOptions: {
                  level: "level_example",
                  role: "role_example",
                  type: "type_example",
                  user: "user_example",
                },
                seccompProfile: {
                  localhostProfile: "localhostProfile_example",
                  type: "type_example",
                },
                supplementalGroups: [
                  1,
                ],
                supplementalGroupsPolicy: "supplementalGroupsPolicy_example",
                sysctls: [
                  {
                    name: "name_example",
                    value: "value_example",
                  },
                ],
                windowsOptions: {
                  gmsaCredentialSpec: "gmsaCredentialSpec_example",
                  gmsaCredentialSpecName: "gmsaCredentialSpecName_example",
                  hostProcess: true,
                  runAsUserName: "runAsUserName_example",
                },
              },
              serviceAccount: "serviceAccount_example",
              serviceAccountName: "serviceAccountName_example",
              setHostnameAsFQDN: true,
              shareProcessNamespace: true,
              subdomain: "subdomain_example",
              terminationGracePeriodSeconds: 1,
              tolerations: [
                {
                  effect: "effect_example",
                  key: "key_example",
                  operator: "operator_example",
                  tolerationSeconds: 1,
                  value: "value_example",
                },
              ],
              topologySpreadConstraints: [
                {
                  labelSelector: {
                    matchExpressions: [
                      {
                        key: "key_example",
                        operator: "operator_example",
                        values: [
                          "values_example",
                        ],
                      },
                    ],
                    matchLabels: {
                      "key": "key_example",
                    },
                  },
                  matchLabelKeys: [
                    "matchLabelKeys_example",
                  ],
                  maxSkew: 1,
                  minDomains: 1,
                  nodeAffinityPolicy: "nodeAffinityPolicy_example",
                  nodeTaintsPolicy: "nodeTaintsPolicy_example",
                  topologyKey: "topologyKey_example",
                  whenUnsatisfiable: "whenUnsatisfiable_example",
                },
              ],
              volumes: [
                {
                  awsElasticBlockStore: {
                    fsType: "fsType_example",
                    partition: 1,
                    readOnly: true,
                    volumeID: "volumeID_example",
                  },
                  azureDisk: {
                    cachingMode: "cachingMode_example",
                    diskName: "diskName_example",
                    diskURI: "diskURI_example",
                    fsType: "fsType_example",
                    kind: "kind_example",
                    readOnly: true,
                  },
                  azureFile: {
                    readOnly: true,
                    secretName: "secretName_example",
                    shareName: "shareName_example",
                  },
                  cephfs: {
                    monitors: [
                      "monitors_example",
                    ],
                    path: "path_example",
                    readOnly: true,
                    secretFile: "secretFile_example",
                    secretRef: {
                      name: "name_example",
                    },
                    user: "user_example",
                  },
                  cinder: {
                    fsType: "fsType_example",
                    readOnly: true,
                    secretRef: {
                      name: "name_example",
                    },
                    volumeID: "volumeID_example",
                  },
                  configMap: {
                    defaultMode: 1,
                    items: [
                      {
                        key: "key_example",
                        mode: 1,
                        path: "path_example",
                      },
                    ],
                    name: "name_example",
                    optional: true,
                  },
                  csi: {
                    driver: "driver_example",
                    fsType: "fsType_example",
                    nodePublishSecretRef: {
                      name: "name_example",
                    },
                    readOnly: true,
                    volumeAttributes: {
                      "key": "key_example",
                    },
                  },
                  downwardAPI: {
                    defaultMode: 1,
                    items: [
                      {
                        fieldRef: {
                          apiVersion: "apiVersion_example",
                          fieldPath: "fieldPath_example",
                        },
                        mode: 1,
                        path: "path_example",
                        resourceFieldRef: {
                          containerName: "containerName_example",
                          divisor: "divisor_example",
                          resource: "resource_example",
                        },
                      },
                    ],
                  },
                  emptyDir: {
                    medium: "medium_example",
                    sizeLimit: "sizeLimit_example",
                  },
                  ephemeral: {
                    volumeClaimTemplate: {
                      metadata: {
                        annotations: {
                          "key": "key_example",
                        },
                        creationTimestamp: new Date('1970-01-01T00:00:00.00Z'),
                        deletionGracePeriodSeconds: 1,
                        deletionTimestamp: new Date('1970-01-01T00:00:00.00Z'),
                        finalizers: [
                          "finalizers_example",
                        ],
                        generateName: "generateName_example",
                        generation: 1,
                        labels: {
                          "key": "key_example",
                        },
                        managedFields: [
                          {
                            apiVersion: "apiVersion_example",
                            fieldsType: "fieldsType_example",
                            fieldsV1: {},
                            manager: "manager_example",
                            operation: "operation_example",
                            subresource: "subresource_example",
                            time: new Date('1970-01-01T00:00:00.00Z'),
                          },
                        ],
                        name: "name_example",
                        namespace: "namespace_example",
                        ownerReferences: [
                          {
                            apiVersion: "apiVersion_example",
                            blockOwnerDeletion: true,
                            controller: true,
                            kind: "kind_example",
                            name: "name_example",
                            uid: "uid_example",
                          },
                        ],
                        resourceVersion: "resourceVersion_example",
                        selfLink: "selfLink_example",
                        uid: "uid_example",
                      },
                      spec: {
                        accessModes: [
                          "accessModes_example",
                        ],
                        dataSource: {
                          apiGroup: "apiGroup_example",
                          kind: "kind_example",
                          name: "name_example",
                        },
                        dataSourceRef: {
                          apiGroup: "apiGroup_example",
                          kind: "kind_example",
                          name: "name_example",
                          namespace: "namespace_example",
                        },
                        resources: {
                          limits: {
                            "key": "key_example",
                          },
                          requests: {
                            "key": "key_example",
                          },
                        },
                        selector: {
                          matchExpressions: [
                            {
                              key: "key_example",
                              operator: "operator_example",
                              values: [
                                "values_example",
                              ],
                            },
                          ],
                          matchLabels: {
                            "key": "key_example",
                          },
                        },
                        storageClassName: "storageClassName_example",
                        volumeAttributesClassName: "volumeAttributesClassName_example",
                        volumeMode: "volumeMode_example",
                        volumeName: "volumeName_example",
                      },
                    },
                  },
                  fc: {
                    fsType: "fsType_example",
                    lun: 1,
                    readOnly: true,
                    targetWWNs: [
                      "targetWWNs_example",
                    ],
                    wwids: [
                      "wwids_example",
                    ],
                  },
                  flexVolume: {
                    driver: "driver_example",
                    fsType: "fsType_example",
                    options: {
                      "key": "key_example",
                    },
                    readOnly: true,
                    secretRef: {
                      name: "name_example",
                    },
                  },
                  flocker: {
                    datasetName: "datasetName_example",
                    datasetUUID: "datasetUUID_example",
                  },
                  gcePersistentDisk: {
                    fsType: "fsType_example",
                    partition: 1,
                    pdName: "pdName_example",
                    readOnly: true,
                  },
                  gitRepo: {
                    directory: "directory_example",
                    repository: "repository_example",
                    revision: "revision_example",
                  },
                  glusterfs: {
                    endpoints: "endpoints_example",
                    path: "path_example",
                    readOnly: true,
                  },
                  hostPath: {
                    path: "path_example",
                    type: "type_example",
                  },
                  image: {
                    pullPolicy: "pullPolicy_example",
                    reference: "reference_example",
                  },
                  iscsi: {
                    chapAuthDiscovery: true,
                    chapAuthSession: true,
                    fsType: "fsType_example",
                    initiatorName: "initiatorName_example",
                    iqn: "iqn_example",
                    iscsiInterface: "iscsiInterface_example",
                    lun: 1,
                    portals: [
                      "portals_example",
                    ],
                    readOnly: true,
                    secretRef: {
                      name: "name_example",
                    },
                    targetPortal: "targetPortal_example",
                  },
                  name: "name_example",
                  nfs: {
                    path: "path_example",
                    readOnly: true,
                    server: "server_example",
                  },
                  persistentVolumeClaim: {
                    claimName: "claimName_example",
                    readOnly: true,
                  },
                  photonPersistentDisk: {
                    fsType: "fsType_example",
                    pdID: "pdID_example",
                  },
                  portworxVolume: {
                    fsType: "fsType_example",
                    readOnly: true,
                    volumeID: "volumeID_example",
                  },
                  projected: {
                    defaultMode: 1,
                    sources: [
                      {
                        clusterTrustBundle: {
                          labelSelector: {
                            matchExpressions: [
                              {
                                key: "key_example",
                                operator: "operator_example",
                                values: [
                                  "values_example",
                                ],
                              },
                            ],
                            matchLabels: {
                              "key": "key_example",
                            },
                          },
                          name: "name_example",
                          optional: true,
                          path: "path_example",
                          signerName: "signerName_example",
                        },
                        configMap: {
                          items: [
                            {
                              key: "key_example",
                              mode: 1,
                              path: "path_example",
                            },
                          ],
                          name: "name_example",
                          optional: true,
                        },
                        downwardAPI: {
                          items: [
                            {
                              fieldRef: {
                                apiVersion: "apiVersion_example",
                                fieldPath: "fieldPath_example",
                              },
                              mode: 1,
                              path: "path_example",
                              resourceFieldRef: {
                                containerName: "containerName_example",
                                divisor: "divisor_example",
                                resource: "resource_example",
                              },
                            },
                          ],
                        },
                        podCertificate: {
                          certificateChainPath: "certificateChainPath_example",
                          credentialBundlePath: "credentialBundlePath_example",
                          keyPath: "keyPath_example",
                          keyType: "keyType_example",
                          maxExpirationSeconds: 1,
                          signerName: "signerName_example",
                        },
                        secret: {
                          items: [
                            {
                              key: "key_example",
                              mode: 1,
                              path: "path_example",
                            },
                          ],
                          name: "name_example",
                          optional: true,
                        },
                        serviceAccountToken: {
                          audience: "audience_example",
                          expirationSeconds: 1,
                          path: "path_example",
                        },
                      },
                    ],
                  },
                  quobyte: {
                    group: "group_example",
                    readOnly: true,
                    registry: "registry_example",
                    tenant: "tenant_example",
                    user: "user_example",
                    volume: "volume_example",
                  },
                  rbd: {
                    fsType: "fsType_example",
                    image: "image_example",
                    keyring: "keyring_example",
                    monitors: [
                      "monitors_example",
                    ],
                    pool: "pool_example",
                    readOnly: true,
                    secretRef: {
                      name: "name_example",
                    },
                    user: "user_example",
                  },
                  scaleIO: {
                    fsType: "fsType_example",
                    gateway: "gateway_example",
                    protectionDomain: "protectionDomain_example",
                    readOnly: true,
                    secretRef: {
                      name: "name_example",
                    },
                    sslEnabled: true,
                    storageMode: "storageMode_example",
                    storagePool: "storagePool_example",
                    system: "system_example",
                    volumeName: "volumeName_example",
                  },
                  secret: {
                    defaultMode: 1,
                    items: [
                      {
                        key: "key_example",
                        mode: 1,
                        path: "path_example",
                      },
                    ],
                    optional: true,
                    secretName: "secretName_example",
                  },
                  storageos: {
                    fsType: "fsType_example",
                    readOnly: true,
                    secretRef: {
                      name: "name_example",
                    },
                    volumeName: "volumeName_example",
                    volumeNamespace: "volumeNamespace_example",
                  },
                  vsphereVolume: {
                    fsType: "fsType_example",
                    storagePolicyID: "storagePolicyID_example",
                    storagePolicyName: "storagePolicyName_example",
                    volumePath: "volumePath_example",
                  },
                },
              ],
            },
          },
          ttlSecondsAfterFinished: 1,
        },
      },
      schedule: "schedule_example",
      startingDeadlineSeconds: 1,
      successfulJobsHistoryLimit: 1,
      suspend: true,
      timeZone: "timeZone_example",
    },
    status: {
      active: [
        {
          apiVersion: "apiVersion_example",
          fieldPath: "fieldPath_example",
          kind: "kind_example",
          name: "name_example",
          namespace: "namespace_example",
          resourceVersion: "resourceVersion_example",
          uid: "uid_example",
        },
      ],
      lastScheduleTime: new Date('1970-01-01T00:00:00.00Z'),
      lastSuccessfulTime: new Date('1970-01-01T00:00:00.00Z'),
    },
  },
    // If \'true\', then the output is pretty printed. Defaults to \'false\' unless the user-agent indicates a browser or command-line HTTP tool (curl and wget). (optional)
  pretty: "pretty_example",
    // When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed (optional)
  dryRun: "dryRun_example",
    // fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. (optional)
  fieldManager: "fieldManager_example",
    // fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. (optional)
  fieldValidation: "fieldValidation_example",
};

const data = await apiInstance.replaceNamespacedCronJob(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **V1CronJob**|  |
 **name** | [**string**] | name of the CronJob | defaults to undefined
 **namespace** | [**string**] | object name and auth scope, such as for teams and projects | defaults to undefined
 **pretty** | [**string**] | If \&#39;true\&#39;, then the output is pretty printed. Defaults to \&#39;false\&#39; unless the user-agent indicates a browser or command-line HTTP tool (curl and wget). | (optional) defaults to undefined
 **dryRun** | [**string**] | When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed | (optional) defaults to undefined
 **fieldManager** | [**string**] | fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. | (optional) defaults to undefined
 **fieldValidation** | [**string**] | fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. | (optional) defaults to undefined


### Return type

**V1CronJob**

### Authorization

[BearerToken](README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf, application/cbor


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**201** | Created |  -  |
**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **replaceNamespacedCronJobStatus**
> V1CronJob replaceNamespacedCronJobStatus(body)

replace status of the specified CronJob

### Example


```typescript
import { createConfiguration, BatchV1Api } from '';
import type { BatchV1ApiReplaceNamespacedCronJobStatusRequest } from '';

const configuration = createConfiguration();
const apiInstance = new BatchV1Api(configuration);

const request: BatchV1ApiReplaceNamespacedCronJobStatusRequest = {
    // name of the CronJob
  name: "name_example",
    // object name and auth scope, such as for teams and projects
  namespace: "namespace_example",
  
  body: {
    apiVersion: "apiVersion_example",
    kind: "kind_example",
    metadata: {
      annotations: {
        "key": "key_example",
      },
      creationTimestamp: new Date('1970-01-01T00:00:00.00Z'),
      deletionGracePeriodSeconds: 1,
      deletionTimestamp: new Date('1970-01-01T00:00:00.00Z'),
      finalizers: [
        "finalizers_example",
      ],
      generateName: "generateName_example",
      generation: 1,
      labels: {
        "key": "key_example",
      },
      managedFields: [
        {
          apiVersion: "apiVersion_example",
          fieldsType: "fieldsType_example",
          fieldsV1: {},
          manager: "manager_example",
          operation: "operation_example",
          subresource: "subresource_example",
          time: new Date('1970-01-01T00:00:00.00Z'),
        },
      ],
      name: "name_example",
      namespace: "namespace_example",
      ownerReferences: [
        {
          apiVersion: "apiVersion_example",
          blockOwnerDeletion: true,
          controller: true,
          kind: "kind_example",
          name: "name_example",
          uid: "uid_example",
        },
      ],
      resourceVersion: "resourceVersion_example",
      selfLink: "selfLink_example",
      uid: "uid_example",
    },
    spec: {
      concurrencyPolicy: "concurrencyPolicy_example",
      failedJobsHistoryLimit: 1,
      jobTemplate: {
        metadata: {
          annotations: {
            "key": "key_example",
          },
          creationTimestamp: new Date('1970-01-01T00:00:00.00Z'),
          deletionGracePeriodSeconds: 1,
          deletionTimestamp: new Date('1970-01-01T00:00:00.00Z'),
          finalizers: [
            "finalizers_example",
          ],
          generateName: "generateName_example",
          generation: 1,
          labels: {
            "key": "key_example",
          },
          managedFields: [
            {
              apiVersion: "apiVersion_example",
              fieldsType: "fieldsType_example",
              fieldsV1: {},
              manager: "manager_example",
              operation: "operation_example",
              subresource: "subresource_example",
              time: new Date('1970-01-01T00:00:00.00Z'),
            },
          ],
          name: "name_example",
          namespace: "namespace_example",
          ownerReferences: [
            {
              apiVersion: "apiVersion_example",
              blockOwnerDeletion: true,
              controller: true,
              kind: "kind_example",
              name: "name_example",
              uid: "uid_example",
            },
          ],
          resourceVersion: "resourceVersion_example",
          selfLink: "selfLink_example",
          uid: "uid_example",
        },
        spec: {
          activeDeadlineSeconds: 1,
          backoffLimit: 1,
          backoffLimitPerIndex: 1,
          completionMode: "completionMode_example",
          completions: 1,
          managedBy: "managedBy_example",
          manualSelector: true,
          maxFailedIndexes: 1,
          parallelism: 1,
          podFailurePolicy: {
            rules: [
              {
                action: "action_example",
                onExitCodes: {
                  containerName: "containerName_example",
                  operator: "operator_example",
                  values: [
                    1,
                  ],
                },
                onPodConditions: [
                  {
                    status: "status_example",
                    type: "type_example",
                  },
                ],
              },
            ],
          },
          podReplacementPolicy: "podReplacementPolicy_example",
          selector: {
            matchExpressions: [
              {
                key: "key_example",
                operator: "operator_example",
                values: [
                  "values_example",
                ],
              },
            ],
            matchLabels: {
              "key": "key_example",
            },
          },
          successPolicy: {
            rules: [
              {
                succeededCount: 1,
                succeededIndexes: "succeededIndexes_example",
              },
            ],
          },
          suspend: true,
          template: {
            metadata: {
              annotations: {
                "key": "key_example",
              },
              creationTimestamp: new Date('1970-01-01T00:00:00.00Z'),
              deletionGracePeriodSeconds: 1,
              deletionTimestamp: new Date('1970-01-01T00:00:00.00Z'),
              finalizers: [
                "finalizers_example",
              ],
              generateName: "generateName_example",
              generation: 1,
              labels: {
                "key": "key_example",
              },
              managedFields: [
                {
                  apiVersion: "apiVersion_example",
                  fieldsType: "fieldsType_example",
                  fieldsV1: {},
                  manager: "manager_example",
                  operation: "operation_example",
                  subresource: "subresource_example",
                  time: new Date('1970-01-01T00:00:00.00Z'),
                },
              ],
              name: "name_example",
              namespace: "namespace_example",
              ownerReferences: [
                {
                  apiVersion: "apiVersion_example",
                  blockOwnerDeletion: true,
                  controller: true,
                  kind: "kind_example",
                  name: "name_example",
                  uid: "uid_example",
                },
              ],
              resourceVersion: "resourceVersion_example",
              selfLink: "selfLink_example",
              uid: "uid_example",
            },
            spec: {
              activeDeadlineSeconds: 1,
              affinity: {
                nodeAffinity: {
                  preferredDuringSchedulingIgnoredDuringExecution: [
                    {
                      preference: {
                        matchExpressions: [
                          {
                            key: "key_example",
                            operator: "operator_example",
                            values: [
                              "values_example",
                            ],
                          },
                        ],
                        matchFields: [
                          {
                            key: "key_example",
                            operator: "operator_example",
                            values: [
                              "values_example",
                            ],
                          },
                        ],
                      },
                      weight: 1,
                    },
                  ],
                  requiredDuringSchedulingIgnoredDuringExecution: {
                    nodeSelectorTerms: [
                      {
                        matchExpressions: [
                          {
                            key: "key_example",
                            operator: "operator_example",
                            values: [
                              "values_example",
                            ],
                          },
                        ],
                        matchFields: [
                          {
                            key: "key_example",
                            operator: "operator_example",
                            values: [
                              "values_example",
                            ],
                          },
                        ],
                      },
                    ],
                  },
                },
                podAffinity: {
                  preferredDuringSchedulingIgnoredDuringExecution: [
                    {
                      podAffinityTerm: {
                        labelSelector: {
                          matchExpressions: [
                            {
                              key: "key_example",
                              operator: "operator_example",
                              values: [
                                "values_example",
                              ],
                            },
                          ],
                          matchLabels: {
                            "key": "key_example",
                          },
                        },
                        matchLabelKeys: [
                          "matchLabelKeys_example",
                        ],
                        mismatchLabelKeys: [
                          "mismatchLabelKeys_example",
                        ],
                        namespaceSelector: {
                          matchExpressions: [
                            {
                              key: "key_example",
                              operator: "operator_example",
                              values: [
                                "values_example",
                              ],
                            },
                          ],
                          matchLabels: {
                            "key": "key_example",
                          },
                        },
                        namespaces: [
                          "namespaces_example",
                        ],
                        topologyKey: "topologyKey_example",
                      },
                      weight: 1,
                    },
                  ],
                  requiredDuringSchedulingIgnoredDuringExecution: [
                    {
                      labelSelector: {
                        matchExpressions: [
                          {
                            key: "key_example",
                            operator: "operator_example",
                            values: [
                              "values_example",
                            ],
                          },
                        ],
                        matchLabels: {
                          "key": "key_example",
                        },
                      },
                      matchLabelKeys: [
                        "matchLabelKeys_example",
                      ],
                      mismatchLabelKeys: [
                        "mismatchLabelKeys_example",
                      ],
                      namespaceSelector: {
                        matchExpressions: [
                          {
                            key: "key_example",
                            operator: "operator_example",
                            values: [
                              "values_example",
                            ],
                          },
                        ],
                        matchLabels: {
                          "key": "key_example",
                        },
                      },
                      namespaces: [
                        "namespaces_example",
                      ],
                      topologyKey: "topologyKey_example",
                    },
                  ],
                },
                podAntiAffinity: {
                  preferredDuringSchedulingIgnoredDuringExecution: [
                    {
                      podAffinityTerm: {
                        labelSelector: {
                          matchExpressions: [
                            {
                              key: "key_example",
                              operator: "operator_example",
                              values: [
                                "values_example",
                              ],
                            },
                          ],
                          matchLabels: {
                            "key": "key_example",
                          },
                        },
                        matchLabelKeys: [
                          "matchLabelKeys_example",
                        ],
                        mismatchLabelKeys: [
                          "mismatchLabelKeys_example",
                        ],
                        namespaceSelector: {
                          matchExpressions: [
                            {
                              key: "key_example",
                              operator: "operator_example",
                              values: [
                                "values_example",
                              ],
                            },
                          ],
                          matchLabels: {
                            "key": "key_example",
                          },
                        },
                        namespaces: [
                          "namespaces_example",
                        ],
                        topologyKey: "topologyKey_example",
                      },
                      weight: 1,
                    },
                  ],
                  requiredDuringSchedulingIgnoredDuringExecution: [
                    {
                      labelSelector: {
                        matchExpressions: [
                          {
                            key: "key_example",
                            operator: "operator_example",
                            values: [
                              "values_example",
                            ],
                          },
                        ],
                        matchLabels: {
                          "key": "key_example",
                        },
                      },
                      matchLabelKeys: [
                        "matchLabelKeys_example",
                      ],
                      mismatchLabelKeys: [
                        "mismatchLabelKeys_example",
                      ],
                      namespaceSelector: {
                        matchExpressions: [
                          {
                            key: "key_example",
                            operator: "operator_example",
                            values: [
                              "values_example",
                            ],
                          },
                        ],
                        matchLabels: {
                          "key": "key_example",
                        },
                      },
                      namespaces: [
                        "namespaces_example",
                      ],
                      topologyKey: "topologyKey_example",
                    },
                  ],
                },
              },
              automountServiceAccountToken: true,
              containers: [
                {
                  args: [
                    "args_example",
                  ],
                  command: [
                    "command_example",
                  ],
                  env: [
                    {
                      name: "name_example",
                      value: "value_example",
                      valueFrom: {
                        configMapKeyRef: {
                          key: "key_example",
                          name: "name_example",
                          optional: true,
                        },
                        fieldRef: {
                          apiVersion: "apiVersion_example",
                          fieldPath: "fieldPath_example",
                        },
                        fileKeyRef: {
                          key: "key_example",
                          optional: true,
                          path: "path_example",
                          volumeName: "volumeName_example",
                        },
                        resourceFieldRef: {
                          containerName: "containerName_example",
                          divisor: "divisor_example",
                          resource: "resource_example",
                        },
                        secretKeyRef: {
                          key: "key_example",
                          name: "name_example",
                          optional: true,
                        },
                      },
                    },
                  ],
                  envFrom: [
                    {
                      configMapRef: {
                        name: "name_example",
                        optional: true,
                      },
                      prefix: "prefix_example",
                      secretRef: {
                        name: "name_example",
                        optional: true,
                      },
                    },
                  ],
                  image: "image_example",
                  imagePullPolicy: "imagePullPolicy_example",
                  lifecycle: {
                    postStart: {
                      exec: {
                        command: [
                          "command_example",
                        ],
                      },
                      httpGet: {
                        host: "host_example",
                        httpHeaders: [
                          {
                            name: "name_example",
                            value: "value_example",
                          },
                        ],
                        path: "path_example",
                        port: "port_example",
                        scheme: "scheme_example",
                      },
                      sleep: {
                        seconds: 1,
                      },
                      tcpSocket: {
                        host: "host_example",
                        port: "port_example",
                      },
                    },
                    preStop: {
                      exec: {
                        command: [
                          "command_example",
                        ],
                      },
                      httpGet: {
                        host: "host_example",
                        httpHeaders: [
                          {
                            name: "name_example",
                            value: "value_example",
                          },
                        ],
                        path: "path_example",
                        port: "port_example",
                        scheme: "scheme_example",
                      },
                      sleep: {
                        seconds: 1,
                      },
                      tcpSocket: {
                        host: "host_example",
                        port: "port_example",
                      },
                    },
                    stopSignal: "stopSignal_example",
                  },
                  livenessProbe: {
                    exec: {
                      command: [
                        "command_example",
                      ],
                    },
                    failureThreshold: 1,
                    grpc: {
                      port: 1,
                      service: "service_example",
                    },
                    httpGet: {
                      host: "host_example",
                      httpHeaders: [
                        {
                          name: "name_example",
                          value: "value_example",
                        },
                      ],
                      path: "path_example",
                      port: "port_example",
                      scheme: "scheme_example",
                    },
                    initialDelaySeconds: 1,
                    periodSeconds: 1,
                    successThreshold: 1,
                    tcpSocket: {
                      host: "host_example",
                      port: "port_example",
                    },
                    terminationGracePeriodSeconds: 1,
                    timeoutSeconds: 1,
                  },
                  name: "name_example",
                  ports: [
                    {
                      containerPort: 1,
                      hostIP: "hostIP_example",
                      hostPort: 1,
                      name: "name_example",
                      protocol: "protocol_example",
                    },
                  ],
                  readinessProbe: {
                    exec: {
                      command: [
                        "command_example",
                      ],
                    },
                    failureThreshold: 1,
                    grpc: {
                      port: 1,
                      service: "service_example",
                    },
                    httpGet: {
                      host: "host_example",
                      httpHeaders: [
                        {
                          name: "name_example",
                          value: "value_example",
                        },
                      ],
                      path: "path_example",
                      port: "port_example",
                      scheme: "scheme_example",
                    },
                    initialDelaySeconds: 1,
                    periodSeconds: 1,
                    successThreshold: 1,
                    tcpSocket: {
                      host: "host_example",
                      port: "port_example",
                    },
                    terminationGracePeriodSeconds: 1,
                    timeoutSeconds: 1,
                  },
                  resizePolicy: [
                    {
                      resourceName: "resourceName_example",
                      restartPolicy: "restartPolicy_example",
                    },
                  ],
                  resources: {
                    claims: [
                      {
                        name: "name_example",
                        request: "request_example",
                      },
                    ],
                    limits: {
                      "key": "key_example",
                    },
                    requests: {
                      "key": "key_example",
                    },
                  },
                  restartPolicy: "restartPolicy_example",
                  restartPolicyRules: [
                    {
                      action: "action_example",
                      exitCodes: {
                        operator: "operator_example",
                        values: [
                          1,
                        ],
                      },
                    },
                  ],
                  securityContext: {
                    allowPrivilegeEscalation: true,
                    appArmorProfile: {
                      localhostProfile: "localhostProfile_example",
                      type: "type_example",
                    },
                    capabilities: {
                      add: [
                        "add_example",
                      ],
                      drop: [
                        "drop_example",
                      ],
                    },
                    privileged: true,
                    procMount: "procMount_example",
                    readOnlyRootFilesystem: true,
                    runAsGroup: 1,
                    runAsNonRoot: true,
                    runAsUser: 1,
                    seLinuxOptions: {
                      level: "level_example",
                      role: "role_example",
                      type: "type_example",
                      user: "user_example",
                    },
                    seccompProfile: {
                      localhostProfile: "localhostProfile_example",
                      type: "type_example",
                    },
                    windowsOptions: {
                      gmsaCredentialSpec: "gmsaCredentialSpec_example",
                      gmsaCredentialSpecName: "gmsaCredentialSpecName_example",
                      hostProcess: true,
                      runAsUserName: "runAsUserName_example",
                    },
                  },
                  startupProbe: {
                    exec: {
                      command: [
                        "command_example",
                      ],
                    },
                    failureThreshold: 1,
                    grpc: {
                      port: 1,
                      service: "service_example",
                    },
                    httpGet: {
                      host: "host_example",
                      httpHeaders: [
                        {
                          name: "name_example",
                          value: "value_example",
                        },
                      ],
                      path: "path_example",
                      port: "port_example",
                      scheme: "scheme_example",
                    },
                    initialDelaySeconds: 1,
                    periodSeconds: 1,
                    successThreshold: 1,
                    tcpSocket: {
                      host: "host_example",
                      port: "port_example",
                    },
                    terminationGracePeriodSeconds: 1,
                    timeoutSeconds: 1,
                  },
                  stdin: true,
                  stdinOnce: true,
                  terminationMessagePath: "terminationMessagePath_example",
                  terminationMessagePolicy: "terminationMessagePolicy_example",
                  tty: true,
                  volumeDevices: [
                    {
                      devicePath: "devicePath_example",
                      name: "name_example",
                    },
                  ],
                  volumeMounts: [
                    {
                      mountPath: "mountPath_example",
                      mountPropagation: "mountPropagation_example",
                      name: "name_example",
                      readOnly: true,
                      recursiveReadOnly: "recursiveReadOnly_example",
                      subPath: "subPath_example",
                      subPathExpr: "subPathExpr_example",
                    },
                  ],
                  workingDir: "workingDir_example",
                },
              ],
              dnsConfig: {
                nameservers: [
                  "nameservers_example",
                ],
                options: [
                  {
                    name: "name_example",
                    value: "value_example",
                  },
                ],
                searches: [
                  "searches_example",
                ],
              },
              dnsPolicy: "dnsPolicy_example",
              enableServiceLinks: true,
              ephemeralContainers: [
                {
                  args: [
                    "args_example",
                  ],
                  command: [
                    "command_example",
                  ],
                  env: [
                    {
                      name: "name_example",
                      value: "value_example",
                      valueFrom: {
                        configMapKeyRef: {
                          key: "key_example",
                          name: "name_example",
                          optional: true,
                        },
                        fieldRef: {
                          apiVersion: "apiVersion_example",
                          fieldPath: "fieldPath_example",
                        },
                        fileKeyRef: {
                          key: "key_example",
                          optional: true,
                          path: "path_example",
                          volumeName: "volumeName_example",
                        },
                        resourceFieldRef: {
                          containerName: "containerName_example",
                          divisor: "divisor_example",
                          resource: "resource_example",
                        },
                        secretKeyRef: {
                          key: "key_example",
                          name: "name_example",
                          optional: true,
                        },
                      },
                    },
                  ],
                  envFrom: [
                    {
                      configMapRef: {
                        name: "name_example",
                        optional: true,
                      },
                      prefix: "prefix_example",
                      secretRef: {
                        name: "name_example",
                        optional: true,
                      },
                    },
                  ],
                  image: "image_example",
                  imagePullPolicy: "imagePullPolicy_example",
                  lifecycle: {
                    postStart: {
                      exec: {
                        command: [
                          "command_example",
                        ],
                      },
                      httpGet: {
                        host: "host_example",
                        httpHeaders: [
                          {
                            name: "name_example",
                            value: "value_example",
                          },
                        ],
                        path: "path_example",
                        port: "port_example",
                        scheme: "scheme_example",
                      },
                      sleep: {
                        seconds: 1,
                      },
                      tcpSocket: {
                        host: "host_example",
                        port: "port_example",
                      },
                    },
                    preStop: {
                      exec: {
                        command: [
                          "command_example",
                        ],
                      },
                      httpGet: {
                        host: "host_example",
                        httpHeaders: [
                          {
                            name: "name_example",
                            value: "value_example",
                          },
                        ],
                        path: "path_example",
                        port: "port_example",
                        scheme: "scheme_example",
                      },
                      sleep: {
                        seconds: 1,
                      },
                      tcpSocket: {
                        host: "host_example",
                        port: "port_example",
                      },
                    },
                    stopSignal: "stopSignal_example",
                  },
                  livenessProbe: {
                    exec: {
                      command: [
                        "command_example",
                      ],
                    },
                    failureThreshold: 1,
                    grpc: {
                      port: 1,
                      service: "service_example",
                    },
                    httpGet: {
                      host: "host_example",
                      httpHeaders: [
                        {
                          name: "name_example",
                          value: "value_example",
                        },
                      ],
                      path: "path_example",
                      port: "port_example",
                      scheme: "scheme_example",
                    },
                    initialDelaySeconds: 1,
                    periodSeconds: 1,
                    successThreshold: 1,
                    tcpSocket: {
                      host: "host_example",
                      port: "port_example",
                    },
                    terminationGracePeriodSeconds: 1,
                    timeoutSeconds: 1,
                  },
                  name: "name_example",
                  ports: [
                    {
                      containerPort: 1,
                      hostIP: "hostIP_example",
                      hostPort: 1,
                      name: "name_example",
                      protocol: "protocol_example",
                    },
                  ],
                  readinessProbe: {
                    exec: {
                      command: [
                        "command_example",
                      ],
                    },
                    failureThreshold: 1,
                    grpc: {
                      port: 1,
                      service: "service_example",
                    },
                    httpGet: {
                      host: "host_example",
                      httpHeaders: [
                        {
                          name: "name_example",
                          value: "value_example",
                        },
                      ],
                      path: "path_example",
                      port: "port_example",
                      scheme: "scheme_example",
                    },
                    initialDelaySeconds: 1,
                    periodSeconds: 1,
                    successThreshold: 1,
                    tcpSocket: {
                      host: "host_example",
                      port: "port_example",
                    },
                    terminationGracePeriodSeconds: 1,
                    timeoutSeconds: 1,
                  },
                  resizePolicy: [
                    {
                      resourceName: "resourceName_example",
                      restartPolicy: "restartPolicy_example",
                    },
                  ],
                  resources: {
                    claims: [
                      {
                        name: "name_example",
                        request: "request_example",
                      },
                    ],
                    limits: {
                      "key": "key_example",
                    },
                    requests: {
                      "key": "key_example",
                    },
                  },
                  restartPolicy: "restartPolicy_example",
                  restartPolicyRules: [
                    {
                      action: "action_example",
                      exitCodes: {
                        operator: "operator_example",
                        values: [
                          1,
                        ],
                      },
                    },
                  ],
                  securityContext: {
                    allowPrivilegeEscalation: true,
                    appArmorProfile: {
                      localhostProfile: "localhostProfile_example",
                      type: "type_example",
                    },
                    capabilities: {
                      add: [
                        "add_example",
                      ],
                      drop: [
                        "drop_example",
                      ],
                    },
                    privileged: true,
                    procMount: "procMount_example",
                    readOnlyRootFilesystem: true,
                    runAsGroup: 1,
                    runAsNonRoot: true,
                    runAsUser: 1,
                    seLinuxOptions: {
                      level: "level_example",
                      role: "role_example",
                      type: "type_example",
                      user: "user_example",
                    },
                    seccompProfile: {
                      localhostProfile: "localhostProfile_example",
                      type: "type_example",
                    },
                    windowsOptions: {
                      gmsaCredentialSpec: "gmsaCredentialSpec_example",
                      gmsaCredentialSpecName: "gmsaCredentialSpecName_example",
                      hostProcess: true,
                      runAsUserName: "runAsUserName_example",
                    },
                  },
                  startupProbe: {
                    exec: {
                      command: [
                        "command_example",
                      ],
                    },
                    failureThreshold: 1,
                    grpc: {
                      port: 1,
                      service: "service_example",
                    },
                    httpGet: {
                      host: "host_example",
                      httpHeaders: [
                        {
                          name: "name_example",
                          value: "value_example",
                        },
                      ],
                      path: "path_example",
                      port: "port_example",
                      scheme: "scheme_example",
                    },
                    initialDelaySeconds: 1,
                    periodSeconds: 1,
                    successThreshold: 1,
                    tcpSocket: {
                      host: "host_example",
                      port: "port_example",
                    },
                    terminationGracePeriodSeconds: 1,
                    timeoutSeconds: 1,
                  },
                  stdin: true,
                  stdinOnce: true,
                  targetContainerName: "targetContainerName_example",
                  terminationMessagePath: "terminationMessagePath_example",
                  terminationMessagePolicy: "terminationMessagePolicy_example",
                  tty: true,
                  volumeDevices: [
                    {
                      devicePath: "devicePath_example",
                      name: "name_example",
                    },
                  ],
                  volumeMounts: [
                    {
                      mountPath: "mountPath_example",
                      mountPropagation: "mountPropagation_example",
                      name: "name_example",
                      readOnly: true,
                      recursiveReadOnly: "recursiveReadOnly_example",
                      subPath: "subPath_example",
                      subPathExpr: "subPathExpr_example",
                    },
                  ],
                  workingDir: "workingDir_example",
                },
              ],
              hostAliases: [
                {
                  hostnames: [
                    "hostnames_example",
                  ],
                  ip: "ip_example",
                },
              ],
              hostIPC: true,
              hostNetwork: true,
              hostPID: true,
              hostUsers: true,
              hostname: "hostname_example",
              hostnameOverride: "hostnameOverride_example",
              imagePullSecrets: [
                {
                  name: "name_example",
                },
              ],
              initContainers: [
                {
                  args: [
                    "args_example",
                  ],
                  command: [
                    "command_example",
                  ],
                  env: [
                    {
                      name: "name_example",
                      value: "value_example",
                      valueFrom: {
                        configMapKeyRef: {
                          key: "key_example",
                          name: "name_example",
                          optional: true,
                        },
                        fieldRef: {
                          apiVersion: "apiVersion_example",
                          fieldPath: "fieldPath_example",
                        },
                        fileKeyRef: {
                          key: "key_example",
                          optional: true,
                          path: "path_example",
                          volumeName: "volumeName_example",
                        },
                        resourceFieldRef: {
                          containerName: "containerName_example",
                          divisor: "divisor_example",
                          resource: "resource_example",
                        },
                        secretKeyRef: {
                          key: "key_example",
                          name: "name_example",
                          optional: true,
                        },
                      },
                    },
                  ],
                  envFrom: [
                    {
                      configMapRef: {
                        name: "name_example",
                        optional: true,
                      },
                      prefix: "prefix_example",
                      secretRef: {
                        name: "name_example",
                        optional: true,
                      },
                    },
                  ],
                  image: "image_example",
                  imagePullPolicy: "imagePullPolicy_example",
                  lifecycle: {
                    postStart: {
                      exec: {
                        command: [
                          "command_example",
                        ],
                      },
                      httpGet: {
                        host: "host_example",
                        httpHeaders: [
                          {
                            name: "name_example",
                            value: "value_example",
                          },
                        ],
                        path: "path_example",
                        port: "port_example",
                        scheme: "scheme_example",
                      },
                      sleep: {
                        seconds: 1,
                      },
                      tcpSocket: {
                        host: "host_example",
                        port: "port_example",
                      },
                    },
                    preStop: {
                      exec: {
                        command: [
                          "command_example",
                        ],
                      },
                      httpGet: {
                        host: "host_example",
                        httpHeaders: [
                          {
                            name: "name_example",
                            value: "value_example",
                          },
                        ],
                        path: "path_example",
                        port: "port_example",
                        scheme: "scheme_example",
                      },
                      sleep: {
                        seconds: 1,
                      },
                      tcpSocket: {
                        host: "host_example",
                        port: "port_example",
                      },
                    },
                    stopSignal: "stopSignal_example",
                  },
                  livenessProbe: {
                    exec: {
                      command: [
                        "command_example",
                      ],
                    },
                    failureThreshold: 1,
                    grpc: {
                      port: 1,
                      service: "service_example",
                    },
                    httpGet: {
                      host: "host_example",
                      httpHeaders: [
                        {
                          name: "name_example",
                          value: "value_example",
                        },
                      ],
                      path: "path_example",
                      port: "port_example",
                      scheme: "scheme_example",
                    },
                    initialDelaySeconds: 1,
                    periodSeconds: 1,
                    successThreshold: 1,
                    tcpSocket: {
                      host: "host_example",
                      port: "port_example",
                    },
                    terminationGracePeriodSeconds: 1,
                    timeoutSeconds: 1,
                  },
                  name: "name_example",
                  ports: [
                    {
                      containerPort: 1,
                      hostIP: "hostIP_example",
                      hostPort: 1,
                      name: "name_example",
                      protocol: "protocol_example",
                    },
                  ],
                  readinessProbe: {
                    exec: {
                      command: [
                        "command_example",
                      ],
                    },
                    failureThreshold: 1,
                    grpc: {
                      port: 1,
                      service: "service_example",
                    },
                    httpGet: {
                      host: "host_example",
                      httpHeaders: [
                        {
                          name: "name_example",
                          value: "value_example",
                        },
                      ],
                      path: "path_example",
                      port: "port_example",
                      scheme: "scheme_example",
                    },
                    initialDelaySeconds: 1,
                    periodSeconds: 1,
                    successThreshold: 1,
                    tcpSocket: {
                      host: "host_example",
                      port: "port_example",
                    },
                    terminationGracePeriodSeconds: 1,
                    timeoutSeconds: 1,
                  },
                  resizePolicy: [
                    {
                      resourceName: "resourceName_example",
                      restartPolicy: "restartPolicy_example",
                    },
                  ],
                  resources: {
                    claims: [
                      {
                        name: "name_example",
                        request: "request_example",
                      },
                    ],
                    limits: {
                      "key": "key_example",
                    },
                    requests: {
                      "key": "key_example",
                    },
                  },
                  restartPolicy: "restartPolicy_example",
                  restartPolicyRules: [
                    {
                      action: "action_example",
                      exitCodes: {
                        operator: "operator_example",
                        values: [
                          1,
                        ],
                      },
                    },
                  ],
                  securityContext: {
                    allowPrivilegeEscalation: true,
                    appArmorProfile: {
                      localhostProfile: "localhostProfile_example",
                      type: "type_example",
                    },
                    capabilities: {
                      add: [
                        "add_example",
                      ],
                      drop: [
                        "drop_example",
                      ],
                    },
                    privileged: true,
                    procMount: "procMount_example",
                    readOnlyRootFilesystem: true,
                    runAsGroup: 1,
                    runAsNonRoot: true,
                    runAsUser: 1,
                    seLinuxOptions: {
                      level: "level_example",
                      role: "role_example",
                      type: "type_example",
                      user: "user_example",
                    },
                    seccompProfile: {
                      localhostProfile: "localhostProfile_example",
                      type: "type_example",
                    },
                    windowsOptions: {
                      gmsaCredentialSpec: "gmsaCredentialSpec_example",
                      gmsaCredentialSpecName: "gmsaCredentialSpecName_example",
                      hostProcess: true,
                      runAsUserName: "runAsUserName_example",
                    },
                  },
                  startupProbe: {
                    exec: {
                      command: [
                        "command_example",
                      ],
                    },
                    failureThreshold: 1,
                    grpc: {
                      port: 1,
                      service: "service_example",
                    },
                    httpGet: {
                      host: "host_example",
                      httpHeaders: [
                        {
                          name: "name_example",
                          value: "value_example",
                        },
                      ],
                      path: "path_example",
                      port: "port_example",
                      scheme: "scheme_example",
                    },
                    initialDelaySeconds: 1,
                    periodSeconds: 1,
                    successThreshold: 1,
                    tcpSocket: {
                      host: "host_example",
                      port: "port_example",
                    },
                    terminationGracePeriodSeconds: 1,
                    timeoutSeconds: 1,
                  },
                  stdin: true,
                  stdinOnce: true,
                  terminationMessagePath: "terminationMessagePath_example",
                  terminationMessagePolicy: "terminationMessagePolicy_example",
                  tty: true,
                  volumeDevices: [
                    {
                      devicePath: "devicePath_example",
                      name: "name_example",
                    },
                  ],
                  volumeMounts: [
                    {
                      mountPath: "mountPath_example",
                      mountPropagation: "mountPropagation_example",
                      name: "name_example",
                      readOnly: true,
                      recursiveReadOnly: "recursiveReadOnly_example",
                      subPath: "subPath_example",
                      subPathExpr: "subPathExpr_example",
                    },
                  ],
                  workingDir: "workingDir_example",
                },
              ],
              nodeName: "nodeName_example",
              nodeSelector: {
                "key": "key_example",
              },
              os: {
                name: "name_example",
              },
              overhead: {
                "key": "key_example",
              },
              preemptionPolicy: "preemptionPolicy_example",
              priority: 1,
              priorityClassName: "priorityClassName_example",
              readinessGates: [
                {
                  conditionType: "conditionType_example",
                },
              ],
              resourceClaims: [
                {
                  name: "name_example",
                  resourceClaimName: "resourceClaimName_example",
                  resourceClaimTemplateName: "resourceClaimTemplateName_example",
                },
              ],
              resources: {
                claims: [
                  {
                    name: "name_example",
                    request: "request_example",
                  },
                ],
                limits: {
                  "key": "key_example",
                },
                requests: {
                  "key": "key_example",
                },
              },
              restartPolicy: "restartPolicy_example",
              runtimeClassName: "runtimeClassName_example",
              schedulerName: "schedulerName_example",
              schedulingGates: [
                {
                  name: "name_example",
                },
              ],
              securityContext: {
                appArmorProfile: {
                  localhostProfile: "localhostProfile_example",
                  type: "type_example",
                },
                fsGroup: 1,
                fsGroupChangePolicy: "fsGroupChangePolicy_example",
                runAsGroup: 1,
                runAsNonRoot: true,
                runAsUser: 1,
                seLinuxChangePolicy: "seLinuxChangePolicy_example",
                seLinuxOptions: {
                  level: "level_example",
                  role: "role_example",
                  type: "type_example",
                  user: "user_example",
                },
                seccompProfile: {
                  localhostProfile: "localhostProfile_example",
                  type: "type_example",
                },
                supplementalGroups: [
                  1,
                ],
                supplementalGroupsPolicy: "supplementalGroupsPolicy_example",
                sysctls: [
                  {
                    name: "name_example",
                    value: "value_example",
                  },
                ],
                windowsOptions: {
                  gmsaCredentialSpec: "gmsaCredentialSpec_example",
                  gmsaCredentialSpecName: "gmsaCredentialSpecName_example",
                  hostProcess: true,
                  runAsUserName: "runAsUserName_example",
                },
              },
              serviceAccount: "serviceAccount_example",
              serviceAccountName: "serviceAccountName_example",
              setHostnameAsFQDN: true,
              shareProcessNamespace: true,
              subdomain: "subdomain_example",
              terminationGracePeriodSeconds: 1,
              tolerations: [
                {
                  effect: "effect_example",
                  key: "key_example",
                  operator: "operator_example",
                  tolerationSeconds: 1,
                  value: "value_example",
                },
              ],
              topologySpreadConstraints: [
                {
                  labelSelector: {
                    matchExpressions: [
                      {
                        key: "key_example",
                        operator: "operator_example",
                        values: [
                          "values_example",
                        ],
                      },
                    ],
                    matchLabels: {
                      "key": "key_example",
                    },
                  },
                  matchLabelKeys: [
                    "matchLabelKeys_example",
                  ],
                  maxSkew: 1,
                  minDomains: 1,
                  nodeAffinityPolicy: "nodeAffinityPolicy_example",
                  nodeTaintsPolicy: "nodeTaintsPolicy_example",
                  topologyKey: "topologyKey_example",
                  whenUnsatisfiable: "whenUnsatisfiable_example",
                },
              ],
              volumes: [
                {
                  awsElasticBlockStore: {
                    fsType: "fsType_example",
                    partition: 1,
                    readOnly: true,
                    volumeID: "volumeID_example",
                  },
                  azureDisk: {
                    cachingMode: "cachingMode_example",
                    diskName: "diskName_example",
                    diskURI: "diskURI_example",
                    fsType: "fsType_example",
                    kind: "kind_example",
                    readOnly: true,
                  },
                  azureFile: {
                    readOnly: true,
                    secretName: "secretName_example",
                    shareName: "shareName_example",
                  },
                  cephfs: {
                    monitors: [
                      "monitors_example",
                    ],
                    path: "path_example",
                    readOnly: true,
                    secretFile: "secretFile_example",
                    secretRef: {
                      name: "name_example",
                    },
                    user: "user_example",
                  },
                  cinder: {
                    fsType: "fsType_example",
                    readOnly: true,
                    secretRef: {
                      name: "name_example",
                    },
                    volumeID: "volumeID_example",
                  },
                  configMap: {
                    defaultMode: 1,
                    items: [
                      {
                        key: "key_example",
                        mode: 1,
                        path: "path_example",
                      },
                    ],
                    name: "name_example",
                    optional: true,
                  },
                  csi: {
                    driver: "driver_example",
                    fsType: "fsType_example",
                    nodePublishSecretRef: {
                      name: "name_example",
                    },
                    readOnly: true,
                    volumeAttributes: {
                      "key": "key_example",
                    },
                  },
                  downwardAPI: {
                    defaultMode: 1,
                    items: [
                      {
                        fieldRef: {
                          apiVersion: "apiVersion_example",
                          fieldPath: "fieldPath_example",
                        },
                        mode: 1,
                        path: "path_example",
                        resourceFieldRef: {
                          containerName: "containerName_example",
                          divisor: "divisor_example",
                          resource: "resource_example",
                        },
                      },
                    ],
                  },
                  emptyDir: {
                    medium: "medium_example",
                    sizeLimit: "sizeLimit_example",
                  },
                  ephemeral: {
                    volumeClaimTemplate: {
                      metadata: {
                        annotations: {
                          "key": "key_example",
                        },
                        creationTimestamp: new Date('1970-01-01T00:00:00.00Z'),
                        deletionGracePeriodSeconds: 1,
                        deletionTimestamp: new Date('1970-01-01T00:00:00.00Z'),
                        finalizers: [
                          "finalizers_example",
                        ],
                        generateName: "generateName_example",
                        generation: 1,
                        labels: {
                          "key": "key_example",
                        },
                        managedFields: [
                          {
                            apiVersion: "apiVersion_example",
                            fieldsType: "fieldsType_example",
                            fieldsV1: {},
                            manager: "manager_example",
                            operation: "operation_example",
                            subresource: "subresource_example",
                            time: new Date('1970-01-01T00:00:00.00Z'),
                          },
                        ],
                        name: "name_example",
                        namespace: "namespace_example",
                        ownerReferences: [
                          {
                            apiVersion: "apiVersion_example",
                            blockOwnerDeletion: true,
                            controller: true,
                            kind: "kind_example",
                            name: "name_example",
                            uid: "uid_example",
                          },
                        ],
                        resourceVersion: "resourceVersion_example",
                        selfLink: "selfLink_example",
                        uid: "uid_example",
                      },
                      spec: {
                        accessModes: [
                          "accessModes_example",
                        ],
                        dataSource: {
                          apiGroup: "apiGroup_example",
                          kind: "kind_example",
                          name: "name_example",
                        },
                        dataSourceRef: {
                          apiGroup: "apiGroup_example",
                          kind: "kind_example",
                          name: "name_example",
                          namespace: "namespace_example",
                        },
                        resources: {
                          limits: {
                            "key": "key_example",
                          },
                          requests: {
                            "key": "key_example",
                          },
                        },
                        selector: {
                          matchExpressions: [
                            {
                              key: "key_example",
                              operator: "operator_example",
                              values: [
                                "values_example",
                              ],
                            },
                          ],
                          matchLabels: {
                            "key": "key_example",
                          },
                        },
                        storageClassName: "storageClassName_example",
                        volumeAttributesClassName: "volumeAttributesClassName_example",
                        volumeMode: "volumeMode_example",
                        volumeName: "volumeName_example",
                      },
                    },
                  },
                  fc: {
                    fsType: "fsType_example",
                    lun: 1,
                    readOnly: true,
                    targetWWNs: [
                      "targetWWNs_example",
                    ],
                    wwids: [
                      "wwids_example",
                    ],
                  },
                  flexVolume: {
                    driver: "driver_example",
                    fsType: "fsType_example",
                    options: {
                      "key": "key_example",
                    },
                    readOnly: true,
                    secretRef: {
                      name: "name_example",
                    },
                  },
                  flocker: {
                    datasetName: "datasetName_example",
                    datasetUUID: "datasetUUID_example",
                  },
                  gcePersistentDisk: {
                    fsType: "fsType_example",
                    partition: 1,
                    pdName: "pdName_example",
                    readOnly: true,
                  },
                  gitRepo: {
                    directory: "directory_example",
                    repository: "repository_example",
                    revision: "revision_example",
                  },
                  glusterfs: {
                    endpoints: "endpoints_example",
                    path: "path_example",
                    readOnly: true,
                  },
                  hostPath: {
                    path: "path_example",
                    type: "type_example",
                  },
                  image: {
                    pullPolicy: "pullPolicy_example",
                    reference: "reference_example",
                  },
                  iscsi: {
                    chapAuthDiscovery: true,
                    chapAuthSession: true,
                    fsType: "fsType_example",
                    initiatorName: "initiatorName_example",
                    iqn: "iqn_example",
                    iscsiInterface: "iscsiInterface_example",
                    lun: 1,
                    portals: [
                      "portals_example",
                    ],
                    readOnly: true,
                    secretRef: {
                      name: "name_example",
                    },
                    targetPortal: "targetPortal_example",
                  },
                  name: "name_example",
                  nfs: {
                    path: "path_example",
                    readOnly: true,
                    server: "server_example",
                  },
                  persistentVolumeClaim: {
                    claimName: "claimName_example",
                    readOnly: true,
                  },
                  photonPersistentDisk: {
                    fsType: "fsType_example",
                    pdID: "pdID_example",
                  },
                  portworxVolume: {
                    fsType: "fsType_example",
                    readOnly: true,
                    volumeID: "volumeID_example",
                  },
                  projected: {
                    defaultMode: 1,
                    sources: [
                      {
                        clusterTrustBundle: {
                          labelSelector: {
                            matchExpressions: [
                              {
                                key: "key_example",
                                operator: "operator_example",
                                values: [
                                  "values_example",
                                ],
                              },
                            ],
                            matchLabels: {
                              "key": "key_example",
                            },
                          },
                          name: "name_example",
                          optional: true,
                          path: "path_example",
                          signerName: "signerName_example",
                        },
                        configMap: {
                          items: [
                            {
                              key: "key_example",
                              mode: 1,
                              path: "path_example",
                            },
                          ],
                          name: "name_example",
                          optional: true,
                        },
                        downwardAPI: {
                          items: [
                            {
                              fieldRef: {
                                apiVersion: "apiVersion_example",
                                fieldPath: "fieldPath_example",
                              },
                              mode: 1,
                              path: "path_example",
                              resourceFieldRef: {
                                containerName: "containerName_example",
                                divisor: "divisor_example",
                                resource: "resource_example",
                              },
                            },
                          ],
                        },
                        podCertificate: {
                          certificateChainPath: "certificateChainPath_example",
                          credentialBundlePath: "credentialBundlePath_example",
                          keyPath: "keyPath_example",
                          keyType: "keyType_example",
                          maxExpirationSeconds: 1,
                          signerName: "signerName_example",
                        },
                        secret: {
                          items: [
                            {
                              key: "key_example",
                              mode: 1,
                              path: "path_example",
                            },
                          ],
                          name: "name_example",
                          optional: true,
                        },
                        serviceAccountToken: {
                          audience: "audience_example",
                          expirationSeconds: 1,
                          path: "path_example",
                        },
                      },
                    ],
                  },
                  quobyte: {
                    group: "group_example",
                    readOnly: true,
                    registry: "registry_example",
                    tenant: "tenant_example",
                    user: "user_example",
                    volume: "volume_example",
                  },
                  rbd: {
                    fsType: "fsType_example",
                    image: "image_example",
                    keyring: "keyring_example",
                    monitors: [
                      "monitors_example",
                    ],
                    pool: "pool_example",
                    readOnly: true,
                    secretRef: {
                      name: "name_example",
                    },
                    user: "user_example",
                  },
                  scaleIO: {
                    fsType: "fsType_example",
                    gateway: "gateway_example",
                    protectionDomain: "protectionDomain_example",
                    readOnly: true,
                    secretRef: {
                      name: "name_example",
                    },
                    sslEnabled: true,
                    storageMode: "storageMode_example",
                    storagePool: "storagePool_example",
                    system: "system_example",
                    volumeName: "volumeName_example",
                  },
                  secret: {
                    defaultMode: 1,
                    items: [
                      {
                        key: "key_example",
                        mode: 1,
                        path: "path_example",
                      },
                    ],
                    optional: true,
                    secretName: "secretName_example",
                  },
                  storageos: {
                    fsType: "fsType_example",
                    readOnly: true,
                    secretRef: {
                      name: "name_example",
                    },
                    volumeName: "volumeName_example",
                    volumeNamespace: "volumeNamespace_example",
                  },
                  vsphereVolume: {
                    fsType: "fsType_example",
                    storagePolicyID: "storagePolicyID_example",
                    storagePolicyName: "storagePolicyName_example",
                    volumePath: "volumePath_example",
                  },
                },
              ],
            },
          },
          ttlSecondsAfterFinished: 1,
        },
      },
      schedule: "schedule_example",
      startingDeadlineSeconds: 1,
      successfulJobsHistoryLimit: 1,
      suspend: true,
      timeZone: "timeZone_example",
    },
    status: {
      active: [
        {
          apiVersion: "apiVersion_example",
          fieldPath: "fieldPath_example",
          kind: "kind_example",
          name: "name_example",
          namespace: "namespace_example",
          resourceVersion: "resourceVersion_example",
          uid: "uid_example",
        },
      ],
      lastScheduleTime: new Date('1970-01-01T00:00:00.00Z'),
      lastSuccessfulTime: new Date('1970-01-01T00:00:00.00Z'),
    },
  },
    // If \'true\', then the output is pretty printed. Defaults to \'false\' unless the user-agent indicates a browser or command-line HTTP tool (curl and wget). (optional)
  pretty: "pretty_example",
    // When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed (optional)
  dryRun: "dryRun_example",
    // fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. (optional)
  fieldManager: "fieldManager_example",
    // fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. (optional)
  fieldValidation: "fieldValidation_example",
};

const data = await apiInstance.replaceNamespacedCronJobStatus(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **V1CronJob**|  |
 **name** | [**string**] | name of the CronJob | defaults to undefined
 **namespace** | [**string**] | object name and auth scope, such as for teams and projects | defaults to undefined
 **pretty** | [**string**] | If \&#39;true\&#39;, then the output is pretty printed. Defaults to \&#39;false\&#39; unless the user-agent indicates a browser or command-line HTTP tool (curl and wget). | (optional) defaults to undefined
 **dryRun** | [**string**] | When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed | (optional) defaults to undefined
 **fieldManager** | [**string**] | fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. | (optional) defaults to undefined
 **fieldValidation** | [**string**] | fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. | (optional) defaults to undefined


### Return type

**V1CronJob**

### Authorization

[BearerToken](README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf, application/cbor


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**201** | Created |  -  |
**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **replaceNamespacedJob**
> V1Job replaceNamespacedJob(body)

replace the specified Job

### Example


```typescript
import { createConfiguration, BatchV1Api } from '';
import type { BatchV1ApiReplaceNamespacedJobRequest } from '';

const configuration = createConfiguration();
const apiInstance = new BatchV1Api(configuration);

const request: BatchV1ApiReplaceNamespacedJobRequest = {
    // name of the Job
  name: "name_example",
    // object name and auth scope, such as for teams and projects
  namespace: "namespace_example",
  
  body: {
    apiVersion: "apiVersion_example",
    kind: "kind_example",
    metadata: {
      annotations: {
        "key": "key_example",
      },
      creationTimestamp: new Date('1970-01-01T00:00:00.00Z'),
      deletionGracePeriodSeconds: 1,
      deletionTimestamp: new Date('1970-01-01T00:00:00.00Z'),
      finalizers: [
        "finalizers_example",
      ],
      generateName: "generateName_example",
      generation: 1,
      labels: {
        "key": "key_example",
      },
      managedFields: [
        {
          apiVersion: "apiVersion_example",
          fieldsType: "fieldsType_example",
          fieldsV1: {},
          manager: "manager_example",
          operation: "operation_example",
          subresource: "subresource_example",
          time: new Date('1970-01-01T00:00:00.00Z'),
        },
      ],
      name: "name_example",
      namespace: "namespace_example",
      ownerReferences: [
        {
          apiVersion: "apiVersion_example",
          blockOwnerDeletion: true,
          controller: true,
          kind: "kind_example",
          name: "name_example",
          uid: "uid_example",
        },
      ],
      resourceVersion: "resourceVersion_example",
      selfLink: "selfLink_example",
      uid: "uid_example",
    },
    spec: {
      activeDeadlineSeconds: 1,
      backoffLimit: 1,
      backoffLimitPerIndex: 1,
      completionMode: "completionMode_example",
      completions: 1,
      managedBy: "managedBy_example",
      manualSelector: true,
      maxFailedIndexes: 1,
      parallelism: 1,
      podFailurePolicy: {
        rules: [
          {
            action: "action_example",
            onExitCodes: {
              containerName: "containerName_example",
              operator: "operator_example",
              values: [
                1,
              ],
            },
            onPodConditions: [
              {
                status: "status_example",
                type: "type_example",
              },
            ],
          },
        ],
      },
      podReplacementPolicy: "podReplacementPolicy_example",
      selector: {
        matchExpressions: [
          {
            key: "key_example",
            operator: "operator_example",
            values: [
              "values_example",
            ],
          },
        ],
        matchLabels: {
          "key": "key_example",
        },
      },
      successPolicy: {
        rules: [
          {
            succeededCount: 1,
            succeededIndexes: "succeededIndexes_example",
          },
        ],
      },
      suspend: true,
      template: {
        metadata: {
          annotations: {
            "key": "key_example",
          },
          creationTimestamp: new Date('1970-01-01T00:00:00.00Z'),
          deletionGracePeriodSeconds: 1,
          deletionTimestamp: new Date('1970-01-01T00:00:00.00Z'),
          finalizers: [
            "finalizers_example",
          ],
          generateName: "generateName_example",
          generation: 1,
          labels: {
            "key": "key_example",
          },
          managedFields: [
            {
              apiVersion: "apiVersion_example",
              fieldsType: "fieldsType_example",
              fieldsV1: {},
              manager: "manager_example",
              operation: "operation_example",
              subresource: "subresource_example",
              time: new Date('1970-01-01T00:00:00.00Z'),
            },
          ],
          name: "name_example",
          namespace: "namespace_example",
          ownerReferences: [
            {
              apiVersion: "apiVersion_example",
              blockOwnerDeletion: true,
              controller: true,
              kind: "kind_example",
              name: "name_example",
              uid: "uid_example",
            },
          ],
          resourceVersion: "resourceVersion_example",
          selfLink: "selfLink_example",
          uid: "uid_example",
        },
        spec: {
          activeDeadlineSeconds: 1,
          affinity: {
            nodeAffinity: {
              preferredDuringSchedulingIgnoredDuringExecution: [
                {
                  preference: {
                    matchExpressions: [
                      {
                        key: "key_example",
                        operator: "operator_example",
                        values: [
                          "values_example",
                        ],
                      },
                    ],
                    matchFields: [
                      {
                        key: "key_example",
                        operator: "operator_example",
                        values: [
                          "values_example",
                        ],
                      },
                    ],
                  },
                  weight: 1,
                },
              ],
              requiredDuringSchedulingIgnoredDuringExecution: {
                nodeSelectorTerms: [
                  {
                    matchExpressions: [
                      {
                        key: "key_example",
                        operator: "operator_example",
                        values: [
                          "values_example",
                        ],
                      },
                    ],
                    matchFields: [
                      {
                        key: "key_example",
                        operator: "operator_example",
                        values: [
                          "values_example",
                        ],
                      },
                    ],
                  },
                ],
              },
            },
            podAffinity: {
              preferredDuringSchedulingIgnoredDuringExecution: [
                {
                  podAffinityTerm: {
                    labelSelector: {
                      matchExpressions: [
                        {
                          key: "key_example",
                          operator: "operator_example",
                          values: [
                            "values_example",
                          ],
                        },
                      ],
                      matchLabels: {
                        "key": "key_example",
                      },
                    },
                    matchLabelKeys: [
                      "matchLabelKeys_example",
                    ],
                    mismatchLabelKeys: [
                      "mismatchLabelKeys_example",
                    ],
                    namespaceSelector: {
                      matchExpressions: [
                        {
                          key: "key_example",
                          operator: "operator_example",
                          values: [
                            "values_example",
                          ],
                        },
                      ],
                      matchLabels: {
                        "key": "key_example",
                      },
                    },
                    namespaces: [
                      "namespaces_example",
                    ],
                    topologyKey: "topologyKey_example",
                  },
                  weight: 1,
                },
              ],
              requiredDuringSchedulingIgnoredDuringExecution: [
                {
                  labelSelector: {
                    matchExpressions: [
                      {
                        key: "key_example",
                        operator: "operator_example",
                        values: [
                          "values_example",
                        ],
                      },
                    ],
                    matchLabels: {
                      "key": "key_example",
                    },
                  },
                  matchLabelKeys: [
                    "matchLabelKeys_example",
                  ],
                  mismatchLabelKeys: [
                    "mismatchLabelKeys_example",
                  ],
                  namespaceSelector: {
                    matchExpressions: [
                      {
                        key: "key_example",
                        operator: "operator_example",
                        values: [
                          "values_example",
                        ],
                      },
                    ],
                    matchLabels: {
                      "key": "key_example",
                    },
                  },
                  namespaces: [
                    "namespaces_example",
                  ],
                  topologyKey: "topologyKey_example",
                },
              ],
            },
            podAntiAffinity: {
              preferredDuringSchedulingIgnoredDuringExecution: [
                {
                  podAffinityTerm: {
                    labelSelector: {
                      matchExpressions: [
                        {
                          key: "key_example",
                          operator: "operator_example",
                          values: [
                            "values_example",
                          ],
                        },
                      ],
                      matchLabels: {
                        "key": "key_example",
                      },
                    },
                    matchLabelKeys: [
                      "matchLabelKeys_example",
                    ],
                    mismatchLabelKeys: [
                      "mismatchLabelKeys_example",
                    ],
                    namespaceSelector: {
                      matchExpressions: [
                        {
                          key: "key_example",
                          operator: "operator_example",
                          values: [
                            "values_example",
                          ],
                        },
                      ],
                      matchLabels: {
                        "key": "key_example",
                      },
                    },
                    namespaces: [
                      "namespaces_example",
                    ],
                    topologyKey: "topologyKey_example",
                  },
                  weight: 1,
                },
              ],
              requiredDuringSchedulingIgnoredDuringExecution: [
                {
                  labelSelector: {
                    matchExpressions: [
                      {
                        key: "key_example",
                        operator: "operator_example",
                        values: [
                          "values_example",
                        ],
                      },
                    ],
                    matchLabels: {
                      "key": "key_example",
                    },
                  },
                  matchLabelKeys: [
                    "matchLabelKeys_example",
                  ],
                  mismatchLabelKeys: [
                    "mismatchLabelKeys_example",
                  ],
                  namespaceSelector: {
                    matchExpressions: [
                      {
                        key: "key_example",
                        operator: "operator_example",
                        values: [
                          "values_example",
                        ],
                      },
                    ],
                    matchLabels: {
                      "key": "key_example",
                    },
                  },
                  namespaces: [
                    "namespaces_example",
                  ],
                  topologyKey: "topologyKey_example",
                },
              ],
            },
          },
          automountServiceAccountToken: true,
          containers: [
            {
              args: [
                "args_example",
              ],
              command: [
                "command_example",
              ],
              env: [
                {
                  name: "name_example",
                  value: "value_example",
                  valueFrom: {
                    configMapKeyRef: {
                      key: "key_example",
                      name: "name_example",
                      optional: true,
                    },
                    fieldRef: {
                      apiVersion: "apiVersion_example",
                      fieldPath: "fieldPath_example",
                    },
                    fileKeyRef: {
                      key: "key_example",
                      optional: true,
                      path: "path_example",
                      volumeName: "volumeName_example",
                    },
                    resourceFieldRef: {
                      containerName: "containerName_example",
                      divisor: "divisor_example",
                      resource: "resource_example",
                    },
                    secretKeyRef: {
                      key: "key_example",
                      name: "name_example",
                      optional: true,
                    },
                  },
                },
              ],
              envFrom: [
                {
                  configMapRef: {
                    name: "name_example",
                    optional: true,
                  },
                  prefix: "prefix_example",
                  secretRef: {
                    name: "name_example",
                    optional: true,
                  },
                },
              ],
              image: "image_example",
              imagePullPolicy: "imagePullPolicy_example",
              lifecycle: {
                postStart: {
                  exec: {
                    command: [
                      "command_example",
                    ],
                  },
                  httpGet: {
                    host: "host_example",
                    httpHeaders: [
                      {
                        name: "name_example",
                        value: "value_example",
                      },
                    ],
                    path: "path_example",
                    port: "port_example",
                    scheme: "scheme_example",
                  },
                  sleep: {
                    seconds: 1,
                  },
                  tcpSocket: {
                    host: "host_example",
                    port: "port_example",
                  },
                },
                preStop: {
                  exec: {
                    command: [
                      "command_example",
                    ],
                  },
                  httpGet: {
                    host: "host_example",
                    httpHeaders: [
                      {
                        name: "name_example",
                        value: "value_example",
                      },
                    ],
                    path: "path_example",
                    port: "port_example",
                    scheme: "scheme_example",
                  },
                  sleep: {
                    seconds: 1,
                  },
                  tcpSocket: {
                    host: "host_example",
                    port: "port_example",
                  },
                },
                stopSignal: "stopSignal_example",
              },
              livenessProbe: {
                exec: {
                  command: [
                    "command_example",
                  ],
                },
                failureThreshold: 1,
                grpc: {
                  port: 1,
                  service: "service_example",
                },
                httpGet: {
                  host: "host_example",
                  httpHeaders: [
                    {
                      name: "name_example",
                      value: "value_example",
                    },
                  ],
                  path: "path_example",
                  port: "port_example",
                  scheme: "scheme_example",
                },
                initialDelaySeconds: 1,
                periodSeconds: 1,
                successThreshold: 1,
                tcpSocket: {
                  host: "host_example",
                  port: "port_example",
                },
                terminationGracePeriodSeconds: 1,
                timeoutSeconds: 1,
              },
              name: "name_example",
              ports: [
                {
                  containerPort: 1,
                  hostIP: "hostIP_example",
                  hostPort: 1,
                  name: "name_example",
                  protocol: "protocol_example",
                },
              ],
              readinessProbe: {
                exec: {
                  command: [
                    "command_example",
                  ],
                },
                failureThreshold: 1,
                grpc: {
                  port: 1,
                  service: "service_example",
                },
                httpGet: {
                  host: "host_example",
                  httpHeaders: [
                    {
                      name: "name_example",
                      value: "value_example",
                    },
                  ],
                  path: "path_example",
                  port: "port_example",
                  scheme: "scheme_example",
                },
                initialDelaySeconds: 1,
                periodSeconds: 1,
                successThreshold: 1,
                tcpSocket: {
                  host: "host_example",
                  port: "port_example",
                },
                terminationGracePeriodSeconds: 1,
                timeoutSeconds: 1,
              },
              resizePolicy: [
                {
                  resourceName: "resourceName_example",
                  restartPolicy: "restartPolicy_example",
                },
              ],
              resources: {
                claims: [
                  {
                    name: "name_example",
                    request: "request_example",
                  },
                ],
                limits: {
                  "key": "key_example",
                },
                requests: {
                  "key": "key_example",
                },
              },
              restartPolicy: "restartPolicy_example",
              restartPolicyRules: [
                {
                  action: "action_example",
                  exitCodes: {
                    operator: "operator_example",
                    values: [
                      1,
                    ],
                  },
                },
              ],
              securityContext: {
                allowPrivilegeEscalation: true,
                appArmorProfile: {
                  localhostProfile: "localhostProfile_example",
                  type: "type_example",
                },
                capabilities: {
                  add: [
                    "add_example",
                  ],
                  drop: [
                    "drop_example",
                  ],
                },
                privileged: true,
                procMount: "procMount_example",
                readOnlyRootFilesystem: true,
                runAsGroup: 1,
                runAsNonRoot: true,
                runAsUser: 1,
                seLinuxOptions: {
                  level: "level_example",
                  role: "role_example",
                  type: "type_example",
                  user: "user_example",
                },
                seccompProfile: {
                  localhostProfile: "localhostProfile_example",
                  type: "type_example",
                },
                windowsOptions: {
                  gmsaCredentialSpec: "gmsaCredentialSpec_example",
                  gmsaCredentialSpecName: "gmsaCredentialSpecName_example",
                  hostProcess: true,
                  runAsUserName: "runAsUserName_example",
                },
              },
              startupProbe: {
                exec: {
                  command: [
                    "command_example",
                  ],
                },
                failureThreshold: 1,
                grpc: {
                  port: 1,
                  service: "service_example",
                },
                httpGet: {
                  host: "host_example",
                  httpHeaders: [
                    {
                      name: "name_example",
                      value: "value_example",
                    },
                  ],
                  path: "path_example",
                  port: "port_example",
                  scheme: "scheme_example",
                },
                initialDelaySeconds: 1,
                periodSeconds: 1,
                successThreshold: 1,
                tcpSocket: {
                  host: "host_example",
                  port: "port_example",
                },
                terminationGracePeriodSeconds: 1,
                timeoutSeconds: 1,
              },
              stdin: true,
              stdinOnce: true,
              terminationMessagePath: "terminationMessagePath_example",
              terminationMessagePolicy: "terminationMessagePolicy_example",
              tty: true,
              volumeDevices: [
                {
                  devicePath: "devicePath_example",
                  name: "name_example",
                },
              ],
              volumeMounts: [
                {
                  mountPath: "mountPath_example",
                  mountPropagation: "mountPropagation_example",
                  name: "name_example",
                  readOnly: true,
                  recursiveReadOnly: "recursiveReadOnly_example",
                  subPath: "subPath_example",
                  subPathExpr: "subPathExpr_example",
                },
              ],
              workingDir: "workingDir_example",
            },
          ],
          dnsConfig: {
            nameservers: [
              "nameservers_example",
            ],
            options: [
              {
                name: "name_example",
                value: "value_example",
              },
            ],
            searches: [
              "searches_example",
            ],
          },
          dnsPolicy: "dnsPolicy_example",
          enableServiceLinks: true,
          ephemeralContainers: [
            {
              args: [
                "args_example",
              ],
              command: [
                "command_example",
              ],
              env: [
                {
                  name: "name_example",
                  value: "value_example",
                  valueFrom: {
                    configMapKeyRef: {
                      key: "key_example",
                      name: "name_example",
                      optional: true,
                    },
                    fieldRef: {
                      apiVersion: "apiVersion_example",
                      fieldPath: "fieldPath_example",
                    },
                    fileKeyRef: {
                      key: "key_example",
                      optional: true,
                      path: "path_example",
                      volumeName: "volumeName_example",
                    },
                    resourceFieldRef: {
                      containerName: "containerName_example",
                      divisor: "divisor_example",
                      resource: "resource_example",
                    },
                    secretKeyRef: {
                      key: "key_example",
                      name: "name_example",
                      optional: true,
                    },
                  },
                },
              ],
              envFrom: [
                {
                  configMapRef: {
                    name: "name_example",
                    optional: true,
                  },
                  prefix: "prefix_example",
                  secretRef: {
                    name: "name_example",
                    optional: true,
                  },
                },
              ],
              image: "image_example",
              imagePullPolicy: "imagePullPolicy_example",
              lifecycle: {
                postStart: {
                  exec: {
                    command: [
                      "command_example",
                    ],
                  },
                  httpGet: {
                    host: "host_example",
                    httpHeaders: [
                      {
                        name: "name_example",
                        value: "value_example",
                      },
                    ],
                    path: "path_example",
                    port: "port_example",
                    scheme: "scheme_example",
                  },
                  sleep: {
                    seconds: 1,
                  },
                  tcpSocket: {
                    host: "host_example",
                    port: "port_example",
                  },
                },
                preStop: {
                  exec: {
                    command: [
                      "command_example",
                    ],
                  },
                  httpGet: {
                    host: "host_example",
                    httpHeaders: [
                      {
                        name: "name_example",
                        value: "value_example",
                      },
                    ],
                    path: "path_example",
                    port: "port_example",
                    scheme: "scheme_example",
                  },
                  sleep: {
                    seconds: 1,
                  },
                  tcpSocket: {
                    host: "host_example",
                    port: "port_example",
                  },
                },
                stopSignal: "stopSignal_example",
              },
              livenessProbe: {
                exec: {
                  command: [
                    "command_example",
                  ],
                },
                failureThreshold: 1,
                grpc: {
                  port: 1,
                  service: "service_example",
                },
                httpGet: {
                  host: "host_example",
                  httpHeaders: [
                    {
                      name: "name_example",
                      value: "value_example",
                    },
                  ],
                  path: "path_example",
                  port: "port_example",
                  scheme: "scheme_example",
                },
                initialDelaySeconds: 1,
                periodSeconds: 1,
                successThreshold: 1,
                tcpSocket: {
                  host: "host_example",
                  port: "port_example",
                },
                terminationGracePeriodSeconds: 1,
                timeoutSeconds: 1,
              },
              name: "name_example",
              ports: [
                {
                  containerPort: 1,
                  hostIP: "hostIP_example",
                  hostPort: 1,
                  name: "name_example",
                  protocol: "protocol_example",
                },
              ],
              readinessProbe: {
                exec: {
                  command: [
                    "command_example",
                  ],
                },
                failureThreshold: 1,
                grpc: {
                  port: 1,
                  service: "service_example",
                },
                httpGet: {
                  host: "host_example",
                  httpHeaders: [
                    {
                      name: "name_example",
                      value: "value_example",
                    },
                  ],
                  path: "path_example",
                  port: "port_example",
                  scheme: "scheme_example",
                },
                initialDelaySeconds: 1,
                periodSeconds: 1,
                successThreshold: 1,
                tcpSocket: {
                  host: "host_example",
                  port: "port_example",
                },
                terminationGracePeriodSeconds: 1,
                timeoutSeconds: 1,
              },
              resizePolicy: [
                {
                  resourceName: "resourceName_example",
                  restartPolicy: "restartPolicy_example",
                },
              ],
              resources: {
                claims: [
                  {
                    name: "name_example",
                    request: "request_example",
                  },
                ],
                limits: {
                  "key": "key_example",
                },
                requests: {
                  "key": "key_example",
                },
              },
              restartPolicy: "restartPolicy_example",
              restartPolicyRules: [
                {
                  action: "action_example",
                  exitCodes: {
                    operator: "operator_example",
                    values: [
                      1,
                    ],
                  },
                },
              ],
              securityContext: {
                allowPrivilegeEscalation: true,
                appArmorProfile: {
                  localhostProfile: "localhostProfile_example",
                  type: "type_example",
                },
                capabilities: {
                  add: [
                    "add_example",
                  ],
                  drop: [
                    "drop_example",
                  ],
                },
                privileged: true,
                procMount: "procMount_example",
                readOnlyRootFilesystem: true,
                runAsGroup: 1,
                runAsNonRoot: true,
                runAsUser: 1,
                seLinuxOptions: {
                  level: "level_example",
                  role: "role_example",
                  type: "type_example",
                  user: "user_example",
                },
                seccompProfile: {
                  localhostProfile: "localhostProfile_example",
                  type: "type_example",
                },
                windowsOptions: {
                  gmsaCredentialSpec: "gmsaCredentialSpec_example",
                  gmsaCredentialSpecName: "gmsaCredentialSpecName_example",
                  hostProcess: true,
                  runAsUserName: "runAsUserName_example",
                },
              },
              startupProbe: {
                exec: {
                  command: [
                    "command_example",
                  ],
                },
                failureThreshold: 1,
                grpc: {
                  port: 1,
                  service: "service_example",
                },
                httpGet: {
                  host: "host_example",
                  httpHeaders: [
                    {
                      name: "name_example",
                      value: "value_example",
                    },
                  ],
                  path: "path_example",
                  port: "port_example",
                  scheme: "scheme_example",
                },
                initialDelaySeconds: 1,
                periodSeconds: 1,
                successThreshold: 1,
                tcpSocket: {
                  host: "host_example",
                  port: "port_example",
                },
                terminationGracePeriodSeconds: 1,
                timeoutSeconds: 1,
              },
              stdin: true,
              stdinOnce: true,
              targetContainerName: "targetContainerName_example",
              terminationMessagePath: "terminationMessagePath_example",
              terminationMessagePolicy: "terminationMessagePolicy_example",
              tty: true,
              volumeDevices: [
                {
                  devicePath: "devicePath_example",
                  name: "name_example",
                },
              ],
              volumeMounts: [
                {
                  mountPath: "mountPath_example",
                  mountPropagation: "mountPropagation_example",
                  name: "name_example",
                  readOnly: true,
                  recursiveReadOnly: "recursiveReadOnly_example",
                  subPath: "subPath_example",
                  subPathExpr: "subPathExpr_example",
                },
              ],
              workingDir: "workingDir_example",
            },
          ],
          hostAliases: [
            {
              hostnames: [
                "hostnames_example",
              ],
              ip: "ip_example",
            },
          ],
          hostIPC: true,
          hostNetwork: true,
          hostPID: true,
          hostUsers: true,
          hostname: "hostname_example",
          hostnameOverride: "hostnameOverride_example",
          imagePullSecrets: [
            {
              name: "name_example",
            },
          ],
          initContainers: [
            {
              args: [
                "args_example",
              ],
              command: [
                "command_example",
              ],
              env: [
                {
                  name: "name_example",
                  value: "value_example",
                  valueFrom: {
                    configMapKeyRef: {
                      key: "key_example",
                      name: "name_example",
                      optional: true,
                    },
                    fieldRef: {
                      apiVersion: "apiVersion_example",
                      fieldPath: "fieldPath_example",
                    },
                    fileKeyRef: {
                      key: "key_example",
                      optional: true,
                      path: "path_example",
                      volumeName: "volumeName_example",
                    },
                    resourceFieldRef: {
                      containerName: "containerName_example",
                      divisor: "divisor_example",
                      resource: "resource_example",
                    },
                    secretKeyRef: {
                      key: "key_example",
                      name: "name_example",
                      optional: true,
                    },
                  },
                },
              ],
              envFrom: [
                {
                  configMapRef: {
                    name: "name_example",
                    optional: true,
                  },
                  prefix: "prefix_example",
                  secretRef: {
                    name: "name_example",
                    optional: true,
                  },
                },
              ],
              image: "image_example",
              imagePullPolicy: "imagePullPolicy_example",
              lifecycle: {
                postStart: {
                  exec: {
                    command: [
                      "command_example",
                    ],
                  },
                  httpGet: {
                    host: "host_example",
                    httpHeaders: [
                      {
                        name: "name_example",
                        value: "value_example",
                      },
                    ],
                    path: "path_example",
                    port: "port_example",
                    scheme: "scheme_example",
                  },
                  sleep: {
                    seconds: 1,
                  },
                  tcpSocket: {
                    host: "host_example",
                    port: "port_example",
                  },
                },
                preStop: {
                  exec: {
                    command: [
                      "command_example",
                    ],
                  },
                  httpGet: {
                    host: "host_example",
                    httpHeaders: [
                      {
                        name: "name_example",
                        value: "value_example",
                      },
                    ],
                    path: "path_example",
                    port: "port_example",
                    scheme: "scheme_example",
                  },
                  sleep: {
                    seconds: 1,
                  },
                  tcpSocket: {
                    host: "host_example",
                    port: "port_example",
                  },
                },
                stopSignal: "stopSignal_example",
              },
              livenessProbe: {
                exec: {
                  command: [
                    "command_example",
                  ],
                },
                failureThreshold: 1,
                grpc: {
                  port: 1,
                  service: "service_example",
                },
                httpGet: {
                  host: "host_example",
                  httpHeaders: [
                    {
                      name: "name_example",
                      value: "value_example",
                    },
                  ],
                  path: "path_example",
                  port: "port_example",
                  scheme: "scheme_example",
                },
                initialDelaySeconds: 1,
                periodSeconds: 1,
                successThreshold: 1,
                tcpSocket: {
                  host: "host_example",
                  port: "port_example",
                },
                terminationGracePeriodSeconds: 1,
                timeoutSeconds: 1,
              },
              name: "name_example",
              ports: [
                {
                  containerPort: 1,
                  hostIP: "hostIP_example",
                  hostPort: 1,
                  name: "name_example",
                  protocol: "protocol_example",
                },
              ],
              readinessProbe: {
                exec: {
                  command: [
                    "command_example",
                  ],
                },
                failureThreshold: 1,
                grpc: {
                  port: 1,
                  service: "service_example",
                },
                httpGet: {
                  host: "host_example",
                  httpHeaders: [
                    {
                      name: "name_example",
                      value: "value_example",
                    },
                  ],
                  path: "path_example",
                  port: "port_example",
                  scheme: "scheme_example",
                },
                initialDelaySeconds: 1,
                periodSeconds: 1,
                successThreshold: 1,
                tcpSocket: {
                  host: "host_example",
                  port: "port_example",
                },
                terminationGracePeriodSeconds: 1,
                timeoutSeconds: 1,
              },
              resizePolicy: [
                {
                  resourceName: "resourceName_example",
                  restartPolicy: "restartPolicy_example",
                },
              ],
              resources: {
                claims: [
                  {
                    name: "name_example",
                    request: "request_example",
                  },
                ],
                limits: {
                  "key": "key_example",
                },
                requests: {
                  "key": "key_example",
                },
              },
              restartPolicy: "restartPolicy_example",
              restartPolicyRules: [
                {
                  action: "action_example",
                  exitCodes: {
                    operator: "operator_example",
                    values: [
                      1,
                    ],
                  },
                },
              ],
              securityContext: {
                allowPrivilegeEscalation: true,
                appArmorProfile: {
                  localhostProfile: "localhostProfile_example",
                  type: "type_example",
                },
                capabilities: {
                  add: [
                    "add_example",
                  ],
                  drop: [
                    "drop_example",
                  ],
                },
                privileged: true,
                procMount: "procMount_example",
                readOnlyRootFilesystem: true,
                runAsGroup: 1,
                runAsNonRoot: true,
                runAsUser: 1,
                seLinuxOptions: {
                  level: "level_example",
                  role: "role_example",
                  type: "type_example",
                  user: "user_example",
                },
                seccompProfile: {
                  localhostProfile: "localhostProfile_example",
                  type: "type_example",
                },
                windowsOptions: {
                  gmsaCredentialSpec: "gmsaCredentialSpec_example",
                  gmsaCredentialSpecName: "gmsaCredentialSpecName_example",
                  hostProcess: true,
                  runAsUserName: "runAsUserName_example",
                },
              },
              startupProbe: {
                exec: {
                  command: [
                    "command_example",
                  ],
                },
                failureThreshold: 1,
                grpc: {
                  port: 1,
                  service: "service_example",
                },
                httpGet: {
                  host: "host_example",
                  httpHeaders: [
                    {
                      name: "name_example",
                      value: "value_example",
                    },
                  ],
                  path: "path_example",
                  port: "port_example",
                  scheme: "scheme_example",
                },
                initialDelaySeconds: 1,
                periodSeconds: 1,
                successThreshold: 1,
                tcpSocket: {
                  host: "host_example",
                  port: "port_example",
                },
                terminationGracePeriodSeconds: 1,
                timeoutSeconds: 1,
              },
              stdin: true,
              stdinOnce: true,
              terminationMessagePath: "terminationMessagePath_example",
              terminationMessagePolicy: "terminationMessagePolicy_example",
              tty: true,
              volumeDevices: [
                {
                  devicePath: "devicePath_example",
                  name: "name_example",
                },
              ],
              volumeMounts: [
                {
                  mountPath: "mountPath_example",
                  mountPropagation: "mountPropagation_example",
                  name: "name_example",
                  readOnly: true,
                  recursiveReadOnly: "recursiveReadOnly_example",
                  subPath: "subPath_example",
                  subPathExpr: "subPathExpr_example",
                },
              ],
              workingDir: "workingDir_example",
            },
          ],
          nodeName: "nodeName_example",
          nodeSelector: {
            "key": "key_example",
          },
          os: {
            name: "name_example",
          },
          overhead: {
            "key": "key_example",
          },
          preemptionPolicy: "preemptionPolicy_example",
          priority: 1,
          priorityClassName: "priorityClassName_example",
          readinessGates: [
            {
              conditionType: "conditionType_example",
            },
          ],
          resourceClaims: [
            {
              name: "name_example",
              resourceClaimName: "resourceClaimName_example",
              resourceClaimTemplateName: "resourceClaimTemplateName_example",
            },
          ],
          resources: {
            claims: [
              {
                name: "name_example",
                request: "request_example",
              },
            ],
            limits: {
              "key": "key_example",
            },
            requests: {
              "key": "key_example",
            },
          },
          restartPolicy: "restartPolicy_example",
          runtimeClassName: "runtimeClassName_example",
          schedulerName: "schedulerName_example",
          schedulingGates: [
            {
              name: "name_example",
            },
          ],
          securityContext: {
            appArmorProfile: {
              localhostProfile: "localhostProfile_example",
              type: "type_example",
            },
            fsGroup: 1,
            fsGroupChangePolicy: "fsGroupChangePolicy_example",
            runAsGroup: 1,
            runAsNonRoot: true,
            runAsUser: 1,
            seLinuxChangePolicy: "seLinuxChangePolicy_example",
            seLinuxOptions: {
              level: "level_example",
              role: "role_example",
              type: "type_example",
              user: "user_example",
            },
            seccompProfile: {
              localhostProfile: "localhostProfile_example",
              type: "type_example",
            },
            supplementalGroups: [
              1,
            ],
            supplementalGroupsPolicy: "supplementalGroupsPolicy_example",
            sysctls: [
              {
                name: "name_example",
                value: "value_example",
              },
            ],
            windowsOptions: {
              gmsaCredentialSpec: "gmsaCredentialSpec_example",
              gmsaCredentialSpecName: "gmsaCredentialSpecName_example",
              hostProcess: true,
              runAsUserName: "runAsUserName_example",
            },
          },
          serviceAccount: "serviceAccount_example",
          serviceAccountName: "serviceAccountName_example",
          setHostnameAsFQDN: true,
          shareProcessNamespace: true,
          subdomain: "subdomain_example",
          terminationGracePeriodSeconds: 1,
          tolerations: [
            {
              effect: "effect_example",
              key: "key_example",
              operator: "operator_example",
              tolerationSeconds: 1,
              value: "value_example",
            },
          ],
          topologySpreadConstraints: [
            {
              labelSelector: {
                matchExpressions: [
                  {
                    key: "key_example",
                    operator: "operator_example",
                    values: [
                      "values_example",
                    ],
                  },
                ],
                matchLabels: {
                  "key": "key_example",
                },
              },
              matchLabelKeys: [
                "matchLabelKeys_example",
              ],
              maxSkew: 1,
              minDomains: 1,
              nodeAffinityPolicy: "nodeAffinityPolicy_example",
              nodeTaintsPolicy: "nodeTaintsPolicy_example",
              topologyKey: "topologyKey_example",
              whenUnsatisfiable: "whenUnsatisfiable_example",
            },
          ],
          volumes: [
            {
              awsElasticBlockStore: {
                fsType: "fsType_example",
                partition: 1,
                readOnly: true,
                volumeID: "volumeID_example",
              },
              azureDisk: {
                cachingMode: "cachingMode_example",
                diskName: "diskName_example",
                diskURI: "diskURI_example",
                fsType: "fsType_example",
                kind: "kind_example",
                readOnly: true,
              },
              azureFile: {
                readOnly: true,
                secretName: "secretName_example",
                shareName: "shareName_example",
              },
              cephfs: {
                monitors: [
                  "monitors_example",
                ],
                path: "path_example",
                readOnly: true,
                secretFile: "secretFile_example",
                secretRef: {
                  name: "name_example",
                },
                user: "user_example",
              },
              cinder: {
                fsType: "fsType_example",
                readOnly: true,
                secretRef: {
                  name: "name_example",
                },
                volumeID: "volumeID_example",
              },
              configMap: {
                defaultMode: 1,
                items: [
                  {
                    key: "key_example",
                    mode: 1,
                    path: "path_example",
                  },
                ],
                name: "name_example",
                optional: true,
              },
              csi: {
                driver: "driver_example",
                fsType: "fsType_example",
                nodePublishSecretRef: {
                  name: "name_example",
                },
                readOnly: true,
                volumeAttributes: {
                  "key": "key_example",
                },
              },
              downwardAPI: {
                defaultMode: 1,
                items: [
                  {
                    fieldRef: {
                      apiVersion: "apiVersion_example",
                      fieldPath: "fieldPath_example",
                    },
                    mode: 1,
                    path: "path_example",
                    resourceFieldRef: {
                      containerName: "containerName_example",
                      divisor: "divisor_example",
                      resource: "resource_example",
                    },
                  },
                ],
              },
              emptyDir: {
                medium: "medium_example",
                sizeLimit: "sizeLimit_example",
              },
              ephemeral: {
                volumeClaimTemplate: {
                  metadata: {
                    annotations: {
                      "key": "key_example",
                    },
                    creationTimestamp: new Date('1970-01-01T00:00:00.00Z'),
                    deletionGracePeriodSeconds: 1,
                    deletionTimestamp: new Date('1970-01-01T00:00:00.00Z'),
                    finalizers: [
                      "finalizers_example",
                    ],
                    generateName: "generateName_example",
                    generation: 1,
                    labels: {
                      "key": "key_example",
                    },
                    managedFields: [
                      {
                        apiVersion: "apiVersion_example",
                        fieldsType: "fieldsType_example",
                        fieldsV1: {},
                        manager: "manager_example",
                        operation: "operation_example",
                        subresource: "subresource_example",
                        time: new Date('1970-01-01T00:00:00.00Z'),
                      },
                    ],
                    name: "name_example",
                    namespace: "namespace_example",
                    ownerReferences: [
                      {
                        apiVersion: "apiVersion_example",
                        blockOwnerDeletion: true,
                        controller: true,
                        kind: "kind_example",
                        name: "name_example",
                        uid: "uid_example",
                      },
                    ],
                    resourceVersion: "resourceVersion_example",
                    selfLink: "selfLink_example",
                    uid: "uid_example",
                  },
                  spec: {
                    accessModes: [
                      "accessModes_example",
                    ],
                    dataSource: {
                      apiGroup: "apiGroup_example",
                      kind: "kind_example",
                      name: "name_example",
                    },
                    dataSourceRef: {
                      apiGroup: "apiGroup_example",
                      kind: "kind_example",
                      name: "name_example",
                      namespace: "namespace_example",
                    },
                    resources: {
                      limits: {
                        "key": "key_example",
                      },
                      requests: {
                        "key": "key_example",
                      },
                    },
                    selector: {
                      matchExpressions: [
                        {
                          key: "key_example",
                          operator: "operator_example",
                          values: [
                            "values_example",
                          ],
                        },
                      ],
                      matchLabels: {
                        "key": "key_example",
                      },
                    },
                    storageClassName: "storageClassName_example",
                    volumeAttributesClassName: "volumeAttributesClassName_example",
                    volumeMode: "volumeMode_example",
                    volumeName: "volumeName_example",
                  },
                },
              },
              fc: {
                fsType: "fsType_example",
                lun: 1,
                readOnly: true,
                targetWWNs: [
                  "targetWWNs_example",
                ],
                wwids: [
                  "wwids_example",
                ],
              },
              flexVolume: {
                driver: "driver_example",
                fsType: "fsType_example",
                options: {
                  "key": "key_example",
                },
                readOnly: true,
                secretRef: {
                  name: "name_example",
                },
              },
              flocker: {
                datasetName: "datasetName_example",
                datasetUUID: "datasetUUID_example",
              },
              gcePersistentDisk: {
                fsType: "fsType_example",
                partition: 1,
                pdName: "pdName_example",
                readOnly: true,
              },
              gitRepo: {
                directory: "directory_example",
                repository: "repository_example",
                revision: "revision_example",
              },
              glusterfs: {
                endpoints: "endpoints_example",
                path: "path_example",
                readOnly: true,
              },
              hostPath: {
                path: "path_example",
                type: "type_example",
              },
              image: {
                pullPolicy: "pullPolicy_example",
                reference: "reference_example",
              },
              iscsi: {
                chapAuthDiscovery: true,
                chapAuthSession: true,
                fsType: "fsType_example",
                initiatorName: "initiatorName_example",
                iqn: "iqn_example",
                iscsiInterface: "iscsiInterface_example",
                lun: 1,
                portals: [
                  "portals_example",
                ],
                readOnly: true,
                secretRef: {
                  name: "name_example",
                },
                targetPortal: "targetPortal_example",
              },
              name: "name_example",
              nfs: {
                path: "path_example",
                readOnly: true,
                server: "server_example",
              },
              persistentVolumeClaim: {
                claimName: "claimName_example",
                readOnly: true,
              },
              photonPersistentDisk: {
                fsType: "fsType_example",
                pdID: "pdID_example",
              },
              portworxVolume: {
                fsType: "fsType_example",
                readOnly: true,
                volumeID: "volumeID_example",
              },
              projected: {
                defaultMode: 1,
                sources: [
                  {
                    clusterTrustBundle: {
                      labelSelector: {
                        matchExpressions: [
                          {
                            key: "key_example",
                            operator: "operator_example",
                            values: [
                              "values_example",
                            ],
                          },
                        ],
                        matchLabels: {
                          "key": "key_example",
                        },
                      },
                      name: "name_example",
                      optional: true,
                      path: "path_example",
                      signerName: "signerName_example",
                    },
                    configMap: {
                      items: [
                        {
                          key: "key_example",
                          mode: 1,
                          path: "path_example",
                        },
                      ],
                      name: "name_example",
                      optional: true,
                    },
                    downwardAPI: {
                      items: [
                        {
                          fieldRef: {
                            apiVersion: "apiVersion_example",
                            fieldPath: "fieldPath_example",
                          },
                          mode: 1,
                          path: "path_example",
                          resourceFieldRef: {
                            containerName: "containerName_example",
                            divisor: "divisor_example",
                            resource: "resource_example",
                          },
                        },
                      ],
                    },
                    podCertificate: {
                      certificateChainPath: "certificateChainPath_example",
                      credentialBundlePath: "credentialBundlePath_example",
                      keyPath: "keyPath_example",
                      keyType: "keyType_example",
                      maxExpirationSeconds: 1,
                      signerName: "signerName_example",
                    },
                    secret: {
                      items: [
                        {
                          key: "key_example",
                          mode: 1,
                          path: "path_example",
                        },
                      ],
                      name: "name_example",
                      optional: true,
                    },
                    serviceAccountToken: {
                      audience: "audience_example",
                      expirationSeconds: 1,
                      path: "path_example",
                    },
                  },
                ],
              },
              quobyte: {
                group: "group_example",
                readOnly: true,
                registry: "registry_example",
                tenant: "tenant_example",
                user: "user_example",
                volume: "volume_example",
              },
              rbd: {
                fsType: "fsType_example",
                image: "image_example",
                keyring: "keyring_example",
                monitors: [
                  "monitors_example",
                ],
                pool: "pool_example",
                readOnly: true,
                secretRef: {
                  name: "name_example",
                },
                user: "user_example",
              },
              scaleIO: {
                fsType: "fsType_example",
                gateway: "gateway_example",
                protectionDomain: "protectionDomain_example",
                readOnly: true,
                secretRef: {
                  name: "name_example",
                },
                sslEnabled: true,
                storageMode: "storageMode_example",
                storagePool: "storagePool_example",
                system: "system_example",
                volumeName: "volumeName_example",
              },
              secret: {
                defaultMode: 1,
                items: [
                  {
                    key: "key_example",
                    mode: 1,
                    path: "path_example",
                  },
                ],
                optional: true,
                secretName: "secretName_example",
              },
              storageos: {
                fsType: "fsType_example",
                readOnly: true,
                secretRef: {
                  name: "name_example",
                },
                volumeName: "volumeName_example",
                volumeNamespace: "volumeNamespace_example",
              },
              vsphereVolume: {
                fsType: "fsType_example",
                storagePolicyID: "storagePolicyID_example",
                storagePolicyName: "storagePolicyName_example",
                volumePath: "volumePath_example",
              },
            },
          ],
        },
      },
      ttlSecondsAfterFinished: 1,
    },
    status: {
      active: 1,
      completedIndexes: "completedIndexes_example",
      completionTime: new Date('1970-01-01T00:00:00.00Z'),
      conditions: [
        {
          lastProbeTime: new Date('1970-01-01T00:00:00.00Z'),
          lastTransitionTime: new Date('1970-01-01T00:00:00.00Z'),
          message: "message_example",
          reason: "reason_example",
          status: "status_example",
          type: "type_example",
        },
      ],
      failed: 1,
      failedIndexes: "failedIndexes_example",
      ready: 1,
      startTime: new Date('1970-01-01T00:00:00.00Z'),
      succeeded: 1,
      terminating: 1,
      uncountedTerminatedPods: {
        failed: [
          "failed_example",
        ],
        succeeded: [
          "succeeded_example",
        ],
      },
    },
  },
    // If \'true\', then the output is pretty printed. Defaults to \'false\' unless the user-agent indicates a browser or command-line HTTP tool (curl and wget). (optional)
  pretty: "pretty_example",
    // When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed (optional)
  dryRun: "dryRun_example",
    // fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. (optional)
  fieldManager: "fieldManager_example",
    // fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. (optional)
  fieldValidation: "fieldValidation_example",
};

const data = await apiInstance.replaceNamespacedJob(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **V1Job**|  |
 **name** | [**string**] | name of the Job | defaults to undefined
 **namespace** | [**string**] | object name and auth scope, such as for teams and projects | defaults to undefined
 **pretty** | [**string**] | If \&#39;true\&#39;, then the output is pretty printed. Defaults to \&#39;false\&#39; unless the user-agent indicates a browser or command-line HTTP tool (curl and wget). | (optional) defaults to undefined
 **dryRun** | [**string**] | When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed | (optional) defaults to undefined
 **fieldManager** | [**string**] | fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. | (optional) defaults to undefined
 **fieldValidation** | [**string**] | fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. | (optional) defaults to undefined


### Return type

**V1Job**

### Authorization

[BearerToken](README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf, application/cbor


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**201** | Created |  -  |
**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **replaceNamespacedJobStatus**
> V1Job replaceNamespacedJobStatus(body)

replace status of the specified Job

### Example


```typescript
import { createConfiguration, BatchV1Api } from '';
import type { BatchV1ApiReplaceNamespacedJobStatusRequest } from '';

const configuration = createConfiguration();
const apiInstance = new BatchV1Api(configuration);

const request: BatchV1ApiReplaceNamespacedJobStatusRequest = {
    // name of the Job
  name: "name_example",
    // object name and auth scope, such as for teams and projects
  namespace: "namespace_example",
  
  body: {
    apiVersion: "apiVersion_example",
    kind: "kind_example",
    metadata: {
      annotations: {
        "key": "key_example",
      },
      creationTimestamp: new Date('1970-01-01T00:00:00.00Z'),
      deletionGracePeriodSeconds: 1,
      deletionTimestamp: new Date('1970-01-01T00:00:00.00Z'),
      finalizers: [
        "finalizers_example",
      ],
      generateName: "generateName_example",
      generation: 1,
      labels: {
        "key": "key_example",
      },
      managedFields: [
        {
          apiVersion: "apiVersion_example",
          fieldsType: "fieldsType_example",
          fieldsV1: {},
          manager: "manager_example",
          operation: "operation_example",
          subresource: "subresource_example",
          time: new Date('1970-01-01T00:00:00.00Z'),
        },
      ],
      name: "name_example",
      namespace: "namespace_example",
      ownerReferences: [
        {
          apiVersion: "apiVersion_example",
          blockOwnerDeletion: true,
          controller: true,
          kind: "kind_example",
          name: "name_example",
          uid: "uid_example",
        },
      ],
      resourceVersion: "resourceVersion_example",
      selfLink: "selfLink_example",
      uid: "uid_example",
    },
    spec: {
      activeDeadlineSeconds: 1,
      backoffLimit: 1,
      backoffLimitPerIndex: 1,
      completionMode: "completionMode_example",
      completions: 1,
      managedBy: "managedBy_example",
      manualSelector: true,
      maxFailedIndexes: 1,
      parallelism: 1,
      podFailurePolicy: {
        rules: [
          {
            action: "action_example",
            onExitCodes: {
              containerName: "containerName_example",
              operator: "operator_example",
              values: [
                1,
              ],
            },
            onPodConditions: [
              {
                status: "status_example",
                type: "type_example",
              },
            ],
          },
        ],
      },
      podReplacementPolicy: "podReplacementPolicy_example",
      selector: {
        matchExpressions: [
          {
            key: "key_example",
            operator: "operator_example",
            values: [
              "values_example",
            ],
          },
        ],
        matchLabels: {
          "key": "key_example",
        },
      },
      successPolicy: {
        rules: [
          {
            succeededCount: 1,
            succeededIndexes: "succeededIndexes_example",
          },
        ],
      },
      suspend: true,
      template: {
        metadata: {
          annotations: {
            "key": "key_example",
          },
          creationTimestamp: new Date('1970-01-01T00:00:00.00Z'),
          deletionGracePeriodSeconds: 1,
          deletionTimestamp: new Date('1970-01-01T00:00:00.00Z'),
          finalizers: [
            "finalizers_example",
          ],
          generateName: "generateName_example",
          generation: 1,
          labels: {
            "key": "key_example",
          },
          managedFields: [
            {
              apiVersion: "apiVersion_example",
              fieldsType: "fieldsType_example",
              fieldsV1: {},
              manager: "manager_example",
              operation: "operation_example",
              subresource: "subresource_example",
              time: new Date('1970-01-01T00:00:00.00Z'),
            },
          ],
          name: "name_example",
          namespace: "namespace_example",
          ownerReferences: [
            {
              apiVersion: "apiVersion_example",
              blockOwnerDeletion: true,
              controller: true,
              kind: "kind_example",
              name: "name_example",
              uid: "uid_example",
            },
          ],
          resourceVersion: "resourceVersion_example",
          selfLink: "selfLink_example",
          uid: "uid_example",
        },
        spec: {
          activeDeadlineSeconds: 1,
          affinity: {
            nodeAffinity: {
              preferredDuringSchedulingIgnoredDuringExecution: [
                {
                  preference: {
                    matchExpressions: [
                      {
                        key: "key_example",
                        operator: "operator_example",
                        values: [
                          "values_example",
                        ],
                      },
                    ],
                    matchFields: [
                      {
                        key: "key_example",
                        operator: "operator_example",
                        values: [
                          "values_example",
                        ],
                      },
                    ],
                  },
                  weight: 1,
                },
              ],
              requiredDuringSchedulingIgnoredDuringExecution: {
                nodeSelectorTerms: [
                  {
                    matchExpressions: [
                      {
                        key: "key_example",
                        operator: "operator_example",
                        values: [
                          "values_example",
                        ],
                      },
                    ],
                    matchFields: [
                      {
                        key: "key_example",
                        operator: "operator_example",
                        values: [
                          "values_example",
                        ],
                      },
                    ],
                  },
                ],
              },
            },
            podAffinity: {
              preferredDuringSchedulingIgnoredDuringExecution: [
                {
                  podAffinityTerm: {
                    labelSelector: {
                      matchExpressions: [
                        {
                          key: "key_example",
                          operator: "operator_example",
                          values: [
                            "values_example",
                          ],
                        },
                      ],
                      matchLabels: {
                        "key": "key_example",
                      },
                    },
                    matchLabelKeys: [
                      "matchLabelKeys_example",
                    ],
                    mismatchLabelKeys: [
                      "mismatchLabelKeys_example",
                    ],
                    namespaceSelector: {
                      matchExpressions: [
                        {
                          key: "key_example",
                          operator: "operator_example",
                          values: [
                            "values_example",
                          ],
                        },
                      ],
                      matchLabels: {
                        "key": "key_example",
                      },
                    },
                    namespaces: [
                      "namespaces_example",
                    ],
                    topologyKey: "topologyKey_example",
                  },
                  weight: 1,
                },
              ],
              requiredDuringSchedulingIgnoredDuringExecution: [
                {
                  labelSelector: {
                    matchExpressions: [
                      {
                        key: "key_example",
                        operator: "operator_example",
                        values: [
                          "values_example",
                        ],
                      },
                    ],
                    matchLabels: {
                      "key": "key_example",
                    },
                  },
                  matchLabelKeys: [
                    "matchLabelKeys_example",
                  ],
                  mismatchLabelKeys: [
                    "mismatchLabelKeys_example",
                  ],
                  namespaceSelector: {
                    matchExpressions: [
                      {
                        key: "key_example",
                        operator: "operator_example",
                        values: [
                          "values_example",
                        ],
                      },
                    ],
                    matchLabels: {
                      "key": "key_example",
                    },
                  },
                  namespaces: [
                    "namespaces_example",
                  ],
                  topologyKey: "topologyKey_example",
                },
              ],
            },
            podAntiAffinity: {
              preferredDuringSchedulingIgnoredDuringExecution: [
                {
                  podAffinityTerm: {
                    labelSelector: {
                      matchExpressions: [
                        {
                          key: "key_example",
                          operator: "operator_example",
                          values: [
                            "values_example",
                          ],
                        },
                      ],
                      matchLabels: {
                        "key": "key_example",
                      },
                    },
                    matchLabelKeys: [
                      "matchLabelKeys_example",
                    ],
                    mismatchLabelKeys: [
                      "mismatchLabelKeys_example",
                    ],
                    namespaceSelector: {
                      matchExpressions: [
                        {
                          key: "key_example",
                          operator: "operator_example",
                          values: [
                            "values_example",
                          ],
                        },
                      ],
                      matchLabels: {
                        "key": "key_example",
                      },
                    },
                    namespaces: [
                      "namespaces_example",
                    ],
                    topologyKey: "topologyKey_example",
                  },
                  weight: 1,
                },
              ],
              requiredDuringSchedulingIgnoredDuringExecution: [
                {
                  labelSelector: {
                    matchExpressions: [
                      {
                        key: "key_example",
                        operator: "operator_example",
                        values: [
                          "values_example",
                        ],
                      },
                    ],
                    matchLabels: {
                      "key": "key_example",
                    },
                  },
                  matchLabelKeys: [
                    "matchLabelKeys_example",
                  ],
                  mismatchLabelKeys: [
                    "mismatchLabelKeys_example",
                  ],
                  namespaceSelector: {
                    matchExpressions: [
                      {
                        key: "key_example",
                        operator: "operator_example",
                        values: [
                          "values_example",
                        ],
                      },
                    ],
                    matchLabels: {
                      "key": "key_example",
                    },
                  },
                  namespaces: [
                    "namespaces_example",
                  ],
                  topologyKey: "topologyKey_example",
                },
              ],
            },
          },
          automountServiceAccountToken: true,
          containers: [
            {
              args: [
                "args_example",
              ],
              command: [
                "command_example",
              ],
              env: [
                {
                  name: "name_example",
                  value: "value_example",
                  valueFrom: {
                    configMapKeyRef: {
                      key: "key_example",
                      name: "name_example",
                      optional: true,
                    },
                    fieldRef: {
                      apiVersion: "apiVersion_example",
                      fieldPath: "fieldPath_example",
                    },
                    fileKeyRef: {
                      key: "key_example",
                      optional: true,
                      path: "path_example",
                      volumeName: "volumeName_example",
                    },
                    resourceFieldRef: {
                      containerName: "containerName_example",
                      divisor: "divisor_example",
                      resource: "resource_example",
                    },
                    secretKeyRef: {
                      key: "key_example",
                      name: "name_example",
                      optional: true,
                    },
                  },
                },
              ],
              envFrom: [
                {
                  configMapRef: {
                    name: "name_example",
                    optional: true,
                  },
                  prefix: "prefix_example",
                  secretRef: {
                    name: "name_example",
                    optional: true,
                  },
                },
              ],
              image: "image_example",
              imagePullPolicy: "imagePullPolicy_example",
              lifecycle: {
                postStart: {
                  exec: {
                    command: [
                      "command_example",
                    ],
                  },
                  httpGet: {
                    host: "host_example",
                    httpHeaders: [
                      {
                        name: "name_example",
                        value: "value_example",
                      },
                    ],
                    path: "path_example",
                    port: "port_example",
                    scheme: "scheme_example",
                  },
                  sleep: {
                    seconds: 1,
                  },
                  tcpSocket: {
                    host: "host_example",
                    port: "port_example",
                  },
                },
                preStop: {
                  exec: {
                    command: [
                      "command_example",
                    ],
                  },
                  httpGet: {
                    host: "host_example",
                    httpHeaders: [
                      {
                        name: "name_example",
                        value: "value_example",
                      },
                    ],
                    path: "path_example",
                    port: "port_example",
                    scheme: "scheme_example",
                  },
                  sleep: {
                    seconds: 1,
                  },
                  tcpSocket: {
                    host: "host_example",
                    port: "port_example",
                  },
                },
                stopSignal: "stopSignal_example",
              },
              livenessProbe: {
                exec: {
                  command: [
                    "command_example",
                  ],
                },
                failureThreshold: 1,
                grpc: {
                  port: 1,
                  service: "service_example",
                },
                httpGet: {
                  host: "host_example",
                  httpHeaders: [
                    {
                      name: "name_example",
                      value: "value_example",
                    },
                  ],
                  path: "path_example",
                  port: "port_example",
                  scheme: "scheme_example",
                },
                initialDelaySeconds: 1,
                periodSeconds: 1,
                successThreshold: 1,
                tcpSocket: {
                  host: "host_example",
                  port: "port_example",
                },
                terminationGracePeriodSeconds: 1,
                timeoutSeconds: 1,
              },
              name: "name_example",
              ports: [
                {
                  containerPort: 1,
                  hostIP: "hostIP_example",
                  hostPort: 1,
                  name: "name_example",
                  protocol: "protocol_example",
                },
              ],
              readinessProbe: {
                exec: {
                  command: [
                    "command_example",
                  ],
                },
                failureThreshold: 1,
                grpc: {
                  port: 1,
                  service: "service_example",
                },
                httpGet: {
                  host: "host_example",
                  httpHeaders: [
                    {
                      name: "name_example",
                      value: "value_example",
                    },
                  ],
                  path: "path_example",
                  port: "port_example",
                  scheme: "scheme_example",
                },
                initialDelaySeconds: 1,
                periodSeconds: 1,
                successThreshold: 1,
                tcpSocket: {
                  host: "host_example",
                  port: "port_example",
                },
                terminationGracePeriodSeconds: 1,
                timeoutSeconds: 1,
              },
              resizePolicy: [
                {
                  resourceName: "resourceName_example",
                  restartPolicy: "restartPolicy_example",
                },
              ],
              resources: {
                claims: [
                  {
                    name: "name_example",
                    request: "request_example",
                  },
                ],
                limits: {
                  "key": "key_example",
                },
                requests: {
                  "key": "key_example",
                },
              },
              restartPolicy: "restartPolicy_example",
              restartPolicyRules: [
                {
                  action: "action_example",
                  exitCodes: {
                    operator: "operator_example",
                    values: [
                      1,
                    ],
                  },
                },
              ],
              securityContext: {
                allowPrivilegeEscalation: true,
                appArmorProfile: {
                  localhostProfile: "localhostProfile_example",
                  type: "type_example",
                },
                capabilities: {
                  add: [
                    "add_example",
                  ],
                  drop: [
                    "drop_example",
                  ],
                },
                privileged: true,
                procMount: "procMount_example",
                readOnlyRootFilesystem: true,
                runAsGroup: 1,
                runAsNonRoot: true,
                runAsUser: 1,
                seLinuxOptions: {
                  level: "level_example",
                  role: "role_example",
                  type: "type_example",
                  user: "user_example",
                },
                seccompProfile: {
                  localhostProfile: "localhostProfile_example",
                  type: "type_example",
                },
                windowsOptions: {
                  gmsaCredentialSpec: "gmsaCredentialSpec_example",
                  gmsaCredentialSpecName: "gmsaCredentialSpecName_example",
                  hostProcess: true,
                  runAsUserName: "runAsUserName_example",
                },
              },
              startupProbe: {
                exec: {
                  command: [
                    "command_example",
                  ],
                },
                failureThreshold: 1,
                grpc: {
                  port: 1,
                  service: "service_example",
                },
                httpGet: {
                  host: "host_example",
                  httpHeaders: [
                    {
                      name: "name_example",
                      value: "value_example",
                    },
                  ],
                  path: "path_example",
                  port: "port_example",
                  scheme: "scheme_example",
                },
                initialDelaySeconds: 1,
                periodSeconds: 1,
                successThreshold: 1,
                tcpSocket: {
                  host: "host_example",
                  port: "port_example",
                },
                terminationGracePeriodSeconds: 1,
                timeoutSeconds: 1,
              },
              stdin: true,
              stdinOnce: true,
              terminationMessagePath: "terminationMessagePath_example",
              terminationMessagePolicy: "terminationMessagePolicy_example",
              tty: true,
              volumeDevices: [
                {
                  devicePath: "devicePath_example",
                  name: "name_example",
                },
              ],
              volumeMounts: [
                {
                  mountPath: "mountPath_example",
                  mountPropagation: "mountPropagation_example",
                  name: "name_example",
                  readOnly: true,
                  recursiveReadOnly: "recursiveReadOnly_example",
                  subPath: "subPath_example",
                  subPathExpr: "subPathExpr_example",
                },
              ],
              workingDir: "workingDir_example",
            },
          ],
          dnsConfig: {
            nameservers: [
              "nameservers_example",
            ],
            options: [
              {
                name: "name_example",
                value: "value_example",
              },
            ],
            searches: [
              "searches_example",
            ],
          },
          dnsPolicy: "dnsPolicy_example",
          enableServiceLinks: true,
          ephemeralContainers: [
            {
              args: [
                "args_example",
              ],
              command: [
                "command_example",
              ],
              env: [
                {
                  name: "name_example",
                  value: "value_example",
                  valueFrom: {
                    configMapKeyRef: {
                      key: "key_example",
                      name: "name_example",
                      optional: true,
                    },
                    fieldRef: {
                      apiVersion: "apiVersion_example",
                      fieldPath: "fieldPath_example",
                    },
                    fileKeyRef: {
                      key: "key_example",
                      optional: true,
                      path: "path_example",
                      volumeName: "volumeName_example",
                    },
                    resourceFieldRef: {
                      containerName: "containerName_example",
                      divisor: "divisor_example",
                      resource: "resource_example",
                    },
                    secretKeyRef: {
                      key: "key_example",
                      name: "name_example",
                      optional: true,
                    },
                  },
                },
              ],
              envFrom: [
                {
                  configMapRef: {
                    name: "name_example",
                    optional: true,
                  },
                  prefix: "prefix_example",
                  secretRef: {
                    name: "name_example",
                    optional: true,
                  },
                },
              ],
              image: "image_example",
              imagePullPolicy: "imagePullPolicy_example",
              lifecycle: {
                postStart: {
                  exec: {
                    command: [
                      "command_example",
                    ],
                  },
                  httpGet: {
                    host: "host_example",
                    httpHeaders: [
                      {
                        name: "name_example",
                        value: "value_example",
                      },
                    ],
                    path: "path_example",
                    port: "port_example",
                    scheme: "scheme_example",
                  },
                  sleep: {
                    seconds: 1,
                  },
                  tcpSocket: {
                    host: "host_example",
                    port: "port_example",
                  },
                },
                preStop: {
                  exec: {
                    command: [
                      "command_example",
                    ],
                  },
                  httpGet: {
                    host: "host_example",
                    httpHeaders: [
                      {
                        name: "name_example",
                        value: "value_example",
                      },
                    ],
                    path: "path_example",
                    port: "port_example",
                    scheme: "scheme_example",
                  },
                  sleep: {
                    seconds: 1,
                  },
                  tcpSocket: {
                    host: "host_example",
                    port: "port_example",
                  },
                },
                stopSignal: "stopSignal_example",
              },
              livenessProbe: {
                exec: {
                  command: [
                    "command_example",
                  ],
                },
                failureThreshold: 1,
                grpc: {
                  port: 1,
                  service: "service_example",
                },
                httpGet: {
                  host: "host_example",
                  httpHeaders: [
                    {
                      name: "name_example",
                      value: "value_example",
                    },
                  ],
                  path: "path_example",
                  port: "port_example",
                  scheme: "scheme_example",
                },
                initialDelaySeconds: 1,
                periodSeconds: 1,
                successThreshold: 1,
                tcpSocket: {
                  host: "host_example",
                  port: "port_example",
                },
                terminationGracePeriodSeconds: 1,
                timeoutSeconds: 1,
              },
              name: "name_example",
              ports: [
                {
                  containerPort: 1,
                  hostIP: "hostIP_example",
                  hostPort: 1,
                  name: "name_example",
                  protocol: "protocol_example",
                },
              ],
              readinessProbe: {
                exec: {
                  command: [
                    "command_example",
                  ],
                },
                failureThreshold: 1,
                grpc: {
                  port: 1,
                  service: "service_example",
                },
                httpGet: {
                  host: "host_example",
                  httpHeaders: [
                    {
                      name: "name_example",
                      value: "value_example",
                    },
                  ],
                  path: "path_example",
                  port: "port_example",
                  scheme: "scheme_example",
                },
                initialDelaySeconds: 1,
                periodSeconds: 1,
                successThreshold: 1,
                tcpSocket: {
                  host: "host_example",
                  port: "port_example",
                },
                terminationGracePeriodSeconds: 1,
                timeoutSeconds: 1,
              },
              resizePolicy: [
                {
                  resourceName: "resourceName_example",
                  restartPolicy: "restartPolicy_example",
                },
              ],
              resources: {
                claims: [
                  {
                    name: "name_example",
                    request: "request_example",
                  },
                ],
                limits: {
                  "key": "key_example",
                },
                requests: {
                  "key": "key_example",
                },
              },
              restartPolicy: "restartPolicy_example",
              restartPolicyRules: [
                {
                  action: "action_example",
                  exitCodes: {
                    operator: "operator_example",
                    values: [
                      1,
                    ],
                  },
                },
              ],
              securityContext: {
                allowPrivilegeEscalation: true,
                appArmorProfile: {
                  localhostProfile: "localhostProfile_example",
                  type: "type_example",
                },
                capabilities: {
                  add: [
                    "add_example",
                  ],
                  drop: [
                    "drop_example",
                  ],
                },
                privileged: true,
                procMount: "procMount_example",
                readOnlyRootFilesystem: true,
                runAsGroup: 1,
                runAsNonRoot: true,
                runAsUser: 1,
                seLinuxOptions: {
                  level: "level_example",
                  role: "role_example",
                  type: "type_example",
                  user: "user_example",
                },
                seccompProfile: {
                  localhostProfile: "localhostProfile_example",
                  type: "type_example",
                },
                windowsOptions: {
                  gmsaCredentialSpec: "gmsaCredentialSpec_example",
                  gmsaCredentialSpecName: "gmsaCredentialSpecName_example",
                  hostProcess: true,
                  runAsUserName: "runAsUserName_example",
                },
              },
              startupProbe: {
                exec: {
                  command: [
                    "command_example",
                  ],
                },
                failureThreshold: 1,
                grpc: {
                  port: 1,
                  service: "service_example",
                },
                httpGet: {
                  host: "host_example",
                  httpHeaders: [
                    {
                      name: "name_example",
                      value: "value_example",
                    },
                  ],
                  path: "path_example",
                  port: "port_example",
                  scheme: "scheme_example",
                },
                initialDelaySeconds: 1,
                periodSeconds: 1,
                successThreshold: 1,
                tcpSocket: {
                  host: "host_example",
                  port: "port_example",
                },
                terminationGracePeriodSeconds: 1,
                timeoutSeconds: 1,
              },
              stdin: true,
              stdinOnce: true,
              targetContainerName: "targetContainerName_example",
              terminationMessagePath: "terminationMessagePath_example",
              terminationMessagePolicy: "terminationMessagePolicy_example",
              tty: true,
              volumeDevices: [
                {
                  devicePath: "devicePath_example",
                  name: "name_example",
                },
              ],
              volumeMounts: [
                {
                  mountPath: "mountPath_example",
                  mountPropagation: "mountPropagation_example",
                  name: "name_example",
                  readOnly: true,
                  recursiveReadOnly: "recursiveReadOnly_example",
                  subPath: "subPath_example",
                  subPathExpr: "subPathExpr_example",
                },
              ],
              workingDir: "workingDir_example",
            },
          ],
          hostAliases: [
            {
              hostnames: [
                "hostnames_example",
              ],
              ip: "ip_example",
            },
          ],
          hostIPC: true,
          hostNetwork: true,
          hostPID: true,
          hostUsers: true,
          hostname: "hostname_example",
          hostnameOverride: "hostnameOverride_example",
          imagePullSecrets: [
            {
              name: "name_example",
            },
          ],
          initContainers: [
            {
              args: [
                "args_example",
              ],
              command: [
                "command_example",
              ],
              env: [
                {
                  name: "name_example",
                  value: "value_example",
                  valueFrom: {
                    configMapKeyRef: {
                      key: "key_example",
                      name: "name_example",
                      optional: true,
                    },
                    fieldRef: {
                      apiVersion: "apiVersion_example",
                      fieldPath: "fieldPath_example",
                    },
                    fileKeyRef: {
                      key: "key_example",
                      optional: true,
                      path: "path_example",
                      volumeName: "volumeName_example",
                    },
                    resourceFieldRef: {
                      containerName: "containerName_example",
                      divisor: "divisor_example",
                      resource: "resource_example",
                    },
                    secretKeyRef: {
                      key: "key_example",
                      name: "name_example",
                      optional: true,
                    },
                  },
                },
              ],
              envFrom: [
                {
                  configMapRef: {
                    name: "name_example",
                    optional: true,
                  },
                  prefix: "prefix_example",
                  secretRef: {
                    name: "name_example",
                    optional: true,
                  },
                },
              ],
              image: "image_example",
              imagePullPolicy: "imagePullPolicy_example",
              lifecycle: {
                postStart: {
                  exec: {
                    command: [
                      "command_example",
                    ],
                  },
                  httpGet: {
                    host: "host_example",
                    httpHeaders: [
                      {
                        name: "name_example",
                        value: "value_example",
                      },
                    ],
                    path: "path_example",
                    port: "port_example",
                    scheme: "scheme_example",
                  },
                  sleep: {
                    seconds: 1,
                  },
                  tcpSocket: {
                    host: "host_example",
                    port: "port_example",
                  },
                },
                preStop: {
                  exec: {
                    command: [
                      "command_example",
                    ],
                  },
                  httpGet: {
                    host: "host_example",
                    httpHeaders: [
                      {
                        name: "name_example",
                        value: "value_example",
                      },
                    ],
                    path: "path_example",
                    port: "port_example",
                    scheme: "scheme_example",
                  },
                  sleep: {
                    seconds: 1,
                  },
                  tcpSocket: {
                    host: "host_example",
                    port: "port_example",
                  },
                },
                stopSignal: "stopSignal_example",
              },
              livenessProbe: {
                exec: {
                  command: [
                    "command_example",
                  ],
                },
                failureThreshold: 1,
                grpc: {
                  port: 1,
                  service: "service_example",
                },
                httpGet: {
                  host: "host_example",
                  httpHeaders: [
                    {
                      name: "name_example",
                      value: "value_example",
                    },
                  ],
                  path: "path_example",
                  port: "port_example",
                  scheme: "scheme_example",
                },
                initialDelaySeconds: 1,
                periodSeconds: 1,
                successThreshold: 1,
                tcpSocket: {
                  host: "host_example",
                  port: "port_example",
                },
                terminationGracePeriodSeconds: 1,
                timeoutSeconds: 1,
              },
              name: "name_example",
              ports: [
                {
                  containerPort: 1,
                  hostIP: "hostIP_example",
                  hostPort: 1,
                  name: "name_example",
                  protocol: "protocol_example",
                },
              ],
              readinessProbe: {
                exec: {
                  command: [
                    "command_example",
                  ],
                },
                failureThreshold: 1,
                grpc: {
                  port: 1,
                  service: "service_example",
                },
                httpGet: {
                  host: "host_example",
                  httpHeaders: [
                    {
                      name: "name_example",
                      value: "value_example",
                    },
                  ],
                  path: "path_example",
                  port: "port_example",
                  scheme: "scheme_example",
                },
                initialDelaySeconds: 1,
                periodSeconds: 1,
                successThreshold: 1,
                tcpSocket: {
                  host: "host_example",
                  port: "port_example",
                },
                terminationGracePeriodSeconds: 1,
                timeoutSeconds: 1,
              },
              resizePolicy: [
                {
                  resourceName: "resourceName_example",
                  restartPolicy: "restartPolicy_example",
                },
              ],
              resources: {
                claims: [
                  {
                    name: "name_example",
                    request: "request_example",
                  },
                ],
                limits: {
                  "key": "key_example",
                },
                requests: {
                  "key": "key_example",
                },
              },
              restartPolicy: "restartPolicy_example",
              restartPolicyRules: [
                {
                  action: "action_example",
                  exitCodes: {
                    operator: "operator_example",
                    values: [
                      1,
                    ],
                  },
                },
              ],
              securityContext: {
                allowPrivilegeEscalation: true,
                appArmorProfile: {
                  localhostProfile: "localhostProfile_example",
                  type: "type_example",
                },
                capabilities: {
                  add: [
                    "add_example",
                  ],
                  drop: [
                    "drop_example",
                  ],
                },
                privileged: true,
                procMount: "procMount_example",
                readOnlyRootFilesystem: true,
                runAsGroup: 1,
                runAsNonRoot: true,
                runAsUser: 1,
                seLinuxOptions: {
                  level: "level_example",
                  role: "role_example",
                  type: "type_example",
                  user: "user_example",
                },
                seccompProfile: {
                  localhostProfile: "localhostProfile_example",
                  type: "type_example",
                },
                windowsOptions: {
                  gmsaCredentialSpec: "gmsaCredentialSpec_example",
                  gmsaCredentialSpecName: "gmsaCredentialSpecName_example",
                  hostProcess: true,
                  runAsUserName: "runAsUserName_example",
                },
              },
              startupProbe: {
                exec: {
                  command: [
                    "command_example",
                  ],
                },
                failureThreshold: 1,
                grpc: {
                  port: 1,
                  service: "service_example",
                },
                httpGet: {
                  host: "host_example",
                  httpHeaders: [
                    {
                      name: "name_example",
                      value: "value_example",
                    },
                  ],
                  path: "path_example",
                  port: "port_example",
                  scheme: "scheme_example",
                },
                initialDelaySeconds: 1,
                periodSeconds: 1,
                successThreshold: 1,
                tcpSocket: {
                  host: "host_example",
                  port: "port_example",
                },
                terminationGracePeriodSeconds: 1,
                timeoutSeconds: 1,
              },
              stdin: true,
              stdinOnce: true,
              terminationMessagePath: "terminationMessagePath_example",
              terminationMessagePolicy: "terminationMessagePolicy_example",
              tty: true,
              volumeDevices: [
                {
                  devicePath: "devicePath_example",
                  name: "name_example",
                },
              ],
              volumeMounts: [
                {
                  mountPath: "mountPath_example",
                  mountPropagation: "mountPropagation_example",
                  name: "name_example",
                  readOnly: true,
                  recursiveReadOnly: "recursiveReadOnly_example",
                  subPath: "subPath_example",
                  subPathExpr: "subPathExpr_example",
                },
              ],
              workingDir: "workingDir_example",
            },
          ],
          nodeName: "nodeName_example",
          nodeSelector: {
            "key": "key_example",
          },
          os: {
            name: "name_example",
          },
          overhead: {
            "key": "key_example",
          },
          preemptionPolicy: "preemptionPolicy_example",
          priority: 1,
          priorityClassName: "priorityClassName_example",
          readinessGates: [
            {
              conditionType: "conditionType_example",
            },
          ],
          resourceClaims: [
            {
              name: "name_example",
              resourceClaimName: "resourceClaimName_example",
              resourceClaimTemplateName: "resourceClaimTemplateName_example",
            },
          ],
          resources: {
            claims: [
              {
                name: "name_example",
                request: "request_example",
              },
            ],
            limits: {
              "key": "key_example",
            },
            requests: {
              "key": "key_example",
            },
          },
          restartPolicy: "restartPolicy_example",
          runtimeClassName: "runtimeClassName_example",
          schedulerName: "schedulerName_example",
          schedulingGates: [
            {
              name: "name_example",
            },
          ],
          securityContext: {
            appArmorProfile: {
              localhostProfile: "localhostProfile_example",
              type: "type_example",
            },
            fsGroup: 1,
            fsGroupChangePolicy: "fsGroupChangePolicy_example",
            runAsGroup: 1,
            runAsNonRoot: true,
            runAsUser: 1,
            seLinuxChangePolicy: "seLinuxChangePolicy_example",
            seLinuxOptions: {
              level: "level_example",
              role: "role_example",
              type: "type_example",
              user: "user_example",
            },
            seccompProfile: {
              localhostProfile: "localhostProfile_example",
              type: "type_example",
            },
            supplementalGroups: [
              1,
            ],
            supplementalGroupsPolicy: "supplementalGroupsPolicy_example",
            sysctls: [
              {
                name: "name_example",
                value: "value_example",
              },
            ],
            windowsOptions: {
              gmsaCredentialSpec: "gmsaCredentialSpec_example",
              gmsaCredentialSpecName: "gmsaCredentialSpecName_example",
              hostProcess: true,
              runAsUserName: "runAsUserName_example",
            },
          },
          serviceAccount: "serviceAccount_example",
          serviceAccountName: "serviceAccountName_example",
          setHostnameAsFQDN: true,
          shareProcessNamespace: true,
          subdomain: "subdomain_example",
          terminationGracePeriodSeconds: 1,
          tolerations: [
            {
              effect: "effect_example",
              key: "key_example",
              operator: "operator_example",
              tolerationSeconds: 1,
              value: "value_example",
            },
          ],
          topologySpreadConstraints: [
            {
              labelSelector: {
                matchExpressions: [
                  {
                    key: "key_example",
                    operator: "operator_example",
                    values: [
                      "values_example",
                    ],
                  },
                ],
                matchLabels: {
                  "key": "key_example",
                },
              },
              matchLabelKeys: [
                "matchLabelKeys_example",
              ],
              maxSkew: 1,
              minDomains: 1,
              nodeAffinityPolicy: "nodeAffinityPolicy_example",
              nodeTaintsPolicy: "nodeTaintsPolicy_example",
              topologyKey: "topologyKey_example",
              whenUnsatisfiable: "whenUnsatisfiable_example",
            },
          ],
          volumes: [
            {
              awsElasticBlockStore: {
                fsType: "fsType_example",
                partition: 1,
                readOnly: true,
                volumeID: "volumeID_example",
              },
              azureDisk: {
                cachingMode: "cachingMode_example",
                diskName: "diskName_example",
                diskURI: "diskURI_example",
                fsType: "fsType_example",
                kind: "kind_example",
                readOnly: true,
              },
              azureFile: {
                readOnly: true,
                secretName: "secretName_example",
                shareName: "shareName_example",
              },
              cephfs: {
                monitors: [
                  "monitors_example",
                ],
                path: "path_example",
                readOnly: true,
                secretFile: "secretFile_example",
                secretRef: {
                  name: "name_example",
                },
                user: "user_example",
              },
              cinder: {
                fsType: "fsType_example",
                readOnly: true,
                secretRef: {
                  name: "name_example",
                },
                volumeID: "volumeID_example",
              },
              configMap: {
                defaultMode: 1,
                items: [
                  {
                    key: "key_example",
                    mode: 1,
                    path: "path_example",
                  },
                ],
                name: "name_example",
                optional: true,
              },
              csi: {
                driver: "driver_example",
                fsType: "fsType_example",
                nodePublishSecretRef: {
                  name: "name_example",
                },
                readOnly: true,
                volumeAttributes: {
                  "key": "key_example",
                },
              },
              downwardAPI: {
                defaultMode: 1,
                items: [
                  {
                    fieldRef: {
                      apiVersion: "apiVersion_example",
                      fieldPath: "fieldPath_example",
                    },
                    mode: 1,
                    path: "path_example",
                    resourceFieldRef: {
                      containerName: "containerName_example",
                      divisor: "divisor_example",
                      resource: "resource_example",
                    },
                  },
                ],
              },
              emptyDir: {
                medium: "medium_example",
                sizeLimit: "sizeLimit_example",
              },
              ephemeral: {
                volumeClaimTemplate: {
                  metadata: {
                    annotations: {
                      "key": "key_example",
                    },
                    creationTimestamp: new Date('1970-01-01T00:00:00.00Z'),
                    deletionGracePeriodSeconds: 1,
                    deletionTimestamp: new Date('1970-01-01T00:00:00.00Z'),
                    finalizers: [
                      "finalizers_example",
                    ],
                    generateName: "generateName_example",
                    generation: 1,
                    labels: {
                      "key": "key_example",
                    },
                    managedFields: [
                      {
                        apiVersion: "apiVersion_example",
                        fieldsType: "fieldsType_example",
                        fieldsV1: {},
                        manager: "manager_example",
                        operation: "operation_example",
                        subresource: "subresource_example",
                        time: new Date('1970-01-01T00:00:00.00Z'),
                      },
                    ],
                    name: "name_example",
                    namespace: "namespace_example",
                    ownerReferences: [
                      {
                        apiVersion: "apiVersion_example",
                        blockOwnerDeletion: true,
                        controller: true,
                        kind: "kind_example",
                        name: "name_example",
                        uid: "uid_example",
                      },
                    ],
                    resourceVersion: "resourceVersion_example",
                    selfLink: "selfLink_example",
                    uid: "uid_example",
                  },
                  spec: {
                    accessModes: [
                      "accessModes_example",
                    ],
                    dataSource: {
                      apiGroup: "apiGroup_example",
                      kind: "kind_example",
                      name: "name_example",
                    },
                    dataSourceRef: {
                      apiGroup: "apiGroup_example",
                      kind: "kind_example",
                      name: "name_example",
                      namespace: "namespace_example",
                    },
                    resources: {
                      limits: {
                        "key": "key_example",
                      },
                      requests: {
                        "key": "key_example",
                      },
                    },
                    selector: {
                      matchExpressions: [
                        {
                          key: "key_example",
                          operator: "operator_example",
                          values: [
                            "values_example",
                          ],
                        },
                      ],
                      matchLabels: {
                        "key": "key_example",
                      },
                    },
                    storageClassName: "storageClassName_example",
                    volumeAttributesClassName: "volumeAttributesClassName_example",
                    volumeMode: "volumeMode_example",
                    volumeName: "volumeName_example",
                  },
                },
              },
              fc: {
                fsType: "fsType_example",
                lun: 1,
                readOnly: true,
                targetWWNs: [
                  "targetWWNs_example",
                ],
                wwids: [
                  "wwids_example",
                ],
              },
              flexVolume: {
                driver: "driver_example",
                fsType: "fsType_example",
                options: {
                  "key": "key_example",
                },
                readOnly: true,
                secretRef: {
                  name: "name_example",
                },
              },
              flocker: {
                datasetName: "datasetName_example",
                datasetUUID: "datasetUUID_example",
              },
              gcePersistentDisk: {
                fsType: "fsType_example",
                partition: 1,
                pdName: "pdName_example",
                readOnly: true,
              },
              gitRepo: {
                directory: "directory_example",
                repository: "repository_example",
                revision: "revision_example",
              },
              glusterfs: {
                endpoints: "endpoints_example",
                path: "path_example",
                readOnly: true,
              },
              hostPath: {
                path: "path_example",
                type: "type_example",
              },
              image: {
                pullPolicy: "pullPolicy_example",
                reference: "reference_example",
              },
              iscsi: {
                chapAuthDiscovery: true,
                chapAuthSession: true,
                fsType: "fsType_example",
                initiatorName: "initiatorName_example",
                iqn: "iqn_example",
                iscsiInterface: "iscsiInterface_example",
                lun: 1,
                portals: [
                  "portals_example",
                ],
                readOnly: true,
                secretRef: {
                  name: "name_example",
                },
                targetPortal: "targetPortal_example",
              },
              name: "name_example",
              nfs: {
                path: "path_example",
                readOnly: true,
                server: "server_example",
              },
              persistentVolumeClaim: {
                claimName: "claimName_example",
                readOnly: true,
              },
              photonPersistentDisk: {
                fsType: "fsType_example",
                pdID: "pdID_example",
              },
              portworxVolume: {
                fsType: "fsType_example",
                readOnly: true,
                volumeID: "volumeID_example",
              },
              projected: {
                defaultMode: 1,
                sources: [
                  {
                    clusterTrustBundle: {
                      labelSelector: {
                        matchExpressions: [
                          {
                            key: "key_example",
                            operator: "operator_example",
                            values: [
                              "values_example",
                            ],
                          },
                        ],
                        matchLabels: {
                          "key": "key_example",
                        },
                      },
                      name: "name_example",
                      optional: true,
                      path: "path_example",
                      signerName: "signerName_example",
                    },
                    configMap: {
                      items: [
                        {
                          key: "key_example",
                          mode: 1,
                          path: "path_example",
                        },
                      ],
                      name: "name_example",
                      optional: true,
                    },
                    downwardAPI: {
                      items: [
                        {
                          fieldRef: {
                            apiVersion: "apiVersion_example",
                            fieldPath: "fieldPath_example",
                          },
                          mode: 1,
                          path: "path_example",
                          resourceFieldRef: {
                            containerName: "containerName_example",
                            divisor: "divisor_example",
                            resource: "resource_example",
                          },
                        },
                      ],
                    },
                    podCertificate: {
                      certificateChainPath: "certificateChainPath_example",
                      credentialBundlePath: "credentialBundlePath_example",
                      keyPath: "keyPath_example",
                      keyType: "keyType_example",
                      maxExpirationSeconds: 1,
                      signerName: "signerName_example",
                    },
                    secret: {
                      items: [
                        {
                          key: "key_example",
                          mode: 1,
                          path: "path_example",
                        },
                      ],
                      name: "name_example",
                      optional: true,
                    },
                    serviceAccountToken: {
                      audience: "audience_example",
                      expirationSeconds: 1,
                      path: "path_example",
                    },
                  },
                ],
              },
              quobyte: {
                group: "group_example",
                readOnly: true,
                registry: "registry_example",
                tenant: "tenant_example",
                user: "user_example",
                volume: "volume_example",
              },
              rbd: {
                fsType: "fsType_example",
                image: "image_example",
                keyring: "keyring_example",
                monitors: [
                  "monitors_example",
                ],
                pool: "pool_example",
                readOnly: true,
                secretRef: {
                  name: "name_example",
                },
                user: "user_example",
              },
              scaleIO: {
                fsType: "fsType_example",
                gateway: "gateway_example",
                protectionDomain: "protectionDomain_example",
                readOnly: true,
                secretRef: {
                  name: "name_example",
                },
                sslEnabled: true,
                storageMode: "storageMode_example",
                storagePool: "storagePool_example",
                system: "system_example",
                volumeName: "volumeName_example",
              },
              secret: {
                defaultMode: 1,
                items: [
                  {
                    key: "key_example",
                    mode: 1,
                    path: "path_example",
                  },
                ],
                optional: true,
                secretName: "secretName_example",
              },
              storageos: {
                fsType: "fsType_example",
                readOnly: true,
                secretRef: {
                  name: "name_example",
                },
                volumeName: "volumeName_example",
                volumeNamespace: "volumeNamespace_example",
              },
              vsphereVolume: {
                fsType: "fsType_example",
                storagePolicyID: "storagePolicyID_example",
                storagePolicyName: "storagePolicyName_example",
                volumePath: "volumePath_example",
              },
            },
          ],
        },
      },
      ttlSecondsAfterFinished: 1,
    },
    status: {
      active: 1,
      completedIndexes: "completedIndexes_example",
      completionTime: new Date('1970-01-01T00:00:00.00Z'),
      conditions: [
        {
          lastProbeTime: new Date('1970-01-01T00:00:00.00Z'),
          lastTransitionTime: new Date('1970-01-01T00:00:00.00Z'),
          message: "message_example",
          reason: "reason_example",
          status: "status_example",
          type: "type_example",
        },
      ],
      failed: 1,
      failedIndexes: "failedIndexes_example",
      ready: 1,
      startTime: new Date('1970-01-01T00:00:00.00Z'),
      succeeded: 1,
      terminating: 1,
      uncountedTerminatedPods: {
        failed: [
          "failed_example",
        ],
        succeeded: [
          "succeeded_example",
        ],
      },
    },
  },
    // If \'true\', then the output is pretty printed. Defaults to \'false\' unless the user-agent indicates a browser or command-line HTTP tool (curl and wget). (optional)
  pretty: "pretty_example",
    // When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed (optional)
  dryRun: "dryRun_example",
    // fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. (optional)
  fieldManager: "fieldManager_example",
    // fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. (optional)
  fieldValidation: "fieldValidation_example",
};

const data = await apiInstance.replaceNamespacedJobStatus(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **V1Job**|  |
 **name** | [**string**] | name of the Job | defaults to undefined
 **namespace** | [**string**] | object name and auth scope, such as for teams and projects | defaults to undefined
 **pretty** | [**string**] | If \&#39;true\&#39;, then the output is pretty printed. Defaults to \&#39;false\&#39; unless the user-agent indicates a browser or command-line HTTP tool (curl and wget). | (optional) defaults to undefined
 **dryRun** | [**string**] | When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed | (optional) defaults to undefined
 **fieldManager** | [**string**] | fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. | (optional) defaults to undefined
 **fieldValidation** | [**string**] | fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default in v1.23+ - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. | (optional) defaults to undefined


### Return type

**V1Job**

### Authorization

[BearerToken](README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf, application/cbor


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**201** | Created |  -  |
**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


