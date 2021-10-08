import {
  APIClient as BareAPIClient,
  Options as BareOptions,
  Plugin,
} from '../src/client/types'
import { Routes } from '../src/plugins/register-endpoints/types'
import { PaginatedResponseData, Response } from '../src/request/types'
import { AuthOptions } from '../src/plugins/auth/types'

interface Options extends BareOptions {
  auth?: AuthOptions
  notice?: boolean
}

type AsyncResponse<T> = Promise<Response<T>>

export interface APIClient extends BareAPIClient {
  hasNextPage(data: PaginatedResponseData<any>): boolean
  getNextPage<T>(data: PaginatedResponseData<T>): Response<T>
  hasPreviousPage(data: PaginatedResponseData<any>): boolean
  getPreviousPage<T>(data: PaginatedResponseData<T>): Response<T>

  registerEndpoints(routes: Routes): void
}

export interface APIClientFactory<APIClient> {
  new (options?: Options): APIClient
  (options?: Options): APIClient

  plugins(plugins: Plugin[]): APIClientFactory<APIClient>
}

export namespace Schema {
  export type Any = any
  export type AnyObject = { [key: string]: any }

  export type Branch = Ref & {
    default_merge_strategy?: string
    merge_strategies?: ('merge_commit' | 'squash' | 'fast_forward')[]
    [k: string]: unknown
  }
  export type Commit = BaseCommit & {
    participants?: Participant[]
    repository?: Repository
    [k: string]: unknown
  }
  export type BaseCommit = Object & {
    author?: Author
    date?: string
    hash?: string
    message?: string
    parents?: BaseCommit[]
    summary?: {
      html?: string
      markup?: 'markdown' | 'creole' | 'plaintext'
      raw?: string
    }
    [k: string]: unknown
  }
  export type Author = Object & {
    raw?: string
    user?: Account
    [k: string]: unknown
  }
  export type Account = Object & {
    account_status?: string
    created_on?: string
    display_name?: string
    has_2fa_enabled?: boolean
    links?: {
      avatar?: {
        href?: string
        name?: string
      }
      followers?: {
        href?: string
        name?: string
      }
      following?: {
        href?: string
        name?: string
      }
      html?: {
        href?: string
        name?: string
      }
      repositories?: {
        href?: string
        name?: string
      }
      self?: {
        href?: string
        name?: string
      }
    }
    nickname?: string
    username?: string
    uuid?: string
    website?: string
    [k: string]: unknown
  }
  export type Participant = Object & {
    approved?: boolean
    participated_on?: string
    role?: 'PARTICIPANT' | 'REVIEWER'
    state?: 'approved' | 'changes_requested' | null
    user?: User
    [k: string]: unknown
  }
  export type User = Account & {
    account_id?: string
    is_staff?: boolean
    [k: string]: unknown
  }
  export type Repository = Object & {
    created_on?: string
    description?: string
    fork_policy?: 'allow_forks' | 'no_public_forks' | 'no_forks'
    full_name?: string
    has_issues?: boolean
    has_wiki?: boolean
    is_private?: boolean
    language?: string
    links?: {
      avatar?: {
        href?: string
        name?: string
      }
      clone?: {
        href?: string
        name?: string
      }[]
      commits?: {
        href?: string
        name?: string
      }
      downloads?: {
        href?: string
        name?: string
      }
      forks?: {
        href?: string
        name?: string
      }
      hooks?: {
        href?: string
        name?: string
      }
      html?: {
        href?: string
        name?: string
      }
      pullrequests?: {
        href?: string
        name?: string
      }
      self?: {
        href?: string
        name?: string
      }
      watchers?: {
        href?: string
        name?: string
      }
    }
    mainbranch?: Branch
    name?: string
    owner?: Account
    parent?: Repository
    project?: Project
    scm?: 'git'
    size?: number
    updated_on?: string
    uuid?: string
    [k: string]: unknown
  }
  export type Project = Object & {
    created_on?: string
    description?: string
    has_publicly_visible_repos?: boolean
    is_private?: boolean
    key?: string
    links?: {
      avatar?: {
        href?: string
        name?: string
      }
      html?: {
        href?: string
        name?: string
      }
    }
    name?: string
    owner?: Team
    updated_on?: string
    uuid?: string
    [k: string]: unknown
  }
  export type Team = Account & {
    [k: string]: unknown
  }
  export type BranchingModel = Object & {
    branch_types?:
      | []
      | [
          {
            kind: 'feature' | 'bugfix' | 'release' | 'hotfix'
            prefix: string
          }
        ]
      | [
          {
            kind: 'feature' | 'bugfix' | 'release' | 'hotfix'
            prefix: string
          },
          {
            kind: 'feature' | 'bugfix' | 'release' | 'hotfix'
            prefix: string
          }
        ]
      | [
          {
            kind: 'feature' | 'bugfix' | 'release' | 'hotfix'
            prefix: string
          },
          {
            kind: 'feature' | 'bugfix' | 'release' | 'hotfix'
            prefix: string
          },
          {
            kind: 'feature' | 'bugfix' | 'release' | 'hotfix'
            prefix: string
          }
        ]
      | [
          {
            kind: 'feature' | 'bugfix' | 'release' | 'hotfix'
            prefix: string
          },
          {
            kind: 'feature' | 'bugfix' | 'release' | 'hotfix'
            prefix: string
          },
          {
            kind: 'feature' | 'bugfix' | 'release' | 'hotfix'
            prefix: string
          },
          {
            kind: 'feature' | 'bugfix' | 'release' | 'hotfix'
            prefix: string
          }
        ]
    development?: {
      branch?: Branch
      name: string
      use_mainbranch: boolean
    }
    production?: {
      branch?: Branch
      name: string
      use_mainbranch: boolean
    }
    [k: string]: unknown
  }
  export type BranchingModelSettings = Object & {
    branch_types?:
      | []
      | [
          {
            enabled?: boolean
            kind: 'feature' | 'bugfix' | 'release' | 'hotfix'
            prefix?: string
          }
        ]
      | [
          {
            enabled?: boolean
            kind: 'feature' | 'bugfix' | 'release' | 'hotfix'
            prefix?: string
          },
          {
            enabled?: boolean
            kind: 'feature' | 'bugfix' | 'release' | 'hotfix'
            prefix?: string
          }
        ]
      | [
          {
            enabled?: boolean
            kind: 'feature' | 'bugfix' | 'release' | 'hotfix'
            prefix?: string
          },
          {
            enabled?: boolean
            kind: 'feature' | 'bugfix' | 'release' | 'hotfix'
            prefix?: string
          },
          {
            enabled?: boolean
            kind: 'feature' | 'bugfix' | 'release' | 'hotfix'
            prefix?: string
          }
        ]
      | [
          {
            enabled?: boolean
            kind: 'feature' | 'bugfix' | 'release' | 'hotfix'
            prefix?: string
          },
          {
            enabled?: boolean
            kind: 'feature' | 'bugfix' | 'release' | 'hotfix'
            prefix?: string
          },
          {
            enabled?: boolean
            kind: 'feature' | 'bugfix' | 'release' | 'hotfix'
            prefix?: string
          },
          {
            enabled?: boolean
            kind: 'feature' | 'bugfix' | 'release' | 'hotfix'
            prefix?: string
          }
        ]
    development?: {
      is_valid?: boolean
      name?: string
      use_mainbranch?: boolean
    }
    links?: {
      self?: {
        href?: string
        name?: string
      }
    }
    production?: {
      enabled?: boolean
      is_valid?: boolean
      name?: string
      use_mainbranch?: boolean
    }
    [k: string]: unknown
  }
  export type Branchrestriction = Object & {
    branch_match_kind: 'branching_model' | 'glob'
    branch_type?:
      | 'feature'
      | 'bugfix'
      | 'release'
      | 'hotfix'
      | 'development'
      | 'production'
    groups?: Group[]
    id?: number
    kind:
      | 'require_tasks_to_be_completed'
      | 'allow_auto_merge_when_builds_pass'
      | 'require_passing_builds_to_merge'
      | 'force'
      | 'require_all_dependencies_merged'
      | 'require_commits_behind'
      | 'restrict_merges'
      | 'enforce_merge_checks'
      | 'reset_pullrequest_changes_requested_on_change'
      | 'require_no_changes_requested'
      | 'smart_reset_pullrequest_approvals'
      | 'push'
      | 'require_approvals_to_merge'
      | 'require_default_reviewer_approvals_to_merge'
      | 'reset_pullrequest_approvals_on_change'
      | 'delete'
    links?: {
      self?: {
        href?: string
        name?: string
      }
    }
    pattern: string
    users?: Account[]
    value?: number
    [k: string]: unknown
  }
  export type Group = Object & {
    full_slug?: string
    links?: {
      html?: {
        href?: string
        name?: string
      }
      self?: {
        href?: string
        name?: string
      }
    }
    name?: string
    owner?: Account
    slug?: string
    workspace?: Workspace
    [k: string]: unknown
  }
  export type Workspace = Object & {
    created_on?: string
    is_private?: boolean
    links?: {
      avatar?: {
        href?: string
        name?: string
      }
      html?: {
        href?: string
        name?: string
      }
      members?: {
        href?: string
        name?: string
      }
      owners?: {
        href?: string
        name?: string
      }
      projects?: {
        href?: string
        name?: string
      }
      repositories?: {
        href?: string
        name?: string
      }
      self?: {
        href?: string
        name?: string
      }
      snippets?: {
        href?: string
        name?: string
      }
    }
    name?: string
    slug?: string
    updated_on?: string
    uuid?: string
    [k: string]: unknown
  }
  export type CommitComment = Comment & {
    commit?: Commit
    [k: string]: unknown
  }
  export type Comment = Object & {
    content?: {
      html?: string
      markup?: 'markdown' | 'creole' | 'plaintext'
      raw?: string
    }
    created_on?: string
    deleted?: boolean
    id?: number
    inline?: {
      from?: number
      path: string
      to?: number
    }
    links?: {
      code?: {
        href?: string
        name?: string
      }
      html?: {
        href?: string
        name?: string
      }
      self?: {
        href?: string
        name?: string
      }
    }
    parent?: Comment
    updated_on?: string
    user?: User
    [k: string]: unknown
  }
  export type Commitstatus = Object & {
    created_on?: string
    description?: string
    key?: string
    links?: {
      commit?: {
        href?: string
        name?: string
      }
      self?: {
        href?: string
        name?: string
      }
    }
    name?: string
    refname?: string
    state?: 'SUCCESSFUL' | 'FAILED' | 'INPROGRESS' | 'STOPPED'
    updated_on?: string
    url?: string
    uuid?: string
    [k: string]: unknown
  }
  export type Component = Object & {
    id?: number
    links?: {
      self?: {
        href?: string
        name?: string
      }
    }
    name?: string
    [k: string]: unknown
  }
  export type DeployKey = Object & {
    added_on?: string
    comment?: string
    key?: string
    label?: string
    last_used?: string
    links?: {
      self?: {
        href?: string
        name?: string
      }
    }
    owner?: Account
    repository?: Repository
    [k: string]: unknown
  }
  export type Deployment = Object & {
    environment?: DeploymentEnvironment
    release?: DeploymentRelease
    state?: DeploymentState
    uuid?: string
    [k: string]: unknown
  }
  export type DeploymentEnvironment = Object & {
    name?: string
    uuid?: string
    [k: string]: unknown
  }
  export type DeploymentRelease = Object & {
    commit?: Commit
    created_on?: string
    name?: string
    url?: string
    uuid?: string
    [k: string]: unknown
  }
  export type DeploymentState = Object & {
    [k: string]: unknown
  }
  export type DeploymentVariable = Object & {
    key?: string
    secured?: boolean
    uuid?: string
    value?: string
    [k: string]: unknown
  }
  export type Issue = Object & {
    assignee?: User
    component?: Component
    content?: {
      html?: string
      markup?: 'markdown' | 'creole' | 'plaintext'
      raw?: string
    }
    created_on?: string
    edited_on?: string
    id?: number
    kind?: 'bug' | 'enhancement' | 'proposal' | 'task'
    links?: {
      attachments?: {
        href?: string
        name?: string
      }
      comments?: {
        href?: string
        name?: string
      }
      html?: {
        href?: string
        name?: string
      }
      self?: {
        href?: string
        name?: string
      }
      vote?: {
        href?: string
        name?: string
      }
      watch?: {
        href?: string
        name?: string
      }
    }
    milestone?: Milestone
    priority?: 'trivial' | 'minor' | 'major' | 'critical' | 'blocker'
    reporter?: User
    repository?: Repository
    state?:
      | 'new'
      | 'open'
      | 'resolved'
      | 'on hold'
      | 'invalid'
      | 'duplicate'
      | 'wontfix'
      | 'closed'
    title?: string
    updated_on?: string
    version?: Version
    votes?: number
    [k: string]: unknown
  }
  export type Milestone = Object & {
    id?: number
    links?: {
      self?: {
        href?: string
        name?: string
      }
    }
    name?: string
    [k: string]: unknown
  }
  export type Version = Object & {
    id?: number
    links?: {
      self?: {
        href?: string
        name?: string
      }
    }
    name?: string
    [k: string]: unknown
  }
  export type IssueComment = Comment & {
    issue?: Issue
    [k: string]: unknown
  }
  export type ReportAnnotation = Object & {
    annotation_type?: 'VULNERABILITY' | 'CODE_SMELL' | 'BUG'
    created_on?: string
    details?: string
    external_id?: string
    line?: number
    link?: string
    path?: string
    result?: 'PASSED' | 'FAILED' | 'SKIPPED' | 'IGNORED'
    severity?: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'
    summary?: string
    updated_on?: string
    uuid?: string
    [k: string]: unknown
  }
  export type IssueAttachment = Object & {
    links?: {
      self?: {
        href?: string
        name?: string
      }
    }
    name?: string
    [k: string]: unknown
  }
  export type PipelineCache = Object & {
    created_on?: string
    file_size_bytes?: number
    name?: string
    path?: string
    pipeline_uuid?: string
    step_uuid?: string
    uuid?: string
    [k: string]: unknown
  }
  export type PipelineKnownHost = Object & {
    hostname?: string
    public_key?: PipelineSshPublicKey
    uuid?: string
    [k: string]: unknown
  }
  export type PipelineSshPublicKey = Object & {
    key?: string
    key_type?: string
    md5_fingerprint?: string
    sha256_fingerprint?: string
    [k: string]: unknown
  }
  export type PipelineScheduleExecution = Object & {
    [k: string]: unknown
  }
  export type PipelineSchedule = Object & {
    created_on?: string
    cron_pattern?: string
    enabled?: boolean
    selector?: PipelineSelector
    target?: PipelineTarget
    updated_on?: string
    uuid?: string
    [k: string]: unknown
  }
  export type PipelineSelector = Object & {
    pattern?: string
    type?: 'branches' | 'tags' | 'bookmarks' | 'default' | 'custom'
    [k: string]: unknown
  }
  export type PipelineTarget = Object & {
    [k: string]: unknown
  }
  export type PipelineStep = Object & {
    completed_on?: string
    image?: PipelineImage
    script_commands?: PipelineCommand[]
    setup_commands?: PipelineCommand[]
    started_on?: string
    state?: PipelineStepState
    uuid?: string
    [k: string]: unknown
  }
  export type PipelineStepState = Object & {
    [k: string]: unknown
  }
  export type PipelineVariable = Object & {
    key?: string
    secured?: boolean
    uuid?: string
    value?: string
    [k: string]: unknown
  }
  export type Pipeline = Object & {
    build_number?: number
    build_seconds_used?: number
    completed_on?: string
    created_on?: string
    creator?: Account
    repository?: Repository
    state?: PipelineState
    target?: PipelineTarget
    trigger?: PipelineTrigger
    uuid?: string
    [k: string]: unknown
  }
  export type PipelineState = Object & {
    [k: string]: unknown
  }
  export type PipelineTrigger = Object & {
    [k: string]: unknown
  }
  export type PullrequestComment = Comment & {
    pullrequest?: Pullrequest
    [k: string]: unknown
  }
  export type Pullrequest = Object & {
    author?: Account
    close_source_branch?: boolean
    closed_by?: Account
    comment_count?: number
    created_on?: string
    destination?: PullrequestEndpoint
    id?: number
    links?: {
      activity?: {
        href?: string
        name?: string
      }
      approve?: {
        href?: string
        name?: string
      }
      comments?: {
        href?: string
        name?: string
      }
      commits?: {
        href?: string
        name?: string
      }
      decline?: {
        href?: string
        name?: string
      }
      diff?: {
        href?: string
        name?: string
      }
      diffstat?: {
        href?: string
        name?: string
      }
      html?: {
        href?: string
        name?: string
      }
      merge?: {
        href?: string
        name?: string
      }
      self?: {
        href?: string
        name?: string
      }
    }
    merge_commit?: {
      hash?: string
    }
    participants?: Participant[]
    reason?: string
    rendered?: {
      description?: {
        html?: string
        markup?: 'markdown' | 'creole' | 'plaintext'
        raw?: string
      }
      reason?: {
        html?: string
        markup?: 'markdown' | 'creole' | 'plaintext'
        raw?: string
      }
      title?: {
        html?: string
        markup?: 'markdown' | 'creole' | 'plaintext'
        raw?: string
      }
    }
    reviewers?: Account[]
    source?: PullrequestEndpoint
    state?: 'MERGED' | 'SUPERSEDED' | 'OPEN' | 'DECLINED'
    summary?: {
      html?: string
      markup?: 'markdown' | 'creole' | 'plaintext'
      raw?: string
    }
    task_count?: number
    title?: string
    updated_on?: string
    [k: string]: unknown
  }
  export type Report = Object & {
    created_on?: string
    data?: ReportData[]
    details?: string
    external_id?: string
    link?: string
    logo_url?: string
    remote_link_enabled?: boolean
    report_type?: 'SECURITY' | 'COVERAGE' | 'TEST' | 'BUG'
    reporter?: string
    result?: 'PASSED' | 'FAILED' | 'PENDING'
    title?: string
    updated_on?: string
    uuid?: string
    [k: string]: unknown
  }
  export type SnippetComment = Object & {
    links?: {
      html?: {
        href?: string
        name?: string
      }
      self?: {
        href?: string
        name?: string
      }
    }
    snippet?: Snippet
    [k: string]: unknown
  }
  export type Snippet = Object & {
    created_on?: string
    creator?: Account
    id?: number
    is_private?: boolean
    owner?: Account
    scm?: 'git'
    title?: string
    updated_on?: string
    [k: string]: unknown
  }
  export type SnippetCommit = BaseCommit & {
    links?: {
      diff?: {
        href?: string
        name?: string
      }
      html?: {
        href?: string
        name?: string
      }
      self?: {
        href?: string
        name?: string
      }
    }
    snippet?: Snippet
    [k: string]: unknown
  }
  export type SshAccountKey = SshKey & {
    owner?: Account
    [k: string]: unknown
  }
  export type SshKey = Object & {
    comment?: string
    created_on?: string
    key?: string
    label?: string
    last_used?: string
    links?: {
      self?: {
        href?: string
        name?: string
      }
    }
    uuid?: string
    [k: string]: unknown
  }
  export type Tag = Ref & {
    date?: string
    message?: string
    tagger?: Author
    [k: string]: unknown
  }
  export type WebhookSubscription = Object & {
    active?: boolean
    created_at?: string
    description?: string
    events?: (
      | 'pullrequest:unapproved'
      | 'issue:comment_created'
      | 'repo:imported'
      | 'repo:created'
      | 'repo:commit_comment_created'
      | 'pullrequest:approved'
      | 'pullrequest:comment_updated'
      | 'issue:updated'
      | 'project:updated'
      | 'repo:deleted'
      | 'pullrequest:changes_request_created'
      | 'pullrequest:comment_created'
      | 'repo:commit_status_updated'
      | 'pullrequest:updated'
      | 'issue:created'
      | 'repo:fork'
      | 'pullrequest:comment_deleted'
      | 'repo:commit_status_created'
      | 'repo:updated'
      | 'pullrequest:rejected'
      | 'pullrequest:fulfilled'
      | 'pullrequest:created'
      | 'pullrequest:changes_request_removed'
      | 'repo:transfer'
      | 'repo:push'
    )[]
    subject?: Object
    subject_type?: 'workspace' | 'user' | 'repository' | 'team'
    url?: string
    uuid?: string
    [k: string]: unknown
  }
  export type WorkspaceMembership = Object & {
    links?: {
      self?: {
        href?: string
        name?: string
      }
    }
    user?: Account
    workspace?: Workspace
    [k: string]: unknown
  }
  export type PipelineBuildNumber = Object & {
    next?: number
    [k: string]: unknown
  }
  export type PipelineSshKeyPair = Object & {
    private_key?: string
    public_key?: string
    [k: string]: unknown
  }
  export type PipelinesConfig = Object & {
    enabled?: boolean
    repository?: Repository
    [k: string]: unknown
  }
  export interface Ref {
    links?: {
      commits?: {
        href?: string
        name?: string
      }
      html?: {
        href?: string
        name?: string
      }
      self?: {
        href?: string
        name?: string
      }
    }
    name?: string
    target?: Commit
    type: string
    [k: string]: unknown
  }
  export interface Object {
    type: string
    [k: string]: unknown
  }
  export interface Error {
    error?: {
      data?: {
        [k: string]: unknown
      }
      detail?: string
      message: string
    }
    type: string
    [k: string]: unknown
  }
  export interface ExportOptions {
    include_attachments?: boolean
    project_key?: string
    project_name?: string
    send_email?: boolean
    type: string
    [k: string]: unknown
  }
  export interface IssueChange {
    changes?: {
      assignee?: {
        new?: string
        old?: string
      }
      component?: {
        new?: string
        old?: string
      }
      content?: {
        new?: string
        old?: string
      }
      kind?: {
        new?: string
        old?: string
      }
      milestone?: {
        new?: string
        old?: string
      }
      priority?: {
        new?: string
        old?: string
      }
      state?: {
        new?: string
        old?: string
      }
      title?: {
        new?: string
        old?: string
      }
      version?: {
        new?: string
        old?: string
      }
    }
    created_on?: string
    issue?: Issue
    links?: {
      issue?: {
        href?: string
        name?: string
      }
      self?: {
        href?: string
        name?: string
      }
    }
    message?: {
      html?: string
      markup?: 'markdown' | 'creole' | 'plaintext'
      raw?: string
    }
    name?: string
    type: string
    user?: User
    [k: string]: unknown
  }
  export interface IssueJobStatus {
    count?: number
    pct?: number
    phase?: string
    status?: 'ACCEPTED' | 'STARTED' | 'RUNNING' | 'FAILURE'
    total?: number
    type?: string
  }
  export interface PaginatedAnnotations {
    next?: string
    page?: number
    pagelen?: number
    previous?: string
    size?: number
    values?: ReportAnnotation[]
    [k: string]: unknown
  }
  export interface PaginatedBranches {
    next?: string
    page?: number
    pagelen?: number
    previous?: string
    size?: number
    values?: Branch[]
  }
  export interface PaginatedBranchrestrictions {
    next?: string
    page?: number
    pagelen?: number
    previous?: string
    size?: number
    values?: Branchrestriction[]
  }
  export interface PaginatedChangeset {
    next?: string
    page?: number
    pagelen?: number
    previous?: string
    size?: number
    values?: BaseCommit[]
  }
  export interface PaginatedCommitComments {
    next?: string
    page?: number
    pagelen?: number
    previous?: string
    size?: number
    values?: CommitComment[]
  }
  export interface PaginatedCommitstatuses {
    next?: string
    page?: number
    pagelen?: number
    previous?: string
    size?: number
    values?: Commitstatus[]
  }
  export interface PaginatedComponents {
    next?: string
    page?: number
    pagelen?: number
    previous?: string
    size?: number
    values?: Component[]
  }
  export interface PaginatedDeployKeys {
    next?: string
    page?: number
    pagelen?: number
    previous?: string
    size?: number
    values?: DeployKey[]
  }
  export interface PaginatedDeploymentVariable {
    next?: string
    page?: number
    pagelen?: number
    previous?: string
    size?: number
    values?: DeploymentVariable[]
    [k: string]: unknown
  }
  export interface PaginatedDeployments {
    next?: string
    page?: number
    pagelen?: number
    previous?: string
    size?: number
    values?: Deployment[]
    [k: string]: unknown
  }
  export interface PaginatedDiffstats {
    next?: string
    page?: number
    pagelen?: number
    previous?: string
    size?: number
    values?: Diffstat[]
  }
  export interface Diffstat {
    lines_added?: number
    lines_removed?: number
    new?: CommitFile
    old?: CommitFile
    status?: 'added' | 'removed' | 'modified' | 'renamed'
    type: string
    [k: string]: unknown
  }
  export interface CommitFile {
    attributes?: 'link' | 'executable' | 'subrepository' | 'binary' | 'lfs'
    commit?: Commit
    escaped_path?: string
    path?: string
    type: string
    [k: string]: unknown
  }
  export interface PaginatedEnvironments {
    next?: string
    page?: number
    pagelen?: number
    previous?: string
    size?: number
    values?: DeploymentEnvironment[]
    [k: string]: unknown
  }
  export interface PaginatedFiles {
    next?: string
    page?: number
    pagelen?: number
    previous?: string
    size?: number
    values?: CommitFile[]
  }
  export interface PaginatedHookEvents {
    next?: string
    page?: number
    pagelen?: number
    previous?: string
    size?: number
    values?: HookEvent[]
  }
  export interface HookEvent {
    category?: string
    description?: string
    event?:
      | 'pullrequest:unapproved'
      | 'issue:comment_created'
      | 'repo:imported'
      | 'repo:created'
      | 'repo:commit_comment_created'
      | 'pullrequest:approved'
      | 'pullrequest:comment_updated'
      | 'issue:updated'
      | 'project:updated'
      | 'repo:deleted'
      | 'pullrequest:changes_request_created'
      | 'pullrequest:comment_created'
      | 'repo:commit_status_updated'
      | 'pullrequest:updated'
      | 'issue:created'
      | 'repo:fork'
      | 'pullrequest:comment_deleted'
      | 'repo:commit_status_created'
      | 'repo:updated'
      | 'pullrequest:rejected'
      | 'pullrequest:fulfilled'
      | 'pullrequest:created'
      | 'pullrequest:changes_request_removed'
      | 'repo:transfer'
      | 'repo:push'
    label?: string
  }
  export interface PaginatedIssueAttachments {
    next?: string
    page?: number
    pagelen?: number
    previous?: string
    size?: number
    values?: IssueAttachment[]
  }
  export interface PaginatedIssueComments {
    next?: string
    page?: number
    pagelen?: number
    previous?: string
    size?: number
    values?: IssueComment[]
  }
  export interface PaginatedIssues {
    next?: string
    page?: number
    pagelen?: number
    previous?: string
    size?: number
    values?: Issue[]
  }
  export interface PaginatedLogEntries {
    next?: string
    page?: number
    pagelen?: number
    previous?: string
    size?: number
    values?: IssueChange[]
  }
  export interface PaginatedMilestones {
    next?: string
    page?: number
    pagelen?: number
    previous?: string
    size?: number
    values?: Milestone[]
  }
  export interface PaginatedPipelineCaches {
    next?: string
    page?: number
    pagelen?: number
    previous?: string
    size?: number
    values?: PipelineCache[]
    [k: string]: unknown
  }
  export interface PaginatedPipelineKnownHosts {
    next?: string
    page?: number
    pagelen?: number
    previous?: string
    size?: number
    values?: PipelineKnownHost[]
    [k: string]: unknown
  }
  export interface PaginatedPipelineScheduleExecutions {
    next?: string
    page?: number
    pagelen?: number
    previous?: string
    size?: number
    values?: PipelineScheduleExecution[]
    [k: string]: unknown
  }
  export interface PaginatedPipelineSchedules {
    next?: string
    page?: number
    pagelen?: number
    previous?: string
    size?: number
    values?: PipelineSchedule[]
    [k: string]: unknown
  }
  export interface PaginatedPipelineSteps {
    next?: string
    page?: number
    pagelen?: number
    previous?: string
    size?: number
    values?: PipelineStep[]
    [k: string]: unknown
  }
  export interface PipelineImage {
    email?: string
    name?: string
    password?: string
    username?: string
    [k: string]: unknown
  }
  export interface PipelineCommand {
    command?: string
    name?: string
    [k: string]: unknown
  }
  export interface PaginatedPipelineVariables {
    next?: string
    page?: number
    pagelen?: number
    previous?: string
    size?: number
    values?: PipelineVariable[]
    [k: string]: unknown
  }
  export interface PaginatedPipelines {
    next?: string
    page?: number
    pagelen?: number
    previous?: string
    size?: number
    values?: Pipeline[]
    [k: string]: unknown
  }
  export interface PaginatedProjects {
    next?: string
    page?: number
    pagelen?: number
    previous?: string
    size?: number
    values?: Project[]
  }
  export interface PaginatedPullrequestComments {
    next?: string
    page?: number
    pagelen?: number
    previous?: string
    size?: number
    values?: PullrequestComment[]
  }
  export interface PullrequestEndpoint {
    branch?: {
      default_merge_strategy?: string
      merge_strategies?: ('merge_commit' | 'squash' | 'fast_forward')[]
      name?: string
    }
    commit?: {
      hash?: string
    }
    repository?: Repository
  }
  export interface PaginatedPullrequests {
    next?: string
    page?: number
    pagelen?: number
    previous?: string
    size?: number
    values?: Pullrequest[]
  }
  export interface PaginatedRefs {
    next?: string
    page?: number
    pagelen?: number
    previous?: string
    size?: number
    values?: Ref[]
  }
  export interface PaginatedReports {
    next?: string
    page?: number
    pagelen?: number
    previous?: string
    size?: number
    values?: Report[]
    [k: string]: unknown
  }
  export interface ReportData {
    title?: string
    type?:
      | 'BOOLEAN'
      | 'DATE'
      | 'DURATION'
      | 'LINK'
      | 'NUMBER'
      | 'PERCENTAGE'
      | 'TEXT'
    value?: {
      [k: string]: unknown
    }
    [k: string]: unknown
  }
  export interface PaginatedRepositories {
    next?: string
    page?: number
    pagelen?: number
    previous?: string
    size?: number
    values?: Repository[]
  }
  export interface PaginatedRepositoryPermissions {
    next?: string
    page?: number
    pagelen?: number
    previous?: string
    size?: number
    values?: RepositoryPermission[]
  }
  export interface RepositoryPermission {
    permission?: 'admin' | 'write' | 'read'
    repository?: Repository
    type: string
    user?: User
    [k: string]: unknown
  }
  export interface PaginatedSnippetComments {
    next?: string
    page?: number
    pagelen?: number
    previous?: string
    size?: number
    values?: SnippetComment[]
  }
  export interface PaginatedSnippetCommit {
    next?: string
    page?: number
    pagelen?: number
    previous?: string
    size?: number
    values?: SnippetCommit[]
  }
  export interface PaginatedSnippets {
    next?: string
    page?: number
    pagelen?: number
    previous?: string
    size?: number
    values?: Snippet[]
  }
  export interface PaginatedSshUserKeys {
    next?: string
    page?: number
    pagelen?: number
    previous?: string
    size?: number
    values?: SshAccountKey[]
  }
  export interface PaginatedTags {
    next?: string
    page?: number
    pagelen?: number
    previous?: string
    size?: number
    values?: Tag[]
  }
  export interface PaginatedTeamPermissions {
    next?: string
    page?: number
    pagelen?: number
    previous?: string
    size?: number
    values?: TeamPermission[]
  }
  export interface TeamPermission {
    permission?: 'admin' | 'collaborator' | 'member'
    team?: Team
    type: string
    user?: User
    [k: string]: unknown
  }
  export interface PaginatedTeams {
    next?: string
    page?: number
    pagelen?: number
    previous?: string
    size?: number
    values?: Team[]
  }
  export interface PaginatedTreeentries {
    next?: string
    page?: number
    pagelen?: number
    previous?: string
    size?: number
    values?: Treeentry[]
  }
  export interface Treeentry {
    commit?: Commit
    path?: string
    type: string
    [k: string]: unknown
  }
  export interface PaginatedUsers {
    next?: string
    page?: number
    pagelen?: number
    previous?: string
    size?: number
    values?: User[]
  }
  export interface PaginatedVersions {
    next?: string
    page?: number
    pagelen?: number
    previous?: string
    size?: number
    values?: Version[]
  }
  export interface PaginatedWebhookSubscriptions {
    next?: string
    page?: number
    pagelen?: number
    previous?: string
    size?: number
    values?: WebhookSubscription[]
  }
  export interface PaginatedWorkspaceMemberships {
    next?: string
    page?: number
    pagelen?: number
    previous?: string
    size?: number
    values?: WorkspaceMembership[]
  }
  export interface PaginatedWorkspaces {
    next?: string
    page?: number
    pagelen?: number
    previous?: string
    size?: number
    values?: Workspace[]
  }
  export interface PipelineCacheContentUri {
    uri?: string
    [k: string]: unknown
  }
  export interface PullrequestMergeParameters {
    close_source_branch?: boolean
    merge_strategy?: 'merge_commit' | 'squash' | 'fast_forward'
    message?: string
    type: string
    [k: string]: unknown
  }
  export interface SearchResultPage {
    next?: string
    page?: number
    pagelen?: number
    previous?: string
    query_substituted?: boolean
    size?: number
    values?: SearchCodeSearchResult[]
    [k: string]: unknown
  }
  export interface SearchCodeSearchResult {
    content_match_count?: number
    content_matches?: SearchContentMatch[]
    file?: CommitFile
    path_matches?: SearchSegment[]
    type?: string
    [k: string]: unknown
  }
  export interface SearchContentMatch {
    lines?: SearchLine[]
    [k: string]: unknown
  }
  export interface SearchLine {
    line?: number
    segments?: SearchSegment[]
    [k: string]: unknown
  }
  export interface SearchSegment {
    match?: boolean
    text?: string
    [k: string]: unknown
  }
  export interface SubjectTypes {
    repository?: {
      events?: {
        href?: string
        name?: string
      }
    }
    team?: {
      events?: {
        href?: string
        name?: string
      }
    }
    user?: {
      events?: {
        href?: string
        name?: string
      }
    }
  }
}

