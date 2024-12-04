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
    private clientsRepository: Repository<Client>,

    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  //** ------------------------------ FIND CLIENT ------------------------------ **//
  findClient(client: Client) {
    return this.clientsRepository.findOne({
      where: [{ id: client.id }, { email: client.email }],
    });
  }

  //** ------------------------------ FIND CLIENT BY EMAIL ------------------------------ **//
  findClientByEmail(email: string) {
    return this.clientsRepository.findOne({
      where: { email },
    });
  }

  //** ------------------------------ GET ALL CLIENTS ------------------------------ **//
  getClients() {
    return this.clientsRepository.find();
  }

  //** ------------------------------ GET CLIENT BY ID ------------------------------ **//
  getClientById(id: number) {
    return this.clientsRepository.findOne({
      where: { id },
    });
  }

  //** ------------------------------ CREATE CLIENT ------------------------------ **//
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

    return this.clientsRepository.save(client);
  }

  //** ------------------------------ UPDATE CLIENT ------------------------------ **//
  async updateClient(client: ClientDto) {
    if (!client.id) return this.createClient(client);

    let clientExists = await this.findClientByEmail(client.email);

    if (clientExists && clientExists.id != client.id) {
      throw new ConflictException(
        `This email already existst: ${client.email}`,
      );
    }

    clientExists = await this.getClientById(client.id);

    let addressExists: Address = null;
    let deleteAddress = false;
    if (client.address.id) {
      addressExists = await this.addressRepository.findOne({
        where: {
          id: client.address.id,
        },
      });

      if (addressExists && addressExists.id != clientExists.address.id) {
        throw new ConflictException('This address already exists');
      } else if (
        JSON.stringify(addressExists) != JSON.stringify(client.address)
      ) {
        addressExists = await this.addressRepository.findOne({
          where: {
            country: client.address.country,
            province: client.address.province,
            town: client.address.town,
            street: client.address.street,
          },
        });

        if (addressExists)
          throw new ConflictException('This address already exists');
        else deleteAddress = true;
      }
    } else {
      addressExists = await this.addressRepository.findOne({
        where: {
          country: client.address.country,
          province: client.address.province,
          town: client.address.town,
          street: client.address.street,
        },
      });

      if (addressExists)
        throw new ConflictException('This address already exists');
      else deleteAddress = true;
    }

    const updateClient = await this.clientsRepository.save(client);

    if (deleteAddress)
      await this.addressRepository.delete({ id: clientExists.address.id });

    return updateClient;
  }

  //** ------------------------------ DELETE CLIENT ------------------------------ **//
  async deleteClient(id: number) {
    const clientExists = await this.getClientById(id);

    if (!clientExists) {
      throw new ConflictException(`Client with ID: ${id} not exists`);
    }

    const rows = await this.clientsRepository.delete({ id });
    if (rows.affected == 1) {
      await this.addressRepository.delete({ id: clientExists.address.id });
    }

    return rows.affected == 1;
  }
}
