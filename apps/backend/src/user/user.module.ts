import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProviders } from './user.providers';
import { DatabaseModule } from 'src/config/database/database.module';
import { deliveryManProviders } from 'src/deliveryman/deliveryman.providers';
import { storeProviders } from 'src/store/store.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    ...userProviders,
    ...storeProviders,
    ...deliveryManProviders,
    UserService,
  ],
  exports: [UserService],
})
export class UserModule {}
