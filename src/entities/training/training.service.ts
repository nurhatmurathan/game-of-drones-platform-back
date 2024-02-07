import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LessThan, Repository } from "typeorm";
import { Tournament } from "../tournament/tournament.entity";
import { UserTournamentTrainings } from "../user.tournament.trainings/user.tournament.trainings.entity";
import { UserTournamentTrainingsService } from "../user.tournament.trainings/user.tournament.trainings.service";
import { TrainingListDto } from "./dto";
import { Training } from "./training.entity";

@Injectable()
export class TrainingService {
    constructor(
        @InjectRepository(Training)
        private readonly trainingRepository: Repository<Training>,
        private readonly userTournamentTrainingsService: UserTournamentTrainingsService
    ) {}

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
            instances.map((instance) => this.retrieveTraining(instance, tournamentInstance))
        );

        return trainingListDtoArray;
    }

    async retrieveTraining(instance: Training, tournamentInstance: Tournament): Promise<TrainingListDto> {
        console.log("Step 1 in findTrainings");
        return {
            id: instance.id,
            startTime: instance.startTime,
            places: instance.places,
            reserved: await this.userTournamentTrainingsService.countReservedPlaces(
                instance.id,
                tournamentInstance.id
            ),
        };
    }

    async userTrainings(userId: number) {
        return await this.trainingRepository.find({
            where: {
                userTournamentTimes: { user: { id: userId } },
            },
        });
    }

    async trainingStartedAndExistsValidator(userId: number, id: number, tournamentId: number): Promise<any> {
        const userTournament: UserTournamentTrainings = await this.userTournamentTrainingsService.findOne(
            userId,
            tournamentId,
            { training: true }
        );
        const instance = await this.trainingRepository.findOne({ where: { id } });

        if (!instance) throw new BadRequestException("No training by this ID");
        else if (!userTournament)
            throw new BadRequestException(`This user is not selected tournament ${tournamentId}`);
        else if (userTournament.training.id !== instance.id) {
            throw new BadRequestException("The training is not selected");
        }

        this.isTrainingStarted(instance);

        return { startTime: instance.startTime };
    }

    isTrainingStarted(instance: Training): any {
        const timeInMilliseconds = Date.now() - instance.startTime;
        const accessTimeToTrainingInMilliseconds = 10 * 60 * 1000;

        if (timeInMilliseconds < -1 * 1000 * 60 * 5)
            throw new BadRequestException("The training hasn't started yet.");
        else if (timeInMilliseconds > accessTimeToTrainingInMilliseconds)
            throw new BadRequestException("The training has already ended");
    }
}
