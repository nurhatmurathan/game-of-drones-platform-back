import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LessThan, Repository } from "typeorm";
import { TournamentTimeService } from "../tournament.time/tournament.time.service";
import { Tournament } from "../tournament/tournament.entity";
import { TournamentService } from "../tournament/tournament.service";
import { Training } from "./training.entity";

@Injectable()
export class TrainingService {
    constructor(
        @InjectRepository(Training)
        private readonly trainingRepository: Repository<Training>,
        private readonly tournamentTimeService: TournamentTimeService,
        private readonly tournamentService: TournamentService
    ) {}

    async availableTrainings(tournamentId: number): Promise<Training[]> {
        const tournamentInstance: Tournament = await this.tournamentService.findOneById(tournamentId, {
            route: true,
        });

        return await this.trainingRepository.find({
            where: { startTime: LessThan(tournamentInstance.startDate), route: tournamentInstance.route },
            order: { startTime: "ASC" },
        });
    }

    async userTrainings(userId: number) {
        return await this.trainingRepository.find({
            where: {
                userTournamentTimes: { user: { id: userId } },
            },
        });
    }
}
