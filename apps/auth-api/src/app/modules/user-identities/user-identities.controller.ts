import {
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    Post,
    UseGuards,
  } from '@nestjs/common'
  import { UserIdentity } from './user-identity.model'
  import { UserIdentitiesService } from './user-identities.service'
  import { UserIdentityDto } from './dto/user-identity.dto'
  import { ApiCreatedResponse, ApiOkResponse, ApiTags, ApiOAuth2 } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
  
@ApiOAuth2(['@identityserver.api/read'])
@UseGuards(AuthGuard('jwt'))
@ApiTags('user-identities')
  @Controller('user-identities')
  export class UserIdentitiesController {
    constructor(private readonly userIdentityService: UserIdentitiesService) {}
  
    @Post()
    @ApiCreatedResponse({ type: UserIdentity })
    async create(@Body() userIdentity: UserIdentityDto): Promise<UserIdentity> {
      return await this.userIdentityService.create(userIdentity)
    }
  
    @Get(':subjectId')
    @ApiOkResponse({ type: UserIdentity })
    async findOne(@Param('subjectId') subjectId: string): Promise<UserIdentity> {
      const userIdentity = await this.userIdentityService.findBySubjectId(subjectId)
      if (!userIdentity) {
        throw new NotFoundException("This user identity doesn't exist")
      }
  
      return userIdentity
    }
  
    @Get('/:provider/:subjectId')
    @ApiOkResponse({ type: UserIdentity })
    async findOneByProviderSubject(@Param('provider') provider: string, @Param('subjectId') subjectId: string): Promise<UserIdentity> {
      const userIdentity = await this.userIdentityService.findByProviderSubjectId(provider, subjectId)
  
      if (!userIdentity) {
        throw new NotFoundException("This user identity doesn't exist")
      }
  
      return userIdentity
    }
  }
  