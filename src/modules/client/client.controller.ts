import { Body, Controller, Post } from '@nestjs/common';
import { ClientService } from 'src/modules/client/client.service';
import { ClientDto } from 'src/modules/client/dto/client-dto';

@Controller('client')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Post()
  createClient(@Body() client: ClientDto){

  }
}
