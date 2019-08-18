#!/bin/bash

set -o errexit
set -o nounset
set -o pipefail

if [[ -z ${GEN_ROOT:-} ]]; then
    TEMP_FOLDER=$(mktemp -d)
    trap "rm -rf ${TEMP_FOLDER}" EXIT SIGINT

    GEN_ROOT="${TEMP_FOLDER}/gen"
    echo ">>> Cloning gen repo"
    git clone --recursive https://github.com/kubernetes-client/gen.git "${GEN_ROOT}"
    if [[ ! -z ${GEN_COMMIT:-} ]]; then
        (cd ${GEN_ROOT} && git checkout ${GEN_COMMIT})
    fi
else
    echo ">>> Reusing gen repo at ${GEN_ROOT}"
fi

TYPESCRIPT="${GEN_ROOT}/openapi/typescript.sh"
echo ">>> Running ${TYPESCRIPT}"
${TYPESCRIPT} src/gen settings
echo ">>> Done."
