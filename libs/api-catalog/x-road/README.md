# api-catalog-x-road

This library was generated with [Nx](https://nx.dev).

This library uses the [X-Road Service Metadata] and
[X-Road Service Metadata for REST] to collect
API catalogue information from the X-Road environment.

## Developing

### Codegen

We use codegen to generate clients from the OpenAPI documents for the
two REST services. In `workspace.json` we have two `codegen` commands
and to execute that command from command line we do:

```
# Generates clients from X-Road Service Metadata
yarn nx run api-catalog-x-road:codegen-xrd

# Generates clients from X-Road Service Metadata for REST
yarn nx run api-catalog-x-road:codegen-xrd-rest
```

### X-Road SÍ Dev

**TBD** How to connect to the dev X-Road Central Server?

### X-Road Standalone

For messing around a developer can start á local instance of standalone
Security Server using [docker](https://hub.docker.com/r/niis/xroad-security-server-standalone)

```
# Publish the container ports (4000, 443 and 80) to localhost (loopback address)
# using the latest docker image available.
# See docker hub for specific tags for specific version.
docker run -p 4000:4000 -p 80:80 -p 443:443 --name ss niis/xroad-security-server-standalone
```

Developer can now access this Security Server AdminUI on `https://localhost:4000`
to register custom services and clients for testing.

### Query list of all clients on the X-Road network

```
curl -H "Accept: application/json" http://localhost/listClients
```

### Query OpenAPI Specification for REST service

```
curl -H "Accept: application/json" -H "X-Road-Client: IS-DEV/GOV/10003/VMST-Client" http://localhost/r1/IS-DEV/GOV/10003/pets/getOpenAPI?serviceCode=petstore
```

## Running unit tests

Run `ng test api-catalog-x-road` to execute the unit tests via [Jest](https://jestjs.io).

[x-road service metadata]: https://github.com/nordic-institute/X-Road/blob/develop/doc/Protocols/pr-meta_x-road_service_metadata_protocol.md#openapi-definition
[x-road service metadata for rest]: https://github.com/nordic-institute/X-Road/blob/develop/doc/Protocols/pr-mrest_x-road_service_metadata_protocol_for_rest.md#annex-a-service-descriptions-for-rest-metadata-services
