import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/config/database/database.module';
import { DeliveryManController } from './deliveryman.controller';
import { deliveryManProviders } from './deliveryman.providers';
import { DeliverymanService } from './deliveryman.service';

@Module({
  imports: [DatabaseModule],
  controllers: [DeliveryManController],
  providers: [...deliveryManProviders, DeliverymanService],
  exports: [DeliverymanService],
})
export class DeliveryManModule {}
