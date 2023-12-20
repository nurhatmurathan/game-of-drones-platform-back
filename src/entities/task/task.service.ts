import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { Task } from './task.entity';
import { TaskCreateDto } from './dto/task.create.dto';
import { TaskListDto } from './dto/task.list.dto';
import { TaskRetrieveDto } from './dto/task.retrieve.dto';
import { MultilingualtextService } from '../multilingualtext/multilingualtext.service';
import { ActionService } from '../action/action.service';
import { UserTournamentTimeService } from '../user.tournament.time/user.tournament.time.service';

@Injectable()
export class TaskService {
    constructor( 
        @InjectRepository(Task)
        private readonly taskReposotory: Repository<Task>,
        @Inject(forwardRef(() => ActionService))
        private readonly actionService: ActionService, 
        private readonly multilingualTextService: MultilingualtextService,
        private readonly userTournamentTimeService: UserTournamentTimeService
    ) {}

    async findAll(language: string): Promise<TaskListDto[]> {
        const taskList = await this.taskReposotory.find({
            relations: ['description', 'taskDescription']
        });

        const taskListDto = taskList.map((task) => {
            const description = task.description[language];
            const taskDescription = task.taskDescription[language];

            return {
                id: task.id,
                name: task.name,
                description: description,
                taskDescription: taskDescription 
            }
        });
        
        return taskListDto;
    }
    
    async findOne(id: number, userId: number, language: string): Promise<TaskRetrieveDto> {
        const taskInstance = await this.taskReposotory.findOne({
            where: { id: id },
            relations: ['description', 'taskDescription']
        });

        const listOfTournamentsIdsOfGivenUser = await this.userTournamentTimeService.getListOfTournamentsIdsOfGivenUser(userId);
        
        let doneCount = 0;
        if (taskInstance.inOneGame) 
            doneCount = await this.actionService.maxActionCountInOnOneTournament(taskInstance.id, listOfTournamentsIdsOfGivenUser); 
        else
            doneCount = await this.actionService.countActionsInAllTournaments(taskInstance.id, listOfTournamentsIdsOfGivenUser);
        
        const description = taskInstance.description[language];
        const taskDescription = taskInstance.taskDescription[language];

        return {
            id: taskInstance.id,
            name: taskInstance.name,
            description: description,
            taskDescription: taskDescription,
            maxCount: taskInstance.maxCount,
            doneCount: doneCount,
            reward: taskInstance.reward
        } 
    }

    async create(taskData: TaskCreateDto): Promise<TaskCreateDto> {
        const { description, taskDescription, ...task} = taskData

        const multilingualTextDescription = await this.multilingualTextService.create(description)
        const multilingualTexTaskDescription = await this.multilingualTextService.create(taskDescription)
        const newTask = this.taskReposotory.create({
            ...task,
            description: multilingualTextDescription,
            taskDescription: multilingualTexTaskDescription
            
        });

        return await this.taskReposotory.save(newTask); 
    }
    
    getInstance(id: number): Promise<Task> {
        return this.taskReposotory.findOne({where: {id: id}});
    }

}
