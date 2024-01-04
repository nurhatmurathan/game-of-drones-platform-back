import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Route } from "./route.entity";
import { Repository } from "typeorm";
import {
    RouteRetrieveAdminDto,
    RouteListDto,
    RouteCreateDto,
    RouteUpdateDto,
} from "./dto/index";
import { MultilingualtextService } from "../multilingualtext/multilingualtext.service";
import e from "express";

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

    async findOne(id: number): Promise<RouteRetrieveAdminDto> {
        return await this.routeRepository.findOne({
            where: { id },
            relations: ["description"],
        });
    }

    async create(routeData: RouteCreateDto): Promise<RouteCreateDto> {
        const { description, ...routeInformation } = routeData;

        const multilingualTextInstance =
            await this.multilingualTextService.create(description);

        const newRouteInstance = this.routeRepository.create({
            ...routeInformation,
            description: multilingualTextInstance,
        });

        return this.routeRepository.save(newRouteInstance);
    }

    async update(id: number, routeDtoData: RouteUpdateDto): Promise<RouteRetrieveAdminDto> {
        const { description, ...route } = routeDtoData;
        const routeInstance = await this.routeRepository.findOne({ where: { id } });

        this.isExists(routeInstance, id);
        routeDtoData.description = await this.multilingualTextService.update(description);
        Object.assign(routeInstance, routeDtoData)

        const updatedRoute = await this.routeRepository.save(routeInstance);
        return this.mapEntityToDto(updatedRoute);
    }

    private mapEntityToDto(entity: Route): RouteRetrieveAdminDto {
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
            relations: ["description"]
        });

        const multilingualtextId = routeInstance.description.id;
        this.isExists(routeInstance, id);

        await this.routeRepository.remove(routeInstance);
        await this.multilingualTextService.delete(multilingualtextId);
    }

    private isExists(instance: Route, id: number): void {
        if (!instance)
            throw new NotFoundException(`Route with id ${id} not found`);
    }
}
