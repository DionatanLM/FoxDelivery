import { DATA_SOURCE, USER_REPOSITORY } from 'src/config/constants/providers';
import { User } from 'src/entities/User.entity';
import { DataSource } from 'typeorm';

export const userProviders = [
  {
    provide: USER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [DATA_SOURCE],
  },
];
