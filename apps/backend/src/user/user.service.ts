import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from 'src/entities/User.entity';
import { USER_REPOSITORY } from 'src/config/constants/providers';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: Repository<User>,
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

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
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
