import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { LanguagesEnum } from "../../common/enums";
import { UtilService } from "../../utils/util.service";
import { RouteListDto, RouteRetrieveDto } from "./dto/index";
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
        const routeInstance = await this.routeRepository.findOne({
            where: { id },
            relations: ["description"],
        });

        return {
            id: routeInstance.id,
            name: routeInstance.name,
            length: routeInstance.length,
            bestTime: routeInstance.bestTime,
            map: routeInstance.map,
            description: routeInstance.description[languageType]
        };
    }
}
