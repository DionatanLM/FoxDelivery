import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from 'src/entities/User.entity';
import {
  DELIVERYMAN_REPOSITORY,
  STORE_REPOSITORY,
  USER_REPOSITORY,
} from 'src/config/constants/providers';
import { Deliveryman } from 'src/entities/Deliveryman.entity';
import { Store } from 'src/entities/Store.entity';
import { CreateUserStoreDto } from './dto/create-user-store.dto';
import { CreateUserDeliveryManDto } from './dto/create-user-deliveryman.dto';
import { USER_ROLE } from 'src/config/constants/user-role.enum';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: Repository<User>,
    @Inject(STORE_REPOSITORY)
    private storeRepository: Repository<Store>,
    @Inject(DELIVERYMAN_REPOSITORY)
    private deliverymanRepository: Repository<Deliveryman>,
  ) {}

  async create(
    user: CreateUserDto | CreateUserStoreDto | CreateUserDeliveryManDto,
  ) {
    const newUser = this.userRepository.create(user);
    if (user.userRole === USER_ROLE.DELIVERYMAN) {
      await this.createDeliveryman(user);
    }
    if (user.userRole === USER_ROLE.STORE) {
      await this.createStore(user);
    }

    await this.userRepository.save(newUser);

    return newUser;
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    if (username) {
      const user = await this.userRepository.findOne({
        where: { username: username },
        loadEagerRelations: true,
        withDeleted: false,
      });

      return user;
    }
    return undefined;
  }

  async findOneByCpfCnpj(cpfCnpj: string): Promise<User | undefined> {
    if (cpfCnpj) {
      const storeInfo = await this.storeRepository.findOne({
        where: { cnpj: cpfCnpj },
      });
      if (storeInfo) {
        const user = await this.userRepository.findOne({
          where: { username: storeInfo.email },
          loadEagerRelations: true,
        });
        return user;
      }
    }
    return undefined;
  }

  async insertLastAccess(user: User) {
    try {
      const updatedUser = await this.userRepository.update(
        { uuid: user.uuid },
        { lastAccess: new Date().toISOString() },
      );
      return updatedUser;
    } catch (e) {
      console.log(e);
    }
  }

  async findOne(uuid: string) {
    return await this.userRepository.findOneBy({ uuid });
  }

  update(uuid: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${uuid} user`;
  }

  remove(uuid: string) {
    return `This action removes a #${uuid} user`;
  }

  private async createStore(user: CreateUserStoreDto) {
    const userStore = this.storeRepository.create({
      email: user.username,
      name: user.name,
      responsibleName: user.responsibleName,
      cnpj: user.cnpj,
      cellphone: user.cellphone,
      category: user.category,
      address: user.address,
      lat: user.lat,
      lng: user.lng,
      neighborhood: user.neighborhood,
      postalCode: user.postalCode,
    });

    const { uuid } = await this.storeRepository.save(userStore);
    return uuid;
  }

  private async createDeliveryman(user: CreateUserDeliveryManDto) {
    const userDeliveryman = this.deliverymanRepository.create({
      email: user.username,
      name: user.name,
      cpf: user.cpf,
      cellphone: user.cellphone,
      birthdate: user.birthdate,
      cnh: user.cnh,
      postalCode: user.postalCode,
      address: user.address,
      neighborhood: user.neighborhood,
    });
    const { uuid } = await this.deliverymanRepository.save(userDeliveryman);
    return uuid;
  }

  async createUserAndStore(user: CreateUserStoreDto) {
    const newUser = this.userRepository.create({
      name: user.name,
      username: user.username,
      password: user.password,
    });
    await this.userRepository.save(newUser);

    await this.createStore(user);

    return newUser;
  }

  async findOneByUsernameWithDeleted(
    username: string,
  ): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { username },
      loadEagerRelations: true,
      withDeleted: true,
    });
    return user;
  }

  // findOneStoreByUsername(email: string): Promise<Store | undefined> {
  //   const user = await this.userRepository.findOne(userId, {
  //   });

  //   return email;
  // }

  async findStoreByUserId(userId: string): Promise<Store | null> {
    const user = await this.userRepository.findOne({
      where: { uuid: userId },
    });
    if (!user) {
      return null;
    }

    const store = await this.storeRepository.findOne({
      where: { email: user.username },
    });
    return store || null;
  }

  async restoreSoftDeleted(uuid: string): Promise<any> {
    return await this.userRepository.restore(uuid);
  }
}
