import { UserFutureTournamnetDto } from "./dto/user.tournament.time.future.dto";
import { Injectable } from "@nestjs/common";
import { UserTournamentTime } from "./user.tournament.time.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UserTournamentTimeService {
    constructor(
        @InjectRepository(UserTournamentTime)
        private usertournamenttimeRepository: Repository<UserTournamentTime>
    ) {}

    async userTournamentTimes(
        userId: number
    ): Promise<UserFutureTournamnetDto[]> {
        const userTournamentTimes =
            await this.usertournamenttimeRepository.find({
                where: { user: { id: userId } },
                relations: ["tournamentTime", "tournamentTime.tournament"],
            });

        return await Promise.all(
            userTournamentTimes.map(async (userTournamentTime) =>
                this.mapUserTournamentTime(userTournamentTime)
            )
        );
    }

    private mapUserTournamentTime(
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
    // async futureTournamentTimes
}
