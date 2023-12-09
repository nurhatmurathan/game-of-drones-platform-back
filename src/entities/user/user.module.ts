import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from '@database/database.module';
import { userProviders } from './user.providers';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [UserController],
  providers: [
    ...userProviders,
    UserService],
  exports: [UserService]

})
export class UserModule {}


