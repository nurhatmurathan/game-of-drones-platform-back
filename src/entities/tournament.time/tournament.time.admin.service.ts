import {
    Injectable
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
}