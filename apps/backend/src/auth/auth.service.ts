import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';

import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/entities/User.entity';
import * as bcrypt from 'bcrypt';

import { AuthHelper } from './auth.helper';
import { ResponseLoginDto } from './dto/response-login.dto';
import { CreateUserStoreDto } from 'src/user/dto/create-user-store.dto';
import { StoreService } from 'src/store/store.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly helper: AuthHelper,
    private readonly storeService: StoreService,
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

  private async checkUserAndGenToken(user: User, password: string) {
    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
    console.log(user);

    const isPasswordValid: boolean = await this.helper.isPasswordValid(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new HttpException('Senha incorreta', HttpStatus.NOT_FOUND);
    }

    return this.helper.generateToken(user);
  }

  public async registerUserStore(
    userStore: CreateUserStoreDto,
  ): Promise<ResponseLoginDto> {
    const user: User = await this.userService.findOneByUsername(
      userStore.username,
    );
    if (user) {
      throw new HttpException('Usuário já existente', HttpStatus.CONFLICT);
    }

    const store = await this.storeService.findStudentByCnpj(userStore.cnpj);
    if (store) {
      throw new HttpException('CNPJ já cadastrado.', HttpStatus.CONFLICT);
    }

    const restoreDeletedUserStore = await this.restoreDeletedUser(userStore);
    if (restoreDeletedUserStore) {
      const token = this.helper.generateToken(restoreDeletedUserStore);

      return { user: restoreDeletedUserStore, token };
    }

    const newUser = await this.userService.createUserAndStore(userStore);
    const token = this.helper.generateToken(newUser);

    const getUserWithReferralCode = await this.userService.findOneByUsername(
      newUser.username,
    );

    if (getUserWithReferralCode)
      return { user: getUserWithReferralCode, token };
  }

  async restoreDeletedUser(userStore: Partial<User>): Promise<User> {
    const deletedUser: User =
      await this.userService.findOneByUsernameWithDeleted(userStore.username);

    if (deletedUser) {
      const restore = await this.userService.restoreSoftDeleted(
        deletedUser.uuid,
      );
      if (restore) {
        const validationCode = this.helper.generateCode();

        const recoverUserDto = {
          name: userStore.name,
          password: await bcrypt.hash(userStore.password, 11),
          userToken: validationCode,
          lastAccess: null,
          store: { name: userStore.name },
        };

        const recoveredUser = await this.userService.update(
          deletedUser.uuid,
          recoverUserDto,
        );

        if (recoveredUser) return deletedUser;

        throw new HttpException(
          'Erro ao cadastrar usuário.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return;
    }
    return;
  }
}
