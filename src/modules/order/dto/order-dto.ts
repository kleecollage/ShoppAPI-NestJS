import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { ClientDto } from 'src/modules/client/dto/client-dto';
import { ProductDto } from 'src/modules/product/dto/product-dto';

export class OrderDto {
  @ApiProperty({
    name: 'id',
    type: Number,
    required: false,
    description: 'Order ID (UUID)',
  })
  @IsOptional()
  @IsUUID()
  id?: string;

  @ApiProperty({
    name: 'createdAt',
    type: Date,
    required: false,
    description: 'Date of creation of order',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  createdAt?: Date;

  @ApiProperty({
    name: 'updatedAt',
    type: Date,
    required: false,
    description: 'Date of update of order',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  updatedAt?: Date;

  @ApiProperty({
    name: 'confirmAt',
    type: Date,
    required: false,
    description: 'Date of confirmation of order',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  confirmAt?: Date;

  @ApiProperty({
    name: 'client',
    type: ClientDto,
    required: true,
    description: 'Customer order',
  })
  @IsNotEmpty()
  @Type(() => ClientDto)
  client!: ClientDto;

  @ApiProperty({
    name: 'product',
    type: ProductDto,
    isArray: true,
    required: true,
    description: 'Products of the order',
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @Type(() => ProductDto)
  products!: ProductDto[];
}
