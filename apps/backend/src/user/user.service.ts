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
  async create(user: CreateUserDto) {
    const newUser = this.userRepository.create(user);
    await this.userRepository.save(newUser);

    // if (user.userRole === 'DELIVERYMAN') {
    //   await this.createDeliveryman(newUser);
    // }
    // if (user.userRole === 'STORE') {
    //   await this.createStore(newUser);
    // }

    //const { uuid: uuid_user } = await this.userRepository.save(newUser);

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

  // private async createStore(user: CreateUserStoreDto) {
  //   const userStore = this.storeRepository.create({
  //     email: user.username,
  //     name: user.name,
  //     cpf: user.cpf,
  //     cellphone: user.cellphone,
  //   });
  //   const { uuid } = await this.storeRepository.save(userStore);
  //   return uuid;
  // }

  // private async createDeliveryman(user: CreateUserDeliverymanDto) {
  //   const userDeliveryman = this.deliverymanRepository.create({
  //     email: user.username,
  //     name: user.name,
  //     cpf: user.cpf,
  //     cellphone: user.cellphone,
  //   });
  //   const { uuid } = await this.deliverymanRepository.save(userDeliveryman);
  //   return uuid;
  // }
}
