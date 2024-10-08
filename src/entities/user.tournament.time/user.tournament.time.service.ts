import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsRelations, LessThan, MoreThan, Repository } from "typeorm";
import { UtilService } from "./../../utils/util.service";
import { Training } from "./../training/training.entity";
import { UserFutureTournamnetTimeDto } from "./dto";
import { UserTournamentTime } from "./user.tournament.time.entity";

import { LanguagesEnum } from "../../common/enums";

@Injectable()
export class UserTournamentTimeService {
    constructor(
        @InjectRepository(UserTournamentTime)
        private readonly userTournamentTimeRepository: Repository<UserTournamentTime>,
        private readonly utilService: UtilService
    ) { }

    async registerUserToTournamentTime(userId: number, tournamentTimeId: number) {
        try {
            await this.userTournamentTimeRepository.manager.transaction(async (entityManager) => {
                await entityManager.save(UserTournamentTime, {
                    user: { id: userId },
                    tournamentTime: { id: tournamentTimeId },
                });
            });
        } catch (error) {
            console.log(userId);
            console.log(tournamentTimeId);
            if (error.code === "23505")
                throw new ConflictException("This user is already registered for this tournament time.");
            throw error;
        }
    }

    // async registerUserToTournament(userId: number, tournamentId: number) {
    //     const tournamentTime: TournamentTime =
    //         await this.tournamentTimeService.getOrCreateTournamentTime(tournamentId);

    //     return await this.registerUserToTournamentTime(userId, tournamentTime.id);
    // }

    async countReservedPlaces(tournamentTimeId: number): Promise<number> {
        console.log(tournamentTimeId);
        return await this.userTournamentTimeRepository.count({
            where: { tournamentTime: { id: tournamentTimeId } },
        });
    }

    async findOne(userId: number, tournamentTimeId: number): Promise<UserTournamentTime> {
        const instance: UserTournamentTime = await this.userTournamentTimeRepository.findOne({
            where: {
                user: { id: userId },
                tournamentTime: { id: tournamentTimeId },
            },
        });

        return instance;
    }

    async userFutureTournamentTimes(
        language: LanguagesEnum,
        userId: number
    ): Promise<UserFutureTournamnetTimeDto[]> {
        const languageType = this.utilService.getLanguage(language);

        return await Promise.all(
            (await this.userTournamentTimes(userId, false)).map(async (userTournamentTime) =>
                this.mapUserFutureTournamentTime(userTournamentTime, languageType)
            )
        );
    }

    async userPastedTournamentTimes(language: LanguagesEnum, userId: number) {
        const languageType = this.utilService.getLanguage(language);

        return await Promise.all(
            (await this.userTournamentTimes(userId, true)).map(async (userTournamentTime) =>
                this.mapUserPastedTournamentTime(userTournamentTime, languageType)
            )
        );
    }

    async userTournamentTimes(userId: number, pasted: boolean): Promise<UserTournamentTime[]> {
        const currentDate: number = Date.now();

        return await this.userTournamentTimeRepository.find({
            where: {
                user: { id: userId },
                tournamentTime: {
                    startTime: pasted ? LessThan(currentDate) : MoreThan(currentDate),
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
                    description: userTournamentTime.tournamentTime.tournament.description[languageType],
                    startDate: userTournamentTime.tournamentTime.tournament.startDate,
                },
            },
        };
    }

    private mapUserPastedTournamentTime(userTournamentTime: UserTournamentTime, languageType: string) {
        console.log(userTournamentTime);
        return {
            id: userTournamentTime.id,
            place: userTournamentTime.place,
            tournamentTime: {
                id: userTournamentTime.tournamentTime.id,
                startTime: userTournamentTime.tournamentTime.startTime,
                tournament: {
                    id: userTournamentTime.tournamentTime.tournament?.id,
                    name: userTournamentTime.tournamentTime.tournament?.name,
                    description: userTournamentTime.tournamentTime.tournament?.description[languageType],
                    startDate: userTournamentTime.tournamentTime.tournament?.startDate,
                },
            },
        };
    }

    async addTraining(userId: number, tournamentTimeId: number, trainingId: number) {
        const instance: UserTournamentTime = await this.getInstanceByUserIdAndtournamentTimeId(
            userId,
            tournamentTimeId,
            {
                trainings: true,
            }
        );

        instance.trainings = [...instance.trainings, { id: trainingId } as Training];

        console.log(instance);

        this.userTournamentTimeRepository.save(instance);

        return { message: "Training is added" };
    }

    async getInstance(id: number): Promise<UserTournamentTime> {
        return await this.userTournamentTimeRepository.findOne({
            where: { id: id },
        });
    }

    async getInstanceByUserIdAndtournamentTimeId(
        userId: number,
        tournamentTimeId: number,
        relations?: FindOptionsRelations<UserTournamentTime>
    ): Promise<UserTournamentTime> {
        const instance: UserTournamentTime = await this.userTournamentTimeRepository.findOne({
            where: {
                user: { id: userId },
                tournamentTime: { id: tournamentTimeId },
            },

            relations: relations,
        });

        if (!instance) throw new NotFoundException("This User does not added this TournamentTime!");

        return instance;
    }

    async getListOfUserTournamentTimesIdsOfGivenUser(userId: number): Promise<number[]> {
        const userTournamentTimes = await this.userTournamentTimeRepository.find({
            where: { user: { id: userId } },
            relations: {
                tournamentTime: true,
            },
        });

        console.log(userTournamentTimes);
        return userTournamentTimes.map((userTournamentTime) => userTournamentTime.id);
    }

    async isSelectedTournamentTime(userId: number, tournamentTimeId: number): Promise<boolean> {
        const instance: UserTournamentTime = await this.findOne(userId, tournamentTimeId);

        return this.isExist(instance);
    }

    isExist(instance: UserTournamentTime): boolean {
        if (instance) return true;
        return false;
    }
}
