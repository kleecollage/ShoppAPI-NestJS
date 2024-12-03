import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class AddressDto {
  @ApiProperty({
    name: 'id',
    type: Number,
    required: false,
    description: 'Address ID',
  })
  @IsOptional()
  @IsPositive()
  @IsNumber()
  id?: number;

  @ApiProperty({
    name: 'country',
    type: String,
    required: true,
    description: 'Country address',
  })
  @IsNotEmpty()
  @IsString()
  counrty!: string;

  @ApiProperty({
    name: 'province',
    type: String,
    required: true,
    description: 'Province address',
  })
  @IsNotEmpty()
  @IsString()
  province!: string;

  @ApiProperty({
    name: 'town',
    type: String,
    required: true,
    description: 'Town address',
  })
  @IsNotEmpty()
  @IsString()
  town!: string;

  @ApiProperty({
    name: 'street',
    type: String,
    required: true,
    description: 'Street address',
  })
  @IsNotEmpty()
  @IsString()
  street!: string;
}
