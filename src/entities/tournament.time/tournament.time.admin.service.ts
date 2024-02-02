import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsRelations, Repository } from "typeorm";

import { UserTournamentTimeService } from "../user.tournament.time/user.tournament.time.service";
import { TournamentTimeAdminCreateDto } from "./dto";
import { TournamentTimeAdminListDto } from "./dto/admin/tournament.time.admin.list.dto";
import { TournamentTime } from "./tournament.time.entity";

@Injectable()
export class TournamentTimeAdminService {
    constructor(
        @InjectRepository(TournamentTime)
        private readonly tournamentTimeRepository: Repository<TournamentTime>,
        private readonly userTournamentTimeService: UserTournamentTimeService
    ) {}

    async create(tournamentTimeData: TournamentTimeAdminCreateDto): Promise<TournamentTime> {
        const tournamentTimeInstance = this.tournamentTimeRepository.create(tournamentTimeData);
        return this.tournamentTimeRepository.save(tournamentTimeInstance);
    }

    async findAllByTournamentId(tournamentId: number): Promise<TournamentTimeAdminListDto[]> {
        const tournamentTimes = await this.tournamentTimeRepository.find({
            where: { tournament: { id: tournamentId } },
        });

        return Promise.all(tournamentTimes.map((tournamentTime) => this.mapToDto(tournamentTime)));
    }

    private async mapToDto(tournamentTime: TournamentTime): Promise<TournamentTimeAdminListDto> {
        const dto = new TournamentTimeAdminListDto();
        dto.id = tournamentTime.id;
        dto.startTime = tournamentTime.startTime;
        dto.places = tournamentTime.places;
        dto.reserved = await this.userTournamentTimeService.countReservedPlaces(tournamentTime.id);
        console.log(dto);
        return dto;
    }

    async findOne(id: number, relations?: FindOptionsRelations<TournamentTime>): Promise<TournamentTime> {
        return await this.tournamentTimeRepository.findOne({ where: { id }, relations });
    }

    async save(instance: TournamentTime): Promise<TournamentTime> {
        return this.tournamentTimeRepository.save(instance);
    }

    async delete(id: number): Promise<any> {
        const instance = await this.tournamentTimeRepository.findOne({ where: { id } });
        this.isExists(instance, id);

        await this.tournamentTimeRepository.remove(instance);
    }

    private isExists(instance: TournamentTime, id: number): void {
        if (!instance) throw new NotFoundException(`TournamentTime with id ${id} not found`);
    }
}
