import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


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
        private readonly multilingualTextService: MultilingualtextService, 
        private readonly taskService: TaskService,
        private readonly userTournamentTimeService: UserTournamentTimeService    
    ) {}

    async create(createActionDto: ActionCreateDto): Promise<Action> {
        const { description, time, userTournamentTimeId, taskId } = createActionDto;
    
        const multilingualTextInstance = await this.multilingualTextService.create(description)
        const userTournamentTimeInstance = await this.userTournamentTimeService.findOneInstance(userTournamentTimeId);
        const taskInstance = await this.taskService.findOneInstance(taskId);

        const action = new Action();
        action.description = multilingualTextInstance;
        action.userTournamentTime = userTournamentTimeInstance;
        action.task = taskInstance;
        action.time = time;

        return this.actionRepository.save(action);
      }

}
