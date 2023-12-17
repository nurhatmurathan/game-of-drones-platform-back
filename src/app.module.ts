import { Module } from '@nestjs/common';
import { UserModule } from './entities/user/user.module';
import { ConfigModule } from './config.module';
import { LigaModule } from './entities/liga/liga.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { MultilingualtextModule } from './entities/multilingualtext/multilingualtext.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule,
    UserModule,
    LigaModule,
    AuthModule,
    MultilingualtextModule
  ],
  controllers: [AuthController],
  providers: [AuthService],

})
export class AppModule {}


