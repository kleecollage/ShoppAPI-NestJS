import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { OrderDto } from 'src/modules/order/dto/order-dto';
import { OrderService } from 'src/modules/order/order.service';
import { ParseDatePipe } from 'src/pipes/parse-date.pipe';

@Controller('api/v1/orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  createOrder(@Body() order: OrderDto) {
    return this.orderService.createOrder(order);
  }

  @Get('/pending')
  getPendingOrders() {
    return this.orderService.getPendingOrders();
  }

  @Get('/confirmed')
  getConfirmedOrders(
    @Query('start', ParseDatePipe) start: Date,
    @Query('end', ParseDatePipe) end: Date,
  ) {
    return this.orderService.getConfirmedOrders(start, end);
  }

  @Get('/:id')
  getOrderById(@Param('id') id: string) {
    return this.orderService.getOrderById(id);
  }
}
