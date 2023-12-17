import { Get, Module } from '@nestjs/common';
import { UserModule } from './entities/user/user.module';
import { ConfigModule } from './config.module';
import { LigaModule } from './entities/liga/liga.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { MultilingualtextModule } from './entities/multilingualtext/multilingualtext.module';
import { TournamentModule } from './entities/tournament/tournament.module';
import { RouteModule } from './entities/route/route.module';
import { UtilModule } from './utils/util.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule,
    UserModule,
    LigaModule,
    AuthModule,
    MultilingualtextModule,
    TournamentModule,
    RouteModule,
    UtilModule
  ],
  controllers: [AuthController],
  providers: [AuthService],

})
export class AppModule {}


