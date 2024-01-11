import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Action } from "./action.entity";

@Injectable()
export class ActionAdminService {
    constructor(
        @InjectRepository(Action)
        private readonly actionRepository: Repository<Action>,
    ) { }

    async delete(id: number): Promise<any> {
        const instance = await this.actionRepository.findOne({ where: { id } });
        this.isExists(instance, id);

        await this.actionRepository.remove(instance);
    }

    private isExists(instance: Action, id: number): void {
        if (!instance)
            throw new NotFoundException(`Action with id ${id} not found`);
    }
}
