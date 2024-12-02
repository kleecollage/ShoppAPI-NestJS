import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, Max, Min } from 'class-validator';

export class StockDto {
  @ApiProperty({
    name: 'id',
    required: true,
    description: 'Product ID',
    type: Number,
  })
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  id: number;

  @ApiProperty({
    name: 'stock',
    required: true,
    description: 'Product stock',
    type: Number,
  })
  @IsNotEmpty()
  @Min(0)
  @Max(1000)
  @IsNumber()
  stock: number;
}
