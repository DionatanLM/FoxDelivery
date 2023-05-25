import { Inject } from '@nestjs/common';
import { STORE_REPOSITORY } from 'src/config/constants/providers';
import { Store } from 'src/entities/Store.entity';
import { Repository } from 'typeorm';
import { UpdateStoreDto } from './dto/update-store.dto';
import { CreateStoreDto } from './dto/create-store.dto';

export class StoreService {
  constructor(
    @Inject(STORE_REPOSITORY)
    private storeRepository: Repository<Store>,
  ) {}

  async create(store: CreateStoreDto) {
    const newStore = this.storeRepository.create(store);
    await this.storeRepository.save(newStore);

    return newStore;
  }

  findAll(): Promise<Store[]> {
    return this.storeRepository.find();
  }

  findOne(uuid: string) {
    return `This action returns a #${uuid} DeliveryMan`;
  }

  update(uuid: string, updateStoreDto: UpdateStoreDto) {
    return `This action updates a #${uuid} DeliveryMan`;
  }

  remove(uuid: string) {
    return `This action removes a #${uuid} DeliveryMan`;
  }
}
