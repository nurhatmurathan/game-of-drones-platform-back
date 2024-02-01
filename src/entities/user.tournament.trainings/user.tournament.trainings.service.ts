import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsRelations, Repository } from "typeorm";
import { UserTournamentTrainings } from "./user.tournament.trainings.entity";

@Injectable()
export class UserTournamentTrainingsService {
    constructor(
        @InjectRepository(UserTournamentTrainings)
        private readonly userTournamentTrainingsRepository: Repository<UserTournamentTrainings>
    ) {}

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

    // async addTraining(userId: number, tournamentId: number, trainingId: number){
    //     const instance: UserTournamentTrainings = this.findOne(userId, tournamentId)

    // }

    async isTheUserRegisteredForTheTournament(instance: UserTournamentTrainings): Promise<boolean> {
        if (instance) return true;
        return false;
    }
}
