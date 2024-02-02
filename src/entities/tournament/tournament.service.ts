import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsRelations, MoreThan, Repository } from "typeorm";
import { UserTournamentTrainings } from "./../user.tournament.trainings/user.tournament.trainings.entity";

import { LanguagesEnum } from "src/common/enums";
import { UtilService } from "../../utils/util.service";
import { RouteService } from "../route/route.service";
import { TournamentTimeService } from "../tournament.time/tournament.time.service";
import { TrainingListDto } from "../training/dto";
import { TrainingService } from "../training/training.service";
import { UserTournamentTrainingsService } from "../user.tournament.trainings/user.tournament.trainings.service";
import { TournamentListDto, TournamentRetrieveDto } from "./dto";
import { Tournament } from "./tournament.entity";

@Injectable()
export class TournamentService {
    constructor(
        @InjectRepository(Tournament)
        private readonly tournamentRepository: Repository<Tournament>,
        private readonly tournamentTimeService: TournamentTimeService,
        private readonly routeService: RouteService,
        private readonly utilService: UtilService,
        private readonly trainingService: TrainingService,
        private readonly userTournamentTrainingsService: UserTournamentTrainingsService
    ) { }

    async findOneById(id: number, relations?: FindOptionsRelations<Tournament>): Promise<Tournament> {
        return await this.tournamentRepository.findOne({ where: { id }, relations });
    }

    async findOne(id: number, language: LanguagesEnum, userId: number): Promise<TournamentRetrieveDto> {
        const languageType = this.utilService.getLanguage(language);

        const instance = await this.tournamentRepository.findOne({
            where: { id },
            relations: {
                route: true,
                description: true,
            },
        });

        return this.mapTournamentToRetrieveDto(instance, userId, language, languageType);
    }

    async findAll(language: LanguagesEnum): Promise<TournamentListDto[]> {
        const languageType = this.utilService.getLanguage(language);

        const tournaments = await this.tournamentRepository.find({
            where: {
                tournamentTimes: { startTime: MoreThan(Date.now()) },
            },
            relations: {
                route: true,
                coverDescription: true,
                tournamentTimes: true,
            },
        });

        const tournamentListDtos = await Promise.all(
            tournaments.map(async (tournament) => {
                const nearestTournamentTime = tournament.tournamentTimes
                    .filter((tournamentTime) => tournamentTime.startTime > Date.now())
                    .sort((a, b) => a.startTime - b.startTime)[0];

                const dto = await this.mapTournamentToListDto(tournament, language, languageType);

                dto.startDate = nearestTournamentTime
                    ? nearestTournamentTime.startTime
                    : tournament.startDate;

                return dto;
            })
        );

        console.log("Exit from service");
        return tournamentListDtos;
    }

    async registerUserToTournament(userId: number, id: number) {
        const instance: Tournament = await this.tournamentRepository.findOne({
            where: { id },
            relations: { tournamentTimes: { userTournamentTimes: true } },
        });
        await this.userTournamentTrainingsService.create(userId, id);
        return await this.tournamentTimeService.getOrCreateTournamentTime(userId, instance);
    }

    private async mapTournamentToListDto(
        tournament: Tournament,
        language: LanguagesEnum,
        languageType: string
    ): Promise<TournamentListDto> {
        const tournamentDto = new TournamentListDto();
        tournamentDto.id = tournament.id;
        tournamentDto.name = tournament.name;
        tournamentDto.description = tournament.coverDescription[languageType];
        tournamentDto.startDate = tournament.startDate;
        tournamentDto.price = tournament.price;

        if (tournament.route)
            tournamentDto.route = await this.routeService.findOne(tournament.route.id, language);

        return tournamentDto;
    }

    private async mapTournamentToRetrieveDto(
        tournament: Tournament,
        userId: number,
        language: LanguagesEnum,
        languageType: string
    ): Promise<TournamentRetrieveDto> {
        const tournamentDto = new TournamentRetrieveDto();
        tournamentDto.id = tournament.id;
        tournamentDto.name = tournament.name;
        tournamentDto.description = tournament.description[languageType];
        tournamentDto.startDate = tournament.startDate;
        tournamentDto.price = tournament.price;

        if (tournament.route)
            tournamentDto.route = await this.routeService.findOne(tournament.route.id, language);

        tournamentDto.tournamentTimes = await this.tournamentTimeService.findAllByTournamentId(
            tournament.id,
            userId
        );
        tournamentDto.trainings = await this.findTrainings(tournament, userId);

        return tournamentDto;
    }

    private async findTrainings(
        instance: Tournament,
        userId: number
    ): Promise<{ status: string; trainingTimes: TrainingListDto[] }> {
        const userTournament: UserTournamentTrainings = await this.userTournamentTrainingsService.findOne(
            userId,
            instance.id,
            { training: true }
        );

        if (!userTournament)
            return {
                status: "NotRegistered",
                trainingTimes: []
            };

        if (!userTournament.training)
            return {
                status: "NotChoosenTraining",
                trainingTimes: await this.trainingService.getAvailableTrainings(instance),
            };

        return {
            status: "ChoosenTraining",
            trainingTimes: [await this.trainingService.retrieveTraining(userTournament?.training, instance)]
        };
    }
}
