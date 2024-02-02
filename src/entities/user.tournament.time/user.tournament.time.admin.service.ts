import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserTournamentTime } from "./user.tournament.time.entity";

@Injectable()
export class UserTournamentTimeService {
    constructor(
        @InjectRepository(UserTournamentTime)
        private readonly userTournamentTimeRepository: Repository<UserTournamentTime>
    ) {}
}
