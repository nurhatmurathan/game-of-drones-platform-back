import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LessThan, Repository } from "typeorm";
import { TournamentTime } from "../tournament.time/tournament.time.entity";
import { TournamentTimeService } from "../tournament.time/tournament.time.service";
import { Training } from "./training.entity";

@Injectable()
export class TrainingService {
    constructor(
        @InjectRepository(Training)
        private readonly trainingRepository: Repository<Training>,
        private readonly tournamentTimeService: TournamentTimeService
    ) { }

    async availableTrainings(tournamentTimeId: number): Promise<Training[]> {
        const tournamentTimeInstance: TournamentTime =
            await this.tournamentTimeService.findOne(tournamentTimeId);

        return await this.trainingRepository.find({
            where: { startTime: LessThan(tournamentTimeInstance.startTime) },
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
