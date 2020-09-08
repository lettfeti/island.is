import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common'
import { ApiOkResponse, ApiTags, ApiOAuth2 } from '@nestjs/swagger'
import { Client } from './models/client.model';
import { ClientsService } from './clients.service'
import { AuthGuard } from '@nestjs/passport'

@ApiOAuth2(['@identityserver.api/read'])
@UseGuards(AuthGuard('jwt'))
@ApiTags('clients')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get(':clientId')
  @ApiOkResponse({ type: Client })
  async findOne(@Param('clientId') clientId: string, @Req() request: Request): Promise<Client> {
    this.logger.log("Fetching client with clientId: ", clientId)

    const clientProfile = await this.clientsService.findClientById(clientId)
    if (!clientProfile) {
      throw new NotFoundException("This client doesn't exist")
    }

    return clientProfile
  }

}
