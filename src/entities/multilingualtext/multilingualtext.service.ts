import { MultilingualText } from "../../entities/multilingualtext/multilingualtext.entity";
import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MultilingualtextDto } from "./dto/multilingualtext.dto";

@Injectable()
export class MultilingualtextService {
    constructor(
        @InjectRepository(MultilingualText)
        private readonly multilingualtextRepository: Repository<MultilingualText>
    ) {}

    async create(
        multilingualtextData: MultilingualtextDto
    ): Promise<MultilingualText> {
        const newMultilingualtext =
            this.multilingualtextRepository.create(multilingualtextData);

        return await this.multilingualtextRepository.save(newMultilingualtext);
    }
}
