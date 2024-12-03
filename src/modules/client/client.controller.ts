import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ClientService } from 'src/modules/client/client.service';
import { ClientDto } from 'src/modules/client/dto/client-dto';

@Controller('api/v1/clients')
@ApiTags('clients')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Post()
  @ApiOperation({
    description: 'Create a new client',
  })
  @ApiBody({
    description: 'Create a new client using ClientDto',
    type: ClientDto,
    examples: {
      example1: {
        value: {
          id: 1,
          name: 'Michael Johnson',
          email: 'm.johnson@mail.com',
          address: {
            country: 'USA',
            province: 'FLorida',
            town: 'Miami',
            street: 'punta azul st 32',
          },
        },
      },
      example2: {
        value: {
          name: 'John Doe',
          email: 'j.doe@mail.com',
          address: {
            country: 'Mexico',
            province: 'Guadalajara',
            town: 'Jalisco',
            street: 'tequila no 123',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Client created successfully',
  })
  @ApiResponse({
    status: 409,
    description: /*html*/ `Client already exists<br/>
                          Address is already registered
                          `,
  })
  createClient(@Body() client: ClientDto) {
    return this.clientService.createClient(client);
  }

  @Get()
  @ApiOperation({
    description: 'Return all clients',
  })
  @ApiResponse({
    status: 200,
    description: 'Data returned successfully',
  })
  getClients() {
    return this.clientService.getClients();
  }

  @Get('/:id')
  @ApiOperation({
    description: 'Given its id, return one client and his address',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Client ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Data returned successfully',
  })
  getClientById(@Param('id') id: number) {
    return this.clientService.getClientById(id);
  }

  @Put()
  @ApiOperation({
    description: 'Update one client',
  })
  @ApiBody({
    description: 'Update one client using ClientDto',
    type: ClientDto,
    examples: {
      example1: {
        value: {
          id: 1,
          name: 'Jane Smith',
          email: 'j.smith@mail.com',
          address: {
            id: 1,
            country: 'USA',
            province: 'California',
            town: 'Las Vegas',
            street: 'rodeo st. 32',
          },
        },
      },
      example2: {
        value: {
          id: 2,
          name: 'James Brown',
          email: 'j.brown@mail.com',
          address: {
            id: 2,
            country: 'USA',
            province: 'Florida',
            town: 'Miami',
            street: 'cabo verde st. 32',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Client updated successfully',
  })
  @ApiResponse({
    status: 409,
    description: /*html*/ `Client already exists<br/>
                          Address is already registered
                          `,
  })
  updateClient(@Body() client: ClientDto) {
    return this.clientService.updateClient(client);
  }

  @Delete('/:id')
  @ApiOperation({
    description: 'Givens its id, delete a client and his address',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Client ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Client and his address deleted successfully',
  })
  @ApiResponse({
    status: 409,
    description: 'Client not exists',
  })
  deleteClient(@Param('id') id: number) {
    return this.clientService.deleteClient(id);
  }
}
