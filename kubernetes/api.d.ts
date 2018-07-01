import request = require('request');
import http = require('http');
import Promise = require('bluebird');
export declare class AdmissionregistrationV1beta1ServiceReference {
    'name': string;
    'namespace': string;
    'path': string;
}
export declare class ApiregistrationV1beta1ServiceReference {
    'name': string;
    'namespace': string;
}
export declare class AppsV1beta1Deployment {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': AppsV1beta1DeploymentSpec;
    'status': AppsV1beta1DeploymentStatus;
}
export declare class AppsV1beta1DeploymentCondition {
    'lastTransitionTime': Date;
    'lastUpdateTime': Date;
    'message': string;
    'reason': string;
    'status': string;
    'type': string;
}
export declare class AppsV1beta1DeploymentList {
    'apiVersion': string;
    'items': Array<AppsV1beta1Deployment>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class AppsV1beta1DeploymentRollback {
    'apiVersion': string;
    'kind': string;
    'name': string;
    'rollbackTo': AppsV1beta1RollbackConfig;
    'updatedAnnotations': {
        [key: string]: string;
    };
}
export declare class AppsV1beta1DeploymentSpec {
    'minReadySeconds': number;
    'paused': boolean;
    'progressDeadlineSeconds': number;
    'replicas': number;
    'revisionHistoryLimit': number;
    'rollbackTo': AppsV1beta1RollbackConfig;
    'selector': V1LabelSelector;
    'strategy': AppsV1beta1DeploymentStrategy;
    'template': V1PodTemplateSpec;
}
export declare class AppsV1beta1DeploymentStatus {
    'availableReplicas': number;
    'collisionCount': number;
    'conditions': Array<AppsV1beta1DeploymentCondition>;
    'observedGeneration': number;
    'readyReplicas': number;
    'replicas': number;
    'unavailableReplicas': number;
    'updatedReplicas': number;
}
export declare class AppsV1beta1DeploymentStrategy {
    'rollingUpdate': AppsV1beta1RollingUpdateDeployment;
    'type': string;
}
export declare class AppsV1beta1RollbackConfig {
    'revision': number;
}
export declare class AppsV1beta1RollingUpdateDeployment {
    'maxSurge': any;
    'maxUnavailable': any;
}
export declare class AppsV1beta1Scale {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': AppsV1beta1ScaleSpec;
    'status': AppsV1beta1ScaleStatus;
}
export declare class AppsV1beta1ScaleSpec {
    'replicas': number;
}
export declare class AppsV1beta1ScaleStatus {
    'replicas': number;
    'selector': {
        [key: string]: string;
    };
    'targetSelector': string;
}
export declare class ExtensionsV1beta1AllowedFlexVolume {
    'driver': string;
}
export declare class ExtensionsV1beta1AllowedHostPath {
    'pathPrefix': string;
    'readOnly': boolean;
}
export declare class ExtensionsV1beta1Deployment {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': ExtensionsV1beta1DeploymentSpec;
    'status': ExtensionsV1beta1DeploymentStatus;
}
export declare class ExtensionsV1beta1DeploymentCondition {
    'lastTransitionTime': Date;
    'lastUpdateTime': Date;
    'message': string;
    'reason': string;
    'status': string;
    'type': string;
}
export declare class ExtensionsV1beta1DeploymentList {
    'apiVersion': string;
    'items': Array<ExtensionsV1beta1Deployment>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class ExtensionsV1beta1DeploymentRollback {
    'apiVersion': string;
    'kind': string;
    'name': string;
    'rollbackTo': ExtensionsV1beta1RollbackConfig;
    'updatedAnnotations': {
        [key: string]: string;
    };
}
export declare class ExtensionsV1beta1DeploymentSpec {
    'minReadySeconds': number;
    'paused': boolean;
    'progressDeadlineSeconds': number;
    'replicas': number;
    'revisionHistoryLimit': number;
    'rollbackTo': ExtensionsV1beta1RollbackConfig;
    'selector': V1LabelSelector;
    'strategy': ExtensionsV1beta1DeploymentStrategy;
    'template': V1PodTemplateSpec;
}
export declare class ExtensionsV1beta1DeploymentStatus {
    'availableReplicas': number;
    'collisionCount': number;
    'conditions': Array<ExtensionsV1beta1DeploymentCondition>;
    'observedGeneration': number;
    'readyReplicas': number;
    'replicas': number;
    'unavailableReplicas': number;
    'updatedReplicas': number;
}
export declare class ExtensionsV1beta1DeploymentStrategy {
    'rollingUpdate': ExtensionsV1beta1RollingUpdateDeployment;
    'type': string;
}
export declare class ExtensionsV1beta1FSGroupStrategyOptions {
    'ranges': Array<ExtensionsV1beta1IDRange>;
    'rule': string;
}
export declare class ExtensionsV1beta1HostPortRange {
    'max': number;
    'min': number;
}
export declare class ExtensionsV1beta1IDRange {
    'max': number;
    'min': number;
}
export declare class ExtensionsV1beta1PodSecurityPolicy {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': ExtensionsV1beta1PodSecurityPolicySpec;
}
export declare class ExtensionsV1beta1PodSecurityPolicyList {
    'apiVersion': string;
    'items': Array<ExtensionsV1beta1PodSecurityPolicy>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class ExtensionsV1beta1PodSecurityPolicySpec {
    'allowPrivilegeEscalation': boolean;
    'allowedCapabilities': Array<string>;
    'allowedFlexVolumes': Array<ExtensionsV1beta1AllowedFlexVolume>;
    'allowedHostPaths': Array<ExtensionsV1beta1AllowedHostPath>;
    'allowedUnsafeSysctls': Array<string>;
    'defaultAddCapabilities': Array<string>;
    'defaultAllowPrivilegeEscalation': boolean;
    'forbiddenSysctls': Array<string>;
    'fsGroup': ExtensionsV1beta1FSGroupStrategyOptions;
    'hostIPC': boolean;
    'hostNetwork': boolean;
    'hostPID': boolean;
    'hostPorts': Array<ExtensionsV1beta1HostPortRange>;
    'privileged': boolean;
    'readOnlyRootFilesystem': boolean;
    'requiredDropCapabilities': Array<string>;
    'runAsUser': ExtensionsV1beta1RunAsUserStrategyOptions;
    'seLinux': ExtensionsV1beta1SELinuxStrategyOptions;
    'supplementalGroups': ExtensionsV1beta1SupplementalGroupsStrategyOptions;
    'volumes': Array<string>;
}
export declare class ExtensionsV1beta1RollbackConfig {
    'revision': number;
}
export declare class ExtensionsV1beta1RollingUpdateDeployment {
    'maxSurge': any;
    'maxUnavailable': any;
}
export declare class ExtensionsV1beta1RunAsUserStrategyOptions {
    'ranges': Array<ExtensionsV1beta1IDRange>;
    'rule': string;
}
export declare class ExtensionsV1beta1SELinuxStrategyOptions {
    'rule': string;
    'seLinuxOptions': V1SELinuxOptions;
}
export declare class ExtensionsV1beta1Scale {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': ExtensionsV1beta1ScaleSpec;
    'status': ExtensionsV1beta1ScaleStatus;
}
export declare class ExtensionsV1beta1ScaleSpec {
    'replicas': number;
}
export declare class ExtensionsV1beta1ScaleStatus {
    'replicas': number;
    'selector': {
        [key: string]: string;
    };
    'targetSelector': string;
}
export declare class ExtensionsV1beta1SupplementalGroupsStrategyOptions {
    'ranges': Array<ExtensionsV1beta1IDRange>;
    'rule': string;
}
export declare class PolicyV1beta1AllowedFlexVolume {
    'driver': string;
}
export declare class PolicyV1beta1AllowedHostPath {
    'pathPrefix': string;
    'readOnly': boolean;
}
export declare class PolicyV1beta1FSGroupStrategyOptions {
    'ranges': Array<PolicyV1beta1IDRange>;
    'rule': string;
}
export declare class PolicyV1beta1HostPortRange {
    'max': number;
    'min': number;
}
export declare class PolicyV1beta1IDRange {
    'max': number;
    'min': number;
}
export declare class PolicyV1beta1PodSecurityPolicy {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': PolicyV1beta1PodSecurityPolicySpec;
}
export declare class PolicyV1beta1PodSecurityPolicyList {
    'apiVersion': string;
    'items': Array<PolicyV1beta1PodSecurityPolicy>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class PolicyV1beta1PodSecurityPolicySpec {
    'allowPrivilegeEscalation': boolean;
    'allowedCapabilities': Array<string>;
    'allowedFlexVolumes': Array<PolicyV1beta1AllowedFlexVolume>;
    'allowedHostPaths': Array<PolicyV1beta1AllowedHostPath>;
    'allowedUnsafeSysctls': Array<string>;
    'defaultAddCapabilities': Array<string>;
    'defaultAllowPrivilegeEscalation': boolean;
    'forbiddenSysctls': Array<string>;
    'fsGroup': PolicyV1beta1FSGroupStrategyOptions;
    'hostIPC': boolean;
    'hostNetwork': boolean;
    'hostPID': boolean;
    'hostPorts': Array<PolicyV1beta1HostPortRange>;
    'privileged': boolean;
    'readOnlyRootFilesystem': boolean;
    'requiredDropCapabilities': Array<string>;
    'runAsUser': PolicyV1beta1RunAsUserStrategyOptions;
    'seLinux': PolicyV1beta1SELinuxStrategyOptions;
    'supplementalGroups': PolicyV1beta1SupplementalGroupsStrategyOptions;
    'volumes': Array<string>;
}
export declare class PolicyV1beta1RunAsUserStrategyOptions {
    'ranges': Array<PolicyV1beta1IDRange>;
    'rule': string;
}
export declare class PolicyV1beta1SELinuxStrategyOptions {
    'rule': string;
    'seLinuxOptions': V1SELinuxOptions;
}
export declare class PolicyV1beta1SupplementalGroupsStrategyOptions {
    'ranges': Array<PolicyV1beta1IDRange>;
    'rule': string;
}
export declare class RuntimeRawExtension {
    'raw': string;
}
export declare class V1APIGroup {
    'apiVersion': string;
    'kind': string;
    'name': string;
    'preferredVersion': V1GroupVersionForDiscovery;
    'serverAddressByClientCIDRs': Array<V1ServerAddressByClientCIDR>;
    'versions': Array<V1GroupVersionForDiscovery>;
}
export declare class V1APIGroupList {
    'apiVersion': string;
    'groups': Array<V1APIGroup>;
    'kind': string;
}
export declare class V1APIResource {
    'categories': Array<string>;
    'group': string;
    'kind': string;
    'name': string;
    'namespaced': boolean;
    'shortNames': Array<string>;
    'singularName': string;
    'verbs': Array<string>;
    'version': string;
}
export declare class V1APIResourceList {
    'apiVersion': string;
    'groupVersion': string;
    'kind': string;
    'resources': Array<V1APIResource>;
}
export declare class V1APIService {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': V1APIServiceSpec;
    'status': V1APIServiceStatus;
}
export declare class V1APIServiceCondition {
    'lastTransitionTime': Date;
    'message': string;
    'reason': string;
    'status': string;
    'type': string;
}
export declare class V1APIServiceList {
    'apiVersion': string;
    'items': Array<V1APIService>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1APIServiceSpec {
    'caBundle': string;
    'group': string;
    'groupPriorityMinimum': number;
    'insecureSkipTLSVerify': boolean;
    'service': V1ServiceReference;
    'version': string;
    'versionPriority': number;
}
export declare class V1APIServiceStatus {
    'conditions': Array<V1APIServiceCondition>;
}
export declare class V1APIVersions {
    'apiVersion': string;
    'kind': string;
    'serverAddressByClientCIDRs': Array<V1ServerAddressByClientCIDR>;
    'versions': Array<string>;
}
export declare class V1AWSElasticBlockStoreVolumeSource {
    'fsType': string;
    'partition': number;
    'readOnly': boolean;
    'volumeID': string;
}
export declare class V1Affinity {
    'nodeAffinity': V1NodeAffinity;
    'podAffinity': V1PodAffinity;
    'podAntiAffinity': V1PodAntiAffinity;
}
export declare class V1AggregationRule {
    'clusterRoleSelectors': Array<V1LabelSelector>;
}
export declare class V1AttachedVolume {
    'devicePath': string;
    'name': string;
}
export declare class V1AzureDiskVolumeSource {
    'cachingMode': string;
    'diskName': string;
    'diskURI': string;
    'fsType': string;
    'kind': string;
    'readOnly': boolean;
}
export declare class V1AzureFilePersistentVolumeSource {
    'readOnly': boolean;
    'secretName': string;
    'secretNamespace': string;
    'shareName': string;
}
export declare class V1AzureFileVolumeSource {
    'readOnly': boolean;
    'secretName': string;
    'shareName': string;
}
export declare class V1Binding {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'target': V1ObjectReference;
}
export declare class V1CSIPersistentVolumeSource {
    'controllerPublishSecretRef': V1SecretReference;
    'driver': string;
    'fsType': string;
    'nodePublishSecretRef': V1SecretReference;
    'nodeStageSecretRef': V1SecretReference;
    'readOnly': boolean;
    'volumeAttributes': {
        [key: string]: string;
    };
    'volumeHandle': string;
}
export declare class V1Capabilities {
    'add': Array<string>;
    'drop': Array<string>;
}
export declare class V1CephFSPersistentVolumeSource {
    'monitors': Array<string>;
    'path': string;
    'readOnly': boolean;
    'secretFile': string;
    'secretRef': V1SecretReference;
    'user': string;
}
export declare class V1CephFSVolumeSource {
    'monitors': Array<string>;
    'path': string;
    'readOnly': boolean;
    'secretFile': string;
    'secretRef': V1LocalObjectReference;
    'user': string;
}
export declare class V1CinderPersistentVolumeSource {
    'fsType': string;
    'readOnly': boolean;
    'secretRef': V1SecretReference;
    'volumeID': string;
}
export declare class V1CinderVolumeSource {
    'fsType': string;
    'readOnly': boolean;
    'secretRef': V1LocalObjectReference;
    'volumeID': string;
}
export declare class V1ClientIPConfig {
    'timeoutSeconds': number;
}
export declare class V1ClusterRole {
    'aggregationRule': V1AggregationRule;
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'rules': Array<V1PolicyRule>;
}
export declare class V1ClusterRoleBinding {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'roleRef': V1RoleRef;
    'subjects': Array<V1Subject>;
}
export declare class V1ClusterRoleBindingList {
    'apiVersion': string;
    'items': Array<V1ClusterRoleBinding>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1ClusterRoleList {
    'apiVersion': string;
    'items': Array<V1ClusterRole>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1ComponentCondition {
    'error': string;
    'message': string;
    'status': string;
    'type': string;
}
export declare class V1ComponentStatus {
    'apiVersion': string;
    'conditions': Array<V1ComponentCondition>;
    'kind': string;
    'metadata': V1ObjectMeta;
}
export declare class V1ComponentStatusList {
    'apiVersion': string;
    'items': Array<V1ComponentStatus>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1ConfigMap {
    'apiVersion': string;
    'binaryData': {
        [key: string]: string;
    };
    'data': {
        [key: string]: string;
    };
    'kind': string;
    'metadata': V1ObjectMeta;
}
export declare class V1ConfigMapEnvSource {
    'name': string;
    'optional': boolean;
}
export declare class V1ConfigMapKeySelector {
    'key': string;
    'name': string;
    'optional': boolean;
}
export declare class V1ConfigMapList {
    'apiVersion': string;
    'items': Array<V1ConfigMap>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1ConfigMapNodeConfigSource {
    'kubeletConfigKey': string;
    'name': string;
    'namespace': string;
    'resourceVersion': string;
    'uid': string;
}
export declare class V1ConfigMapProjection {
    'items': Array<V1KeyToPath>;
    'name': string;
    'optional': boolean;
}
export declare class V1ConfigMapVolumeSource {
    'defaultMode': number;
    'items': Array<V1KeyToPath>;
    'name': string;
    'optional': boolean;
}
export declare class V1Container {
    'args': Array<string>;
    'command': Array<string>;
    'env': Array<V1EnvVar>;
    'envFrom': Array<V1EnvFromSource>;
    'image': string;
    'imagePullPolicy': string;
    'lifecycle': V1Lifecycle;
    'livenessProbe': V1Probe;
    'name': string;
    'ports': Array<V1ContainerPort>;
    'readinessProbe': V1Probe;
    'resources': V1ResourceRequirements;
    'securityContext': V1SecurityContext;
    'stdin': boolean;
    'stdinOnce': boolean;
    'terminationMessagePath': string;
    'terminationMessagePolicy': string;
    'tty': boolean;
    'volumeDevices': Array<V1VolumeDevice>;
    'volumeMounts': Array<V1VolumeMount>;
    'workingDir': string;
}
export declare class V1ContainerImage {
    'names': Array<string>;
    'sizeBytes': number;
}
export declare class V1ContainerPort {
    'containerPort': number;
    'hostIP': string;
    'hostPort': number;
    'name': string;
    'protocol': string;
}
export declare class V1ContainerState {
    'running': V1ContainerStateRunning;
    'terminated': V1ContainerStateTerminated;
    'waiting': V1ContainerStateWaiting;
}
export declare class V1ContainerStateRunning {
    'startedAt': Date;
}
export declare class V1ContainerStateTerminated {
    'containerID': string;
    'exitCode': number;
    'finishedAt': Date;
    'message': string;
    'reason': string;
    'signal': number;
    'startedAt': Date;
}
export declare class V1ContainerStateWaiting {
    'message': string;
    'reason': string;
}
export declare class V1ContainerStatus {
    'containerID': string;
    'image': string;
    'imageID': string;
    'lastState': V1ContainerState;
    'name': string;
    'ready': boolean;
    'restartCount': number;
    'state': V1ContainerState;
}
export declare class V1ControllerRevision {
    'apiVersion': string;
    'data': RuntimeRawExtension;
    'kind': string;
    'metadata': V1ObjectMeta;
    'revision': number;
}
export declare class V1ControllerRevisionList {
    'apiVersion': string;
    'items': Array<V1ControllerRevision>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1CrossVersionObjectReference {
    'apiVersion': string;
    'kind': string;
    'name': string;
}
export declare class V1DaemonEndpoint {
    'port': number;
}
export declare class V1DaemonSet {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': V1DaemonSetSpec;
    'status': V1DaemonSetStatus;
}
export declare class V1DaemonSetCondition {
    'lastTransitionTime': Date;
    'message': string;
    'reason': string;
    'status': string;
    'type': string;
}
export declare class V1DaemonSetList {
    'apiVersion': string;
    'items': Array<V1DaemonSet>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1DaemonSetSpec {
    'minReadySeconds': number;
    'revisionHistoryLimit': number;
    'selector': V1LabelSelector;
    'template': V1PodTemplateSpec;
    'updateStrategy': V1DaemonSetUpdateStrategy;
}
export declare class V1DaemonSetStatus {
    'collisionCount': number;
    'conditions': Array<V1DaemonSetCondition>;
    'currentNumberScheduled': number;
    'desiredNumberScheduled': number;
    'numberAvailable': number;
    'numberMisscheduled': number;
    'numberReady': number;
    'numberUnavailable': number;
    'observedGeneration': number;
    'updatedNumberScheduled': number;
}
export declare class V1DaemonSetUpdateStrategy {
    'rollingUpdate': V1RollingUpdateDaemonSet;
    'type': string;
}
export declare class V1DeleteOptions {
    'apiVersion': string;
    'gracePeriodSeconds': number;
    'kind': string;
    'orphanDependents': boolean;
    'preconditions': V1Preconditions;
    'propagationPolicy': string;
}
export declare class V1Deployment {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': V1DeploymentSpec;
    'status': V1DeploymentStatus;
}
export declare class V1DeploymentCondition {
    'lastTransitionTime': Date;
    'lastUpdateTime': Date;
    'message': string;
    'reason': string;
    'status': string;
    'type': string;
}
export declare class V1DeploymentList {
    'apiVersion': string;
    'items': Array<V1Deployment>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1DeploymentSpec {
    'minReadySeconds': number;
    'paused': boolean;
    'progressDeadlineSeconds': number;
    'replicas': number;
    'revisionHistoryLimit': number;
    'selector': V1LabelSelector;
    'strategy': V1DeploymentStrategy;
    'template': V1PodTemplateSpec;
}
export declare class V1DeploymentStatus {
    'availableReplicas': number;
    'collisionCount': number;
    'conditions': Array<V1DeploymentCondition>;
    'observedGeneration': number;
    'readyReplicas': number;
    'replicas': number;
    'unavailableReplicas': number;
    'updatedReplicas': number;
}
export declare class V1DeploymentStrategy {
    'rollingUpdate': V1RollingUpdateDeployment;
    'type': string;
}
export declare class V1DownwardAPIProjection {
    'items': Array<V1DownwardAPIVolumeFile>;
}
export declare class V1DownwardAPIVolumeFile {
    'fieldRef': V1ObjectFieldSelector;
    'mode': number;
    'path': string;
    'resourceFieldRef': V1ResourceFieldSelector;
}
export declare class V1DownwardAPIVolumeSource {
    'defaultMode': number;
    'items': Array<V1DownwardAPIVolumeFile>;
}
export declare class V1EmptyDirVolumeSource {
    'medium': string;
    'sizeLimit': string;
}
export declare class V1EndpointAddress {
    'hostname': string;
    'ip': string;
    'nodeName': string;
    'targetRef': V1ObjectReference;
}
export declare class V1EndpointPort {
    'name': string;
    'port': number;
    'protocol': string;
}
export declare class V1EndpointSubset {
    'addresses': Array<V1EndpointAddress>;
    'notReadyAddresses': Array<V1EndpointAddress>;
    'ports': Array<V1EndpointPort>;
}
export declare class V1Endpoints {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'subsets': Array<V1EndpointSubset>;
}
export declare class V1EndpointsList {
    'apiVersion': string;
    'items': Array<V1Endpoints>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1EnvFromSource {
    'configMapRef': V1ConfigMapEnvSource;
    'prefix': string;
    'secretRef': V1SecretEnvSource;
}
export declare class V1EnvVar {
    'name': string;
    'value': string;
    'valueFrom': V1EnvVarSource;
}
export declare class V1EnvVarSource {
    'configMapKeyRef': V1ConfigMapKeySelector;
    'fieldRef': V1ObjectFieldSelector;
    'resourceFieldRef': V1ResourceFieldSelector;
    'secretKeyRef': V1SecretKeySelector;
}
export declare class V1Event {
    'action': string;
    'apiVersion': string;
    'count': number;
    'eventTime': Date;
    'firstTimestamp': Date;
    'involvedObject': V1ObjectReference;
    'kind': string;
    'lastTimestamp': Date;
    'message': string;
    'metadata': V1ObjectMeta;
    'reason': string;
    'related': V1ObjectReference;
    'reportingComponent': string;
    'reportingInstance': string;
    'series': V1EventSeries;
    'source': V1EventSource;
    'type': string;
}
export declare class V1EventList {
    'apiVersion': string;
    'items': Array<V1Event>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1EventSeries {
    'count': number;
    'lastObservedTime': Date;
    'state': string;
}
export declare class V1EventSource {
    'component': string;
    'host': string;
}
export declare class V1ExecAction {
    'command': Array<string>;
}
export declare class V1FCVolumeSource {
    'fsType': string;
    'lun': number;
    'readOnly': boolean;
    'targetWWNs': Array<string>;
    'wwids': Array<string>;
}
export declare class V1FlexPersistentVolumeSource {
    'driver': string;
    'fsType': string;
    'options': {
        [key: string]: string;
    };
    'readOnly': boolean;
    'secretRef': V1SecretReference;
}
export declare class V1FlexVolumeSource {
    'driver': string;
    'fsType': string;
    'options': {
        [key: string]: string;
    };
    'readOnly': boolean;
    'secretRef': V1LocalObjectReference;
}
export declare class V1FlockerVolumeSource {
    'datasetName': string;
    'datasetUUID': string;
}
export declare class V1GCEPersistentDiskVolumeSource {
    'fsType': string;
    'partition': number;
    'pdName': string;
    'readOnly': boolean;
}
export declare class V1GitRepoVolumeSource {
    'directory': string;
    'repository': string;
    'revision': string;
}
export declare class V1GlusterfsVolumeSource {
    'endpoints': string;
    'path': string;
    'readOnly': boolean;
}
export declare class V1GroupVersionForDiscovery {
    'groupVersion': string;
    'version': string;
}
export declare class V1HTTPGetAction {
    'host': string;
    'httpHeaders': Array<V1HTTPHeader>;
    'path': string;
    'port': any;
    'scheme': string;
}
export declare class V1HTTPHeader {
    'name': string;
    'value': string;
}
export declare class V1Handler {
    'exec': V1ExecAction;
    'httpGet': V1HTTPGetAction;
    'tcpSocket': V1TCPSocketAction;
}
export declare class V1HorizontalPodAutoscaler {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': V1HorizontalPodAutoscalerSpec;
    'status': V1HorizontalPodAutoscalerStatus;
}
export declare class V1HorizontalPodAutoscalerList {
    'apiVersion': string;
    'items': Array<V1HorizontalPodAutoscaler>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1HorizontalPodAutoscalerSpec {
    'maxReplicas': number;
    'minReplicas': number;
    'scaleTargetRef': V1CrossVersionObjectReference;
    'targetCPUUtilizationPercentage': number;
}
export declare class V1HorizontalPodAutoscalerStatus {
    'currentCPUUtilizationPercentage': number;
    'currentReplicas': number;
    'desiredReplicas': number;
    'lastScaleTime': Date;
    'observedGeneration': number;
}
export declare class V1HostAlias {
    'hostnames': Array<string>;
    'ip': string;
}
export declare class V1HostPathVolumeSource {
    'path': string;
    'type': string;
}
export declare class V1IPBlock {
    'cidr': string;
    'except': Array<string>;
}
export declare class V1ISCSIPersistentVolumeSource {
    'chapAuthDiscovery': boolean;
    'chapAuthSession': boolean;
    'fsType': string;
    'initiatorName': string;
    'iqn': string;
    'iscsiInterface': string;
    'lun': number;
    'portals': Array<string>;
    'readOnly': boolean;
    'secretRef': V1SecretReference;
    'targetPortal': string;
}
export declare class V1ISCSIVolumeSource {
    'chapAuthDiscovery': boolean;
    'chapAuthSession': boolean;
    'fsType': string;
    'initiatorName': string;
    'iqn': string;
    'iscsiInterface': string;
    'lun': number;
    'portals': Array<string>;
    'readOnly': boolean;
    'secretRef': V1LocalObjectReference;
    'targetPortal': string;
}
export declare class V1Initializer {
    'name': string;
}
export declare class V1Initializers {
    'pending': Array<V1Initializer>;
    'result': V1Status;
}
export declare class V1Job {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': V1JobSpec;
    'status': V1JobStatus;
}
export declare class V1JobCondition {
    'lastProbeTime': Date;
    'lastTransitionTime': Date;
    'message': string;
    'reason': string;
    'status': string;
    'type': string;
}
export declare class V1JobList {
    'apiVersion': string;
    'items': Array<V1Job>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1JobSpec {
    'activeDeadlineSeconds': number;
    'backoffLimit': number;
    'completions': number;
    'manualSelector': boolean;
    'parallelism': number;
    'selector': V1LabelSelector;
    'template': V1PodTemplateSpec;
}
export declare class V1JobStatus {
    'active': number;
    'completionTime': Date;
    'conditions': Array<V1JobCondition>;
    'failed': number;
    'startTime': Date;
    'succeeded': number;
}
export declare class V1KeyToPath {
    'key': string;
    'mode': number;
    'path': string;
}
export declare class V1LabelSelector {
    'matchExpressions': Array<V1LabelSelectorRequirement>;
    'matchLabels': {
        [key: string]: string;
    };
}
export declare class V1LabelSelectorRequirement {
    'key': string;
    'operator': string;
    'values': Array<string>;
}
export declare class V1Lifecycle {
    'postStart': V1Handler;
    'preStop': V1Handler;
}
export declare class V1LimitRange {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': V1LimitRangeSpec;
}
export declare class V1LimitRangeItem {
    'default': {
        [key: string]: string;
    };
    'defaultRequest': {
        [key: string]: string;
    };
    'max': {
        [key: string]: string;
    };
    'maxLimitRequestRatio': {
        [key: string]: string;
    };
    'min': {
        [key: string]: string;
    };
    'type': string;
}
export declare class V1LimitRangeList {
    'apiVersion': string;
    'items': Array<V1LimitRange>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1LimitRangeSpec {
    'limits': Array<V1LimitRangeItem>;
}
export declare class V1ListMeta {
    'continue': string;
    'resourceVersion': string;
    'selfLink': string;
}
export declare class V1LoadBalancerIngress {
    'hostname': string;
    'ip': string;
}
export declare class V1LoadBalancerStatus {
    'ingress': Array<V1LoadBalancerIngress>;
}
export declare class V1LocalObjectReference {
    'name': string;
}
export declare class V1LocalSubjectAccessReview {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': V1SubjectAccessReviewSpec;
    'status': V1SubjectAccessReviewStatus;
}
export declare class V1LocalVolumeSource {
    'path': string;
}
export declare class V1NFSVolumeSource {
    'path': string;
    'readOnly': boolean;
    'server': string;
}
export declare class V1Namespace {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': V1NamespaceSpec;
    'status': V1NamespaceStatus;
}
export declare class V1NamespaceList {
    'apiVersion': string;
    'items': Array<V1Namespace>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1NamespaceSpec {
    'finalizers': Array<string>;
}
export declare class V1NamespaceStatus {
    'phase': string;
}
export declare class V1NetworkPolicy {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': V1NetworkPolicySpec;
}
export declare class V1NetworkPolicyEgressRule {
    'ports': Array<V1NetworkPolicyPort>;
    'to': Array<V1NetworkPolicyPeer>;
}
export declare class V1NetworkPolicyIngressRule {
    'from': Array<V1NetworkPolicyPeer>;
    'ports': Array<V1NetworkPolicyPort>;
}
export declare class V1NetworkPolicyList {
    'apiVersion': string;
    'items': Array<V1NetworkPolicy>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1NetworkPolicyPeer {
    'ipBlock': V1IPBlock;
    'namespaceSelector': V1LabelSelector;
    'podSelector': V1LabelSelector;
}
export declare class V1NetworkPolicyPort {
    'port': any;
    'protocol': string;
}
export declare class V1NetworkPolicySpec {
    'egress': Array<V1NetworkPolicyEgressRule>;
    'ingress': Array<V1NetworkPolicyIngressRule>;
    'podSelector': V1LabelSelector;
    'policyTypes': Array<string>;
}
export declare class V1Node {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': V1NodeSpec;
    'status': V1NodeStatus;
}
export declare class V1NodeAddress {
    'address': string;
    'type': string;
}
export declare class V1NodeAffinity {
    'preferredDuringSchedulingIgnoredDuringExecution': Array<V1PreferredSchedulingTerm>;
    'requiredDuringSchedulingIgnoredDuringExecution': V1NodeSelector;
}
export declare class V1NodeCondition {
    'lastHeartbeatTime': Date;
    'lastTransitionTime': Date;
    'message': string;
    'reason': string;
    'status': string;
    'type': string;
}
export declare class V1NodeConfigSource {
    'configMap': V1ConfigMapNodeConfigSource;
}
export declare class V1NodeConfigStatus {
    'active': V1NodeConfigSource;
    'assigned': V1NodeConfigSource;
    'error': string;
    'lastKnownGood': V1NodeConfigSource;
}
export declare class V1NodeDaemonEndpoints {
    'kubeletEndpoint': V1DaemonEndpoint;
}
export declare class V1NodeList {
    'apiVersion': string;
    'items': Array<V1Node>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1NodeSelector {
    'nodeSelectorTerms': Array<V1NodeSelectorTerm>;
}
export declare class V1NodeSelectorRequirement {
    'key': string;
    'operator': string;
    'values': Array<string>;
}
export declare class V1NodeSelectorTerm {
    'matchExpressions': Array<V1NodeSelectorRequirement>;
    'matchFields': Array<V1NodeSelectorRequirement>;
}
export declare class V1NodeSpec {
    'configSource': V1NodeConfigSource;
    'externalID': string;
    'podCIDR': string;
    'providerID': string;
    'taints': Array<V1Taint>;
    'unschedulable': boolean;
}
export declare class V1NodeStatus {
    'addresses': Array<V1NodeAddress>;
    'allocatable': {
        [key: string]: string;
    };
    'capacity': {
        [key: string]: string;
    };
    'conditions': Array<V1NodeCondition>;
    'config': V1NodeConfigStatus;
    'daemonEndpoints': V1NodeDaemonEndpoints;
    'images': Array<V1ContainerImage>;
    'nodeInfo': V1NodeSystemInfo;
    'phase': string;
    'volumesAttached': Array<V1AttachedVolume>;
    'volumesInUse': Array<string>;
}
export declare class V1NodeSystemInfo {
    'architecture': string;
    'bootID': string;
    'containerRuntimeVersion': string;
    'kernelVersion': string;
    'kubeProxyVersion': string;
    'kubeletVersion': string;
    'machineID': string;
    'operatingSystem': string;
    'osImage': string;
    'systemUUID': string;
}
export declare class V1NonResourceAttributes {
    'path': string;
    'verb': string;
}
export declare class V1NonResourceRule {
    'nonResourceURLs': Array<string>;
    'verbs': Array<string>;
}
export declare class V1ObjectFieldSelector {
    'apiVersion': string;
    'fieldPath': string;
}
export declare class V1ObjectMeta {
    'annotations': {
        [key: string]: string;
    };
    'clusterName': string;
    'creationTimestamp': Date;
    'deletionGracePeriodSeconds': number;
    'deletionTimestamp': Date;
    'finalizers': Array<string>;
    'generateName': string;
    'generation': number;
    'initializers': V1Initializers;
    'labels': {
        [key: string]: string;
    };
    'name': string;
    'namespace': string;
    'ownerReferences': Array<V1OwnerReference>;
    'resourceVersion': string;
    'selfLink': string;
    'uid': string;
}
export declare class V1ObjectReference {
    'apiVersion': string;
    'fieldPath': string;
    'kind': string;
    'name': string;
    'namespace': string;
    'resourceVersion': string;
    'uid': string;
}
export declare class V1OwnerReference {
    'apiVersion': string;
    'blockOwnerDeletion': boolean;
    'controller': boolean;
    'kind': string;
    'name': string;
    'uid': string;
}
export declare class V1PersistentVolume {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': V1PersistentVolumeSpec;
    'status': V1PersistentVolumeStatus;
}
export declare class V1PersistentVolumeClaim {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': V1PersistentVolumeClaimSpec;
    'status': V1PersistentVolumeClaimStatus;
}
export declare class V1PersistentVolumeClaimCondition {
    'lastProbeTime': Date;
    'lastTransitionTime': Date;
    'message': string;
    'reason': string;
    'status': string;
    'type': string;
}
export declare class V1PersistentVolumeClaimList {
    'apiVersion': string;
    'items': Array<V1PersistentVolumeClaim>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1PersistentVolumeClaimSpec {
    'accessModes': Array<string>;
    'resources': V1ResourceRequirements;
    'selector': V1LabelSelector;
    'storageClassName': string;
    'volumeMode': string;
    'volumeName': string;
}
export declare class V1PersistentVolumeClaimStatus {
    'accessModes': Array<string>;
    'capacity': {
        [key: string]: string;
    };
    'conditions': Array<V1PersistentVolumeClaimCondition>;
    'phase': string;
}
export declare class V1PersistentVolumeClaimVolumeSource {
    'claimName': string;
    'readOnly': boolean;
}
export declare class V1PersistentVolumeList {
    'apiVersion': string;
    'items': Array<V1PersistentVolume>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1PersistentVolumeSpec {
    'accessModes': Array<string>;
    'awsElasticBlockStore': V1AWSElasticBlockStoreVolumeSource;
    'azureDisk': V1AzureDiskVolumeSource;
    'azureFile': V1AzureFilePersistentVolumeSource;
    'capacity': {
        [key: string]: string;
    };
    'cephfs': V1CephFSPersistentVolumeSource;
    'cinder': V1CinderPersistentVolumeSource;
    'claimRef': V1ObjectReference;
    'csi': V1CSIPersistentVolumeSource;
    'fc': V1FCVolumeSource;
    'flexVolume': V1FlexPersistentVolumeSource;
    'flocker': V1FlockerVolumeSource;
    'gcePersistentDisk': V1GCEPersistentDiskVolumeSource;
    'glusterfs': V1GlusterfsVolumeSource;
    'hostPath': V1HostPathVolumeSource;
    'iscsi': V1ISCSIPersistentVolumeSource;
    'local': V1LocalVolumeSource;
    'mountOptions': Array<string>;
    'nfs': V1NFSVolumeSource;
    'nodeAffinity': V1VolumeNodeAffinity;
    'persistentVolumeReclaimPolicy': string;
    'photonPersistentDisk': V1PhotonPersistentDiskVolumeSource;
    'portworxVolume': V1PortworxVolumeSource;
    'quobyte': V1QuobyteVolumeSource;
    'rbd': V1RBDPersistentVolumeSource;
    'scaleIO': V1ScaleIOPersistentVolumeSource;
    'storageClassName': string;
    'storageos': V1StorageOSPersistentVolumeSource;
    'volumeMode': string;
    'vsphereVolume': V1VsphereVirtualDiskVolumeSource;
}
export declare class V1PersistentVolumeStatus {
    'message': string;
    'phase': string;
    'reason': string;
}
export declare class V1PhotonPersistentDiskVolumeSource {
    'fsType': string;
    'pdID': string;
}
export declare class V1Pod {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': V1PodSpec;
    'status': V1PodStatus;
}
export declare class V1PodAffinity {
    'preferredDuringSchedulingIgnoredDuringExecution': Array<V1WeightedPodAffinityTerm>;
    'requiredDuringSchedulingIgnoredDuringExecution': Array<V1PodAffinityTerm>;
}
export declare class V1PodAffinityTerm {
    'labelSelector': V1LabelSelector;
    'namespaces': Array<string>;
    'topologyKey': string;
}
export declare class V1PodAntiAffinity {
    'preferredDuringSchedulingIgnoredDuringExecution': Array<V1WeightedPodAffinityTerm>;
    'requiredDuringSchedulingIgnoredDuringExecution': Array<V1PodAffinityTerm>;
}
export declare class V1PodCondition {
    'lastProbeTime': Date;
    'lastTransitionTime': Date;
    'message': string;
    'reason': string;
    'status': string;
    'type': string;
}
export declare class V1PodDNSConfig {
    'nameservers': Array<string>;
    'options': Array<V1PodDNSConfigOption>;
    'searches': Array<string>;
}
export declare class V1PodDNSConfigOption {
    'name': string;
    'value': string;
}
export declare class V1PodList {
    'apiVersion': string;
    'items': Array<V1Pod>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1PodReadinessGate {
    'conditionType': string;
}
export declare class V1PodSecurityContext {
    'fsGroup': number;
    'runAsGroup': number;
    'runAsNonRoot': boolean;
    'runAsUser': number;
    'seLinuxOptions': V1SELinuxOptions;
    'supplementalGroups': Array<number>;
    'sysctls': Array<V1Sysctl>;
}
export declare class V1PodSpec {
    'activeDeadlineSeconds': number;
    'affinity': V1Affinity;
    'automountServiceAccountToken': boolean;
    'containers': Array<V1Container>;
    'dnsConfig': V1PodDNSConfig;
    'dnsPolicy': string;
    'hostAliases': Array<V1HostAlias>;
    'hostIPC': boolean;
    'hostNetwork': boolean;
    'hostPID': boolean;
    'hostname': string;
    'imagePullSecrets': Array<V1LocalObjectReference>;
    'initContainers': Array<V1Container>;
    'nodeName': string;
    'nodeSelector': {
        [key: string]: string;
    };
    'priority': number;
    'priorityClassName': string;
    'readinessGates': Array<V1PodReadinessGate>;
    'restartPolicy': string;
    'schedulerName': string;
    'securityContext': V1PodSecurityContext;
    'serviceAccount': string;
    'serviceAccountName': string;
    'shareProcessNamespace': boolean;
    'subdomain': string;
    'terminationGracePeriodSeconds': number;
    'tolerations': Array<V1Toleration>;
    'volumes': Array<V1Volume>;
}
export declare class V1PodStatus {
    'conditions': Array<V1PodCondition>;
    'containerStatuses': Array<V1ContainerStatus>;
    'hostIP': string;
    'initContainerStatuses': Array<V1ContainerStatus>;
    'message': string;
    'nominatedNodeName': string;
    'phase': string;
    'podIP': string;
    'qosClass': string;
    'reason': string;
    'startTime': Date;
}
export declare class V1PodTemplate {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'template': V1PodTemplateSpec;
}
export declare class V1PodTemplateList {
    'apiVersion': string;
    'items': Array<V1PodTemplate>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1PodTemplateSpec {
    'metadata': V1ObjectMeta;
    'spec': V1PodSpec;
}
export declare class V1PolicyRule {
    'apiGroups': Array<string>;
    'nonResourceURLs': Array<string>;
    'resourceNames': Array<string>;
    'resources': Array<string>;
    'verbs': Array<string>;
}
export declare class V1PortworxVolumeSource {
    'fsType': string;
    'readOnly': boolean;
    'volumeID': string;
}
export declare class V1Preconditions {
    'uid': string;
}
export declare class V1PreferredSchedulingTerm {
    'preference': V1NodeSelectorTerm;
    'weight': number;
}
export declare class V1Probe {
    'exec': V1ExecAction;
    'failureThreshold': number;
    'httpGet': V1HTTPGetAction;
    'initialDelaySeconds': number;
    'periodSeconds': number;
    'successThreshold': number;
    'tcpSocket': V1TCPSocketAction;
    'timeoutSeconds': number;
}
export declare class V1ProjectedVolumeSource {
    'defaultMode': number;
    'sources': Array<V1VolumeProjection>;
}
export declare class V1QuobyteVolumeSource {
    'group': string;
    'readOnly': boolean;
    'registry': string;
    'user': string;
    'volume': string;
}
export declare class V1RBDPersistentVolumeSource {
    'fsType': string;
    'image': string;
    'keyring': string;
    'monitors': Array<string>;
    'pool': string;
    'readOnly': boolean;
    'secretRef': V1SecretReference;
    'user': string;
}
export declare class V1RBDVolumeSource {
    'fsType': string;
    'image': string;
    'keyring': string;
    'monitors': Array<string>;
    'pool': string;
    'readOnly': boolean;
    'secretRef': V1LocalObjectReference;
    'user': string;
}
export declare class V1ReplicaSet {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': V1ReplicaSetSpec;
    'status': V1ReplicaSetStatus;
}
export declare class V1ReplicaSetCondition {
    'lastTransitionTime': Date;
    'message': string;
    'reason': string;
    'status': string;
    'type': string;
}
export declare class V1ReplicaSetList {
    'apiVersion': string;
    'items': Array<V1ReplicaSet>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1ReplicaSetSpec {
    'minReadySeconds': number;
    'replicas': number;
    'selector': V1LabelSelector;
    'template': V1PodTemplateSpec;
}
export declare class V1ReplicaSetStatus {
    'availableReplicas': number;
    'conditions': Array<V1ReplicaSetCondition>;
    'fullyLabeledReplicas': number;
    'observedGeneration': number;
    'readyReplicas': number;
    'replicas': number;
}
export declare class V1ReplicationController {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': V1ReplicationControllerSpec;
    'status': V1ReplicationControllerStatus;
}
export declare class V1ReplicationControllerCondition {
    'lastTransitionTime': Date;
    'message': string;
    'reason': string;
    'status': string;
    'type': string;
}
export declare class V1ReplicationControllerList {
    'apiVersion': string;
    'items': Array<V1ReplicationController>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1ReplicationControllerSpec {
    'minReadySeconds': number;
    'replicas': number;
    'selector': {
        [key: string]: string;
    };
    'template': V1PodTemplateSpec;
}
export declare class V1ReplicationControllerStatus {
    'availableReplicas': number;
    'conditions': Array<V1ReplicationControllerCondition>;
    'fullyLabeledReplicas': number;
    'observedGeneration': number;
    'readyReplicas': number;
    'replicas': number;
}
export declare class V1ResourceAttributes {
    'group': string;
    'name': string;
    'namespace': string;
    'resource': string;
    'subresource': string;
    'verb': string;
    'version': string;
}
export declare class V1ResourceFieldSelector {
    'containerName': string;
    'divisor': string;
    'resource': string;
}
export declare class V1ResourceQuota {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': V1ResourceQuotaSpec;
    'status': V1ResourceQuotaStatus;
}
export declare class V1ResourceQuotaList {
    'apiVersion': string;
    'items': Array<V1ResourceQuota>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1ResourceQuotaSpec {
    'hard': {
        [key: string]: string;
    };
    'scopeSelector': V1ScopeSelector;
    'scopes': Array<string>;
}
export declare class V1ResourceQuotaStatus {
    'hard': {
        [key: string]: string;
    };
    'used': {
        [key: string]: string;
    };
}
export declare class V1ResourceRequirements {
    'limits': {
        [key: string]: string;
    };
    'requests': {
        [key: string]: string;
    };
}
export declare class V1ResourceRule {
    'apiGroups': Array<string>;
    'resourceNames': Array<string>;
    'resources': Array<string>;
    'verbs': Array<string>;
}
export declare class V1Role {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'rules': Array<V1PolicyRule>;
}
export declare class V1RoleBinding {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'roleRef': V1RoleRef;
    'subjects': Array<V1Subject>;
}
export declare class V1RoleBindingList {
    'apiVersion': string;
    'items': Array<V1RoleBinding>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1RoleList {
    'apiVersion': string;
    'items': Array<V1Role>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1RoleRef {
    'apiGroup': string;
    'kind': string;
    'name': string;
}
export declare class V1RollingUpdateDaemonSet {
    'maxUnavailable': any;
}
export declare class V1RollingUpdateDeployment {
    'maxSurge': any;
    'maxUnavailable': any;
}
export declare class V1RollingUpdateStatefulSetStrategy {
    'partition': number;
}
export declare class V1SELinuxOptions {
    'level': string;
    'role': string;
    'type': string;
    'user': string;
}
export declare class V1Scale {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': V1ScaleSpec;
    'status': V1ScaleStatus;
}
export declare class V1ScaleIOPersistentVolumeSource {
    'fsType': string;
    'gateway': string;
    'protectionDomain': string;
    'readOnly': boolean;
    'secretRef': V1SecretReference;
    'sslEnabled': boolean;
    'storageMode': string;
    'storagePool': string;
    'system': string;
    'volumeName': string;
}
export declare class V1ScaleIOVolumeSource {
    'fsType': string;
    'gateway': string;
    'protectionDomain': string;
    'readOnly': boolean;
    'secretRef': V1LocalObjectReference;
    'sslEnabled': boolean;
    'storageMode': string;
    'storagePool': string;
    'system': string;
    'volumeName': string;
}
export declare class V1ScaleSpec {
    'replicas': number;
}
export declare class V1ScaleStatus {
    'replicas': number;
    'selector': string;
}
export declare class V1ScopeSelector {
    'matchExpressions': Array<V1ScopedResourceSelectorRequirement>;
}
export declare class V1ScopedResourceSelectorRequirement {
    'operator': string;
    'scopeName': string;
    'values': Array<string>;
}
export declare class V1Secret {
    'apiVersion': string;
    'data': {
        [key: string]: string;
    };
    'kind': string;
    'metadata': V1ObjectMeta;
    'stringData': {
        [key: string]: string;
    };
    'type': string;
}
export declare class V1SecretEnvSource {
    'name': string;
    'optional': boolean;
}
export declare class V1SecretKeySelector {
    'key': string;
    'name': string;
    'optional': boolean;
}
export declare class V1SecretList {
    'apiVersion': string;
    'items': Array<V1Secret>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1SecretProjection {
    'items': Array<V1KeyToPath>;
    'name': string;
    'optional': boolean;
}
export declare class V1SecretReference {
    'name': string;
    'namespace': string;
}
export declare class V1SecretVolumeSource {
    'defaultMode': number;
    'items': Array<V1KeyToPath>;
    'optional': boolean;
    'secretName': string;
}
export declare class V1SecurityContext {
    'allowPrivilegeEscalation': boolean;
    'capabilities': V1Capabilities;
    'privileged': boolean;
    'readOnlyRootFilesystem': boolean;
    'runAsGroup': number;
    'runAsNonRoot': boolean;
    'runAsUser': number;
    'seLinuxOptions': V1SELinuxOptions;
}
export declare class V1SelfSubjectAccessReview {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': V1SelfSubjectAccessReviewSpec;
    'status': V1SubjectAccessReviewStatus;
}
export declare class V1SelfSubjectAccessReviewSpec {
    'nonResourceAttributes': V1NonResourceAttributes;
    'resourceAttributes': V1ResourceAttributes;
}
export declare class V1SelfSubjectRulesReview {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': V1SelfSubjectRulesReviewSpec;
    'status': V1SubjectRulesReviewStatus;
}
export declare class V1SelfSubjectRulesReviewSpec {
    'namespace': string;
}
export declare class V1ServerAddressByClientCIDR {
    'clientCIDR': string;
    'serverAddress': string;
}
export declare class V1Service {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': V1ServiceSpec;
    'status': V1ServiceStatus;
}
export declare class V1ServiceAccount {
    'apiVersion': string;
    'automountServiceAccountToken': boolean;
    'imagePullSecrets': Array<V1LocalObjectReference>;
    'kind': string;
    'metadata': V1ObjectMeta;
    'secrets': Array<V1ObjectReference>;
}
export declare class V1ServiceAccountList {
    'apiVersion': string;
    'items': Array<V1ServiceAccount>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1ServiceAccountTokenProjection {
    'audience': string;
    'expirationSeconds': number;
    'path': string;
}
export declare class V1ServiceList {
    'apiVersion': string;
    'items': Array<V1Service>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1ServicePort {
    'name': string;
    'nodePort': number;
    'port': number;
    'protocol': string;
    'targetPort': any;
}
export declare class V1ServiceReference {
    'name': string;
    'namespace': string;
}
export declare class V1ServiceSpec {
    'clusterIP': string;
    'externalIPs': Array<string>;
    'externalName': string;
    'externalTrafficPolicy': string;
    'healthCheckNodePort': number;
    'loadBalancerIP': string;
    'loadBalancerSourceRanges': Array<string>;
    'ports': Array<V1ServicePort>;
    'publishNotReadyAddresses': boolean;
    'selector': {
        [key: string]: string;
    };
    'sessionAffinity': string;
    'sessionAffinityConfig': V1SessionAffinityConfig;
    'type': string;
}
export declare class V1ServiceStatus {
    'loadBalancer': V1LoadBalancerStatus;
}
export declare class V1SessionAffinityConfig {
    'clientIP': V1ClientIPConfig;
}
export declare class V1StatefulSet {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': V1StatefulSetSpec;
    'status': V1StatefulSetStatus;
}
export declare class V1StatefulSetCondition {
    'lastTransitionTime': Date;
    'message': string;
    'reason': string;
    'status': string;
    'type': string;
}
export declare class V1StatefulSetList {
    'apiVersion': string;
    'items': Array<V1StatefulSet>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1StatefulSetSpec {
    'podManagementPolicy': string;
    'replicas': number;
    'revisionHistoryLimit': number;
    'selector': V1LabelSelector;
    'serviceName': string;
    'template': V1PodTemplateSpec;
    'updateStrategy': V1StatefulSetUpdateStrategy;
    'volumeClaimTemplates': Array<V1PersistentVolumeClaim>;
}
export declare class V1StatefulSetStatus {
    'collisionCount': number;
    'conditions': Array<V1StatefulSetCondition>;
    'currentReplicas': number;
    'currentRevision': string;
    'observedGeneration': number;
    'readyReplicas': number;
    'replicas': number;
    'updateRevision': string;
    'updatedReplicas': number;
}
export declare class V1StatefulSetUpdateStrategy {
    'rollingUpdate': V1RollingUpdateStatefulSetStrategy;
    'type': string;
}
export declare class V1Status {
    'apiVersion': string;
    'code': number;
    'details': V1StatusDetails;
    'kind': string;
    'message': string;
    'metadata': V1ListMeta;
    'reason': string;
    'status': string;
}
export declare class V1StatusCause {
    'field': string;
    'message': string;
    'reason': string;
}
export declare class V1StatusDetails {
    'causes': Array<V1StatusCause>;
    'group': string;
    'kind': string;
    'name': string;
    'retryAfterSeconds': number;
    'uid': string;
}
export declare class V1StorageClass {
    'allowVolumeExpansion': boolean;
    'allowedTopologies': Array<V1TopologySelectorTerm>;
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'mountOptions': Array<string>;
    'parameters': {
        [key: string]: string;
    };
    'provisioner': string;
    'reclaimPolicy': string;
    'volumeBindingMode': string;
}
export declare class V1StorageClassList {
    'apiVersion': string;
    'items': Array<V1StorageClass>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1StorageOSPersistentVolumeSource {
    'fsType': string;
    'readOnly': boolean;
    'secretRef': V1ObjectReference;
    'volumeName': string;
    'volumeNamespace': string;
}
export declare class V1StorageOSVolumeSource {
    'fsType': string;
    'readOnly': boolean;
    'secretRef': V1LocalObjectReference;
    'volumeName': string;
    'volumeNamespace': string;
}
export declare class V1Subject {
    'apiGroup': string;
    'kind': string;
    'name': string;
    'namespace': string;
}
export declare class V1SubjectAccessReview {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': V1SubjectAccessReviewSpec;
    'status': V1SubjectAccessReviewStatus;
}
export declare class V1SubjectAccessReviewSpec {
    'extra': {
        [key: string]: Array<string>;
    };
    'groups': Array<string>;
    'nonResourceAttributes': V1NonResourceAttributes;
    'resourceAttributes': V1ResourceAttributes;
    'uid': string;
    'user': string;
}
export declare class V1SubjectAccessReviewStatus {
    'allowed': boolean;
    'denied': boolean;
    'evaluationError': string;
    'reason': string;
}
export declare class V1SubjectRulesReviewStatus {
    'evaluationError': string;
    'incomplete': boolean;
    'nonResourceRules': Array<V1NonResourceRule>;
    'resourceRules': Array<V1ResourceRule>;
}
export declare class V1Sysctl {
    'name': string;
    'value': string;
}
export declare class V1TCPSocketAction {
    'host': string;
    'port': any;
}
export declare class V1Taint {
    'effect': string;
    'key': string;
    'timeAdded': Date;
    'value': string;
}
export declare class V1TokenReview {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': V1TokenReviewSpec;
    'status': V1TokenReviewStatus;
}
export declare class V1TokenReviewSpec {
    'token': string;
}
export declare class V1TokenReviewStatus {
    'authenticated': boolean;
    'error': string;
    'user': V1UserInfo;
}
export declare class V1Toleration {
    'effect': string;
    'key': string;
    'operator': string;
    'tolerationSeconds': number;
    'value': string;
}
export declare class V1TopologySelectorLabelRequirement {
    'key': string;
    'values': Array<string>;
}
export declare class V1TopologySelectorTerm {
    'matchLabelExpressions': Array<V1TopologySelectorLabelRequirement>;
}
export declare class V1UserInfo {
    'extra': {
        [key: string]: Array<string>;
    };
    'groups': Array<string>;
    'uid': string;
    'username': string;
}
export declare class V1Volume {
    'awsElasticBlockStore': V1AWSElasticBlockStoreVolumeSource;
    'azureDisk': V1AzureDiskVolumeSource;
    'azureFile': V1AzureFileVolumeSource;
    'cephfs': V1CephFSVolumeSource;
    'cinder': V1CinderVolumeSource;
    'configMap': V1ConfigMapVolumeSource;
    'downwardAPI': V1DownwardAPIVolumeSource;
    'emptyDir': V1EmptyDirVolumeSource;
    'fc': V1FCVolumeSource;
    'flexVolume': V1FlexVolumeSource;
    'flocker': V1FlockerVolumeSource;
    'gcePersistentDisk': V1GCEPersistentDiskVolumeSource;
    'gitRepo': V1GitRepoVolumeSource;
    'glusterfs': V1GlusterfsVolumeSource;
    'hostPath': V1HostPathVolumeSource;
    'iscsi': V1ISCSIVolumeSource;
    'name': string;
    'nfs': V1NFSVolumeSource;
    'persistentVolumeClaim': V1PersistentVolumeClaimVolumeSource;
    'photonPersistentDisk': V1PhotonPersistentDiskVolumeSource;
    'portworxVolume': V1PortworxVolumeSource;
    'projected': V1ProjectedVolumeSource;
    'quobyte': V1QuobyteVolumeSource;
    'rbd': V1RBDVolumeSource;
    'scaleIO': V1ScaleIOVolumeSource;
    'secret': V1SecretVolumeSource;
    'storageos': V1StorageOSVolumeSource;
    'vsphereVolume': V1VsphereVirtualDiskVolumeSource;
}
export declare class V1VolumeDevice {
    'devicePath': string;
    'name': string;
}
export declare class V1VolumeMount {
    'mountPath': string;
    'mountPropagation': string;
    'name': string;
    'readOnly': boolean;
    'subPath': string;
}
export declare class V1VolumeNodeAffinity {
    'required': V1NodeSelector;
}
export declare class V1VolumeProjection {
    'configMap': V1ConfigMapProjection;
    'downwardAPI': V1DownwardAPIProjection;
    'secret': V1SecretProjection;
    'serviceAccountToken': V1ServiceAccountTokenProjection;
}
export declare class V1VsphereVirtualDiskVolumeSource {
    'fsType': string;
    'storagePolicyID': string;
    'storagePolicyName': string;
    'volumePath': string;
}
export declare class V1WatchEvent {
    'object': RuntimeRawExtension;
    'type': string;
}
export declare class V1WeightedPodAffinityTerm {
    'podAffinityTerm': V1PodAffinityTerm;
    'weight': number;
}
export declare class V1alpha1AggregationRule {
    'clusterRoleSelectors': Array<V1LabelSelector>;
}
export declare class V1alpha1ClusterRole {
    'aggregationRule': V1alpha1AggregationRule;
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'rules': Array<V1alpha1PolicyRule>;
}
export declare class V1alpha1ClusterRoleBinding {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'roleRef': V1alpha1RoleRef;
    'subjects': Array<V1alpha1Subject>;
}
export declare class V1alpha1ClusterRoleBindingList {
    'apiVersion': string;
    'items': Array<V1alpha1ClusterRoleBinding>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1alpha1ClusterRoleList {
    'apiVersion': string;
    'items': Array<V1alpha1ClusterRole>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1alpha1Initializer {
    'name': string;
    'rules': Array<V1alpha1Rule>;
}
export declare class V1alpha1InitializerConfiguration {
    'apiVersion': string;
    'initializers': Array<V1alpha1Initializer>;
    'kind': string;
    'metadata': V1ObjectMeta;
}
export declare class V1alpha1InitializerConfigurationList {
    'apiVersion': string;
    'items': Array<V1alpha1InitializerConfiguration>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1alpha1PodPreset {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': V1alpha1PodPresetSpec;
}
export declare class V1alpha1PodPresetList {
    'apiVersion': string;
    'items': Array<V1alpha1PodPreset>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1alpha1PodPresetSpec {
    'env': Array<V1EnvVar>;
    'envFrom': Array<V1EnvFromSource>;
    'selector': V1LabelSelector;
    'volumeMounts': Array<V1VolumeMount>;
    'volumes': Array<V1Volume>;
}
export declare class V1alpha1PolicyRule {
    'apiGroups': Array<string>;
    'nonResourceURLs': Array<string>;
    'resourceNames': Array<string>;
    'resources': Array<string>;
    'verbs': Array<string>;
}
export declare class V1alpha1PriorityClass {
    'apiVersion': string;
    'description': string;
    'globalDefault': boolean;
    'kind': string;
    'metadata': V1ObjectMeta;
    'value': number;
}
export declare class V1alpha1PriorityClassList {
    'apiVersion': string;
    'items': Array<V1alpha1PriorityClass>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1alpha1Role {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'rules': Array<V1alpha1PolicyRule>;
}
export declare class V1alpha1RoleBinding {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'roleRef': V1alpha1RoleRef;
    'subjects': Array<V1alpha1Subject>;
}
export declare class V1alpha1RoleBindingList {
    'apiVersion': string;
    'items': Array<V1alpha1RoleBinding>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1alpha1RoleList {
    'apiVersion': string;
    'items': Array<V1alpha1Role>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1alpha1RoleRef {
    'apiGroup': string;
    'kind': string;
    'name': string;
}
export declare class V1alpha1Rule {
    'apiGroups': Array<string>;
    'apiVersions': Array<string>;
    'resources': Array<string>;
}
export declare class V1alpha1Subject {
    'apiVersion': string;
    'kind': string;
    'name': string;
    'namespace': string;
}
export declare class V1alpha1VolumeAttachment {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': V1alpha1VolumeAttachmentSpec;
    'status': V1alpha1VolumeAttachmentStatus;
}
export declare class V1alpha1VolumeAttachmentList {
    'apiVersion': string;
    'items': Array<V1alpha1VolumeAttachment>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1alpha1VolumeAttachmentSource {
    'persistentVolumeName': string;
}
export declare class V1alpha1VolumeAttachmentSpec {
    'attacher': string;
    'nodeName': string;
    'source': V1alpha1VolumeAttachmentSource;
}
export declare class V1alpha1VolumeAttachmentStatus {
    'attachError': V1alpha1VolumeError;
    'attached': boolean;
    'attachmentMetadata': {
        [key: string]: string;
    };
    'detachError': V1alpha1VolumeError;
}
export declare class V1alpha1VolumeError {
    'message': string;
    'time': Date;
}
export declare class V1beta1APIService {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': V1beta1APIServiceSpec;
    'status': V1beta1APIServiceStatus;
}
export declare class V1beta1APIServiceCondition {
    'lastTransitionTime': Date;
    'message': string;
    'reason': string;
    'status': string;
    'type': string;
}
export declare class V1beta1APIServiceList {
    'apiVersion': string;
    'items': Array<V1beta1APIService>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1beta1APIServiceSpec {
    'caBundle': string;
    'group': string;
    'groupPriorityMinimum': number;
    'insecureSkipTLSVerify': boolean;
    'service': ApiregistrationV1beta1ServiceReference;
    'version': string;
    'versionPriority': number;
}
export declare class V1beta1APIServiceStatus {
    'conditions': Array<V1beta1APIServiceCondition>;
}
export declare class V1beta1AggregationRule {
    'clusterRoleSelectors': Array<V1LabelSelector>;
}
export declare class V1beta1CertificateSigningRequest {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': V1beta1CertificateSigningRequestSpec;
    'status': V1beta1CertificateSigningRequestStatus;
}
export declare class V1beta1CertificateSigningRequestCondition {
    'lastUpdateTime': Date;
    'message': string;
    'reason': string;
    'type': string;
}
export declare class V1beta1CertificateSigningRequestList {
    'apiVersion': string;
    'items': Array<V1beta1CertificateSigningRequest>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1beta1CertificateSigningRequestSpec {
    'extra': {
        [key: string]: Array<string>;
    };
    'groups': Array<string>;
    'request': string;
    'uid': string;
    'usages': Array<string>;
    'username': string;
}
export declare class V1beta1CertificateSigningRequestStatus {
    'certificate': string;
    'conditions': Array<V1beta1CertificateSigningRequestCondition>;
}
export declare class V1beta1ClusterRole {
    'aggregationRule': V1beta1AggregationRule;
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'rules': Array<V1beta1PolicyRule>;
}
export declare class V1beta1ClusterRoleBinding {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'roleRef': V1beta1RoleRef;
    'subjects': Array<V1beta1Subject>;
}
export declare class V1beta1ClusterRoleBindingList {
    'apiVersion': string;
    'items': Array<V1beta1ClusterRoleBinding>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1beta1ClusterRoleList {
    'apiVersion': string;
    'items': Array<V1beta1ClusterRole>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1beta1ControllerRevision {
    'apiVersion': string;
    'data': RuntimeRawExtension;
    'kind': string;
    'metadata': V1ObjectMeta;
    'revision': number;
}
export declare class V1beta1ControllerRevisionList {
    'apiVersion': string;
    'items': Array<V1beta1ControllerRevision>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1beta1CronJob {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': V1beta1CronJobSpec;
    'status': V1beta1CronJobStatus;
}
export declare class V1beta1CronJobList {
    'apiVersion': string;
    'items': Array<V1beta1CronJob>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1beta1CronJobSpec {
    'concurrencyPolicy': string;
    'failedJobsHistoryLimit': number;
    'jobTemplate': V1beta1JobTemplateSpec;
    'schedule': string;
    'startingDeadlineSeconds': number;
    'successfulJobsHistoryLimit': number;
    'suspend': boolean;
}
export declare class V1beta1CronJobStatus {
    'active': Array<V1ObjectReference>;
    'lastScheduleTime': Date;
}
export declare class V1beta1CustomResourceColumnDefinition {
    'jSONPath': string;
    'description': string;
    'format': string;
    'name': string;
    'priority': number;
    'type': string;
}
export declare class V1beta1CustomResourceDefinition {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': V1beta1CustomResourceDefinitionSpec;
    'status': V1beta1CustomResourceDefinitionStatus;
}
export declare class V1beta1CustomResourceDefinitionCondition {
    'lastTransitionTime': Date;
    'message': string;
    'reason': string;
    'status': string;
    'type': string;
}
export declare class V1beta1CustomResourceDefinitionList {
    'apiVersion': string;
    'items': Array<V1beta1CustomResourceDefinition>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1beta1CustomResourceDefinitionNames {
    'categories': Array<string>;
    'kind': string;
    'listKind': string;
    'plural': string;
    'shortNames': Array<string>;
    'singular': string;
}
export declare class V1beta1CustomResourceDefinitionSpec {
    'additionalPrinterColumns': Array<V1beta1CustomResourceColumnDefinition>;
    'group': string;
    'names': V1beta1CustomResourceDefinitionNames;
    'scope': string;
    'subresources': V1beta1CustomResourceSubresources;
    'validation': V1beta1CustomResourceValidation;
    'version': string;
    'versions': Array<V1beta1CustomResourceDefinitionVersion>;
}
export declare class V1beta1CustomResourceDefinitionStatus {
    'acceptedNames': V1beta1CustomResourceDefinitionNames;
    'conditions': Array<V1beta1CustomResourceDefinitionCondition>;
    'storedVersions': Array<string>;
}
export declare class V1beta1CustomResourceDefinitionVersion {
    'name': string;
    'served': boolean;
    'storage': boolean;
}
export declare class V1beta1CustomResourceSubresourceScale {
    'labelSelectorPath': string;
    'specReplicasPath': string;
    'statusReplicasPath': string;
}
export declare class V1beta1CustomResourceSubresources {
    'scale': V1beta1CustomResourceSubresourceScale;
    'status': any;
}
export declare class V1beta1CustomResourceValidation {
    'openAPIV3Schema': V1beta1JSONSchemaProps;
}
export declare class V1beta1DaemonSet {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': V1beta1DaemonSetSpec;
    'status': V1beta1DaemonSetStatus;
}
export declare class V1beta1DaemonSetCondition {
    'lastTransitionTime': Date;
    'message': string;
    'reason': string;
    'status': string;
    'type': string;
}
export declare class V1beta1DaemonSetList {
    'apiVersion': string;
    'items': Array<V1beta1DaemonSet>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1beta1DaemonSetSpec {
    'minReadySeconds': number;
    'revisionHistoryLimit': number;
    'selector': V1LabelSelector;
    'template': V1PodTemplateSpec;
    'templateGeneration': number;
    'updateStrategy': V1beta1DaemonSetUpdateStrategy;
}
export declare class V1beta1DaemonSetStatus {
    'collisionCount': number;
    'conditions': Array<V1beta1DaemonSetCondition>;
    'currentNumberScheduled': number;
    'desiredNumberScheduled': number;
    'numberAvailable': number;
    'numberMisscheduled': number;
    'numberReady': number;
    'numberUnavailable': number;
    'observedGeneration': number;
    'updatedNumberScheduled': number;
}
export declare class V1beta1DaemonSetUpdateStrategy {
    'rollingUpdate': V1beta1RollingUpdateDaemonSet;
    'type': string;
}
export declare class V1beta1Event {
    'action': string;
    'apiVersion': string;
    'deprecatedCount': number;
    'deprecatedFirstTimestamp': Date;
    'deprecatedLastTimestamp': Date;
    'deprecatedSource': V1EventSource;
    'eventTime': Date;
    'kind': string;
    'metadata': V1ObjectMeta;
    'note': string;
    'reason': string;
    'regarding': V1ObjectReference;
    'related': V1ObjectReference;
    'reportingController': string;
    'reportingInstance': string;
    'series': V1beta1EventSeries;
    'type': string;
}
export declare class V1beta1EventList {
    'apiVersion': string;
    'items': Array<V1beta1Event>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1beta1EventSeries {
    'count': number;
    'lastObservedTime': Date;
    'state': string;
}
export declare class V1beta1Eviction {
    'apiVersion': string;
    'deleteOptions': V1DeleteOptions;
    'kind': string;
    'metadata': V1ObjectMeta;
}
export declare class V1beta1ExternalDocumentation {
    'description': string;
    'url': string;
}
export declare class V1beta1HTTPIngressPath {
    'backend': V1beta1IngressBackend;
    'path': string;
}
export declare class V1beta1HTTPIngressRuleValue {
    'paths': Array<V1beta1HTTPIngressPath>;
}
export declare class V1beta1IPBlock {
    'cidr': string;
    'except': Array<string>;
}
export declare class V1beta1Ingress {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': V1beta1IngressSpec;
    'status': V1beta1IngressStatus;
}
export declare class V1beta1IngressBackend {
    'serviceName': string;
    'servicePort': any;
}
export declare class V1beta1IngressList {
    'apiVersion': string;
    'items': Array<V1beta1Ingress>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1beta1IngressRule {
    'host': string;
    'http': V1beta1HTTPIngressRuleValue;
}
export declare class V1beta1IngressSpec {
    'backend': V1beta1IngressBackend;
    'rules': Array<V1beta1IngressRule>;
    'tls': Array<V1beta1IngressTLS>;
}
export declare class V1beta1IngressStatus {
    'loadBalancer': V1LoadBalancerStatus;
}
export declare class V1beta1IngressTLS {
    'hosts': Array<string>;
    'secretName': string;
}
export declare class V1beta1JSONSchemaProps {
    '$Ref': string;
    '$Schema': string;
    'additionalItems': any;
    'additionalProperties': any;
    'allOf': Array<V1beta1JSONSchemaProps>;
    'anyOf': Array<V1beta1JSONSchemaProps>;
    'default': any;
    'definitions': {
        [key: string]: V1beta1JSONSchemaProps;
    };
    'dependencies': {
        [key: string]: any;
    };
    'description': string;
    'enum': Array<any>;
    'example': any;
    'exclusiveMaximum': boolean;
    'exclusiveMinimum': boolean;
    'externalDocs': V1beta1ExternalDocumentation;
    'format': string;
    'id': string;
    'items': any;
    'maxItems': number;
    'maxLength': number;
    'maxProperties': number;
    'maximum': number;
    'minItems': number;
    'minLength': number;
    'minProperties': number;
    'minimum': number;
    'multipleOf': number;
    'not': V1beta1JSONSchemaProps;
    'oneOf': Array<V1beta1JSONSchemaProps>;
    'pattern': string;
    'patternProperties': {
        [key: string]: V1beta1JSONSchemaProps;
    };
    'properties': {
        [key: string]: V1beta1JSONSchemaProps;
    };
    'required': Array<string>;
    'title': string;
    'type': string;
    'uniqueItems': boolean;
}
export declare class V1beta1JobTemplateSpec {
    'metadata': V1ObjectMeta;
    'spec': V1JobSpec;
}
export declare class V1beta1LocalSubjectAccessReview {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': V1beta1SubjectAccessReviewSpec;
    'status': V1beta1SubjectAccessReviewStatus;
}
export declare class V1beta1MutatingWebhookConfiguration {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'webhooks': Array<V1beta1Webhook>;
}
export declare class V1beta1MutatingWebhookConfigurationList {
    'apiVersion': string;
    'items': Array<V1beta1MutatingWebhookConfiguration>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1beta1NetworkPolicy {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': V1beta1NetworkPolicySpec;
}
export declare class V1beta1NetworkPolicyEgressRule {
    'ports': Array<V1beta1NetworkPolicyPort>;
    'to': Array<V1beta1NetworkPolicyPeer>;
}
export declare class V1beta1NetworkPolicyIngressRule {
    'from': Array<V1beta1NetworkPolicyPeer>;
    'ports': Array<V1beta1NetworkPolicyPort>;
}
export declare class V1beta1NetworkPolicyList {
    'apiVersion': string;
    'items': Array<V1beta1NetworkPolicy>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1beta1NetworkPolicyPeer {
    'ipBlock': V1beta1IPBlock;
    'namespaceSelector': V1LabelSelector;
    'podSelector': V1LabelSelector;
}
export declare class V1beta1NetworkPolicyPort {
    'port': any;
    'protocol': string;
}
export declare class V1beta1NetworkPolicySpec {
    'egress': Array<V1beta1NetworkPolicyEgressRule>;
    'ingress': Array<V1beta1NetworkPolicyIngressRule>;
    'podSelector': V1LabelSelector;
    'policyTypes': Array<string>;
}
export declare class V1beta1NonResourceAttributes {
    'path': string;
    'verb': string;
}
export declare class V1beta1NonResourceRule {
    'nonResourceURLs': Array<string>;
    'verbs': Array<string>;
}
export declare class V1beta1PodDisruptionBudget {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': V1beta1PodDisruptionBudgetSpec;
    'status': V1beta1PodDisruptionBudgetStatus;
}
export declare class V1beta1PodDisruptionBudgetList {
    'apiVersion': string;
    'items': Array<V1beta1PodDisruptionBudget>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1beta1PodDisruptionBudgetSpec {
    'maxUnavailable': any;
    'minAvailable': any;
    'selector': V1LabelSelector;
}
export declare class V1beta1PodDisruptionBudgetStatus {
    'currentHealthy': number;
    'desiredHealthy': number;
    'disruptedPods': {
        [key: string]: Date;
    };
    'disruptionsAllowed': number;
    'expectedPods': number;
    'observedGeneration': number;
}
export declare class V1beta1PolicyRule {
    'apiGroups': Array<string>;
    'nonResourceURLs': Array<string>;
    'resourceNames': Array<string>;
    'resources': Array<string>;
    'verbs': Array<string>;
}
export declare class V1beta1PriorityClass {
    'apiVersion': string;
    'description': string;
    'globalDefault': boolean;
    'kind': string;
    'metadata': V1ObjectMeta;
    'value': number;
}
export declare class V1beta1PriorityClassList {
    'apiVersion': string;
    'items': Array<V1beta1PriorityClass>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1beta1ReplicaSet {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': V1beta1ReplicaSetSpec;
    'status': V1beta1ReplicaSetStatus;
}
export declare class V1beta1ReplicaSetCondition {
    'lastTransitionTime': Date;
    'message': string;
    'reason': string;
    'status': string;
    'type': string;
}
export declare class V1beta1ReplicaSetList {
    'apiVersion': string;
    'items': Array<V1beta1ReplicaSet>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1beta1ReplicaSetSpec {
    'minReadySeconds': number;
    'replicas': number;
    'selector': V1LabelSelector;
    'template': V1PodTemplateSpec;
}
export declare class V1beta1ReplicaSetStatus {
    'availableReplicas': number;
    'conditions': Array<V1beta1ReplicaSetCondition>;
    'fullyLabeledReplicas': number;
    'observedGeneration': number;
    'readyReplicas': number;
    'replicas': number;
}
export declare class V1beta1ResourceAttributes {
    'group': string;
    'name': string;
    'namespace': string;
    'resource': string;
    'subresource': string;
    'verb': string;
    'version': string;
}
export declare class V1beta1ResourceRule {
    'apiGroups': Array<string>;
    'resourceNames': Array<string>;
    'resources': Array<string>;
    'verbs': Array<string>;
}
export declare class V1beta1Role {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'rules': Array<V1beta1PolicyRule>;
}
export declare class V1beta1RoleBinding {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'roleRef': V1beta1RoleRef;
    'subjects': Array<V1beta1Subject>;
}
export declare class V1beta1RoleBindingList {
    'apiVersion': string;
    'items': Array<V1beta1RoleBinding>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1beta1RoleList {
    'apiVersion': string;
    'items': Array<V1beta1Role>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1beta1RoleRef {
    'apiGroup': string;
    'kind': string;
    'name': string;
}
export declare class V1beta1RollingUpdateDaemonSet {
    'maxUnavailable': any;
}
export declare class V1beta1RollingUpdateStatefulSetStrategy {
    'partition': number;
}
export declare class V1beta1RuleWithOperations {
    'apiGroups': Array<string>;
    'apiVersions': Array<string>;
    'operations': Array<string>;
    'resources': Array<string>;
}
export declare class V1beta1SelfSubjectAccessReview {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': V1beta1SelfSubjectAccessReviewSpec;
    'status': V1beta1SubjectAccessReviewStatus;
}
export declare class V1beta1SelfSubjectAccessReviewSpec {
    'nonResourceAttributes': V1beta1NonResourceAttributes;
    'resourceAttributes': V1beta1ResourceAttributes;
}
export declare class V1beta1SelfSubjectRulesReview {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': V1beta1SelfSubjectRulesReviewSpec;
    'status': V1beta1SubjectRulesReviewStatus;
}
export declare class V1beta1SelfSubjectRulesReviewSpec {
    'namespace': string;
}
export declare class V1beta1StatefulSet {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': V1beta1StatefulSetSpec;
    'status': V1beta1StatefulSetStatus;
}
export declare class V1beta1StatefulSetCondition {
    'lastTransitionTime': Date;
    'message': string;
    'reason': string;
    'status': string;
    'type': string;
}
export declare class V1beta1StatefulSetList {
    'apiVersion': string;
    'items': Array<V1beta1StatefulSet>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1beta1StatefulSetSpec {
    'podManagementPolicy': string;
    'replicas': number;
    'revisionHistoryLimit': number;
    'selector': V1LabelSelector;
    'serviceName': string;
    'template': V1PodTemplateSpec;
    'updateStrategy': V1beta1StatefulSetUpdateStrategy;
    'volumeClaimTemplates': Array<V1PersistentVolumeClaim>;
}
export declare class V1beta1StatefulSetStatus {
    'collisionCount': number;
    'conditions': Array<V1beta1StatefulSetCondition>;
    'currentReplicas': number;
    'currentRevision': string;
    'observedGeneration': number;
    'readyReplicas': number;
    'replicas': number;
    'updateRevision': string;
    'updatedReplicas': number;
}
export declare class V1beta1StatefulSetUpdateStrategy {
    'rollingUpdate': V1beta1RollingUpdateStatefulSetStrategy;
    'type': string;
}
export declare class V1beta1StorageClass {
    'allowVolumeExpansion': boolean;
    'allowedTopologies': Array<V1TopologySelectorTerm>;
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'mountOptions': Array<string>;
    'parameters': {
        [key: string]: string;
    };
    'provisioner': string;
    'reclaimPolicy': string;
    'volumeBindingMode': string;
}
export declare class V1beta1StorageClassList {
    'apiVersion': string;
    'items': Array<V1beta1StorageClass>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1beta1Subject {
    'apiGroup': string;
    'kind': string;
    'name': string;
    'namespace': string;
}
export declare class V1beta1SubjectAccessReview {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': V1beta1SubjectAccessReviewSpec;
    'status': V1beta1SubjectAccessReviewStatus;
}
export declare class V1beta1SubjectAccessReviewSpec {
    'extra': {
        [key: string]: Array<string>;
    };
    'group': Array<string>;
    'nonResourceAttributes': V1beta1NonResourceAttributes;
    'resourceAttributes': V1beta1ResourceAttributes;
    'uid': string;
    'user': string;
}
export declare class V1beta1SubjectAccessReviewStatus {
    'allowed': boolean;
    'denied': boolean;
    'evaluationError': string;
    'reason': string;
}
export declare class V1beta1SubjectRulesReviewStatus {
    'evaluationError': string;
    'incomplete': boolean;
    'nonResourceRules': Array<V1beta1NonResourceRule>;
    'resourceRules': Array<V1beta1ResourceRule>;
}
export declare class V1beta1TokenReview {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': V1beta1TokenReviewSpec;
    'status': V1beta1TokenReviewStatus;
}
export declare class V1beta1TokenReviewSpec {
    'token': string;
}
export declare class V1beta1TokenReviewStatus {
    'authenticated': boolean;
    'error': string;
    'user': V1beta1UserInfo;
}
export declare class V1beta1UserInfo {
    'extra': {
        [key: string]: Array<string>;
    };
    'groups': Array<string>;
    'uid': string;
    'username': string;
}
export declare class V1beta1ValidatingWebhookConfiguration {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'webhooks': Array<V1beta1Webhook>;
}
export declare class V1beta1ValidatingWebhookConfigurationList {
    'apiVersion': string;
    'items': Array<V1beta1ValidatingWebhookConfiguration>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1beta1VolumeAttachment {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': V1beta1VolumeAttachmentSpec;
    'status': V1beta1VolumeAttachmentStatus;
}
export declare class V1beta1VolumeAttachmentList {
    'apiVersion': string;
    'items': Array<V1beta1VolumeAttachment>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1beta1VolumeAttachmentSource {
    'persistentVolumeName': string;
}
export declare class V1beta1VolumeAttachmentSpec {
    'attacher': string;
    'nodeName': string;
    'source': V1beta1VolumeAttachmentSource;
}
export declare class V1beta1VolumeAttachmentStatus {
    'attachError': V1beta1VolumeError;
    'attached': boolean;
    'attachmentMetadata': {
        [key: string]: string;
    };
    'detachError': V1beta1VolumeError;
}
export declare class V1beta1VolumeError {
    'message': string;
    'time': Date;
}
export declare class V1beta1Webhook {
    'clientConfig': V1beta1WebhookClientConfig;
    'failurePolicy': string;
    'name': string;
    'namespaceSelector': V1LabelSelector;
    'rules': Array<V1beta1RuleWithOperations>;
}
export declare class V1beta1WebhookClientConfig {
    'caBundle': string;
    'service': AdmissionregistrationV1beta1ServiceReference;
    'url': string;
}
export declare class V1beta2ControllerRevision {
    'apiVersion': string;
    'data': RuntimeRawExtension;
    'kind': string;
    'metadata': V1ObjectMeta;
    'revision': number;
}
export declare class V1beta2ControllerRevisionList {
    'apiVersion': string;
    'items': Array<V1beta2ControllerRevision>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1beta2DaemonSet {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': V1beta2DaemonSetSpec;
    'status': V1beta2DaemonSetStatus;
}
export declare class V1beta2DaemonSetCondition {
    'lastTransitionTime': Date;
    'message': string;
    'reason': string;
    'status': string;
    'type': string;
}
export declare class V1beta2DaemonSetList {
    'apiVersion': string;
    'items': Array<V1beta2DaemonSet>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1beta2DaemonSetSpec {
    'minReadySeconds': number;
    'revisionHistoryLimit': number;
    'selector': V1LabelSelector;
    'template': V1PodTemplateSpec;
    'updateStrategy': V1beta2DaemonSetUpdateStrategy;
}
export declare class V1beta2DaemonSetStatus {
    'collisionCount': number;
    'conditions': Array<V1beta2DaemonSetCondition>;
    'currentNumberScheduled': number;
    'desiredNumberScheduled': number;
    'numberAvailable': number;
    'numberMisscheduled': number;
    'numberReady': number;
    'numberUnavailable': number;
    'observedGeneration': number;
    'updatedNumberScheduled': number;
}
export declare class V1beta2DaemonSetUpdateStrategy {
    'rollingUpdate': V1beta2RollingUpdateDaemonSet;
    'type': string;
}
export declare class V1beta2Deployment {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': V1beta2DeploymentSpec;
    'status': V1beta2DeploymentStatus;
}
export declare class V1beta2DeploymentCondition {
    'lastTransitionTime': Date;
    'lastUpdateTime': Date;
    'message': string;
    'reason': string;
    'status': string;
    'type': string;
}
export declare class V1beta2DeploymentList {
    'apiVersion': string;
    'items': Array<V1beta2Deployment>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1beta2DeploymentSpec {
    'minReadySeconds': number;
    'paused': boolean;
    'progressDeadlineSeconds': number;
    'replicas': number;
    'revisionHistoryLimit': number;
    'selector': V1LabelSelector;
    'strategy': V1beta2DeploymentStrategy;
    'template': V1PodTemplateSpec;
}
export declare class V1beta2DeploymentStatus {
    'availableReplicas': number;
    'collisionCount': number;
    'conditions': Array<V1beta2DeploymentCondition>;
    'observedGeneration': number;
    'readyReplicas': number;
    'replicas': number;
    'unavailableReplicas': number;
    'updatedReplicas': number;
}
export declare class V1beta2DeploymentStrategy {
    'rollingUpdate': V1beta2RollingUpdateDeployment;
    'type': string;
}
export declare class V1beta2ReplicaSet {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': V1beta2ReplicaSetSpec;
    'status': V1beta2ReplicaSetStatus;
}
export declare class V1beta2ReplicaSetCondition {
    'lastTransitionTime': Date;
    'message': string;
    'reason': string;
    'status': string;
    'type': string;
}
export declare class V1beta2ReplicaSetList {
    'apiVersion': string;
    'items': Array<V1beta2ReplicaSet>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1beta2ReplicaSetSpec {
    'minReadySeconds': number;
    'replicas': number;
    'selector': V1LabelSelector;
    'template': V1PodTemplateSpec;
}
export declare class V1beta2ReplicaSetStatus {
    'availableReplicas': number;
    'conditions': Array<V1beta2ReplicaSetCondition>;
    'fullyLabeledReplicas': number;
    'observedGeneration': number;
    'readyReplicas': number;
    'replicas': number;
}
export declare class V1beta2RollingUpdateDaemonSet {
    'maxUnavailable': any;
}
export declare class V1beta2RollingUpdateDeployment {
    'maxSurge': any;
    'maxUnavailable': any;
}
export declare class V1beta2RollingUpdateStatefulSetStrategy {
    'partition': number;
}
export declare class V1beta2Scale {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': V1beta2ScaleSpec;
    'status': V1beta2ScaleStatus;
}
export declare class V1beta2ScaleSpec {
    'replicas': number;
}
export declare class V1beta2ScaleStatus {
    'replicas': number;
    'selector': {
        [key: string]: string;
    };
    'targetSelector': string;
}
export declare class V1beta2StatefulSet {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': V1beta2StatefulSetSpec;
    'status': V1beta2StatefulSetStatus;
}
export declare class V1beta2StatefulSetCondition {
    'lastTransitionTime': Date;
    'message': string;
    'reason': string;
    'status': string;
    'type': string;
}
export declare class V1beta2StatefulSetList {
    'apiVersion': string;
    'items': Array<V1beta2StatefulSet>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V1beta2StatefulSetSpec {
    'podManagementPolicy': string;
    'replicas': number;
    'revisionHistoryLimit': number;
    'selector': V1LabelSelector;
    'serviceName': string;
    'template': V1PodTemplateSpec;
    'updateStrategy': V1beta2StatefulSetUpdateStrategy;
    'volumeClaimTemplates': Array<V1PersistentVolumeClaim>;
}
export declare class V1beta2StatefulSetStatus {
    'collisionCount': number;
    'conditions': Array<V1beta2StatefulSetCondition>;
    'currentReplicas': number;
    'currentRevision': string;
    'observedGeneration': number;
    'readyReplicas': number;
    'replicas': number;
    'updateRevision': string;
    'updatedReplicas': number;
}
export declare class V1beta2StatefulSetUpdateStrategy {
    'rollingUpdate': V1beta2RollingUpdateStatefulSetStrategy;
    'type': string;
}
export declare class V2alpha1CronJob {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': V2alpha1CronJobSpec;
    'status': V2alpha1CronJobStatus;
}
export declare class V2alpha1CronJobList {
    'apiVersion': string;
    'items': Array<V2alpha1CronJob>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V2alpha1CronJobSpec {
    'concurrencyPolicy': string;
    'failedJobsHistoryLimit': number;
    'jobTemplate': V2alpha1JobTemplateSpec;
    'schedule': string;
    'startingDeadlineSeconds': number;
    'successfulJobsHistoryLimit': number;
    'suspend': boolean;
}
export declare class V2alpha1CronJobStatus {
    'active': Array<V1ObjectReference>;
    'lastScheduleTime': Date;
}
export declare class V2alpha1JobTemplateSpec {
    'metadata': V1ObjectMeta;
    'spec': V1JobSpec;
}
export declare class V2beta1CrossVersionObjectReference {
    'apiVersion': string;
    'kind': string;
    'name': string;
}
export declare class V2beta1ExternalMetricSource {
    'metricName': string;
    'metricSelector': V1LabelSelector;
    'targetAverageValue': string;
    'targetValue': string;
}
export declare class V2beta1ExternalMetricStatus {
    'currentAverageValue': string;
    'currentValue': string;
    'metricName': string;
    'metricSelector': V1LabelSelector;
}
export declare class V2beta1HorizontalPodAutoscaler {
    'apiVersion': string;
    'kind': string;
    'metadata': V1ObjectMeta;
    'spec': V2beta1HorizontalPodAutoscalerSpec;
    'status': V2beta1HorizontalPodAutoscalerStatus;
}
export declare class V2beta1HorizontalPodAutoscalerCondition {
    'lastTransitionTime': Date;
    'message': string;
    'reason': string;
    'status': string;
    'type': string;
}
export declare class V2beta1HorizontalPodAutoscalerList {
    'apiVersion': string;
    'items': Array<V2beta1HorizontalPodAutoscaler>;
    'kind': string;
    'metadata': V1ListMeta;
}
export declare class V2beta1HorizontalPodAutoscalerSpec {
    'maxReplicas': number;
    'metrics': Array<V2beta1MetricSpec>;
    'minReplicas': number;
    'scaleTargetRef': V2beta1CrossVersionObjectReference;
}
export declare class V2beta1HorizontalPodAutoscalerStatus {
    'conditions': Array<V2beta1HorizontalPodAutoscalerCondition>;
    'currentMetrics': Array<V2beta1MetricStatus>;
    'currentReplicas': number;
    'desiredReplicas': number;
    'lastScaleTime': Date;
    'observedGeneration': number;
}
export declare class V2beta1MetricSpec {
    'external': V2beta1ExternalMetricSource;
    'object': V2beta1ObjectMetricSource;
    'pods': V2beta1PodsMetricSource;
    'resource': V2beta1ResourceMetricSource;
    'type': string;
}
export declare class V2beta1MetricStatus {
    'external': V2beta1ExternalMetricStatus;
    'object': V2beta1ObjectMetricStatus;
    'pods': V2beta1PodsMetricStatus;
    'resource': V2beta1ResourceMetricStatus;
    'type': string;
}
export declare class V2beta1ObjectMetricSource {
    'metricName': string;
    'target': V2beta1CrossVersionObjectReference;
    'targetValue': string;
}
export declare class V2beta1ObjectMetricStatus {
    'currentValue': string;
    'metricName': string;
    'target': V2beta1CrossVersionObjectReference;
}
export declare class V2beta1PodsMetricSource {
    'metricName': string;
    'targetAverageValue': string;
}
export declare class V2beta1PodsMetricStatus {
    'currentAverageValue': string;
    'metricName': string;
}
export declare class V2beta1ResourceMetricSource {
    'name': string;
    'targetAverageUtilization': number;
    'targetAverageValue': string;
}
export declare class V2beta1ResourceMetricStatus {
    'currentAverageUtilization': number;
    'currentAverageValue': string;
    'name': string;
}
export declare class VersionInfo {
    'buildDate': string;
    'compiler': string;
    'gitCommit': string;
    'gitTreeState': string;
    'gitVersion': string;
    'goVersion': string;
    'major': string;
    'minor': string;
    'platform': string;
}
export interface Authentication {
    applyToRequest(requestOptions: request.Options): void;
}
export declare class HttpBasicAuth implements Authentication {
    username: string;
    password: string;
    applyToRequest(requestOptions: request.Options): void;
}
export declare class ApiKeyAuth implements Authentication {
    private location;
    private paramName;
    apiKey: string;
    constructor(location: string, paramName: string);
    applyToRequest(requestOptions: request.Options): void;
}
export declare class OAuth implements Authentication {
    accessToken: string;
    applyToRequest(requestOptions: request.Options): void;
}
export declare class VoidAuth implements Authentication {
    username: string;
    password: string;
    applyToRequest(_: request.Options): void;
}
export declare enum AdmissionregistrationApiApiKeys {
    BearerToken = 0
}
export declare class AdmissionregistrationApi {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: AdmissionregistrationApiApiKeys, value: string): void;
    getAPIGroup(): Promise<{
        response: http.ClientResponse;
        body: V1APIGroup;
    }>;
}
export declare enum Admissionregistration_v1alpha1ApiApiKeys {
    BearerToken = 0
}
export declare class Admissionregistration_v1alpha1Api {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: Admissionregistration_v1alpha1ApiApiKeys, value: string): void;
    createInitializerConfiguration(body: V1alpha1InitializerConfiguration, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1alpha1InitializerConfiguration;
    }>;
    deleteCollectionInitializerConfiguration(pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteInitializerConfiguration(name: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    getAPIResources(): Promise<{
        response: http.ClientResponse;
        body: V1APIResourceList;
    }>;
    listInitializerConfiguration(pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1alpha1InitializerConfigurationList;
    }>;
    patchInitializerConfiguration(name: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1alpha1InitializerConfiguration;
    }>;
    readInitializerConfiguration(name: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1alpha1InitializerConfiguration;
    }>;
    replaceInitializerConfiguration(name: string, body: V1alpha1InitializerConfiguration, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1alpha1InitializerConfiguration;
    }>;
}
export declare enum Admissionregistration_v1beta1ApiApiKeys {
    BearerToken = 0
}
export declare class Admissionregistration_v1beta1Api {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: Admissionregistration_v1beta1ApiApiKeys, value: string): void;
    createMutatingWebhookConfiguration(body: V1beta1MutatingWebhookConfiguration, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1MutatingWebhookConfiguration;
    }>;
    createValidatingWebhookConfiguration(body: V1beta1ValidatingWebhookConfiguration, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1ValidatingWebhookConfiguration;
    }>;
    deleteCollectionMutatingWebhookConfiguration(pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteCollectionValidatingWebhookConfiguration(pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteMutatingWebhookConfiguration(name: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteValidatingWebhookConfiguration(name: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    getAPIResources(): Promise<{
        response: http.ClientResponse;
        body: V1APIResourceList;
    }>;
    listMutatingWebhookConfiguration(pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta1MutatingWebhookConfigurationList;
    }>;
    listValidatingWebhookConfiguration(pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta1ValidatingWebhookConfigurationList;
    }>;
    patchMutatingWebhookConfiguration(name: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1MutatingWebhookConfiguration;
    }>;
    patchValidatingWebhookConfiguration(name: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1ValidatingWebhookConfiguration;
    }>;
    readMutatingWebhookConfiguration(name: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta1MutatingWebhookConfiguration;
    }>;
    readValidatingWebhookConfiguration(name: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta1ValidatingWebhookConfiguration;
    }>;
    replaceMutatingWebhookConfiguration(name: string, body: V1beta1MutatingWebhookConfiguration, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1MutatingWebhookConfiguration;
    }>;
    replaceValidatingWebhookConfiguration(name: string, body: V1beta1ValidatingWebhookConfiguration, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1ValidatingWebhookConfiguration;
    }>;
}
export declare enum ApiextensionsApiApiKeys {
    BearerToken = 0
}
export declare class ApiextensionsApi {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: ApiextensionsApiApiKeys, value: string): void;
    getAPIGroup(): Promise<{
        response: http.ClientResponse;
        body: V1APIGroup;
    }>;
}
export declare enum Apiextensions_v1beta1ApiApiKeys {
    BearerToken = 0
}
export declare class Apiextensions_v1beta1Api {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: Apiextensions_v1beta1ApiApiKeys, value: string): void;
    createCustomResourceDefinition(body: V1beta1CustomResourceDefinition, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1CustomResourceDefinition;
    }>;
    deleteCollectionCustomResourceDefinition(pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteCustomResourceDefinition(name: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    getAPIResources(): Promise<{
        response: http.ClientResponse;
        body: V1APIResourceList;
    }>;
    listCustomResourceDefinition(pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta1CustomResourceDefinitionList;
    }>;
    patchCustomResourceDefinition(name: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1CustomResourceDefinition;
    }>;
    patchCustomResourceDefinitionStatus(name: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1CustomResourceDefinition;
    }>;
    readCustomResourceDefinition(name: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta1CustomResourceDefinition;
    }>;
    readCustomResourceDefinitionStatus(name: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1CustomResourceDefinition;
    }>;
    replaceCustomResourceDefinition(name: string, body: V1beta1CustomResourceDefinition, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1CustomResourceDefinition;
    }>;
    replaceCustomResourceDefinitionStatus(name: string, body: V1beta1CustomResourceDefinition, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1CustomResourceDefinition;
    }>;
}
export declare enum ApiregistrationApiApiKeys {
    BearerToken = 0
}
export declare class ApiregistrationApi {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: ApiregistrationApiApiKeys, value: string): void;
    getAPIGroup(): Promise<{
        response: http.ClientResponse;
        body: V1APIGroup;
    }>;
}
export declare enum Apiregistration_v1ApiApiKeys {
    BearerToken = 0
}
export declare class Apiregistration_v1Api {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: Apiregistration_v1ApiApiKeys, value: string): void;
    createAPIService(body: V1APIService, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1APIService;
    }>;
    deleteAPIService(name: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteCollectionAPIService(pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    getAPIResources(): Promise<{
        response: http.ClientResponse;
        body: V1APIResourceList;
    }>;
    listAPIService(pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1APIServiceList;
    }>;
    patchAPIService(name: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1APIService;
    }>;
    patchAPIServiceStatus(name: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1APIService;
    }>;
    readAPIService(name: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1APIService;
    }>;
    readAPIServiceStatus(name: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1APIService;
    }>;
    replaceAPIService(name: string, body: V1APIService, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1APIService;
    }>;
    replaceAPIServiceStatus(name: string, body: V1APIService, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1APIService;
    }>;
}
export declare enum Apiregistration_v1beta1ApiApiKeys {
    BearerToken = 0
}
export declare class Apiregistration_v1beta1Api {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: Apiregistration_v1beta1ApiApiKeys, value: string): void;
    createAPIService(body: V1beta1APIService, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1APIService;
    }>;
    deleteAPIService(name: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteCollectionAPIService(pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    getAPIResources(): Promise<{
        response: http.ClientResponse;
        body: V1APIResourceList;
    }>;
    listAPIService(pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta1APIServiceList;
    }>;
    patchAPIService(name: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1APIService;
    }>;
    patchAPIServiceStatus(name: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1APIService;
    }>;
    readAPIService(name: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta1APIService;
    }>;
    readAPIServiceStatus(name: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1APIService;
    }>;
    replaceAPIService(name: string, body: V1beta1APIService, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1APIService;
    }>;
    replaceAPIServiceStatus(name: string, body: V1beta1APIService, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1APIService;
    }>;
}
export declare enum ApisApiApiKeys {
    BearerToken = 0
}
export declare class ApisApi {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: ApisApiApiKeys, value: string): void;
    getAPIVersions(): Promise<{
        response: http.ClientResponse;
        body: V1APIGroupList;
    }>;
}
export declare enum AppsApiApiKeys {
    BearerToken = 0
}
export declare class AppsApi {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: AppsApiApiKeys, value: string): void;
    getAPIGroup(): Promise<{
        response: http.ClientResponse;
        body: V1APIGroup;
    }>;
}
export declare enum Apps_v1ApiApiKeys {
    BearerToken = 0
}
export declare class Apps_v1Api {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: Apps_v1ApiApiKeys, value: string): void;
    createNamespacedControllerRevision(namespace: string, body: V1ControllerRevision, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1ControllerRevision;
    }>;
    createNamespacedDaemonSet(namespace: string, body: V1DaemonSet, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1DaemonSet;
    }>;
    createNamespacedDeployment(namespace: string, body: V1Deployment, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Deployment;
    }>;
    createNamespacedReplicaSet(namespace: string, body: V1ReplicaSet, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1ReplicaSet;
    }>;
    createNamespacedStatefulSet(namespace: string, body: V1StatefulSet, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1StatefulSet;
    }>;
    deleteCollectionNamespacedControllerRevision(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteCollectionNamespacedDaemonSet(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteCollectionNamespacedDeployment(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteCollectionNamespacedReplicaSet(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteCollectionNamespacedStatefulSet(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteNamespacedControllerRevision(name: string, namespace: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteNamespacedDaemonSet(name: string, namespace: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteNamespacedDeployment(name: string, namespace: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteNamespacedReplicaSet(name: string, namespace: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteNamespacedStatefulSet(name: string, namespace: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    getAPIResources(): Promise<{
        response: http.ClientResponse;
        body: V1APIResourceList;
    }>;
    listControllerRevisionForAllNamespaces(_continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1ControllerRevisionList;
    }>;
    listDaemonSetForAllNamespaces(_continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1DaemonSetList;
    }>;
    listDeploymentForAllNamespaces(_continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1DeploymentList;
    }>;
    listNamespacedControllerRevision(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1ControllerRevisionList;
    }>;
    listNamespacedDaemonSet(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1DaemonSetList;
    }>;
    listNamespacedDeployment(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1DeploymentList;
    }>;
    listNamespacedReplicaSet(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1ReplicaSetList;
    }>;
    listNamespacedStatefulSet(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1StatefulSetList;
    }>;
    listReplicaSetForAllNamespaces(_continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1ReplicaSetList;
    }>;
    listStatefulSetForAllNamespaces(_continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1StatefulSetList;
    }>;
    patchNamespacedControllerRevision(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1ControllerRevision;
    }>;
    patchNamespacedDaemonSet(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1DaemonSet;
    }>;
    patchNamespacedDaemonSetStatus(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1DaemonSet;
    }>;
    patchNamespacedDeployment(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Deployment;
    }>;
    patchNamespacedDeploymentScale(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Scale;
    }>;
    patchNamespacedDeploymentStatus(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Deployment;
    }>;
    patchNamespacedReplicaSet(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1ReplicaSet;
    }>;
    patchNamespacedReplicaSetScale(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Scale;
    }>;
    patchNamespacedReplicaSetStatus(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1ReplicaSet;
    }>;
    patchNamespacedStatefulSet(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1StatefulSet;
    }>;
    patchNamespacedStatefulSetScale(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Scale;
    }>;
    patchNamespacedStatefulSetStatus(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1StatefulSet;
    }>;
    readNamespacedControllerRevision(name: string, namespace: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1ControllerRevision;
    }>;
    readNamespacedDaemonSet(name: string, namespace: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1DaemonSet;
    }>;
    readNamespacedDaemonSetStatus(name: string, namespace: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1DaemonSet;
    }>;
    readNamespacedDeployment(name: string, namespace: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Deployment;
    }>;
    readNamespacedDeploymentScale(name: string, namespace: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Scale;
    }>;
    readNamespacedDeploymentStatus(name: string, namespace: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Deployment;
    }>;
    readNamespacedReplicaSet(name: string, namespace: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1ReplicaSet;
    }>;
    readNamespacedReplicaSetScale(name: string, namespace: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Scale;
    }>;
    readNamespacedReplicaSetStatus(name: string, namespace: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1ReplicaSet;
    }>;
    readNamespacedStatefulSet(name: string, namespace: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1StatefulSet;
    }>;
    readNamespacedStatefulSetScale(name: string, namespace: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Scale;
    }>;
    readNamespacedStatefulSetStatus(name: string, namespace: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1StatefulSet;
    }>;
    replaceNamespacedControllerRevision(name: string, namespace: string, body: V1ControllerRevision, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1ControllerRevision;
    }>;
    replaceNamespacedDaemonSet(name: string, namespace: string, body: V1DaemonSet, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1DaemonSet;
    }>;
    replaceNamespacedDaemonSetStatus(name: string, namespace: string, body: V1DaemonSet, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1DaemonSet;
    }>;
    replaceNamespacedDeployment(name: string, namespace: string, body: V1Deployment, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Deployment;
    }>;
    replaceNamespacedDeploymentScale(name: string, namespace: string, body: V1Scale, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Scale;
    }>;
    replaceNamespacedDeploymentStatus(name: string, namespace: string, body: V1Deployment, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Deployment;
    }>;
    replaceNamespacedReplicaSet(name: string, namespace: string, body: V1ReplicaSet, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1ReplicaSet;
    }>;
    replaceNamespacedReplicaSetScale(name: string, namespace: string, body: V1Scale, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Scale;
    }>;
    replaceNamespacedReplicaSetStatus(name: string, namespace: string, body: V1ReplicaSet, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1ReplicaSet;
    }>;
    replaceNamespacedStatefulSet(name: string, namespace: string, body: V1StatefulSet, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1StatefulSet;
    }>;
    replaceNamespacedStatefulSetScale(name: string, namespace: string, body: V1Scale, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Scale;
    }>;
    replaceNamespacedStatefulSetStatus(name: string, namespace: string, body: V1StatefulSet, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1StatefulSet;
    }>;
}
export declare enum Apps_v1beta1ApiApiKeys {
    BearerToken = 0
}
export declare class Apps_v1beta1Api {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: Apps_v1beta1ApiApiKeys, value: string): void;
    createNamespacedControllerRevision(namespace: string, body: V1beta1ControllerRevision, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1ControllerRevision;
    }>;
    createNamespacedDeployment(namespace: string, body: AppsV1beta1Deployment, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: AppsV1beta1Deployment;
    }>;
    createNamespacedDeploymentRollback(name: string, namespace: string, body: AppsV1beta1DeploymentRollback, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: AppsV1beta1DeploymentRollback;
    }>;
    createNamespacedStatefulSet(namespace: string, body: V1beta1StatefulSet, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1StatefulSet;
    }>;
    deleteCollectionNamespacedControllerRevision(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteCollectionNamespacedDeployment(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteCollectionNamespacedStatefulSet(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteNamespacedControllerRevision(name: string, namespace: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteNamespacedDeployment(name: string, namespace: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteNamespacedStatefulSet(name: string, namespace: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    getAPIResources(): Promise<{
        response: http.ClientResponse;
        body: V1APIResourceList;
    }>;
    listControllerRevisionForAllNamespaces(_continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta1ControllerRevisionList;
    }>;
    listDeploymentForAllNamespaces(_continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: AppsV1beta1DeploymentList;
    }>;
    listNamespacedControllerRevision(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta1ControllerRevisionList;
    }>;
    listNamespacedDeployment(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: AppsV1beta1DeploymentList;
    }>;
    listNamespacedStatefulSet(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta1StatefulSetList;
    }>;
    listStatefulSetForAllNamespaces(_continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta1StatefulSetList;
    }>;
    patchNamespacedControllerRevision(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1ControllerRevision;
    }>;
    patchNamespacedDeployment(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: AppsV1beta1Deployment;
    }>;
    patchNamespacedDeploymentScale(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: AppsV1beta1Scale;
    }>;
    patchNamespacedDeploymentStatus(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: AppsV1beta1Deployment;
    }>;
    patchNamespacedStatefulSet(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1StatefulSet;
    }>;
    patchNamespacedStatefulSetScale(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: AppsV1beta1Scale;
    }>;
    patchNamespacedStatefulSetStatus(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1StatefulSet;
    }>;
    readNamespacedControllerRevision(name: string, namespace: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta1ControllerRevision;
    }>;
    readNamespacedDeployment(name: string, namespace: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: AppsV1beta1Deployment;
    }>;
    readNamespacedDeploymentScale(name: string, namespace: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: AppsV1beta1Scale;
    }>;
    readNamespacedDeploymentStatus(name: string, namespace: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: AppsV1beta1Deployment;
    }>;
    readNamespacedStatefulSet(name: string, namespace: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta1StatefulSet;
    }>;
    readNamespacedStatefulSetScale(name: string, namespace: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: AppsV1beta1Scale;
    }>;
    readNamespacedStatefulSetStatus(name: string, namespace: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1StatefulSet;
    }>;
    replaceNamespacedControllerRevision(name: string, namespace: string, body: V1beta1ControllerRevision, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1ControllerRevision;
    }>;
    replaceNamespacedDeployment(name: string, namespace: string, body: AppsV1beta1Deployment, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: AppsV1beta1Deployment;
    }>;
    replaceNamespacedDeploymentScale(name: string, namespace: string, body: AppsV1beta1Scale, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: AppsV1beta1Scale;
    }>;
    replaceNamespacedDeploymentStatus(name: string, namespace: string, body: AppsV1beta1Deployment, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: AppsV1beta1Deployment;
    }>;
    replaceNamespacedStatefulSet(name: string, namespace: string, body: V1beta1StatefulSet, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1StatefulSet;
    }>;
    replaceNamespacedStatefulSetScale(name: string, namespace: string, body: AppsV1beta1Scale, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: AppsV1beta1Scale;
    }>;
    replaceNamespacedStatefulSetStatus(name: string, namespace: string, body: V1beta1StatefulSet, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1StatefulSet;
    }>;
}
export declare enum Apps_v1beta2ApiApiKeys {
    BearerToken = 0
}
export declare class Apps_v1beta2Api {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: Apps_v1beta2ApiApiKeys, value: string): void;
    createNamespacedControllerRevision(namespace: string, body: V1beta2ControllerRevision, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta2ControllerRevision;
    }>;
    createNamespacedDaemonSet(namespace: string, body: V1beta2DaemonSet, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta2DaemonSet;
    }>;
    createNamespacedDeployment(namespace: string, body: V1beta2Deployment, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta2Deployment;
    }>;
    createNamespacedReplicaSet(namespace: string, body: V1beta2ReplicaSet, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta2ReplicaSet;
    }>;
    createNamespacedStatefulSet(namespace: string, body: V1beta2StatefulSet, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta2StatefulSet;
    }>;
    deleteCollectionNamespacedControllerRevision(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteCollectionNamespacedDaemonSet(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteCollectionNamespacedDeployment(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteCollectionNamespacedReplicaSet(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteCollectionNamespacedStatefulSet(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteNamespacedControllerRevision(name: string, namespace: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteNamespacedDaemonSet(name: string, namespace: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteNamespacedDeployment(name: string, namespace: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteNamespacedReplicaSet(name: string, namespace: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteNamespacedStatefulSet(name: string, namespace: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    getAPIResources(): Promise<{
        response: http.ClientResponse;
        body: V1APIResourceList;
    }>;
    listControllerRevisionForAllNamespaces(_continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta2ControllerRevisionList;
    }>;
    listDaemonSetForAllNamespaces(_continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta2DaemonSetList;
    }>;
    listDeploymentForAllNamespaces(_continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta2DeploymentList;
    }>;
    listNamespacedControllerRevision(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta2ControllerRevisionList;
    }>;
    listNamespacedDaemonSet(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta2DaemonSetList;
    }>;
    listNamespacedDeployment(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta2DeploymentList;
    }>;
    listNamespacedReplicaSet(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta2ReplicaSetList;
    }>;
    listNamespacedStatefulSet(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta2StatefulSetList;
    }>;
    listReplicaSetForAllNamespaces(_continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta2ReplicaSetList;
    }>;
    listStatefulSetForAllNamespaces(_continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta2StatefulSetList;
    }>;
    patchNamespacedControllerRevision(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta2ControllerRevision;
    }>;
    patchNamespacedDaemonSet(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta2DaemonSet;
    }>;
    patchNamespacedDaemonSetStatus(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta2DaemonSet;
    }>;
    patchNamespacedDeployment(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta2Deployment;
    }>;
    patchNamespacedDeploymentScale(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta2Scale;
    }>;
    patchNamespacedDeploymentStatus(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta2Deployment;
    }>;
    patchNamespacedReplicaSet(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta2ReplicaSet;
    }>;
    patchNamespacedReplicaSetScale(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta2Scale;
    }>;
    patchNamespacedReplicaSetStatus(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta2ReplicaSet;
    }>;
    patchNamespacedStatefulSet(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta2StatefulSet;
    }>;
    patchNamespacedStatefulSetScale(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta2Scale;
    }>;
    patchNamespacedStatefulSetStatus(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta2StatefulSet;
    }>;
    readNamespacedControllerRevision(name: string, namespace: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta2ControllerRevision;
    }>;
    readNamespacedDaemonSet(name: string, namespace: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta2DaemonSet;
    }>;
    readNamespacedDaemonSetStatus(name: string, namespace: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta2DaemonSet;
    }>;
    readNamespacedDeployment(name: string, namespace: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta2Deployment;
    }>;
    readNamespacedDeploymentScale(name: string, namespace: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta2Scale;
    }>;
    readNamespacedDeploymentStatus(name: string, namespace: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta2Deployment;
    }>;
    readNamespacedReplicaSet(name: string, namespace: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta2ReplicaSet;
    }>;
    readNamespacedReplicaSetScale(name: string, namespace: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta2Scale;
    }>;
    readNamespacedReplicaSetStatus(name: string, namespace: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta2ReplicaSet;
    }>;
    readNamespacedStatefulSet(name: string, namespace: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta2StatefulSet;
    }>;
    readNamespacedStatefulSetScale(name: string, namespace: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta2Scale;
    }>;
    readNamespacedStatefulSetStatus(name: string, namespace: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta2StatefulSet;
    }>;
    replaceNamespacedControllerRevision(name: string, namespace: string, body: V1beta2ControllerRevision, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta2ControllerRevision;
    }>;
    replaceNamespacedDaemonSet(name: string, namespace: string, body: V1beta2DaemonSet, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta2DaemonSet;
    }>;
    replaceNamespacedDaemonSetStatus(name: string, namespace: string, body: V1beta2DaemonSet, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta2DaemonSet;
    }>;
    replaceNamespacedDeployment(name: string, namespace: string, body: V1beta2Deployment, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta2Deployment;
    }>;
    replaceNamespacedDeploymentScale(name: string, namespace: string, body: V1beta2Scale, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta2Scale;
    }>;
    replaceNamespacedDeploymentStatus(name: string, namespace: string, body: V1beta2Deployment, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta2Deployment;
    }>;
    replaceNamespacedReplicaSet(name: string, namespace: string, body: V1beta2ReplicaSet, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta2ReplicaSet;
    }>;
    replaceNamespacedReplicaSetScale(name: string, namespace: string, body: V1beta2Scale, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta2Scale;
    }>;
    replaceNamespacedReplicaSetStatus(name: string, namespace: string, body: V1beta2ReplicaSet, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta2ReplicaSet;
    }>;
    replaceNamespacedStatefulSet(name: string, namespace: string, body: V1beta2StatefulSet, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta2StatefulSet;
    }>;
    replaceNamespacedStatefulSetScale(name: string, namespace: string, body: V1beta2Scale, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta2Scale;
    }>;
    replaceNamespacedStatefulSetStatus(name: string, namespace: string, body: V1beta2StatefulSet, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta2StatefulSet;
    }>;
}
export declare enum AuthenticationApiApiKeys {
    BearerToken = 0
}
export declare class AuthenticationApi {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: AuthenticationApiApiKeys, value: string): void;
    getAPIGroup(): Promise<{
        response: http.ClientResponse;
        body: V1APIGroup;
    }>;
}
export declare enum Authentication_v1ApiApiKeys {
    BearerToken = 0
}
export declare class Authentication_v1Api {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: Authentication_v1ApiApiKeys, value: string): void;
    createTokenReview(body: V1TokenReview, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1TokenReview;
    }>;
    getAPIResources(): Promise<{
        response: http.ClientResponse;
        body: V1APIResourceList;
    }>;
}
export declare enum Authentication_v1beta1ApiApiKeys {
    BearerToken = 0
}
export declare class Authentication_v1beta1Api {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: Authentication_v1beta1ApiApiKeys, value: string): void;
    createTokenReview(body: V1beta1TokenReview, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1TokenReview;
    }>;
    getAPIResources(): Promise<{
        response: http.ClientResponse;
        body: V1APIResourceList;
    }>;
}
export declare enum AuthorizationApiApiKeys {
    BearerToken = 0
}
export declare class AuthorizationApi {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: AuthorizationApiApiKeys, value: string): void;
    getAPIGroup(): Promise<{
        response: http.ClientResponse;
        body: V1APIGroup;
    }>;
}
export declare enum Authorization_v1ApiApiKeys {
    BearerToken = 0
}
export declare class Authorization_v1Api {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: Authorization_v1ApiApiKeys, value: string): void;
    createNamespacedLocalSubjectAccessReview(namespace: string, body: V1LocalSubjectAccessReview, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1LocalSubjectAccessReview;
    }>;
    createSelfSubjectAccessReview(body: V1SelfSubjectAccessReview, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1SelfSubjectAccessReview;
    }>;
    createSelfSubjectRulesReview(body: V1SelfSubjectRulesReview, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1SelfSubjectRulesReview;
    }>;
    createSubjectAccessReview(body: V1SubjectAccessReview, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1SubjectAccessReview;
    }>;
    getAPIResources(): Promise<{
        response: http.ClientResponse;
        body: V1APIResourceList;
    }>;
}
export declare enum Authorization_v1beta1ApiApiKeys {
    BearerToken = 0
}
export declare class Authorization_v1beta1Api {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: Authorization_v1beta1ApiApiKeys, value: string): void;
    createNamespacedLocalSubjectAccessReview(namespace: string, body: V1beta1LocalSubjectAccessReview, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1LocalSubjectAccessReview;
    }>;
    createSelfSubjectAccessReview(body: V1beta1SelfSubjectAccessReview, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1SelfSubjectAccessReview;
    }>;
    createSelfSubjectRulesReview(body: V1beta1SelfSubjectRulesReview, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1SelfSubjectRulesReview;
    }>;
    createSubjectAccessReview(body: V1beta1SubjectAccessReview, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1SubjectAccessReview;
    }>;
    getAPIResources(): Promise<{
        response: http.ClientResponse;
        body: V1APIResourceList;
    }>;
}
export declare enum AutoscalingApiApiKeys {
    BearerToken = 0
}
export declare class AutoscalingApi {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: AutoscalingApiApiKeys, value: string): void;
    getAPIGroup(): Promise<{
        response: http.ClientResponse;
        body: V1APIGroup;
    }>;
}
export declare enum Autoscaling_v1ApiApiKeys {
    BearerToken = 0
}
export declare class Autoscaling_v1Api {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: Autoscaling_v1ApiApiKeys, value: string): void;
    createNamespacedHorizontalPodAutoscaler(namespace: string, body: V1HorizontalPodAutoscaler, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1HorizontalPodAutoscaler;
    }>;
    deleteCollectionNamespacedHorizontalPodAutoscaler(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteNamespacedHorizontalPodAutoscaler(name: string, namespace: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    getAPIResources(): Promise<{
        response: http.ClientResponse;
        body: V1APIResourceList;
    }>;
    listHorizontalPodAutoscalerForAllNamespaces(_continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1HorizontalPodAutoscalerList;
    }>;
    listNamespacedHorizontalPodAutoscaler(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1HorizontalPodAutoscalerList;
    }>;
    patchNamespacedHorizontalPodAutoscaler(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1HorizontalPodAutoscaler;
    }>;
    patchNamespacedHorizontalPodAutoscalerStatus(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1HorizontalPodAutoscaler;
    }>;
    readNamespacedHorizontalPodAutoscaler(name: string, namespace: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1HorizontalPodAutoscaler;
    }>;
    readNamespacedHorizontalPodAutoscalerStatus(name: string, namespace: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1HorizontalPodAutoscaler;
    }>;
    replaceNamespacedHorizontalPodAutoscaler(name: string, namespace: string, body: V1HorizontalPodAutoscaler, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1HorizontalPodAutoscaler;
    }>;
    replaceNamespacedHorizontalPodAutoscalerStatus(name: string, namespace: string, body: V1HorizontalPodAutoscaler, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1HorizontalPodAutoscaler;
    }>;
}
export declare enum Autoscaling_v2beta1ApiApiKeys {
    BearerToken = 0
}
export declare class Autoscaling_v2beta1Api {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: Autoscaling_v2beta1ApiApiKeys, value: string): void;
    createNamespacedHorizontalPodAutoscaler(namespace: string, body: V2beta1HorizontalPodAutoscaler, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V2beta1HorizontalPodAutoscaler;
    }>;
    deleteCollectionNamespacedHorizontalPodAutoscaler(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteNamespacedHorizontalPodAutoscaler(name: string, namespace: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    getAPIResources(): Promise<{
        response: http.ClientResponse;
        body: V1APIResourceList;
    }>;
    listHorizontalPodAutoscalerForAllNamespaces(_continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V2beta1HorizontalPodAutoscalerList;
    }>;
    listNamespacedHorizontalPodAutoscaler(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V2beta1HorizontalPodAutoscalerList;
    }>;
    patchNamespacedHorizontalPodAutoscaler(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V2beta1HorizontalPodAutoscaler;
    }>;
    patchNamespacedHorizontalPodAutoscalerStatus(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V2beta1HorizontalPodAutoscaler;
    }>;
    readNamespacedHorizontalPodAutoscaler(name: string, namespace: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: V2beta1HorizontalPodAutoscaler;
    }>;
    readNamespacedHorizontalPodAutoscalerStatus(name: string, namespace: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V2beta1HorizontalPodAutoscaler;
    }>;
    replaceNamespacedHorizontalPodAutoscaler(name: string, namespace: string, body: V2beta1HorizontalPodAutoscaler, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V2beta1HorizontalPodAutoscaler;
    }>;
    replaceNamespacedHorizontalPodAutoscalerStatus(name: string, namespace: string, body: V2beta1HorizontalPodAutoscaler, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V2beta1HorizontalPodAutoscaler;
    }>;
}
export declare enum BatchApiApiKeys {
    BearerToken = 0
}
export declare class BatchApi {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: BatchApiApiKeys, value: string): void;
    getAPIGroup(): Promise<{
        response: http.ClientResponse;
        body: V1APIGroup;
    }>;
}
export declare enum Batch_v1ApiApiKeys {
    BearerToken = 0
}
export declare class Batch_v1Api {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: Batch_v1ApiApiKeys, value: string): void;
    createNamespacedJob(namespace: string, body: V1Job, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Job;
    }>;
    deleteCollectionNamespacedJob(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteNamespacedJob(name: string, namespace: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    getAPIResources(): Promise<{
        response: http.ClientResponse;
        body: V1APIResourceList;
    }>;
    listJobForAllNamespaces(_continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1JobList;
    }>;
    listNamespacedJob(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1JobList;
    }>;
    patchNamespacedJob(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Job;
    }>;
    patchNamespacedJobStatus(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Job;
    }>;
    readNamespacedJob(name: string, namespace: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Job;
    }>;
    readNamespacedJobStatus(name: string, namespace: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Job;
    }>;
    replaceNamespacedJob(name: string, namespace: string, body: V1Job, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Job;
    }>;
    replaceNamespacedJobStatus(name: string, namespace: string, body: V1Job, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Job;
    }>;
}
export declare enum Batch_v1beta1ApiApiKeys {
    BearerToken = 0
}
export declare class Batch_v1beta1Api {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: Batch_v1beta1ApiApiKeys, value: string): void;
    createNamespacedCronJob(namespace: string, body: V1beta1CronJob, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1CronJob;
    }>;
    deleteCollectionNamespacedCronJob(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteNamespacedCronJob(name: string, namespace: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    getAPIResources(): Promise<{
        response: http.ClientResponse;
        body: V1APIResourceList;
    }>;
    listCronJobForAllNamespaces(_continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta1CronJobList;
    }>;
    listNamespacedCronJob(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta1CronJobList;
    }>;
    patchNamespacedCronJob(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1CronJob;
    }>;
    patchNamespacedCronJobStatus(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1CronJob;
    }>;
    readNamespacedCronJob(name: string, namespace: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta1CronJob;
    }>;
    readNamespacedCronJobStatus(name: string, namespace: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1CronJob;
    }>;
    replaceNamespacedCronJob(name: string, namespace: string, body: V1beta1CronJob, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1CronJob;
    }>;
    replaceNamespacedCronJobStatus(name: string, namespace: string, body: V1beta1CronJob, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1CronJob;
    }>;
}
export declare enum Batch_v2alpha1ApiApiKeys {
    BearerToken = 0
}
export declare class Batch_v2alpha1Api {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: Batch_v2alpha1ApiApiKeys, value: string): void;
    createNamespacedCronJob(namespace: string, body: V2alpha1CronJob, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V2alpha1CronJob;
    }>;
    deleteCollectionNamespacedCronJob(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteNamespacedCronJob(name: string, namespace: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    getAPIResources(): Promise<{
        response: http.ClientResponse;
        body: V1APIResourceList;
    }>;
    listCronJobForAllNamespaces(_continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V2alpha1CronJobList;
    }>;
    listNamespacedCronJob(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V2alpha1CronJobList;
    }>;
    patchNamespacedCronJob(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V2alpha1CronJob;
    }>;
    patchNamespacedCronJobStatus(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V2alpha1CronJob;
    }>;
    readNamespacedCronJob(name: string, namespace: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: V2alpha1CronJob;
    }>;
    readNamespacedCronJobStatus(name: string, namespace: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V2alpha1CronJob;
    }>;
    replaceNamespacedCronJob(name: string, namespace: string, body: V2alpha1CronJob, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V2alpha1CronJob;
    }>;
    replaceNamespacedCronJobStatus(name: string, namespace: string, body: V2alpha1CronJob, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V2alpha1CronJob;
    }>;
}
export declare enum CertificatesApiApiKeys {
    BearerToken = 0
}
export declare class CertificatesApi {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: CertificatesApiApiKeys, value: string): void;
    getAPIGroup(): Promise<{
        response: http.ClientResponse;
        body: V1APIGroup;
    }>;
}
export declare enum Certificates_v1beta1ApiApiKeys {
    BearerToken = 0
}
export declare class Certificates_v1beta1Api {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: Certificates_v1beta1ApiApiKeys, value: string): void;
    createCertificateSigningRequest(body: V1beta1CertificateSigningRequest, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1CertificateSigningRequest;
    }>;
    deleteCertificateSigningRequest(name: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteCollectionCertificateSigningRequest(pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    getAPIResources(): Promise<{
        response: http.ClientResponse;
        body: V1APIResourceList;
    }>;
    listCertificateSigningRequest(pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta1CertificateSigningRequestList;
    }>;
    patchCertificateSigningRequest(name: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1CertificateSigningRequest;
    }>;
    patchCertificateSigningRequestStatus(name: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1CertificateSigningRequest;
    }>;
    readCertificateSigningRequest(name: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta1CertificateSigningRequest;
    }>;
    readCertificateSigningRequestStatus(name: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1CertificateSigningRequest;
    }>;
    replaceCertificateSigningRequest(name: string, body: V1beta1CertificateSigningRequest, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1CertificateSigningRequest;
    }>;
    replaceCertificateSigningRequestApproval(name: string, body: V1beta1CertificateSigningRequest, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1CertificateSigningRequest;
    }>;
    replaceCertificateSigningRequestStatus(name: string, body: V1beta1CertificateSigningRequest, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1CertificateSigningRequest;
    }>;
}
export declare enum CoreApiApiKeys {
    BearerToken = 0
}
export declare class CoreApi {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: CoreApiApiKeys, value: string): void;
    getAPIVersions(): Promise<{
        response: http.ClientResponse;
        body: V1APIVersions;
    }>;
}
export declare enum Core_v1ApiApiKeys {
    BearerToken = 0
}
export declare class Core_v1Api {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: Core_v1ApiApiKeys, value: string): void;
    connectDeleteNamespacedPodProxy(name: string, namespace: string, path?: string): Promise<{
        response: http.ClientResponse;
        body: string;
    }>;
    connectDeleteNamespacedPodProxyWithPath(name: string, namespace: string, path: string, path2?: string): Promise<{
        response: http.ClientResponse;
        body: string;
    }>;
    connectDeleteNamespacedServiceProxy(name: string, namespace: string, path?: string): Promise<{
        response: http.ClientResponse;
        body: string;
    }>;
    connectDeleteNamespacedServiceProxyWithPath(name: string, namespace: string, path: string, path2?: string): Promise<{
        response: http.ClientResponse;
        body: string;
    }>;
    connectDeleteNodeProxy(name: string, path?: string): Promise<{
        response: http.ClientResponse;
        body: string;
    }>;
    connectDeleteNodeProxyWithPath(name: string, path: string, path2?: string): Promise<{
        response: http.ClientResponse;
        body: string;
    }>;
    connectGetNamespacedPodAttach(name: string, namespace: string, container?: string, stderr?: boolean, stdin?: boolean, stdout?: boolean, tty?: boolean): Promise<{
        response: http.ClientResponse;
        body: string;
    }>;
    connectGetNamespacedPodExec(name: string, namespace: string, command?: string, container?: string, stderr?: boolean, stdin?: boolean, stdout?: boolean, tty?: boolean): Promise<{
        response: http.ClientResponse;
        body: string;
    }>;
    connectGetNamespacedPodPortforward(name: string, namespace: string, ports?: number): Promise<{
        response: http.ClientResponse;
        body: string;
    }>;
    connectGetNamespacedPodProxy(name: string, namespace: string, path?: string): Promise<{
        response: http.ClientResponse;
        body: string;
    }>;
    connectGetNamespacedPodProxyWithPath(name: string, namespace: string, path: string, path2?: string): Promise<{
        response: http.ClientResponse;
        body: string;
    }>;
    connectGetNamespacedServiceProxy(name: string, namespace: string, path?: string): Promise<{
        response: http.ClientResponse;
        body: string;
    }>;
    connectGetNamespacedServiceProxyWithPath(name: string, namespace: string, path: string, path2?: string): Promise<{
        response: http.ClientResponse;
        body: string;
    }>;
    connectGetNodeProxy(name: string, path?: string): Promise<{
        response: http.ClientResponse;
        body: string;
    }>;
    connectGetNodeProxyWithPath(name: string, path: string, path2?: string): Promise<{
        response: http.ClientResponse;
        body: string;
    }>;
    connectHeadNamespacedPodProxy(name: string, namespace: string, path?: string): Promise<{
        response: http.ClientResponse;
        body: string;
    }>;
    connectHeadNamespacedPodProxyWithPath(name: string, namespace: string, path: string, path2?: string): Promise<{
        response: http.ClientResponse;
        body: string;
    }>;
    connectHeadNamespacedServiceProxy(name: string, namespace: string, path?: string): Promise<{
        response: http.ClientResponse;
        body: string;
    }>;
    connectHeadNamespacedServiceProxyWithPath(name: string, namespace: string, path: string, path2?: string): Promise<{
        response: http.ClientResponse;
        body: string;
    }>;
    connectHeadNodeProxy(name: string, path?: string): Promise<{
        response: http.ClientResponse;
        body: string;
    }>;
    connectHeadNodeProxyWithPath(name: string, path: string, path2?: string): Promise<{
        response: http.ClientResponse;
        body: string;
    }>;
    connectOptionsNamespacedPodProxy(name: string, namespace: string, path?: string): Promise<{
        response: http.ClientResponse;
        body: string;
    }>;
    connectOptionsNamespacedPodProxyWithPath(name: string, namespace: string, path: string, path2?: string): Promise<{
        response: http.ClientResponse;
        body: string;
    }>;
    connectOptionsNamespacedServiceProxy(name: string, namespace: string, path?: string): Promise<{
        response: http.ClientResponse;
        body: string;
    }>;
    connectOptionsNamespacedServiceProxyWithPath(name: string, namespace: string, path: string, path2?: string): Promise<{
        response: http.ClientResponse;
        body: string;
    }>;
    connectOptionsNodeProxy(name: string, path?: string): Promise<{
        response: http.ClientResponse;
        body: string;
    }>;
    connectOptionsNodeProxyWithPath(name: string, path: string, path2?: string): Promise<{
        response: http.ClientResponse;
        body: string;
    }>;
    connectPatchNamespacedPodProxy(name: string, namespace: string, path?: string): Promise<{
        response: http.ClientResponse;
        body: string;
    }>;
    connectPatchNamespacedPodProxyWithPath(name: string, namespace: string, path: string, path2?: string): Promise<{
        response: http.ClientResponse;
        body: string;
    }>;
    connectPatchNamespacedServiceProxy(name: string, namespace: string, path?: string): Promise<{
        response: http.ClientResponse;
        body: string;
    }>;
    connectPatchNamespacedServiceProxyWithPath(name: string, namespace: string, path: string, path2?: string): Promise<{
        response: http.ClientResponse;
        body: string;
    }>;
    connectPatchNodeProxy(name: string, path?: string): Promise<{
        response: http.ClientResponse;
        body: string;
    }>;
    connectPatchNodeProxyWithPath(name: string, path: string, path2?: string): Promise<{
        response: http.ClientResponse;
        body: string;
    }>;
    connectPostNamespacedPodAttach(name: string, namespace: string, container?: string, stderr?: boolean, stdin?: boolean, stdout?: boolean, tty?: boolean): Promise<{
        response: http.ClientResponse;
        body: string;
    }>;
    connectPostNamespacedPodExec(name: string, namespace: string, command?: string, container?: string, stderr?: boolean, stdin?: boolean, stdout?: boolean, tty?: boolean): Promise<{
        response: http.ClientResponse;
        body: string;
    }>;
    connectPostNamespacedPodPortforward(name: string, namespace: string, ports?: number): Promise<{
        response: http.ClientResponse;
        body: string;
    }>;
    connectPostNamespacedPodProxy(name: string, namespace: string, path?: string): Promise<{
        response: http.ClientResponse;
        body: string;
    }>;
    connectPostNamespacedPodProxyWithPath(name: string, namespace: string, path: string, path2?: string): Promise<{
        response: http.ClientResponse;
        body: string;
    }>;
    connectPostNamespacedServiceProxy(name: string, namespace: string, path?: string): Promise<{
        response: http.ClientResponse;
        body: string;
    }>;
    connectPostNamespacedServiceProxyWithPath(name: string, namespace: string, path: string, path2?: string): Promise<{
        response: http.ClientResponse;
        body: string;
    }>;
    connectPostNodeProxy(name: string, path?: string): Promise<{
        response: http.ClientResponse;
        body: string;
    }>;
    connectPostNodeProxyWithPath(name: string, path: string, path2?: string): Promise<{
        response: http.ClientResponse;
        body: string;
    }>;
    connectPutNamespacedPodProxy(name: string, namespace: string, path?: string): Promise<{
        response: http.ClientResponse;
        body: string;
    }>;
    connectPutNamespacedPodProxyWithPath(name: string, namespace: string, path: string, path2?: string): Promise<{
        response: http.ClientResponse;
        body: string;
    }>;
    connectPutNamespacedServiceProxy(name: string, namespace: string, path?: string): Promise<{
        response: http.ClientResponse;
        body: string;
    }>;
    connectPutNamespacedServiceProxyWithPath(name: string, namespace: string, path: string, path2?: string): Promise<{
        response: http.ClientResponse;
        body: string;
    }>;
    connectPutNodeProxy(name: string, path?: string): Promise<{
        response: http.ClientResponse;
        body: string;
    }>;
    connectPutNodeProxyWithPath(name: string, path: string, path2?: string): Promise<{
        response: http.ClientResponse;
        body: string;
    }>;
    createNamespace(body: V1Namespace, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Namespace;
    }>;
    createNamespacedBinding(namespace: string, body: V1Binding, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Binding;
    }>;
    createNamespacedConfigMap(namespace: string, body: V1ConfigMap, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1ConfigMap;
    }>;
    createNamespacedEndpoints(namespace: string, body: V1Endpoints, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Endpoints;
    }>;
    createNamespacedEvent(namespace: string, body: V1Event, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Event;
    }>;
    createNamespacedLimitRange(namespace: string, body: V1LimitRange, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1LimitRange;
    }>;
    createNamespacedPersistentVolumeClaim(namespace: string, body: V1PersistentVolumeClaim, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1PersistentVolumeClaim;
    }>;
    createNamespacedPod(namespace: string, body: V1Pod, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Pod;
    }>;
    createNamespacedPodBinding(name: string, namespace: string, body: V1Binding, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Binding;
    }>;
    createNamespacedPodEviction(name: string, namespace: string, body: V1beta1Eviction, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1Eviction;
    }>;
    createNamespacedPodTemplate(namespace: string, body: V1PodTemplate, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1PodTemplate;
    }>;
    createNamespacedReplicationController(namespace: string, body: V1ReplicationController, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1ReplicationController;
    }>;
    createNamespacedResourceQuota(namespace: string, body: V1ResourceQuota, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1ResourceQuota;
    }>;
    createNamespacedSecret(namespace: string, body: V1Secret, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Secret;
    }>;
    createNamespacedService(namespace: string, body: V1Service, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Service;
    }>;
    createNamespacedServiceAccount(namespace: string, body: V1ServiceAccount, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1ServiceAccount;
    }>;
    createNode(body: V1Node, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Node;
    }>;
    createPersistentVolume(body: V1PersistentVolume, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1PersistentVolume;
    }>;
    deleteCollectionNamespacedConfigMap(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteCollectionNamespacedEndpoints(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteCollectionNamespacedEvent(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteCollectionNamespacedLimitRange(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteCollectionNamespacedPersistentVolumeClaim(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteCollectionNamespacedPod(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteCollectionNamespacedPodTemplate(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteCollectionNamespacedReplicationController(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteCollectionNamespacedResourceQuota(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteCollectionNamespacedSecret(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteCollectionNamespacedServiceAccount(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteCollectionNode(pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteCollectionPersistentVolume(pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteNamespace(name: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteNamespacedConfigMap(name: string, namespace: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteNamespacedEndpoints(name: string, namespace: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteNamespacedEvent(name: string, namespace: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteNamespacedLimitRange(name: string, namespace: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteNamespacedPersistentVolumeClaim(name: string, namespace: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteNamespacedPod(name: string, namespace: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteNamespacedPodTemplate(name: string, namespace: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteNamespacedReplicationController(name: string, namespace: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteNamespacedResourceQuota(name: string, namespace: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteNamespacedSecret(name: string, namespace: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteNamespacedService(name: string, namespace: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteNamespacedServiceAccount(name: string, namespace: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteNode(name: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deletePersistentVolume(name: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    getAPIResources(): Promise<{
        response: http.ClientResponse;
        body: V1APIResourceList;
    }>;
    listComponentStatus(_continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1ComponentStatusList;
    }>;
    listConfigMapForAllNamespaces(_continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1ConfigMapList;
    }>;
    listEndpointsForAllNamespaces(_continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1EndpointsList;
    }>;
    listEventForAllNamespaces(_continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1EventList;
    }>;
    listLimitRangeForAllNamespaces(_continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1LimitRangeList;
    }>;
    listNamespace(pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1NamespaceList;
    }>;
    listNamespacedConfigMap(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1ConfigMapList;
    }>;
    listNamespacedEndpoints(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1EndpointsList;
    }>;
    listNamespacedEvent(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1EventList;
    }>;
    listNamespacedLimitRange(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1LimitRangeList;
    }>;
    listNamespacedPersistentVolumeClaim(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1PersistentVolumeClaimList;
    }>;
    listNamespacedPod(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1PodList;
    }>;
    listNamespacedPodTemplate(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1PodTemplateList;
    }>;
    listNamespacedReplicationController(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1ReplicationControllerList;
    }>;
    listNamespacedResourceQuota(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1ResourceQuotaList;
    }>;
    listNamespacedSecret(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1SecretList;
    }>;
    listNamespacedService(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1ServiceList;
    }>;
    listNamespacedServiceAccount(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1ServiceAccountList;
    }>;
    listNode(pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1NodeList;
    }>;
    listPersistentVolume(pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1PersistentVolumeList;
    }>;
    listPersistentVolumeClaimForAllNamespaces(_continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1PersistentVolumeClaimList;
    }>;
    listPodForAllNamespaces(_continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1PodList;
    }>;
    listPodTemplateForAllNamespaces(_continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1PodTemplateList;
    }>;
    listReplicationControllerForAllNamespaces(_continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1ReplicationControllerList;
    }>;
    listResourceQuotaForAllNamespaces(_continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1ResourceQuotaList;
    }>;
    listSecretForAllNamespaces(_continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1SecretList;
    }>;
    listServiceAccountForAllNamespaces(_continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1ServiceAccountList;
    }>;
    listServiceForAllNamespaces(_continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1ServiceList;
    }>;
    patchNamespace(name: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Namespace;
    }>;
    patchNamespaceStatus(name: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Namespace;
    }>;
    patchNamespacedConfigMap(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1ConfigMap;
    }>;
    patchNamespacedEndpoints(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Endpoints;
    }>;
    patchNamespacedEvent(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Event;
    }>;
    patchNamespacedLimitRange(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1LimitRange;
    }>;
    patchNamespacedPersistentVolumeClaim(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1PersistentVolumeClaim;
    }>;
    patchNamespacedPersistentVolumeClaimStatus(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1PersistentVolumeClaim;
    }>;
    patchNamespacedPod(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Pod;
    }>;
    patchNamespacedPodStatus(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Pod;
    }>;
    patchNamespacedPodTemplate(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1PodTemplate;
    }>;
    patchNamespacedReplicationController(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1ReplicationController;
    }>;
    patchNamespacedReplicationControllerScale(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Scale;
    }>;
    patchNamespacedReplicationControllerStatus(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1ReplicationController;
    }>;
    patchNamespacedResourceQuota(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1ResourceQuota;
    }>;
    patchNamespacedResourceQuotaStatus(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1ResourceQuota;
    }>;
    patchNamespacedSecret(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Secret;
    }>;
    patchNamespacedService(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Service;
    }>;
    patchNamespacedServiceAccount(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1ServiceAccount;
    }>;
    patchNamespacedServiceStatus(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Service;
    }>;
    patchNode(name: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Node;
    }>;
    patchNodeStatus(name: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Node;
    }>;
    patchPersistentVolume(name: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1PersistentVolume;
    }>;
    patchPersistentVolumeStatus(name: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1PersistentVolume;
    }>;
    readComponentStatus(name: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1ComponentStatus;
    }>;
    readNamespace(name: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Namespace;
    }>;
    readNamespaceStatus(name: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Namespace;
    }>;
    readNamespacedConfigMap(name: string, namespace: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1ConfigMap;
    }>;
    readNamespacedEndpoints(name: string, namespace: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Endpoints;
    }>;
    readNamespacedEvent(name: string, namespace: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Event;
    }>;
    readNamespacedLimitRange(name: string, namespace: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1LimitRange;
    }>;
    readNamespacedPersistentVolumeClaim(name: string, namespace: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1PersistentVolumeClaim;
    }>;
    readNamespacedPersistentVolumeClaimStatus(name: string, namespace: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1PersistentVolumeClaim;
    }>;
    readNamespacedPod(name: string, namespace: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Pod;
    }>;
    readNamespacedPodLog(name: string, namespace: string, container?: string, follow?: boolean, limitBytes?: number, pretty?: string, previous?: boolean, sinceSeconds?: number, tailLines?: number, timestamps?: boolean): Promise<{
        response: http.ClientResponse;
        body: string;
    }>;
    readNamespacedPodStatus(name: string, namespace: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Pod;
    }>;
    readNamespacedPodTemplate(name: string, namespace: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1PodTemplate;
    }>;
    readNamespacedReplicationController(name: string, namespace: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1ReplicationController;
    }>;
    readNamespacedReplicationControllerScale(name: string, namespace: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Scale;
    }>;
    readNamespacedReplicationControllerStatus(name: string, namespace: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1ReplicationController;
    }>;
    readNamespacedResourceQuota(name: string, namespace: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1ResourceQuota;
    }>;
    readNamespacedResourceQuotaStatus(name: string, namespace: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1ResourceQuota;
    }>;
    readNamespacedSecret(name: string, namespace: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Secret;
    }>;
    readNamespacedService(name: string, namespace: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Service;
    }>;
    readNamespacedServiceAccount(name: string, namespace: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1ServiceAccount;
    }>;
    readNamespacedServiceStatus(name: string, namespace: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Service;
    }>;
    readNode(name: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Node;
    }>;
    readNodeStatus(name: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Node;
    }>;
    readPersistentVolume(name: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1PersistentVolume;
    }>;
    readPersistentVolumeStatus(name: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1PersistentVolume;
    }>;
    replaceNamespace(name: string, body: V1Namespace, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Namespace;
    }>;
    replaceNamespaceFinalize(name: string, body: V1Namespace, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Namespace;
    }>;
    replaceNamespaceStatus(name: string, body: V1Namespace, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Namespace;
    }>;
    replaceNamespacedConfigMap(name: string, namespace: string, body: V1ConfigMap, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1ConfigMap;
    }>;
    replaceNamespacedEndpoints(name: string, namespace: string, body: V1Endpoints, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Endpoints;
    }>;
    replaceNamespacedEvent(name: string, namespace: string, body: V1Event, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Event;
    }>;
    replaceNamespacedLimitRange(name: string, namespace: string, body: V1LimitRange, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1LimitRange;
    }>;
    replaceNamespacedPersistentVolumeClaim(name: string, namespace: string, body: V1PersistentVolumeClaim, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1PersistentVolumeClaim;
    }>;
    replaceNamespacedPersistentVolumeClaimStatus(name: string, namespace: string, body: V1PersistentVolumeClaim, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1PersistentVolumeClaim;
    }>;
    replaceNamespacedPod(name: string, namespace: string, body: V1Pod, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Pod;
    }>;
    replaceNamespacedPodStatus(name: string, namespace: string, body: V1Pod, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Pod;
    }>;
    replaceNamespacedPodTemplate(name: string, namespace: string, body: V1PodTemplate, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1PodTemplate;
    }>;
    replaceNamespacedReplicationController(name: string, namespace: string, body: V1ReplicationController, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1ReplicationController;
    }>;
    replaceNamespacedReplicationControllerScale(name: string, namespace: string, body: V1Scale, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Scale;
    }>;
    replaceNamespacedReplicationControllerStatus(name: string, namespace: string, body: V1ReplicationController, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1ReplicationController;
    }>;
    replaceNamespacedResourceQuota(name: string, namespace: string, body: V1ResourceQuota, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1ResourceQuota;
    }>;
    replaceNamespacedResourceQuotaStatus(name: string, namespace: string, body: V1ResourceQuota, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1ResourceQuota;
    }>;
    replaceNamespacedSecret(name: string, namespace: string, body: V1Secret, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Secret;
    }>;
    replaceNamespacedService(name: string, namespace: string, body: V1Service, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Service;
    }>;
    replaceNamespacedServiceAccount(name: string, namespace: string, body: V1ServiceAccount, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1ServiceAccount;
    }>;
    replaceNamespacedServiceStatus(name: string, namespace: string, body: V1Service, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Service;
    }>;
    replaceNode(name: string, body: V1Node, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Node;
    }>;
    replaceNodeStatus(name: string, body: V1Node, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Node;
    }>;
    replacePersistentVolume(name: string, body: V1PersistentVolume, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1PersistentVolume;
    }>;
    replacePersistentVolumeStatus(name: string, body: V1PersistentVolume, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1PersistentVolume;
    }>;
}
export declare enum Custom_objectsApiApiKeys {
    BearerToken = 0
}
export declare class Custom_objectsApi {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: Custom_objectsApiApiKeys, value: string): void;
    createClusterCustomObject(group: string, version: string, plural: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: any;
    }>;
    createNamespacedCustomObject(group: string, version: string, namespace: string, plural: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: any;
    }>;
    deleteClusterCustomObject(group: string, version: string, plural: string, name: string, body: V1DeleteOptions, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: any;
    }>;
    deleteNamespacedCustomObject(group: string, version: string, namespace: string, plural: string, name: string, body: V1DeleteOptions, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: any;
    }>;
    getClusterCustomObject(group: string, version: string, plural: string, name: string): Promise<{
        response: http.ClientResponse;
        body: any;
    }>;
    getNamespacedCustomObject(group: string, version: string, namespace: string, plural: string, name: string): Promise<{
        response: http.ClientResponse;
        body: any;
    }>;
    listClusterCustomObject(group: string, version: string, plural: string, pretty?: string, labelSelector?: string, resourceVersion?: string, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: any;
    }>;
    listNamespacedCustomObject(group: string, version: string, namespace: string, plural: string, pretty?: string, labelSelector?: string, resourceVersion?: string, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: any;
    }>;
    patchClusterCustomObject(group: string, version: string, plural: string, name: string, body: any): Promise<{
        response: http.ClientResponse;
        body: any;
    }>;
    patchNamespacedCustomObject(group: string, version: string, namespace: string, plural: string, name: string, body: any): Promise<{
        response: http.ClientResponse;
        body: any;
    }>;
    replaceClusterCustomObject(group: string, version: string, plural: string, name: string, body: any): Promise<{
        response: http.ClientResponse;
        body: any;
    }>;
    replaceNamespacedCustomObject(group: string, version: string, namespace: string, plural: string, name: string, body: any): Promise<{
        response: http.ClientResponse;
        body: any;
    }>;
}
export declare enum EventsApiApiKeys {
    BearerToken = 0
}
export declare class EventsApi {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: EventsApiApiKeys, value: string): void;
    getAPIGroup(): Promise<{
        response: http.ClientResponse;
        body: V1APIGroup;
    }>;
}
export declare enum Events_v1beta1ApiApiKeys {
    BearerToken = 0
}
export declare class Events_v1beta1Api {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: Events_v1beta1ApiApiKeys, value: string): void;
    createNamespacedEvent(namespace: string, body: V1beta1Event, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1Event;
    }>;
    deleteCollectionNamespacedEvent(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteNamespacedEvent(name: string, namespace: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    getAPIResources(): Promise<{
        response: http.ClientResponse;
        body: V1APIResourceList;
    }>;
    listEventForAllNamespaces(_continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta1EventList;
    }>;
    listNamespacedEvent(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta1EventList;
    }>;
    patchNamespacedEvent(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1Event;
    }>;
    readNamespacedEvent(name: string, namespace: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta1Event;
    }>;
    replaceNamespacedEvent(name: string, namespace: string, body: V1beta1Event, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1Event;
    }>;
}
export declare enum ExtensionsApiApiKeys {
    BearerToken = 0
}
export declare class ExtensionsApi {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: ExtensionsApiApiKeys, value: string): void;
    getAPIGroup(): Promise<{
        response: http.ClientResponse;
        body: V1APIGroup;
    }>;
}
export declare enum Extensions_v1beta1ApiApiKeys {
    BearerToken = 0
}
export declare class Extensions_v1beta1Api {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: Extensions_v1beta1ApiApiKeys, value: string): void;
    createNamespacedDaemonSet(namespace: string, body: V1beta1DaemonSet, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1DaemonSet;
    }>;
    createNamespacedDeployment(namespace: string, body: ExtensionsV1beta1Deployment, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: ExtensionsV1beta1Deployment;
    }>;
    createNamespacedDeploymentRollback(name: string, namespace: string, body: ExtensionsV1beta1DeploymentRollback, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: ExtensionsV1beta1DeploymentRollback;
    }>;
    createNamespacedIngress(namespace: string, body: V1beta1Ingress, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1Ingress;
    }>;
    createNamespacedNetworkPolicy(namespace: string, body: V1beta1NetworkPolicy, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1NetworkPolicy;
    }>;
    createNamespacedReplicaSet(namespace: string, body: V1beta1ReplicaSet, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1ReplicaSet;
    }>;
    createPodSecurityPolicy(body: ExtensionsV1beta1PodSecurityPolicy, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: ExtensionsV1beta1PodSecurityPolicy;
    }>;
    deleteCollectionNamespacedDaemonSet(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteCollectionNamespacedDeployment(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteCollectionNamespacedIngress(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteCollectionNamespacedNetworkPolicy(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteCollectionNamespacedReplicaSet(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteCollectionPodSecurityPolicy(pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteNamespacedDaemonSet(name: string, namespace: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteNamespacedDeployment(name: string, namespace: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteNamespacedIngress(name: string, namespace: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteNamespacedNetworkPolicy(name: string, namespace: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteNamespacedReplicaSet(name: string, namespace: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deletePodSecurityPolicy(name: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    getAPIResources(): Promise<{
        response: http.ClientResponse;
        body: V1APIResourceList;
    }>;
    listDaemonSetForAllNamespaces(_continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta1DaemonSetList;
    }>;
    listDeploymentForAllNamespaces(_continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: ExtensionsV1beta1DeploymentList;
    }>;
    listIngressForAllNamespaces(_continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta1IngressList;
    }>;
    listNamespacedDaemonSet(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta1DaemonSetList;
    }>;
    listNamespacedDeployment(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: ExtensionsV1beta1DeploymentList;
    }>;
    listNamespacedIngress(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta1IngressList;
    }>;
    listNamespacedNetworkPolicy(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta1NetworkPolicyList;
    }>;
    listNamespacedReplicaSet(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta1ReplicaSetList;
    }>;
    listNetworkPolicyForAllNamespaces(_continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta1NetworkPolicyList;
    }>;
    listPodSecurityPolicy(pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: ExtensionsV1beta1PodSecurityPolicyList;
    }>;
    listReplicaSetForAllNamespaces(_continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta1ReplicaSetList;
    }>;
    patchNamespacedDaemonSet(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1DaemonSet;
    }>;
    patchNamespacedDaemonSetStatus(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1DaemonSet;
    }>;
    patchNamespacedDeployment(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: ExtensionsV1beta1Deployment;
    }>;
    patchNamespacedDeploymentScale(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: ExtensionsV1beta1Scale;
    }>;
    patchNamespacedDeploymentStatus(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: ExtensionsV1beta1Deployment;
    }>;
    patchNamespacedIngress(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1Ingress;
    }>;
    patchNamespacedIngressStatus(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1Ingress;
    }>;
    patchNamespacedNetworkPolicy(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1NetworkPolicy;
    }>;
    patchNamespacedReplicaSet(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1ReplicaSet;
    }>;
    patchNamespacedReplicaSetScale(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: ExtensionsV1beta1Scale;
    }>;
    patchNamespacedReplicaSetStatus(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1ReplicaSet;
    }>;
    patchNamespacedReplicationControllerDummyScale(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: ExtensionsV1beta1Scale;
    }>;
    patchPodSecurityPolicy(name: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: ExtensionsV1beta1PodSecurityPolicy;
    }>;
    readNamespacedDaemonSet(name: string, namespace: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta1DaemonSet;
    }>;
    readNamespacedDaemonSetStatus(name: string, namespace: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1DaemonSet;
    }>;
    readNamespacedDeployment(name: string, namespace: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: ExtensionsV1beta1Deployment;
    }>;
    readNamespacedDeploymentScale(name: string, namespace: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: ExtensionsV1beta1Scale;
    }>;
    readNamespacedDeploymentStatus(name: string, namespace: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: ExtensionsV1beta1Deployment;
    }>;
    readNamespacedIngress(name: string, namespace: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta1Ingress;
    }>;
    readNamespacedIngressStatus(name: string, namespace: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1Ingress;
    }>;
    readNamespacedNetworkPolicy(name: string, namespace: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta1NetworkPolicy;
    }>;
    readNamespacedReplicaSet(name: string, namespace: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta1ReplicaSet;
    }>;
    readNamespacedReplicaSetScale(name: string, namespace: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: ExtensionsV1beta1Scale;
    }>;
    readNamespacedReplicaSetStatus(name: string, namespace: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1ReplicaSet;
    }>;
    readNamespacedReplicationControllerDummyScale(name: string, namespace: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: ExtensionsV1beta1Scale;
    }>;
    readPodSecurityPolicy(name: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: ExtensionsV1beta1PodSecurityPolicy;
    }>;
    replaceNamespacedDaemonSet(name: string, namespace: string, body: V1beta1DaemonSet, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1DaemonSet;
    }>;
    replaceNamespacedDaemonSetStatus(name: string, namespace: string, body: V1beta1DaemonSet, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1DaemonSet;
    }>;
    replaceNamespacedDeployment(name: string, namespace: string, body: ExtensionsV1beta1Deployment, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: ExtensionsV1beta1Deployment;
    }>;
    replaceNamespacedDeploymentScale(name: string, namespace: string, body: ExtensionsV1beta1Scale, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: ExtensionsV1beta1Scale;
    }>;
    replaceNamespacedDeploymentStatus(name: string, namespace: string, body: ExtensionsV1beta1Deployment, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: ExtensionsV1beta1Deployment;
    }>;
    replaceNamespacedIngress(name: string, namespace: string, body: V1beta1Ingress, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1Ingress;
    }>;
    replaceNamespacedIngressStatus(name: string, namespace: string, body: V1beta1Ingress, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1Ingress;
    }>;
    replaceNamespacedNetworkPolicy(name: string, namespace: string, body: V1beta1NetworkPolicy, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1NetworkPolicy;
    }>;
    replaceNamespacedReplicaSet(name: string, namespace: string, body: V1beta1ReplicaSet, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1ReplicaSet;
    }>;
    replaceNamespacedReplicaSetScale(name: string, namespace: string, body: ExtensionsV1beta1Scale, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: ExtensionsV1beta1Scale;
    }>;
    replaceNamespacedReplicaSetStatus(name: string, namespace: string, body: V1beta1ReplicaSet, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1ReplicaSet;
    }>;
    replaceNamespacedReplicationControllerDummyScale(name: string, namespace: string, body: ExtensionsV1beta1Scale, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: ExtensionsV1beta1Scale;
    }>;
    replacePodSecurityPolicy(name: string, body: ExtensionsV1beta1PodSecurityPolicy, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: ExtensionsV1beta1PodSecurityPolicy;
    }>;
}
export declare enum LogsApiApiKeys {
    BearerToken = 0
}
export declare class LogsApi {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: LogsApiApiKeys, value: string): void;
    logFileHandler(logpath: string): Promise<{
        response: http.ClientResponse;
        body?: any;
    }>;
    logFileListHandler(): Promise<{
        response: http.ClientResponse;
        body?: any;
    }>;
}
export declare enum NetworkingApiApiKeys {
    BearerToken = 0
}
export declare class NetworkingApi {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: NetworkingApiApiKeys, value: string): void;
    getAPIGroup(): Promise<{
        response: http.ClientResponse;
        body: V1APIGroup;
    }>;
}
export declare enum Networking_v1ApiApiKeys {
    BearerToken = 0
}
export declare class Networking_v1Api {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: Networking_v1ApiApiKeys, value: string): void;
    createNamespacedNetworkPolicy(namespace: string, body: V1NetworkPolicy, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1NetworkPolicy;
    }>;
    deleteCollectionNamespacedNetworkPolicy(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteNamespacedNetworkPolicy(name: string, namespace: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    getAPIResources(): Promise<{
        response: http.ClientResponse;
        body: V1APIResourceList;
    }>;
    listNamespacedNetworkPolicy(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1NetworkPolicyList;
    }>;
    listNetworkPolicyForAllNamespaces(_continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1NetworkPolicyList;
    }>;
    patchNamespacedNetworkPolicy(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1NetworkPolicy;
    }>;
    readNamespacedNetworkPolicy(name: string, namespace: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1NetworkPolicy;
    }>;
    replaceNamespacedNetworkPolicy(name: string, namespace: string, body: V1NetworkPolicy, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1NetworkPolicy;
    }>;
}
export declare enum PolicyApiApiKeys {
    BearerToken = 0
}
export declare class PolicyApi {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: PolicyApiApiKeys, value: string): void;
    getAPIGroup(): Promise<{
        response: http.ClientResponse;
        body: V1APIGroup;
    }>;
}
export declare enum Policy_v1beta1ApiApiKeys {
    BearerToken = 0
}
export declare class Policy_v1beta1Api {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: Policy_v1beta1ApiApiKeys, value: string): void;
    createNamespacedPodDisruptionBudget(namespace: string, body: V1beta1PodDisruptionBudget, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1PodDisruptionBudget;
    }>;
    createPodSecurityPolicy(body: PolicyV1beta1PodSecurityPolicy, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: PolicyV1beta1PodSecurityPolicy;
    }>;
    deleteCollectionNamespacedPodDisruptionBudget(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteCollectionPodSecurityPolicy(pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteNamespacedPodDisruptionBudget(name: string, namespace: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deletePodSecurityPolicy(name: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    getAPIResources(): Promise<{
        response: http.ClientResponse;
        body: V1APIResourceList;
    }>;
    listNamespacedPodDisruptionBudget(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta1PodDisruptionBudgetList;
    }>;
    listPodDisruptionBudgetForAllNamespaces(_continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta1PodDisruptionBudgetList;
    }>;
    listPodSecurityPolicy(pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: PolicyV1beta1PodSecurityPolicyList;
    }>;
    patchNamespacedPodDisruptionBudget(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1PodDisruptionBudget;
    }>;
    patchNamespacedPodDisruptionBudgetStatus(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1PodDisruptionBudget;
    }>;
    patchPodSecurityPolicy(name: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: PolicyV1beta1PodSecurityPolicy;
    }>;
    readNamespacedPodDisruptionBudget(name: string, namespace: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta1PodDisruptionBudget;
    }>;
    readNamespacedPodDisruptionBudgetStatus(name: string, namespace: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1PodDisruptionBudget;
    }>;
    readPodSecurityPolicy(name: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: PolicyV1beta1PodSecurityPolicy;
    }>;
    replaceNamespacedPodDisruptionBudget(name: string, namespace: string, body: V1beta1PodDisruptionBudget, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1PodDisruptionBudget;
    }>;
    replaceNamespacedPodDisruptionBudgetStatus(name: string, namespace: string, body: V1beta1PodDisruptionBudget, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1PodDisruptionBudget;
    }>;
    replacePodSecurityPolicy(name: string, body: PolicyV1beta1PodSecurityPolicy, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: PolicyV1beta1PodSecurityPolicy;
    }>;
}
export declare enum RbacAuthorizationApiApiKeys {
    BearerToken = 0
}
export declare class RbacAuthorizationApi {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: RbacAuthorizationApiApiKeys, value: string): void;
    getAPIGroup(): Promise<{
        response: http.ClientResponse;
        body: V1APIGroup;
    }>;
}
export declare enum RbacAuthorization_v1ApiApiKeys {
    BearerToken = 0
}
export declare class RbacAuthorization_v1Api {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: RbacAuthorization_v1ApiApiKeys, value: string): void;
    createClusterRole(body: V1ClusterRole, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1ClusterRole;
    }>;
    createClusterRoleBinding(body: V1ClusterRoleBinding, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1ClusterRoleBinding;
    }>;
    createNamespacedRole(namespace: string, body: V1Role, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Role;
    }>;
    createNamespacedRoleBinding(namespace: string, body: V1RoleBinding, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1RoleBinding;
    }>;
    deleteClusterRole(name: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteClusterRoleBinding(name: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteCollectionClusterRole(pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteCollectionClusterRoleBinding(pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteCollectionNamespacedRole(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteCollectionNamespacedRoleBinding(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteNamespacedRole(name: string, namespace: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteNamespacedRoleBinding(name: string, namespace: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    getAPIResources(): Promise<{
        response: http.ClientResponse;
        body: V1APIResourceList;
    }>;
    listClusterRole(pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1ClusterRoleList;
    }>;
    listClusterRoleBinding(pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1ClusterRoleBindingList;
    }>;
    listNamespacedRole(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1RoleList;
    }>;
    listNamespacedRoleBinding(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1RoleBindingList;
    }>;
    listRoleBindingForAllNamespaces(_continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1RoleBindingList;
    }>;
    listRoleForAllNamespaces(_continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1RoleList;
    }>;
    patchClusterRole(name: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1ClusterRole;
    }>;
    patchClusterRoleBinding(name: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1ClusterRoleBinding;
    }>;
    patchNamespacedRole(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Role;
    }>;
    patchNamespacedRoleBinding(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1RoleBinding;
    }>;
    readClusterRole(name: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1ClusterRole;
    }>;
    readClusterRoleBinding(name: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1ClusterRoleBinding;
    }>;
    readNamespacedRole(name: string, namespace: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Role;
    }>;
    readNamespacedRoleBinding(name: string, namespace: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1RoleBinding;
    }>;
    replaceClusterRole(name: string, body: V1ClusterRole, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1ClusterRole;
    }>;
    replaceClusterRoleBinding(name: string, body: V1ClusterRoleBinding, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1ClusterRoleBinding;
    }>;
    replaceNamespacedRole(name: string, namespace: string, body: V1Role, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1Role;
    }>;
    replaceNamespacedRoleBinding(name: string, namespace: string, body: V1RoleBinding, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1RoleBinding;
    }>;
}
export declare enum RbacAuthorization_v1alpha1ApiApiKeys {
    BearerToken = 0
}
export declare class RbacAuthorization_v1alpha1Api {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: RbacAuthorization_v1alpha1ApiApiKeys, value: string): void;
    createClusterRole(body: V1alpha1ClusterRole, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1alpha1ClusterRole;
    }>;
    createClusterRoleBinding(body: V1alpha1ClusterRoleBinding, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1alpha1ClusterRoleBinding;
    }>;
    createNamespacedRole(namespace: string, body: V1alpha1Role, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1alpha1Role;
    }>;
    createNamespacedRoleBinding(namespace: string, body: V1alpha1RoleBinding, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1alpha1RoleBinding;
    }>;
    deleteClusterRole(name: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteClusterRoleBinding(name: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteCollectionClusterRole(pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteCollectionClusterRoleBinding(pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteCollectionNamespacedRole(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteCollectionNamespacedRoleBinding(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteNamespacedRole(name: string, namespace: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteNamespacedRoleBinding(name: string, namespace: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    getAPIResources(): Promise<{
        response: http.ClientResponse;
        body: V1APIResourceList;
    }>;
    listClusterRole(pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1alpha1ClusterRoleList;
    }>;
    listClusterRoleBinding(pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1alpha1ClusterRoleBindingList;
    }>;
    listNamespacedRole(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1alpha1RoleList;
    }>;
    listNamespacedRoleBinding(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1alpha1RoleBindingList;
    }>;
    listRoleBindingForAllNamespaces(_continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1alpha1RoleBindingList;
    }>;
    listRoleForAllNamespaces(_continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1alpha1RoleList;
    }>;
    patchClusterRole(name: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1alpha1ClusterRole;
    }>;
    patchClusterRoleBinding(name: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1alpha1ClusterRoleBinding;
    }>;
    patchNamespacedRole(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1alpha1Role;
    }>;
    patchNamespacedRoleBinding(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1alpha1RoleBinding;
    }>;
    readClusterRole(name: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1alpha1ClusterRole;
    }>;
    readClusterRoleBinding(name: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1alpha1ClusterRoleBinding;
    }>;
    readNamespacedRole(name: string, namespace: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1alpha1Role;
    }>;
    readNamespacedRoleBinding(name: string, namespace: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1alpha1RoleBinding;
    }>;
    replaceClusterRole(name: string, body: V1alpha1ClusterRole, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1alpha1ClusterRole;
    }>;
    replaceClusterRoleBinding(name: string, body: V1alpha1ClusterRoleBinding, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1alpha1ClusterRoleBinding;
    }>;
    replaceNamespacedRole(name: string, namespace: string, body: V1alpha1Role, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1alpha1Role;
    }>;
    replaceNamespacedRoleBinding(name: string, namespace: string, body: V1alpha1RoleBinding, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1alpha1RoleBinding;
    }>;
}
export declare enum RbacAuthorization_v1beta1ApiApiKeys {
    BearerToken = 0
}
export declare class RbacAuthorization_v1beta1Api {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: RbacAuthorization_v1beta1ApiApiKeys, value: string): void;
    createClusterRole(body: V1beta1ClusterRole, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1ClusterRole;
    }>;
    createClusterRoleBinding(body: V1beta1ClusterRoleBinding, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1ClusterRoleBinding;
    }>;
    createNamespacedRole(namespace: string, body: V1beta1Role, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1Role;
    }>;
    createNamespacedRoleBinding(namespace: string, body: V1beta1RoleBinding, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1RoleBinding;
    }>;
    deleteClusterRole(name: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteClusterRoleBinding(name: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteCollectionClusterRole(pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteCollectionClusterRoleBinding(pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteCollectionNamespacedRole(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteCollectionNamespacedRoleBinding(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteNamespacedRole(name: string, namespace: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteNamespacedRoleBinding(name: string, namespace: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    getAPIResources(): Promise<{
        response: http.ClientResponse;
        body: V1APIResourceList;
    }>;
    listClusterRole(pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta1ClusterRoleList;
    }>;
    listClusterRoleBinding(pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta1ClusterRoleBindingList;
    }>;
    listNamespacedRole(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta1RoleList;
    }>;
    listNamespacedRoleBinding(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta1RoleBindingList;
    }>;
    listRoleBindingForAllNamespaces(_continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta1RoleBindingList;
    }>;
    listRoleForAllNamespaces(_continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta1RoleList;
    }>;
    patchClusterRole(name: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1ClusterRole;
    }>;
    patchClusterRoleBinding(name: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1ClusterRoleBinding;
    }>;
    patchNamespacedRole(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1Role;
    }>;
    patchNamespacedRoleBinding(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1RoleBinding;
    }>;
    readClusterRole(name: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1ClusterRole;
    }>;
    readClusterRoleBinding(name: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1ClusterRoleBinding;
    }>;
    readNamespacedRole(name: string, namespace: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1Role;
    }>;
    readNamespacedRoleBinding(name: string, namespace: string, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1RoleBinding;
    }>;
    replaceClusterRole(name: string, body: V1beta1ClusterRole, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1ClusterRole;
    }>;
    replaceClusterRoleBinding(name: string, body: V1beta1ClusterRoleBinding, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1ClusterRoleBinding;
    }>;
    replaceNamespacedRole(name: string, namespace: string, body: V1beta1Role, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1Role;
    }>;
    replaceNamespacedRoleBinding(name: string, namespace: string, body: V1beta1RoleBinding, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1RoleBinding;
    }>;
}
export declare enum SchedulingApiApiKeys {
    BearerToken = 0
}
export declare class SchedulingApi {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: SchedulingApiApiKeys, value: string): void;
    getAPIGroup(): Promise<{
        response: http.ClientResponse;
        body: V1APIGroup;
    }>;
}
export declare enum Scheduling_v1alpha1ApiApiKeys {
    BearerToken = 0
}
export declare class Scheduling_v1alpha1Api {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: Scheduling_v1alpha1ApiApiKeys, value: string): void;
    createPriorityClass(body: V1alpha1PriorityClass, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1alpha1PriorityClass;
    }>;
    deleteCollectionPriorityClass(pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deletePriorityClass(name: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    getAPIResources(): Promise<{
        response: http.ClientResponse;
        body: V1APIResourceList;
    }>;
    listPriorityClass(pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1alpha1PriorityClassList;
    }>;
    patchPriorityClass(name: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1alpha1PriorityClass;
    }>;
    readPriorityClass(name: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1alpha1PriorityClass;
    }>;
    replacePriorityClass(name: string, body: V1alpha1PriorityClass, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1alpha1PriorityClass;
    }>;
}
export declare enum Scheduling_v1beta1ApiApiKeys {
    BearerToken = 0
}
export declare class Scheduling_v1beta1Api {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: Scheduling_v1beta1ApiApiKeys, value: string): void;
    createPriorityClass(body: V1beta1PriorityClass, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1PriorityClass;
    }>;
    deleteCollectionPriorityClass(pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deletePriorityClass(name: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    getAPIResources(): Promise<{
        response: http.ClientResponse;
        body: V1APIResourceList;
    }>;
    listPriorityClass(pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta1PriorityClassList;
    }>;
    patchPriorityClass(name: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1PriorityClass;
    }>;
    readPriorityClass(name: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta1PriorityClass;
    }>;
    replacePriorityClass(name: string, body: V1beta1PriorityClass, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1PriorityClass;
    }>;
}
export declare enum SettingsApiApiKeys {
    BearerToken = 0
}
export declare class SettingsApi {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: SettingsApiApiKeys, value: string): void;
    getAPIGroup(): Promise<{
        response: http.ClientResponse;
        body: V1APIGroup;
    }>;
}
export declare enum Settings_v1alpha1ApiApiKeys {
    BearerToken = 0
}
export declare class Settings_v1alpha1Api {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: Settings_v1alpha1ApiApiKeys, value: string): void;
    createNamespacedPodPreset(namespace: string, body: V1alpha1PodPreset, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1alpha1PodPreset;
    }>;
    deleteCollectionNamespacedPodPreset(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteNamespacedPodPreset(name: string, namespace: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    getAPIResources(): Promise<{
        response: http.ClientResponse;
        body: V1APIResourceList;
    }>;
    listNamespacedPodPreset(namespace: string, pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1alpha1PodPresetList;
    }>;
    listPodPresetForAllNamespaces(_continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, pretty?: string, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1alpha1PodPresetList;
    }>;
    patchNamespacedPodPreset(name: string, namespace: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1alpha1PodPreset;
    }>;
    readNamespacedPodPreset(name: string, namespace: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1alpha1PodPreset;
    }>;
    replaceNamespacedPodPreset(name: string, namespace: string, body: V1alpha1PodPreset, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1alpha1PodPreset;
    }>;
}
export declare enum StorageApiApiKeys {
    BearerToken = 0
}
export declare class StorageApi {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: StorageApiApiKeys, value: string): void;
    getAPIGroup(): Promise<{
        response: http.ClientResponse;
        body: V1APIGroup;
    }>;
}
export declare enum Storage_v1ApiApiKeys {
    BearerToken = 0
}
export declare class Storage_v1Api {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: Storage_v1ApiApiKeys, value: string): void;
    createStorageClass(body: V1StorageClass, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1StorageClass;
    }>;
    deleteCollectionStorageClass(pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteStorageClass(name: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    getAPIResources(): Promise<{
        response: http.ClientResponse;
        body: V1APIResourceList;
    }>;
    listStorageClass(pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1StorageClassList;
    }>;
    patchStorageClass(name: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1StorageClass;
    }>;
    readStorageClass(name: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1StorageClass;
    }>;
    replaceStorageClass(name: string, body: V1StorageClass, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1StorageClass;
    }>;
}
export declare enum Storage_v1alpha1ApiApiKeys {
    BearerToken = 0
}
export declare class Storage_v1alpha1Api {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: Storage_v1alpha1ApiApiKeys, value: string): void;
    createVolumeAttachment(body: V1alpha1VolumeAttachment, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1alpha1VolumeAttachment;
    }>;
    deleteCollectionVolumeAttachment(pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteVolumeAttachment(name: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    getAPIResources(): Promise<{
        response: http.ClientResponse;
        body: V1APIResourceList;
    }>;
    listVolumeAttachment(pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1alpha1VolumeAttachmentList;
    }>;
    patchVolumeAttachment(name: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1alpha1VolumeAttachment;
    }>;
    readVolumeAttachment(name: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1alpha1VolumeAttachment;
    }>;
    replaceVolumeAttachment(name: string, body: V1alpha1VolumeAttachment, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1alpha1VolumeAttachment;
    }>;
}
export declare enum Storage_v1beta1ApiApiKeys {
    BearerToken = 0
}
export declare class Storage_v1beta1Api {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: Storage_v1beta1ApiApiKeys, value: string): void;
    createStorageClass(body: V1beta1StorageClass, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1StorageClass;
    }>;
    createVolumeAttachment(body: V1beta1VolumeAttachment, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1VolumeAttachment;
    }>;
    deleteCollectionStorageClass(pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteCollectionVolumeAttachment(pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteStorageClass(name: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    deleteVolumeAttachment(name: string, body: V1DeleteOptions, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string): Promise<{
        response: http.ClientResponse;
        body: V1Status;
    }>;
    getAPIResources(): Promise<{
        response: http.ClientResponse;
        body: V1APIResourceList;
    }>;
    listStorageClass(pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta1StorageClassList;
    }>;
    listVolumeAttachment(pretty?: string, _continue?: string, fieldSelector?: string, includeUninitialized?: boolean, labelSelector?: string, limit?: number, resourceVersion?: string, timeoutSeconds?: number, watch?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta1VolumeAttachmentList;
    }>;
    patchStorageClass(name: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1StorageClass;
    }>;
    patchVolumeAttachment(name: string, body: any, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1VolumeAttachment;
    }>;
    readStorageClass(name: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta1StorageClass;
    }>;
    readVolumeAttachment(name: string, pretty?: string, exact?: boolean, _export?: boolean): Promise<{
        response: http.ClientResponse;
        body: V1beta1VolumeAttachment;
    }>;
    replaceStorageClass(name: string, body: V1beta1StorageClass, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1StorageClass;
    }>;
    replaceVolumeAttachment(name: string, body: V1beta1VolumeAttachment, pretty?: string): Promise<{
        response: http.ClientResponse;
        body: V1beta1VolumeAttachment;
    }>;
}
export declare enum VersionApiApiKeys {
    BearerToken = 0
}
export declare class VersionApi {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'BearerToken': ApiKeyAuth;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: VersionApiApiKeys, value: string): void;
    getCode(): Promise<{
        response: http.ClientResponse;
        body: VersionInfo;
    }>;
}
