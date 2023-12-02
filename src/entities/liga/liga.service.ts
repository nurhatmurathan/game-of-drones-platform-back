import { Inject, Injectable } from "@nestjs/common";
import { Liga } from "./liga.entity";
import { Repository } from "typeorm";
import { LigaCreateDto } from "./dto/liga.create.dto";
import { LigaListeDto } from "./dto/liga.list.dto";
import { LigaRetrieveDto } from "./dto/liga.retrieve.dto";

@Injectable()
export class LigaService{
    constructor(
        @Inject('LIGA_REPOSITORY')
        private readonly ligaRepository: Repository<Liga>,
      ) {}

      async findAll(): Promise<LigaListeDto[]> {
        return await this.ligaRepository.find()
      }

      async findOne(id: number): Promise<LigaRetrieveDto>{
        return await this.ligaRepository.findOne({where: { id }})
      }

      async create(ligaData: LigaCreateDto): Promise<LigaRetrieveDto>{

        const newLiga = this.ligaRepository.create(ligaData)
        
        return await this.ligaRepository.save(newLiga)

      }
}