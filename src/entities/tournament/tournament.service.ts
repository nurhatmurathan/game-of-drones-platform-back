import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Tournament } from './tournament.entity';
import { TournamentListDto } from './dto/tournament.list.dto';
import { LigaService } from '../liga/liga.service';
import { RouteService } from '../route/route.service';

@Injectable()
export class TournamentService {
    constructor(
        @InjectRepository(Tournament)
        private readonly turnamentRepository: Repository<Tournament>,
        private readonly routeService: RouteService,
        private readonly ligaService: LigaService  
    ) {}

    async findAll(language: string): Promise<TournamentListDto[]> {
        const tournaments = await this.turnamentRepository.find({ 
            relations: ['liga', 'route'], 
          });
        
        
          const tournamentDtos = await Promise.all(tournaments.map(async (tournament) => {
            const tournamentDto = new TournamentListDto();
            tournamentDto.id = tournament.id;
            tournamentDto.name = tournament.name;
            tournamentDto.startDate = tournament.startDate;
            tournamentDto.price = tournament.price;
      
            if (tournament.liga) {
              tournamentDto.liga = await this.ligaService.findOne(tournament.liga.id, language);
            }
      
            if (tournament.route) {
              tournamentDto.route = await this.routeService.findOne(tournament.route.id, language);
            }
      
            return tournamentDto;
          }));
      
          return tournamentDtos;
    }
}
