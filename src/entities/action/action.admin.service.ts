import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { MultilingualtextService } from "../multilingualtext/multilingualtext.service";
import { Task } from "../task/task.entity";
import { UserTournamentTimeService } from "../user.tournament.time/user.tournament.time.service";
import { Action } from "./action.entity";
import { ActionAdminCreateDto } from "./dto";

@Injectable()
export class ActionAdminService {
    constructor(
        @InjectRepository(Action)
        private readonly actionRepository: Repository<Action>,
        private readonly multilingualTextService: MultilingualtextService,
        private readonly userTournamentTimeService: UserTournamentTimeService
    ) { }

    async create(createActionDto: ActionAdminCreateDto, taskInstance: Task): Promise<Action> {
        const { description, time, userTournamentTimeId } = createActionDto;

        const multilingualDescriptionInstance =
            await this.multilingualTextService.create(description)

        const userTournamentTimeInstance =
            await this.userTournamentTimeService.getInstance(userTournamentTimeId);
        const newAction = this.actionRepository.create({
            time: time,
            task: taskInstance,
            description: multilingualDescriptionInstance,
            userTournamentTime: userTournamentTimeInstance,
        });

        return this.actionRepository.save(newAction);
    }

    async delete(id: number): Promise<any> {
        const instance = await this.actionRepository.findOne({
            where: { id },
            relations: {
                description: true
            }
        });
        this.isExists(instance, id);

        const descriptionId = instance.description.id
        await this.actionRepository.remove(instance);
        await this.multilingualTextService.delete(descriptionId);

        return { "message": "OK!" }
    }

    private isExists(instance: Action, id: number): void {
        if (!instance)
            throw new NotFoundException(`Action with id ${id} not found`);
    }
}
