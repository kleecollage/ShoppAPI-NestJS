import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientService } from 'src/modules/client/client.service';
import { OrderDto } from 'src/modules/order/dto/order-dto';
import { Order } from 'src/modules/order/entity/order.entity';
import { ProductService } from 'src/modules/product/product.service';
import {
  IsNull,
  LessThanOrEqual,
  MoreThanOrEqual,
  Not,
  Repository,
  UpdateResult,
} from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private clientService: ClientService,
    private productService: ProductService,
  ) {}

  async createOrder(order: OrderDto) {
    const clientExists = await this.clientService.getClientById(
      order.client.id,
    );

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

  getOrderById(id: string) {
    return this.orderRepository.findOne({
      where: { id },
    });
  }

  getPendingOrders() {
    return this.orderRepository.find({
      where: { confirmAt: IsNull() },
    });
  }

  async getConfirmedOrders(start: Date, end: Date) {
    if (start || end) {
      const query = this.orderRepository
        .createQueryBuilder('order')
        .leftJoinAndSelect('order.client', 'client')
        .leftJoinAndSelect('order.products', 'product')
        .orderBy('order.confirmAt');

      if (start) {
        query.andWhere({ confirmAt: MoreThanOrEqual(start) });
      }

      if (end) {
        end.setHours(24);
        end.setMinutes(59);
        end.setSeconds(59);
        end.setMilliseconds(999);
        query.andWhere({ confirmAt: LessThanOrEqual(end) });
        console.log('start: ' + start);
        console.log('end: ' + end);
      }

      return await query.getMany();
    } else {
      return this.orderRepository.find({
        where: { confirmAt: Not(IsNull()) },
        order: { confirmAt: 'DESC' },
      });
    }
  }

  async confirmOrder(id: string) {
    const orderExists = await this.getOrderById(id);

    if (!orderExists)
      throw new ConflictException(`Order with ID: ${id} not exists`);

    if (orderExists.confirmAt)
      throw new ConflictException(`Order with ID: ${id} is already confirmed`);

    const rows: UpdateResult = await this.orderRepository.update(
      { id },
      { confirmAt: new Date() },
    );

    return rows.affected == 1;
  }

  getOrdersByClient(idClient: number) {
    return this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.client', 'client')
      .leftJoinAndSelect('order.products', 'product')
      .where('client.id = :idClient', { idClient })
      .orderBy('order.confirmAt')
      .getMany();
  }
}
