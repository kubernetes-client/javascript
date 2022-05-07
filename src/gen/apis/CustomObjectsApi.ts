// TODO: better import syntax?
import { BaseAPIRequestFactory, RequiredError } from './baseapi';
import {Configuration} from '../configuration';
import { RequestContext, HttpMethod, ResponseContext, HttpFile} from '../http/http';
import * as FormData from "form-data";
import { URLSearchParams } from 'url';
import {ObjectSerializer} from '../models/ObjectSerializer';
import {ApiException} from './exception';
import {canConsumeForm, isCodeInRange} from '../util';


import { V1DeleteOptions } from '../models/V1DeleteOptions';

/**
 * no description
 */
export class CustomObjectsApiRequestFactory extends BaseAPIRequestFactory {

    /**
     * Creates a cluster scoped Custom object
     * @param group The custom resource&#39;s group name
     * @param version The custom resource&#39;s version
     * @param plural The custom resource&#39;s plural name. For TPRs this would be lowercase plural kind.
     * @param body The JSON schema of the Resource to create.
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
     */
    public async createClusterCustomObject(group: string, version: string, plural: string, body: any, pretty?: string, dryRun?: string, fieldManager?: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'group' is not null or undefined
        if (group === null || group === undefined) {
            throw new RequiredError("CustomObjectsApi", "createClusterCustomObject", "group");
        }


        // verify required parameter 'version' is not null or undefined
        if (version === null || version === undefined) {
            throw new RequiredError("CustomObjectsApi", "createClusterCustomObject", "version");
        }


        // verify required parameter 'plural' is not null or undefined
        if (plural === null || plural === undefined) {
            throw new RequiredError("CustomObjectsApi", "createClusterCustomObject", "plural");
        }


        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new RequiredError("CustomObjectsApi", "createClusterCustomObject", "body");
        }





