import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ORDER_REPOSITORY } from 'src/config/constants/providers';
import { Order } from 'src/entities/Order.entity';
import { Repository } from 'typeorm';
import { ORDER_STATUS } from 'src/config/constants/order-status.enum';

@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private orderRepository: Repository<Order>,
  ) {}
  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  async createOrderByUserStore(createOrderDto: CreateOrderDto) {
    console.log(createOrderDto);
    const newOrder = this.orderRepository.create({
      orderNumber: createOrderDto.orderNumber,
      storeUuid: createOrderDto.storeUuid,
      clientName: createOrderDto.clientName,
      price: createOrderDto.price,
      typePayment: createOrderDto.typePayment,
      address: createOrderDto.address,
      latLngAddress: createOrderDto.latLngAddress,
      status: ORDER_STATUS.CREATED,
    });
    await this.orderRepository.save(newOrder);

    return newOrder;
  }

  findAll() {
    return `This action returns all order`;
  }

  async findOrderByUserStoreUuid(storeUuid: string) {
    const orderByStore = await this.orderRepository.find({
      where: { storeUuid },
    });
    return orderByStore;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
