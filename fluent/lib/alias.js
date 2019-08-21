'use strict'

// We support the full names and all the abbbreviated aliases:
//   http://kubernetes.io/docs/user-guide/kubectl-overview/
// and anything else we think is useful.
const resourceAliases = {
  clusterroles: [],
  clusterrolebindings: [],
  componentstatuses: ['cs'],
  configmaps: ['cm'],
  cronjobs: [],
  customresourcedefinitions: ['crd'],
  daemonsets: ['ds'],
  deployments: ['deploy'],
  events: ['ev'],
  endpoints: ['ep'],
  horizontalpodautoscalers: ['hpa'],
  ingresses: ['ing'],
  jobs: [],
  limitranges: ['limits'],
  namespaces: ['ns'],
  nodes: ['no'],
  persistentvolumes: ['pv'],
  persistentvolumeclaims: ['pvc'],
  // Deprecated name of statefulsets in kubernetes 1.4
  petsets: [],
  pods: ['po'],
  replicationcontrollers: ['rc'],
  replicasets: ['rs'],
  resourcequotas: ['quota'],
  roles: [],
  rolebindings: [],
  // Deprecated name of cronjobs in kubernetes 1.4
  scheduledjobs: [],
  secrets: [],
  serviceaccounts: [],
  services: ['svc'],
  statefulsets: [],
  // Deprecated name of customresourcedefinition in kubernetes 1.7
  thirdpartyresources: []
}

const esPlurals = {
  componentstatuses: true,
  ingresses: true
}

const excludeFromAliasing = {
  apis: true,
  status: true
}

module.exports = function (resourceType) {
  let aliases = [resourceType]
  if (resourceAliases[resourceType]) {
    aliases = aliases.concat(resourceAliases[resourceType])
  }

  //
  // NOTE(sbw): try to catch things that shouldn't have singular aliases. This
  // fails on some relatively common resources, like "status".
  //
  if ((resourceType.slice(-1) !== 's') || (resourceType in excludeFromAliasing)) {
    return aliases
  }

  const trimLength = esPlurals[resourceType] ? 2 : 1
  const single = resourceType.substr(0, resourceType.length - trimLength)
  aliases.push(single)
  return aliases
}
