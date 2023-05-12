import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { orderProviders } from './order.providers';
import { OrderController } from './order.controller';
import { DatabaseModule } from 'src/config/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [OrderController],
  providers: [...orderProviders, OrderService],
  exports: [OrderService],
})
export class OrderModule {}
