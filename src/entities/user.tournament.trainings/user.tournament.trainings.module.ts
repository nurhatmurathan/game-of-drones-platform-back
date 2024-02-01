import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserTournamentTrainingsController } from "./user.tournament.trainings.controller";
import { UserTournamentTrainings } from "./user.tournament.trainings.entity";
import { UserTournamentTrainingsService } from "./user.tournament.trainings.service";

@Module({
    imports: [TypeOrmModule.forFeature([UserTournamentTrainings])],
    providers: [UserTournamentTrainingsService],
    exports: [UserTournamentTrainingsService],
    controllers: [UserTournamentTrainingsController],
})
export class UserTournamentTrainingsModule {}
