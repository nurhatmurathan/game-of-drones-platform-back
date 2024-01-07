import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Tournament } from "../tournament/tournament.entity";
import { User } from "../user/user.entity";
import { UserService } from "../user/user.service";
import { TournamentTimeListDto } from "./dto";
import { TournamentTime } from "./tournament.time.entity";

@Injectable()
export class TournamentTimeService {
    constructor(
        @InjectRepository(TournamentTime)
        private readonly tournamentTimeRepository: Repository<TournamentTime>,
        private readonly userService: UserService
    ) { }

    async findOne(id: number) {
        return await this.tournamentTimeRepository.findOne({ where: { id } });
    }

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

    async reservePlaceInTheTournament(
        id: number,
        userId: number
    ): Promise<number> {
        const userInstance = await this.userService.findOneById(userId);
        const tournamentTimeInstance =
            await this.tournamentTimeRepository.findOne({
                where: { id: id },
                relations: ["tournament"],
            });
        const tournamentInstance = tournamentTimeInstance.tournament;

        console.log(tournamentInstance);

        // this.validateTournamentTimeInstance(
        //     tournamentTimeInstance,
        //     tournamentTimeInstance.id,
        //     userInstance.billingAccount.balance,
        //     tournamentInstance.price
        // );
        this.takeThePlaceAndSubtractBalance(
            userInstance,
            tournamentTimeInstance,
            tournamentInstance
        );

        return tournamentTimeInstance.reserved;
    }

    private async takeThePlaceAndSubtractBalance(
        userInstance: User,
        tournamentTimeInstance: TournamentTime,
        tournamentInstance: Tournament
    ): Promise<void> {
        // userInstance.billingAccount.balance -= tournamentInstance.price;
        tournamentTimeInstance.reserved++;

        this.userService.save(userInstance);
        await this.tournamentTimeRepository.save(tournamentTimeInstance);
    }

    private validateTournamentTimeInstance(
        tournamentTimeInstance: TournamentTime,
        tournamentTimeId: number,
        userBalance: number,
        tournamentPrice: number
    ): void {
        if (!tournamentTimeInstance) {
            throw new NotFoundException(
                `TournamentTime with ID ${tournamentTimeId} not found.`
            );
        }

        if (userBalance < tournamentPrice)
            throw new BadRequestException("You don't have enough balance.");

        if (tournamentTimeInstance.places <= tournamentTimeInstance.reserved)
            throw new BadRequestException("No available places.");
    }
}
