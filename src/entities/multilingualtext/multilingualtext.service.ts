import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MultilingualText } from "../../entities/multilingualtext/multilingualtext.entity";
import { MultilingualtextDto, MultilingualtextUpdateDto } from "./dto";

@Injectable()
export class MultilingualtextService {
    constructor(
        @InjectRepository(MultilingualText)
        private readonly multilingualtextRepository: Repository<MultilingualText>
    ) { }

    async create(
        createData: MultilingualtextDto
    ): Promise<MultilingualText> {
        const instance =
            this.multilingualtextRepository.create(createData);

        return await this.multilingualtextRepository.save(instance);
    }

    async update(
        updateData: MultilingualtextUpdateDto
    ): Promise<MultilingualtextUpdateDto> {
        const { id, ...updatedMultilingualtextData } = updateData;

        const instance = await this.multilingualtextRepository.findOne({ where: { id } });
        this.isExists(instance, id);

        Object.assign(instance, updateData);
        return await this.multilingualtextRepository.save(instance);
    }

    async delete(id: number): Promise<any> {
        const instance = await this.multilingualtextRepository.findOne({ where: { id } });
        this.isExists(instance, id);

        this.multilingualtextRepository.remove(instance);
    }

    private isExists(instance: MultilingualText, id: number): void {
        if (!instance)
            throw new NotFoundException(`MultilingualText instance with id: ${id} not found.`);
    }

}
