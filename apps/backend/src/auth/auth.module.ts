import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DeliveryManModule } from 'src/deliveryman/deliveryman.module';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthHelper } from './auth.helper';
import { PassportModule } from '@nestjs/passport';
import { StoreModule } from 'src/store/store.module';

@Module({
  imports: [
    DeliveryManModule,
    UserModule,
    StoreModule,
    PassportModule,
    JwtModule.register({
      secret: 'jwtConstants.secret',
      signOptions: { expiresIn: '60000000s' },
    }),
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService, AuthHelper],
  exports: [PassportModule, AuthHelper, AuthService],
})
export class AuthModule {}
