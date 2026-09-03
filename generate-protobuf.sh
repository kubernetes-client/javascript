#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROTO_ROOT="${ROOT_DIR}/src/proto/generated"
WORK_DIR="$(mktemp -d /tmp/k8s-proto.XXXXXX)"
RELEASE="${1:-master}"

FILES=(
    "k8s.io/apimachinery/pkg/api/resource/generated.proto"
    "k8s.io/apimachinery/pkg/apis/meta/v1/generated.proto"
    "k8s.io/apimachinery/pkg/runtime/generated.proto"
    "k8s.io/apimachinery/pkg/runtime/schema/generated.proto"
    "k8s.io/apimachinery/pkg/util/intstr/generated.proto"
    "k8s.io/api/rbac/v1/generated.proto"
    "k8s.io/api/networking/v1/generated.proto"
    "k8s.io/api/node/v1/generated.proto"
    "k8s.io/api/admissionregistration/v1/generated.proto"
    "k8s.io/api/apidiscovery/v2beta1/generated.proto"
    "k8s.io/api/apidiscovery/v2/generated.proto"
    "k8s.io/api/apiserverinternal/v1alpha1/generated.proto"
    "k8s.io/api/scheduling/v1/generated.proto"
    "k8s.io/api/scheduling/v1alpha3/generated.proto"
    "k8s.io/api/storage/v1/generated.proto"
    "k8s.io/api/storagemigration/v1beta1/generated.proto"
    "k8s.io/api/batch/v1/generated.proto"
    "k8s.io/api/apps/v1/generated.proto"
    "k8s.io/api/authentication/v1/generated.proto"
    "k8s.io/api/admission/v1/generated.proto"
    "k8s.io/api/policy/v1/generated.proto"
    "k8s.io/api/resource/v1/generated.proto"
    "k8s.io/api/core/v1/generated.proto"
    "k8s.io/api/discovery/v1/generated.proto"
    "k8s.io/api/events/v1/generated.proto"
    "k8s.io/api/autoscaling/v1/generated.proto"
    "k8s.io/api/autoscaling/v2/generated.proto"
    "k8s.io/api/extensions/v1beta1/generated.proto"
    "k8s.io/api/flowcontrol/v1/generated.proto"
    "k8s.io/api/certificates/v1/generated.proto"
    "k8s.io/api/coordination/v1/generated.proto"
    "k8s.io/api/imagepolicy/v1alpha1/generated.proto"
    "k8s.io/api/authorization/v1/generated.proto"
    "k8s.io/apiextensions-apiserver/pkg/apis/apiextensions/v1/generated.proto"
)

cleanup() {
    rm -rf "${WORK_DIR}"
}
trap cleanup EXIT

fetch_proto() {
    local file_path="$1"

    if [[ "${file_path}" == k8s.io/apimachinery/* ]]; then
        local apimachinery_rel="${file_path#k8s.io/apimachinery/}"
        echo "https://raw.githubusercontent.com/kubernetes/apimachinery/${RELEASE}/${apimachinery_rel}"
        return
    fi

    if [[ "${file_path}" == k8s.io/apiextensions-apiserver/* ]]; then
        local apiextensions_rel="${file_path#k8s.io/apiextensions-apiserver/}"
        echo "https://raw.githubusercontent.com/kubernetes/apiextensions-apiserver/master/${apiextensions_rel}"
        return
    fi

    local api_rel="${file_path#k8s.io/api/}"
    echo "https://raw.githubusercontent.com/kubernetes/api/master/${api_rel}"
}

echo "Downloading Kubernetes proto files (release=${RELEASE})"

PROTO_FILES=()
for file in "${FILES[@]}"; do
    output_path="${WORK_DIR}/${file}"
    mkdir -p "$(dirname "${output_path}")"

    source_url="$(fetch_proto "${file}")"
    curl --fail -sSL "${source_url}" -o "${output_path}"
    PROTO_FILES+=("${output_path}")
done

rm -rf "${PROTO_ROOT}"
mkdir -p "${PROTO_ROOT}"

protoc -I"${WORK_DIR}" \
    --plugin="protoc-gen-ts_proto=${ROOT_DIR}/node_modules/.bin/protoc-gen-ts_proto" \
    --ts_proto_out="${PROTO_ROOT}" \
    --ts_proto_opt=esModuleInterop=true,outputServices=none,useOptionals=none,exportCommonSymbols=false,importSuffix=.js \
    "${PROTO_FILES[@]}"

echo "Generated protobuf TypeScript files under ${PROTO_ROOT}"
