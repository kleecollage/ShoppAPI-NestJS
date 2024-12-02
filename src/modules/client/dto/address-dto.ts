import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class AdressDto {
  @IsOptional()
  @IsPositive()
  @IsNumber()
  id?: number;

  @IsNotEmpty()
  @IsString()
  counrty!: string;

  @IsNotEmpty()
  @IsString()
  province!: string;

  @IsNotEmpty()
  @IsString()
  town!: string;

  @IsNotEmpty()
  @IsString()
  street!: string;
}
