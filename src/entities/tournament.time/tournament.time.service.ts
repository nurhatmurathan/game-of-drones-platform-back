import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { TournamentTime } from "./tournament.time.entity";
import { TournamentTimeListDto } from "./dto/tournament.time.list.dto";
import { UserService } from "../user/user.service";
import { User } from "../user/user.entity";
import { UserTournamentTimeService } from "../user.tournament.time/user.tournament.time.service";


@Injectable()
export class TournamentTimeService {
    constructor(
        @InjectRepository(TournamentTime)
        private readonly tournamentTimeRepository: Repository<TournamentTime>,
        private readonly userService: UserService,
        private readonly userTournamentTimeService: UserTournamentTimeService
    ) { }

    async findAllByTournamentId(
        tournamentId: number
    ): Promise<TournamentTimeListDto[]> {
        const tournamentTimes = await this.tournamentTimeRepository.find({
            where: { tournament: { id: tournamentId } },
        });

        return tournamentTimes.map((tournamentTime) =>
            this.mapToDto(tournamentTime)
        );
    }

    private mapToDto(tournamentTime: TournamentTime): TournamentTimeListDto {
        const dto = new TournamentTimeListDto();
        dto.id = tournamentTime.id;
        dto.startTime = tournamentTime.startTime;
        dto.places = tournamentTime.places;
        dto.reserved = tournamentTime.reserved;
        return dto;
    }

    async reservePlaceForTournaments(id: number, userId: number): Promise<TournamentTime | null> {
        const userInstance = await this.userService.findOneById(userId);
        const tournamentTimeInstance = await this.tournamentTimeRepository.findOne({
            where: { id: id }
        });
        const tournamentInstance = tournamentTimeInstance.tournament;

        if (userInstance.billingAccount.balance < tournamentInstance.price
            || tournamentTimeInstance.places <= 0) {
            return null;
        }

        userInstance.billingAccount.balance -= tournamentInstance.price;
        tournamentTimeInstance.places -= 1;

        await this.userService.save(userInstance);
        await this.tournamentTimeRepository.save(tournamentTimeInstance);
        await this.userTournamentTimeService.create(userInstance, tournamentTimeInstance);

        return tournamentTimeInstance;
    }
}
