import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserTournamentTrainingsAdminController } from "./user.tournament.trainings.admin.controller";
import { UserTournamentTrainingsAdminService } from "./user.tournament.trainings.admin.service";
import { UserTournamentTrainingsController } from "./user.tournament.trainings.controller";
import { UserTournamentTrainings } from "./user.tournament.trainings.entity";
import { UserTournamentTrainingsService } from "./user.tournament.trainings.service";

@Module({
    imports: [TypeOrmModule.forFeature([UserTournamentTrainings])],
    providers: [UserTournamentTrainingsService, UserTournamentTrainingsAdminService],
    exports: [UserTournamentTrainingsService, UserTournamentTrainingsAdminService],
    controllers: [UserTournamentTrainingsController, UserTournamentTrainingsAdminController],
})
export class UserTournamentTrainingsModule {}
