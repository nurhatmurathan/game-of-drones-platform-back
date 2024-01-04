import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Route } from "./route.entity";
import { Repository } from "typeorm";
import {
    RouteRetrieveAdminDto,
    RouteCoverDto,
    RouteCreateDto,
} from "./dto/index";
import { MultilingualtextService } from "../multilingualtext/multilingualtext.service";

@Injectable()
export class RouteAdminService {
    constructor(
        @InjectRepository(Route)
        private readonly routeRepository: Repository<Route>,
        private readonly multilingualTextService: MultilingualtextService
    ) {}

    async findAll(): Promise<RouteCoverDto[]> {
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

    getInstance(id: number): Promise<Route> {
        return this.routeRepository.findOne({ where: { id: id } });
    }
}
