import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { orderProviders } from './order.providers';
import { OrderController } from './order.controller';
import { DatabaseModule } from 'src/config/database/database.module';
import { OrderGateway } from './order.gateway';
@Module({
  imports: [DatabaseModule],
  controllers: [OrderController],
  providers: [...orderProviders, OrderService, OrderGateway],
  exports: [OrderService],
})
export class OrderModule {}
