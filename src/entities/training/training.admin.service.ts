import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TrainingAdminCreateDto } from "./dto";
import { Training } from "./training.entity";

@Injectable()
export class TrainingAdminService {
    constructor(
        @InjectRepository(Training)
        private readonly trainingRepository: Repository<Training>,
    ) { }

    async create(createDate: TrainingAdminCreateDto): Promise<Training> {
        return await this.trainingRepository.save(createDate);
    }


    async delete(id: number): Promise<any> {
        const instance: Training = await this.trainingRepository.findOne({
            where: { id }
        });
        this.isExists(instance, id);

        this.trainingRepository.remove(instance);
        return { "message": "OK!" }
    }

    private isExists(instance: Training, id: number): void {
        if (!instance)
            throw new NotFoundException(`Training with id ${id} not found`);
    }
}
