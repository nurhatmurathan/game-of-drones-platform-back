import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../entities/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserService } from '../entities/user/user.service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
        global: true,
        secret: process.env.JWT_SECRET || "dron",
        signOptions: { expiresIn: '5m' },
      }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}