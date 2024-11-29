import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductDto } from 'src/modules/product/dto/product-dto';
import { ProductService } from 'src/modules/product/product.service';

@Controller('api/v1/products')
@ApiTags('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  createProduct(@Body() product: ProductDto) {
    return this.productService.createProduct(product);
  }

  @Get('/:id')
  getProductById(@Param('id') id: number) {
    return this.productService.findProduct(id);
  }
}
