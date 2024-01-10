import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MultilingualtextService } from "../multilingualtext/multilingualtext.service";
import {
    RouteAdminCreateDto,
    RouteAdminRetrieveDto,
    RouteAdminUpdateDto,
    RouteListDto,
} from "./dto/index";
import { Route } from "./route.entity";

@Injectable()
export class RouteAdminService {
    constructor(
        @InjectRepository(Route)
        private readonly routeRepository: Repository<Route>,
        private readonly multilingualTextService: MultilingualtextService
    ) { }

    async findAll(): Promise<RouteListDto[]> {
        const routeInstances = await this.routeRepository.find();

        return routeInstances.map((route) => ({
            id: route.id,
            name: route.name,
        }));
    }

    async findOne(id: number): Promise<RouteAdminRetrieveDto> {
        return await this.routeRepository.findOne({
            where: { id },
            relations: { description: true }
        });
    }

    async findOneInstance(id: number): Promise<Route> {
        return await this.routeRepository.findOne({ where: { id } });
    }

    async create(routeData: RouteAdminCreateDto): Promise<RouteAdminCreateDto> {
        const { description, ...routeInformation } = routeData;

        const multilingualTextInstance =
            await this.multilingualTextService.create(description);

        const newRouteInstance = this.routeRepository.create({
            ...routeInformation,
            description: multilingualTextInstance,
        });

        return this.routeRepository.save(newRouteInstance);
    }

    async update(id: number, updateData: RouteAdminUpdateDto): Promise<RouteAdminRetrieveDto> {
        const { description, ...route } = updateData;
        const routeInstance = await this.routeRepository.findOne({ where: { id } });

        this.isExists(routeInstance, id);
        updateData.description = await this.multilingualTextService.update(description);
        Object.assign(routeInstance, updateData)

        const updatedRoute = await this.routeRepository.save(routeInstance);
        return this.mapEntityToDto(updatedRoute);
    }

    private mapEntityToDto(entity: Route): RouteAdminRetrieveDto {
        return {
            id: entity.id,
            name: entity.name,
            length: entity.length,
            bestTime: entity.bestTime,
            map: entity.map,
            description: entity.description
        };
    }


    async delete(id: number): Promise<any> {
        const routeInstance = await this.routeRepository.findOne({
            where: { id },
            relations: { description: true }
        });

        const multilingualtextId = routeInstance.description.id;
        this.isExists(routeInstance, id);

        await this.routeRepository.remove(routeInstance);
        await this.multilingualTextService.delete(multilingualtextId);

        return { "message": "OK!" }
    }

    private isExists(instance: Route, id: number): void {
        if (!instance)
            throw new NotFoundException(`Route with id ${id} not found`);
    }
}
