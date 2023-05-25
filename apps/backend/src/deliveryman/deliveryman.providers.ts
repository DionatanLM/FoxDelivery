import {
  DATA_SOURCE,
  DELIVERYMAN_REPOSITORY,
} from 'src/config/constants/providers';
import { Deliveryman } from 'src/entities/Deliveryman.entity';
import { DataSource } from 'typeorm';

export const deliveryManProviders = [
  {
    provide: DELIVERYMAN_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Deliveryman),
    inject: [DATA_SOURCE],
  },
];
