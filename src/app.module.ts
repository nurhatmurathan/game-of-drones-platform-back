import { Module } from "@nestjs/common";
import { AuthController } from "./auth/auth.controller";
import { AuthModule } from "./auth/auth.module";
import { AuthService } from "./auth/auth.service";
import { ValidatorModule } from "./common/validations/validator.module";
import { ConfigModule } from "./config.module";
import { DatabaseModule } from "./database/database.module";
import { ActionModule } from "./entities/action/action.module";
import { DronModule } from "./entities/dron/drone.module";
import { LigaModule } from "./entities/liga/liga.module";
import { MultilingualtextModule } from "./entities/multilingualtext/multilingualtext.module";
import { TokenModule } from "./entities/register.token/register.token.module";
import { RouteModule } from "./entities/route/route.module";
import { TaskModule } from "./entities/task/task.module";
import { TournamentTimeModule } from "./entities/tournament.time/tournament.time.module";
import { TournamentModule } from "./entities/tournament/tournament.module";
import { TrainingModule } from "./entities/training/training.module";
import { UserTournamentTimeModule } from "./entities/user.tournament.time/user.tournament.time.module";
import { UserModule } from "./entities/user/user.module";
import { MailModule } from "./mail/mail.module";
import { UtilModule } from "./utils/util.module";

@Module({
    imports: [
        ConfigModule,
        DatabaseModule,
        TokenModule,
        ValidatorModule,
        UserModule,
        LigaModule,
        AuthModule,
        MultilingualtextModule,
        TournamentModule,
        RouteModule,
        UtilModule,
        TournamentTimeModule,
        UserTournamentTimeModule,
        TaskModule,
        ActionModule,
        TrainingModule,
        MailModule,
        DronModule,
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AppModule {}
