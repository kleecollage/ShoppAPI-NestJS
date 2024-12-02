import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from 'src/modules/client/entity/address.entity';
import { Client } from 'src/modules/client/entity/client.entity';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Address])],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
