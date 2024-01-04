import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Liga } from "./liga.entity";
import { LigaCoverDto, LigaRetrieveDto } from "./dto/index";
import { MultilingualtextService } from "../multilingualtext/multilingualtext.service";

@Injectable()
export class LigaService {
    constructor(
        @InjectRepository(Liga)
        private readonly ligaRepository: Repository<Liga>
    ) {}

    async findAll(): Promise<LigaCoverDto[]> {
        return await this.ligaRepository.find();
    }

    async findOne(id: number, language: string): Promise<LigaRetrieveDto> {
        const ligaInstance = await this.ligaRepository.findOne({
            where: { id },
            relations: ["description"],
        });

        var ligaDescription = ligaInstance.description[language];
        return {
            id: ligaInstance.id,
            name: ligaInstance.name,
            description: ligaDescription,
        };
    }

    async getInstance(id: number): Promise<Liga> {
        return await this.ligaRepository.findOne({ where: { id: id } });
    }
}
