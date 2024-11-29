import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDto } from 'src/modules/product/dto/product-dto';
import { Product } from 'src/modules/product/entity/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async createProduct(product: ProductDto) {
    return await this.productRepository.save(product);
  }

  async findProduct(id: number) {
    return await this.productRepository.findOne({
      where: { id }, // { id } = { id: id}
    });
  }
}
