import { Module } from '@nestjs/common';
import { UserModule } from '@entities/user/user.module';
import { ConfigModule } from './config.module';
import { LigaModule } from '@entities/liga/liga.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    LigaModule,
    AuthModule
  ],
  controllers: [AuthController],
  providers: [AuthService],

})
export class AppModule {}


