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
    const { uuid } = await this.storeRepository.save(newStore);

    return await this.storeRepository.findOneBy({ uuid });
  }

  async findStudentByCnpj(cnpj: string) {
    return await this.storeRepository.findOne({
      where: { cnpj },
    });
  }

  findAll(): Promise<Store[]> {
    return this.storeRepository.find();
  }

  async findOne(uuid: string) {
    return await this.storeRepository.findOne({
      where: { uuid: uuid },
    });
  }

  update(uuid: string, updateStoreDto: UpdateStoreDto) {
    return `This action updates a #${uuid} Store`;
  }

  remove(uuid: string) {
    return `This action removes a #${uuid} Store`;
  }
}
