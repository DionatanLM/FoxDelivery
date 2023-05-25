import { DATA_SOURCE, STORE_REPOSITORY } from 'src/config/constants/providers';
import { Store } from 'src/entities/Store.entity';
import { DataSource } from 'typeorm';

export const storeProviders = [
  {
    provide: STORE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Store),
    inject: [DATA_SOURCE],
  },
];
