import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LessThan, Repository } from "typeorm";
import { Tournament } from "../tournament/tournament.entity";
import { TrainingListDto } from "./dto";
import { Training } from "./training.entity";

@Injectable()
export class TrainingService {
    constructor(
        @InjectRepository(Training)
        private readonly trainingRepository: Repository<Training>
    ) {}

    async getAvailableTrainings(tournamentInstance: Tournament): Promise<TrainingListDto[]> {
        const instances: Training[] = await this.trainingRepository.find({
            where: { startTime: LessThan(tournamentInstance.startDate) },
            order: { startTime: "ASC" },
        });

        const trainingListDtoArray: TrainingListDto[] = instances.map((instance) => ({
            id: instance.id,
            startTime: instance.startTime,
            places: instance.places,
            reserved: 0,
        }));

        return trainingListDtoArray;
    }

    async userTrainings(userId: number) {
        return await this.trainingRepository.find({
            where: {
                userTournamentTimes: { user: { id: userId } },
            },
        });
    }
}
