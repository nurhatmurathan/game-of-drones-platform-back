import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Training } from "../training/training.entity";
import { UserTournamentTrainings } from "./user.tournament.trainings.entity";

@Injectable()
export class UserTournamentTrainingsService {
    constructor(
        @InjectRepository(UserTournamentTrainings)
        private readonly userTournamentTrainingsRepository: Repository<UserTournamentTrainings>
    ) {}

    async getUserTournamentTrainings(userId: number, tournamentId: number): Promise<Training[]> {
        const instance: UserTournamentTrainings = this.userTournamentTrainingsRepository.findOne({
            where: { user: { id: userId }, tournament: { id: tournamentId } },
        });
        return;
    }
}
