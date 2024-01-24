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
        @Inject(forwardRef(() => ActionService))
        private readonly actionService: ActionService,
        private readonly utilSevice: UtilService,
        private readonly userTournamentTimeService: UserTournamentTimeService
    ) { }

    async findAll(language: LanguagesEnum): Promise<TaskListDto[]> {
        const languageType = this.utilSevice.getLanguage(language);

        const instances = await this.taskRepository.find({
            relations: { taskDescription: true }
        });

        return instances.map((instance) => ({
            id: instance.id,
            name: instance.name,
            taskDescription: instance.taskDescription[languageType]
        }));
    }

    async findOne(
        id: number,
        userId: number,
        language: LanguagesEnum
    ): Promise<TaskRetrieveDto> {
        const languageType = this.utilSevice.getLanguage(language);

        console.log("Step 1");
        console.log(`id: ${id}, userId: ${userId}, language: ${languageType}`);

        const instance = await this.taskRepository.findOne({
            where: { id: id },
            relations: {
                description: true,
                taskDescription: true
            },
        });

        console.log("Step 2");
        console.log(instance);
        console.log(userId);

        const listOfUserTournamentTimesIdsOfGivenUser =
            await this.userTournamentTimeService
                .getListOfUserTournamentTimesIdsOfGivenUser(userId);

        console.log("Step 3");
        const doneCount = instance.inOneGame
            ? await this.actionService.maxActionCountInOneTournament(
                instance.id,
                listOfUserTournamentTimesIdsOfGivenUser
            )
            : await this.actionService.countActionsInAllTournaments(
                instance.id,
                listOfUserTournamentTimesIdsOfGivenUser
            );

        const retrieveDto = new TaskRetrieveDto();
        Object.assign(retrieveDto, instance);
        retrieveDto.doneCount = doneCount;
        retrieveDto.description = instance.description[languageType];
        retrieveDto.taskDescription = instance.taskDescription[languageType];

        return retrieveDto;
    }

    getInstance(id: number): Promise<Task> {
        return this.taskRepository.findOne({ where: { id: id } });
    }
}
