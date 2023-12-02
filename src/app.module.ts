import { Module } from '@nestjs/common';
import { UserModule } from '@entities/user/user.module';
import { DatabaseModule } from '@database/database.module';
import { ConfigModule } from './config.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule,
    UserModule,
  ],

})
export class AppModule {}


