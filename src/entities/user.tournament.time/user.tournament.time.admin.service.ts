import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { UserCoverDto } from "../user/dto";
import { TournamentTimeUsersDto } from "./dto";
import { UserTournamentTime } from "./user.tournament.time.entity";

@Injectable()
export class UserTournamentTimeAdminService {
    constructor(
        @InjectRepository(UserTournamentTime)
        private readonly userTournamentTimeRepository: Repository<UserTournamentTime>
    ) {}

    async create(userId: number, tournamentTimeId: number): Promise<UserTournamentTime> {
        const instance: UserTournamentTime = this.userTournamentTimeRepository.create({
            user: { id: userId },
            tournamentTime: { id: tournamentTimeId },
        });

        return await this.userTournamentTimeRepository.save(instance);
    }

    async createTournamentTimeUsers(
        tournamentTimeId: number,
        users: UserCoverDto[]
    ): Promise<UserTournamentTime[]> {
        const instances = users.map((user) =>
            this.userTournamentTimeRepository.create({
                user: { id: user.id },
                tournamentTime: { id: tournamentTimeId },
            })
        );

        return await this.userTournamentTimeRepository.save(instances);
    }

    async removeBatch(userTournamentTimes: UserTournamentTime[]) {
        return await this.userTournamentTimeRepository.remove(userTournamentTimes);
    }

    async removeTournamentTimeUsers(tournamentTimeId: number, usersIds: Set<number>) {
        return await this.userTournamentTimeRepository.delete({
            tournamentTime: { id: tournamentTimeId },
            user: { id: In(Array.from(usersIds)) },
        });
    }

    async tournamentTimeUsers(tournamentTimeId: number): Promise<UserTournamentTime[]> {
        return await this.userTournamentTimeRepository.find({
            where: { tournamentTime: { id: tournamentTimeId } },
            relations: { user: true },
        });
    }

    async updateTournamentTimeUsers(
        tournamentTimeId: number,
        users: TournamentTimeUsersDto[]
    ): Promise<UserTournamentTime[]> {
        const existingInstances: UserTournamentTime[] = await this.tournamentTimeUsers(tournamentTimeId);
        const existingUserIds: Set<number> = new Set(existingInstances.map((utt) => utt.user.id));

        const usersToAdd: UserCoverDto[] = users.filter((user) => !existingUserIds.delete(user.id));

        await this.removeTournamentTimeUsers(tournamentTimeId, existingUserIds);
        await this.createTournamentTimeUsers(tournamentTimeId, usersToAdd);

        return await this.tournamentTimeUsers(tournamentTimeId);
    }
}
