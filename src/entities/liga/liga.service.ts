import { MultilingualText } from '../../entities/multilingualtext/multilingualtext.entity';
import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Liga } from "./liga.entity";
import { Repository } from "typeorm";
import { LigaCreateDto } from "./dto/liga.create.dto";
import { LigaListeDto } from "./dto/liga.list.dto";
import { LigaRetrieveDto } from "./dto/liga.retrieve.dto";
import { MultilingualtextService } from '../../entities/multilingualtext/multilingualtext.service';

@Injectable()
export class LigaService{
    constructor(
        @InjectRepository(Liga)
        private readonly ligaRepository: Repository<Liga>,
        private readonly multilingualtextRepository: MultilingualtextService
      ) {}

      async findAll(): Promise<LigaListeDto[]> {
        return await this.ligaRepository.find()
      }

      async findOne(id: number): Promise<LigaRetrieveDto>{
        const { description, ...res } = await this.ligaRepository.findOne({where: { id }})
        
        return {
          ...res,
          description: description.ru
        }
      }

      async create(ligaData: LigaCreateDto): Promise<LigaCreateDto>{
        
        const { description, ...liga } = ligaData

        const multilingualtext = await this.multilingualtextRepository.create(description)

        const newLiga = this.ligaRepository.create({
          ...liga,
          description: multilingualtext
        })
        
        return await this.ligaRepository.save(newLiga)

      }
}