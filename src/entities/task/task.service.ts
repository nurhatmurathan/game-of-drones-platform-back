import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";


import { UtilService } from "src/utils/util.service";
import { LanguagesEnum } from "../../common/enums";
import { ActionService } from "../action/action.service";
import { UserTournamentTimeService } from "../user.tournament.time/user.tournament.time.service";
import {
    TaskListDto,
    TaskRetrieveDto
} from "./dto";
import { Task } from "./task.entity";


@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
        private readonly utilSevice: UtilService,
        @Inject(forwardRef(() => ActionService))
        private readonly actionService: ActionService,
        private readonly userTournamentTimeService: UserTournamentTimeService
    ) { }

    async findAll(language: LanguagesEnum): Promise<TaskListDto[]> {
        const languageType = this.utilSevice.getLanguage(language);

        const taskList = await this.taskRepository.find({
            relations: { taskDescription: true }
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

        const taskInstance = await this.taskRepository.findOne({
            where: { id: id },
            relations: {
                description: true,
                taskDescription: true
            },
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

    getInstance(id: number): Promise<Task> {
        return this.taskRepository.findOne({ where: { id: id } });
    }
}
