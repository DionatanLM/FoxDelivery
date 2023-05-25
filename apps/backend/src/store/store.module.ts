import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/config/database/database.module';
import { storeProviders } from './store.providers';
import { StoreService } from './store.service';
import { StoreController } from './store.controllers';

@Module({
  imports: [DatabaseModule],
  controllers: [StoreController],
  providers: [...storeProviders, StoreService],
  exports: [StoreService],
})
export class DeliveryManModule {}
