# Client-go Gap Analysis and Implementation Roadmap

## Purpose

This document compares the Kubernetes JavaScript client with
[`kubernetes/client-go`](https://github.com/kubernetes/client-go) and uses
[`kubernetes-client/java`](https://github.com/kubernetes-client/java) as an additional source of
cross-language API designs. It identifies the highest-value gaps and proposes an implementation order.

The goal is not complete feature-for-feature parity. The goal is to provide the reusable capabilities
needed to build reliable Kubernetes controllers and automation in Node.js while preserving idiomatic
TypeScript APIs.

## Summary

The JavaScript client already has broad generated API coverage and strong Node.js-specific functionality:

- Typed clients and models for current built-in Kubernetes APIs
- Kubeconfig, in-cluster, token, certificate, OIDC, and exec authentication
- HTTP, HTTPS, and SOCKS proxy support
- Generic object operations with runtime resource lookup
- Watch and basic informer/cache support
- Exec, attach, logs, copy, and port forwarding
- YAML, patch, metrics, and `top` helpers

The largest gaps are not in generated resource coverage. They are in the infrastructure needed by
long-running controllers:

1. Reliable LIST/WATCH recovery
2. Discovery and REST mapping
3. Dynamic resource clients
4. Shared informers, indexes, listers, and workqueues
5. Request throttling, retries, and backoff
6. Test fakes

Before adding those capabilities, several correctness and lifecycle issues in existing helpers should be
resolved.

## Comparison baseline

This analysis used repository snapshots available on 2026-09-01:

- JavaScript client: `2333dbda76bbb6f021255acc5c5beb709f8de49d`
- client-go: `d4060b1a90a3406630250def86d933dcfe3683ea`
- Java client: `7601bd2e55d392c8966c7694be396d4393045a8f`

The generated JavaScript API is already current and substantial. Consequently, generated model count or
individual built-in API differences are not used as major prioritization criteria.

## Prioritization criteria

Items are ranked using the following considerations:

- **User impact:** How many applications benefit from the feature?
- **Reliability:** Does the gap cause missed events, overload, incorrect results, or unrecoverable clients?
- **Foundation value:** Does the work unblock several later features?
- **Compatibility:** Does it provide behavior Kubernetes users expect from official clients?
- **Implementation cost and risk:** Can the feature be delivered incrementally and tested reliably?

Effort estimates are relative:

- **S:** Localized change
- **M:** Several modules or a new focused abstraction
- **L:** New subsystem or significant integration work
- **XL:** Generator, protocol, or controller-runtime-scale work

## Existing capability matrix

| Area                 | Current JavaScript support                            | Important gap                                                                  |
| -------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------ |
| Typed APIs           | Strong generated coverage                             | No major strategic gap                                                         |
| Generic resources    | CRUD/list/patch using object GVK                      | No resource-bound GVR client, generic watch, or arbitrary subresources         |
| Discovery            | Exact group/version resource lookup                   | No cluster-wide discovery, preferred versions, partial results, or REST mapper |
| Server-side apply    | Low-level apply patch content type                    | No explicit `apply()` API or generated apply configurations                    |
| Watch                | Streaming watch with bookmarks and inactivity timeout | Fixed policy, silent parse failures, and limited recovery                      |
| Informers            | List/watch cache and event callbacks                  | No sync barrier, indexes, listers, transforms, resync, or sharing              |
| Workqueues           | None                                                  | No controller-safe deduplicating or rate-limited queue                         |
| HTTP reliability     | Middleware and abort primitives                       | No client-wide QPS limit, `Retry-After`, or conflict retry helper              |
| Authentication       | Broad kubeconfig authentication support               | Exec protocol and cache isolation gaps                                         |
| Testing              | HTTP/WebSocket mocks and integration tests            | No exported object tracker or fake Kubernetes clients                          |
| Pagination           | Raw `limit` and `continue` parameters                 | No page or item iterator                                                       |
| Leader election      | Lease API is generated                                | No leader-election implementation                                              |
| Transport efficiency | JSON                                                  | No protobuf or metadata-only client                                            |

## Prioritized implementation plan

### P0: Correctness and lifecycle fixes

**Impact:** Critical  
**Effort:** S-M

Resolve known correctness problems before building new controller infrastructure:

- Make informers recover from retryable list and watch failures. Most errors currently emit an error and
  terminate the informer in [`src/cache.ts`](src/cache.ts).
- Define consistent completion, cancellation, close, and error behavior across watch, logs, exec, attach,
  copy, and port forwarding.
- Make copy operations resolve only when transfer and remote command execution are complete, and reject on
  stream, tar, or non-zero remote-exit failures.
- Fix the log `pretty` option being populated from `follow` in [`src/log.ts`](src/log.ts).
- Fix pod memory-request aggregation in [`src/top.ts`](src/top.ts).
- Correct OIDC expiration handling and isolate OIDC state by credential identity.
- Key file-token and exec credential caches by the complete configuration identity rather than a shared
  authenticator field or username alone.

Each fix should include a regression test. Streaming fixes should also include real-cluster integration
coverage where unit mocks cannot verify lifecycle behavior.

### P0: Common errors, retries, backoff, and rate limiting

**Impact:** Critical  
**Effort:** M-L

Introduce shared reliability primitives:

- A normalized Kubernetes API error carrying HTTP status, Kubernetes status/reason, response headers, and
  retry classification
- Abort-aware exponential backoff with jitter
- Injectable clocks and timers for deterministic tests
- Configurable QPS and burst token-bucket limiting
- `Retry-After` support for `429` and appropriate `5xx` responses
- Safe retry of idempotent operations with replayable request bodies
- A `retryOnConflict()` helper that re-runs a read-modify-write callback rather than resending stale data
- Configurable request timeouts

[`client-go/rest/with_retry.go`](https://github.com/kubernetes/client-go/blob/d4060b1a90a3406630250def86d933dcfe3683ea/rest/with_retry.go)
should define expected retry behavior. The Java client's small
[`RetryUtils`](https://github.com/kubernetes-client/java/blob/7601bd2e55d392c8966c7694be396d4393045a8f/util/src/main/java/io/kubernetes/client/util/RetryUtils.java)
is a useful API model for conflict retries.

Retries must not silently replay arbitrary writes. HTTP request throttling must also remain separate from
controller work-item rate limiting.

### P0: Reliable reflector and typed watch

**Impact:** Critical  
**Effort:** L

Evolve the current watch and `ListWatch` implementation into a reliable reflector foundation:

- Typed `WatchEvent<T>` discriminated unions
- An `AsyncIterable<WatchEvent<T>>` interface
- `AbortSignal` support for the full operation lifetime
- Configurable connection, inactivity, and server-side timeouts
- Explicit malformed-event and Kubernetes `ERROR` event handling
- Jittered reconnection for transport errors, `429`, and retryable `5xx` responses
- Correct `410 Gone` relisting
- Bookmark support
- `sendInitialEvents`/watch-list support when the server supports it
- Paginated initial LIST operations
- `hasSynced()` and `waitForSync()` synchronization boundaries

The behavioral reference should be
[`client-go/tools/cache/Reflector`](https://github.com/kubernetes/client-go/blob/d4060b1a90a3406630250def86d933dcfe3683ea/tools/cache/reflector.go),
while the public API should use promises, async iterators, and abort signals rather than Go channels.

### P0: Discovery client and REST mapper

**Impact:** Very high  
**Effort:** L

The existing `KubernetesObjectApi` discovers one exact group/version at a time and caches the result
internally. Add public discovery and mapping APIs with:

- `GroupVersionKind` and `GroupVersionResource` types
- Core and grouped API discovery
- Aggregated discovery v2 negotiation
- Preferred-version and scope information
- GVK-to-GVR and GVR-to-GVK mapping
- Plural, singular, and subresource metadata
- Memory caching and explicit invalidation
- Retry after stale mappings, including CRD changes
- Partial results accompanied by per-group discovery failures

The Java client's
[`Discovery`](https://github.com/kubernetes-client/java/blob/7601bd2e55d392c8966c7694be396d4393045a8f/util/src/main/java/io/kubernetes/client/Discovery.java)
is a concise public API reference. `client-go`'s
[`DeferredDiscoveryRESTMapper`](https://github.com/kubernetes/client-go/blob/d4060b1a90a3406630250def86d933dcfe3683ea/restmapper/discovery.go)
should guide invalidation and stale-cache behavior.

A disk cache is not required initially. It should be an optional adapter if demand from short-lived CLI
applications warrants one.

### P1: Resource-bound dynamic and generic client

**Impact:** Very high  
**Effort:** M-L

Build a resource-bound client around GVR rather than continuing to extend the positional methods on
`KubernetesObjectApi`:

- `client.resource(gvr)`
- `resource.namespace(name)`
- Uniform create, get, list, update, patch, delete, and delete-collection operations
- Watch and informer creation
- Server-side apply
- `status`, `scale`, and arbitrary subresources
- Preservation of unknown fields in unstructured objects
- Request option objects instead of long positional argument lists

The Java client's
[`GenericKubernetesApi`](https://github.com/kubernetes-client/java/blob/7601bd2e55d392c8966c7694be396d4393045a8f/util/src/main/java/io/kubernetes/client/util/generic/GenericKubernetesApi.java)
provides useful ergonomics. `client-go`'s
[`dynamic.Interface`](https://github.com/kubernetes/client-go/blob/d4060b1a90a3406630250def86d933dcfe3683ea/dynamic/interface.go)
defines the expected operation set.

A raw GVR client can be delivered before the REST mapper. The mapper can subsequently provide GVK-based
convenience.

### P1: Pagination helpers

**Impact:** High  
**Effort:** S-M

Raw list operations already expose `limit` and `continue`, but every caller must implement token handling.
Add:

- `pages(options): AsyncIterable<KubernetesListObject<T>>`
- `listAll(options): AsyncIterable<T>`
- Immediate cancellation via `AbortSignal`
- Preservation of selectors and resource-version semantics
- Explicit continuation-token expiration behavior

The Java client's
[`Pager`](https://github.com/kubernetes-client/java/blob/7601bd2e55d392c8966c7694be396d4393045a8f/extended/src/main/java/io/kubernetes/client/extended/pager/Pager.java)
is a proven, compact design reference.

### P1: Shared informers, indexers, and listers

**Impact:** Very high  
**Effort:** XL

Build this incrementally on the reliable reflector:

1. `hasSynced()` and `waitForSync()`
2. Serialized event processing and delete tombstones
3. Built-in namespace index
4. User-defined `addIndexers()` and `byIndex()`
5. Typed and generic listers
6. Transform hooks
7. Shared informer factory keyed by resource and list/watch options
8. Optional handler resync

The Java client's
[`SharedInformerFactory`](https://github.com/kubernetes-client/java/blob/7601bd2e55d392c8966c7694be396d4393045a8f/util/src/main/java/io/kubernetes/client/informer/SharedInformerFactory.java)
and
[`Indexer`](https://github.com/kubernetes-client/java/blob/7601bd2e55d392c8966c7694be396d4393045a8f/util/src/main/java/io/kubernetes/client/informer/cache/Indexer.java)
provide useful public shapes. Event ordering, synchronization, and deletion behavior should remain
compatible with client-go expectations.

### P1: Controller workqueue

**Impact:** Very high  
**Effort:** M-L

Add a controller-safe workqueue independent of HTTP throttling:

- Key deduplication
- `add()`, `addAfter()`, and `addRateLimited()`
- `get()`, `done()`, and `forget()`
- Per-item retry counts
- Exponential per-item delay combined with an overall token bucket
- Graceful shutdown and drain
- Injectable clock and `AbortSignal`

The Java client's
[`DefaultRateLimitingQueue`](https://github.com/kubernetes-client/java/blob/7601bd2e55d392c8966c7694be396d4393045a8f/extended/src/main/java/io/kubernetes/client/extended/workqueue/DefaultRateLimitingQueue.java)
is a suitable public API starting point. Go implementation details such as channels and goroutine-specific
synchronization should not be exposed.

### P1: Exported fake clients

**Impact:** High  
**Effort:** L

Provide an official testing package with:

- An in-memory object tracker keyed by GVR, namespace, and name
- A dynamic fake client
- Generated-client-compatible adapters where practical
- Action recording
- Reactors or request interceptors
- Label-selector filtering
- Deterministic watch events
- Documented resource-version behavior

Build the fake on the same dynamic-client and watch contracts so it does not become an unrelated second
implementation. The fake should be documented as a controller unit-testing tool, not a complete API-server
emulator.

### P1: First-class server-side apply

**Impact:** High  
**Effort:** S initially; XL for full generated apply configurations

Wire-level support exists through `PatchStrategy.ServerSideApply`, but users must manually coordinate the
content type, field manager, force option, and body serialization. Add:

- `apply(resource, { fieldManager, force?, dryRun? })`
- `applyStatus(...)`
- Correct JSON/YAML apply serialization
- Namespaced, cluster-scoped, and custom-resource tests
- Correct examples and documentation

The Java client's
[`ServerSideApply`](https://github.com/kubernetes-client/java/blob/7601bd2e55d392c8966c7694be396d4393045a8f/util/src/main/java/io/kubernetes/client/util/ServerSideApply.java)
demonstrates the value of centralizing these options.

Generated typed apply configurations and managed-field extraction should be separate later projects. The
initial explicit API delivers most usability benefits without blocking on generator work.

### P2: Additional production-controller capabilities

#### Lease-based leader election

Implement standard Lease acquisition, renewal, release, jitter, deadlines, callbacks, health reporting,
and abort behavior. This depends on conflict retries, request timeouts, and an injectable clock. Alpha
coordinated leader election should not block the first release.

#### Exec credential and impersonation conformance

Complete support for:

- `KUBERNETES_EXEC_INFO`
- `interactiveMode`
- `provideClusterInfo`
- Exec credential API-version and kind validation
- Concurrent refresh deduplication
- Credential refresh following `401`
- Impersonation UID, repeated groups, and extras

Repeated impersonation headers may require changing the current single-value header representation.
Legacy Azure and GCP auth-provider implementations should not be expanded; standards-compliant exec
authentication is the preferred path.

#### Unified client builder

Provide one configuration path for generated APIs and handwritten streaming helpers, including:

- Dispatcher and proxy configuration
- Middleware
- Timeouts
- Retry and rate-limit policy
- Credential providers
- Default headers and warning handlers
- Telemetry hooks

#### Instrumentation hooks

Expose backend-neutral hooks for request latency and size, retries, throttling, watch reconnects, informer
lag, queue depth and latency, and leader status. Do not require a specific metrics or tracing implementation.

#### Streaming helper hardening

Add multi-port forwarding and ensure abort/error handling covers the full lifetime of exec, attach, logs,
copy, and forwarding operations.

### P3: Transport optimization

**Impact:** Workload-dependent  
**Effort:** XL

Evaluate the following only after controller-runtime functionality is mature and representative workloads
have been profiled:

- Metadata-only clients using `PartialObjectMetadata`
- Kubernetes protobuf negotiation and decoding
- Protobuf watch streams with JSON fallback

These can substantially reduce memory, CPU, and bandwidth for high-volume built-in-resource controllers,
but add generator and protocol complexity and do not benefit most CRDs.

## Recommended delivery phases

### Phase 1: Stabilize existing behavior

- Correct lifecycle, aggregation, log-option, and credential-cache defects
- Introduce normalized errors, clocks, backoff, conflict retries, request timeouts, and QPS limiting
- Add focused regression and integration tests

### Phase 2: Establish the generic API foundation

- Add pagination
- Implement the reliable reflector and typed watch API
- Add discovery and REST mapping
- Add the GVR-based dynamic client
- Add explicit server-side apply

### Phase 3: Establish the controller foundation

- Add informer synchronization, tombstones, indexes, and listers
- Add shared informer factories
- Add workqueues and rate limiters
- Publish a complete controller example

### Phase 4: Improve testing and operations

- Add fake clients and object tracking
- Add leader election
- Complete exec authentication and impersonation
- Add unified configuration and instrumentation hooks

### Phase 5: Optimize measured bottlenecks

- Evaluate metadata-only clients
- Evaluate protobuf
- Add optional persistent discovery caching only if short-lived client workloads justify it

## Features not recommended for direct porting

The following client-go or Java designs should not be copied directly:

- **Go concurrency machinery:** Port ordering, deduplication, backpressure, and cancellation contracts using
  promises, async iterators, and `AbortSignal`; do not reproduce goroutines, channels, or mutex layouts.
- **Java reflection and fluent model builders:** TypeScript object literals and structural typing are more
  appropriate.
- **Heuristic pluralization:** Use discovery rather than deriving resource names from kinds.
- **SPDY as a new primary transport:** Keep WebSockets primary. Add SPDY only if supported-cluster evidence
  demonstrates a material compatibility requirement.
- **Mandatory disk discovery caching:** Start with an invalidatable memory cache.
- **Legacy cloud auth-provider expansion:** Prefer the standard exec credential protocol.
- **Kubectl presentation machinery:** Printers, CLI flags, command parsing, and table formatting are outside
  the core client scope.
- **Alpha coordinated leader election in the first release:** Standard Lease election provides the primary
  reusable capability.

## Definition of success

This roadmap should be considered successful when a Node.js controller can:

1. Discover a built-in or custom resource and create a dynamic client without hard-coded pluralization.
2. List and watch that resource continuously through transient errors, compaction, throttling, and API
   discovery changes.
3. Wait for informer synchronization and query cached objects by namespace or secondary index.
4. Enqueue deduplicated keys, apply per-item retries, and shut down cleanly.
5. Use leader election for high availability.
6. Unit-test reconciliation with exported fake clients and deterministic watches.
7. Observe request, watch, informer, and queue behavior through backend-neutral hooks.

That outcome provides the practical controller-building parity that is currently missing while retaining an
idiomatic TypeScript and Node.js design.
