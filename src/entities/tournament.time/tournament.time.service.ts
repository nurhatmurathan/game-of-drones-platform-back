import {
    BadRequestException,
    Inject,
    Injectable,
    NotFoundException,
    forwardRef,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { AuthService } from "src/auth/auth.service";
import { Drone } from "../dron/drone.entity";
import { DroneService } from "../dron/drone.service";
import { Tournament } from "../tournament/tournament.entity";
import { UserTournamentTimeService } from "../user.tournament.time/user.tournament.time.service";
import { User } from "../user/user.entity";
import { UserService } from "../user/user.service";
import { TournamentTimeListDto } from "./dto";
import { TournamentTime } from "./tournament.time.entity";

@Injectable()
export class TournamentTimeService {
    constructor(
        @InjectRepository(TournamentTime)
        private readonly tournamentTimeRepository: Repository<TournamentTime>,
        private readonly authService: AuthService,
        private readonly droneService: DroneService,
        private readonly userService: UserService,
        @Inject(forwardRef(() => UserTournamentTimeService))
        private readonly userTournamentTimeService: UserTournamentTimeService
    ) {}

    async findOne(id: number) {
        return await this.tournamentTimeRepository.findOne({ where: { id } });
    }

    async assignUserToDron(userId: number): Promise<any> {
        const onlineDrons: Drone[] =
            await this.droneService.findAvailableDrones();
        const drone: Drone = this.retrieveRandomDorne(onlineDrons);

        const user: User = await this.userService.findOneById(userId);
        const savedDrone: Drone = await this.droneService.bindUserWithDrone(
            user,
            drone
        );

        const jwt = await this.authService.signInByUserInstance(user);
        return {
            jwt: jwt,
            drone: savedDrone.id,
        };
    }

    private retrieveRandomDorne(instances: Drone[]): Drone {
        return instances[Math.floor(Math.random() * instances.length)];
    }

    async findAllByTournamentId(
        tournamentId: number,
        userId: number
    ): Promise<TournamentTimeListDto[]> {
        const tournamentTimes = await this.tournamentTimeRepository.find({
            where: { tournament: { id: tournamentId } },
        });

        const dtoPromises = tournamentTimes.map((tournamentTime) =>
            this.mapToDto(tournamentTime, userId)
        );

        return Promise.all(dtoPromises);
    }

    private async mapToDto(
        tournamentTime: TournamentTime,
        userId: number
    ): Promise<TournamentTimeListDto> {
        const dto = new TournamentTimeListDto();
        dto.id = tournamentTime.id;
        dto.startTime = tournamentTime.startTime;
        dto.places = tournamentTime.places;
        dto.reserved = tournamentTime.reserved;
        dto.isSelected =
            await this.userTournamentTimeService.isSelectedTournamentTime(
                userId,
                tournamentTime.id
            );
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
