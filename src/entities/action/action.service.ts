import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';


import { Action } from './action.entity';
import { ActionCreateDto } from './dto/action.create.dto';
import { MultilingualtextService } from '../multilingualtext/multilingualtext.service';
import { TaskService } from '../task/task.service'; 
import { UserTournamentTimeService } from '../user.tournament.time/user.tournament.time.service'; 

@Injectable()
export class ActionService {
    constructor( 
        @InjectRepository(Action)
        private readonly actionRepository: Repository<Action>,
        @Inject(forwardRef((() => TaskService)))
        private readonly taskService: TaskService,
        private readonly multilingualTextService: MultilingualtextService, 
        private readonly userTournamentTimeService: UserTournamentTimeService    
    ) {}

    async create(createActionDto: ActionCreateDto): Promise<Action> {
        const { description, time, userTournamentTimeId, taskId } = createActionDto;
    
        const multilingualTextInstance = await this.multilingualTextService.create(description)
        const userTournamentTimeInstance = await this.userTournamentTimeService.getInstance(userTournamentTimeId);
        const taskInstance = await this.taskService.getInstance(taskId);

        const action = new Action();
        action.description = multilingualTextInstance;
        action.userTournamentTime = userTournamentTimeInstance;
        action.task = taskInstance;
        action.time = time;

        return this.actionRepository.save(action);
      }


    countActionsInAllTournaments(taskId: number, listOfTournamentsIdsOfGivenUser: number[]): Promise<number> {
        const count = this.actionRepository.count({
            where: {
                task: { id: taskId },
                userTournamentTime: { id: In(listOfTournamentsIdsOfGivenUser) }
            }
        });

        return count;
    }

    async maxActionCountInOnOneTournament(taskId: number, listOfTournamentsIdsOfGivenUser: number[]): Promise<number> {
        const counts = await this.actionRepository.createQueryBuilder('action')
            .select('action.userTournamentTimeId', 'tournamentTimeId')
            .addSelect('COUNT(action.id)', 'count')
            .where('action.taskId = :taskId', { taskId: taskId })
            .andWhere('action.userTournamentTimeId IN (:...tournamentTimeIds)', { tournamentTimeIds: listOfTournamentsIdsOfGivenUser })
            .groupBy('action.userTournamentTimeId')
            .getRawMany();

        return counts.reduce((max, current) => Math.max(max, parseInt(current.count)), 0);
    }

}
