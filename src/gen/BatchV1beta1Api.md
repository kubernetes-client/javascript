# .BatchV1beta1Api

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createNamespacedCronJob**](BatchV1beta1Api.md#createNamespacedCronJob) | **POST** /apis/batch/v1beta1/namespaces/{namespace}/cronjobs | 
[**deleteCollectionNamespacedCronJob**](BatchV1beta1Api.md#deleteCollectionNamespacedCronJob) | **DELETE** /apis/batch/v1beta1/namespaces/{namespace}/cronjobs | 
[**deleteNamespacedCronJob**](BatchV1beta1Api.md#deleteNamespacedCronJob) | **DELETE** /apis/batch/v1beta1/namespaces/{namespace}/cronjobs/{name} | 
[**getAPIResources**](BatchV1beta1Api.md#getAPIResources) | **GET** /apis/batch/v1beta1/ | 
[**listCronJobForAllNamespaces**](BatchV1beta1Api.md#listCronJobForAllNamespaces) | **GET** /apis/batch/v1beta1/cronjobs | 
[**listNamespacedCronJob**](BatchV1beta1Api.md#listNamespacedCronJob) | **GET** /apis/batch/v1beta1/namespaces/{namespace}/cronjobs | 
[**patchNamespacedCronJob**](BatchV1beta1Api.md#patchNamespacedCronJob) | **PATCH** /apis/batch/v1beta1/namespaces/{namespace}/cronjobs/{name} | 
[**patchNamespacedCronJobStatus**](BatchV1beta1Api.md#patchNamespacedCronJobStatus) | **PATCH** /apis/batch/v1beta1/namespaces/{namespace}/cronjobs/{name}/status | 
[**readNamespacedCronJob**](BatchV1beta1Api.md#readNamespacedCronJob) | **GET** /apis/batch/v1beta1/namespaces/{namespace}/cronjobs/{name} | 
[**readNamespacedCronJobStatus**](BatchV1beta1Api.md#readNamespacedCronJobStatus) | **GET** /apis/batch/v1beta1/namespaces/{namespace}/cronjobs/{name}/status | 
[**replaceNamespacedCronJob**](BatchV1beta1Api.md#replaceNamespacedCronJob) | **PUT** /apis/batch/v1beta1/namespaces/{namespace}/cronjobs/{name} | 
[**replaceNamespacedCronJobStatus**](BatchV1beta1Api.md#replaceNamespacedCronJobStatus) | **PUT** /apis/batch/v1beta1/namespaces/{namespace}/cronjobs/{name}/status | 


# **createNamespacedCronJob**
> V1beta1CronJob createNamespacedCronJob(body)

create a CronJob

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .BatchV1beta1Api(configuration);

let body:.BatchV1beta1ApiCreateNamespacedCronJobRequest = {
  // string | object name and auth scope, such as for teams and projects
  namespace: "namespace_example",
  // V1beta1CronJob
  body: {
    apiVersion: "apiVersion_example",
    kind: "kind_example",
    metadata: {
      annotations: {
        "key": "key_example",
      },
      clusterName: "clusterName_example",
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
          clusterName: "clusterName_example",
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
          completionMode: "completionMode_example",
          completions: 1,
          manualSelector: true,
          parallelism: 1,
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
          suspend: true,
          template: {
            metadata: {
              annotations: {
                "key": "key_example",
              },
              clusterName: "clusterName_example",
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
                      tcpSocket: {
                        host: "host_example",
                        port: "port_example",
                      },
                    },
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
                  resources: {
                    limits: {
                      "key": "key_example",
                    },
                    requests: {
                      "key": "key_example",
                    },
                  },
                  securityContext: {
                    allowPrivilegeEscalation: true,
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
                      tcpSocket: {
                        host: "host_example",
                        port: "port_example",
                      },
                    },
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
                  resources: {
                    limits: {
                      "key": "key_example",
                    },
                    requests: {
                      "key": "key_example",
                    },
                  },
                  securityContext: {
                    allowPrivilegeEscalation: true,
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
              hostname: "hostname_example",
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
                      tcpSocket: {
                        host: "host_example",
                        port: "port_example",
                      },
                    },
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
                  resources: {
                    limits: {
                      "key": "key_example",
                    },
                    requests: {
                      "key": "key_example",
                    },
                  },
                  securityContext: {
                    allowPrivilegeEscalation: true,
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
              restartPolicy: "restartPolicy_example",
              runtimeClassName: "runtimeClassName_example",
              schedulerName: "schedulerName_example",
              securityContext: {
                fsGroup: 1,
                fsGroupChangePolicy: "fsGroupChangePolicy_example",
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
                supplementalGroups: [
                  1,
                ],
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
                  maxSkew: 1,
                  minDomains: 1,
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
                        clusterName: "clusterName_example",
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
  // string | If 'true', then the output is pretty printed. (optional)
  pretty: "pretty_example",
  // string | When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed (optional)
  dryRun: "dryRun_example",
  // string | fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. (optional)
  fieldManager: "fieldManager_example",
  // string | fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields, provided that the `ServerSideFieldValidation` feature gate is also enabled. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23 and is the default behavior when the `ServerSideFieldValidation` feature gate is disabled. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default when the `ServerSideFieldValidation` feature gate is enabled. - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. (optional)
  fieldValidation: "fieldValidation_example",
};

apiInstance.createNamespacedCronJob(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **V1beta1CronJob**|  |
 **namespace** | [**string**] | object name and auth scope, such as for teams and projects | defaults to undefined
 **pretty** | [**string**] | If &#39;true&#39;, then the output is pretty printed. | (optional) defaults to undefined
 **dryRun** | [**string**] | When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed | (optional) defaults to undefined
 **fieldManager** | [**string**] | fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. | (optional) defaults to undefined
 **fieldValidation** | [**string**] | fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields, provided that the &#x60;ServerSideFieldValidation&#x60; feature gate is also enabled. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23 and is the default behavior when the &#x60;ServerSideFieldValidation&#x60; feature gate is disabled. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default when the &#x60;ServerSideFieldValidation&#x60; feature gate is enabled. - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. | (optional) defaults to undefined


### Return type

**V1beta1CronJob**

### Authorization

[BearerToken](README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf


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
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .BatchV1beta1Api(configuration);

let body:.BatchV1beta1ApiDeleteCollectionNamespacedCronJobRequest = {
  // string | object name and auth scope, such as for teams and projects
  namespace: "namespace_example",
  // string | If 'true', then the output is pretty printed. (optional)
  pretty: "pretty_example",
  // string | The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \"next key\".  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications. (optional)
  _continue: "continue_example",
  // string | When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed (optional)
  dryRun: "dryRun_example",
  // string | A selector to restrict the list of returned objects by their fields. Defaults to everything. (optional)
  fieldSelector: "fieldSelector_example",
  // number | The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately. (optional)
  gracePeriodSeconds: 1,
  // string | A selector to restrict the list of returned objects by their labels. Defaults to everything. (optional)
  labelSelector: "labelSelector_example",
  // number | limit is a maximum number of responses to return for a list call. If more items exist, the server will set the `continue` field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned. (optional)
  limit: 1,
  // boolean | Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \"orphan\" finalizer will be added to/removed from the object's finalizers list. Either this field or PropagationPolicy may be set, but not both. (optional)
  orphanDependents: true,
  // string | Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: 'Orphan' - orphan the dependents; 'Background' - allow the garbage collector to delete the dependents in the background; 'Foreground' - a cascading policy that deletes all dependents in the foreground. (optional)
  propagationPolicy: "propagationPolicy_example",
  // string | resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset (optional)
  resourceVersion: "resourceVersion_example",
  // string | resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset (optional)
  resourceVersionMatch: "resourceVersionMatch_example",
  // number | Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity. (optional)
  timeoutSeconds: 1,
  // V1DeleteOptions (optional)
  body: {
    apiVersion: "apiVersion_example",
    dryRun: [
      "dryRun_example",
    ],
    gracePeriodSeconds: 1,
    kind: "kind_example",
    orphanDependents: true,
    preconditions: {
      resourceVersion: "resourceVersion_example",
      uid: "uid_example",
    },
    propagationPolicy: "propagationPolicy_example",
  },
};

apiInstance.deleteCollectionNamespacedCronJob(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **V1DeleteOptions**|  |
 **namespace** | [**string**] | object name and auth scope, such as for teams and projects | defaults to undefined
 **pretty** | [**string**] | If &#39;true&#39;, then the output is pretty printed. | (optional) defaults to undefined
 **_continue** | [**string**] | The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications. | (optional) defaults to undefined
 **dryRun** | [**string**] | When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed | (optional) defaults to undefined
 **fieldSelector** | [**string**] | A selector to restrict the list of returned objects by their fields. Defaults to everything. | (optional) defaults to undefined
 **gracePeriodSeconds** | [**number**] | The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately. | (optional) defaults to undefined
 **labelSelector** | [**string**] | A selector to restrict the list of returned objects by their labels. Defaults to everything. | (optional) defaults to undefined
 **limit** | [**number**] | limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned. | (optional) defaults to undefined
 **orphanDependents** | [**boolean**] | Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both. | (optional) defaults to undefined
 **propagationPolicy** | [**string**] | Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: &#39;Orphan&#39; - orphan the dependents; &#39;Background&#39; - allow the garbage collector to delete the dependents in the background; &#39;Foreground&#39; - a cascading policy that deletes all dependents in the foreground. | (optional) defaults to undefined
 **resourceVersion** | [**string**] | resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset | (optional) defaults to undefined
 **resourceVersionMatch** | [**string**] | resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset | (optional) defaults to undefined
 **timeoutSeconds** | [**number**] | Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity. | (optional) defaults to undefined


### Return type

**V1Status**

### Authorization

[BearerToken](README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf


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
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .BatchV1beta1Api(configuration);

let body:.BatchV1beta1ApiDeleteNamespacedCronJobRequest = {
  // string | name of the CronJob
  name: "name_example",
  // string | object name and auth scope, such as for teams and projects
  namespace: "namespace_example",
  // string | If 'true', then the output is pretty printed. (optional)
  pretty: "pretty_example",
  // string | When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed (optional)
  dryRun: "dryRun_example",
  // number | The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately. (optional)
  gracePeriodSeconds: 1,
  // boolean | Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \"orphan\" finalizer will be added to/removed from the object's finalizers list. Either this field or PropagationPolicy may be set, but not both. (optional)
  orphanDependents: true,
  // string | Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: 'Orphan' - orphan the dependents; 'Background' - allow the garbage collector to delete the dependents in the background; 'Foreground' - a cascading policy that deletes all dependents in the foreground. (optional)
  propagationPolicy: "propagationPolicy_example",
  // V1DeleteOptions (optional)
  body: {
    apiVersion: "apiVersion_example",
    dryRun: [
      "dryRun_example",
    ],
    gracePeriodSeconds: 1,
    kind: "kind_example",
    orphanDependents: true,
    preconditions: {
      resourceVersion: "resourceVersion_example",
      uid: "uid_example",
    },
    propagationPolicy: "propagationPolicy_example",
  },
};

apiInstance.deleteNamespacedCronJob(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **V1DeleteOptions**|  |
 **name** | [**string**] | name of the CronJob | defaults to undefined
 **namespace** | [**string**] | object name and auth scope, such as for teams and projects | defaults to undefined
 **pretty** | [**string**] | If &#39;true&#39;, then the output is pretty printed. | (optional) defaults to undefined
 **dryRun** | [**string**] | When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed | (optional) defaults to undefined
 **gracePeriodSeconds** | [**number**] | The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately. | (optional) defaults to undefined
 **orphanDependents** | [**boolean**] | Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both. | (optional) defaults to undefined
 **propagationPolicy** | [**string**] | Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy. Acceptable values are: &#39;Orphan&#39; - orphan the dependents; &#39;Background&#39; - allow the garbage collector to delete the dependents in the background; &#39;Foreground&#39; - a cascading policy that deletes all dependents in the foreground. | (optional) defaults to undefined


### Return type

**V1Status**

### Authorization

[BearerToken](README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf


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
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .BatchV1beta1Api(configuration);

let body:any = {};

apiInstance.getAPIResources(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters
This endpoint does not need any parameter.


### Return type

**V1APIResourceList**

### Authorization

[BearerToken](README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **listCronJobForAllNamespaces**
> V1beta1CronJobList listCronJobForAllNamespaces()

list or watch objects of kind CronJob

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .BatchV1beta1Api(configuration);

let body:.BatchV1beta1ApiListCronJobForAllNamespacesRequest = {
  // boolean | allowWatchBookmarks requests watch events with type \"BOOKMARK\". Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server's discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored. (optional)
  allowWatchBookmarks: true,
  // string | The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \"next key\".  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications. (optional)
  _continue: "continue_example",
  // string | A selector to restrict the list of returned objects by their fields. Defaults to everything. (optional)
  fieldSelector: "fieldSelector_example",
  // string | A selector to restrict the list of returned objects by their labels. Defaults to everything. (optional)
  labelSelector: "labelSelector_example",
  // number | limit is a maximum number of responses to return for a list call. If more items exist, the server will set the `continue` field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned. (optional)
  limit: 1,
  // string | If 'true', then the output is pretty printed. (optional)
  pretty: "pretty_example",
  // string | resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset (optional)
  resourceVersion: "resourceVersion_example",
  // string | resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset (optional)
  resourceVersionMatch: "resourceVersionMatch_example",
  // number | Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity. (optional)
  timeoutSeconds: 1,
  // boolean | Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion. (optional)
  watch: true,
};

apiInstance.listCronJobForAllNamespaces(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **allowWatchBookmarks** | [**boolean**] | allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored. | (optional) defaults to undefined
 **_continue** | [**string**] | The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications. | (optional) defaults to undefined
 **fieldSelector** | [**string**] | A selector to restrict the list of returned objects by their fields. Defaults to everything. | (optional) defaults to undefined
 **labelSelector** | [**string**] | A selector to restrict the list of returned objects by their labels. Defaults to everything. | (optional) defaults to undefined
 **limit** | [**number**] | limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned. | (optional) defaults to undefined
 **pretty** | [**string**] | If &#39;true&#39;, then the output is pretty printed. | (optional) defaults to undefined
 **resourceVersion** | [**string**] | resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset | (optional) defaults to undefined
 **resourceVersionMatch** | [**string**] | resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset | (optional) defaults to undefined
 **timeoutSeconds** | [**number**] | Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity. | (optional) defaults to undefined
 **watch** | [**boolean**] | Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion. | (optional) defaults to undefined


### Return type

**V1beta1CronJobList**

### Authorization

[BearerToken](README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf, application/json;stream=watch, application/vnd.kubernetes.protobuf;stream=watch


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **listNamespacedCronJob**
> V1beta1CronJobList listNamespacedCronJob()

list or watch objects of kind CronJob

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .BatchV1beta1Api(configuration);

let body:.BatchV1beta1ApiListNamespacedCronJobRequest = {
  // string | object name and auth scope, such as for teams and projects
  namespace: "namespace_example",
  // string | If 'true', then the output is pretty printed. (optional)
  pretty: "pretty_example",
  // boolean | allowWatchBookmarks requests watch events with type \"BOOKMARK\". Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server's discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored. (optional)
  allowWatchBookmarks: true,
  // string | The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \"next key\".  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications. (optional)
  _continue: "continue_example",
  // string | A selector to restrict the list of returned objects by their fields. Defaults to everything. (optional)
  fieldSelector: "fieldSelector_example",
  // string | A selector to restrict the list of returned objects by their labels. Defaults to everything. (optional)
  labelSelector: "labelSelector_example",
  // number | limit is a maximum number of responses to return for a list call. If more items exist, the server will set the `continue` field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned. (optional)
  limit: 1,
  // string | resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset (optional)
  resourceVersion: "resourceVersion_example",
  // string | resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset (optional)
  resourceVersionMatch: "resourceVersionMatch_example",
  // number | Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity. (optional)
  timeoutSeconds: 1,
  // boolean | Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion. (optional)
  watch: true,
};

apiInstance.listNamespacedCronJob(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **namespace** | [**string**] | object name and auth scope, such as for teams and projects | defaults to undefined
 **pretty** | [**string**] | If &#39;true&#39;, then the output is pretty printed. | (optional) defaults to undefined
 **allowWatchBookmarks** | [**boolean**] | allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored. | (optional) defaults to undefined
 **_continue** | [**string**] | The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications. | (optional) defaults to undefined
 **fieldSelector** | [**string**] | A selector to restrict the list of returned objects by their fields. Defaults to everything. | (optional) defaults to undefined
 **labelSelector** | [**string**] | A selector to restrict the list of returned objects by their labels. Defaults to everything. | (optional) defaults to undefined
 **limit** | [**number**] | limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned. | (optional) defaults to undefined
 **resourceVersion** | [**string**] | resourceVersion sets a constraint on what resource versions a request may be served from. See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset | (optional) defaults to undefined
 **resourceVersionMatch** | [**string**] | resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset | (optional) defaults to undefined
 **timeoutSeconds** | [**number**] | Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity. | (optional) defaults to undefined
 **watch** | [**boolean**] | Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion. | (optional) defaults to undefined


### Return type

**V1beta1CronJobList**

### Authorization

[BearerToken](README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf, application/json;stream=watch, application/vnd.kubernetes.protobuf;stream=watch


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **patchNamespacedCronJob**
> V1beta1CronJob patchNamespacedCronJob(body)

partially update the specified CronJob

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .BatchV1beta1Api(configuration);

let body:.BatchV1beta1ApiPatchNamespacedCronJobRequest = {
  // string | name of the CronJob
  name: "name_example",
  // string | object name and auth scope, such as for teams and projects
  namespace: "namespace_example",
  // any
  body: {},
  // string | If 'true', then the output is pretty printed. (optional)
  pretty: "pretty_example",
  // string | When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed (optional)
  dryRun: "dryRun_example",
  // string | fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch). (optional)
  fieldManager: "fieldManager_example",
  // string | fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields, provided that the `ServerSideFieldValidation` feature gate is also enabled. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23 and is the default behavior when the `ServerSideFieldValidation` feature gate is disabled. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default when the `ServerSideFieldValidation` feature gate is enabled. - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. (optional)
  fieldValidation: "fieldValidation_example",
  // boolean | Force is going to \"force\" Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests. (optional)
  force: true,
};

apiInstance.patchNamespacedCronJob(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **any**|  |
 **name** | [**string**] | name of the CronJob | defaults to undefined
 **namespace** | [**string**] | object name and auth scope, such as for teams and projects | defaults to undefined
 **pretty** | [**string**] | If &#39;true&#39;, then the output is pretty printed. | (optional) defaults to undefined
 **dryRun** | [**string**] | When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed | (optional) defaults to undefined
 **fieldManager** | [**string**] | fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch). | (optional) defaults to undefined
 **fieldValidation** | [**string**] | fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields, provided that the &#x60;ServerSideFieldValidation&#x60; feature gate is also enabled. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23 and is the default behavior when the &#x60;ServerSideFieldValidation&#x60; feature gate is disabled. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default when the &#x60;ServerSideFieldValidation&#x60; feature gate is enabled. - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. | (optional) defaults to undefined
 **force** | [**boolean**] | Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests. | (optional) defaults to undefined


### Return type

**V1beta1CronJob**

### Authorization

[BearerToken](README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: application/json-patch+json, application/merge-patch+json, application/strategic-merge-patch+json, application/apply-patch+yaml
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**201** | Created |  -  |
**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **patchNamespacedCronJobStatus**
> V1beta1CronJob patchNamespacedCronJobStatus(body)

partially update status of the specified CronJob

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .BatchV1beta1Api(configuration);

let body:.BatchV1beta1ApiPatchNamespacedCronJobStatusRequest = {
  // string | name of the CronJob
  name: "name_example",
  // string | object name and auth scope, such as for teams and projects
  namespace: "namespace_example",
  // any
  body: {},
  // string | If 'true', then the output is pretty printed. (optional)
  pretty: "pretty_example",
  // string | When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed (optional)
  dryRun: "dryRun_example",
  // string | fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch). (optional)
  fieldManager: "fieldManager_example",
  // string | fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields, provided that the `ServerSideFieldValidation` feature gate is also enabled. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23 and is the default behavior when the `ServerSideFieldValidation` feature gate is disabled. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default when the `ServerSideFieldValidation` feature gate is enabled. - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. (optional)
  fieldValidation: "fieldValidation_example",
  // boolean | Force is going to \"force\" Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests. (optional)
  force: true,
};

apiInstance.patchNamespacedCronJobStatus(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **any**|  |
 **name** | [**string**] | name of the CronJob | defaults to undefined
 **namespace** | [**string**] | object name and auth scope, such as for teams and projects | defaults to undefined
 **pretty** | [**string**] | If &#39;true&#39;, then the output is pretty printed. | (optional) defaults to undefined
 **dryRun** | [**string**] | When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed | (optional) defaults to undefined
 **fieldManager** | [**string**] | fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch). | (optional) defaults to undefined
 **fieldValidation** | [**string**] | fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields, provided that the &#x60;ServerSideFieldValidation&#x60; feature gate is also enabled. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23 and is the default behavior when the &#x60;ServerSideFieldValidation&#x60; feature gate is disabled. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default when the &#x60;ServerSideFieldValidation&#x60; feature gate is enabled. - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. | (optional) defaults to undefined
 **force** | [**boolean**] | Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests. | (optional) defaults to undefined


### Return type

**V1beta1CronJob**

### Authorization

[BearerToken](README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: application/json-patch+json, application/merge-patch+json, application/strategic-merge-patch+json, application/apply-patch+yaml
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**201** | Created |  -  |
**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **readNamespacedCronJob**
> V1beta1CronJob readNamespacedCronJob()

read the specified CronJob

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .BatchV1beta1Api(configuration);

let body:.BatchV1beta1ApiReadNamespacedCronJobRequest = {
  // string | name of the CronJob
  name: "name_example",
  // string | object name and auth scope, such as for teams and projects
  namespace: "namespace_example",
  // string | If 'true', then the output is pretty printed. (optional)
  pretty: "pretty_example",
};

apiInstance.readNamespacedCronJob(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **name** | [**string**] | name of the CronJob | defaults to undefined
 **namespace** | [**string**] | object name and auth scope, such as for teams and projects | defaults to undefined
 **pretty** | [**string**] | If &#39;true&#39;, then the output is pretty printed. | (optional) defaults to undefined


### Return type

**V1beta1CronJob**

### Authorization

[BearerToken](README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **readNamespacedCronJobStatus**
> V1beta1CronJob readNamespacedCronJobStatus()

read status of the specified CronJob

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .BatchV1beta1Api(configuration);

let body:.BatchV1beta1ApiReadNamespacedCronJobStatusRequest = {
  // string | name of the CronJob
  name: "name_example",
  // string | object name and auth scope, such as for teams and projects
  namespace: "namespace_example",
  // string | If 'true', then the output is pretty printed. (optional)
  pretty: "pretty_example",
};

apiInstance.readNamespacedCronJobStatus(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **name** | [**string**] | name of the CronJob | defaults to undefined
 **namespace** | [**string**] | object name and auth scope, such as for teams and projects | defaults to undefined
 **pretty** | [**string**] | If &#39;true&#39;, then the output is pretty printed. | (optional) defaults to undefined


### Return type

**V1beta1CronJob**

### Authorization

[BearerToken](README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **replaceNamespacedCronJob**
> V1beta1CronJob replaceNamespacedCronJob(body)

replace the specified CronJob

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .BatchV1beta1Api(configuration);

let body:.BatchV1beta1ApiReplaceNamespacedCronJobRequest = {
  // string | name of the CronJob
  name: "name_example",
  // string | object name and auth scope, such as for teams and projects
  namespace: "namespace_example",
  // V1beta1CronJob
  body: {
    apiVersion: "apiVersion_example",
    kind: "kind_example",
    metadata: {
      annotations: {
        "key": "key_example",
      },
      clusterName: "clusterName_example",
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
          clusterName: "clusterName_example",
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
          completionMode: "completionMode_example",
          completions: 1,
          manualSelector: true,
          parallelism: 1,
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
          suspend: true,
          template: {
            metadata: {
              annotations: {
                "key": "key_example",
              },
              clusterName: "clusterName_example",
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
                      tcpSocket: {
                        host: "host_example",
                        port: "port_example",
                      },
                    },
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
                  resources: {
                    limits: {
                      "key": "key_example",
                    },
                    requests: {
                      "key": "key_example",
                    },
                  },
                  securityContext: {
                    allowPrivilegeEscalation: true,
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
                      tcpSocket: {
                        host: "host_example",
                        port: "port_example",
                      },
                    },
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
                  resources: {
                    limits: {
                      "key": "key_example",
                    },
                    requests: {
                      "key": "key_example",
                    },
                  },
                  securityContext: {
                    allowPrivilegeEscalation: true,
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
              hostname: "hostname_example",
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
                      tcpSocket: {
                        host: "host_example",
                        port: "port_example",
                      },
                    },
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
                  resources: {
                    limits: {
                      "key": "key_example",
                    },
                    requests: {
                      "key": "key_example",
                    },
                  },
                  securityContext: {
                    allowPrivilegeEscalation: true,
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
              restartPolicy: "restartPolicy_example",
              runtimeClassName: "runtimeClassName_example",
              schedulerName: "schedulerName_example",
              securityContext: {
                fsGroup: 1,
                fsGroupChangePolicy: "fsGroupChangePolicy_example",
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
                supplementalGroups: [
                  1,
                ],
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
                  maxSkew: 1,
                  minDomains: 1,
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
                        clusterName: "clusterName_example",
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
  // string | If 'true', then the output is pretty printed. (optional)
  pretty: "pretty_example",
  // string | When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed (optional)
  dryRun: "dryRun_example",
  // string | fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. (optional)
  fieldManager: "fieldManager_example",
  // string | fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields, provided that the `ServerSideFieldValidation` feature gate is also enabled. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23 and is the default behavior when the `ServerSideFieldValidation` feature gate is disabled. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default when the `ServerSideFieldValidation` feature gate is enabled. - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. (optional)
  fieldValidation: "fieldValidation_example",
};

apiInstance.replaceNamespacedCronJob(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **V1beta1CronJob**|  |
 **name** | [**string**] | name of the CronJob | defaults to undefined
 **namespace** | [**string**] | object name and auth scope, such as for teams and projects | defaults to undefined
 **pretty** | [**string**] | If &#39;true&#39;, then the output is pretty printed. | (optional) defaults to undefined
 **dryRun** | [**string**] | When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed | (optional) defaults to undefined
 **fieldManager** | [**string**] | fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. | (optional) defaults to undefined
 **fieldValidation** | [**string**] | fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields, provided that the &#x60;ServerSideFieldValidation&#x60; feature gate is also enabled. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23 and is the default behavior when the &#x60;ServerSideFieldValidation&#x60; feature gate is disabled. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default when the &#x60;ServerSideFieldValidation&#x60; feature gate is enabled. - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. | (optional) defaults to undefined


### Return type

**V1beta1CronJob**

### Authorization

[BearerToken](README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**201** | Created |  -  |
**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **replaceNamespacedCronJobStatus**
> V1beta1CronJob replaceNamespacedCronJobStatus(body)

replace status of the specified CronJob

### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .BatchV1beta1Api(configuration);

let body:.BatchV1beta1ApiReplaceNamespacedCronJobStatusRequest = {
  // string | name of the CronJob
  name: "name_example",
  // string | object name and auth scope, such as for teams and projects
  namespace: "namespace_example",
  // V1beta1CronJob
  body: {
    apiVersion: "apiVersion_example",
    kind: "kind_example",
    metadata: {
      annotations: {
        "key": "key_example",
      },
      clusterName: "clusterName_example",
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
          clusterName: "clusterName_example",
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
          completionMode: "completionMode_example",
          completions: 1,
          manualSelector: true,
          parallelism: 1,
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
          suspend: true,
          template: {
            metadata: {
              annotations: {
                "key": "key_example",
              },
              clusterName: "clusterName_example",
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
                      tcpSocket: {
                        host: "host_example",
                        port: "port_example",
                      },
                    },
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
                  resources: {
                    limits: {
                      "key": "key_example",
                    },
                    requests: {
                      "key": "key_example",
                    },
                  },
                  securityContext: {
                    allowPrivilegeEscalation: true,
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
                      tcpSocket: {
                        host: "host_example",
                        port: "port_example",
                      },
                    },
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
                  resources: {
                    limits: {
                      "key": "key_example",
                    },
                    requests: {
                      "key": "key_example",
                    },
                  },
                  securityContext: {
                    allowPrivilegeEscalation: true,
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
              hostname: "hostname_example",
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
                      tcpSocket: {
                        host: "host_example",
                        port: "port_example",
                      },
                    },
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
                  resources: {
                    limits: {
                      "key": "key_example",
                    },
                    requests: {
                      "key": "key_example",
                    },
                  },
                  securityContext: {
                    allowPrivilegeEscalation: true,
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
              restartPolicy: "restartPolicy_example",
              runtimeClassName: "runtimeClassName_example",
              schedulerName: "schedulerName_example",
              securityContext: {
                fsGroup: 1,
                fsGroupChangePolicy: "fsGroupChangePolicy_example",
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
                supplementalGroups: [
                  1,
                ],
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
                  maxSkew: 1,
                  minDomains: 1,
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
                        clusterName: "clusterName_example",
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
  // string | If 'true', then the output is pretty printed. (optional)
  pretty: "pretty_example",
  // string | When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed (optional)
  dryRun: "dryRun_example",
  // string | fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. (optional)
  fieldManager: "fieldManager_example",
  // string | fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields, provided that the `ServerSideFieldValidation` feature gate is also enabled. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23 and is the default behavior when the `ServerSideFieldValidation` feature gate is disabled. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default when the `ServerSideFieldValidation` feature gate is enabled. - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. (optional)
  fieldValidation: "fieldValidation_example",
};

apiInstance.replaceNamespacedCronJobStatus(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **V1beta1CronJob**|  |
 **name** | [**string**] | name of the CronJob | defaults to undefined
 **namespace** | [**string**] | object name and auth scope, such as for teams and projects | defaults to undefined
 **pretty** | [**string**] | If &#39;true&#39;, then the output is pretty printed. | (optional) defaults to undefined
 **dryRun** | [**string**] | When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed | (optional) defaults to undefined
 **fieldManager** | [**string**] | fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. | (optional) defaults to undefined
 **fieldValidation** | [**string**] | fieldValidation instructs the server on how to handle objects in the request (POST/PUT/PATCH) containing unknown or duplicate fields, provided that the &#x60;ServerSideFieldValidation&#x60; feature gate is also enabled. Valid values are: - Ignore: This will ignore any unknown fields that are silently dropped from the object, and will ignore all but the last duplicate field that the decoder encounters. This is the default behavior prior to v1.23 and is the default behavior when the &#x60;ServerSideFieldValidation&#x60; feature gate is disabled. - Warn: This will send a warning via the standard warning response header for each unknown field that is dropped from the object, and for each duplicate field that is encountered. The request will still succeed if there are no other errors, and will only persist the last of any duplicate fields. This is the default when the &#x60;ServerSideFieldValidation&#x60; feature gate is enabled. - Strict: This will fail the request with a BadRequest error if any unknown fields would be dropped from the object, or if any duplicate fields are present. The error returned from the server will contain all unknown and duplicate fields encountered. | (optional) defaults to undefined


### Return type

**V1beta1CronJob**

### Authorization

[BearerToken](README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**201** | Created |  -  |
**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


