import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from 'src/modules/product/product.service';

@Controller('product')
@ApiTags('products')
export class ProductController {
  constructor(private productService: ProductService) {}
}
