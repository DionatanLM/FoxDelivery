import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/store')
  createOrderByUserStore(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrderByUserStore(createOrderDto);
  }

  @Get('/store/:storeUuid')
  findAllOrderByStoreUuid(@Param('storeUuid') storeUuid: string) {
    return this.orderService.findOrderByUserStoreUuid(storeUuid);
  }

  @Get('/deliveryman/:deliveryManUuid')
  findOrderByDeliverymanUuid(
    @Param('deliveryManUuid') deliveryManUuid: string,
  ) {
    return this.orderService.findOrderByDeliverymanUuid(deliveryManUuid);
  }

  @Get('/findDelivery/:storeUuid')
  findDeliveryForOrder(@Param('storeUuid') storeUuid: string) {
    return this.orderService.findDeliveryForOrder(storeUuid);
  }
}
