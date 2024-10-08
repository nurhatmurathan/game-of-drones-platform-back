import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UtilModule } from "../../utils/util.module";
import { LigaModule } from "../liga/liga.module";
import { MultilingualtextModule } from "../multilingualtext/multilingualtext.module";
import { RouteModule } from "../route/route.module";
import { TournamentTimeModule } from "../tournament.time/tournament.time.module";
import { TrainingModule } from "../training/training.module";
import { UserTournamentTrainingsModule } from "../user.tournament.trainings/user.tournament.trainings.module";
import { UserModule } from "../user/user.module";
import { TournamentAdminController } from "./tournament.admin.controller";
import { TournamentAdminService } from "./tournament.admin.service";
import { TournamentController } from "./tournament.controller";
import { Tournament } from "./tournament.entity";
import { TournamentService } from "./tournament.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Tournament]),
        LigaModule,
        RouteModule,
        UtilModule,
        UserModule,
        MultilingualtextModule,
        TournamentTimeModule,
        TrainingModule,
        UserTournamentTrainingsModule,
    ],
    controllers: [TournamentController, TournamentAdminController],
    providers: [TournamentService, TournamentAdminService],
    exports: [TournamentService, TournamentAdminService],
})
export class TournamentModule {}
