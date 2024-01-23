import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";

import { Action } from "./action.entity";

@Injectable()
export class ActionService {
    constructor(
        @InjectRepository(Action)
        private readonly actionRepository: Repository<Action>,
    ) { }


    countActionsInAllTournaments(
        taskId: number,
        listOfTournamentsIdsOfGivenUser: number[]
    ): Promise<number> {
        const count = this.actionRepository.count({
            where: {
                task: { id: taskId },
                userTournamentTime: { id: In(listOfTournamentsIdsOfGivenUser) },
            },
        });

        return count;
    }

    async maxActionCountInOneTournament(taskId: number, listOfTournamentsIdsOfGivenUser: number[]): Promise<number> {
        const counts = await this.actionRepository.createQueryBuilder('action')
            .select('action.userTournamentTimeId', 'tournamentTimeId')
            .addSelect('COUNT(action.id)', 'count')
            .where('action.taskId = :taskId', { taskId: taskId })
            .andWhere('action.userTournamentTimeId IN (:...tournamentTimeIds)', { tournamentTimeIds: listOfTournamentsIdsOfGivenUser })
            .groupBy('action.userTournamentTimeId')
            .getRawMany();

        return counts.reduce(
            (max, current) => Math.max(max, parseInt(current.count)), 0);
    }
}
