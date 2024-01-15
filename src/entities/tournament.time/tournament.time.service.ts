import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { AuthService } from "src/auth/auth.service";
import { Drone } from "../dron/drone.entity";
import { DroneService } from "../dron/drone.service";
import { Tournament } from "../tournament/tournament.entity";
import { User } from "../user/user.entity";
import { UserService } from "../user/user.service";
import {
    TournamentTimeListDto
} from "./dto";
import { TournamentTime } from "./tournament.time.entity";

@Injectable()
export class TournamentTimeService {
    constructor(
        @InjectRepository(TournamentTime)
        private readonly tournamentTimeRepository: Repository<TournamentTime>,
        private readonly authService: AuthService,
        private readonly droneService: DroneService,
        private readonly userService: UserService
    ) { }

    async findOne(id: number) {
        return await this.tournamentTimeRepository.findOne({ where: { id } });
    }

    async assignUserToDron(userId: number): Promise<any> {
        // const instance: TournamentTime = await this.tournamentTimeRepository.findOne({
        //     where: { id: tournamentStartGame.id }
        // });
        // this.isWithinTenMinutes(instance);

        const onlineDrons: Drone[] = await this.droneService.findAvailableDrones();
        const drone: Drone = this.retrieveRandomDorne(onlineDrons);

        const user: User = await this.userService.findOneById(userId);
        const savedDrone: Drone = await this.droneService.bindUserWithDrone(user, drone);

        const jwt = this.authService.signInByUserInstance(user);
        return {
            jwt: jwt,
            drone: savedDrone.id
        }
    }

    isWithinTenMinutes(instance: TournamentTime): any {
        const timeInMilliseconds = Date.now() - instance.startTime;
        const tenMinutesInMilliseconds = 10 * 60 * 1000;

        if (timeInMilliseconds < 0)
            throw new BadRequestException("The tournament hasn't started yet.");
        else if (timeInMilliseconds > tenMinutesInMilliseconds)
            throw new BadRequestException("The tournament has already ended");
    }

    private retrieveRandomDorne(instances: Drone[]): Drone {
        return instances[Math.floor(Math.random() * instances.length)];
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
        const userInstance = await this.userService.findOneById(userId, {
            billingAccount: true,
        });
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