        // Path Params
        const localVarPath = '/apis/{group}/{version}/{plural}'
            .replace('{' + 'group' + '}', encodeURIComponent(String(group)))
            .replace('{' + 'version' + '}', encodeURIComponent(String(version)))
            .replace('{' + 'plural' + '}', encodeURIComponent(String(plural)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (pretty !== undefined) {
            requestContext.setQueryParam("pretty", ObjectSerializer.serialize(pretty, "string", ""));
        }

        // Query Params
        if (dryRun !== undefined) {
            requestContext.setQueryParam("dryRun", ObjectSerializer.serialize(dryRun, "string", ""));
        }

        // Query Params
        if (fieldManager !== undefined) {
            requestContext.setQueryParam("fieldManager", ObjectSerializer.serialize(fieldManager, "string", ""));
        }


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(body, "any", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        let authMethod = null;
        // Apply auth methods
        authMethod = _config.authMethods["BearerToken"]
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Creates a namespace scoped Custom object
     * @param group The custom resource&#39;s group name
     * @param version The custom resource&#39;s version
     * @param namespace The custom resource&#39;s namespace
     * @param plural The custom resource&#39;s plural name. For TPRs this would be lowercase plural kind.
     * @param body The JSON schema of the Resource to create.
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     */
    public async createNamespacedCustomObject(group: string, version: string, namespace: string, plural: string, body: any, pretty?: string, dryRun?: string, fieldManager?: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'group' is not null or undefined
        if (group === null || group === undefined) {
            throw new RequiredError("CustomObjectsApi", "createNamespacedCustomObject", "group");
        }


        // verify required parameter 'version' is not null or undefined
        if (version === null || version === undefined) {
            throw new RequiredError("CustomObjectsApi", "createNamespacedCustomObject", "version");
        }


        // verify required parameter 'namespace' is not null or undefined
        if (namespace === null || namespace === undefined) {
            throw new RequiredError("CustomObjectsApi", "createNamespacedCustomObject", "namespace");
        }


        // verify required parameter 'plural' is not null or undefined
        if (plural === null || plural === undefined) {
            throw new RequiredError("CustomObjectsApi", "createNamespacedCustomObject", "plural");
        }


        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new RequiredError("CustomObjectsApi", "createNamespacedCustomObject", "body");
        }





        // Path Params
        const localVarPath = '/apis/{group}/{version}/namespaces/{namespace}/{plural}'
            .replace('{' + 'group' + '}', encodeURIComponent(String(group)))
            .replace('{' + 'version' + '}', encodeURIComponent(String(version)))
            .replace('{' + 'namespace' + '}', encodeURIComponent(String(namespace)))
            .replace('{' + 'plural' + '}', encodeURIComponent(String(plural)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (pretty !== undefined) {
            requestContext.setQueryParam("pretty", ObjectSerializer.serialize(pretty, "string", ""));
        }

        // Query Params
        if (dryRun !== undefined) {
            requestContext.setQueryParam("dryRun", ObjectSerializer.serialize(dryRun, "string", ""));
        }

        // Query Params
        if (fieldManager !== undefined) {
            requestContext.setQueryParam("fieldManager", ObjectSerializer.serialize(fieldManager, "string", ""));
        }


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(body, "any", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        let authMethod = null;
        // Apply auth methods
        authMethod = _config.authMethods["BearerToken"]
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Deletes the specified cluster scoped custom object
     * @param group the custom resource&#39;s group
     * @param version the custom resource&#39;s version
     * @param plural the custom object&#39;s plural name. For TPRs this would be lowercase plural kind.
     * @param name the custom object&#39;s name
     * @param gracePeriodSeconds The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.
     * @param orphanDependents Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both.
     * @param propagationPolicy Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy.
     * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @param body 
     */
    public async deleteClusterCustomObject(group: string, version: string, plural: string, name: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string, dryRun?: string, body?: V1DeleteOptions, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'group' is not null or undefined
        if (group === null || group === undefined) {
            throw new RequiredError("CustomObjectsApi", "deleteClusterCustomObject", "group");
        }


        // verify required parameter 'version' is not null or undefined
        if (version === null || version === undefined) {
            throw new RequiredError("CustomObjectsApi", "deleteClusterCustomObject", "version");
        }


        // verify required parameter 'plural' is not null or undefined
        if (plural === null || plural === undefined) {
            throw new RequiredError("CustomObjectsApi", "deleteClusterCustomObject", "plural");
        }


        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("CustomObjectsApi", "deleteClusterCustomObject", "name");
        }







        // Path Params
        const localVarPath = '/apis/{group}/{version}/{plural}/{name}'
            .replace('{' + 'group' + '}', encodeURIComponent(String(group)))
            .replace('{' + 'version' + '}', encodeURIComponent(String(version)))
            .replace('{' + 'plural' + '}', encodeURIComponent(String(plural)))
            .replace('{' + 'name' + '}', encodeURIComponent(String(name)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.DELETE);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (gracePeriodSeconds !== undefined) {
            requestContext.setQueryParam("gracePeriodSeconds", ObjectSerializer.serialize(gracePeriodSeconds, "number", ""));
        }

        // Query Params
        if (orphanDependents !== undefined) {
            requestContext.setQueryParam("orphanDependents", ObjectSerializer.serialize(orphanDependents, "boolean", ""));
        }

        // Query Params
        if (propagationPolicy !== undefined) {
            requestContext.setQueryParam("propagationPolicy", ObjectSerializer.serialize(propagationPolicy, "string", ""));
        }

        // Query Params
        if (dryRun !== undefined) {
            requestContext.setQueryParam("dryRun", ObjectSerializer.serialize(dryRun, "string", ""));
        }


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(body, "V1DeleteOptions", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        let authMethod = null;
        // Apply auth methods
        authMethod = _config.authMethods["BearerToken"]
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Delete collection of cluster scoped custom objects
     * @param group The custom resource&#39;s group name
     * @param version The custom resource&#39;s version
     * @param plural The custom resource&#39;s plural name. For TPRs this would be lowercase plural kind.
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     * @param gracePeriodSeconds The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.
     * @param orphanDependents Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both.
     * @param propagationPolicy Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy.
     * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @param body 
     */
    public async deleteCollectionClusterCustomObject(group: string, version: string, plural: string, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string, dryRun?: string, body?: V1DeleteOptions, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'group' is not null or undefined
        if (group === null || group === undefined) {
            throw new RequiredError("CustomObjectsApi", "deleteCollectionClusterCustomObject", "group");
        }


        // verify required parameter 'version' is not null or undefined
        if (version === null || version === undefined) {
            throw new RequiredError("CustomObjectsApi", "deleteCollectionClusterCustomObject", "version");
        }


        // verify required parameter 'plural' is not null or undefined
        if (plural === null || plural === undefined) {
            throw new RequiredError("CustomObjectsApi", "deleteCollectionClusterCustomObject", "plural");
        }








        // Path Params
        const localVarPath = '/apis/{group}/{version}/{plural}'
            .replace('{' + 'group' + '}', encodeURIComponent(String(group)))
            .replace('{' + 'version' + '}', encodeURIComponent(String(version)))
            .replace('{' + 'plural' + '}', encodeURIComponent(String(plural)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.DELETE);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (pretty !== undefined) {
            requestContext.setQueryParam("pretty", ObjectSerializer.serialize(pretty, "string", ""));
        }

        // Query Params
        if (gracePeriodSeconds !== undefined) {
            requestContext.setQueryParam("gracePeriodSeconds", ObjectSerializer.serialize(gracePeriodSeconds, "number", ""));
        }

        // Query Params
        if (orphanDependents !== undefined) {
            requestContext.setQueryParam("orphanDependents", ObjectSerializer.serialize(orphanDependents, "boolean", ""));
        }

        // Query Params
        if (propagationPolicy !== undefined) {
            requestContext.setQueryParam("propagationPolicy", ObjectSerializer.serialize(propagationPolicy, "string", ""));
        }

        // Query Params
        if (dryRun !== undefined) {
            requestContext.setQueryParam("dryRun", ObjectSerializer.serialize(dryRun, "string", ""));
        }


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(body, "V1DeleteOptions", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        let authMethod = null;
        // Apply auth methods
        authMethod = _config.authMethods["BearerToken"]
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Delete collection of namespace scoped custom objects
     * @param group The custom resource&#39;s group name
     * @param version The custom resource&#39;s version
     * @param namespace The custom resource&#39;s namespace
     * @param plural The custom resource&#39;s plural name. For TPRs this would be lowercase plural kind.
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     * @param gracePeriodSeconds The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.
     * @param orphanDependents Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both.
     * @param propagationPolicy Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy.
     * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @param body 
     */
    public async deleteCollectionNamespacedCustomObject(group: string, version: string, namespace: string, plural: string, pretty?: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string, dryRun?: string, body?: V1DeleteOptions, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'group' is not null or undefined
        if (group === null || group === undefined) {
            throw new RequiredError("CustomObjectsApi", "deleteCollectionNamespacedCustomObject", "group");
        }


        // verify required parameter 'version' is not null or undefined
        if (version === null || version === undefined) {
            throw new RequiredError("CustomObjectsApi", "deleteCollectionNamespacedCustomObject", "version");
        }


        // verify required parameter 'namespace' is not null or undefined
        if (namespace === null || namespace === undefined) {
            throw new RequiredError("CustomObjectsApi", "deleteCollectionNamespacedCustomObject", "namespace");
        }


        // verify required parameter 'plural' is not null or undefined
        if (plural === null || plural === undefined) {
            throw new RequiredError("CustomObjectsApi", "deleteCollectionNamespacedCustomObject", "plural");
        }








        // Path Params
        const localVarPath = '/apis/{group}/{version}/namespaces/{namespace}/{plural}'
            .replace('{' + 'group' + '}', encodeURIComponent(String(group)))
            .replace('{' + 'version' + '}', encodeURIComponent(String(version)))
            .replace('{' + 'namespace' + '}', encodeURIComponent(String(namespace)))
            .replace('{' + 'plural' + '}', encodeURIComponent(String(plural)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.DELETE);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (pretty !== undefined) {
            requestContext.setQueryParam("pretty", ObjectSerializer.serialize(pretty, "string", ""));
        }

        // Query Params
        if (gracePeriodSeconds !== undefined) {
            requestContext.setQueryParam("gracePeriodSeconds", ObjectSerializer.serialize(gracePeriodSeconds, "number", ""));
        }

        // Query Params
        if (orphanDependents !== undefined) {
            requestContext.setQueryParam("orphanDependents", ObjectSerializer.serialize(orphanDependents, "boolean", ""));
        }

        // Query Params
        if (propagationPolicy !== undefined) {
            requestContext.setQueryParam("propagationPolicy", ObjectSerializer.serialize(propagationPolicy, "string", ""));
        }

        // Query Params
        if (dryRun !== undefined) {
            requestContext.setQueryParam("dryRun", ObjectSerializer.serialize(dryRun, "string", ""));
        }


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(body, "V1DeleteOptions", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        let authMethod = null;
        // Apply auth methods
        authMethod = _config.authMethods["BearerToken"]
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Deletes the specified namespace scoped custom object
     * @param group the custom resource&#39;s group
     * @param version the custom resource&#39;s version
     * @param namespace The custom resource&#39;s namespace
     * @param plural the custom resource&#39;s plural name. For TPRs this would be lowercase plural kind.
     * @param name the custom object&#39;s name
     * @param gracePeriodSeconds The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.
     * @param orphanDependents Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be added to/removed from the object&#39;s finalizers list. Either this field or PropagationPolicy may be set, but not both.
     * @param propagationPolicy Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy.
     * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @param body 
     */
    public async deleteNamespacedCustomObject(group: string, version: string, namespace: string, plural: string, name: string, gracePeriodSeconds?: number, orphanDependents?: boolean, propagationPolicy?: string, dryRun?: string, body?: V1DeleteOptions, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'group' is not null or undefined
        if (group === null || group === undefined) {
            throw new RequiredError("CustomObjectsApi", "deleteNamespacedCustomObject", "group");
        }


        // verify required parameter 'version' is not null or undefined
        if (version === null || version === undefined) {
            throw new RequiredError("CustomObjectsApi", "deleteNamespacedCustomObject", "version");
        }


        // verify required parameter 'namespace' is not null or undefined
        if (namespace === null || namespace === undefined) {
            throw new RequiredError("CustomObjectsApi", "deleteNamespacedCustomObject", "namespace");
        }


        // verify required parameter 'plural' is not null or undefined
        if (plural === null || plural === undefined) {
            throw new RequiredError("CustomObjectsApi", "deleteNamespacedCustomObject", "plural");
        }


        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("CustomObjectsApi", "deleteNamespacedCustomObject", "name");
        }







        // Path Params
        const localVarPath = '/apis/{group}/{version}/namespaces/{namespace}/{plural}/{name}'
            .replace('{' + 'group' + '}', encodeURIComponent(String(group)))
            .replace('{' + 'version' + '}', encodeURIComponent(String(version)))
            .replace('{' + 'namespace' + '}', encodeURIComponent(String(namespace)))
            .replace('{' + 'plural' + '}', encodeURIComponent(String(plural)))
            .replace('{' + 'name' + '}', encodeURIComponent(String(name)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.DELETE);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (gracePeriodSeconds !== undefined) {
            requestContext.setQueryParam("gracePeriodSeconds", ObjectSerializer.serialize(gracePeriodSeconds, "number", ""));
        }

        // Query Params
        if (orphanDependents !== undefined) {
            requestContext.setQueryParam("orphanDependents", ObjectSerializer.serialize(orphanDependents, "boolean", ""));
        }

        // Query Params
        if (propagationPolicy !== undefined) {
            requestContext.setQueryParam("propagationPolicy", ObjectSerializer.serialize(propagationPolicy, "string", ""));
        }

        // Query Params
        if (dryRun !== undefined) {
            requestContext.setQueryParam("dryRun", ObjectSerializer.serialize(dryRun, "string", ""));
        }


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(body, "V1DeleteOptions", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        let authMethod = null;
        // Apply auth methods
        authMethod = _config.authMethods["BearerToken"]
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Returns a cluster scoped custom object
     * @param group the custom resource&#39;s group
     * @param version the custom resource&#39;s version
     * @param plural the custom object&#39;s plural name. For TPRs this would be lowercase plural kind.
     * @param name the custom object&#39;s name
     */
    public async getClusterCustomObject(group: string, version: string, plural: string, name: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'group' is not null or undefined
        if (group === null || group === undefined) {
            throw new RequiredError("CustomObjectsApi", "getClusterCustomObject", "group");
        }


        // verify required parameter 'version' is not null or undefined
        if (version === null || version === undefined) {
            throw new RequiredError("CustomObjectsApi", "getClusterCustomObject", "version");
        }


        // verify required parameter 'plural' is not null or undefined
        if (plural === null || plural === undefined) {
            throw new RequiredError("CustomObjectsApi", "getClusterCustomObject", "plural");
        }


        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("CustomObjectsApi", "getClusterCustomObject", "name");
        }


        // Path Params
        const localVarPath = '/apis/{group}/{version}/{plural}/{name}'
            .replace('{' + 'group' + '}', encodeURIComponent(String(group)))
            .replace('{' + 'version' + '}', encodeURIComponent(String(version)))
            .replace('{' + 'plural' + '}', encodeURIComponent(String(plural)))
            .replace('{' + 'name' + '}', encodeURIComponent(String(name)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        let authMethod = null;
        // Apply auth methods
        authMethod = _config.authMethods["BearerToken"]
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * read scale of the specified custom object
     * @param group the custom resource&#39;s group
     * @param version the custom resource&#39;s version
     * @param plural the custom resource&#39;s plural name. For TPRs this would be lowercase plural kind.
     * @param name the custom object&#39;s name
     */
    public async getClusterCustomObjectScale(group: string, version: string, plural: string, name: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'group' is not null or undefined
        if (group === null || group === undefined) {
            throw new RequiredError("CustomObjectsApi", "getClusterCustomObjectScale", "group");
        }


        // verify required parameter 'version' is not null or undefined
        if (version === null || version === undefined) {
            throw new RequiredError("CustomObjectsApi", "getClusterCustomObjectScale", "version");
        }


        // verify required parameter 'plural' is not null or undefined
        if (plural === null || plural === undefined) {
            throw new RequiredError("CustomObjectsApi", "getClusterCustomObjectScale", "plural");
        }


        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("CustomObjectsApi", "getClusterCustomObjectScale", "name");
        }


        // Path Params
        const localVarPath = '/apis/{group}/{version}/{plural}/{name}/scale'
            .replace('{' + 'group' + '}', encodeURIComponent(String(group)))
            .replace('{' + 'version' + '}', encodeURIComponent(String(version)))
            .replace('{' + 'plural' + '}', encodeURIComponent(String(plural)))
            .replace('{' + 'name' + '}', encodeURIComponent(String(name)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        let authMethod = null;
        // Apply auth methods
        authMethod = _config.authMethods["BearerToken"]
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * read status of the specified cluster scoped custom object
     * @param group the custom resource&#39;s group
     * @param version the custom resource&#39;s version
     * @param plural the custom resource&#39;s plural name. For TPRs this would be lowercase plural kind.
     * @param name the custom object&#39;s name
     */
    public async getClusterCustomObjectStatus(group: string, version: string, plural: string, name: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'group' is not null or undefined
        if (group === null || group === undefined) {
            throw new RequiredError("CustomObjectsApi", "getClusterCustomObjectStatus", "group");
        }


        // verify required parameter 'version' is not null or undefined
        if (version === null || version === undefined) {
            throw new RequiredError("CustomObjectsApi", "getClusterCustomObjectStatus", "version");
        }


        // verify required parameter 'plural' is not null or undefined
        if (plural === null || plural === undefined) {
            throw new RequiredError("CustomObjectsApi", "getClusterCustomObjectStatus", "plural");
        }


        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("CustomObjectsApi", "getClusterCustomObjectStatus", "name");
        }


        // Path Params
        const localVarPath = '/apis/{group}/{version}/{plural}/{name}/status'
            .replace('{' + 'group' + '}', encodeURIComponent(String(group)))
            .replace('{' + 'version' + '}', encodeURIComponent(String(version)))
            .replace('{' + 'plural' + '}', encodeURIComponent(String(plural)))
            .replace('{' + 'name' + '}', encodeURIComponent(String(name)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        let authMethod = null;
        // Apply auth methods
        authMethod = _config.authMethods["BearerToken"]
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Returns a namespace scoped custom object
     * @param group the custom resource&#39;s group
     * @param version the custom resource&#39;s version
     * @param namespace The custom resource&#39;s namespace
     * @param plural the custom resource&#39;s plural name. For TPRs this would be lowercase plural kind.
     * @param name the custom object&#39;s name
     */
    public async getNamespacedCustomObject(group: string, version: string, namespace: string, plural: string, name: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'group' is not null or undefined
        if (group === null || group === undefined) {
            throw new RequiredError("CustomObjectsApi", "getNamespacedCustomObject", "group");
        }


        // verify required parameter 'version' is not null or undefined
        if (version === null || version === undefined) {
            throw new RequiredError("CustomObjectsApi", "getNamespacedCustomObject", "version");
        }


        // verify required parameter 'namespace' is not null or undefined
        if (namespace === null || namespace === undefined) {
            throw new RequiredError("CustomObjectsApi", "getNamespacedCustomObject", "namespace");
        }


        // verify required parameter 'plural' is not null or undefined
        if (plural === null || plural === undefined) {
            throw new RequiredError("CustomObjectsApi", "getNamespacedCustomObject", "plural");
        }


        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("CustomObjectsApi", "getNamespacedCustomObject", "name");
        }


        // Path Params
        const localVarPath = '/apis/{group}/{version}/namespaces/{namespace}/{plural}/{name}'
            .replace('{' + 'group' + '}', encodeURIComponent(String(group)))
            .replace('{' + 'version' + '}', encodeURIComponent(String(version)))
            .replace('{' + 'namespace' + '}', encodeURIComponent(String(namespace)))
            .replace('{' + 'plural' + '}', encodeURIComponent(String(plural)))
            .replace('{' + 'name' + '}', encodeURIComponent(String(name)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        let authMethod = null;
        // Apply auth methods
        authMethod = _config.authMethods["BearerToken"]
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * read scale of the specified namespace scoped custom object
     * @param group the custom resource&#39;s group
     * @param version the custom resource&#39;s version
     * @param namespace The custom resource&#39;s namespace
     * @param plural the custom resource&#39;s plural name. For TPRs this would be lowercase plural kind.
     * @param name the custom object&#39;s name
     */
    public async getNamespacedCustomObjectScale(group: string, version: string, namespace: string, plural: string, name: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'group' is not null or undefined
        if (group === null || group === undefined) {
            throw new RequiredError("CustomObjectsApi", "getNamespacedCustomObjectScale", "group");
        }


        // verify required parameter 'version' is not null or undefined
        if (version === null || version === undefined) {
            throw new RequiredError("CustomObjectsApi", "getNamespacedCustomObjectScale", "version");
        }


        // verify required parameter 'namespace' is not null or undefined
        if (namespace === null || namespace === undefined) {
            throw new RequiredError("CustomObjectsApi", "getNamespacedCustomObjectScale", "namespace");
        }


        // verify required parameter 'plural' is not null or undefined
        if (plural === null || plural === undefined) {
            throw new RequiredError("CustomObjectsApi", "getNamespacedCustomObjectScale", "plural");
        }


        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("CustomObjectsApi", "getNamespacedCustomObjectScale", "name");
        }


        // Path Params
        const localVarPath = '/apis/{group}/{version}/namespaces/{namespace}/{plural}/{name}/scale'
            .replace('{' + 'group' + '}', encodeURIComponent(String(group)))
            .replace('{' + 'version' + '}', encodeURIComponent(String(version)))
            .replace('{' + 'namespace' + '}', encodeURIComponent(String(namespace)))
            .replace('{' + 'plural' + '}', encodeURIComponent(String(plural)))
            .replace('{' + 'name' + '}', encodeURIComponent(String(name)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        let authMethod = null;
        // Apply auth methods
        authMethod = _config.authMethods["BearerToken"]
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * read status of the specified namespace scoped custom object
     * @param group the custom resource&#39;s group
     * @param version the custom resource&#39;s version
     * @param namespace The custom resource&#39;s namespace
     * @param plural the custom resource&#39;s plural name. For TPRs this would be lowercase plural kind.
     * @param name the custom object&#39;s name
     */
    public async getNamespacedCustomObjectStatus(group: string, version: string, namespace: string, plural: string, name: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'group' is not null or undefined
        if (group === null || group === undefined) {
            throw new RequiredError("CustomObjectsApi", "getNamespacedCustomObjectStatus", "group");
        }


        // verify required parameter 'version' is not null or undefined
        if (version === null || version === undefined) {
            throw new RequiredError("CustomObjectsApi", "getNamespacedCustomObjectStatus", "version");
        }


        // verify required parameter 'namespace' is not null or undefined
        if (namespace === null || namespace === undefined) {
            throw new RequiredError("CustomObjectsApi", "getNamespacedCustomObjectStatus", "namespace");
        }


        // verify required parameter 'plural' is not null or undefined
        if (plural === null || plural === undefined) {
            throw new RequiredError("CustomObjectsApi", "getNamespacedCustomObjectStatus", "plural");
        }


        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("CustomObjectsApi", "getNamespacedCustomObjectStatus", "name");
        }


        // Path Params
        const localVarPath = '/apis/{group}/{version}/namespaces/{namespace}/{plural}/{name}/status'
            .replace('{' + 'group' + '}', encodeURIComponent(String(group)))
            .replace('{' + 'version' + '}', encodeURIComponent(String(version)))
            .replace('{' + 'namespace' + '}', encodeURIComponent(String(namespace)))
            .replace('{' + 'plural' + '}', encodeURIComponent(String(plural)))
            .replace('{' + 'name' + '}', encodeURIComponent(String(name)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        let authMethod = null;
        // Apply auth methods
        authMethod = _config.authMethods["BearerToken"]
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * list or watch cluster scoped custom objects
     * @param group The custom resource&#39;s group name
     * @param version The custom resource&#39;s version
     * @param plural The custom resource&#39;s plural name. For TPRs this would be lowercase plural kind.
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     * @param allowWatchBookmarks allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored. If the feature gate WatchBookmarks is not enabled in apiserver, this field is ignored.
     * @param _continue The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @param fieldSelector A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @param labelSelector A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @param limit limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @param resourceVersion When specified with a watch call, shows changes that occur after that particular version of a resource. Defaults to changes from the beginning of history. When specified for list: - if unset, then the result is returned from remote storage based on quorum-read flag; - if it&#39;s 0, then we simply return what we currently have in cache, no guarantee; - if set to non zero, then the result is at least as fresh as given rv.
     * @param resourceVersionMatch resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @param timeoutSeconds Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @param watch Watch for changes to the described resources and return them as a stream of add, update, and remove notifications.
     */
    public async listClusterCustomObject(group: string, version: string, plural: string, pretty?: string, allowWatchBookmarks?: boolean, _continue?: string, fieldSelector?: string, labelSelector?: string, limit?: number, resourceVersion?: string, resourceVersionMatch?: string, timeoutSeconds?: number, watch?: boolean, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'group' is not null or undefined
        if (group === null || group === undefined) {
            throw new RequiredError("CustomObjectsApi", "listClusterCustomObject", "group");
        }


        // verify required parameter 'version' is not null or undefined
        if (version === null || version === undefined) {
            throw new RequiredError("CustomObjectsApi", "listClusterCustomObject", "version");
        }


        // verify required parameter 'plural' is not null or undefined
        if (plural === null || plural === undefined) {
            throw new RequiredError("CustomObjectsApi", "listClusterCustomObject", "plural");
        }












        // Path Params
        const localVarPath = '/apis/{group}/{version}/{plural}'
            .replace('{' + 'group' + '}', encodeURIComponent(String(group)))
            .replace('{' + 'version' + '}', encodeURIComponent(String(version)))
            .replace('{' + 'plural' + '}', encodeURIComponent(String(plural)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (pretty !== undefined) {
            requestContext.setQueryParam("pretty", ObjectSerializer.serialize(pretty, "string", ""));
        }

        // Query Params
        if (allowWatchBookmarks !== undefined) {
            requestContext.setQueryParam("allowWatchBookmarks", ObjectSerializer.serialize(allowWatchBookmarks, "boolean", ""));
        }

        // Query Params
        if (_continue !== undefined) {
            requestContext.setQueryParam("continue", ObjectSerializer.serialize(_continue, "string", ""));
        }

        // Query Params
        if (fieldSelector !== undefined) {
            requestContext.setQueryParam("fieldSelector", ObjectSerializer.serialize(fieldSelector, "string", ""));
        }

        // Query Params
        if (labelSelector !== undefined) {
            requestContext.setQueryParam("labelSelector", ObjectSerializer.serialize(labelSelector, "string", ""));
        }

        // Query Params
        if (limit !== undefined) {
            requestContext.setQueryParam("limit", ObjectSerializer.serialize(limit, "number", ""));
        }

        // Query Params
        if (resourceVersion !== undefined) {
            requestContext.setQueryParam("resourceVersion", ObjectSerializer.serialize(resourceVersion, "string", ""));
        }

        // Query Params
        if (resourceVersionMatch !== undefined) {
            requestContext.setQueryParam("resourceVersionMatch", ObjectSerializer.serialize(resourceVersionMatch, "string", ""));
        }

        // Query Params
        if (timeoutSeconds !== undefined) {
            requestContext.setQueryParam("timeoutSeconds", ObjectSerializer.serialize(timeoutSeconds, "number", ""));
        }

        // Query Params
        if (watch !== undefined) {
            requestContext.setQueryParam("watch", ObjectSerializer.serialize(watch, "boolean", ""));
        }


        let authMethod = null;
        // Apply auth methods
        authMethod = _config.authMethods["BearerToken"]
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * list or watch namespace scoped custom objects
     * @param group The custom resource&#39;s group name
     * @param version The custom resource&#39;s version
     * @param namespace The custom resource&#39;s namespace
     * @param plural The custom resource&#39;s plural name. For TPRs this would be lowercase plural kind.
     * @param pretty If &#39;true&#39;, then the output is pretty printed.
     * @param allowWatchBookmarks allowWatchBookmarks requests watch events with type \&quot;BOOKMARK\&quot;. Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server&#39;s discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored. If the feature gate WatchBookmarks is not enabled in apiserver, this field is ignored.
     * @param _continue The continue option should be set when retrieving more results from the server. Since this value is server defined, clients may only use the continue value from a previous query result with identical query parameters (except for the value of continue) and the server may reject a continue value it does not recognize. If the specified continue value is no longer valid whether due to expiration (generally five to fifteen minutes) or a configuration change on the server, the server will respond with a 410 ResourceExpired error together with a continue token. If the client needs a consistent list, it must restart their list without the continue field. Otherwise, the client may send another list request with the token received with the 410 error, the server will respond with a list starting from the next key, but from the latest snapshot, which is inconsistent from the previous list results - objects that are created, modified, or deleted after the first list request will be included in the response, as long as their keys are after the \&quot;next key\&quot;.  This field is not supported when watch is true. Clients may start a watch from the last resourceVersion value returned by the server and not miss any modifications.
     * @param fieldSelector A selector to restrict the list of returned objects by their fields. Defaults to everything.
     * @param labelSelector A selector to restrict the list of returned objects by their labels. Defaults to everything.
     * @param limit limit is a maximum number of responses to return for a list call. If more items exist, the server will set the &#x60;continue&#x60; field on the list metadata to a value that can be used with the same initial query to retrieve the next set of results. Setting a limit may return fewer than the requested amount of items (up to zero items) in the event all requested objects are filtered out and clients should only use the presence of the continue field to determine whether more results are available. Servers may choose not to support the limit argument and will return all of the available results. If limit is specified and the continue field is empty, clients may assume that no more results are available. This field is not supported if watch is true.  The server guarantees that the objects returned when using continue will be identical to issuing a single list call without a limit - that is, no objects created, modified, or deleted after the first request is issued will be included in any subsequent continued requests. This is sometimes referred to as a consistent snapshot, and ensures that a client that is using limit to receive smaller chunks of a very large result can ensure they see all possible objects. If objects are updated during a chunked list the version of the object that was present at the time the first list result was calculated is returned.
     * @param resourceVersion When specified with a watch call, shows changes that occur after that particular version of a resource. Defaults to changes from the beginning of history. When specified for list: - if unset, then the result is returned from remote storage based on quorum-read flag; - if it&#39;s 0, then we simply return what we currently have in cache, no guarantee; - if set to non zero, then the result is at least as fresh as given rv.
     * @param resourceVersionMatch resourceVersionMatch determines how resourceVersion is applied to list calls. It is highly recommended that resourceVersionMatch be set for list calls where resourceVersion is set See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for details.  Defaults to unset
     * @param timeoutSeconds Timeout for the list/watch call. This limits the duration of the call, regardless of any activity or inactivity.
     * @param watch Watch for changes to the described resources and return them as a stream of add, update, and remove notifications.
     */
    public async listNamespacedCustomObject(group: string, version: string, namespace: string, plural: string, pretty?: string, allowWatchBookmarks?: boolean, _continue?: string, fieldSelector?: string, labelSelector?: string, limit?: number, resourceVersion?: string, resourceVersionMatch?: string, timeoutSeconds?: number, watch?: boolean, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'group' is not null or undefined
        if (group === null || group === undefined) {
            throw new RequiredError("CustomObjectsApi", "listNamespacedCustomObject", "group");
        }


        // verify required parameter 'version' is not null or undefined
        if (version === null || version === undefined) {
            throw new RequiredError("CustomObjectsApi", "listNamespacedCustomObject", "version");
        }


        // verify required parameter 'namespace' is not null or undefined
        if (namespace === null || namespace === undefined) {
            throw new RequiredError("CustomObjectsApi", "listNamespacedCustomObject", "namespace");
        }


        // verify required parameter 'plural' is not null or undefined
        if (plural === null || plural === undefined) {
            throw new RequiredError("CustomObjectsApi", "listNamespacedCustomObject", "plural");
        }












        // Path Params
        const localVarPath = '/apis/{group}/{version}/namespaces/{namespace}/{plural}'
            .replace('{' + 'group' + '}', encodeURIComponent(String(group)))
            .replace('{' + 'version' + '}', encodeURIComponent(String(version)))
            .replace('{' + 'namespace' + '}', encodeURIComponent(String(namespace)))
            .replace('{' + 'plural' + '}', encodeURIComponent(String(plural)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (pretty !== undefined) {
            requestContext.setQueryParam("pretty", ObjectSerializer.serialize(pretty, "string", ""));
        }

        // Query Params
        if (allowWatchBookmarks !== undefined) {
            requestContext.setQueryParam("allowWatchBookmarks", ObjectSerializer.serialize(allowWatchBookmarks, "boolean", ""));
        }

        // Query Params
        if (_continue !== undefined) {
            requestContext.setQueryParam("continue", ObjectSerializer.serialize(_continue, "string", ""));
        }

        // Query Params
        if (fieldSelector !== undefined) {
            requestContext.setQueryParam("fieldSelector", ObjectSerializer.serialize(fieldSelector, "string", ""));
        }

        // Query Params
        if (labelSelector !== undefined) {
            requestContext.setQueryParam("labelSelector", ObjectSerializer.serialize(labelSelector, "string", ""));
        }

        // Query Params
        if (limit !== undefined) {
            requestContext.setQueryParam("limit", ObjectSerializer.serialize(limit, "number", ""));
        }

        // Query Params
        if (resourceVersion !== undefined) {
            requestContext.setQueryParam("resourceVersion", ObjectSerializer.serialize(resourceVersion, "string", ""));
        }

        // Query Params
        if (resourceVersionMatch !== undefined) {
            requestContext.setQueryParam("resourceVersionMatch", ObjectSerializer.serialize(resourceVersionMatch, "string", ""));
        }

        // Query Params
        if (timeoutSeconds !== undefined) {
            requestContext.setQueryParam("timeoutSeconds", ObjectSerializer.serialize(timeoutSeconds, "number", ""));
        }

        // Query Params
        if (watch !== undefined) {
            requestContext.setQueryParam("watch", ObjectSerializer.serialize(watch, "boolean", ""));
        }


        let authMethod = null;
        // Apply auth methods
        authMethod = _config.authMethods["BearerToken"]
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * patch the specified cluster scoped custom object
     * @param group the custom resource&#39;s group
     * @param version the custom resource&#39;s version
     * @param plural the custom object&#39;s plural name. For TPRs this would be lowercase plural kind.
     * @param name the custom object&#39;s name
     * @param body The JSON schema of the Resource to patch.
     * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
     * @param force Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
     */
    public async patchClusterCustomObject(group: string, version: string, plural: string, name: string, body: any, dryRun?: string, fieldManager?: string, force?: boolean, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'group' is not null or undefined
        if (group === null || group === undefined) {
            throw new RequiredError("CustomObjectsApi", "patchClusterCustomObject", "group");
        }


        // verify required parameter 'version' is not null or undefined
        if (version === null || version === undefined) {
            throw new RequiredError("CustomObjectsApi", "patchClusterCustomObject", "version");
        }


        // verify required parameter 'plural' is not null or undefined
        if (plural === null || plural === undefined) {
            throw new RequiredError("CustomObjectsApi", "patchClusterCustomObject", "plural");
        }


        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("CustomObjectsApi", "patchClusterCustomObject", "name");
        }


        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new RequiredError("CustomObjectsApi", "patchClusterCustomObject", "body");
        }





        // Path Params
        const localVarPath = '/apis/{group}/{version}/{plural}/{name}'
            .replace('{' + 'group' + '}', encodeURIComponent(String(group)))
            .replace('{' + 'version' + '}', encodeURIComponent(String(version)))
            .replace('{' + 'plural' + '}', encodeURIComponent(String(plural)))
            .replace('{' + 'name' + '}', encodeURIComponent(String(name)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.PATCH);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (dryRun !== undefined) {
            requestContext.setQueryParam("dryRun", ObjectSerializer.serialize(dryRun, "string", ""));
        }

        // Query Params
        if (fieldManager !== undefined) {
            requestContext.setQueryParam("fieldManager", ObjectSerializer.serialize(fieldManager, "string", ""));
        }

        // Query Params
        if (force !== undefined) {
            requestContext.setQueryParam("force", ObjectSerializer.serialize(force, "boolean", ""));
        }


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/json-patch+json",
        
            "application/merge-patch+json"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(body, "any", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        let authMethod = null;
        // Apply auth methods
        authMethod = _config.authMethods["BearerToken"]
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * partially update scale of the specified cluster scoped custom object
     * @param group the custom resource&#39;s group
     * @param version the custom resource&#39;s version
     * @param plural the custom resource&#39;s plural name. For TPRs this would be lowercase plural kind.
     * @param name the custom object&#39;s name
     * @param body 
     * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
     * @param force Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
     */
    public async patchClusterCustomObjectScale(group: string, version: string, plural: string, name: string, body: any, dryRun?: string, fieldManager?: string, force?: boolean, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'group' is not null or undefined
        if (group === null || group === undefined) {
            throw new RequiredError("CustomObjectsApi", "patchClusterCustomObjectScale", "group");
        }


        // verify required parameter 'version' is not null or undefined
        if (version === null || version === undefined) {
            throw new RequiredError("CustomObjectsApi", "patchClusterCustomObjectScale", "version");
        }


        // verify required parameter 'plural' is not null or undefined
        if (plural === null || plural === undefined) {
            throw new RequiredError("CustomObjectsApi", "patchClusterCustomObjectScale", "plural");
        }


        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("CustomObjectsApi", "patchClusterCustomObjectScale", "name");
        }


        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new RequiredError("CustomObjectsApi", "patchClusterCustomObjectScale", "body");
        }





        // Path Params
        const localVarPath = '/apis/{group}/{version}/{plural}/{name}/scale'
            .replace('{' + 'group' + '}', encodeURIComponent(String(group)))
            .replace('{' + 'version' + '}', encodeURIComponent(String(version)))
            .replace('{' + 'plural' + '}', encodeURIComponent(String(plural)))
            .replace('{' + 'name' + '}', encodeURIComponent(String(name)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.PATCH);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (dryRun !== undefined) {
            requestContext.setQueryParam("dryRun", ObjectSerializer.serialize(dryRun, "string", ""));
        }

        // Query Params
        if (fieldManager !== undefined) {
            requestContext.setQueryParam("fieldManager", ObjectSerializer.serialize(fieldManager, "string", ""));
        }

        // Query Params
        if (force !== undefined) {
            requestContext.setQueryParam("force", ObjectSerializer.serialize(force, "boolean", ""));
        }


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/json-patch+json",
        
            "application/merge-patch+json"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(body, "any", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        let authMethod = null;
        // Apply auth methods
        authMethod = _config.authMethods["BearerToken"]
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * partially update status of the specified cluster scoped custom object
     * @param group the custom resource&#39;s group
     * @param version the custom resource&#39;s version
     * @param plural the custom resource&#39;s plural name. For TPRs this would be lowercase plural kind.
     * @param name the custom object&#39;s name
     * @param body 
     * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
     * @param force Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
     */
    public async patchClusterCustomObjectStatus(group: string, version: string, plural: string, name: string, body: any, dryRun?: string, fieldManager?: string, force?: boolean, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'group' is not null or undefined
        if (group === null || group === undefined) {
            throw new RequiredError("CustomObjectsApi", "patchClusterCustomObjectStatus", "group");
        }


        // verify required parameter 'version' is not null or undefined
        if (version === null || version === undefined) {
            throw new RequiredError("CustomObjectsApi", "patchClusterCustomObjectStatus", "version");
        }


        // verify required parameter 'plural' is not null or undefined
        if (plural === null || plural === undefined) {
            throw new RequiredError("CustomObjectsApi", "patchClusterCustomObjectStatus", "plural");
        }


        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("CustomObjectsApi", "patchClusterCustomObjectStatus", "name");
        }


        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new RequiredError("CustomObjectsApi", "patchClusterCustomObjectStatus", "body");
        }





        // Path Params
        const localVarPath = '/apis/{group}/{version}/{plural}/{name}/status'
            .replace('{' + 'group' + '}', encodeURIComponent(String(group)))
            .replace('{' + 'version' + '}', encodeURIComponent(String(version)))
            .replace('{' + 'plural' + '}', encodeURIComponent(String(plural)))
            .replace('{' + 'name' + '}', encodeURIComponent(String(name)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.PATCH);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (dryRun !== undefined) {
            requestContext.setQueryParam("dryRun", ObjectSerializer.serialize(dryRun, "string", ""));
        }

        // Query Params
        if (fieldManager !== undefined) {
            requestContext.setQueryParam("fieldManager", ObjectSerializer.serialize(fieldManager, "string", ""));
        }

        // Query Params
        if (force !== undefined) {
            requestContext.setQueryParam("force", ObjectSerializer.serialize(force, "boolean", ""));
        }


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/json-patch+json",
        
            "application/merge-patch+json"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(body, "any", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        let authMethod = null;
        // Apply auth methods
        authMethod = _config.authMethods["BearerToken"]
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * patch the specified namespace scoped custom object
     * @param group the custom resource&#39;s group
     * @param version the custom resource&#39;s version
     * @param namespace The custom resource&#39;s namespace
     * @param plural the custom resource&#39;s plural name. For TPRs this would be lowercase plural kind.
     * @param name the custom object&#39;s name
     * @param body The JSON schema of the Resource to patch.
     * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
     * @param force Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
     */
    public async patchNamespacedCustomObject(group: string, version: string, namespace: string, plural: string, name: string, body: any, dryRun?: string, fieldManager?: string, force?: boolean, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'group' is not null or undefined
        if (group === null || group === undefined) {
            throw new RequiredError("CustomObjectsApi", "patchNamespacedCustomObject", "group");
        }


        // verify required parameter 'version' is not null or undefined
        if (version === null || version === undefined) {
            throw new RequiredError("CustomObjectsApi", "patchNamespacedCustomObject", "version");
        }


        // verify required parameter 'namespace' is not null or undefined
        if (namespace === null || namespace === undefined) {
            throw new RequiredError("CustomObjectsApi", "patchNamespacedCustomObject", "namespace");
        }


        // verify required parameter 'plural' is not null or undefined
        if (plural === null || plural === undefined) {
            throw new RequiredError("CustomObjectsApi", "patchNamespacedCustomObject", "plural");
        }


        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("CustomObjectsApi", "patchNamespacedCustomObject", "name");
        }


        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new RequiredError("CustomObjectsApi", "patchNamespacedCustomObject", "body");
        }





        // Path Params
        const localVarPath = '/apis/{group}/{version}/namespaces/{namespace}/{plural}/{name}'
            .replace('{' + 'group' + '}', encodeURIComponent(String(group)))
            .replace('{' + 'version' + '}', encodeURIComponent(String(version)))
            .replace('{' + 'namespace' + '}', encodeURIComponent(String(namespace)))
            .replace('{' + 'plural' + '}', encodeURIComponent(String(plural)))
            .replace('{' + 'name' + '}', encodeURIComponent(String(name)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.PATCH);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (dryRun !== undefined) {
            requestContext.setQueryParam("dryRun", ObjectSerializer.serialize(dryRun, "string", ""));
        }

        // Query Params
        if (fieldManager !== undefined) {
            requestContext.setQueryParam("fieldManager", ObjectSerializer.serialize(fieldManager, "string", ""));
        }

        // Query Params
        if (force !== undefined) {
            requestContext.setQueryParam("force", ObjectSerializer.serialize(force, "boolean", ""));
        }


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/json-patch+json",
        
            "application/merge-patch+json"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(body, "any", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        let authMethod = null;
        // Apply auth methods
        authMethod = _config.authMethods["BearerToken"]
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * partially update scale of the specified namespace scoped custom object
     * @param group the custom resource&#39;s group
     * @param version the custom resource&#39;s version
     * @param namespace The custom resource&#39;s namespace
     * @param plural the custom resource&#39;s plural name. For TPRs this would be lowercase plural kind.
     * @param name the custom object&#39;s name
     * @param body 
     * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
     * @param force Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
     */
    public async patchNamespacedCustomObjectScale(group: string, version: string, namespace: string, plural: string, name: string, body: any, dryRun?: string, fieldManager?: string, force?: boolean, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'group' is not null or undefined
        if (group === null || group === undefined) {
            throw new RequiredError("CustomObjectsApi", "patchNamespacedCustomObjectScale", "group");
        }


        // verify required parameter 'version' is not null or undefined
        if (version === null || version === undefined) {
            throw new RequiredError("CustomObjectsApi", "patchNamespacedCustomObjectScale", "version");
        }


        // verify required parameter 'namespace' is not null or undefined
        if (namespace === null || namespace === undefined) {
            throw new RequiredError("CustomObjectsApi", "patchNamespacedCustomObjectScale", "namespace");
        }


        // verify required parameter 'plural' is not null or undefined
        if (plural === null || plural === undefined) {
            throw new RequiredError("CustomObjectsApi", "patchNamespacedCustomObjectScale", "plural");
        }


        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("CustomObjectsApi", "patchNamespacedCustomObjectScale", "name");
        }


        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new RequiredError("CustomObjectsApi", "patchNamespacedCustomObjectScale", "body");
        }





        // Path Params
        const localVarPath = '/apis/{group}/{version}/namespaces/{namespace}/{plural}/{name}/scale'
            .replace('{' + 'group' + '}', encodeURIComponent(String(group)))
            .replace('{' + 'version' + '}', encodeURIComponent(String(version)))
            .replace('{' + 'namespace' + '}', encodeURIComponent(String(namespace)))
            .replace('{' + 'plural' + '}', encodeURIComponent(String(plural)))
            .replace('{' + 'name' + '}', encodeURIComponent(String(name)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.PATCH);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (dryRun !== undefined) {
            requestContext.setQueryParam("dryRun", ObjectSerializer.serialize(dryRun, "string", ""));
        }

        // Query Params
        if (fieldManager !== undefined) {
            requestContext.setQueryParam("fieldManager", ObjectSerializer.serialize(fieldManager, "string", ""));
        }

        // Query Params
        if (force !== undefined) {
            requestContext.setQueryParam("force", ObjectSerializer.serialize(force, "boolean", ""));
        }


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/json-patch+json",
        
            "application/merge-patch+json",
        
            "application/apply-patch+yaml"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(body, "any", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        let authMethod = null;
        // Apply auth methods
        authMethod = _config.authMethods["BearerToken"]
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * partially update status of the specified namespace scoped custom object
     * @param group the custom resource&#39;s group
     * @param version the custom resource&#39;s version
     * @param namespace The custom resource&#39;s namespace
     * @param plural the custom resource&#39;s plural name. For TPRs this would be lowercase plural kind.
     * @param name the custom object&#39;s name
     * @param body 
     * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch, StrategicMergePatch).
     * @param force Force is going to \&quot;force\&quot; Apply requests. It means user will re-acquire conflicting fields owned by other people. Force flag must be unset for non-apply patch requests.
     */
    public async patchNamespacedCustomObjectStatus(group: string, version: string, namespace: string, plural: string, name: string, body: any, dryRun?: string, fieldManager?: string, force?: boolean, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'group' is not null or undefined
        if (group === null || group === undefined) {
            throw new RequiredError("CustomObjectsApi", "patchNamespacedCustomObjectStatus", "group");
        }


        // verify required parameter 'version' is not null or undefined
        if (version === null || version === undefined) {
            throw new RequiredError("CustomObjectsApi", "patchNamespacedCustomObjectStatus", "version");
        }


        // verify required parameter 'namespace' is not null or undefined
        if (namespace === null || namespace === undefined) {
            throw new RequiredError("CustomObjectsApi", "patchNamespacedCustomObjectStatus", "namespace");
        }


        // verify required parameter 'plural' is not null or undefined
        if (plural === null || plural === undefined) {
            throw new RequiredError("CustomObjectsApi", "patchNamespacedCustomObjectStatus", "plural");
        }


        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("CustomObjectsApi", "patchNamespacedCustomObjectStatus", "name");
        }


        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new RequiredError("CustomObjectsApi", "patchNamespacedCustomObjectStatus", "body");
        }





        // Path Params
        const localVarPath = '/apis/{group}/{version}/namespaces/{namespace}/{plural}/{name}/status'
            .replace('{' + 'group' + '}', encodeURIComponent(String(group)))
            .replace('{' + 'version' + '}', encodeURIComponent(String(version)))
            .replace('{' + 'namespace' + '}', encodeURIComponent(String(namespace)))
            .replace('{' + 'plural' + '}', encodeURIComponent(String(plural)))
            .replace('{' + 'name' + '}', encodeURIComponent(String(name)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.PATCH);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (dryRun !== undefined) {
            requestContext.setQueryParam("dryRun", ObjectSerializer.serialize(dryRun, "string", ""));
        }

        // Query Params
        if (fieldManager !== undefined) {
            requestContext.setQueryParam("fieldManager", ObjectSerializer.serialize(fieldManager, "string", ""));
        }

        // Query Params
        if (force !== undefined) {
            requestContext.setQueryParam("force", ObjectSerializer.serialize(force, "boolean", ""));
        }


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/json-patch+json",
        
            "application/merge-patch+json",
        
            "application/apply-patch+yaml"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(body, "any", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        let authMethod = null;
        // Apply auth methods
        authMethod = _config.authMethods["BearerToken"]
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * replace the specified cluster scoped custom object
     * @param group the custom resource&#39;s group
     * @param version the custom resource&#39;s version
     * @param plural the custom object&#39;s plural name. For TPRs this would be lowercase plural kind.
     * @param name the custom object&#39;s name
     * @param body The JSON schema of the Resource to replace.
     * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     */
    public async replaceClusterCustomObject(group: string, version: string, plural: string, name: string, body: any, dryRun?: string, fieldManager?: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'group' is not null or undefined
        if (group === null || group === undefined) {
            throw new RequiredError("CustomObjectsApi", "replaceClusterCustomObject", "group");
        }


        // verify required parameter 'version' is not null or undefined
        if (version === null || version === undefined) {
            throw new RequiredError("CustomObjectsApi", "replaceClusterCustomObject", "version");
        }


        // verify required parameter 'plural' is not null or undefined
        if (plural === null || plural === undefined) {
            throw new RequiredError("CustomObjectsApi", "replaceClusterCustomObject", "plural");
        }


        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("CustomObjectsApi", "replaceClusterCustomObject", "name");
        }


        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new RequiredError("CustomObjectsApi", "replaceClusterCustomObject", "body");
        }




        // Path Params
        const localVarPath = '/apis/{group}/{version}/{plural}/{name}'
            .replace('{' + 'group' + '}', encodeURIComponent(String(group)))
            .replace('{' + 'version' + '}', encodeURIComponent(String(version)))
            .replace('{' + 'plural' + '}', encodeURIComponent(String(plural)))
            .replace('{' + 'name' + '}', encodeURIComponent(String(name)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.PUT);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (dryRun !== undefined) {
            requestContext.setQueryParam("dryRun", ObjectSerializer.serialize(dryRun, "string", ""));
        }

        // Query Params
        if (fieldManager !== undefined) {
            requestContext.setQueryParam("fieldManager", ObjectSerializer.serialize(fieldManager, "string", ""));
        }


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(body, "any", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        let authMethod = null;
        // Apply auth methods
        authMethod = _config.authMethods["BearerToken"]
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * replace scale of the specified cluster scoped custom object
     * @param group the custom resource&#39;s group
     * @param version the custom resource&#39;s version
     * @param plural the custom resource&#39;s plural name. For TPRs this would be lowercase plural kind.
     * @param name the custom object&#39;s name
     * @param body 
     * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     */
    public async replaceClusterCustomObjectScale(group: string, version: string, plural: string, name: string, body: any, dryRun?: string, fieldManager?: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'group' is not null or undefined
        if (group === null || group === undefined) {
            throw new RequiredError("CustomObjectsApi", "replaceClusterCustomObjectScale", "group");
        }


        // verify required parameter 'version' is not null or undefined
        if (version === null || version === undefined) {
            throw new RequiredError("CustomObjectsApi", "replaceClusterCustomObjectScale", "version");
        }


        // verify required parameter 'plural' is not null or undefined
        if (plural === null || plural === undefined) {
            throw new RequiredError("CustomObjectsApi", "replaceClusterCustomObjectScale", "plural");
        }


        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("CustomObjectsApi", "replaceClusterCustomObjectScale", "name");
        }


        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new RequiredError("CustomObjectsApi", "replaceClusterCustomObjectScale", "body");
        }




        // Path Params
        const localVarPath = '/apis/{group}/{version}/{plural}/{name}/scale'
            .replace('{' + 'group' + '}', encodeURIComponent(String(group)))
            .replace('{' + 'version' + '}', encodeURIComponent(String(version)))
            .replace('{' + 'plural' + '}', encodeURIComponent(String(plural)))
            .replace('{' + 'name' + '}', encodeURIComponent(String(name)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.PUT);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (dryRun !== undefined) {
            requestContext.setQueryParam("dryRun", ObjectSerializer.serialize(dryRun, "string", ""));
        }

        // Query Params
        if (fieldManager !== undefined) {
            requestContext.setQueryParam("fieldManager", ObjectSerializer.serialize(fieldManager, "string", ""));
        }


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(body, "any", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        let authMethod = null;
        // Apply auth methods
        authMethod = _config.authMethods["BearerToken"]
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * replace status of the cluster scoped specified custom object
     * @param group the custom resource&#39;s group
     * @param version the custom resource&#39;s version
     * @param plural the custom resource&#39;s plural name. For TPRs this would be lowercase plural kind.
     * @param name the custom object&#39;s name
     * @param body 
     * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     */
    public async replaceClusterCustomObjectStatus(group: string, version: string, plural: string, name: string, body: any, dryRun?: string, fieldManager?: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'group' is not null or undefined
        if (group === null || group === undefined) {
            throw new RequiredError("CustomObjectsApi", "replaceClusterCustomObjectStatus", "group");
        }


        // verify required parameter 'version' is not null or undefined
        if (version === null || version === undefined) {
            throw new RequiredError("CustomObjectsApi", "replaceClusterCustomObjectStatus", "version");
        }


        // verify required parameter 'plural' is not null or undefined
        if (plural === null || plural === undefined) {
            throw new RequiredError("CustomObjectsApi", "replaceClusterCustomObjectStatus", "plural");
        }


        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("CustomObjectsApi", "replaceClusterCustomObjectStatus", "name");
        }


        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new RequiredError("CustomObjectsApi", "replaceClusterCustomObjectStatus", "body");
        }




        // Path Params
        const localVarPath = '/apis/{group}/{version}/{plural}/{name}/status'
            .replace('{' + 'group' + '}', encodeURIComponent(String(group)))
            .replace('{' + 'version' + '}', encodeURIComponent(String(version)))
            .replace('{' + 'plural' + '}', encodeURIComponent(String(plural)))
            .replace('{' + 'name' + '}', encodeURIComponent(String(name)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.PUT);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (dryRun !== undefined) {
            requestContext.setQueryParam("dryRun", ObjectSerializer.serialize(dryRun, "string", ""));
        }

        // Query Params
        if (fieldManager !== undefined) {
            requestContext.setQueryParam("fieldManager", ObjectSerializer.serialize(fieldManager, "string", ""));
        }


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(body, "any", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        let authMethod = null;
        // Apply auth methods
        authMethod = _config.authMethods["BearerToken"]
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * replace the specified namespace scoped custom object
     * @param group the custom resource&#39;s group
     * @param version the custom resource&#39;s version
     * @param namespace The custom resource&#39;s namespace
     * @param plural the custom resource&#39;s plural name. For TPRs this would be lowercase plural kind.
     * @param name the custom object&#39;s name
     * @param body The JSON schema of the Resource to replace.
     * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     */
    public async replaceNamespacedCustomObject(group: string, version: string, namespace: string, plural: string, name: string, body: any, dryRun?: string, fieldManager?: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'group' is not null or undefined
        if (group === null || group === undefined) {
            throw new RequiredError("CustomObjectsApi", "replaceNamespacedCustomObject", "group");
        }


        // verify required parameter 'version' is not null or undefined
        if (version === null || version === undefined) {
            throw new RequiredError("CustomObjectsApi", "replaceNamespacedCustomObject", "version");
        }


        // verify required parameter 'namespace' is not null or undefined
        if (namespace === null || namespace === undefined) {
            throw new RequiredError("CustomObjectsApi", "replaceNamespacedCustomObject", "namespace");
        }


        // verify required parameter 'plural' is not null or undefined
        if (plural === null || plural === undefined) {
            throw new RequiredError("CustomObjectsApi", "replaceNamespacedCustomObject", "plural");
        }


        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("CustomObjectsApi", "replaceNamespacedCustomObject", "name");
        }


        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new RequiredError("CustomObjectsApi", "replaceNamespacedCustomObject", "body");
        }




        // Path Params
        const localVarPath = '/apis/{group}/{version}/namespaces/{namespace}/{plural}/{name}'
            .replace('{' + 'group' + '}', encodeURIComponent(String(group)))
            .replace('{' + 'version' + '}', encodeURIComponent(String(version)))
            .replace('{' + 'namespace' + '}', encodeURIComponent(String(namespace)))
            .replace('{' + 'plural' + '}', encodeURIComponent(String(plural)))
            .replace('{' + 'name' + '}', encodeURIComponent(String(name)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.PUT);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (dryRun !== undefined) {
            requestContext.setQueryParam("dryRun", ObjectSerializer.serialize(dryRun, "string", ""));
        }

        // Query Params
        if (fieldManager !== undefined) {
            requestContext.setQueryParam("fieldManager", ObjectSerializer.serialize(fieldManager, "string", ""));
        }


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(body, "any", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        let authMethod = null;
        // Apply auth methods
        authMethod = _config.authMethods["BearerToken"]
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * replace scale of the specified namespace scoped custom object
     * @param group the custom resource&#39;s group
     * @param version the custom resource&#39;s version
     * @param namespace The custom resource&#39;s namespace
     * @param plural the custom resource&#39;s plural name. For TPRs this would be lowercase plural kind.
     * @param name the custom object&#39;s name
     * @param body 
     * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     */
    public async replaceNamespacedCustomObjectScale(group: string, version: string, namespace: string, plural: string, name: string, body: any, dryRun?: string, fieldManager?: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'group' is not null or undefined
        if (group === null || group === undefined) {
            throw new RequiredError("CustomObjectsApi", "replaceNamespacedCustomObjectScale", "group");
        }


        // verify required parameter 'version' is not null or undefined
        if (version === null || version === undefined) {
            throw new RequiredError("CustomObjectsApi", "replaceNamespacedCustomObjectScale", "version");
        }


        // verify required parameter 'namespace' is not null or undefined
        if (namespace === null || namespace === undefined) {
            throw new RequiredError("CustomObjectsApi", "replaceNamespacedCustomObjectScale", "namespace");
        }


        // verify required parameter 'plural' is not null or undefined
        if (plural === null || plural === undefined) {
            throw new RequiredError("CustomObjectsApi", "replaceNamespacedCustomObjectScale", "plural");
        }


        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("CustomObjectsApi", "replaceNamespacedCustomObjectScale", "name");
        }


        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new RequiredError("CustomObjectsApi", "replaceNamespacedCustomObjectScale", "body");
        }




        // Path Params
        const localVarPath = '/apis/{group}/{version}/namespaces/{namespace}/{plural}/{name}/scale'
            .replace('{' + 'group' + '}', encodeURIComponent(String(group)))
            .replace('{' + 'version' + '}', encodeURIComponent(String(version)))
            .replace('{' + 'namespace' + '}', encodeURIComponent(String(namespace)))
            .replace('{' + 'plural' + '}', encodeURIComponent(String(plural)))
            .replace('{' + 'name' + '}', encodeURIComponent(String(name)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.PUT);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (dryRun !== undefined) {
            requestContext.setQueryParam("dryRun", ObjectSerializer.serialize(dryRun, "string", ""));
        }

        // Query Params
        if (fieldManager !== undefined) {
            requestContext.setQueryParam("fieldManager", ObjectSerializer.serialize(fieldManager, "string", ""));
        }


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(body, "any", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        let authMethod = null;
        // Apply auth methods
        authMethod = _config.authMethods["BearerToken"]
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * replace status of the specified namespace scoped custom object
     * @param group the custom resource&#39;s group
     * @param version the custom resource&#39;s version
     * @param namespace The custom resource&#39;s namespace
     * @param plural the custom resource&#39;s plural name. For TPRs this would be lowercase plural kind.
     * @param name the custom object&#39;s name
     * @param body 
     * @param dryRun When present, indicates that modifications should not be persisted. An invalid or unrecognized dryRun directive will result in an error response and no further processing of the request. Valid values are: - All: all dry run stages will be processed
     * @param fieldManager fieldManager is a name associated with the actor or entity that is making these changes. The value must be less than or 128 characters long, and only contain printable characters, as defined by https://golang.org/pkg/unicode/#IsPrint.
     */
    public async replaceNamespacedCustomObjectStatus(group: string, version: string, namespace: string, plural: string, name: string, body: any, dryRun?: string, fieldManager?: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'group' is not null or undefined
        if (group === null || group === undefined) {
            throw new RequiredError("CustomObjectsApi", "replaceNamespacedCustomObjectStatus", "group");
        }


        // verify required parameter 'version' is not null or undefined
        if (version === null || version === undefined) {
            throw new RequiredError("CustomObjectsApi", "replaceNamespacedCustomObjectStatus", "version");
        }


        // verify required parameter 'namespace' is not null or undefined
        if (namespace === null || namespace === undefined) {
            throw new RequiredError("CustomObjectsApi", "replaceNamespacedCustomObjectStatus", "namespace");
        }


        // verify required parameter 'plural' is not null or undefined
        if (plural === null || plural === undefined) {
            throw new RequiredError("CustomObjectsApi", "replaceNamespacedCustomObjectStatus", "plural");
        }


        // verify required parameter 'name' is not null or undefined
        if (name === null || name === undefined) {
            throw new RequiredError("CustomObjectsApi", "replaceNamespacedCustomObjectStatus", "name");
        }


        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new RequiredError("CustomObjectsApi", "replaceNamespacedCustomObjectStatus", "body");
        }




        // Path Params
        const localVarPath = '/apis/{group}/{version}/namespaces/{namespace}/{plural}/{name}/status'
            .replace('{' + 'group' + '}', encodeURIComponent(String(group)))
            .replace('{' + 'version' + '}', encodeURIComponent(String(version)))
            .replace('{' + 'namespace' + '}', encodeURIComponent(String(namespace)))
            .replace('{' + 'plural' + '}', encodeURIComponent(String(plural)))
            .replace('{' + 'name' + '}', encodeURIComponent(String(name)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.PUT);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (dryRun !== undefined) {
            requestContext.setQueryParam("dryRun", ObjectSerializer.serialize(dryRun, "string", ""));
        }

        // Query Params
        if (fieldManager !== undefined) {
            requestContext.setQueryParam("fieldManager", ObjectSerializer.serialize(fieldManager, "string", ""));
        }


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(body, "any", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        let authMethod = null;
        // Apply auth methods
        authMethod = _config.authMethods["BearerToken"]
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

}

export class CustomObjectsApiResponseProcessor {

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to createClusterCustomObject
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async createClusterCustomObject(response: ResponseContext): Promise<any > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("201", response.httpStatusCode)) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            throw new ApiException<undefined>(response.httpStatusCode, "Unauthorized", undefined, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }

        throw new ApiException<string | Buffer | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to createNamespacedCustomObject
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async createNamespacedCustomObject(response: ResponseContext): Promise<any > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("201", response.httpStatusCode)) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            throw new ApiException<undefined>(response.httpStatusCode, "Unauthorized", undefined, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }

        throw new ApiException<string | Buffer | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to deleteClusterCustomObject
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async deleteClusterCustomObject(response: ResponseContext): Promise<any > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            throw new ApiException<undefined>(response.httpStatusCode, "Unauthorized", undefined, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }

        throw new ApiException<string | Buffer | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to deleteCollectionClusterCustomObject
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async deleteCollectionClusterCustomObject(response: ResponseContext): Promise<any > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            throw new ApiException<undefined>(response.httpStatusCode, "Unauthorized", undefined, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }

        throw new ApiException<string | Buffer | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to deleteCollectionNamespacedCustomObject
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async deleteCollectionNamespacedCustomObject(response: ResponseContext): Promise<any > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            throw new ApiException<undefined>(response.httpStatusCode, "Unauthorized", undefined, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }

        throw new ApiException<string | Buffer | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to deleteNamespacedCustomObject
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async deleteNamespacedCustomObject(response: ResponseContext): Promise<any > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            throw new ApiException<undefined>(response.httpStatusCode, "Unauthorized", undefined, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }

        throw new ApiException<string | Buffer | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to getClusterCustomObject
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async getClusterCustomObject(response: ResponseContext): Promise<any > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            throw new ApiException<undefined>(response.httpStatusCode, "Unauthorized", undefined, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }

        throw new ApiException<string | Buffer | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to getClusterCustomObjectScale
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async getClusterCustomObjectScale(response: ResponseContext): Promise<any > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            throw new ApiException<undefined>(response.httpStatusCode, "Unauthorized", undefined, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }

        throw new ApiException<string | Buffer | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to getClusterCustomObjectStatus
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async getClusterCustomObjectStatus(response: ResponseContext): Promise<any > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            throw new ApiException<undefined>(response.httpStatusCode, "Unauthorized", undefined, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }

        throw new ApiException<string | Buffer | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to getNamespacedCustomObject
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async getNamespacedCustomObject(response: ResponseContext): Promise<any > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            throw new ApiException<undefined>(response.httpStatusCode, "Unauthorized", undefined, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }

        throw new ApiException<string | Buffer | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to getNamespacedCustomObjectScale
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async getNamespacedCustomObjectScale(response: ResponseContext): Promise<any > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            throw new ApiException<undefined>(response.httpStatusCode, "Unauthorized", undefined, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }

        throw new ApiException<string | Buffer | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to getNamespacedCustomObjectStatus
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async getNamespacedCustomObjectStatus(response: ResponseContext): Promise<any > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            throw new ApiException<undefined>(response.httpStatusCode, "Unauthorized", undefined, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }

        throw new ApiException<string | Buffer | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to listClusterCustomObject
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async listClusterCustomObject(response: ResponseContext): Promise<any > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            throw new ApiException<undefined>(response.httpStatusCode, "Unauthorized", undefined, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }

        throw new ApiException<string | Buffer | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to listNamespacedCustomObject
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async listNamespacedCustomObject(response: ResponseContext): Promise<any > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            throw new ApiException<undefined>(response.httpStatusCode, "Unauthorized", undefined, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }

        throw new ApiException<string | Buffer | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to patchClusterCustomObject
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async patchClusterCustomObject(response: ResponseContext): Promise<any > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            throw new ApiException<undefined>(response.httpStatusCode, "Unauthorized", undefined, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }

        throw new ApiException<string | Buffer | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to patchClusterCustomObjectScale
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async patchClusterCustomObjectScale(response: ResponseContext): Promise<any > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            throw new ApiException<undefined>(response.httpStatusCode, "Unauthorized", undefined, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }

        throw new ApiException<string | Buffer | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to patchClusterCustomObjectStatus
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async patchClusterCustomObjectStatus(response: ResponseContext): Promise<any > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            throw new ApiException<undefined>(response.httpStatusCode, "Unauthorized", undefined, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }

        throw new ApiException<string | Buffer | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to patchNamespacedCustomObject
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async patchNamespacedCustomObject(response: ResponseContext): Promise<any > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            throw new ApiException<undefined>(response.httpStatusCode, "Unauthorized", undefined, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }

        throw new ApiException<string | Buffer | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to patchNamespacedCustomObjectScale
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async patchNamespacedCustomObjectScale(response: ResponseContext): Promise<any > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            throw new ApiException<undefined>(response.httpStatusCode, "Unauthorized", undefined, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }

        throw new ApiException<string | Buffer | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to patchNamespacedCustomObjectStatus
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async patchNamespacedCustomObjectStatus(response: ResponseContext): Promise<any > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            throw new ApiException<undefined>(response.httpStatusCode, "Unauthorized", undefined, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }

        throw new ApiException<string | Buffer | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to replaceClusterCustomObject
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async replaceClusterCustomObject(response: ResponseContext): Promise<any > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            throw new ApiException<undefined>(response.httpStatusCode, "Unauthorized", undefined, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }

        throw new ApiException<string | Buffer | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to replaceClusterCustomObjectScale
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async replaceClusterCustomObjectScale(response: ResponseContext): Promise<any > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }
        if (isCodeInRange("201", response.httpStatusCode)) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            throw new ApiException<undefined>(response.httpStatusCode, "Unauthorized", undefined, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }

        throw new ApiException<string | Buffer | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to replaceClusterCustomObjectStatus
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async replaceClusterCustomObjectStatus(response: ResponseContext): Promise<any > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }
        if (isCodeInRange("201", response.httpStatusCode)) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            throw new ApiException<undefined>(response.httpStatusCode, "Unauthorized", undefined, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }

        throw new ApiException<string | Buffer | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to replaceNamespacedCustomObject
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async replaceNamespacedCustomObject(response: ResponseContext): Promise<any > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            throw new ApiException<undefined>(response.httpStatusCode, "Unauthorized", undefined, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }

        throw new ApiException<string | Buffer | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to replaceNamespacedCustomObjectScale
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async replaceNamespacedCustomObjectScale(response: ResponseContext): Promise<any > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }
        if (isCodeInRange("201", response.httpStatusCode)) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            throw new ApiException<undefined>(response.httpStatusCode, "Unauthorized", undefined, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }

        throw new ApiException<string | Buffer | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to replaceNamespacedCustomObjectStatus
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async replaceNamespacedCustomObjectStatus(response: ResponseContext): Promise<any > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }
        if (isCodeInRange("201", response.httpStatusCode)) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            throw new ApiException<undefined>(response.httpStatusCode, "Unauthorized", undefined, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: any = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "any", ""
            ) as any;
            return body;
        }

        throw new ApiException<string | Buffer | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

}
