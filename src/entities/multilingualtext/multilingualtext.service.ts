import { MultilingualText } from "../../entities/multilingualtext/multilingualtext.entity";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MultilingualtextDto } from "./dto/multilingualtext.dto";
import { MultilingualtextUpdateDto } from "./dto/multilingualtext.update.dto";

@Injectable()
export class MultilingualtextService {
    constructor(
        @InjectRepository(MultilingualText)
        private readonly multilingualtextRepository: Repository<MultilingualText>
    ) { }

    async create(
        multilingualtextData: MultilingualtextDto
    ): Promise<MultilingualText> {
        const newMultilingualtext =
            this.multilingualtextRepository.create(multilingualtextData);

        return await this.multilingualtextRepository.save(newMultilingualtext);
    }

    async update(
        multilingualtextData: MultilingualtextUpdateDto
    ): Promise<MultilingualtextUpdateDto> {
        const { id, ...updatedMultilingualtextData } = multilingualtextData;
        const multilingualtextInstance = await this.multilingualtextRepository.findOne({ where: { id } });

        this.isExists(multilingualtextInstance, id);

        Object.assign(multilingualtextInstance, updatedMultilingualtextData);
        return await this.multilingualtextRepository.save(multilingualtextInstance);
    }

    async delete(id: number): Promise<any> {
        const multilingualtextInstance = await this.multilingualtextRepository.findOne({ where: { id } });

        this.isExists(multilingualtextInstance, id);
        this.multilingualtextRepository.remove(multilingualtextInstance);
    }

    private isExists(instance: MultilingualText, id: number): void {
        if (!instance)
            throw new NotFoundException(`MultilingualText instance with id: ${id} not found.`);
    }

}
