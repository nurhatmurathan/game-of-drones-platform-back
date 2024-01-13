import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsRelations, Repository } from "typeorm";
import { Dron } from "./dron.entity";

@Injectable()
export class DronService {
    constructor(
        @InjectRepository(Dron)
        private readonly dronRepository: Repository<Dron>
    ) {}

    async findAll(): Promise<Dron[]> {
        return this.dronRepository.find();
    }

    async findOne(
        id: string,
        relations?: FindOptionsRelations<Dron>
    ): Promise<Dron> {
        return this.dronRepository.findOne({ where: { id }, relations });
    }

    async create(id: string, name: string): Promise<Dron> {
        const instance: Dron = this.dronRepository.create({ id, name });
        return await this.dronRepository.save(instance);
    }

    async update(id: string, name: string, isOnline: boolean): Promise<Dron> {
        return await this.dronRepository.save({ id, name, isOnline });
    }

    async delete(id: string) {
        await this.dronRepository.delete({ id });
        return { message: `Dron ${id} is deleted` };
    }
}
