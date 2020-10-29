import {
  Controller,
  Get,
  Query,
  ParseArrayPipe,
  BadRequestException,
} from '@nestjs/common'
import { ApiOkResponse, ApiTags, ApiQuery } from '@nestjs/swagger'
import {
  IdentityResource,
  ResourcesService,
  ApiScope,
  ApiResource,
  Scopes,
} from '@island.is/auth-api-lib'

// Try comment to trigger deployment
// TODO: Add guards after getting communications to work properly with IDS4
// @UseGuards(IdsAuthGuard, ScopesGuard)
@ApiTags('resources')
@Controller()
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  /** Get Identity resources by scope names */
  @Scopes('@identityserver.api/authentication')
  @Get('identity-resources')
  @ApiQuery({
    name: 'scopeNames',
    type: String,
    required: false,
    allowEmptyValue: true,
  })
  @ApiOkResponse({ type: IdentityResource, isArray: true })
  async FindIdentityResourcesByScopeName(
    @Query(
      'scopeNames',
      new ParseArrayPipe({ optional: true, items: String, separator: ',' }),
    )
    scopeNames: string[],
  ): Promise<IdentityResource[]> {
    const identityResources = await this.resourcesService.findIdentityResourcesByScopeName(
      scopeNames,
    )

    return identityResources
  }

  /** Gets API scopes by scope names */
  @Scopes('@identityserver.api/authentication')
  @Get('api-scopes')
  @ApiQuery({
    name: 'scopeNames',
    type: String,
    required: false,
    allowEmptyValue: true,
  })
  @ApiOkResponse({ type: ApiScope, isArray: true })
  async FindApiScopesByNameAsync(
    @Query(
      'scopeNames',
      new ParseArrayPipe({ optional: true, items: String, separator: ',' }),
    )
    scopeNames: string[],
  ): Promise<ApiScope[]> {
    const apiScopes = await this.resourcesService.findApiScopesByNameAsync(
      scopeNames,
    )

    return apiScopes
  }

  /** Gets api resources by resources names or scope names */
  @Scopes('@identityserver.api/authentication')
  @Get('api-resources')
  @ApiQuery({
    name: 'apiResourceNames',
    type: String,
    required: false,
    allowEmptyValue: true,
  })
  @ApiQuery({
    name: 'apiScopeNames',
    type: String,
    required: false,
    allowEmptyValue: true,
  })
  @ApiOkResponse({ type: ApiResource, isArray: true })
  async FindApiResourcesByNameAsync(
    @Query(
      'apiResourceNames',
      new ParseArrayPipe({ optional: true, items: String, separator: ',' }),
    )
    apiResourceNames: string[],
    @Query(
      'apiScopeNames',
      new ParseArrayPipe({ optional: true, items: String, separator: ',' }),
    )
    apiScopeNames: string[],
  ): Promise<ApiResource[]> {
    if (apiResourceNames && apiScopeNames) {
      throw new BadRequestException(
        'Specifying both apiResourceNames and apiScopeNames is not supported.',
      )
    }

    if (apiResourceNames) {
      return await this.resourcesService.findApiResourcesByNameAsync(
        apiResourceNames,
      )
    } else {
      return await this.resourcesService.findApiResourcesByScopeNameAsync(
        apiScopeNames,
      )
    }
  }
}
