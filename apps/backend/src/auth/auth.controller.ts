import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ResponseLoginDto } from './dto/response-login.dto';
import { CreateUserStoreDto } from 'src/user/dto/create-user-store.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async getUser(
    @Body() loginInfo: LoginDto,
  ): Promise<ResponseLoginDto | any> {
    try {
      const tokenNUserInfo = await this.authService.login(loginInfo);
      return tokenNUserInfo;
    } catch (e) {
      return { error: e };
    }
  }

  // @Post('provider/login')
  // public async providerLogin(
  //   @Body() loginInfo: ProviderLoginDto,
  // ): Promise<ResponseLoginDto | boolean> {
  //   const tokenNUserInfo = await this.authService.providerLogin(loginInfo);

  //   return tokenNUserInfo;
  // }

  @Post('register')
  public async register(
    @Body() newUser: CreateUserStoreDto,
  ): Promise<ResponseLoginDto | any> {
    try {
      return await this.authService.registerUserStore(newUser);
    } catch (e) {
      return { error: e };
    }
  }
}
