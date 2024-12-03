import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientService } from 'src/modules/client/client.service';
import { OrderDto } from 'src/modules/order/dto/order-dto';
import { Order } from 'src/modules/order/entity/order.entity';
import { ProductService } from 'src/modules/product/product.service';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private clientService: ClientService,
    private productService: ProductService,
  ) {}

  async createOrder(order: OrderDto) {
    const clientExists = this.clientService.getClientById(order.client.id);

    if (!clientExists) {
      throw new ConflictException(
        `Client with ID: ${order.client.id} not exists`,
      );
    }

    for (const p of order.products) {
      const product = await this.productService.findProduct(p.id);
      if (!product) {
        throw new ConflictException(`Product with id ${p.id} not exists`);
      } else if (product.deleted) {
        throw new ConflictException(`Product with id ${p.id} is deleted`);
      }
    }

    return this.orderRepository.save(order);
  }
}
