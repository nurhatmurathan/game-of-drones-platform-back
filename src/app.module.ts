import { Module } from '@nestjs/common';
import { UserModule } from '@entities/user/user.module';
import { ConfigModule } from './config.module';
import { LigaModule } from '@entities/liga/liga.module';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    LigaModule
  ],

})
export class AppModule {}


