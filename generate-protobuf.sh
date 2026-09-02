#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROTO_ROOT="${ROOT_DIR}/src/proto/generated"
WORK_DIR="$(mktemp -d /tmp/k8s-proto.XXXXXX)"

cleanup() {
    rm -rf "${WORK_DIR}"
}
trap cleanup EXIT

mkdir -p "${WORK_DIR}/k8s.io/apimachinery/pkg/runtime/schema"
mkdir -p "${WORK_DIR}/k8s.io/apimachinery/pkg/runtime"
mkdir -p "${WORK_DIR}/k8s.io/apimachinery/pkg/apis/meta/v1"

curl --fail -sSL \
    https://raw.githubusercontent.com/kubernetes/apimachinery/master/pkg/runtime/generated.proto \
    -o "${WORK_DIR}/k8s.io/apimachinery/pkg/runtime/generated.proto"

curl --fail -sSL \
    https://raw.githubusercontent.com/kubernetes/apimachinery/master/pkg/runtime/schema/generated.proto \
    -o "${WORK_DIR}/k8s.io/apimachinery/pkg/runtime/schema/generated.proto"

curl --fail -sSL \
    https://raw.githubusercontent.com/kubernetes/apimachinery/master/pkg/apis/meta/v1/generated.proto \
    -o "${WORK_DIR}/k8s.io/apimachinery/pkg/apis/meta/v1/generated.proto"

rm -rf "${PROTO_ROOT}"
mkdir -p "${PROTO_ROOT}"

protoc -I"${WORK_DIR}" \
    --plugin="protoc-gen-ts_proto=${ROOT_DIR}/node_modules/.bin/protoc-gen-ts_proto" \
    --ts_proto_out="${PROTO_ROOT}" \
    --ts_proto_opt=esModuleInterop=true,outputServices=none,useOptionals=none,exportCommonSymbols=false,importSuffix=.js \
    "${WORK_DIR}/k8s.io/apimachinery/pkg/runtime/generated.proto" \
    "${WORK_DIR}/k8s.io/apimachinery/pkg/runtime/schema/generated.proto" \
    "${WORK_DIR}/k8s.io/apimachinery/pkg/apis/meta/v1/generated.proto"

echo "Generated protobuf TypeScript files under ${PROTO_ROOT}"
