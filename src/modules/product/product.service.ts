import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDto } from 'src/modules/product/dto/product-dto';
import { StockDto } from 'src/modules/product/dto/stock-dto';
import { Product } from 'src/modules/product/entity/product.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ProductService {
  private MIN_STOCK: number = 0;
  private MAX_STOCK: number = 1000;
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

  async softDelete(id: number) {
    const productExists: ProductDto = await this.findProduct(id);

    if (!productExists)
      throw new ConflictException(`Product with id: ${id} not exists`);

    if (productExists.deleted) {
      throw new ConflictException(`Product with id: ${id} is already deleted`);
    }

    const rows: UpdateResult = await this.productRepository.update(
      { id },
      { deleted: true },
    );

    return rows.affected == 1;
  }

  async restoreProduct(id: number) {
    const productExists: ProductDto = await this.findProduct(id);

    if (!productExists)
      throw new ConflictException(`Product with id: ${id} not exists`);

    if (!productExists.deleted) {
      throw new ConflictException(`Product with id: ${id} is not deleted`);
    }

    const rows: UpdateResult = await this.productRepository.update(
      { id },
      { deleted: false },
    );

    return rows.affected == 1;
  }

  async updateStock(s: StockDto) {
    const product: ProductDto = await this.findProduct(s.id);

    if (!product) {
      throw new ConflictException(`Producto with id: ${s.id} not exists`);
    }

    if (product.deleted) {
      throw new ConflictException(`Producto with id: ${s.id} is deleted`);
    }

    const rows: UpdateResult = await this.productRepository.update(
      { id: s.id },
      { stock: s.stock },
    );

    return rows.affected == 1;
  }

  async incrementStock(s: StockDto) {
    const product: ProductDto = await this.findProduct(s.id);

    if (!product) {
      throw new ConflictException(`Producto with id: ${s.id} not exists`);
    }

    if (product.deleted) {
      throw new ConflictException(`Producto with id: ${s.id} is deleted`);
    }

    let stock = 0;
    if (s.stock + product.stock > this.MAX_STOCK) stock = this.MAX_STOCK;
    else stock = s.stock + product.stock;

    const rows: UpdateResult = await this.productRepository.update(
      { id: s.id },
      { stock },
    );

    return rows.affected == 1;
  }

  async decrementStock(s: StockDto) {
    const product: ProductDto = await this.findProduct(s.id);

    if (!product) {
      throw new ConflictException(`Producto with id: ${s.id} not exists`);
    }

    if (product.deleted) {
      throw new ConflictException(`Producto with id: ${s.id} is deleted`);
    }

    let stock = 0;
    if (product.stock - s.stock < this.MIN_STOCK) stock = this.MIN_STOCK;
    else stock = product.stock - s.stock;

    const rows: UpdateResult = await this.productRepository.update(
      { id: s.id },
      { stock },
    );

    return rows.affected == 1;
  }
}
