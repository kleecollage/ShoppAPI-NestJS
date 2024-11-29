import { ConflictException, Injectable } from '@nestjs/common';
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
    const productExists: ProductDto = await this.findProduct(product.id);
    if (productExists) {
      throw new ConflictException(
        `Product whit id: ${product.id} already exists`,
      );
    }

    return await this.productRepository.save(product);
  }

  async updateProduct(product: ProductDto) {
    return await this.productRepository.save(product);
  }

  async findProduct(id: number) {
    return await this.productRepository.findOne({
      where: { id }, // { id } = { id: id}
    });
  }

  async findAll() {
    return await this.productRepository.find({
      where: { deleted: false },
    });
  }

  async findAllDeleted() {
    return await this.productRepository.find({
      where: { deleted: true },
    });
  }
}
