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
import { TournamentTimeModule } from './entities/tournament.time/tournament.time.module';
import { TaskModule } from './entities/task/task.module';
import { ActionModule } from './entities/action/action.module';

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
    UtilModule,
    TournamentTimeModule,
    TaskModule,
    ActionModule
  ],
  controllers: [AuthController],
  providers: [AuthService],

})
export class AppModule {}


