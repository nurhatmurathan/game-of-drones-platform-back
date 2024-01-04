import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Route } from "./route.entity";
import { RouteCoverDto, RouteRetrieveDto } from "./dto/index";

@Injectable()
export class RouteService {
    constructor(
        @InjectRepository(Route)
        private readonly routeRepository: Repository<Route>
    ) {}

    async findAll(): Promise<RouteCoverDto[]> {
        const routeInstances = await this.routeRepository.find();

        return routeInstances.map((route) => ({
            id: route.id,
            name: route.name,
        }));
    }

    async findOne(id: number, language: string): Promise<RouteRetrieveDto> {
        const routeInstance = await this.routeRepository.findOne({
            where: { id },
            relations: ["description"],
        });

        var routeDesctiption = routeInstance.description[language];
        return {
            id: routeInstance.id,
            name: routeInstance.name,
            length: routeInstance.length,
            bestTime: routeInstance.bestTime,
            map: routeInstance.map,
            description: routeDesctiption,
        };
    }

    getInstance(id: number): Promise<Route> {
        return this.routeRepository.findOne({ where: { id: id } });
    }
}
