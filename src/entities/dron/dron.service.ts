import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Dron } from "./dron.entity";

@Injectable()
export class DronService {
    constructor(
        @InjectRepository(Dron)
        private readonly dronRepository: Repository<Dron>
    ) {}

    async create(id: string, name: string): Promise<Dron> {
        const instance: Dron = this.dronRepository.create({ id, name });
        return await this.dronRepository.save(instance);
    }
}
