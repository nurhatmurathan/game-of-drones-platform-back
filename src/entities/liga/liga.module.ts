import { Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { LigaController } from './liga.controller';
import { ligaProviders } from './liga.providers';
import { LigaService } from './liga.service';


@Module({
  imports: [DatabaseModule],
  controllers: [LigaController],
  providers: [
    ...ligaProviders,
    LigaService],

})
export class LigaModule {}


