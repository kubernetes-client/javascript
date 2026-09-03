#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROTO_ROOT="${ROOT_DIR}/src/proto/generated"
RELEASE="${1:-master}"
WORK_DIR="$(mktemp -d /tmp/k8s-proto.XXXXXX)"
UPSTREAM_PROTO_DIR="${WORK_DIR}/gen-proto"
UPSTREAM_BASE_URL="https://raw.githubusercontent.com/kubernetes-client/gen/master/proto"

cleanup() {
    rm -rf "${WORK_DIR}"
}
trap cleanup EXIT

mkdir -p "${UPSTREAM_PROTO_DIR}"

curl --fail -sSL "${UPSTREAM_BASE_URL}/generate.sh" -o "${UPSTREAM_PROTO_DIR}/generate.sh"
curl --fail -sSL "${UPSTREAM_BASE_URL}/dependencies.sh" -o "${UPSTREAM_PROTO_DIR}/dependencies.sh"
curl --fail -sSL "${UPSTREAM_BASE_URL}/install.sh" -o "${UPSTREAM_PROTO_DIR}/install.sh"
chmod +x "${UPSTREAM_PROTO_DIR}/generate.sh" "${UPSTREAM_PROTO_DIR}/dependencies.sh" "${UPSTREAM_PROTO_DIR}/install.sh"

if ! command -v protoc >/dev/null 2>&1; then
    (
        cd "${UPSTREAM_PROTO_DIR}"
        ./install.sh
    )
    PROTOC_BIN="${UPSTREAM_PROTO_DIR}/bin/protoc"
else
    PROTOC_BIN="$(command -v protoc)"
fi

if [[ ! -x "${ROOT_DIR}/node_modules/.bin/protoc-gen-ts_proto" ]]; then
    echo "Missing ts-proto plugin at ${ROOT_DIR}/node_modules/.bin/protoc-gen-ts_proto. Run npm ci first." >&2
    exit 1
fi

(
    cd "${UPSTREAM_PROTO_DIR}"
    ./dependencies.sh "${RELEASE}"
)

fetch_missing_import() {
    local imported_file="$1"
    local destination="${UPSTREAM_PROTO_DIR}/${imported_file}"
    local source_url

    if [[ "${imported_file}" == k8s.io/apimachinery/* ]]; then
        source_url="https://raw.githubusercontent.com/kubernetes/apimachinery/${RELEASE}/${imported_file#k8s.io/apimachinery/}"
    elif [[ "${imported_file}" == k8s.io/apiextensions-apiserver/* ]]; then
        source_url="https://raw.githubusercontent.com/kubernetes/apiextensions-apiserver/master/${imported_file#k8s.io/apiextensions-apiserver/}"
    elif [[ "${imported_file}" == k8s.io/api/* ]]; then
        source_url="https://raw.githubusercontent.com/kubernetes/api/master/${imported_file#k8s.io/api/}"
    else
        return
    fi

    mkdir -p "$(dirname "${destination}")"
    curl --fail -sSL "${source_url}" -o "${destination}"
}

while true; do
    mapfile -t imported_files < <(
        find "${UPSTREAM_PROTO_DIR}/k8s.io" -name 'generated.proto' -type f -print0 \
            | xargs -0 grep -hoE '^import "k8s\.io/.+generated\.proto";' \
            | sed -E 's/^import "(k8s\.io\/.+)";$/\1/' \
            | sort -u
    )

    missing_count=0
    for imported_file in "${imported_files[@]}"; do
        if [[ ! -f "${UPSTREAM_PROTO_DIR}/${imported_file}" ]]; then
            fetch_missing_import "${imported_file}"
            ((missing_count += 1))
        fi
    done

    if [[ "${missing_count}" -eq 0 ]]; then
        break
    fi
done

mapfile -t proto_files < <(grep -oE 'k8s\.io[^ ;"]+generated\.proto' "${UPSTREAM_PROTO_DIR}/generate.sh")

if [[ "${#proto_files[@]}" -eq 0 ]]; then
    echo "Failed to discover proto files from upstream generate.sh" >&2
    exit 1
fi

rm -rf "${PROTO_ROOT}"
mkdir -p "${PROTO_ROOT}"

proto_paths=()
for file in "${proto_files[@]}"; do
    proto_paths+=("${UPSTREAM_PROTO_DIR}/${file}")
done

"${PROTOC_BIN}" -I"${UPSTREAM_PROTO_DIR}" \
    --plugin="protoc-gen-ts_proto=${ROOT_DIR}/node_modules/.bin/protoc-gen-ts_proto" \
    --ts_proto_out="${PROTO_ROOT}" \
    --ts_proto_opt=esModuleInterop=true,outputServices=none,useOptionals=none,exportCommonSymbols=false,importSuffix=.js \
    "${proto_paths[@]}"

echo "Generated protobuf TypeScript files under ${PROTO_ROOT}"
