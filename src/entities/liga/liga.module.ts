import { Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { LigaController } from './liga.controller';
import { ligaProviders } from './liga.providers';
import { LigaService } from './liga.service';
import { MultilingualtextModule } from '@entities/multilingualtext/multilingualtext.module';


@Module({
  imports: [
    DatabaseModule,
    MultilingualtextModule,
  ],
  controllers: [LigaController],
  providers: [
    ...ligaProviders,
    LigaService],

})
export class LigaModule {}


