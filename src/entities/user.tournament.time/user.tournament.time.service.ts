import { UserFutureTournamnetDto } from "./dto/user.tournament.time.future.dto";
import { Injectable } from "@nestjs/common";
import { UserTournamentTime } from "./user.tournament.time.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { LessThan, MoreThan, Repository } from "typeorm";
import { User } from "../user/user.entity";
import { TournamentTime } from "../tournament.time/tournament.time.entity";

@Injectable()
export class UserTournamentTimeService {
    constructor(
        @InjectRepository(UserTournamentTime)
        private userTournamentTimeRepository: Repository<UserTournamentTime>
    ) {}

    async userFutureTournamentTimes(
        userId: number
    ): Promise<UserFutureTournamnetDto[]> {
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
                    tournament: {
                        startDate: pasted
                            ? LessThan(currentDate)
                            : MoreThan(currentDate),
                    },
                },
            },
            relations: ["tournamentTime", "tournamentTime.tournament"],
        });
    }


    // create(tournamentTime: TournamentTime, )

    private mapUserFutureTournamentTime(
        userTournamentTime: UserTournamentTime
    ): UserFutureTournamnetDto {
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

    create(userInstance: User, tournamentTimeInstance: TournamentTime): Promise<UserTournamentTime> {
        const userTournamentTimeInstance = this.userTournamentTimeRepository.create({
           user: userInstance,
           tournamentTime: tournamentTimeInstance 
        });

        return this.userTournamentTimeRepository.save(userTournamentTimeInstance);
    }
}
