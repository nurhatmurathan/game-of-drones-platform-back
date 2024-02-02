import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LessThan, Repository } from "typeorm";
import { Tournament } from "../tournament/tournament.entity";
import { UserTournamentTrainingsService } from "../user.tournament.trainings/user.tournament.trainings.service";
import { TrainingListDto } from "./dto";
import { Training } from "./training.entity";

@Injectable()
export class TrainingService {
    constructor(
        @InjectRepository(Training)
        private readonly trainingRepository: Repository<Training>,
        private readonly userTournamentTrainingsService: UserTournamentTrainingsService
    ) { }

    async addTraining(userId: number, tournamentId: number, id: number): Promise<any> {
        console.log("I'm in addTraining Service");
        const instance: Training = await this.trainingRepository.findOne({ where: { id: id } });

        return await this.userTournamentTrainingsService.bindTrainingToUser(userId, tournamentId, instance);
    }

    async getAvailableTrainings(tournamentInstance: Tournament): Promise<TrainingListDto[]> {
        const instances: Training[] = await this.trainingRepository.find({
            where: { startTime: LessThan(tournamentInstance.startDate) },
            order: { startTime: "ASC" },
        });

        const trainingListDtoArray: TrainingListDto[] = await Promise.all(
            instances.map((instance) =>
                this.retrieveTraining(instance, tournamentInstance)
            )
        );

        return trainingListDtoArray;
    }

    async retrieveTraining(instance: Training, tournamentInstance: Tournament): Promise<TrainingListDto> {
        return {
            id: instance.id,
            startTime: instance.startTime,
            places: instance.places,
            reserved: await this.userTournamentTrainingsService.
                countReservedPlaces(instance.id, tournamentInstance.id)
        };
    }


    async userTrainings(userId: number) {
        return await this.trainingRepository.find({
            where: {
                userTournamentTimes: { user: { id: userId } },
            },
        });
    }
}
