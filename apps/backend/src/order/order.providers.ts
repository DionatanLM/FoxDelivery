import { DATA_SOURCE, ORDER_REPOSITORY } from 'src/config/constants/providers';
import { Order } from 'src/entities/Order.entity';
import { DataSource } from 'typeorm';

export const orderProviders = [
  {
    provide: ORDER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Order),
    inject: [DATA_SOURCE],
  },
];
