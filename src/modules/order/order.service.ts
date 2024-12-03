import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientService } from 'src/modules/client/client.service';
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
}
