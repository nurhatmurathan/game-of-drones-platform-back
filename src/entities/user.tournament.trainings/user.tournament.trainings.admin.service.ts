import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserTournamentTrainings } from "./user.tournament.trainings.entity";

@Injectable()
export class UserTournamentTrainingsAdminService {
    constructor(
        @InjectRepository(UserTournamentTrainings)
        private readonly userTournamentTrainingsRepository: Repository<UserTournamentTrainings>
    ) {}

    async getTournamentUsers(tournamentId: number): Promise<UserTournamentTrainings[]> {
        return await this.userTournamentTrainingsRepository.find({
            where: { tournament: { id: tournamentId } },
            relations: { user: true },
        });
    }

    async updateBatch(a: { tournamentTimeId: number; userId: number; place: number }[]) {}
}
