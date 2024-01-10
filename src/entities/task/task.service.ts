import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";


import { UtilService } from "src/utils/util.service";
import { LanguagesEnum } from "../../common/enums";
import { ActionService } from "../action/action.service";
import { MultilingualtextService } from "../multilingualtext/multilingualtext.service";
import { UserTournamentTimeService } from "../user.tournament.time/user.tournament.time.service";
import {
    TaskCreateDto,
    TaskListDto,
    TaskRetrieveDto
} from "./dto";
import { Task } from "./task.entity";

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private readonly taskReposotory: Repository<Task>,
        private readonly utilSevice: UtilService,
        @Inject(forwardRef(() => ActionService))
        private readonly actionService: ActionService,
        private readonly multilingualTextService: MultilingualtextService,
        private readonly userTournamentTimeService: UserTournamentTimeService
    ) { }

    async findAll(language: LanguagesEnum): Promise<TaskListDto[]> {
        const languageType = this.utilSevice.getLanguage(language);

        const taskList = await this.taskReposotory.find({
            relations: ['taskDescription']
        });

        const taskListDto = taskList.map((task) => {
            const taskDescription = task.taskDescription[languageType];
            return {
                id: task.id,
                name: task.name,
                taskDescription: taskDescription
            }
        });

        return taskListDto;
    }

    async findOne(
        id: number,
        userId: number,
        language: LanguagesEnum
    ): Promise<TaskRetrieveDto> {
        const languageType = this.utilSevice.getLanguage(language);

        const taskInstance = await this.taskReposotory.findOne({
            where: { id: id },
            relations: ["description", "taskDescription"],
        });

        const listOfTournamentsIdsOfGivenUser =
            await this.userTournamentTimeService.getListOfTournamentsIdsOfGivenUser(
                userId
            );

        let doneCount = 0;
        if (taskInstance.inOneGame)
            doneCount = await this.actionService.maxActionCountInOneTournament(taskInstance.id, listOfTournamentsIdsOfGivenUser);
        else
            doneCount = await this.actionService.countActionsInAllTournaments(
                taskInstance.id,
                listOfTournamentsIdsOfGivenUser
            );

        return {
            id: taskInstance.id,
            name: taskInstance.name,
            description: taskInstance.description[languageType],
            taskDescription: taskInstance.taskDescription[languageType],
            maxCount: taskInstance.maxCount,
            doneCount: doneCount,
            reward: taskInstance.reward,
        };
    }

    async create(taskData: TaskCreateDto): Promise<TaskCreateDto> {
        const { description, taskDescription, ...task } = taskData;

        const multilingualTextDescription =
            await this.multilingualTextService.create(description);
        const multilingualTexTaskDescription =
            await this.multilingualTextService.create(taskDescription);
        const newTask = this.taskReposotory.create({
            ...task,
            description: multilingualTextDescription,
            taskDescription: multilingualTexTaskDescription

        });

        return await this.taskReposotory.save(newTask);
    }

    getInstance(id: number): Promise<Task> {
        return this.taskReposotory.findOne({ where: { id: id } });
    }
}
