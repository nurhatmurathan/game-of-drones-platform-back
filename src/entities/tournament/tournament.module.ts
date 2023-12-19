import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Tournament } from './tournament.entity';
import { LigaModule } from '../liga/liga.module';
import { RouteModule } from '../route/route.module'
import { TournamentController } from './tournament.controller';
import { TournamentService } from './tournament.service'; 
import { UtilModule }  from '../../utils/util.module';
import { UserModule } from '../user/user.module';
import { TournamentTimeModule } from '../tournament.time/tournament.time.module';


@Module({
    imports: [TypeOrmModule.forFeature([Tournament]), LigaModule, 
    RouteModule, UtilModule, UserModule, TournamentTimeModule],
    controllers: [TournamentController],
    providers: [TournamentService],
})
export class TournamentModule {}
