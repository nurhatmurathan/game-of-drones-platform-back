import { UserFutureTournamnetTimeDto } from "./dto/user.tournament.time.future.dto";
import {
    BadRequestException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { UserTournamentTime } from "./user.tournament.time.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { LessThan, MoreThan, Repository } from "typeorm";
import { TournamentTimeService } from "../tournament.time/tournament.time.service";

@Injectable()
export class UserTournamentTimeService {
    constructor(
        @InjectRepository(UserTournamentTime)
        private readonly userTournamentTimeRepository: Repository<UserTournamentTime>,
        private readonly tournamentTimeService: TournamentTimeService
    ) {}

    async create(userId: number, tournamentTimeId: number) {
        const tournamentTimeInstance =
            await this.tournamentTimeService.findOne(tournamentTimeId);

        if (!tournamentTimeInstance) {
            throw new NotFoundException(
                `TournamentTime with ID ${tournamentTimeId} not found.`
            );
        }

        if (tournamentTimeInstance.places <= tournamentTimeInstance.reserved) {
            throw new BadRequestException("No available places.");
        }

        tournamentTimeInstance.reserved++;

        await this.userTournamentTimeRepository.manager.transaction(
            async (entityManager) => {
                await entityManager.save(tournamentTimeInstance);
                await entityManager.save(UserTournamentTime, {
                    user: { id: userId },
                    tournamentTime: { id: tournamentTimeId },
                });
            }
        );

        return {
            userId,
            tournamentTimeId,
            reservedPlaces: tournamentTimeInstance.reserved,
        };
    }

    async userFutureTournamentTimes(
        userId: number
    ): Promise<UserFutureTournamnetTimeDto[]> {
        return await Promise.all(
            (await this.userTournamentTimes(userId, false)).map(
                async (userTournamentTime) =>
                    this.mapUserFutureTournamentTime(userTournamentTime)
            )
        );
    }

    async userPastedTournamentTimes(userId: number) {
        return await Promise.all(
            (await this.userTournamentTimes(userId, true)).map(
                async (userTournamentTime) =>
                    this.mapUserPastedTournamentTime(userTournamentTime)
            )
        );
    }

    async userTournamentTimes(
        userId: number,
        pasted: boolean
    ): Promise<UserTournamentTime[]> {
        const currentDate = new Date();

        return await this.userTournamentTimeRepository.find({
            where: {
                user: { id: userId },
                tournamentTime: {
                    startTime: pasted
                        ? LessThan(currentDate)
                        : MoreThan(currentDate),
                },
            },
            relations: ["tournamentTime", "tournamentTime.tournament"],
        });
    }

    private mapUserFutureTournamentTime(
        userTournamentTime: UserTournamentTime
    ): UserFutureTournamnetTimeDto {
        return {
            id: userTournamentTime.id,
            tournamentTime: {
                id: userTournamentTime.tournamentTime.id,
                startTime: userTournamentTime.tournamentTime.startTime,
                tournament: {
                    id: userTournamentTime.tournamentTime.tournament.id,
                    name: userTournamentTime.tournamentTime.tournament.name,
                    startDate:
                        userTournamentTime.tournamentTime.tournament.startDate,
                },
            },
        };
    }

    private mapUserPastedTournamentTime(
        userTournamentTime: UserTournamentTime
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
