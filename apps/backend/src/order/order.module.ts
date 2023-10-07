import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { orderProviders } from './order.providers';
import { OrderController } from './order.controller';
import { DatabaseModule } from 'src/config/database/database.module';
import { OrderGateway } from './order.gateway';
import { storeProviders } from 'src/store/store.providers';
import { deliveryManProviders } from 'src/deliveryman/deliveryman.providers';
import { Server } from 'socket.io';
import { DELIVERYMAN_SOCKETS } from 'src/config/constants/providers';

const deliverymanSocketsMap = new Map<string, string>();

@Module({
  imports: [DatabaseModule],
  controllers: [OrderController],
  providers: [
    ...orderProviders,
    ...storeProviders,
    ...deliveryManProviders,
    OrderService,
    OrderGateway,
    Server,
    {
      provide: 'DELIVERYMAN_SOCKETS',
      useValue: deliverymanSocketsMap,
    },
    {
      provide: 'API_KEY',
      useValue: process.env.GOOGLE_API_KEY,
    },
  ],
  exports: [OrderService, DELIVERYMAN_SOCKETS],
})
export class OrderModule {}
