import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class ProductDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  id?: number;

  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price!: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  stock!: number;

  @IsOptional()
  @IsBoolean()
  deleted?: boolean;
}
