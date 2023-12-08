import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.CLOUD_DATABASE_HOST || "34.170.190.94",
        port: 5432,
        username: process.env.CLOUD_DATABASE || "dron",
        password: process.env.CLOUD_DATABASE || "dron",
        database: process.env.CLOUD_DATABASE || "dron",
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: true,
      });
 
      return dataSource.initialize();
    },
  },
];
