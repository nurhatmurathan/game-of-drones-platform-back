import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { LanguagesEnum } from "../../common/enums";
import { UtilService } from "../../utils/util.service";
import {
    RouteListDto,
    RouteRetrieveDto
} from "./dto";
import { Route } from "./route.entity";


@Injectable()
export class RouteService {
    constructor(
        @InjectRepository(Route)
        private readonly routeRepository: Repository<Route>,
        private readonly utilService: UtilService
    ) { }

    async findAll(): Promise<RouteListDto[]> {
        const routeInstances = await this.routeRepository.find();

        return routeInstances.map((route) => ({
            id: route.id,
            name: route.name,
        }));
    }

    async findOne(id: number, language: LanguagesEnum): Promise<RouteRetrieveDto> {
        const languageType = this.utilService.getLanguage(language);
        const instance = await this.routeRepository.findOne({
            where: { id },
            relations: {
                description: true
            },
        });

        return this.mapEntityToRetrieveDto(instance, languageType);
    }

    private mapEntityToRetrieveDto(instance: Route, languageType: string): RouteRetrieveDto {
        return {
            id: instance.id,
            name: instance.name,
            length: instance.length,
            bestTime: instance.bestTime,
            map: instance.map,
            description: instance.description[languageType]
        };
    }
}
