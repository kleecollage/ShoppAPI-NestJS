import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClientService } from 'src/modules/client/client.service';
import { ClientDto } from 'src/modules/client/dto/client-dto';

@Controller('api/v1/clients')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Post()
  createClient(@Body() client: ClientDto) {
    return this.clientService.createClient(client);
  }

  @Get()
  getClients() {
    return this.clientService.getClients();
  }
}
