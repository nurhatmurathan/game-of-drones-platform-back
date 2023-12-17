import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Tournament } from './tournament.entity';
import { LigaModule } from '../liga/liga.module';
import { TournamentController } from './tournament.controller';
import { TournamentService } from './tournament.service'; 


@Module({
    imports: [TypeOrmModule.forFeature([Tournament]), LigaModule],
    controllers: [TournamentController],
    providers: [TournamentService],
})
export class TournamentModule {}
