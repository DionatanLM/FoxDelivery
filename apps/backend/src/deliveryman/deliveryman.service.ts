import { Inject } from '@nestjs/common';
import { DELIVERYMAN_REPOSITORY } from 'src/config/constants/providers';
import { Deliveryman } from 'src/entities/Deliveryman.entity';
import { Repository } from 'typeorm';
import { CreateDeliveryManDto } from './dto/create-deliveryman.dto';

export class DeliverymanService {
  constructor(
    @Inject(DELIVERYMAN_REPOSITORY)
    private deliverymanRepository: Repository<Deliveryman>,
  ) {}

  async create(deliveryman: CreateDeliveryManDto) {
    const newDeliveryMan = this.deliverymanRepository.create(deliveryman);
    await this.deliverymanRepository.save(newDeliveryMan);

    return newDeliveryMan;
  }

  findAll(): Promise<Deliveryman[]> {
    return this.deliverymanRepository.find();
  }

  findOne(uuid: string) {
    return `This action returns a #${uuid} DeliveryMan`;
  }

  findDeliveryByUsername(username: string) {
    return this.deliverymanRepository.findOne({ where: { email: username } });
  }

  remove(uuid: string) {
    return `This action removes a #${uuid} DeliveryMan`;
  }
}
