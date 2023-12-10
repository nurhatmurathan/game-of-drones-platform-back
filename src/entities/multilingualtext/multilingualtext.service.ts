import { Multilingualtext } from '../../entities/multilingualtext/multilingualtext.entity';
import { Inject, Injectable } from "@nestjs/common";
import { Repository } from 'typeorm';
import { MultilingualtextDto } from './dto/multilingualtext.dto';

@Injectable()
export class MultilingualtextService{
    constructor(
        @Inject('MULTILINGUALTEXT_REPOSITORY')
        private readonly multilingualtextRepository: Repository<Multilingualtext>,
      ) {}


      async create(multilingualtextData: MultilingualtextDto): Promise<Multilingualtext>{
        const newMultilingualtext = this.multilingualtextRepository.create(multilingualtextData)
        
        return await this.multilingualtextRepository.save(newMultilingualtext)

      }
}