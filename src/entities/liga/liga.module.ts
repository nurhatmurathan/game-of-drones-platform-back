import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Liga } from './liga.entity';
import { LigaController } from './liga.controller';
import { LigaService } from './liga.service';
import { MultilingualtextModule } from '../../entities/multilingualtext/multilingualtext.module';


@Module({
  imports: [TypeOrmModule.forFeature([Liga]), MultilingualtextModule],
  controllers: [LigaController],
  providers: [LigaService],
  exports: [LigaService]

})
export class LigaModule {}


