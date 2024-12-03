import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OrderDto } from 'src/modules/order/dto/order-dto';
import { OrderService } from 'src/modules/order/order.service';
import { ParseDatePipe } from 'src/pipes/parse-date.pipe';

@Controller('api/v1/orders')
@ApiTags('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  @ApiOperation({
    description: 'Create order',
  })
  @ApiBody({
    description: 'Create an order using OrderDto',
    type: OrderDto,
    examples: {
      example1: {
        value: {
          client: { id: 1 },
          products: [{ id: 3 }, { id: 2 }],
        },
      },
      example2: {
        value: {
          confirmAt: '2024-01-30',
          client: { id: 2 },
          products: [{ id: 1 }, { id: 3 }],
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Order created successfully',
  })
  @ApiResponse({
    status: 409,
    description: /*html*/ `Client not exists<br />
                          Product not exists<br />
                          Product status is deleted
                          `,
  })
  createOrder(@Body() order: OrderDto) {
    return this.orderService.createOrder(order);
  }

  @Get('/pending')
  @ApiOperation({
    description: 'Returns all pending orders or without confirm',
  })
  @ApiResponse({
    status: 200,
    description: 'Data returned correctly',
  })
  getPendingOrders() {
    return this.orderService.getPendingOrders();
  }

  @Get('/confirmed')
  @ApiOperation({
    description:
      'Returns all confirmed orders, with the option to filter between start and end dates',
  })
  @ApiQuery({
    name: 'start',
    type: Date,
    required: false,
    description: 'Filter orders from the confirmation date',
  })
  @ApiQuery({
    name: 'end',
    type: Date,
    required: false,
    description: 'Filter orders from the confirmation date',
  })
  @ApiResponse({
    status: 200,
    description: 'Data returned correctly',
  })
  getConfirmedOrders(
    @Query('start', ParseDatePipe) start: Date,
    @Query('end', ParseDatePipe) end: Date,
  ) {
    return this.orderService.getConfirmedOrders(start, end);
  }

  @Get('/:id')
  @ApiOperation({
    description: 'Givens its id, return all information order',
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'Order ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Data returned succesfully',
  })
  getOrderById(@Param('id') id: string) {
    return this.orderService.getOrderById(id);
  }

  @Get('/client/:id')
  @ApiOperation({
    description: 'Return all customer orders',
  })
  @ApiParam({
    name: 'idClient',
    type: Number,
    required: true,
    description: 'Client ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Data returned succesfully',
  })
  getOrdersByClient(@Param('idClient') idClient: number) {
    return this.orderService.getOrdersByClient(idClient);
  }

  @Patch('/confirm/:id')
  @ApiOperation({
    description: 'Sets a date for the confirmed field',
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'Order ID',
  })
  @ApiResponse({
    status: 200,
    description: 'New date seted on confirmAt succesfully',
  })
  @ApiResponse({
    status: 409,
    description: /*html*/ `Confirm is already stablish<br />
                            Order not exists
                          `,
  })
  confirmOrder(@Param('id') id: string) {
    return this.orderService.confirmOrder(id);
  }
}
