import { InjectRepository } from "@nestjs/typeorm";
import { Training } from "./training.entity";
import { Injectable } from "@nestjs/common";
import { LessThan, Repository } from "typeorm";
import { TrainingCreateDto } from "./dto/training.create.dto";
import { TournamentTimeService } from "../tournament.time/tournament.time.service";

@Injectable()
export class TrainingService {
    constructor(
        @InjectRepository(Training)
        private readonly trainingRepository: Repository<Training>,
        private readonly tournamentTimeService: TournamentTimeService
    ) {}

    async create(trainingData: TrainingCreateDto): Promise<Training> {
        return await this.trainingRepository.save(trainingData);
    }

    async availableTrainings(tournamentTimeId: number): Promise<Training[]> {
        const tournamentTimeInstance =
            await this.tournamentTimeService.findOne(tournamentTimeId);
        return await this.trainingRepository.find({
            where: { startTime: LessThan(tournamentTimeInstance.startTime) },
            order: { startTime: "ASC" },
        });
    }
}
