import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity'; 

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from '../../database/database.module';
import { userProviders } from './user.providers';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}


