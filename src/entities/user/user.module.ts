import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from '@database/database.module';
import { userProviders } from './user.providers';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || "dron",
      signOptions: { expiresIn: '5m' },
    }),
  ],
  controllers: [UserController],
  providers: [
    ...userProviders,
    UserService],

})
export class UserModule {}


