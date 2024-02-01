import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserTournamentTrainings } from "./user.tournament.trainings.entity";

@Injectable()
export class UserTournamentTrainingsService {
    constructor(
        @InjectRepository(UserTournamentTrainings)
        private readonly userTournamentTrainingsRepository: Repository<UserTournamentTrainings>
    ) {}

    async create(userId: number, tournamentId: number, trainingId: number) {}
}
