import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserCoverDto } from "../user/dto";
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

    async tournamentTimeUsers(tournamentTimeId: number): Promise<UserTournamentTime[]> {
        return await this.userTournamentTimeRepository.find({
            where: { tournamentTime: { id: tournamentTimeId } },
            relations: { user: true },
        });
    }

    async updateTournamentTimeUsers(
        tournamentTimeId: number,
        users: UserCoverDto[]
    ): Promise<UserTournamentTime[]> {
        const existingInstances: UserTournamentTime[] = await this.tournamentTimeUsers(tournamentTimeId);
        const existingUserIds: Set<number> = new Set(existingInstances.map((utt) => utt.user.id));

        const usersToAdd: UserCoverDto[] = users.filter((user) => !existingUserIds.has(user.id));
        const usersToRemove: UserTournamentTime[] = existingInstances.filter(
            (utt) => !users.some((user) => user.id === utt.user.id)
        );

        await this.createTournamentTimeUsers(tournamentTimeId, usersToAdd);

        await this.removeBatch(usersToRemove);

        return await this.tournamentTimeUsers(tournamentTimeId);
    }
}
