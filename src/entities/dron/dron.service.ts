import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../user/user.entity";
import { Dron } from "./dron.entity";

@Injectable()
export class DronService {
    constructor(
        @InjectRepository(Dron)
        private readonly dronRepository: Repository<Dron>
    ) { }

    async create(id: string, name: string): Promise<Dron> {
        const instance: Dron = this.dronRepository.create({ id, name });
        return await this.dronRepository.save(instance);
    }

    async findAvailableDrones(): Promise<Dron[]> {
        const instances: Dron[] = await this.dronRepository.find({
            where: {
                isOnline: true,
                user: null,
            },
        });
        this.isExists(instances);

        return instances;
    }

    async bindUserWithDrone(user: User, dron: Dron): Promise<Dron> {
        dron.user = user;
        return this.dronRepository.save(dron);
    }

    private isExists(instances: Dron[]): void {
        if (instances.length === 0)
            throw new NotFoundException(`No available drones`);
    }
}
