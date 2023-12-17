import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";

import { Liga } from "./liga.entity";
import { LigaCreateDto } from "./dto/liga.create.dto";
import { LigaListeDto } from "./dto/liga.list.dto";
import { LigaRetrieveDto } from "./dto/liga.retrieve.dto";
import { MultilingualtextService } from '../multilingualtext/multilingualtext.service';


@Injectable()
export class LigaService{
    constructor(
        @InjectRepository(Liga)
        private readonly ligaRepository: Repository<Liga>,
        private readonly multilingualTextService: MultilingualtextService
      ) {}

      async findAll(): Promise<LigaListeDto[]> {
        return await this.ligaRepository.find()
      }

      async findOne(id: number): Promise<LigaRetrieveDto>{

        const ligaInstance = await this.ligaRepository.findOne({
          where: { id },
          relations: ['description'], 
        });

        let ligaDesctiption = ligaInstance.description.en 
        
        return {
          id: ligaInstance.id,
          name: ligaInstance.name,
          description: ligaDesctiption
        };
      }

      async create(ligaData: LigaCreateDto): Promise<LigaCreateDto>{
        const { description, ...liga } = ligaData

        const multilingualtext = await this.multilingualTextService.create(description)

        const newLiga = this.ligaRepository.create({
          ...liga,
          description: multilingualtext
        })
        
        return await this.ligaRepository.save(newLiga)

      }
}