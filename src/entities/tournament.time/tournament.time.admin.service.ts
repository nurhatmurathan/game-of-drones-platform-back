import {
    Injectable, NotFoundException
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { TournamentTimeAdminCreateDto } from "./dto";
import { TournamentTime } from "./tournament.time.entity";

@Injectable()
export class TournamentTimeAdminService {
    constructor(
        @InjectRepository(TournamentTime)
        private readonly tournamentTimeRepository: Repository<TournamentTime>,
    ) { }

    async create(tournamentTimeData: TournamentTimeAdminCreateDto): Promise<TournamentTime> {
        const tournamentTimeInstance = this.tournamentTimeRepository.create(tournamentTimeData);
        return this.tournamentTimeRepository.save(tournamentTimeInstance);
    }

    async findOne(id: number): Promise<TournamentTime> {
        return this.tournamentTimeRepository.findOne({ where: { id } });
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
        if (!instance)
            throw new NotFoundException(`TournamentTime with id ${id} not found`);
    }
}