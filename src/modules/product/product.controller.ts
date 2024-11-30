import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
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

  @Get()
  getProducts() {
    return this.productService.findAll();
  }

  @Get('/deleted')
  getProductsDeleted() {
    return this.productService.findAllDeleted();
  }

  @Get('/:id')
  getProductById(@Param('id') id: number) {
    return this.productService.findProduct(id);
  }

  @Put()
  updateProduct(@Body() product: ProductDto) {
    return this.productService.updateProduct(product);
  }

  @Delete('/:id')
  deleteProduct(@Param('id') id: number) {
    return this.productService.softDelete(id);
  }

  @Patch('/restore/:id')
  restoreProduct(@Param('id') id: number) {
    return this.productService.restoreProduct(id);
  }
}
