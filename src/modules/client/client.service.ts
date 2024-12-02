import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientDto } from 'src/modules/client/dto/client-dto';
import { Address } from 'src/modules/client/entity/address.entity';
import { Client } from 'src/modules/client/entity/client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,

    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  findClient(client: Client) {
    return this.clientRepository.findOne({
      where: [{ id: client.id }, { email: client.email }],
    });
  }

  async createClient(client: ClientDto) {
    const clientExists = await this.findClient(client);

    if (clientExists) {
      if (client.id) {
        throw new ConflictException(
          `Client with ID: ${client.id} already exists`,
        );
      } else {
        throw new ConflictException(
          `Client with email: ${client.email} already exists`,
        );
      }
    }

    let addressExists: Address = null;
    if (client.address.id) {
      addressExists = await this.addressRepository.findOne({
        where: { id: client.address.id },
      });
    } else {
      addressExists = await this.addressRepository.findOne({
        where: {
          country: client.address.country,
          province: client.address.province,
          town: client.address.town,
          street: client.address.street,
        },
      });
    }

    if (addressExists) {
      throw new ConflictException('Address aldready exists');
    }

    return this.clientRepository.save(client);
  }
}
