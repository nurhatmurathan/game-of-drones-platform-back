import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Liga } from "./liga.entity";
import { LigaCreateDto } from "./dto/liga.create.dto";
import { LigaListeDto } from "./dto/liga.list.dto";
import { LigaRetrieveDto } from "./dto/liga.retrieve.dto";
import { MultilingualtextService } from "../multilingualtext/multilingualtext.service";

@Injectable()
export class LigaService {
    constructor(
        @InjectRepository(Liga)
        private readonly ligaRepository: Repository<Liga>,
        private readonly multilingualTextService: MultilingualtextService
    ) {}

    async findAll(): Promise<LigaListeDto[]> {
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
