import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/store')
  createOrderByUserStore(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrderByUserStore(createOrderDto);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
