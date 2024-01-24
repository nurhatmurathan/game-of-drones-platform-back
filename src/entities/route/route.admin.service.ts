import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MultilingualtextService } from "../multilingualtext/multilingualtext.service";
import {
    RouteAdminCreateDto,
    RouteAdminRetrieveDto,
    RouteAdminUpdateDto,
    RouteListDto,
} from "./dto";
import { Route } from "./route.entity";

@Injectable()
export class RouteAdminService {
    constructor(
        @InjectRepository(Route)
        private readonly routeRepository: Repository<Route>,
        private readonly multilingualTextService: MultilingualtextService
    ) { }

    async findAll(): Promise<RouteListDto[]> {
        const instances = await this.routeRepository.find();

        return instances.map((route) => ({
            id: route.id,
            name: route.name,
        }));
    }

    async findOne(id: number): Promise<RouteAdminRetrieveDto> {
        const instance = await this.routeRepository.findOne({
            where: { id },
            relations: { description: true }
        });
        this.isExists(instance, id);

        return instance;
    }

    async create(createData: RouteAdminCreateDto): Promise<RouteAdminRetrieveDto> {
        const { description, ...routeData } = createData;

        const multilingualTextInstance =
            await this.multilingualTextService.create(description);

        const createdInstance = this.routeRepository.create({
            ...routeData,
            description: multilingualTextInstance,
        });

        return this.routeRepository.save(createdInstance);
    }

    async update(id: number, updateData: RouteAdminUpdateDto): Promise<RouteAdminRetrieveDto> {
        const { description, ...routeData } = updateData;

        const instance = await this.routeRepository.findOne({ where: { id } });
        this.isExists(instance, id);

        updateData.description = await this.multilingualTextService.update(description);
        Object.assign(instance, updateData)

        const updatedInstance = await this.routeRepository.save(instance);
        return updatedInstance;
    }

    async delete(id: number): Promise<any> {
        const instance = await this.routeRepository.findOne({
            where: { id },
            relations: { description: true, trainings: true }
        });
        this.isExists(instance, id);

        const descriptiontId = instance.description.id;
        await this.routeRepository.remove(instance);
        await this.multilingualTextService.delete(descriptiontId);

        return { "message": "OK!" }
    }

    private isExists(instance: Route, id: number): void {
        if (!instance)
            throw new NotFoundException(`Route with id ${id} not found`);
    }
}
