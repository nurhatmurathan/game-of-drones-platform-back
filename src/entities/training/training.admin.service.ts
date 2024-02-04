import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsRelations, Repository } from "typeorm";

import { RouteAdminService } from "../route/route.admin.service";

import { TrainingAdminCreateDto } from "./dto";
import { Training } from "./training.entity";

@Injectable()
export class TrainingAdminService {
    constructor(
        @InjectRepository(Training)
        private readonly trainingRepository: Repository<Training>,
        private readonly routeAdminService: RouteAdminService
    ) {}

    async create(createDataSet: TrainingAdminCreateDto[]): Promise<Training[]> {
        const createdInstances: Training[] = [];

        for (let createData of createDataSet) {
            const { routeId, ...trainingData } = createData;

            const routeInstance = await this.routeAdminService.findOne(routeId);
            const instance = this.trainingRepository.create({
                ...trainingData,
                route: routeInstance,
            });

            const savedInstance = await this.trainingRepository.save(instance);
            createdInstances.push(savedInstance);
        }

        return createdInstances;
    }

    async findAll(relations?: FindOptionsRelations<Training>): Promise<Training[]> {
        return await this.trainingRepository.find({ relations });
    }

    async delete(id: number): Promise<any> {
        const instance: Training = await this.trainingRepository.findOne({
            where: { id },
        });
        this.isExists(instance, id);

        this.trainingRepository.remove(instance);
        return { message: "OK!" };
    }

    private isExists(instance: Training, id: number): void {
        if (!instance) throw new NotFoundException(`Training with id ${id} not found`);
    }
}
