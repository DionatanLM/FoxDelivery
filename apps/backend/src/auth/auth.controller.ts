import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ResponseLoginDto } from './dto/response-login.dto';

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

  // @Post('register')
  // public async register(
  //   @Body() newUser: CreateUserDeliverymanDto,
  // ): Promise<ResponseLoginDto | any> {
  //   try {
  //     return await this.authService.registerUser(newUser);
  //   } catch (e) {
  //     return { error: e };
  //   }
  // }
}
