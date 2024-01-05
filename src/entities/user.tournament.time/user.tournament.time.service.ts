import { UserFutureTournamnetTimeDto } from "./dto/user.tournament.time.future.dto";
import {
    BadRequestException,
    ConflictException,
    HttpStatus,
    Injectable,
    NotFoundException,
    Req,
} from "@nestjs/common";
import { UserTournamentTime } from "./user.tournament.time.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { LessThan, MoreThan, Repository } from "typeorm";
import { User } from "../user/user.entity";

import { TournamentTimeService } from "../tournament.time/tournament.time.service";
import { TournamentTime } from "../tournament.time/tournament.time.entity";
import { UtilModule } from "src/utils/util.module";
import { UtilService } from "src/utils/util.service";

@Injectable()
export class UserTournamentTimeService {
    constructor(
        @InjectRepository(UserTournamentTime)
        private readonly userTournamentTimeRepository: Repository<UserTournamentTime>,
        private readonly tournamentTimeService: TournamentTimeService,
        private readonly utilService: UtilService
    ) {}

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
        @Req() request
    ): Promise<UserFutureTournamnetTimeDto[]> {
        const language = this.utilService.getLanguageFromHeaders(request);

        return await Promise.all(
            (await this.userTournamentTimes(request.user.sub, false)).map(
                async (userTournamentTime) =>
                    this.mapUserFutureTournamentTime(
                        userTournamentTime,
                        language
                    )
            )
        );
    }

    async userPastedTournamentTimes(@Req() request) {
        const language = this.utilService.getLanguageFromHeaders(request);

        return await Promise.all(
            (await this.userTournamentTimes(request.user.sub, true)).map(
                async (userTournamentTime) =>
                    this.mapUserPastedTournamentTime(
                        userTournamentTime,
                        language
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
        language: string
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
                            .description[language],
                    startDate:
                        userTournamentTime.tournamentTime.tournament.startDate,
                },
            },
        };
    }

    private mapUserPastedTournamentTime(
        userTournamentTime: UserTournamentTime,
        language: string
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
                            .description[language],
                    startDate:
                        userTournamentTime.tournamentTime.tournament.startDate,
                },
            },
        };
    }

    getInstance(id: number): Promise<UserTournamentTime> {
        return this.userTournamentTimeRepository.findOne({ where: { id: id } });
    }

    async getListOfTournamentsIdsOfGivenUser(
        userId: number
    ): Promise<number[]> {
        const userTournamentTimes =
            await this.userTournamentTimeRepository.find({
                where: { user: { id: userId } },
            });

        return userTournamentTimes.map(
            (userTournamentTime) => userTournamentTime.tournamentTime.id
        );
    }
}
