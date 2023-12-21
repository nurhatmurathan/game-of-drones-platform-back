import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Route } from "./route.entity";
import { RouteRetrieveDto } from "./dto/route.retrieve.dto";
import { RouteCreateDto } from "./dto/route.create.dto";
import { MultilingualtextService } from "../multilingualtext/multilingualtext.service";

@Injectable()
export class RouteService {
    constructor(
        @InjectRepository(Route)
        private readonly routeRepository: Repository<Route>,
        private readonly multilingualTextService: MultilingualtextService
    ) {}

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

    getInstance(id: number): Promise<Route> {
        return this.routeRepository.findOne({where: {id: id}});
    }

}
