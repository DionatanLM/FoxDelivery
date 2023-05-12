import { DataSource } from 'typeorm';
import { DATA_SOURCE } from '../constants/providers';

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        synchronize: false,
        logging: false,
        entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
      });

      return dataSource.initialize();
    },
  },
];
