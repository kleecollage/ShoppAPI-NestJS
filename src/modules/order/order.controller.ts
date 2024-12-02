import { Controller } from '@nestjs/common';
import { OrderService } from 'src/modules/order/order.service';

@Controller('api/v1/orders')
export class OrderController {
  constructor(private orderService: OrderService) {}
}
