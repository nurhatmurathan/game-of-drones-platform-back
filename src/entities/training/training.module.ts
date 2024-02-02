import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RouteModule } from "../route/route.module";
import { TournamentTimeModule } from "../tournament.time/tournament.time.module";
import { UserTournamentTrainingsModule } from "../user.tournament.trainings/user.tournament.trainings.module";
import { TrainingAdminController } from "./training.admin.controller";
import { TrainingAdminService } from "./training.admin.service";
import { TrainingController } from "./training.controller";
import { Training } from "./training.entity";
import { TrainingService } from "./training.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Training]),
        UserTournamentTrainingsModule,
        TournamentTimeModule,
        RouteModule
    ],
    controllers: [TrainingController, TrainingAdminController],
    providers: [TrainingService, TrainingAdminService],
    exports: [TrainingService, TrainingAdminService],
})
export class TrainingModule { }
