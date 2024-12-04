import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { AddressDto } from 'src/modules/client/dto/address-dto';

export class ClientDto {
  @ApiProperty({
    name: 'id',
    type: Number,
    required: false,
    description: 'Client ID',
  })
  @IsOptional()
  @IsPositive()
  @IsNumber()
  id?: number;

  @ApiProperty({
    name: 'name',
    type: String,
    required: true,
    description: 'Client name',
  })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({
    name: 'email',
    type: String,
    required: true,
    description: 'Client email',
  })
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @ApiProperty({
    name: 'address',
    type: AddressDto,
    required: true,
    description: 'Client address',
  })
  @Type(() => AddressDto)
  @IsNotEmpty()
  address!: AddressDto;
}
