import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Liga } from "./liga.entity";
import { MultilingualtextService } from "../multilingualtext/multilingualtext.service";
import { LigaRetrieveAdminDto, LigaCoverDto, LigaCreateDto } from "./dto";
import { LigaUpdateDto } from "./dto/liga.update.admin.dto";

@Injectable()
export class LigaAdminService {
    constructor(
        @InjectRepository(Liga)
        private readonly ligaRepository: Repository<Liga>,
        private readonly multilingualTextService: MultilingualtextService
    ) { }

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

    async update(id: number, ligaData: LigaUpdateDto): Promise<LigaRetrieveAdminDto> {
        const { description, ...liga } = ligaData;
        const ligaInstance = await this.ligaRepository.findOne({ where: { id } });

        this.isExists(ligaInstance, id);

        ligaData.description = await this.multilingualTextService.update(description);
        Object.assign(ligaInstance, ligaData);

        const updatedLiga = await this.ligaRepository.save(ligaInstance);
        return this.mapEntityToDto(updatedLiga, ligaData);
    }

    private mapEntityToDto(entity: Liga, dto: LigaUpdateDto): LigaRetrieveAdminDto {
        return {
            id: entity.id,
            name: entity.name,
            description: dto.description,
        };
    }

    async delete(id: number): Promise<void> {
        const ligaInstance = await this.ligaRepository.findOne({ where: { id } });

        this.isExists(ligaInstance, id);
        await this.ligaRepository.remove(ligaInstance);
    }

    private isExists(instance: Liga, id: number): void {
        if (!instance)
            throw new NotFoundException(`Liga with id ${id} not found`);
    }
}
