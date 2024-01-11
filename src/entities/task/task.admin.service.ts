import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ActionAdminService } from "../action/action.admin.service";
import { MultilingualtextService } from "../multilingualtext/multilingualtext.service";
import {
    TaskAdminCreateDto,
    TaskAdminListDto,
    TaskAdminRetrieveDto,
    TaskAdminUpdateDto
} from "./dto";
import { Task } from "./task.entity";


@Injectable()
export class TaskAdminService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
        private readonly multilingualTextService: MultilingualtextService,
        private readonly actrionAdminService: ActionAdminService
    ) { }

    findAll(): Promise<TaskAdminListDto[]> {
        return this.taskRepository.find();
    }

    findOne(id: number): Promise<TaskAdminRetrieveDto> {
        return this.taskRepository.findOne({
            where: { id },
            relations: {
                description: true,
                taskDescription: true
            }
        });
    }

    async create(createData: TaskAdminCreateDto): Promise<TaskAdminRetrieveDto> {
        const { description, taskDescription, ...task } = createData;

        const descriptionEntity =
            await this.multilingualTextService.create(description);
        const taskDescriptionEntity =
            await this.multilingualTextService.create(taskDescription);

        const newInstance = this.taskRepository.create({
            ...task,
            description: descriptionEntity,
            taskDescription: taskDescriptionEntity

        });

        const savedInstance = await this.taskRepository.save(newInstance)
        return this.mapEntityToRetrieveDto(savedInstance)
    }

    async update(id: number, updateData: TaskAdminUpdateDto): Promise<TaskAdminRetrieveDto> {
        const instance = await this.taskRepository.findOne({
            where: { id }
        });
        this.isExists(instance, id);

        const { description, taskDescription, ...taskData } = updateData;
        updateData.description = await this.multilingualTextService.update(description);
        updateData.taskDescription = await this.multilingualTextService.update(taskDescription);

        Object.assign(instance, updateData);
        const updatedData = await this.taskRepository.save(instance);
        return this.mapEntityToRetrieveDto(instance);
    }

    private mapEntityToRetrieveDto(instance: Task): TaskAdminRetrieveDto {
        return {
            id: instance.id,
            name: instance.name,
            inOneGame: instance.inOneGame,
            maxCount: instance.maxCount,
            reward: instance.reward,
            description: instance.description,
            taskDescription: instance.taskDescription
        }
    }


    async delete(id: number): Promise<any> {
        const instance = await this.taskRepository.findOne({
            where: { id },
            relations: {
                description: true,
                taskDescription: true,
                actions: true
            }
        });
        this.isExists(instance, id);

        instance.actions.forEach(async (action) => {
            if (action.id)
                this.actrionAdminService.delete(action.id);
        });
        await this.taskRepository.save(instance);

        const descriptionId = instance.description.id;
        const taskDescriptionId = instance.taskDescription.id;

        await this.taskRepository.remove(instance);
        await this.multilingualTextService.delete(descriptionId);
        await this.multilingualTextService.delete(taskDescriptionId);

    }

    private isExists(instance: Task, id: number): void {
        if (!instance)
            throw new NotFoundException(`Task with id ${id} not found`);
    }

}