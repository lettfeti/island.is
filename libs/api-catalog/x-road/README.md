# api-catalog-x-road

This library was generated with [Nx](https://nx.dev).

This library uses the [X-Road REST Management API interface] to collect
API catalog from the X-Road environment.

## Developing

### Codegen

We use codegen to generate client from the [OpenAPI document] for the
REST Management API. In `workspace.json` we have `codegen` command
and to execute that command from command line we do:

```
yarn nx run api-catalog-x-road:codegen
```

### X-Road SÍ Dev

You need to have a X-Road Security Server running locally.
Currently using version 6.24.0

```
# Running exact version instead of the default latest version
docker run -p 4000:4000 -p 4001:80 --name my-ss niis/xroad-security-server:bionic-6.24.0
```

The Admin UI credentials are: xrd/secret

**TBD** How to connect this local instance to the dev
X-Road Central Server?

### X-Road Standalone

There is a standalone version of the Security Server available
on [DockerHub](https://hub.docker.com/r/niis/xroad-security-server-standalone)

```
# Publish the container ports (4000 and 80) to localhost (loopback address).
docker run -p 4000:4000 -p 80:80 --name ss niis/xroad-security-server-standalone:bionic-6.24.0
```

## Running unit tests

Run `ng test api-catalog-x-road` to execute the unit tests via [Jest](https://jestjs.io).

[x-road rest management api interface]: https://github.com/nordic-institute/X-Road/blob/develop/doc/Manuals/ug-ss_x-road_6_security_server_user_guide.md#19-management-rest-apis
[openapi document]: https://github.com/nordic-institute/X-Road/blob/develop/src/proxy-ui-api/src/main/resources/openapi-definition.yaml