export namespace Params {
  export type Empty = {}

  export type BranchingModelGet = {
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type BranchingModelGetSettings = {
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type BranchingModelUpdateSettings = {
    _body?: Schema.BranchingModelSettings
    repo_slug: string
    workspace: string
  }
  export type BranchrestrictionsCreate = {
    _body: Schema.Branchrestriction
    repo_slug: string
    workspace: string
  }
  export type BranchrestrictionsDelete = {
    id: string
    repo_slug: string
    workspace: string
  }
  export type BranchrestrictionsGet = {
    id: string
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type BranchrestrictionsList = {
    kind?: string
    pattern?: string
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type BranchrestrictionsUpdate = {
    _body: Schema.Branchrestriction
    id: string
    repo_slug: string
    workspace: string
  }
  export type CommitsBulkCreateOrUpdateAnnotations = {
    _body: any
    commit: string
    repo_slug: string
    reportId: string
    workspace: string
  }
  export type CommitsCreateApproval = {
    commit: string
    repo_slug: string
    workspace: string
  }
  export type CommitsCreateComment = {
    _body: Schema.CommitComment
    commit: string
    repo_slug: string
    workspace: string
  }
  export type CommitsCreateOrUpdateAnnotation = {
    _body: Schema.ReportAnnotation
    annotationId: string
    commit: string
    repo_slug: string
    reportId: string
    workspace: string
  }
  export type CommitsCreateOrUpdateReport = {
    _body: Schema.Report
    commit: string
    repo_slug: string
    reportId: string
    workspace: string
  }
  export type CommitsDeleteAnnotation = {
    annotationId: string
    commit: string
    repo_slug: string
    reportId: string
    workspace: string
  }
  export type CommitsDeleteApproval = {
    commit: string
    repo_slug: string
    workspace: string
  }
  export type CommitsDeleteReport = {
    commit: string
    repo_slug: string
    reportId: string
    workspace: string
  }
  export type CommitsGet = {
    commit: string
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type CommitsGetAnnotation = {
    annotationId: string
    commit: string
    repo_slug: string
    reportId: string
    workspace: string
    fields?: string
  }
  export type CommitsGetAnnotationsForReport = {
    commit: string
    repo_slug: string
    reportId: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type CommitsGetComment = {
    comment_id: number
    commit: string
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type CommitsGetDiff = {
    binary?: boolean
    context?: number
    ignore_whitespace?: boolean
    merge?: boolean
    path?: string
    renames?: boolean
    repo_slug: string
    spec: string
    workspace: string
    fields?: string
  }
  export type CommitsGetPatch = {
    repo_slug: string
    spec: string
    workspace: string
    fields?: string
  }
  export type CommitsGetReport = {
    commit: string
    repo_slug: string
    reportId: string
    workspace: string
    fields?: string
  }
  export type CommitsGetReportsForCommit = {
    commit: string
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type CommitsList = {
    exclude?: string
    include?: string
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type CommitsListAlt = {
    exclude?: string
    include?: string
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
  }
  export type CommitsListAt = {
    exclude?: string
    include?: string
    repo_slug: string
    revision: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type CommitsListAtAlt = {
    exclude?: string
    include?: string
    repo_slug: string
    revision: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
  }
  export type CommitsListComments = {
    commit: string
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type CommitstatusesCreateBuildStatus = {
    _body?: Schema.Commitstatus
    commit: string
    repo_slug: string
    workspace: string
  }
  export type CommitstatusesGetBuildStatus = {
    commit: string
    key: string
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type CommitstatusesList = {
    commit: string
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type CommitstatusesListPullRequestStatuses = {
    pull_request_id: number
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type CommitstatusesUpdateBuildStatus = {
    _body?: Schema.Commitstatus
    commit: string
    key: string
    repo_slug: string
    workspace: string
  }
  export type DeployCreateKey = {
    key: string
    label: string
    repo_slug: string
    workspace: string
  }
  export type DeployDeleteKey = {
    key_id: string
    repo_slug: string
    workspace: string
  }
  export type DeployGetKey = {
    key_id: string
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type DeployListKeys = {
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type DeployUpdateKey = {
    key_id: string
    repo_slug: string
    workspace: string
  }
  export type DeploymentsCreateEnvironment = {
    _body: Schema.DeploymentEnvironment
    repo_slug: string
    workspace: string
  }
  export type DeploymentsDeleteEnvironmentForRepository = {
    environment_uuid: string
    repo_slug: string
    workspace: string
  }
  export type DeploymentsGet = {
    deployment_uuid: string
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type DeploymentsGetEnvironment = {
    environment_uuid: string
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type DeploymentsList = {
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type DeploymentsListEnvironments = {
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type DeploymentsUpdateEnvironment = {
    _body: any
    environment_uuid: string
    repo_slug: string
    workspace: string
  }
  export type DownloadsCreate = {
    _body: FormData
    repo_slug: string
    workspace: string
  }
  export type DownloadsDelete = {
    filename: string
    repo_slug: string
    workspace: string
  }
  export type DownloadsGet = {
    filename: string
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type DownloadsList = {
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type HookEventsGetAllSubjectTypes = {
    fields?: string
  }
  export type HookEventsList = {
    subject_type: 'workspace' | 'user' | 'repository' | 'team'
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type IssueTrackerCreate = {
    _body: Schema.Issue
    repo_slug: string
    workspace: string
  }
  export type IssueTrackerCreateAttachments = {
    _body: FormData
    issue_id: string
    repo_slug: string
    workspace: string
  }
  export type IssueTrackerCreateChange = {
    _body: Schema.IssueChange
    issue_id: string
    repo_slug: string
    workspace: string
  }
  export type IssueTrackerCreateComment = {
    _body: Schema.IssueComment
    issue_id: string
    repo_slug: string
    workspace: string
  }
  export type IssueTrackerCreateVote = {
    issue_id: string
    repo_slug: string
    workspace: string
  }
  export type IssueTrackerCreateWatch = {
    issue_id: string
    repo_slug: string
    workspace: string
  }
  export type IssueTrackerDelete = {
    issue_id: string
    repo_slug: string
    workspace: string
  }
  export type IssueTrackerDeleteAttachment = {
    issue_id: string
    path: string
    repo_slug: string
    workspace: string
  }
  export type IssueTrackerDeleteComment = {
    _body: Schema.IssueComment
    comment_id: number
    issue_id: string
    repo_slug: string
    workspace: string
  }
  export type IssueTrackerDeleteVote = {
    issue_id: string
    repo_slug: string
    workspace: string
  }
  export type IssueTrackerDeleteWatch = {
    issue_id: string
    repo_slug: string
    workspace: string
  }
  export type IssueTrackerGet = {
    issue_id: string
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type IssueTrackerGetAttachment = {
    issue_id: string
    path: string
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type IssueTrackerGetChange = {
    change_id: string
    issue_id: string
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type IssueTrackerGetComment = {
    comment_id: number
    issue_id: string
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type IssueTrackerGetComponent = {
    component_id: number
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type IssueTrackerGetMilestone = {
    milestone_id: number
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type IssueTrackerGetVersion = {
    repo_slug: string
    version_id: number
    workspace: string
    fields?: string
  }
  export type IssueTrackerGetVote = {
    issue_id: string
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type IssueTrackerGetWatch = {
    issue_id: string
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type IssueTrackerList = {
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type IssueTrackerListAttachments = {
    issue_id: string
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type IssueTrackerListChanges = {
    issue_id: string
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type IssueTrackerListComments = {
    issue_id: string
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type IssueTrackerListComponents = {
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type IssueTrackerListMilestones = {
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type IssueTrackerListVersions = {
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type IssueTrackerUpdate = {
    _body: Schema.Issue
    issue_id: string
    repo_slug: string
    workspace: string
  }
  export type IssueTrackerUpdateComment = {
    _body: Schema.IssueComment
    comment_id: number
    issue_id: string
    repo_slug: string
    workspace: string
  }
  export type PipelinesCreate = {
    _body: Schema.Pipeline
    repo_slug: string
    workspace: string
  }
  export type PipelinesCreateDeploymentVariable = {
    _body: Schema.DeploymentVariable
    environment_uuid: string
    repo_slug: string
    variable_uuid: string
    workspace: string
  }
  export type PipelinesCreateKnownHost = {
    _body: Schema.PipelineKnownHost
    repo_slug: string
    workspace: string
  }
  export type PipelinesCreatePipelineVariableForWorkspace = {
    _body?: Schema.PipelineVariable
    workspace: string
  }
  export type PipelinesCreateSchedule = {
    _body: Schema.PipelineSchedule
    repo_slug: string
    workspace: string
  }
  export type PipelinesCreateVariable = {
    _body: Schema.PipelineVariable
    repo_slug: string
    workspace: string
  }
  export type PipelinesCreateVariableForTeam = {
    _body?: Schema.PipelineVariable
    username: string
  }
  export type PipelinesCreateVariableForUser = {
    _body?: Schema.PipelineVariable
    selected_user: string
  }
  export type PipelinesDeleteDeploymentVariable = {
    environment_uuid: string
    repo_slug: string
    variable_uuid: string
    workspace: string
  }
  export type PipelinesDeleteKnownHost = {
    known_host_uuid: string
    repo_slug: string
    workspace: string
  }
  export type PipelinesDeletePipelineVariableForWorkspace = {
    variable_uuid: string
    workspace: string
  }
  export type PipelinesDeleteRepositoryPipelineCache = {
    cache_uuid: string
    repo_slug: string
    workspace: string
  }
  export type PipelinesDeleteSchedule = {
    repo_slug: string
    schedule_uuid: string
    workspace: string
  }
  export type PipelinesDeleteSshKeyPair = {
    repo_slug: string
    workspace: string
  }
  export type PipelinesDeleteVariable = {
    repo_slug: string
    variable_uuid: string
    workspace: string
  }
  export type PipelinesDeleteVariableForTeam = {
    username: string
    variable_uuid: string
  }
  export type PipelinesDeleteVariableForUser = {
    selected_user: string
    variable_uuid: string
  }
  export type PipelinesGet = {
    pipeline_uuid: string
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type PipelinesGetConfig = {
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type PipelinesGetKnownHost = {
    known_host_uuid: string
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type PipelinesGetPipelineVariableForWorkspace = {
    variable_uuid: string
    workspace: string
    fields?: string
  }
  export type PipelinesGetPipelineVariablesForWorkspace = {
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type PipelinesGetRepositoryPipelineCacheContentUri = {
    cache_uuid: string
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type PipelinesGetRepositoryPipelineCaches = {
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type PipelinesGetSchedule = {
    repo_slug: string
    schedule_uuid: string
    workspace: string
    fields?: string
  }
  export type PipelinesGetSshKeyPair = {
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type PipelinesGetStep = {
    pipeline_uuid: string
    repo_slug: string
    step_uuid: string
    workspace: string
    fields?: string
  }
  export type PipelinesGetStepLog = {
    pipeline_uuid: string
    repo_slug: string
    step_uuid: string
    workspace: string
    fields?: string
  }
  export type PipelinesGetVariable = {
    repo_slug: string
    variable_uuid: string
    workspace: string
    fields?: string
  }
  export type PipelinesGetVariableForTeam = {
    username: string
    variable_uuid: string
    fields?: string
  }
  export type PipelinesGetVariableForUser = {
    selected_user: string
    variable_uuid: string
    fields?: string
  }
  export type PipelinesList = {
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type PipelinesListDeploymentVariables = {
    environment_uuid: string
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type PipelinesListKnownHosts = {
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type PipelinesListScheduleExecutions = {
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type PipelinesListSchedules = {
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type PipelinesListSteps = {
    pipeline_uuid: string
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type PipelinesListVariablesForRepo = {
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type PipelinesListVariablesForTeam = {
    username: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type PipelinesListVariablesForUser = {
    selected_user: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type PipelinesStop = {
    pipeline_uuid: string
    repo_slug: string
    workspace: string
  }
  export type PipelinesUpdateBuildNumber = {
    _body: Schema.PipelineBuildNumber
    repo_slug: string
    workspace: string
  }
  export type PipelinesUpdateConfig = {
    _body: Schema.PipelinesConfig
    repo_slug: string
    workspace: string
  }
  export type PipelinesUpdateDeploymentVariable = {
    _body: Schema.DeploymentVariable
    environment_uuid: string
    repo_slug: string
    variable_uuid: string
    workspace: string
  }
  export type PipelinesUpdateKnownHost = {
    _body: Schema.PipelineKnownHost
    known_host_uuid: string
    repo_slug: string
    workspace: string
  }
  export type PipelinesUpdatePipelineVariableForWorkspace = {
    _body: Schema.PipelineVariable
    variable_uuid: string
    workspace: string
  }
  export type PipelinesUpdateSchedule = {
    _body: Schema.PipelineSchedule
    repo_slug: string
    schedule_uuid: string
    workspace: string
  }
  export type PipelinesUpdateSshKeyPair = {
    _body: Schema.PipelineSshKeyPair
    repo_slug: string
    workspace: string
  }
  export type PipelinesUpdateVariable = {
    _body: Schema.PipelineVariable
    repo_slug: string
    variable_uuid: string
    workspace: string
  }
  export type PipelinesUpdateVariableForTeam = {
    _body: Schema.PipelineVariable
    username: string
    variable_uuid: string
  }
  export type PipelinesUpdateVariableForUser = {
    _body: Schema.PipelineVariable
    selected_user: string
    variable_uuid: string
  }
  export type ProjectsCreateForTeam = {
    _body: Schema.Project
    username: string
  }
  export type ProjectsCreateOrUpdateProject = {
    _body: Schema.Project
    project_key: string
    workspace: string
  }
  export type ProjectsCreateProject = {
    _body: Schema.Project
    workspace: string
  }
  export type ProjectsDeleteForTeam = {
    project_key: string
    username: string
  }
  export type ProjectsDeleteProject = {
    project_key: string
    workspace: string
  }
  export type ProjectsGetForTeam = {
    project_key: string
    username: string
    fields?: string
  }
  export type ProjectsGetProject = {
    project_key: string
    workspace: string
    fields?: string
  }
  export type ProjectsListForTeam = {
    username: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type ProjectsUpdateForTeam = {
    _body: Schema.Project
    project_key: string
    username: string
  }
  export type PropertiesDeleteCommitHostedPropertyValue = {
    app_key: string
    commit: string
    property_name: string
    repo_slug: string
    workspace: string
  }
  export type PropertiesDeletePullRequestHostedPropertyValue = {
    app_key: string
    property_name: string
    pullrequest_id: string
    repo_slug: string
    workspace: string
  }
  export type PropertiesDeleteRepositoryHostedPropertyValue = {
    app_key: string
    property_name: string
    repo_slug: string
    workspace: string
  }
  export type PropertiesDeleteUserHostedPropertyValue = {
    app_key: string
    property_name: string
    selected_user: string
  }
  export type PropertiesGetCommitHostedPropertyValue = {
    app_key: string
    commit: string
    property_name: string
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type PropertiesGetPullRequestHostedPropertyValue = {
    app_key: string
    property_name: string
    pullrequest_id: string
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type PropertiesGetRepositoryHostedPropertyValue = {
    app_key: string
    property_name: string
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type PropertiesRetrieveUserHostedPropertyValue = {
    app_key: string
    property_name: string
    selected_user: string
    fields?: string
  }
  export type PropertiesUpdateCommitHostedPropertyValue = {
    app_key: string
    commit: string
    property_name: string
    repo_slug: string
    workspace: string
  }
  export type PropertiesUpdatePullRequestHostedPropertyValue = {
    app_key: string
    property_name: string
    pullrequest_id: string
    repo_slug: string
    workspace: string
  }
  export type PropertiesUpdateRepositoryHostedPropertyValue = {
    app_key: string
    property_name: string
    repo_slug: string
    workspace: string
  }
  export type PropertiesUpdateUserHostedPropertyValue = {
    app_key: string
    property_name: string
    selected_user: string
  }
  export type PullrequestsAddDefaultReviewer = {
    repo_slug: string
    target_username: string
    workspace: string
  }
  export type PullrequestsCreate = {
    _body?: Schema.Pullrequest
    repo_slug: string
    workspace: string
  }
  export type PullrequestsCreateApproval = {
    pull_request_id: number
    repo_slug: string
    workspace: string
  }
  export type PullrequestsCreateComment = {
    _body: Schema.PullrequestComment
    pull_request_id: number
    repo_slug: string
    workspace: string
  }
  export type PullrequestsDecline = {
    pull_request_id: number
    repo_slug: string
    workspace: string
  }
  export type PullrequestsDeleteApproval = {
    pull_request_id: number
    repo_slug: string
    workspace: string
  }
  export type PullrequestsDeleteComment = {
    comment_id: number
    pull_request_id: number
    repo_slug: string
    workspace: string
  }
  export type PullrequestsDeleteDefaultReviewer = {
    repo_slug: string
    target_username: string
    workspace: string
  }
  export type PullrequestsGet = {
    pull_request_id: number
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type PullrequestsGetComment = {
    comment_id: number
    pull_request_id: number
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type PullrequestsGetDefaultReviewer = {
    repo_slug: string
    target_username: string
    workspace: string
    fields?: string
  }
  export type PullrequestsGetDiff = {
    pull_request_id: number
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type PullrequestsGetDiffStat = {
    pull_request_id: number
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type PullrequestsGetPatch = {
    pull_request_id: number
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type PullrequestsList = {
    repo_slug: string
    state?: 'MERGED' | 'SUPERSEDED' | 'OPEN' | 'DECLINED'
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type PullrequestsListActivities = {
    pull_request_id: number
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type PullrequestsListActivitiesForRepo = {
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type PullrequestsListComments = {
    pull_request_id: number
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type PullrequestsListCommits = {
    pull_request_id: number
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type PullrequestsListDefaultReviewers = {
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type PullrequestsListForCommit = {
    commit: string
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type PullrequestsListPullrequestsForUser = {
    selected_user: string
    state?: 'MERGED' | 'SUPERSEDED' | 'OPEN' | 'DECLINED'
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type PullrequestsListStatuses = {
    pull_request_id: number
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type PullrequestsMerge = {
    _body?: Schema.PullrequestMergeParameters
    async?: boolean
    pull_request_id: number
    repo_slug: string
    workspace: string
  }
  export type PullrequestsUpdate = {
    _body?: Schema.Pullrequest
    pull_request_id: number
    repo_slug: string
    workspace: string
  }
  export type PullrequestsUpdateComment = {
    _body: Schema.PullrequestComment
    comment_id: number
    pull_request_id: number
    repo_slug: string
    workspace: string
  }
  export type RefsCreateBranch = {
    _body: any
    repo_slug: string
    workspace: string
  }
  export type RefsCreateTag = {
    _body: Schema.Tag
    repo_slug: string
    workspace: string
  }
  export type RefsDeleteBranch = {
    name: string
    repo_slug: string
    workspace: string
  }
  export type RefsDeleteTag = {
    name: string
    repo_slug: string
    workspace: string
  }
  export type RefsGetBranch = {
    name: string
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type RefsGetTag = {
    name: string
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type RefsList = {
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type RefsListBranches = {
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type RefsListTags = {
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type ReportsBulkCreateOrUpdateAnnotations = {
    _body: any
    commit: string
    repo_slug: string
    reportId: string
    workspace: string
  }
  export type ReportsCreateOrUpdateAnnotation = {
    _body: Schema.ReportAnnotation
    annotationId: string
    commit: string
    repo_slug: string
    reportId: string
    workspace: string
  }
  export type ReportsCreateOrUpdateReport = {
    _body: Schema.Report
    commit: string
    repo_slug: string
    reportId: string
    workspace: string
  }
  export type ReportsDeleteAnnotation = {
    annotationId: string
    commit: string
    repo_slug: string
    reportId: string
    workspace: string
  }
  export type ReportsDeleteReport = {
    commit: string
    repo_slug: string
    reportId: string
    workspace: string
  }
  export type ReportsGetAnnotation = {
    annotationId: string
    commit: string
    repo_slug: string
    reportId: string
    workspace: string
    fields?: string
  }
  export type ReportsGetAnnotationsForReport = {
    commit: string
    repo_slug: string
    reportId: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type ReportsGetReport = {
    commit: string
    repo_slug: string
    reportId: string
    workspace: string
    fields?: string
  }
  export type ReportsGetReportsForCommit = {
    commit: string
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type RepositoriesAddDefaultReviewer = {
    repo_slug: string
    target_username: string
    workspace: string
  }
  export type RepositoriesBulkCreateOrUpdateAnnotations = {
    _body: any
    commit: string
    repo_slug: string
    reportId: string
    workspace: string
  }
  export type RepositoriesCreate = {
    _body?: Schema.Repository
    repo_slug: string
    workspace: string
  }
  export type RepositoriesCreateBranch = {
    _body: any
    repo_slug: string
    workspace: string
  }
  export type RepositoriesCreateBranchRestriction = {
    _body: Schema.Branchrestriction
    repo_slug: string
    workspace: string
  }
  export type RepositoriesCreateCommitApproval = {
    commit: string
    repo_slug: string
    workspace: string
  }
  export type RepositoriesCreateCommitBuildStatus = {
    _body?: Schema.Commitstatus
    commit: string
    repo_slug: string
    workspace: string
  }
  export type RepositoriesCreateCommitComment = {
    _body: Schema.CommitComment
    commit: string
    repo_slug: string
    workspace: string
  }
  export type RepositoriesCreateDeployKey = {
    key: string
    label: string
    repo_slug: string
    workspace: string
  }
  export type RepositoriesCreateDeploymentVariable = {
    _body: Schema.DeploymentVariable
    environment_uuid: string
    repo_slug: string
    variable_uuid: string
    workspace: string
  }
  export type RepositoriesCreateDownload = {
    _body: FormData
    repo_slug: string
    workspace: string
  }
  export type RepositoriesCreateEnvironment = {
    _body: Schema.DeploymentEnvironment
    repo_slug: string
    workspace: string
  }
  export type RepositoriesCreateFork = {
    _body?: Schema.Repository
    repo_slug: string
    workspace: string
  }
  export type RepositoriesCreateIssue = {
    _body: Schema.Issue
    repo_slug: string
    workspace: string
  }
  export type RepositoriesCreateIssueAttachments = {
    _body: FormData
    issue_id: string
    repo_slug: string
    workspace: string
  }
  export type RepositoriesCreateIssueChange = {
    _body: Schema.IssueChange
    issue_id: string
    repo_slug: string
    workspace: string
  }
  export type RepositoriesCreateIssueComment = {
    _body: Schema.IssueComment
    issue_id: string
    repo_slug: string
    workspace: string
  }
  export type RepositoriesCreateIssueExportJob = {
    _body?: Schema.ExportOptions
    repo_slug: string
    workspace: string
  }
  export type RepositoriesCreateIssueImportJob = {
    repo_slug: string
    workspace: string
  }
  export type RepositoriesCreateIssueVote = {
    issue_id: string
    repo_slug: string
    workspace: string
  }
  export type RepositoriesCreateIssueWatch = {
    issue_id: string
    repo_slug: string
    workspace: string
  }
  export type RepositoriesCreateOrUpdateAnnotation = {
    _body: Schema.ReportAnnotation
    annotationId: string
    commit: string
    repo_slug: string
    reportId: string
    workspace: string
  }
  export type RepositoriesCreateOrUpdateReport = {
    _body: Schema.Report
    commit: string
    repo_slug: string
    reportId: string
    workspace: string
  }
  export type RepositoriesCreatePipeline = {
    _body: Schema.Pipeline
    repo_slug: string
    workspace: string
  }
  export type RepositoriesCreatePipelineKnownHost = {
    _body: Schema.PipelineKnownHost
    repo_slug: string
    workspace: string
  }
  export type RepositoriesCreatePipelineSchedule = {
    _body: Schema.PipelineSchedule
    repo_slug: string
    workspace: string
  }
  export type RepositoriesCreatePipelineVariable = {
    _body: Schema.PipelineVariable
    repo_slug: string
    workspace: string
  }
  export type RepositoriesCreatePullRequest = {
    _body?: Schema.Pullrequest
    repo_slug: string
    workspace: string
  }
  export type RepositoriesCreatePullRequestApproval = {
    pull_request_id: number
    repo_slug: string
    workspace: string
  }
  export type RepositoriesCreatePullRequestComment = {
    _body: Schema.PullrequestComment
    pull_request_id: number
    repo_slug: string
    workspace: string
  }
  export type RepositoriesCreateSrcFileCommit = {
    _body?: FormData | Schema.AnyObject
    author?: string
    branch?: string
    files?: string
    message?: string
    parents?: string
    repo_slug: string
    workspace: string
  }
  export type RepositoriesCreateTag = {
    _body: Schema.Tag
    repo_slug: string
    workspace: string
  }
  export type RepositoriesCreateWebhook = {
    _body: any
    repo_slug: string
    workspace: string
  }
  export type RepositoriesDeclinePullRequest = {
    pull_request_id: number
    repo_slug: string
    workspace: string
  }
  export type RepositoriesDelete = {
    redirect_to?: string
    repo_slug: string
    workspace: string
  }
  export type RepositoriesDeleteAnnotation = {
    annotationId: string
    commit: string
    repo_slug: string
    reportId: string
    workspace: string
  }
  export type RepositoriesDeleteBranch = {
    name: string
    repo_slug: string
    workspace: string
  }
  export type RepositoriesDeleteBranchRestriction = {
    id: string
    repo_slug: string
    workspace: string
  }
  export type RepositoriesDeleteCommitApproval = {
    commit: string
    repo_slug: string
    workspace: string
  }
  export type RepositoriesDeleteCommitHostedPropertyValue = {
    app_key: string
    commit: string
    property_name: string
    repo_slug: string
    workspace: string
  }
  export type RepositoriesDeleteDefaultReviewer = {
    repo_slug: string
    target_username: string
    workspace: string
  }
  export type RepositoriesDeleteDeployKey = {
    key_id: string
    repo_slug: string
    workspace: string
  }
  export type RepositoriesDeleteDeploymentVariable = {
    environment_uuid: string
    repo_slug: string
    variable_uuid: string
    workspace: string
  }
  export type RepositoriesDeleteDownload = {
    filename: string
    repo_slug: string
    workspace: string
  }
  export type RepositoriesDeleteEnvironment = {
    environment_uuid: string
    repo_slug: string
    workspace: string
  }
  export type RepositoriesDeleteIssue = {
    issue_id: string
    repo_slug: string
    workspace: string
  }
  export type RepositoriesDeleteIssueAttachment = {
    issue_id: string
    path: string
    repo_slug: string
    workspace: string
  }
  export type RepositoriesDeleteIssueComment = {
    _body: Schema.IssueComment
    comment_id: number
    issue_id: string
    repo_slug: string
    workspace: string
  }
  export type RepositoriesDeleteIssueVote = {
    issue_id: string
    repo_slug: string
    workspace: string
  }
  export type RepositoriesDeleteIssueWatch = {
    issue_id: string
    repo_slug: string
    workspace: string
  }
  export type RepositoriesDeletePipelineKnownHost = {
    known_host_uuid: string
    repo_slug: string
    workspace: string
  }
  export type RepositoriesDeletePipelineSchedule = {
    repo_slug: string
    schedule_uuid: string
    workspace: string
  }
  export type RepositoriesDeletePipelineSshKeyPair = {
    repo_slug: string
    workspace: string
  }
  export type RepositoriesDeletePipelineVariable = {
    repo_slug: string
    variable_uuid: string
    workspace: string
  }
  export type RepositoriesDeletePullRequestApproval = {
    pull_request_id: number
    repo_slug: string
    workspace: string
  }
  export type RepositoriesDeletePullRequestComment = {
    comment_id: number
    pull_request_id: number
    repo_slug: string
    workspace: string
  }
  export type RepositoriesDeletePullRequestHostedPropertyValue = {
    app_key: string
    property_name: string
    pullrequest_id: string
    repo_slug: string
    workspace: string
  }
  export type RepositoriesDeleteReport = {
    commit: string
    repo_slug: string
    reportId: string
    workspace: string
  }
  export type RepositoriesDeleteRepositoryHostedPropertyValue = {
    app_key: string
    property_name: string
    repo_slug: string
    workspace: string
  }
  export type RepositoriesDeleteRepositoryPipelineCache = {
    cache_uuid: string
    repo_slug: string
    workspace: string
  }
  export type RepositoriesDeleteTag = {
    name: string
    repo_slug: string
    workspace: string
  }
  export type RepositoriesDeleteWebhook = {
    repo_slug: string
    uid: string
    workspace: string
  }
  export type RepositoriesGet = {
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type RepositoriesGetAnnotation = {
    annotationId: string
    commit: string
    repo_slug: string
    reportId: string
    workspace: string
    fields?: string
  }
  export type RepositoriesGetAnnotationsForReport = {
    commit: string
    repo_slug: string
    reportId: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type RepositoriesGetBranch = {
    name: string
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type RepositoriesGetBranchingModel = {
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type RepositoriesGetBranchingModelSettings = {
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type RepositoriesGetBranchRestriction = {
    id: string
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type RepositoriesGetCommit = {
    commit: string
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type RepositoriesGetCommitBuildStatus = {
    commit: string
    key: string
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type RepositoriesGetCommitComment = {
    comment_id: number
    commit: string
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type RepositoriesGetCommitHostedPropertyValue = {
    app_key: string
    commit: string
    property_name: string
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type RepositoriesGetDefaultReviewer = {
    repo_slug: string
    target_username: string
    workspace: string
    fields?: string
  }
  export type RepositoriesGetDeployKey = {
    key_id: string
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type RepositoriesGetDeployment = {
    deployment_uuid: string
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type RepositoriesGetDiff = {
    binary?: boolean
    context?: number
    ignore_whitespace?: boolean
    merge?: boolean
    path?: string
    renames?: boolean
    repo_slug: string
    spec: string
    workspace: string
    fields?: string
  }
  export type RepositoriesGetDownload = {
    filename: string
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type RepositoriesGetEnvironment = {
    environment_uuid: string
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type RepositoriesGetIssue = {
    issue_id: string
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type RepositoriesGetIssueAttachment = {
    issue_id: string
    path: string
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type RepositoriesGetIssueChange = {
    change_id: string
    issue_id: string
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type RepositoriesGetIssueComment = {
    comment_id: number
    issue_id: string
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type RepositoriesGetIssueComponent = {
    component_id: number
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type RepositoriesGetIssueExportJobStatus = {
    repo_name: string
    repo_slug: string
    task_id: string
    workspace: string
    fields?: string
  }
  export type RepositoriesGetIssueImportJobStatus = {
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type RepositoriesGetIssueMilestone = {
    milestone_id: number
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type RepositoriesGetIssueVersion = {
    repo_slug: string
    version_id: number
    workspace: string
    fields?: string
  }
  export type RepositoriesGetIssueVote = {
    issue_id: string
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type RepositoriesGetIssueWatch = {
    issue_id: string
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type RepositoriesGetPatch = {
    repo_slug: string
    spec: string
    workspace: string
    fields?: string
  }
  export type RepositoriesGetPipeline = {
    pipeline_uuid: string
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type RepositoriesGetPipelineConfig = {
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type RepositoriesGetPipelineKnownHost = {
    known_host_uuid: string
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type RepositoriesGetPipelineSchedule = {
    repo_slug: string
    schedule_uuid: string
    workspace: string
    fields?: string
  }
  export type RepositoriesGetPipelineSshKeyPair = {
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type RepositoriesGetPipelineStep = {
    pipeline_uuid: string
    repo_slug: string
    step_uuid: string
    workspace: string
    fields?: string
  }
  export type RepositoriesGetPipelineStepLog = {
    pipeline_uuid: string
    repo_slug: string
    step_uuid: string
    workspace: string
    fields?: string
  }
  export type RepositoriesGetPipelineVariable = {
    repo_slug: string
    variable_uuid: string
    workspace: string
    fields?: string
  }
  export type RepositoriesGetPullRequest = {
    pull_request_id: number
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type RepositoriesGetPullRequestComment = {
    comment_id: number
    pull_request_id: number
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type RepositoriesGetPullRequestDiff = {
    pull_request_id: number
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type RepositoriesGetPullRequestDiffStat = {
    pull_request_id: number
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type RepositoriesGetPullRequestHostedPropertyValue = {
    app_key: string
    property_name: string
    pullrequest_id: string
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type RepositoriesGetPullRequestPatch = {
    pull_request_id: number
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type RepositoriesGetReport = {
    commit: string
    repo_slug: string
    reportId: string
    workspace: string
    fields?: string
  }
  export type RepositoriesGetReportsForCommit = {
    commit: string
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type RepositoriesGetRepositoryHostedPropertyValue = {
    app_key: string
    property_name: string
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type RepositoriesGetRepositoryPipelineCacheContentUri = {
    cache_uuid: string
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type RepositoriesGetRepositoryPipelineCaches = {
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type RepositoriesGetTag = {
    name: string
    repo_slug: string
    workspace: string
    fields?: string
  }
  export type RepositoriesGetWebhook = {
    repo_slug: string
    uid: string
    workspace: string
    fields?: string
  }
  export type RepositoriesList = {
    role?: 'admin' | 'contributor' | 'member' | 'owner'
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type RepositoriesListBranches = {
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type RepositoriesListBranchRestrictions = {
    kind?: string
    pattern?: string
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type RepositoriesListCommitComments = {
    commit: string
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type RepositoriesListCommits = {
    exclude?: string
    include?: string
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type RepositoriesListCommitsAlt = {
    exclude?: string
    include?: string
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
  }
  export type RepositoriesListCommitsAt = {
    exclude?: string
    include?: string
    repo_slug: string
    revision: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type RepositoriesListCommitsAtAlt = {
    exclude?: string
    include?: string
    repo_slug: string
    revision: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
  }
  export type RepositoriesListCommitStatuses = {
    commit: string
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type RepositoriesListComponents = {
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type RepositoriesListDefaultReviewers = {
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type RepositoriesListDeployKeys = {
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type RepositoriesListDeployments = {
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type RepositoriesListDeploymentVariables = {
    environment_uuid: string
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type RepositoriesListDiffStats = {
    ignore_whitespace?: boolean
    merge?: boolean
    path?: string
    renames?: boolean
    repo_slug: string
    spec: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type RepositoriesListDownloads = {
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type RepositoriesListEnvironments = {
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type RepositoriesListFileHistory = {
    commit: string
    path: string
    renames?: string
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type RepositoriesListForks = {
    repo_slug: string
    role?: 'admin' | 'contributor' | 'member' | 'owner'
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type RepositoriesListGlobal = {
    after?: string
    role?: 'admin' | 'contributor' | 'member' | 'owner'
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type RepositoriesListIssueAttachments = {
    issue_id: string
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type RepositoriesListIssueChanges = {
    issue_id: string
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type RepositoriesListIssueComments = {
    issue_id: string
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type RepositoriesListIssues = {
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type RepositoriesListMilestones = {
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type RepositoriesListPermissions = {
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type RepositoriesListPipelineKnownHosts = {
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type RepositoriesListPipelines = {
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type RepositoriesListPipelineScheduleExecutions = {
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type RepositoriesListPipelineSchedules = {
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type RepositoriesListPipelineSteps = {
    pipeline_uuid: string
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type RepositoriesListPipelineVariables = {
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type RepositoriesListPullRequestActivities = {
    pull_request_id: number
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type RepositoriesListPullRequestActivitiesForRepo = {
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type RepositoriesListPullRequestComments = {
    pull_request_id: number
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type RepositoriesListPullRequestCommits = {
    pull_request_id: number
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type RepositoriesListPullRequests = {
    repo_slug: string
    state?: 'MERGED' | 'SUPERSEDED' | 'OPEN' | 'DECLINED'
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type RepositoriesListPullrequestsForCommit = {
    commit: string
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type RepositoriesListPullRequestStatuses = {
    pull_request_id: number
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type RepositoriesListRefs = {
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type RepositoriesListTags = {
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type RepositoriesListVersions = {
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type RepositoriesListWatchers = {
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type RepositoriesListWebhooks = {
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type RepositoriesMergePullRequest = {
    _body?: Schema.PullrequestMergeParameters
    async?: boolean
    pull_request_id: number
    repo_slug: string
    workspace: string
  }
  export type RepositoriesReadSrc = {
    commit: string
    format?: 'meta' | 'rendered'
    max_depth?: number
    path: string
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type RepositoriesReadSrcRoot = {
    format?: 'meta'
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type RepositoriesStopPipeline = {
    pipeline_uuid: string
    repo_slug: string
    workspace: string
  }
  export type RepositoriesUpdate = {
    _body?: Schema.Repository
    repo_slug: string
    workspace: string
  }
  export type RepositoriesUpdateBranchingModelSettings = {
    _body?: Schema.BranchingModelSettings
    repo_slug: string
    workspace: string
  }
  export type RepositoriesUpdateBranchRestriction = {
    _body: Schema.Branchrestriction
    id: string
    repo_slug: string
    workspace: string
  }
  export type RepositoriesUpdateCommitBuildStatus = {
    _body?: Schema.Commitstatus
    commit: string
    key: string
    repo_slug: string
    workspace: string
  }
  export type RepositoriesUpdateCommitHostedPropertyValue = {
    app_key: string
    commit: string
    property_name: string
    repo_slug: string
    workspace: string
  }
  export type RepositoriesUpdateDeployKey = {
    key_id: string
    repo_slug: string
    workspace: string
  }
  export type RepositoriesUpdateDeploymentVariable = {
    _body: Schema.DeploymentVariable
    environment_uuid: string
    repo_slug: string
    variable_uuid: string
    workspace: string
  }
  export type RepositoriesUpdateEnvironment = {
    _body: any
    environment_uuid: string
    repo_slug: string
    workspace: string
  }
  export type RepositoriesUpdateIssue = {
    _body: Schema.Issue
    issue_id: string
    repo_slug: string
    workspace: string
  }
  export type RepositoriesUpdateIssueComment = {
    _body: Schema.IssueComment
    comment_id: number
    issue_id: string
    repo_slug: string
    workspace: string
  }
  export type RepositoriesUpdatePipelineBuildNumber = {
    _body: Schema.PipelineBuildNumber
    repo_slug: string
    workspace: string
  }
  export type RepositoriesUpdatePipelineConfig = {
    _body: Schema.PipelinesConfig
    repo_slug: string
    workspace: string
  }
  export type RepositoriesUpdatePipelineKnownHost = {
    _body: Schema.PipelineKnownHost
    known_host_uuid: string
    repo_slug: string
    workspace: string
  }
  export type RepositoriesUpdatePipelineSchedule = {
    _body: Schema.PipelineSchedule
    repo_slug: string
    schedule_uuid: string
    workspace: string
  }
  export type RepositoriesUpdatePipelineSshKeyPair = {
    _body: Schema.PipelineSshKeyPair
    repo_slug: string
    workspace: string
  }
  export type RepositoriesUpdatePipelineVariable = {
    _body: Schema.PipelineVariable
    repo_slug: string
    variable_uuid: string
    workspace: string
  }
  export type RepositoriesUpdatePullRequest = {
    _body?: Schema.Pullrequest
    pull_request_id: number
    repo_slug: string
    workspace: string
  }
  export type RepositoriesUpdatePullRequestComment = {
    _body: Schema.PullrequestComment
    comment_id: number
    pull_request_id: number
    repo_slug: string
    workspace: string
  }
  export type RepositoriesUpdatePullRequestHostedPropertyValue = {
    app_key: string
    property_name: string
    pullrequest_id: string
    repo_slug: string
    workspace: string
  }
  export type RepositoriesUpdateRepositoryHostedPropertyValue = {
    app_key: string
    property_name: string
    repo_slug: string
    workspace: string
  }
  export type RepositoriesUpdateWebhook = {
    repo_slug: string
    uid: string
    workspace: string
  }
  export type SearchCodeOfTeam = {
    search_query: string
    username: string
    fields?: string
  }
  export type SearchCodeOfUser = {
    search_query: string
    selected_user: string
    fields?: string
  }
  export type SearchSearchAccount = {
    search_query: string
    workspace: string
    fields?: string
  }
  export type SnippetGetRawFiles = {
    encoded_id: string
    path: string
    workspace: string
    fields?: string
  }
  export type SnippetsCheckWatch = {
    encoded_id: string
    workspace: string
    fields?: string
  }
  export type SnippetsCreate = {
    _body: Schema.Snippet
  }
  export type SnippetsCreateComment = {
    _body: Schema.Snippet
    encoded_id: string
    workspace: string
  }
  export type SnippetsCreateForUser = {
    _body: Schema.Snippet
    workspace: string
  }
  export type SnippetsDelete = {
    encoded_id: string
    workspace: string
  }
  export type SnippetsDeleteAt = {
    encoded_id: string
    node_id: string
    workspace: string
  }
  export type SnippetsDeleteComment = {
    comment_id: number
    encoded_id: string
    workspace: string
  }
  export type SnippetsGet = {
    encoded_id: string
    workspace: string
    fields?: string
  }
  export type SnippetsGetAt = {
    encoded_id: string
    node_id: string
    workspace: string
    fields?: string
  }
  export type SnippetsGetComment = {
    comment_id: number
    encoded_id: string
    workspace: string
    fields?: string
  }
  export type SnippetsGetCommit = {
    encoded_id: string
    revision: string
    workspace: string
    fields?: string
  }
  export type SnippetsGetDiff = {
    encoded_id: string
    path?: string
    revision: string
    workspace: string
    fields?: string
  }
  export type SnippetsGetFile = {
    encoded_id: string
    node_id: string
    path: string
    workspace: string
    fields?: string
  }
  export type SnippetsGetPatch = {
    encoded_id: string
    revision: string
    workspace: string
    fields?: string
  }
  export type SnippetsGetRawFiles = {
    encoded_id: string
    path: string
    workspace: string
    fields?: string
  }
  export type SnippetsList = {
    role?: 'owner' | 'contributor' | 'member'
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type SnippetsListComments = {
    encoded_id: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type SnippetsListCommits = {
    encoded_id: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type SnippetsListForUser = {
    role?: 'owner' | 'contributor' | 'member'
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type SnippetsListWatchers = {
    encoded_id: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type SnippetsStartWatch = {
    encoded_id: string
    workspace: string
  }
  export type SnippetsStopWatch = {
    encoded_id: string
    workspace: string
  }
  export type SnippetsUpdate = {
    encoded_id: string
    workspace: string
  }
  export type SnippetsUpdateAt = {
    encoded_id: string
    node_id: string
    workspace: string
  }
  export type SnippetsUpdateComment = {
    comment_id: number
    encoded_id: string
    workspace: string
  }
  export type SourceCreateFileCommit = {
    _body?: FormData | Schema.AnyObject
    author?: string
    branch?: string
    files?: string
    message?: string
    parents?: string
    repo_slug: string
    workspace: string
  }
  export type SourceListHistory = {
    commit: string
    path: string
    renames?: string
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type SourceRead = {
    commit: string
    format?: 'meta' | 'rendered'
    max_depth?: number
    path: string
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type SourceReadRoot = {
    format?: 'meta'
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type SshCreateKey = {
    _body?: Schema.SshAccountKey
    selected_user: string
  }
  export type SshDeleteKey = {
    key_id: string
    selected_user: string
  }
  export type SshGetKey = {
    key_id: string
    selected_user: string
    fields?: string
  }
  export type SshListKeys = {
    selected_user: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type SshUpdateKey = {
    _body?: Schema.SshAccountKey
    key_id: string
    selected_user: string
  }
  export type TeamsCreatePipelineVariable = {
    _body?: Schema.PipelineVariable
    username: string
  }
  export type TeamsCreateProject = {
    _body: Schema.Project
    username: string
  }
  export type TeamsCreateWebhook = {
    username: string
  }
  export type TeamsDeletePipelineVariable = {
    username: string
    variable_uuid: string
  }
  export type TeamsDeleteProject = {
    project_key: string
    username: string
  }
  export type TeamsDeleteWebhook = {
    uid: string
    username: string
  }
  export type TeamsGet = {
    username: string
    fields?: string
  }
  export type TeamsGetAllMembers = {
    username: string
    fields?: string
  }
  export type TeamsGetMembers = {
    username: string
    fields?: string
  }
  export type TeamsGetPipelineVariable = {
    username: string
    variable_uuid: string
    fields?: string
  }
  export type TeamsGetProject = {
    project_key: string
    username: string
    fields?: string
  }
  export type TeamsGetWebhook = {
    uid: string
    username: string
    fields?: string
  }
  export type TeamsList = {
    role?: 'admin' | 'contributor' | 'member'
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type TeamsListFollowers = {
    username: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type TeamsListFollowing = {
    username: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type TeamsListPermissions = {
    username: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type TeamsListPermissionsForRepo = {
    repo_slug: string
    username: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type TeamsListPermissionsForRepos = {
    username: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type TeamsListPipelineVariables = {
    username: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type TeamsListProjects = {
    username: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type TeamsListRepositories = {
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type TeamsListRepositoriesForUser = {
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type TeamsListWebhooks = {
    username: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type TeamsSearchCode = {
    search_query: string
    username: string
    fields?: string
  }
  export type TeamsUpdatePipelineVariable = {
    _body: Schema.PipelineVariable
    username: string
    variable_uuid: string
  }
  export type TeamsUpdateProject = {
    _body: Schema.Project
    project_key: string
    username: string
  }
  export type TeamsUpdateWebhook = {
    uid: string
    username: string
  }
  export type UserGet = {
    fields?: string
  }
  export type UserGetEmail = {
    email: string
    fields?: string
  }
  export type UserListEmails = {
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type UserListPermissionsForRepos = {
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type UserListPermissionsForTeams = {
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type UsersCreatePipelineVariable = {
    _body?: Schema.PipelineVariable
    selected_user: string
  }
  export type UsersCreateSshKey = {
    _body?: Schema.SshAccountKey
    selected_user: string
  }
  export type UsersCreateWebhook = {
    selected_user: string
  }
  export type UsersDeletePipelineVariable = {
    selected_user: string
    variable_uuid: string
  }
  export type UsersDeleteSshKey = {
    key_id: string
    selected_user: string
  }
  export type UsersDeleteUserHostedPropertyValue = {
    app_key: string
    property_name: string
    selected_user: string
  }
  export type UsersDeleteWebhook = {
    selected_user: string
    uid: string
  }
  export type UsersGet = {
    selected_user: string
    fields?: string
  }
  export type UsersGetAuthedUser = {
    fields?: string
  }
  export type UsersGetEmailForAuthedUser = {
    email: string
    fields?: string
  }
  export type UsersGetPipelineVariable = {
    selected_user: string
    variable_uuid: string
    fields?: string
  }
  export type UsersGetSshKey = {
    key_id: string
    selected_user: string
    fields?: string
  }
  export type UsersGetTeamMembers = {
    username: string
    fields?: string
  }
  export type UsersGetWebhook = {
    selected_user: string
    uid: string
    fields?: string
  }
  export type UsersListEmailsForAuthedUser = {
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type UsersListPipelineVariables = {
    selected_user: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type UsersListRepositories = {
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type UsersListRepositoriesForTeam = {
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type UsersListSshKeys = {
    selected_user: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type UsersListWebhooks = {
    selected_user: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type UsersRetrieveUserHostedPropertyValue = {
    app_key: string
    property_name: string
    selected_user: string
    fields?: string
  }
  export type UsersSearchCode = {
    search_query: string
    selected_user: string
    fields?: string
  }
  export type UsersUpdatePipelineVariable = {
    _body: Schema.PipelineVariable
    selected_user: string
    variable_uuid: string
  }
  export type UsersUpdateSshKey = {
    _body?: Schema.SshAccountKey
    key_id: string
    selected_user: string
  }
  export type UsersUpdateUserHostedPropertyValue = {
    app_key: string
    property_name: string
    selected_user: string
  }
  export type UsersUpdateWebhook = {
    selected_user: string
    uid: string
  }
  export type WebhooksCreate = {
    _body: any
    repo_slug: string
    workspace: string
  }
  export type WebhooksCreateForTeam = {
    username: string
  }
  export type WebhooksCreateForUser = {
    selected_user: string
  }
  export type WebhooksCreateWebhookForWorkspace = {
    workspace: string
  }
  export type WebhooksDelete = {
    repo_slug: string
    uid: string
    workspace: string
  }
  export type WebhooksDeleteForTeam = {
    uid: string
    username: string
  }
  export type WebhooksDeleteForUser = {
    selected_user: string
    uid: string
  }
  export type WebhooksDeleteWebhookForWorkspace = {
    uid: string
    workspace: string
  }
  export type WebhooksGet = {
    repo_slug: string
    uid: string
    workspace: string
    fields?: string
  }
  export type WebhooksGetAllSubjectTypes = {
    fields?: string
  }
  export type WebhooksGetForTeam = {
    uid: string
    username: string
    fields?: string
  }
  export type WebhooksGetForUser = {
    selected_user: string
    uid: string
    fields?: string
  }
  export type WebhooksGetWebhookForWorkspace = {
    uid: string
    workspace: string
    fields?: string
  }
  export type WebhooksGetWebhooksForWorkspace = {
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type WebhooksList = {
    subject_type: 'workspace' | 'user' | 'repository' | 'team'
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type WebhooksListForRepo = {
    repo_slug: string
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type WebhooksListForTeam = {
    username: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type WebhooksListForUser = {
    selected_user: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type WebhooksUpdate = {
    repo_slug: string
    uid: string
    workspace: string
  }
  export type WebhooksUpdateForTeam = {
    uid: string
    username: string
  }
  export type WebhooksUpdateForUser = {
    selected_user: string
    uid: string
  }
  export type WebhooksUpdateWebhookForWorkspace = {
    uid: string
    workspace: string
  }
  export type WorkspacesCreateOrUpdateProject = {
    _body: Schema.Project
    project_key: string
    workspace: string
  }
  export type WorkspacesCreatePipelineVariableForWorkspace = {
    _body?: Schema.PipelineVariable
    workspace: string
  }
  export type WorkspacesCreateProject = {
    _body: Schema.Project
    workspace: string
  }
  export type WorkspacesCreateWebhookForWorkspace = {
    workspace: string
  }
  export type WorkspacesDeletePipelineVariableForWorkspace = {
    variable_uuid: string
    workspace: string
  }
  export type WorkspacesDeleteProject = {
    project_key: string
    workspace: string
  }
  export type WorkspacesDeleteWebhookForWorkspace = {
    uid: string
    workspace: string
  }
  export type WorkspacesGetMemberForWorkspace = {
    member: string
    workspace: string
    fields?: string
  }
  export type WorkspacesGetMembersForWorkspace = {
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type WorkspacesGetPipelineVariableForWorkspace = {
    variable_uuid: string
    workspace: string
    fields?: string
  }
  export type WorkspacesGetPipelineVariablesForWorkspace = {
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type WorkspacesGetProject = {
    project_key: string
    workspace: string
    fields?: string
  }
  export type WorkspacesGetProjects = {
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type WorkspacesGetWebhookForWorkspace = {
    uid: string
    workspace: string
    fields?: string
  }
  export type WorkspacesGetWebhooksForWorkspace = {
    workspace: string
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type WorkspacesGetWorkspace = {
    workspace: string
    fields?: string
  }
  export type WorkspacesGetWorkspaces = {
    role?: 'owner' | 'collaborator' | 'member'
    page?: string
    pagelen?: number
    q?: string
    sort?: string
    fields?: string
  }
  export type WorkspacesSearchAccount = {
    search_query: string
    workspace: string
    fields?: string
  }
  export type WorkspacesUpdatePipelineVariableForWorkspace = {
    _body: Schema.PipelineVariable
    variable_uuid: string
    workspace: string
  }
  export type WorkspacesUpdateWebhookForWorkspace = {
    uid: string
    workspace: string
  }
}

export interface APIEndpoints {
  branching_model: {
    get: (
      params: Params.BranchingModelGet
    ) => AsyncResponse<Schema.BranchingModel>
    getSettings: (
      params: Params.BranchingModelGetSettings
    ) => AsyncResponse<Schema.BranchingModelSettings>
    updateSettings: (
      params: Params.BranchingModelUpdateSettings
    ) => AsyncResponse<Schema.BranchingModelSettings>
  }
  branchrestrictions: {
    create: (
      params: Params.BranchrestrictionsCreate
    ) => AsyncResponse<Schema.Branchrestriction>
    delete: (
      params: Params.BranchrestrictionsDelete
    ) => AsyncResponse<Schema.Any>
    get: (
      params: Params.BranchrestrictionsGet
    ) => AsyncResponse<Schema.Branchrestriction>
    list: (
      params: Params.BranchrestrictionsList
    ) => AsyncResponse<Schema.PaginatedBranchrestrictions>
    update: (
      params: Params.BranchrestrictionsUpdate
    ) => AsyncResponse<Schema.Branchrestriction>
  }
  commits: {
    bulkCreateOrUpdateAnnotations: (
      params: Params.CommitsBulkCreateOrUpdateAnnotations
    ) => AsyncResponse<Schema.ReportAnnotation[]>
    createApproval: (
      params: Params.CommitsCreateApproval
    ) => AsyncResponse<Schema.Participant>
    createComment: (
      params: Params.CommitsCreateComment
    ) => AsyncResponse<Schema.Any>
    createOrUpdateAnnotation: (
      params: Params.CommitsCreateOrUpdateAnnotation
    ) => AsyncResponse<Schema.ReportAnnotation>
    createOrUpdateReport: (
      params: Params.CommitsCreateOrUpdateReport
    ) => AsyncResponse<Schema.Report>
    deleteAnnotation: (
      params: Params.CommitsDeleteAnnotation
    ) => AsyncResponse<Schema.Any>
    deleteApproval: (
      params: Params.CommitsDeleteApproval
    ) => AsyncResponse<Schema.Any>
    deleteReport: (
      params: Params.CommitsDeleteReport
    ) => AsyncResponse<Schema.Any>
    get: (params: Params.CommitsGet) => AsyncResponse<Schema.Commit>
    getAnnotation: (
      params: Params.CommitsGetAnnotation
    ) => AsyncResponse<Schema.ReportAnnotation>
    getAnnotationsForReport: (
      params: Params.CommitsGetAnnotationsForReport
    ) => AsyncResponse<Schema.PaginatedAnnotations>
    getComment: (
      params: Params.CommitsGetComment
    ) => AsyncResponse<Schema.CommitComment>
    getDiff: (params: Params.CommitsGetDiff) => AsyncResponse<Schema.Any>
    getPatch: (params: Params.CommitsGetPatch) => AsyncResponse<Schema.Any>
    getReport: (params: Params.CommitsGetReport) => AsyncResponse<Schema.Report>
    getReportsForCommit: (
      params: Params.CommitsGetReportsForCommit
    ) => AsyncResponse<Schema.PaginatedReports>
    list: (
      params: Params.CommitsList
    ) => AsyncResponse<Schema.PaginatedChangeset>
    listAlt: (
      params: Params.CommitsListAlt
    ) => AsyncResponse<Schema.PaginatedChangeset>
    listAt: (
      params: Params.CommitsListAt
    ) => AsyncResponse<Schema.PaginatedChangeset>
    listAtAlt: (
      params: Params.CommitsListAtAlt
    ) => AsyncResponse<Schema.PaginatedChangeset>
    listComments: (
      params: Params.CommitsListComments
    ) => AsyncResponse<Schema.PaginatedCommitComments>
  }
  commitstatuses: {
    createBuildStatus: (
      params: Params.CommitstatusesCreateBuildStatus
    ) => AsyncResponse<Schema.Commitstatus>
    getBuildStatus: (
      params: Params.CommitstatusesGetBuildStatus
    ) => AsyncResponse<Schema.Commitstatus>
    list: (
      params: Params.CommitstatusesList
    ) => AsyncResponse<Schema.PaginatedCommitstatuses>
    listPullRequestStatuses: (
      params: Params.CommitstatusesListPullRequestStatuses
    ) => AsyncResponse<Schema.PaginatedCommitstatuses>
    updateBuildStatus: (
      params: Params.CommitstatusesUpdateBuildStatus
    ) => AsyncResponse<Schema.Commitstatus>
  }
  deploy: {
    createKey: (
      params: Params.DeployCreateKey
    ) => AsyncResponse<Schema.DeployKey>
    deleteKey: (params: Params.DeployDeleteKey) => AsyncResponse<Schema.Any>
    getKey: (params: Params.DeployGetKey) => AsyncResponse<Schema.DeployKey>
    listKeys: (
      params: Params.DeployListKeys
    ) => AsyncResponse<Schema.PaginatedDeployKeys>
    updateKey: (
      params: Params.DeployUpdateKey
    ) => AsyncResponse<Schema.DeployKey>
  }
  deployments: {
    createEnvironment: (
      params: Params.DeploymentsCreateEnvironment
    ) => AsyncResponse<Schema.DeploymentEnvironment>
    deleteEnvironmentForRepository: (
      params: Params.DeploymentsDeleteEnvironmentForRepository
    ) => AsyncResponse<Schema.Any>
    get: (params: Params.DeploymentsGet) => AsyncResponse<Schema.Deployment>
    getEnvironment: (
      params: Params.DeploymentsGetEnvironment
    ) => AsyncResponse<Schema.DeploymentEnvironment>
    list: (
      params: Params.DeploymentsList
    ) => AsyncResponse<Schema.PaginatedDeployments>
    listEnvironments: (
      params: Params.DeploymentsListEnvironments
    ) => AsyncResponse<Schema.PaginatedEnvironments>
    updateEnvironment: (
      params: Params.DeploymentsUpdateEnvironment
    ) => AsyncResponse<Schema.Any>
  }
  downloads: {
    create: (params: Params.DownloadsCreate) => AsyncResponse<Schema.Any>
    delete: (params: Params.DownloadsDelete) => AsyncResponse<Schema.Any>
    get: (params: Params.DownloadsGet) => AsyncResponse<Schema.Any>
    list: (params: Params.DownloadsList) => AsyncResponse<Schema.Any>
  }
  hook_events: {
    getAllSubjectTypes: (
      params: Params.HookEventsGetAllSubjectTypes
    ) => AsyncResponse<Schema.SubjectTypes>
    list: (
      params: Params.HookEventsList
    ) => AsyncResponse<Schema.PaginatedHookEvents>
  }
  issue_tracker: {
    create: (params: Params.IssueTrackerCreate) => AsyncResponse<Schema.Issue>
    createAttachments: (
      params: Params.IssueTrackerCreateAttachments
    ) => AsyncResponse<Schema.Any>
    createChange: (
      params: Params.IssueTrackerCreateChange
    ) => AsyncResponse<Schema.IssueChange>
    createComment: (
      params: Params.IssueTrackerCreateComment
    ) => AsyncResponse<Schema.Any>
    createVote: (
      params: Params.IssueTrackerCreateVote
    ) => AsyncResponse<Schema.Error>
    createWatch: (
      params: Params.IssueTrackerCreateWatch
    ) => AsyncResponse<Schema.Error>
    delete: (params: Params.IssueTrackerDelete) => AsyncResponse<Schema.Issue>
    deleteAttachment: (
      params: Params.IssueTrackerDeleteAttachment
    ) => AsyncResponse<Schema.Any>
    deleteComment: (
      params: Params.IssueTrackerDeleteComment
    ) => AsyncResponse<Schema.Any>
    deleteVote: (
      params: Params.IssueTrackerDeleteVote
    ) => AsyncResponse<Schema.Any>
    deleteWatch: (
      params: Params.IssueTrackerDeleteWatch
    ) => AsyncResponse<Schema.Error>
    get: (params: Params.IssueTrackerGet) => AsyncResponse<Schema.Issue>
    getAttachment: (
      params: Params.IssueTrackerGetAttachment
    ) => AsyncResponse<Schema.Any>
    getChange: (
      params: Params.IssueTrackerGetChange
    ) => AsyncResponse<Schema.IssueChange>
    getComment: (
      params: Params.IssueTrackerGetComment
    ) => AsyncResponse<Schema.IssueComment>
    getComponent: (
      params: Params.IssueTrackerGetComponent
    ) => AsyncResponse<Schema.Component>
    getMilestone: (
      params: Params.IssueTrackerGetMilestone
    ) => AsyncResponse<Schema.Milestone>
    getVersion: (
      params: Params.IssueTrackerGetVersion
    ) => AsyncResponse<Schema.Version>
    getVote: (params: Params.IssueTrackerGetVote) => AsyncResponse<Schema.Error>
    getWatch: (
      params: Params.IssueTrackerGetWatch
    ) => AsyncResponse<Schema.Error>
    list: (
      params: Params.IssueTrackerList
    ) => AsyncResponse<Schema.PaginatedIssues>
    listAttachments: (
      params: Params.IssueTrackerListAttachments
    ) => AsyncResponse<Schema.PaginatedIssueAttachments>
    listChanges: (
      params: Params.IssueTrackerListChanges
    ) => AsyncResponse<Schema.PaginatedLogEntries>
    listComments: (
      params: Params.IssueTrackerListComments
    ) => AsyncResponse<Schema.PaginatedIssueComments>
    listComponents: (
      params: Params.IssueTrackerListComponents
    ) => AsyncResponse<Schema.PaginatedComponents>
    listMilestones: (
      params: Params.IssueTrackerListMilestones
    ) => AsyncResponse<Schema.PaginatedMilestones>
    listVersions: (
      params: Params.IssueTrackerListVersions
    ) => AsyncResponse<Schema.PaginatedVersions>
    update: (params: Params.IssueTrackerUpdate) => AsyncResponse<Schema.Issue>
    updateComment: (
      params: Params.IssueTrackerUpdateComment
    ) => AsyncResponse<Schema.IssueComment>
  }
  pipelines: {
    create: (params: Params.PipelinesCreate) => AsyncResponse<Schema.Pipeline>
    createDeploymentVariable: (
      params: Params.PipelinesCreateDeploymentVariable
    ) => AsyncResponse<Schema.DeploymentVariable>
    createKnownHost: (
      params: Params.PipelinesCreateKnownHost
    ) => AsyncResponse<Schema.PipelineKnownHost>
    createPipelineVariableForWorkspace: (
      params: Params.PipelinesCreatePipelineVariableForWorkspace
    ) => AsyncResponse<Schema.PipelineVariable>
    createSchedule: (
      params: Params.PipelinesCreateSchedule
    ) => AsyncResponse<Schema.PipelineSchedule>
    createVariable: (
      params: Params.PipelinesCreateVariable
    ) => AsyncResponse<Schema.PipelineVariable>
    createVariableForTeam: (
      params: Params.PipelinesCreateVariableForTeam
    ) => AsyncResponse<Schema.PipelineVariable>
    createVariableForUser: (
      params: Params.PipelinesCreateVariableForUser
    ) => AsyncResponse<Schema.PipelineVariable>
    deleteDeploymentVariable: (
      params: Params.PipelinesDeleteDeploymentVariable
    ) => AsyncResponse<Schema.Any>
    deleteKnownHost: (
      params: Params.PipelinesDeleteKnownHost
    ) => AsyncResponse<Schema.Any>
    deletePipelineVariableForWorkspace: (
      params: Params.PipelinesDeletePipelineVariableForWorkspace
    ) => AsyncResponse<Schema.Any>
    deleteRepositoryPipelineCache: (
      params: Params.PipelinesDeleteRepositoryPipelineCache
    ) => AsyncResponse<Schema.Any>
    deleteSchedule: (
      params: Params.PipelinesDeleteSchedule
    ) => AsyncResponse<Schema.Any>
    deleteSshKeyPair: (
      params: Params.PipelinesDeleteSshKeyPair
    ) => AsyncResponse<Schema.Any>
    deleteVariable: (
      params: Params.PipelinesDeleteVariable
    ) => AsyncResponse<Schema.Any>
    deleteVariableForTeam: (
      params: Params.PipelinesDeleteVariableForTeam
    ) => AsyncResponse<Schema.Any>
    deleteVariableForUser: (
      params: Params.PipelinesDeleteVariableForUser
    ) => AsyncResponse<Schema.Any>
    get: (params: Params.PipelinesGet) => AsyncResponse<Schema.Pipeline>
    getConfig: (
      params: Params.PipelinesGetConfig
    ) => AsyncResponse<Schema.PipelinesConfig>
    getKnownHost: (
      params: Params.PipelinesGetKnownHost
    ) => AsyncResponse<Schema.PipelineKnownHost>
    getPipelineVariableForWorkspace: (
      params: Params.PipelinesGetPipelineVariableForWorkspace
    ) => AsyncResponse<Schema.PipelineVariable>
    getPipelineVariablesForWorkspace: (
      params: Params.PipelinesGetPipelineVariablesForWorkspace
    ) => AsyncResponse<Schema.PaginatedPipelineVariables>
    getRepositoryPipelineCacheContentUri: (
      params: Params.PipelinesGetRepositoryPipelineCacheContentUri
    ) => AsyncResponse<Schema.PipelineCacheContentUri>
    getRepositoryPipelineCaches: (
      params: Params.PipelinesGetRepositoryPipelineCaches
    ) => AsyncResponse<Schema.PaginatedPipelineCaches>
    getSchedule: (
      params: Params.PipelinesGetSchedule
    ) => AsyncResponse<Schema.PipelineSchedule>
    getSshKeyPair: (
      params: Params.PipelinesGetSshKeyPair
    ) => AsyncResponse<Schema.PipelineSshKeyPair>
    getStep: (
      params: Params.PipelinesGetStep
    ) => AsyncResponse<Schema.PipelineStep>
    getStepLog: (
      params: Params.PipelinesGetStepLog
    ) => AsyncResponse<Schema.Any>
    getVariable: (
      params: Params.PipelinesGetVariable
    ) => AsyncResponse<Schema.PipelineVariable>
    getVariableForTeam: (
      params: Params.PipelinesGetVariableForTeam
    ) => AsyncResponse<Schema.PipelineVariable>
    getVariableForUser: (
      params: Params.PipelinesGetVariableForUser
    ) => AsyncResponse<Schema.PipelineVariable>
    list: (
      params: Params.PipelinesList
    ) => AsyncResponse<Schema.PaginatedPipelines>
    listDeploymentVariables: (
      params: Params.PipelinesListDeploymentVariables
    ) => AsyncResponse<Schema.PaginatedDeploymentVariable>
    listKnownHosts: (
      params: Params.PipelinesListKnownHosts
    ) => AsyncResponse<Schema.PaginatedPipelineKnownHosts>
    listScheduleExecutions: (
      params: Params.PipelinesListScheduleExecutions
    ) => AsyncResponse<Schema.PaginatedPipelineScheduleExecutions>
    listSchedules: (
      params: Params.PipelinesListSchedules
    ) => AsyncResponse<Schema.PaginatedPipelineSchedules>
    listSteps: (
      params: Params.PipelinesListSteps
    ) => AsyncResponse<Schema.PaginatedPipelineSteps>
    listVariablesForRepo: (
      params: Params.PipelinesListVariablesForRepo
    ) => AsyncResponse<Schema.PaginatedPipelineVariables>
    listVariablesForTeam: (
      params: Params.PipelinesListVariablesForTeam
    ) => AsyncResponse<Schema.PaginatedPipelineVariables>
    listVariablesForUser: (
      params: Params.PipelinesListVariablesForUser
    ) => AsyncResponse<Schema.PaginatedPipelineVariables>
    stop: (params: Params.PipelinesStop) => AsyncResponse<Schema.Any>
    updateBuildNumber: (
      params: Params.PipelinesUpdateBuildNumber
    ) => AsyncResponse<Schema.PipelineBuildNumber>
    updateConfig: (
      params: Params.PipelinesUpdateConfig
    ) => AsyncResponse<Schema.PipelinesConfig>
    updateDeploymentVariable: (
      params: Params.PipelinesUpdateDeploymentVariable
    ) => AsyncResponse<Schema.DeploymentVariable>
    updateKnownHost: (
      params: Params.PipelinesUpdateKnownHost
    ) => AsyncResponse<Schema.PipelineKnownHost>
    updatePipelineVariableForWorkspace: (
      params: Params.PipelinesUpdatePipelineVariableForWorkspace
    ) => AsyncResponse<Schema.PipelineVariable>
    updateSchedule: (
      params: Params.PipelinesUpdateSchedule
    ) => AsyncResponse<Schema.PipelineSchedule>
    updateSshKeyPair: (
      params: Params.PipelinesUpdateSshKeyPair
    ) => AsyncResponse<Schema.PipelineSshKeyPair>
    updateVariable: (
      params: Params.PipelinesUpdateVariable
    ) => AsyncResponse<Schema.PipelineVariable>
    updateVariableForTeam: (
      params: Params.PipelinesUpdateVariableForTeam
    ) => AsyncResponse<Schema.PipelineVariable>
    updateVariableForUser: (
      params: Params.PipelinesUpdateVariableForUser
    ) => AsyncResponse<Schema.PipelineVariable>
  }
  projects: {
    createForTeam: (
      params: Params.ProjectsCreateForTeam
    ) => AsyncResponse<Schema.Project>
    createOrUpdateProject: (
      params: Params.ProjectsCreateOrUpdateProject
    ) => AsyncResponse<Schema.Project>
    createProject: (
      params: Params.ProjectsCreateProject
    ) => AsyncResponse<Schema.Project>
    deleteForTeam: (
      params: Params.ProjectsDeleteForTeam
    ) => AsyncResponse<Schema.Any>
    deleteProject: (
      params: Params.ProjectsDeleteProject
    ) => AsyncResponse<Schema.Any>
    getForTeam: (
      params: Params.ProjectsGetForTeam
    ) => AsyncResponse<Schema.Project>
    getProject: (
      params: Params.ProjectsGetProject
    ) => AsyncResponse<Schema.Project>
    listForTeam: (
      params: Params.ProjectsListForTeam
    ) => AsyncResponse<Schema.PaginatedProjects>
    updateForTeam: (
      params: Params.ProjectsUpdateForTeam
    ) => AsyncResponse<Schema.Project>
  }
  properties: {
    deleteCommitHostedPropertyValue: (
      params: Params.PropertiesDeleteCommitHostedPropertyValue
    ) => AsyncResponse<Schema.Any>
    deletePullRequestHostedPropertyValue: (
      params: Params.PropertiesDeletePullRequestHostedPropertyValue
    ) => AsyncResponse<Schema.Any>
    deleteRepositoryHostedPropertyValue: (
      params: Params.PropertiesDeleteRepositoryHostedPropertyValue
    ) => AsyncResponse<Schema.Any>
    deleteUserHostedPropertyValue: (
      params: Params.PropertiesDeleteUserHostedPropertyValue
    ) => AsyncResponse<Schema.Any>
    getCommitHostedPropertyValue: (
      params: Params.PropertiesGetCommitHostedPropertyValue
    ) => AsyncResponse<Schema.Any>
    getPullRequestHostedPropertyValue: (
      params: Params.PropertiesGetPullRequestHostedPropertyValue
    ) => AsyncResponse<Schema.Any>
    getRepositoryHostedPropertyValue: (
      params: Params.PropertiesGetRepositoryHostedPropertyValue
    ) => AsyncResponse<Schema.Any>
    retrieveUserHostedPropertyValue: (
      params: Params.PropertiesRetrieveUserHostedPropertyValue
    ) => AsyncResponse<Schema.Any>
    updateCommitHostedPropertyValue: (
      params: Params.PropertiesUpdateCommitHostedPropertyValue
    ) => AsyncResponse<Schema.Any>
    updatePullRequestHostedPropertyValue: (
      params: Params.PropertiesUpdatePullRequestHostedPropertyValue
    ) => AsyncResponse<Schema.Any>
    updateRepositoryHostedPropertyValue: (
      params: Params.PropertiesUpdateRepositoryHostedPropertyValue
    ) => AsyncResponse<Schema.Any>
    updateUserHostedPropertyValue: (
      params: Params.PropertiesUpdateUserHostedPropertyValue
    ) => AsyncResponse<Schema.Any>
  }
  pullrequests: {
    addDefaultReviewer: (
      params: Params.PullrequestsAddDefaultReviewer
    ) => AsyncResponse<Schema.Any>
    create: (
      params: Params.PullrequestsCreate
    ) => AsyncResponse<Schema.Pullrequest>
    createApproval: (
      params: Params.PullrequestsCreateApproval
    ) => AsyncResponse<Schema.Participant>
    createComment: (
      params: Params.PullrequestsCreateComment
    ) => AsyncResponse<Schema.PullrequestComment>
    decline: (
      params: Params.PullrequestsDecline
    ) => AsyncResponse<Schema.Pullrequest>
    deleteApproval: (
      params: Params.PullrequestsDeleteApproval
    ) => AsyncResponse<Schema.Any>
    deleteComment: (
      params: Params.PullrequestsDeleteComment
    ) => AsyncResponse<Schema.Any>
    deleteDefaultReviewer: (
      params: Params.PullrequestsDeleteDefaultReviewer
    ) => AsyncResponse<Schema.Any>
    get: (params: Params.PullrequestsGet) => AsyncResponse<Schema.Pullrequest>
    getComment: (
      params: Params.PullrequestsGetComment
    ) => AsyncResponse<Schema.PullrequestComment>
    getDefaultReviewer: (
      params: Params.PullrequestsGetDefaultReviewer
    ) => AsyncResponse<Schema.Any>
    getDiff: (params: Params.PullrequestsGetDiff) => AsyncResponse<Schema.Any>
    getDiffStat: (
      params: Params.PullrequestsGetDiffStat
    ) => AsyncResponse<Schema.Any>
    getPatch: (params: Params.PullrequestsGetPatch) => AsyncResponse<Schema.Any>
    list: (
      params: Params.PullrequestsList
    ) => AsyncResponse<Schema.PaginatedPullrequests>
    listActivities: (
      params: Params.PullrequestsListActivities
    ) => AsyncResponse<Schema.Any>
    listActivitiesForRepo: (
      params: Params.PullrequestsListActivitiesForRepo
    ) => AsyncResponse<Schema.Any>
    listComments: (
      params: Params.PullrequestsListComments
    ) => AsyncResponse<Schema.PaginatedPullrequestComments>
    listCommits: (
      params: Params.PullrequestsListCommits
    ) => AsyncResponse<Schema.Any>
    listDefaultReviewers: (
      params: Params.PullrequestsListDefaultReviewers
    ) => AsyncResponse<Schema.Any>
    listForCommit: (
      params: Params.PullrequestsListForCommit
    ) => AsyncResponse<Schema.PaginatedPullrequests>
    listPullrequestsForUser: (
      params: Params.PullrequestsListPullrequestsForUser
    ) => AsyncResponse<Schema.PaginatedPullrequests>
    listStatuses: (
      params: Params.PullrequestsListStatuses
    ) => AsyncResponse<Schema.PaginatedCommitstatuses>
    merge: (
      params: Params.PullrequestsMerge
    ) => AsyncResponse<Schema.Pullrequest>
    update: (
      params: Params.PullrequestsUpdate
    ) => AsyncResponse<Schema.Pullrequest>
    updateComment: (
      params: Params.PullrequestsUpdateComment
    ) => AsyncResponse<Schema.PullrequestComment>
  }
  refs: {
    createBranch: (
      params: Params.RefsCreateBranch
    ) => AsyncResponse<Schema.Branch>
    createTag: (params: Params.RefsCreateTag) => AsyncResponse<Schema.Tag>
    deleteBranch: (params: Params.RefsDeleteBranch) => AsyncResponse<Schema.Any>
    deleteTag: (params: Params.RefsDeleteTag) => AsyncResponse<Schema.Any>
    getBranch: (params: Params.RefsGetBranch) => AsyncResponse<Schema.Branch>
    getTag: (params: Params.RefsGetTag) => AsyncResponse<Schema.Tag>
    list: (params: Params.RefsList) => AsyncResponse<Schema.PaginatedRefs>
    listBranches: (
      params: Params.RefsListBranches
    ) => AsyncResponse<Schema.PaginatedBranches>
    listTags: (
      params: Params.RefsListTags
    ) => AsyncResponse<Schema.PaginatedTags>
  }
  reports: {
    bulkCreateOrUpdateAnnotations: (
      params: Params.ReportsBulkCreateOrUpdateAnnotations
    ) => AsyncResponse<Schema.ReportAnnotation[]>
    createOrUpdateAnnotation: (
      params: Params.ReportsCreateOrUpdateAnnotation
    ) => AsyncResponse<Schema.ReportAnnotation>
    createOrUpdateReport: (
      params: Params.ReportsCreateOrUpdateReport
    ) => AsyncResponse<Schema.Report>
    deleteAnnotation: (
      params: Params.ReportsDeleteAnnotation
    ) => AsyncResponse<Schema.Any>
    deleteReport: (
      params: Params.ReportsDeleteReport
    ) => AsyncResponse<Schema.Any>
    getAnnotation: (
      params: Params.ReportsGetAnnotation
    ) => AsyncResponse<Schema.ReportAnnotation>
    getAnnotationsForReport: (
      params: Params.ReportsGetAnnotationsForReport
    ) => AsyncResponse<Schema.PaginatedAnnotations>
    getReport: (params: Params.ReportsGetReport) => AsyncResponse<Schema.Report>
    getReportsForCommit: (
      params: Params.ReportsGetReportsForCommit
    ) => AsyncResponse<Schema.PaginatedReports>
  }
  repositories: {
    addDefaultReviewer: (
      params: Params.RepositoriesAddDefaultReviewer
    ) => AsyncResponse<Schema.Any>
    bulkCreateOrUpdateAnnotations: (
      params: Params.RepositoriesBulkCreateOrUpdateAnnotations
    ) => AsyncResponse<Schema.ReportAnnotation[]>
    create: (
      params: Params.RepositoriesCreate
    ) => AsyncResponse<Schema.Repository>
    createBranch: (
      params: Params.RepositoriesCreateBranch
    ) => AsyncResponse<Schema.Branch>
    createBranchRestriction: (
      params: Params.RepositoriesCreateBranchRestriction
    ) => AsyncResponse<Schema.Branchrestriction>
    createCommitApproval: (
      params: Params.RepositoriesCreateCommitApproval
    ) => AsyncResponse<Schema.Participant>
    createCommitBuildStatus: (
      params: Params.RepositoriesCreateCommitBuildStatus
    ) => AsyncResponse<Schema.Commitstatus>
    createCommitComment: (
      params: Params.RepositoriesCreateCommitComment
    ) => AsyncResponse<Schema.Any>
    createDeployKey: (
      params: Params.RepositoriesCreateDeployKey
    ) => AsyncResponse<Schema.DeployKey>
    createDeploymentVariable: (
      params: Params.RepositoriesCreateDeploymentVariable
    ) => AsyncResponse<Schema.DeploymentVariable>
    createDownload: (
      params: Params.RepositoriesCreateDownload
    ) => AsyncResponse<Schema.Any>
    createEnvironment: (
      params: Params.RepositoriesCreateEnvironment
    ) => AsyncResponse<Schema.DeploymentEnvironment>
    createFork: (
      params: Params.RepositoriesCreateFork
    ) => AsyncResponse<Schema.Repository>
    createIssue: (
      params: Params.RepositoriesCreateIssue
    ) => AsyncResponse<Schema.Issue>
    createIssueAttachments: (
      params: Params.RepositoriesCreateIssueAttachments
    ) => AsyncResponse<Schema.Any>
    createIssueChange: (
      params: Params.RepositoriesCreateIssueChange
    ) => AsyncResponse<Schema.IssueChange>
    createIssueComment: (
      params: Params.RepositoriesCreateIssueComment
    ) => AsyncResponse<Schema.Any>
    createIssueExportJob: (
      params: Params.RepositoriesCreateIssueExportJob
    ) => AsyncResponse<Schema.Any>
    createIssueImportJob: (
      params: Params.RepositoriesCreateIssueImportJob
    ) => AsyncResponse<Schema.IssueJobStatus>
    createIssueVote: (
      params: Params.RepositoriesCreateIssueVote
    ) => AsyncResponse<Schema.Error>
    createIssueWatch: (
      params: Params.RepositoriesCreateIssueWatch
    ) => AsyncResponse<Schema.Error>
    createOrUpdateAnnotation: (
      params: Params.RepositoriesCreateOrUpdateAnnotation
    ) => AsyncResponse<Schema.ReportAnnotation>
    createOrUpdateReport: (
      params: Params.RepositoriesCreateOrUpdateReport
    ) => AsyncResponse<Schema.Report>
    createPipeline: (
      params: Params.RepositoriesCreatePipeline
    ) => AsyncResponse<Schema.Pipeline>
    createPipelineKnownHost: (
      params: Params.RepositoriesCreatePipelineKnownHost
    ) => AsyncResponse<Schema.PipelineKnownHost>
    createPipelineSchedule: (
      params: Params.RepositoriesCreatePipelineSchedule
    ) => AsyncResponse<Schema.PipelineSchedule>
    createPipelineVariable: (
      params: Params.RepositoriesCreatePipelineVariable
    ) => AsyncResponse<Schema.PipelineVariable>
    createPullRequest: (
      params: Params.RepositoriesCreatePullRequest
    ) => AsyncResponse<Schema.Pullrequest>
    createPullRequestApproval: (
      params: Params.RepositoriesCreatePullRequestApproval
    ) => AsyncResponse<Schema.Participant>
    createPullRequestComment: (
      params: Params.RepositoriesCreatePullRequestComment
    ) => AsyncResponse<Schema.PullrequestComment>
    createSrcFileCommit: (
      params: Params.RepositoriesCreateSrcFileCommit
    ) => AsyncResponse<Schema.Any>
    createTag: (
      params: Params.RepositoriesCreateTag
    ) => AsyncResponse<Schema.Tag>
    createWebhook: (
      params: Params.RepositoriesCreateWebhook
    ) => AsyncResponse<Schema.WebhookSubscription>
    declinePullRequest: (
      params: Params.RepositoriesDeclinePullRequest
    ) => AsyncResponse<Schema.Pullrequest>
    delete: (params: Params.RepositoriesDelete) => AsyncResponse<Schema.Any>
    deleteAnnotation: (
      params: Params.RepositoriesDeleteAnnotation
    ) => AsyncResponse<Schema.Any>
    deleteBranch: (
      params: Params.RepositoriesDeleteBranch
    ) => AsyncResponse<Schema.Any>
    deleteBranchRestriction: (
      params: Params.RepositoriesDeleteBranchRestriction
    ) => AsyncResponse<Schema.Any>
    deleteCommitApproval: (
      params: Params.RepositoriesDeleteCommitApproval
    ) => AsyncResponse<Schema.Any>
    deleteCommitHostedPropertyValue: (
      params: Params.RepositoriesDeleteCommitHostedPropertyValue
    ) => AsyncResponse<Schema.Any>
    deleteDefaultReviewer: (
      params: Params.RepositoriesDeleteDefaultReviewer
    ) => AsyncResponse<Schema.Any>
    deleteDeployKey: (
      params: Params.RepositoriesDeleteDeployKey
    ) => AsyncResponse<Schema.Any>
    deleteDeploymentVariable: (
      params: Params.RepositoriesDeleteDeploymentVariable
    ) => AsyncResponse<Schema.Any>
    deleteDownload: (
      params: Params.RepositoriesDeleteDownload
    ) => AsyncResponse<Schema.Any>
    deleteEnvironment: (
      params: Params.RepositoriesDeleteEnvironment
    ) => AsyncResponse<Schema.Any>
    deleteIssue: (
      params: Params.RepositoriesDeleteIssue
    ) => AsyncResponse<Schema.Issue>
    deleteIssueAttachment: (
      params: Params.RepositoriesDeleteIssueAttachment
    ) => AsyncResponse<Schema.Any>
    deleteIssueComment: (
      params: Params.RepositoriesDeleteIssueComment
    ) => AsyncResponse<Schema.Any>
    deleteIssueVote: (
      params: Params.RepositoriesDeleteIssueVote
    ) => AsyncResponse<Schema.Any>
    deleteIssueWatch: (
      params: Params.RepositoriesDeleteIssueWatch
    ) => AsyncResponse<Schema.Error>
    deletePipelineKnownHost: (
      params: Params.RepositoriesDeletePipelineKnownHost
    ) => AsyncResponse<Schema.Any>
    deletePipelineSchedule: (
      params: Params.RepositoriesDeletePipelineSchedule
    ) => AsyncResponse<Schema.Any>
    deletePipelineSshKeyPair: (
      params: Params.RepositoriesDeletePipelineSshKeyPair
    ) => AsyncResponse<Schema.Any>
    deletePipelineVariable: (
      params: Params.RepositoriesDeletePipelineVariable
    ) => AsyncResponse<Schema.Any>
    deletePullRequestApproval: (
      params: Params.RepositoriesDeletePullRequestApproval
    ) => AsyncResponse<Schema.Any>
    deletePullRequestComment: (
      params: Params.RepositoriesDeletePullRequestComment
    ) => AsyncResponse<Schema.Any>
    deletePullRequestHostedPropertyValue: (
      params: Params.RepositoriesDeletePullRequestHostedPropertyValue
    ) => AsyncResponse<Schema.Any>
    deleteReport: (
      params: Params.RepositoriesDeleteReport
    ) => AsyncResponse<Schema.Any>
    deleteRepositoryHostedPropertyValue: (
      params: Params.RepositoriesDeleteRepositoryHostedPropertyValue
    ) => AsyncResponse<Schema.Any>
    deleteRepositoryPipelineCache: (
      params: Params.RepositoriesDeleteRepositoryPipelineCache
    ) => AsyncResponse<Schema.Any>
    deleteTag: (
      params: Params.RepositoriesDeleteTag
    ) => AsyncResponse<Schema.Any>
    deleteWebhook: (
      params: Params.RepositoriesDeleteWebhook
    ) => AsyncResponse<Schema.Any>
    get: (params: Params.RepositoriesGet) => AsyncResponse<Schema.Repository>
    getAnnotation: (
      params: Params.RepositoriesGetAnnotation
    ) => AsyncResponse<Schema.ReportAnnotation>
    getAnnotationsForReport: (
      params: Params.RepositoriesGetAnnotationsForReport
    ) => AsyncResponse<Schema.PaginatedAnnotations>
    getBranch: (
      params: Params.RepositoriesGetBranch
    ) => AsyncResponse<Schema.Branch>
    getBranchingModel: (
      params: Params.RepositoriesGetBranchingModel
    ) => AsyncResponse<Schema.BranchingModel>
    getBranchingModelSettings: (
      params: Params.RepositoriesGetBranchingModelSettings
    ) => AsyncResponse<Schema.BranchingModelSettings>
    getBranchRestriction: (
      params: Params.RepositoriesGetBranchRestriction
    ) => AsyncResponse<Schema.Branchrestriction>
    getCommit: (
      params: Params.RepositoriesGetCommit
    ) => AsyncResponse<Schema.Commit>
    getCommitBuildStatus: (
      params: Params.RepositoriesGetCommitBuildStatus
    ) => AsyncResponse<Schema.Commitstatus>
    getCommitComment: (
      params: Params.RepositoriesGetCommitComment
    ) => AsyncResponse<Schema.CommitComment>
    getCommitHostedPropertyValue: (
      params: Params.RepositoriesGetCommitHostedPropertyValue
    ) => AsyncResponse<Schema.Any>
    getDefaultReviewer: (
      params: Params.RepositoriesGetDefaultReviewer
    ) => AsyncResponse<Schema.Any>
    getDeployKey: (
      params: Params.RepositoriesGetDeployKey
    ) => AsyncResponse<Schema.DeployKey>
    getDeployment: (
      params: Params.RepositoriesGetDeployment
    ) => AsyncResponse<Schema.Deployment>
    getDiff: (params: Params.RepositoriesGetDiff) => AsyncResponse<Schema.Any>
    getDownload: (
      params: Params.RepositoriesGetDownload
    ) => AsyncResponse<Schema.Any>
    getEnvironment: (
      params: Params.RepositoriesGetEnvironment
    ) => AsyncResponse<Schema.DeploymentEnvironment>
    getIssue: (
      params: Params.RepositoriesGetIssue
    ) => AsyncResponse<Schema.Issue>
    getIssueAttachment: (
      params: Params.RepositoriesGetIssueAttachment
    ) => AsyncResponse<Schema.Any>
    getIssueChange: (
      params: Params.RepositoriesGetIssueChange
    ) => AsyncResponse<Schema.IssueChange>
    getIssueComment: (
      params: Params.RepositoriesGetIssueComment
    ) => AsyncResponse<Schema.IssueComment>
    getIssueComponent: (
      params: Params.RepositoriesGetIssueComponent
    ) => AsyncResponse<Schema.Component>
    getIssueExportJobStatus: (
      params: Params.RepositoriesGetIssueExportJobStatus
    ) => AsyncResponse<Schema.IssueJobStatus>
    getIssueImportJobStatus: (
      params: Params.RepositoriesGetIssueImportJobStatus
    ) => AsyncResponse<Schema.IssueJobStatus>
    getIssueMilestone: (
      params: Params.RepositoriesGetIssueMilestone
    ) => AsyncResponse<Schema.Milestone>
    getIssueVersion: (
      params: Params.RepositoriesGetIssueVersion
    ) => AsyncResponse<Schema.Version>
    getIssueVote: (
      params: Params.RepositoriesGetIssueVote
    ) => AsyncResponse<Schema.Error>
    getIssueWatch: (
      params: Params.RepositoriesGetIssueWatch
    ) => AsyncResponse<Schema.Error>
    getPatch: (params: Params.RepositoriesGetPatch) => AsyncResponse<Schema.Any>
    getPipeline: (
      params: Params.RepositoriesGetPipeline
    ) => AsyncResponse<Schema.Pipeline>
    getPipelineConfig: (
      params: Params.RepositoriesGetPipelineConfig
    ) => AsyncResponse<Schema.PipelinesConfig>
    getPipelineKnownHost: (
      params: Params.RepositoriesGetPipelineKnownHost
    ) => AsyncResponse<Schema.PipelineKnownHost>
    getPipelineSchedule: (
      params: Params.RepositoriesGetPipelineSchedule
    ) => AsyncResponse<Schema.PipelineSchedule>
    getPipelineSshKeyPair: (
      params: Params.RepositoriesGetPipelineSshKeyPair
    ) => AsyncResponse<Schema.PipelineSshKeyPair>
    getPipelineStep: (
      params: Params.RepositoriesGetPipelineStep
    ) => AsyncResponse<Schema.PipelineStep>
    getPipelineStepLog: (
      params: Params.RepositoriesGetPipelineStepLog
    ) => AsyncResponse<Schema.Any>
    getPipelineVariable: (
      params: Params.RepositoriesGetPipelineVariable
    ) => AsyncResponse<Schema.PipelineVariable>
    getPullRequest: (
      params: Params.RepositoriesGetPullRequest
    ) => AsyncResponse<Schema.Pullrequest>
    getPullRequestComment: (
      params: Params.RepositoriesGetPullRequestComment
    ) => AsyncResponse<Schema.PullrequestComment>
    getPullRequestDiff: (
      params: Params.RepositoriesGetPullRequestDiff
    ) => AsyncResponse<Schema.Any>
    getPullRequestDiffStat: (
      params: Params.RepositoriesGetPullRequestDiffStat
    ) => AsyncResponse<Schema.Any>
    getPullRequestHostedPropertyValue: (
      params: Params.RepositoriesGetPullRequestHostedPropertyValue
    ) => AsyncResponse<Schema.Any>
    getPullRequestPatch: (
      params: Params.RepositoriesGetPullRequestPatch
    ) => AsyncResponse<Schema.Any>
    getReport: (
      params: Params.RepositoriesGetReport
    ) => AsyncResponse<Schema.Report>
    getReportsForCommit: (
      params: Params.RepositoriesGetReportsForCommit
    ) => AsyncResponse<Schema.PaginatedReports>
    getRepositoryHostedPropertyValue: (
      params: Params.RepositoriesGetRepositoryHostedPropertyValue
    ) => AsyncResponse<Schema.Any>
    getRepositoryPipelineCacheContentUri: (
      params: Params.RepositoriesGetRepositoryPipelineCacheContentUri
    ) => AsyncResponse<Schema.PipelineCacheContentUri>
    getRepositoryPipelineCaches: (
      params: Params.RepositoriesGetRepositoryPipelineCaches
    ) => AsyncResponse<Schema.PaginatedPipelineCaches>
    getTag: (params: Params.RepositoriesGetTag) => AsyncResponse<Schema.Tag>
    getWebhook: (
      params: Params.RepositoriesGetWebhook
    ) => AsyncResponse<Schema.WebhookSubscription>
    list: (
      params: Params.RepositoriesList
    ) => AsyncResponse<Schema.PaginatedRepositories>
    listBranches: (
      params: Params.RepositoriesListBranches
    ) => AsyncResponse<Schema.PaginatedBranches>
    listBranchRestrictions: (
      params: Params.RepositoriesListBranchRestrictions
    ) => AsyncResponse<Schema.PaginatedBranchrestrictions>
    listCommitComments: (
      params: Params.RepositoriesListCommitComments
    ) => AsyncResponse<Schema.PaginatedCommitComments>
    listCommits: (
      params: Params.RepositoriesListCommits
    ) => AsyncResponse<Schema.PaginatedChangeset>
    listCommitsAlt: (
      params: Params.RepositoriesListCommitsAlt
    ) => AsyncResponse<Schema.PaginatedChangeset>
    listCommitsAt: (
      params: Params.RepositoriesListCommitsAt
    ) => AsyncResponse<Schema.PaginatedChangeset>
    listCommitsAtAlt: (
      params: Params.RepositoriesListCommitsAtAlt
    ) => AsyncResponse<Schema.PaginatedChangeset>
    listCommitStatuses: (
      params: Params.RepositoriesListCommitStatuses
    ) => AsyncResponse<Schema.PaginatedCommitstatuses>
    listComponents: (
      params: Params.RepositoriesListComponents
    ) => AsyncResponse<Schema.PaginatedComponents>
    listDefaultReviewers: (
      params: Params.RepositoriesListDefaultReviewers
    ) => AsyncResponse<Schema.Any>
    listDeployKeys: (
      params: Params.RepositoriesListDeployKeys
    ) => AsyncResponse<Schema.PaginatedDeployKeys>
    listDeployments: (
      params: Params.RepositoriesListDeployments
    ) => AsyncResponse<Schema.PaginatedDeployments>
    listDeploymentVariables: (
      params: Params.RepositoriesListDeploymentVariables
    ) => AsyncResponse<Schema.PaginatedDeploymentVariable>
    listDiffStats: (
      params: Params.RepositoriesListDiffStats
    ) => AsyncResponse<Schema.PaginatedDiffstats>
    listDownloads: (
      params: Params.RepositoriesListDownloads
    ) => AsyncResponse<Schema.Any>
    listEnvironments: (
      params: Params.RepositoriesListEnvironments
    ) => AsyncResponse<Schema.PaginatedEnvironments>
    listFileHistory: (
      params: Params.RepositoriesListFileHistory
    ) => AsyncResponse<Schema.PaginatedFiles>
    listForks: (
      params: Params.RepositoriesListForks
    ) => AsyncResponse<Schema.PaginatedRepositories>
    listGlobal: (
      params: Params.RepositoriesListGlobal
    ) => AsyncResponse<Schema.PaginatedRepositories>
    listIssueAttachments: (
      params: Params.RepositoriesListIssueAttachments
    ) => AsyncResponse<Schema.PaginatedIssueAttachments>
    listIssueChanges: (
      params: Params.RepositoriesListIssueChanges
    ) => AsyncResponse<Schema.PaginatedLogEntries>
    listIssueComments: (
      params: Params.RepositoriesListIssueComments
    ) => AsyncResponse<Schema.PaginatedIssueComments>
    listIssues: (
      params: Params.RepositoriesListIssues
    ) => AsyncResponse<Schema.PaginatedIssues>
    listMilestones: (
      params: Params.RepositoriesListMilestones
    ) => AsyncResponse<Schema.PaginatedMilestones>
    listPermissions: (
      params: Params.RepositoriesListPermissions
    ) => AsyncResponse<Schema.PaginatedRepositoryPermissions>
    listPipelineKnownHosts: (
      params: Params.RepositoriesListPipelineKnownHosts
    ) => AsyncResponse<Schema.PaginatedPipelineKnownHosts>
    listPipelines: (
      params: Params.RepositoriesListPipelines
    ) => AsyncResponse<Schema.PaginatedPipelines>
    listPipelineScheduleExecutions: (
      params: Params.RepositoriesListPipelineScheduleExecutions
    ) => AsyncResponse<Schema.PaginatedPipelineScheduleExecutions>
    listPipelineSchedules: (
      params: Params.RepositoriesListPipelineSchedules
    ) => AsyncResponse<Schema.PaginatedPipelineSchedules>
    listPipelineSteps: (
      params: Params.RepositoriesListPipelineSteps
    ) => AsyncResponse<Schema.PaginatedPipelineSteps>
    listPipelineVariables: (
      params: Params.RepositoriesListPipelineVariables
    ) => AsyncResponse<Schema.PaginatedPipelineVariables>
    listPullRequestActivities: (
      params: Params.RepositoriesListPullRequestActivities
    ) => AsyncResponse<Schema.Any>
    listPullRequestActivitiesForRepo: (
      params: Params.RepositoriesListPullRequestActivitiesForRepo
    ) => AsyncResponse<Schema.Any>
    listPullRequestComments: (
      params: Params.RepositoriesListPullRequestComments
    ) => AsyncResponse<Schema.PaginatedPullrequestComments>
    listPullRequestCommits: (
      params: Params.RepositoriesListPullRequestCommits
    ) => AsyncResponse<Schema.Any>
    listPullRequests: (
      params: Params.RepositoriesListPullRequests
    ) => AsyncResponse<Schema.PaginatedPullrequests>
    listPullrequestsForCommit: (
      params: Params.RepositoriesListPullrequestsForCommit
    ) => AsyncResponse<Schema.PaginatedPullrequests>
    listPullRequestStatuses: (
      params: Params.RepositoriesListPullRequestStatuses
    ) => AsyncResponse<Schema.PaginatedCommitstatuses>
    listRefs: (
      params: Params.RepositoriesListRefs
    ) => AsyncResponse<Schema.PaginatedRefs>
    listTags: (
      params: Params.RepositoriesListTags
    ) => AsyncResponse<Schema.PaginatedTags>
    listVersions: (
      params: Params.RepositoriesListVersions
    ) => AsyncResponse<Schema.PaginatedVersions>
    listWatchers: (
      params: Params.RepositoriesListWatchers
    ) => AsyncResponse<Schema.Any>
    listWebhooks: (
      params: Params.RepositoriesListWebhooks
    ) => AsyncResponse<Schema.PaginatedWebhookSubscriptions>
    mergePullRequest: (
      params: Params.RepositoriesMergePullRequest
    ) => AsyncResponse<Schema.Pullrequest>
    readSrc: (
      params: Params.RepositoriesReadSrc
    ) => AsyncResponse<Schema.PaginatedTreeentries>
    readSrcRoot: (
      params: Params.RepositoriesReadSrcRoot
    ) => AsyncResponse<Schema.PaginatedTreeentries>
    stopPipeline: (
      params: Params.RepositoriesStopPipeline
    ) => AsyncResponse<Schema.Any>
    update: (
      params: Params.RepositoriesUpdate
    ) => AsyncResponse<Schema.Repository>
    updateBranchingModelSettings: (
      params: Params.RepositoriesUpdateBranchingModelSettings
    ) => AsyncResponse<Schema.BranchingModelSettings>
    updateBranchRestriction: (
      params: Params.RepositoriesUpdateBranchRestriction
    ) => AsyncResponse<Schema.Branchrestriction>
    updateCommitBuildStatus: (
      params: Params.RepositoriesUpdateCommitBuildStatus
    ) => AsyncResponse<Schema.Commitstatus>
    updateCommitHostedPropertyValue: (
      params: Params.RepositoriesUpdateCommitHostedPropertyValue
    ) => AsyncResponse<Schema.Any>
    updateDeployKey: (
      params: Params.RepositoriesUpdateDeployKey
    ) => AsyncResponse<Schema.DeployKey>
    updateDeploymentVariable: (
      params: Params.RepositoriesUpdateDeploymentVariable
    ) => AsyncResponse<Schema.DeploymentVariable>
    updateEnvironment: (
      params: Params.RepositoriesUpdateEnvironment
    ) => AsyncResponse<Schema.Any>
    updateIssue: (
      params: Params.RepositoriesUpdateIssue
    ) => AsyncResponse<Schema.Issue>
    updateIssueComment: (
      params: Params.RepositoriesUpdateIssueComment
    ) => AsyncResponse<Schema.IssueComment>
    updatePipelineBuildNumber: (
      params: Params.RepositoriesUpdatePipelineBuildNumber
    ) => AsyncResponse<Schema.PipelineBuildNumber>
    updatePipelineConfig: (
      params: Params.RepositoriesUpdatePipelineConfig
    ) => AsyncResponse<Schema.PipelinesConfig>
    updatePipelineKnownHost: (
      params: Params.RepositoriesUpdatePipelineKnownHost
    ) => AsyncResponse<Schema.PipelineKnownHost>
    updatePipelineSchedule: (
      params: Params.RepositoriesUpdatePipelineSchedule
    ) => AsyncResponse<Schema.PipelineSchedule>
    updatePipelineSshKeyPair: (
      params: Params.RepositoriesUpdatePipelineSshKeyPair
    ) => AsyncResponse<Schema.PipelineSshKeyPair>
    updatePipelineVariable: (
      params: Params.RepositoriesUpdatePipelineVariable
    ) => AsyncResponse<Schema.PipelineVariable>
    updatePullRequest: (
      params: Params.RepositoriesUpdatePullRequest
    ) => AsyncResponse<Schema.Pullrequest>
    updatePullRequestComment: (
      params: Params.RepositoriesUpdatePullRequestComment
    ) => AsyncResponse<Schema.PullrequestComment>
    updatePullRequestHostedPropertyValue: (
      params: Params.RepositoriesUpdatePullRequestHostedPropertyValue
    ) => AsyncResponse<Schema.Any>
    updateRepositoryHostedPropertyValue: (
      params: Params.RepositoriesUpdateRepositoryHostedPropertyValue
    ) => AsyncResponse<Schema.Any>
    updateWebhook: (
      params: Params.RepositoriesUpdateWebhook
    ) => AsyncResponse<Schema.WebhookSubscription>
  }
  search: {
    codeOfTeam: (
      params: Params.SearchCodeOfTeam
    ) => AsyncResponse<Schema.SearchResultPage>
    codeOfUser: (
      params: Params.SearchCodeOfUser
    ) => AsyncResponse<Schema.SearchResultPage>
    searchAccount: (
      params: Params.SearchSearchAccount
    ) => AsyncResponse<Schema.SearchResultPage>
  }
  snippet: {
    getRawFiles: (
      params: Params.SnippetGetRawFiles
    ) => AsyncResponse<Schema.Any>
  }
  snippets: {
    checkWatch: (params: Params.SnippetsCheckWatch) => AsyncResponse<Schema.Any>
    create: (params: Params.SnippetsCreate) => AsyncResponse<Schema.Snippet>
    createComment: (
      params: Params.SnippetsCreateComment
    ) => AsyncResponse<Schema.Snippet>
    createForUser: (
      params: Params.SnippetsCreateForUser
    ) => AsyncResponse<Schema.Snippet>
    delete: (params: Params.SnippetsDelete) => AsyncResponse<Schema.Any>
    deleteAt: (params: Params.SnippetsDeleteAt) => AsyncResponse<Schema.Any>
    deleteComment: (
      params: Params.SnippetsDeleteComment
    ) => AsyncResponse<Schema.Any>
    get: (params: Params.SnippetsGet) => AsyncResponse<Schema.Snippet>
    getAt: (params: Params.SnippetsGetAt) => AsyncResponse<Schema.Snippet>
    getComment: (
      params: Params.SnippetsGetComment
    ) => AsyncResponse<Schema.SnippetComment>
    getCommit: (
      params: Params.SnippetsGetCommit
    ) => AsyncResponse<Schema.SnippetCommit>
    getDiff: (params: Params.SnippetsGetDiff) => AsyncResponse<Schema.Any>
    getFile: (params: Params.SnippetsGetFile) => AsyncResponse<Schema.Any>
    getPatch: (params: Params.SnippetsGetPatch) => AsyncResponse<Schema.Any>
    getRawFiles: (
      params: Params.SnippetsGetRawFiles
    ) => AsyncResponse<Schema.Any>
    list: (
      params: Params.SnippetsList
    ) => AsyncResponse<Schema.PaginatedSnippets>
    listComments: (
      params: Params.SnippetsListComments
    ) => AsyncResponse<Schema.PaginatedSnippetComments>
    listCommits: (
      params: Params.SnippetsListCommits
    ) => AsyncResponse<Schema.PaginatedSnippetCommit>
    listForUser: (
      params: Params.SnippetsListForUser
    ) => AsyncResponse<Schema.PaginatedSnippets>
    listWatchers: (
      params: Params.SnippetsListWatchers
    ) => AsyncResponse<Schema.PaginatedUsers>
    startWatch: (params: Params.SnippetsStartWatch) => AsyncResponse<Schema.Any>
    stopWatch: (params: Params.SnippetsStopWatch) => AsyncResponse<Schema.Any>
    update: (params: Params.SnippetsUpdate) => AsyncResponse<Schema.Snippet>
    updateAt: (params: Params.SnippetsUpdateAt) => AsyncResponse<Schema.Snippet>
    updateComment: (
      params: Params.SnippetsUpdateComment
    ) => AsyncResponse<Schema.Any>
  }
  source: {
    createFileCommit: (
      params: Params.SourceCreateFileCommit
    ) => AsyncResponse<Schema.Any>
    listHistory: (
      params: Params.SourceListHistory
    ) => AsyncResponse<Schema.PaginatedFiles>
    read: (
      params: Params.SourceRead
    ) => AsyncResponse<Schema.PaginatedTreeentries>
    readRoot: (
      params: Params.SourceReadRoot
    ) => AsyncResponse<Schema.PaginatedTreeentries>
  }
  ssh: {
    createKey: (
      params: Params.SshCreateKey
    ) => AsyncResponse<Schema.SshAccountKey>
    deleteKey: (params: Params.SshDeleteKey) => AsyncResponse<Schema.Any>
    getKey: (params: Params.SshGetKey) => AsyncResponse<Schema.SshAccountKey>
    listKeys: (
      params: Params.SshListKeys
    ) => AsyncResponse<Schema.PaginatedSshUserKeys>
    updateKey: (
      params: Params.SshUpdateKey
    ) => AsyncResponse<Schema.SshAccountKey>
  }
  teams: {
    createPipelineVariable: (
      params: Params.TeamsCreatePipelineVariable
    ) => AsyncResponse<Schema.PipelineVariable>
    createProject: (
      params: Params.TeamsCreateProject
    ) => AsyncResponse<Schema.Project>
    createWebhook: (
      params: Params.TeamsCreateWebhook
    ) => AsyncResponse<Schema.WebhookSubscription>
    deletePipelineVariable: (
      params: Params.TeamsDeletePipelineVariable
    ) => AsyncResponse<Schema.Any>
    deleteProject: (
      params: Params.TeamsDeleteProject
    ) => AsyncResponse<Schema.Any>
    deleteWebhook: (
      params: Params.TeamsDeleteWebhook
    ) => AsyncResponse<Schema.Any>
    get: (params: Params.TeamsGet) => AsyncResponse<Schema.Team>
    getAllMembers: (
      params: Params.TeamsGetAllMembers
    ) => AsyncResponse<Schema.User>
    getMembers: (params: Params.TeamsGetMembers) => AsyncResponse<Schema.User>
    getPipelineVariable: (
      params: Params.TeamsGetPipelineVariable
    ) => AsyncResponse<Schema.PipelineVariable>
    getProject: (
      params: Params.TeamsGetProject
    ) => AsyncResponse<Schema.Project>
    getWebhook: (
      params: Params.TeamsGetWebhook
    ) => AsyncResponse<Schema.WebhookSubscription>
    list: (params: Params.TeamsList) => AsyncResponse<Schema.PaginatedTeams>
    listFollowers: (
      params: Params.TeamsListFollowers
    ) => AsyncResponse<Schema.PaginatedUsers>
    listFollowing: (
      params: Params.TeamsListFollowing
    ) => AsyncResponse<Schema.PaginatedUsers>
    listPermissions: (
      params: Params.TeamsListPermissions
    ) => AsyncResponse<Schema.PaginatedTeamPermissions>
    listPermissionsForRepo: (
      params: Params.TeamsListPermissionsForRepo
    ) => AsyncResponse<Schema.PaginatedRepositoryPermissions>
    listPermissionsForRepos: (
      params: Params.TeamsListPermissionsForRepos
    ) => AsyncResponse<Schema.PaginatedRepositoryPermissions>
    listPipelineVariables: (
      params: Params.TeamsListPipelineVariables
    ) => AsyncResponse<Schema.PaginatedPipelineVariables>
    listProjects: (
      params: Params.TeamsListProjects
    ) => AsyncResponse<Schema.PaginatedProjects>
    listRepositories: (
      params: Params.TeamsListRepositories
    ) => AsyncResponse<Schema.Any>
    listRepositoriesForUser: (
      params: Params.TeamsListRepositoriesForUser
    ) => AsyncResponse<Schema.Any>
    listWebhooks: (
      params: Params.TeamsListWebhooks
    ) => AsyncResponse<Schema.PaginatedWebhookSubscriptions>
    searchCode: (
      params: Params.TeamsSearchCode
    ) => AsyncResponse<Schema.SearchResultPage>
    updatePipelineVariable: (
      params: Params.TeamsUpdatePipelineVariable
    ) => AsyncResponse<Schema.PipelineVariable>
    updateProject: (
      params: Params.TeamsUpdateProject
    ) => AsyncResponse<Schema.Project>
    updateWebhook: (
      params: Params.TeamsUpdateWebhook
    ) => AsyncResponse<Schema.WebhookSubscription>
  }
  user: {
    get: (params: Params.UserGet) => AsyncResponse<Schema.User>
    getEmail: (params: Params.UserGetEmail) => AsyncResponse<Schema.Any>
    listEmails: (params: Params.UserListEmails) => AsyncResponse<Schema.Any>
    listPermissionsForRepos: (
      params: Params.UserListPermissionsForRepos
    ) => AsyncResponse<Schema.PaginatedRepositoryPermissions>
    listPermissionsForTeams: (
      params: Params.UserListPermissionsForTeams
    ) => AsyncResponse<Schema.PaginatedTeamPermissions>
  }
  users: {
    createPipelineVariable: (
      params: Params.UsersCreatePipelineVariable
    ) => AsyncResponse<Schema.PipelineVariable>
    createSshKey: (
      params: Params.UsersCreateSshKey
    ) => AsyncResponse<Schema.SshAccountKey>
    createWebhook: (
      params: Params.UsersCreateWebhook
    ) => AsyncResponse<Schema.WebhookSubscription>
    deletePipelineVariable: (
      params: Params.UsersDeletePipelineVariable
    ) => AsyncResponse<Schema.Any>
    deleteSshKey: (
      params: Params.UsersDeleteSshKey
    ) => AsyncResponse<Schema.Any>
    deleteUserHostedPropertyValue: (
      params: Params.UsersDeleteUserHostedPropertyValue
    ) => AsyncResponse<Schema.Any>
    deleteWebhook: (
      params: Params.UsersDeleteWebhook
    ) => AsyncResponse<Schema.Any>
    get: (params: Params.UsersGet) => AsyncResponse<Schema.User>
    getAuthedUser: (
      params: Params.UsersGetAuthedUser
    ) => AsyncResponse<Schema.User>
    getEmailForAuthedUser: (
      params: Params.UsersGetEmailForAuthedUser
    ) => AsyncResponse<Schema.Any>
    getPipelineVariable: (
      params: Params.UsersGetPipelineVariable
    ) => AsyncResponse<Schema.PipelineVariable>
    getSshKey: (
      params: Params.UsersGetSshKey
    ) => AsyncResponse<Schema.SshAccountKey>
    getTeamMembers: (
      params: Params.UsersGetTeamMembers
    ) => AsyncResponse<Schema.User>
    getWebhook: (
      params: Params.UsersGetWebhook
    ) => AsyncResponse<Schema.WebhookSubscription>
    listEmailsForAuthedUser: (
      params: Params.UsersListEmailsForAuthedUser
    ) => AsyncResponse<Schema.Any>
    listPipelineVariables: (
      params: Params.UsersListPipelineVariables
    ) => AsyncResponse<Schema.PaginatedPipelineVariables>
    listRepositories: (
      params: Params.UsersListRepositories
    ) => AsyncResponse<Schema.Any>
    listRepositoriesForTeam: (
      params: Params.UsersListRepositoriesForTeam
    ) => AsyncResponse<Schema.Any>
    listSshKeys: (
      params: Params.UsersListSshKeys
    ) => AsyncResponse<Schema.PaginatedSshUserKeys>
    listWebhooks: (
      params: Params.UsersListWebhooks
    ) => AsyncResponse<Schema.PaginatedWebhookSubscriptions>
    retrieveUserHostedPropertyValue: (
      params: Params.UsersRetrieveUserHostedPropertyValue
    ) => AsyncResponse<Schema.Any>
    searchCode: (
      params: Params.UsersSearchCode
    ) => AsyncResponse<Schema.SearchResultPage>
    updatePipelineVariable: (
      params: Params.UsersUpdatePipelineVariable
    ) => AsyncResponse<Schema.PipelineVariable>
    updateSshKey: (
      params: Params.UsersUpdateSshKey
    ) => AsyncResponse<Schema.SshAccountKey>
    updateUserHostedPropertyValue: (
      params: Params.UsersUpdateUserHostedPropertyValue
    ) => AsyncResponse<Schema.Any>
    updateWebhook: (
      params: Params.UsersUpdateWebhook
    ) => AsyncResponse<Schema.WebhookSubscription>
  }
  webhooks: {
    create: (
      params: Params.WebhooksCreate
    ) => AsyncResponse<Schema.WebhookSubscription>
    createForTeam: (
      params: Params.WebhooksCreateForTeam
    ) => AsyncResponse<Schema.WebhookSubscription>
    createForUser: (
      params: Params.WebhooksCreateForUser
    ) => AsyncResponse<Schema.WebhookSubscription>
    createWebhookForWorkspace: (
      params: Params.WebhooksCreateWebhookForWorkspace
    ) => AsyncResponse<Schema.WebhookSubscription>
    delete: (params: Params.WebhooksDelete) => AsyncResponse<Schema.Any>
    deleteForTeam: (
      params: Params.WebhooksDeleteForTeam
    ) => AsyncResponse<Schema.Any>
    deleteForUser: (
      params: Params.WebhooksDeleteForUser
    ) => AsyncResponse<Schema.Any>
    deleteWebhookForWorkspace: (
      params: Params.WebhooksDeleteWebhookForWorkspace
    ) => AsyncResponse<Schema.Any>
    get: (
      params: Params.WebhooksGet
    ) => AsyncResponse<Schema.WebhookSubscription>
    getAllSubjectTypes: (
      params: Params.WebhooksGetAllSubjectTypes
    ) => AsyncResponse<Schema.SubjectTypes>
    getForTeam: (
      params: Params.WebhooksGetForTeam
    ) => AsyncResponse<Schema.WebhookSubscription>
    getForUser: (
      params: Params.WebhooksGetForUser
    ) => AsyncResponse<Schema.WebhookSubscription>
    getWebhookForWorkspace: (
      params: Params.WebhooksGetWebhookForWorkspace
    ) => AsyncResponse<Schema.WebhookSubscription>
    getWebhooksForWorkspace: (
      params: Params.WebhooksGetWebhooksForWorkspace
    ) => AsyncResponse<Schema.PaginatedWebhookSubscriptions>
    list: (
      params: Params.WebhooksList
    ) => AsyncResponse<Schema.PaginatedHookEvents>
    listForRepo: (
      params: Params.WebhooksListForRepo
    ) => AsyncResponse<Schema.PaginatedWebhookSubscriptions>
    listForTeam: (
      params: Params.WebhooksListForTeam
    ) => AsyncResponse<Schema.PaginatedWebhookSubscriptions>
    listForUser: (
      params: Params.WebhooksListForUser
    ) => AsyncResponse<Schema.PaginatedWebhookSubscriptions>
    update: (
      params: Params.WebhooksUpdate
    ) => AsyncResponse<Schema.WebhookSubscription>
    updateForTeam: (
      params: Params.WebhooksUpdateForTeam
    ) => AsyncResponse<Schema.WebhookSubscription>
    updateForUser: (
      params: Params.WebhooksUpdateForUser
    ) => AsyncResponse<Schema.WebhookSubscription>
    updateWebhookForWorkspace: (
      params: Params.WebhooksUpdateWebhookForWorkspace
    ) => AsyncResponse<Schema.WebhookSubscription>
  }
  workspaces: {
    createOrUpdateProject: (
      params: Params.WorkspacesCreateOrUpdateProject
    ) => AsyncResponse<Schema.Project>
    createPipelineVariableForWorkspace: (
      params: Params.WorkspacesCreatePipelineVariableForWorkspace
    ) => AsyncResponse<Schema.PipelineVariable>
    createProject: (
      params: Params.WorkspacesCreateProject
    ) => AsyncResponse<Schema.Project>
    createWebhookForWorkspace: (
      params: Params.WorkspacesCreateWebhookForWorkspace
    ) => AsyncResponse<Schema.WebhookSubscription>
    deletePipelineVariableForWorkspace: (
      params: Params.WorkspacesDeletePipelineVariableForWorkspace
    ) => AsyncResponse<Schema.Any>
    deleteProject: (
      params: Params.WorkspacesDeleteProject
    ) => AsyncResponse<Schema.Any>
    deleteWebhookForWorkspace: (
      params: Params.WorkspacesDeleteWebhookForWorkspace
    ) => AsyncResponse<Schema.Any>
    getMemberForWorkspace: (
      params: Params.WorkspacesGetMemberForWorkspace
    ) => AsyncResponse<Schema.WorkspaceMembership>
    getMembersForWorkspace: (
      params: Params.WorkspacesGetMembersForWorkspace
    ) => AsyncResponse<Schema.PaginatedWorkspaceMemberships>
    getPipelineVariableForWorkspace: (
      params: Params.WorkspacesGetPipelineVariableForWorkspace
    ) => AsyncResponse<Schema.PipelineVariable>
    getPipelineVariablesForWorkspace: (
      params: Params.WorkspacesGetPipelineVariablesForWorkspace
    ) => AsyncResponse<Schema.PaginatedPipelineVariables>
    getProject: (
      params: Params.WorkspacesGetProject
    ) => AsyncResponse<Schema.Project>
    getProjects: (
      params: Params.WorkspacesGetProjects
    ) => AsyncResponse<Schema.PaginatedProjects>
    getWebhookForWorkspace: (
      params: Params.WorkspacesGetWebhookForWorkspace
    ) => AsyncResponse<Schema.WebhookSubscription>
    getWebhooksForWorkspace: (
      params: Params.WorkspacesGetWebhooksForWorkspace
    ) => AsyncResponse<Schema.PaginatedWebhookSubscriptions>
    getWorkspace: (
      params: Params.WorkspacesGetWorkspace
    ) => AsyncResponse<Schema.Workspace>
    getWorkspaces: (
      params: Params.WorkspacesGetWorkspaces
    ) => AsyncResponse<Schema.PaginatedWorkspaces>
    searchAccount: (
      params: Params.WorkspacesSearchAccount
    ) => AsyncResponse<Schema.SearchResultPage>
    updatePipelineVariableForWorkspace: (
      params: Params.WorkspacesUpdatePipelineVariableForWorkspace
    ) => AsyncResponse<Schema.PipelineVariable>
    updateWebhookForWorkspace: (
      params: Params.WorkspacesUpdateWebhookForWorkspace
    ) => AsyncResponse<Schema.WebhookSubscription>
  }
}
