import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class ProductDto {
  @ApiProperty({
    name: 'id',
    required: false,
    description: 'ID product',
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  id?: number;

  @ApiProperty({
    name: 'name',
    required: true,
    description: 'Product name',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({
    name: 'proce',
    required: true,
    description: 'Product price',
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price!: number;

  @ApiProperty({
    name: 'stock',
    required: true,
    description: 'Product stock',
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  stock!: number;

  @ApiProperty({
    name: 'deleted',
    required: false,
    description: 'Indicates if the product is deleted',
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  deleted?: boolean;
}
