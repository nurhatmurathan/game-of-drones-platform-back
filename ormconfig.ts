import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.CLOUD_DATABASE_HOST,
  port: 5432,
  username: process.env.CLOUD_DATABASE_USER,
  password: process.env.CLOUD_DATABASE_PASS,
  database: process.env.CLOUD_DATABASE_NAME,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};

export = config;
