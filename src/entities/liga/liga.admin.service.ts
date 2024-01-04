import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Liga } from "./liga.entity";
import { MultilingualtextService } from "../multilingualtext/multilingualtext.service";
import { LigaRetrieveAdminDto, LigaCoverDto, LigaCreateDto } from "./dto";

@Injectable()
export class LigaAdminService {
    constructor(
        @InjectRepository(Liga)
        private readonly ligaRepository: Repository<Liga>,
        private readonly multilingualTextService: MultilingualtextService
    ) {}

    async findAll(): Promise<LigaCoverDto[]> {
        return await this.ligaRepository.find();
    }

    async findOne(id: number): Promise<LigaRetrieveAdminDto> {
        return await this.ligaRepository.findOne({
            where: { id },
            relations: ["description"],
        });
    }

    async create(ligaData: LigaCreateDto): Promise<LigaCreateDto> {
        const { description, ...liga } = ligaData;

        const multilingualtext =
            await this.multilingualTextService.create(description);

        const newLiga = this.ligaRepository.create({
            ...liga,
            description: multilingualtext,
        });

        return await this.ligaRepository.save(newLiga);
    }
}
