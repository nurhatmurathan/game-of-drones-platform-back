import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserTournamentTrainingsAdminService } from "./../user.tournament.trainings/user.tournament.trainings.admin.service";

import { MultilingualtextService } from "../multilingualtext/multilingualtext.service";
import { RouteAdminService } from "../route/route.admin.service";
import { TournamentTimeAdminService } from "../tournament.time/tournament.time.admin.service";
import {
    TournamentAdminCreateDto,
    TournamentAdminListDto,
    TournamentAdminRetrieveDto,
    TournamentAdminUpdateDto,
} from "./dto";
import { Tournament } from "./tournament.entity";

@Injectable()
export class TournamentAdminService {
    constructor(
        @InjectRepository(Tournament)
        private readonly tournamentRepository: Repository<Tournament>,
        private readonly tournamentTimeAdminService: TournamentTimeAdminService,
        private readonly multilingualTextService: MultilingualtextService,
        private readonly routeAdminService: RouteAdminService,
        private readonly userTournamentTrainingsAdminService: UserTournamentTrainingsAdminService
    ) {}

    async findAll(): Promise<TournamentAdminListDto[]> {
        return await this.tournamentRepository.find({
            relations: {
                route: true,
                description: true,
            },
        });
    }

    async findOne(id: number): Promise<TournamentAdminRetrieveDto> {
        const instance = await this.tournamentRepository.findOne({
            where: { id },
            relations: {
                route: true,
                description: true,
                coverDescription: true,
            },
        });
        this.isExists(instance, id);

        return this.mapEntityToRetrieveDto(instance);
    }

    async create(createData: TournamentAdminCreateDto): Promise<TournamentAdminRetrieveDto> {
        const { description, coverDescription, routeId, tournamentTimes, ...tournamentData } = createData;

        const routeInstance = await this.routeAdminService.findOne(routeId);
        const descriptionEntity = await this.multilingualTextService.create(description);
        const coverDescriptionEntity = await this.multilingualTextService.create(coverDescription);

        const instance = this.tournamentRepository.create({
            ...tournamentData,
            description: descriptionEntity,
            coverDescription: coverDescriptionEntity,
            route: routeInstance,
        });

        const createdInstance = await this.tournamentRepository.save(instance);
        const tournamentTimeInstances = await Promise.all(
            tournamentTimes.map(async (tournamentTime) => {
                tournamentTime.tournament = createdInstance;

                return this.tournamentTimeAdminService.create(tournamentTime);
            })
        );

        createdInstance.tournamentTimes = tournamentTimeInstances;
        const savedInstance = await this.tournamentRepository.save(createdInstance);

        return this.mapEntityToRetrieveDto(savedInstance);
    }

    async update(id: number, updateData: TournamentAdminUpdateDto): Promise<TournamentAdminRetrieveDto> {
        const instance = await this.tournamentRepository.findOne({
            where: { id },
            relations: { tournamentTimes: true },
        });
        this.isExists(instance, id);

        const { description, coverDescription, tournamentTimes, ...tournamentData } = updateData;

        updateData.description = await this.multilingualTextService.update(description);
        updateData.coverDescription = await this.multilingualTextService.update(coverDescription);

        const tournamentTimeInstance = await Promise.all(
            tournamentTimes.map(async (tournamentTime) => {
                const id = tournamentTime.id;
                if (!id) {
                    tournamentTime.tournament = instance;
                    return this.tournamentTimeAdminService.create(tournamentTime);
                }

                const tournamentTimeinstance = await this.tournamentTimeAdminService.findOne(id);
                if (tournamentTimeinstance) {
                    Object.assign(tournamentTimeinstance, tournamentTime);
                    return this.tournamentTimeAdminService.save(tournamentTimeinstance);
                }
            })
        );

        updateData.tournamentTimes = tournamentTimeInstance;
        Object.assign(instance, updateData);

        const updatedInstance = await this.tournamentRepository.save(instance);
        return this.mapEntityToRetrieveDto(updatedInstance);
    }

    async delete(id: number): Promise<any> {
        const instance = await this.tournamentRepository.findOne({
            where: { id },
            relations: {
                description: true,
                coverDescription: true,
            },
        });
        this.isExists(instance, id);

        const descriptionId = instance.description.id;
        const coverDescriptionId = instance.coverDescription.id;

        await this.tournamentRepository.remove(instance);
        await this.multilingualTextService.delete(descriptionId);
        await this.multilingualTextService.delete(coverDescriptionId);

        return { message: "OK!" };
    }

    private async mapEntityToRetrieveDto(entity: Tournament): Promise<TournamentAdminRetrieveDto> {
        const tournamentTimes = await this.tournamentTimeAdminService.findAllByTournamentId(entity.id);

        return {
            id: entity.id,
            name: entity.name,
            description: entity.description,
            coverDescription: entity.coverDescription,
            startDate: entity.startDate,
            price: entity.price,
            route: entity.route,
            tournamentTimes: tournamentTimes,
        };
    }

    // async tournamentUsers(tournamentId: number){
    //     const userTournaments: UserTournamentTrainings = await this.userTournamentTrainingsAdminService.getTournamentUsers(tournamentId);
    // }

    private isExists(instance: Tournament, id: number): void {
        if (!instance) throw new NotFoundException(`Tournament with id ${id} not found`);
    }
}
