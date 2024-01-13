import {
    ConflictException,
    Injectable,
    NotFoundException
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsRelations, LessThan, MoreThan, Repository } from "typeorm";
import { Training } from "./../training/training.entity";
import { UserFutureTournamnetTimeDto } from "./dto";
import { UserTournamentTime } from "./user.tournament.time.entity";

import { UtilService } from "src/utils/util.service";
import { LanguagesEnum } from "../../common/enums";
import { TournamentTimeService } from "../tournament.time/tournament.time.service";

@Injectable()
export class UserTournamentTimeService {
    constructor(
        @InjectRepository(UserTournamentTime)
        private readonly userTournamentTimeRepository: Repository<UserTournamentTime>,
        private readonly tournamentTimeService: TournamentTimeService,
        private readonly utilService: UtilService
    ) { }

    async create(
        userId: number,
        tournamentTimeId: number
    ): Promise<{
        userId: number;
        tournamentTimeId: number;
        reservedPlaces: number;
    }> {
        const reserved =
            await this.tournamentTimeService.reservePlaceInTheTournament(
                tournamentTimeId,
                userId
            );

        try {
            await this.userTournamentTimeRepository.manager.transaction(
                async (entityManager) => {
                    await entityManager.save(UserTournamentTime, {
                        user: { id: userId },
                        tournamentTime: { id: tournamentTimeId },
                    });
                }
            );

            return {
                userId,
                tournamentTimeId,
                reservedPlaces: reserved,
            };
        } catch (error) {
            if (error.code === "23505") {
                throw new ConflictException(
                    "This user is already registered for this tournament time."
                );
            }
            throw error;
        }
    }

    async userFutureTournamentTimes(
        language: LanguagesEnum,
        userId: number
    ): Promise<UserFutureTournamnetTimeDto[]> {
        const languageType = this.utilService.getLanguage(language);

        return await Promise.all(
            (await this.userTournamentTimes(userId, false)).map(
                async (userTournamentTime) =>
                    this.mapUserFutureTournamentTime(
                        userTournamentTime,
                        languageType
                    )
            )
        );
    }

    async userPastedTournamentTimes(
        language: LanguagesEnum,
        userId: number
    ) {
        const languageType = this.utilService.getLanguage(language);

        return await Promise.all(
            (await this.userTournamentTimes(userId, true)).map(
                async (userTournamentTime) =>
                    this.mapUserPastedTournamentTime(
                        userTournamentTime,
                        languageType
                    )
            )
        );
    }

    async userTournamentTimes(
        userId: number,
        pasted: boolean
    ): Promise<UserTournamentTime[]> {
        const currentDate: number = Date.now();

        return await this.userTournamentTimeRepository.find({
            where: {
                user: { id: userId },
                tournamentTime: {
                    startTime: pasted
                        ? LessThan(currentDate)
                        : MoreThan(currentDate),
                },
            },
            relations: [
                "tournamentTime",
                "tournamentTime.tournament",
                "tournamentTime.tournament.description",
            ],
        });
    }

    private mapUserFutureTournamentTime(
        userTournamentTime: UserTournamentTime,
        languageType: string
    ): UserFutureTournamnetTimeDto {
        return {
            id: userTournamentTime.id,
            tournamentTime: {
                id: userTournamentTime.tournamentTime.id,
                startTime: userTournamentTime.tournamentTime.startTime,
                tournament: {
                    id: userTournamentTime.tournamentTime.tournament.id,
                    name: userTournamentTime.tournamentTime.tournament.name,
                    description:
                        userTournamentTime.tournamentTime.tournament
                            .description[languageType],
                    startDate:
                        userTournamentTime.tournamentTime.tournament.startDate,
                },
            },
        };
    }

    private mapUserPastedTournamentTime(
        userTournamentTime: UserTournamentTime,
        languageType: string
    ) {
        return {
            id: userTournamentTime.id,
            place: userTournamentTime.place,
            tournamentTime: {
                id: userTournamentTime.tournamentTime.id,
                startTime: userTournamentTime.tournamentTime.startTime,
                tournament: {
                    id: userTournamentTime.tournamentTime.tournament.id,
                    name: userTournamentTime.tournamentTime.tournament.name,
                    description:
                        userTournamentTime.tournamentTime.tournament
                            .description[languageType],
                    startDate:
                        userTournamentTime.tournamentTime.tournament.startDate,
                },
            },
        };
    }

    async addTraining(
        userId: number,
        tournamentTimeId: number,
        trainingId: number
    ) {
        const instance: UserTournamentTime =
            await this.getInstanceByUserIdtournamentTimeId(
                userId,
                tournamentTimeId,
                {
                    trainings: true,
                }
            );

        instance.trainings = [
            ...instance.trainings,
            { id: trainingId } as Training,
        ];

        console.log(instance);

        this.userTournamentTimeRepository.save(instance);

        return { message: "Training is added" };
    }

    async getInstance(id: number): Promise<UserTournamentTime> {
        return await this.userTournamentTimeRepository.findOne({
            where: { id: id },
        });
    }

    async getInstanceByUserIdtournamentTimeId(
        userId: number,
        tournamentTimeId: number,
        relations?: FindOptionsRelations<UserTournamentTime>
    ): Promise<UserTournamentTime> {
        const instance: UserTournamentTime =
            await this.userTournamentTimeRepository.findOne({
                where: {
                    user: { id: userId },
                    tournamentTime: { id: tournamentTimeId },
                },

                relations: relations,
            });

        if (!instance)
            throw new NotFoundException(
                "This User does not added this TournamentTime!"
            );

        return instance;
    }

    async getListOfTournamentsIdsOfGivenUser(
        userId: number
    ): Promise<number[]> {
        const userTournamentTimes =
            await this.userTournamentTimeRepository.find({
                where: { user: { id: userId } },
                relations: {
                    tournamentTime: true
                }
            });

        console.log(userTournamentTimes);
        return userTournamentTimes.map(
            (userTournamentTime) => userTournamentTime.tournamentTime.id
        );
    }
}
