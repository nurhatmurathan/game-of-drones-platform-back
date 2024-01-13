import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { MultilingualtextService } from "../multilingualtext/multilingualtext.service";
import { Action } from "./action.entity";

@Injectable()
export class ActionAdminService {
    constructor(
        @InjectRepository(Action)
        private readonly actionRepository: Repository<Action>,
        private readonly multilingualTextService: MultilingualtextService
    ) { }

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
