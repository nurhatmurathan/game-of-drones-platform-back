import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsRelations, IsNull, Not, Repository } from "typeorm";
import { Training } from "../training/training.entity";
import { UserTournamentTrainings } from "./user.tournament.trainings.entity";

@Injectable()
export class UserTournamentTrainingsService {
    constructor(
        @InjectRepository(UserTournamentTrainings)
        private readonly userTournamentTrainingsRepository: Repository<UserTournamentTrainings>
    ) { }

    async findOne(
        userId: number,
        tournamentId: number,
        relations?: FindOptionsRelations<UserTournamentTrainings>
    ): Promise<UserTournamentTrainings> {
        const instance: UserTournamentTrainings = await this.userTournamentTrainingsRepository.findOne({
            where: { user: { id: userId }, tournament: { id: tournamentId } },
            relations,
        });
        return instance;
    }

    async create(userId: number, tournamentId: number): Promise<UserTournamentTrainings> {
        const instance: UserTournamentTrainings = this.userTournamentTrainingsRepository.create({
            user: { id: userId },
            tournament: { id: tournamentId },
        });

        return await this.userTournamentTrainingsRepository.save(instance);
    }

    async bindTrainingToUser(
        userId: number,
        tournamentId: number,
        training: Training
    ): Promise<any> {
        console.log("Step 1 in bindTrainingToUser");
        const instance: UserTournamentTrainings = await this.findOne(
            userId,
            tournamentId,
            { training: true }
        );

        console.log("Step 2 in bindTrainingToUser");
        if (instance.training?.id === training.id)
            throw new BadRequestException("Training is already selected.");

        console.log("Step 3 in bindTrainingToUser");
        instance.training = training;
        await this.userTournamentTrainingsRepository.save(instance);
        console.log("Step 4 in bindTrainingToUser");

        return { message: "Training is selected" };
    }

    async isTheUserRegisteredForTheTournament(instance: UserTournamentTrainings): Promise<boolean> {
        if (instance) return true;
        return false;
    }

    async countReservedPlaces(trainingId: number, tournamentId: number): Promise<number> {
        console.log("Step 1 in countReservedPlaces");
        return await this.userTournamentTrainingsRepository.count({
            where: {
                training: { id: trainingId },
                tournament: { id: tournamentId },
                user: Not(IsNull())
            },
        });
    }

}
