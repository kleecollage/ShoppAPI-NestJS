import { Body, Controller, Post } from '@nestjs/common';
import { OrderDto } from 'src/modules/order/dto/order-dto';
import { OrderService } from 'src/modules/order/order.service';

@Controller('api/v1/orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  createOrder(@Body() order: OrderDto) {
    return this.orderService.createOrder(order);
  }
}
