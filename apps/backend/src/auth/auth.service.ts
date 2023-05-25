import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';

import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/entities/User.entity';

import { AuthHelper } from './auth.helper';
import { ResponseLoginDto } from './dto/response-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly helper: AuthHelper,
  ) {}

  public async login(body: LoginDto): Promise<ResponseLoginDto | never> {
    const { username, password }: LoginDto = body;
    let user = await this.userService.findOneByUsername(username);
    if (!user) {
      user = await this.userService.findOneByCpfCnpj(username);
    }
    const token = await this.checkUserAndGenToken(user, password);
    await this.userService.insertLastAccess(user);
    return { token, user };
  }

  // public async providerLogin(
  //   body: ProviderLoginDto,
  // ): Promise<ResponseLoginDto | boolean | never> {
  //   const { provider, idToken } = body;
  //   if (provider === 'google') {
  //     try {
  //       const response = await this.googleLogin(idToken);
  //       return response;
  //     } catch (e) {
  //       throw new Error(e.message);
  //     }
  //   }
  //   if (provider === 'facebook') {
  //     try {
  //       const response = await this.facebookLogin(idToken);
  //       return response;
  //     } catch (e) {
  //       throw new Error(e.message);
  //     }
  //   }
  //   return false;
  // }

  private async checkUserAndGenToken(user: User, password: string) {
    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid: boolean = await this.helper.isPasswordValid(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new HttpException('Senha incorreta', HttpStatus.NOT_FOUND);
    }

    return this.helper.generateToken(user);
  }

  // public async registerUser(
  //   userStudent: CreateUserStudentDto,
  // ): Promise<ResponseLoginDto> {
  //   const user: User = await this.userService.findOneByUsername(
  //     userStudent.username,
  //   );
  //   if (user) {
  //     throw new HttpException('Usuário já existente', HttpStatus.CONFLICT);
  //   }

  //   const student = await this.studentService.findStudentByCpf(userStudent.cpf);
  //   if (student) {
  //     throw new HttpException('CPF já cadastrado.', HttpStatus.CONFLICT);
  //   }

  //   const restoreDeletedUser = await this.restoreDeletedUser(userStudent);
  //   if (restoreDeletedUser) {
  //     const token = this.helper.generateToken(restoreDeletedUser);

  //     return { user: restoreDeletedUser, token };
  //   }

  //   const validationCode = this.helper.generateCode();

  //   const newUser = await this.userService.createUserAndStudent(
  //     userStudent,
  //     validationCode,
  //   );
  //   const token = this.helper.generateToken(newUser);

  //   const getUserWithReferralCode = await this.userService.findOneByUsername(
  //     newUser.username,
  //   );

  //   if (getUserWithReferralCode)
  //     return { user: getUserWithReferralCode, token };
  // }
}
