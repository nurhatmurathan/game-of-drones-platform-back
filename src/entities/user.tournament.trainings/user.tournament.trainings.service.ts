import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsRelations, Repository } from "typeorm";
import { Training } from "../training/training.entity";
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

    async addTraining(userId: number, tournamentId: number, trainingId: number) {
        const instance: UserTournamentTrainings = await this.findOne(userId, tournamentId, {
            trainings: true,
        });

        if (instance.trainings.find((t) => t.id === trainingId)) {
            throw new BadRequestException("Training is already associated with this tournament for the user");
        }

        instance.trainings = [...instance.trainings, { id: trainingId } as Training];

        await this.userTournamentTrainingsRepository.save(instance);

        return { message: "Training is selected" };
    }

    async isTheUserRegisteredForTheTournament(instance: UserTournamentTrainings): Promise<boolean> {
        if (instance) return true;
        return false;
    }
}
