import { ValidatorModule } from "./common/validations/validator.module";
import { Get, Module } from "@nestjs/common";
import { UserModule } from "./entities/user/user.module";
import { ConfigModule } from "./config.module";
import { LigaModule } from "./entities/liga/liga.module";
import { AuthController } from "./auth/auth.controller";
import { AuthService } from "./auth/auth.service";
import { AuthModule } from "./auth/auth.module";
import { DatabaseModule } from "./database/database.module";
import { MultilingualtextModule } from "./entities/multilingualtext/multilingualtext.module";
import { TournamentModule } from "./entities/tournament/tournament.module";
import { RouteModule } from "./entities/route/route.module";
import { UtilModule } from "./utils/util.module";
import { TournamentTimeModule } from "./entities/tournament.time/tournament.time.module";
import { TaskModule } from "./entities/task/task.module";
import { ActionModule } from "./entities/action/action.module";
import { UserTournamentTimeModule } from "./entities/user.tournament.time/user.tournament.time.module";
import { TrainingModule } from "./entities/training/training.module";
import { MailModule } from "./mail/mail.module";
import { TokenModule } from "./entities/token/token.module";

@Module({
    imports: [
        DatabaseModule,
        ConfigModule,
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
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AppModule {}
