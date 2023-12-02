import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.CLOUD_DATABASE_HOST,
        port: 5432,
        username: process.env.CLOUD_DATABASE,
        password: process.env.CLOUD_DATABASE,
        database: process.env.CLOUD_DATABASE,
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: true,
      });
 
      return dataSource.initialize();
    },
  },
];
