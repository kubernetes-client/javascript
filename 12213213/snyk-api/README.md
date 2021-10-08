# Snyk API CLI Tool [![Known Vulnerabilities](https://snyk.io/test/github/lovebhardwajsnyk/snyk-api-cli/badge.svg)](https://snyk.io/test/github/lovebhardwajsnyk/snyk-api-cli)

Simple CLI tool that enables you to consume Snyk API from the shell/command line. You don't have to worry about what kind of request it is and the configuration settings for the request. Everything is done automatically behind the scenes for you.

Developer love doing everything from the CLI and this tool will help save your time.

**Note\***: Package is still in development and is not stable

## Config

### Authentication

The tool requires your Snyk API token to authenticate and use the API. There are two ways to provide the authentication token to the tool

- Use the config command to set the API token: `$ snyk-api config --auth-token=[SNYK_API_TOKEN]`
- Use any API related command and it will prompt for the API token: `? Enter your Snyk API token: ›`

### Clear Token

If in a case you want to clear the API token, you can use the following command `$ snyk-api config --clear-token`

## CLI Commands

### Config

The config command can be used to clear the API auth token and store the API auth token as shown above.

### Process

Using the snyk-api is very simple. You need to use the process command to process an Snyk API request. Every process will require two arguments the `--api` and the `--endpoint` parameters. As the name suggests the `--api` arg is the groups of Snyk API you want to call and the `--endpoint` arg is the API endpoint you want to call. The example below call the `GET` API docs endpoint under the general API group.

```
$ snyk-api process --api=general --endpoint=api-docs
```

The result is a JSON response from the API if everything went well, otherwise it will throw an error

```
{
    "what orgs can the current token access?": "https://snyk.io/api/v1/orgs",
    "what projects are owned by this org?": "https://snyk.io/api/v1/org/:id/projects",
    "test a package for issues": "https://snyk.io/api/v1/test/:packageManager/:packageName/:packageVersion"
}
```

You can pass various arguments based on the API endpoint you are using. The following example fetches the Snyk group level audit logs with the request parameters passed

```
$ snyk-api process -a=audit-logs -e=group-level-logs --group-id=test --page=1 --sort-order=DESC --from=2021-02-01 --to=2021-03-01
```

The complete list of options and arguments available are:

```
  -a, --api                   The API group you want to call, example: general,
                              users, projects, etc           [string] [required]
  -e, --endpoint              The API endpoint you want to call, example:
                              api-docs, get-projects         [string] [required]
  -g, --group-id              Snyk group ID or in some cases the package group
                              ID                                        [string]
  -o, --org-id                Snyk organization ID                      [string]
  -p, --project-id            Snyk project ID                           [string]
  -u, --user-id               Snyk user ID                              [string]
      --issue-id              Vulnerability issue ID                    [string]
  -f, --file                  Path to JSON file that will be passed to API as
                              the Request body                          [string]
      --per-page              Number of items on a page                 [number]
      --page                  Page number                               [number]
      --integration-id        Snyk integration ID                       [string]
      --integration-type      Snyk integration type, used to get integration by
                              type                                      [string]
      --include-group-admins  Include group admins when listing organization
                              members                                  [boolean]
      --job-id                Snyk import job ID                        [string]
      --sort-by               The key to sort by query parameter        [string]
      --sort-order            The sort order of the returned audit logs by date.
                              Values: ASC, DESC. Default: DESC.         [string]
      --order                 Order or direction of sort results  query
                              parameter                                 [string]
      --group-by              Group by query parameter                  [string]
      --from                  The date you wish to fetch results from, in the
                              format YYYY-MM-DD Example: 2017-07-01     [string]
      --to                    The date you wish to fetch results until, in the
                              format YYYY-MM-DD Example: 2017-07-07     [string]
      --entitlement-key       Entitlement key to get entitlement value  [string]
      --artifact-id           Package Artifact ID                       [string]
      --package-version       Package version                           [string]
      --repository            Repository hosting the pacakge            [string]
      --package-name          Package name                              [string]
      --gem-name              Gem name                                  [string]
```

### List

The list command can be used to list the available API groups and the endpoints available under the group. It will list the information in formatted tables with the available information.

Example to list all the API groups available:

`$ snyk-api list`

The output:

![List API Group Available](docs/images/api-table.png)

To list endpoints available under a specific API group:

`$ snyk-api list --api=general`

The output:

![List API Endpoints Available](docs/images/general-endpoint-table.png)

## Issues and Bugs

Please open a issue if you encounter any bugs or errors
