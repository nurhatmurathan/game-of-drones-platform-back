import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Tournament } from './tournament.entity';
import { TournamentListDto } from './dto/tournament.list.dto';
import { TournamentRetrieveDto } from './dto/tournament.retrieve.dto';
import { LigaService } from '../liga/liga.service';
import { RouteService } from '../route/route.service';
import { TournamentTimeService } from '../tournament.time/tournament.time.service'; 


@Injectable()
export class TournamentService {
    constructor(
        @InjectRepository(Tournament)
        private readonly turnamentRepository: Repository<Tournament>,
        private readonly tournamentTimeService: TournamentTimeService,
        private readonly routeService: RouteService,
        private readonly ligaService: LigaService  
    ) {}
    
    async findAll(language: string, ligaId: number): Promise<TournamentListDto[]> {
        
        const tournaments = await this.turnamentRepository.find({ 
            relations: ['liga', 'route'], 
            where: {liga: {id: ligaId} }
        });
        
        const tournamentListDtos = await Promise.all(
          tournaments.map(async (tournament) => this.mapTournamentToListDto(tournament, language))
        );
      
        return tournamentListDtos;
      }
    
    async findOne(id: number, language: string, ligaId: number): Promise<TournamentRetrieveDto> {
        const tournament = await this.turnamentRepository.findOne({ 
            relations: ['liga', 'route'], 
            where: { id: id, liga: {id: ligaId} }
        });

        return this.mapTournamentToRetrieveDto(tournament, language);
    }

    private async mapTournamentToListDto(tournament: Tournament, language: string): Promise<TournamentListDto> {
      const tournamentDto = new TournamentListDto();
      tournamentDto.id = tournament.id;
      tournamentDto.name = tournament.name;
      tournamentDto.startDate = tournament.startDate;
      tournamentDto.price = tournament.price;
      
      if (tournament.liga) 
        tournamentDto.liga = await this.ligaService.findOne(tournament.liga.id, language);
      
      
      if (tournament.route)
        tournamentDto.route = await this.routeService.findOne(tournament.route.id, language);
        
      
      return tournamentDto;
    }

    private async mapTournamentToRetrieveDto(tournament: Tournament, language: string): Promise<TournamentRetrieveDto> {
      const tournamentDto = new TournamentRetrieveDto();
      tournamentDto.id = tournament.id;
      tournamentDto.name = tournament.name;
      tournamentDto.startDate = tournament.startDate;
      tournamentDto.price = tournament.price;
    
      if (tournament.liga) 
        tournamentDto.liga = await this.ligaService.findOne(tournament.liga.id, language);
      
    
      if (tournament.route)
        tournamentDto.route = await this.routeService.findOne(tournament.route.id, language);
    
      tournamentDto.tournamentTimes = await this.tournamentTimeService.findAllByTournamentId(tournament.id);
      return tournamentDto;
    }

}
