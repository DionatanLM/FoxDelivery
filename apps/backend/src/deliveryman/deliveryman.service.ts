import { Inject } from '@nestjs/common';
import { DELIVERYMAN_REPOSITORY } from 'src/config/constants/providers';
import { Deliveryman } from 'src/entities/Deliveryman.entity';
import { Repository } from 'typeorm';
import { CreateDeliveryManDto } from './dto/create-deliveryman.dto';
import { UpdateDeliveryManDto } from './dto/update-deliveryman.dto';

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

  update(uuid: string, updateDeliveryManDto: UpdateDeliveryManDto) {
    return `This action updates a #${uuid} DeliveryMan`;
  }

  remove(uuid: string) {
    return `This action removes a #${uuid} DeliveryMan`;
  }
}
