import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { MultilingualtextService } from "../multilingualtext/multilingualtext.service";
import { RouteAdminService } from "../route/route.admin.service";
import { TournamentTimeAdminService } from "../tournament.time/tournament.time.admin.service";
import { TournamentAdminCreateDto, TournamentAdminListDto, TournamentAdminRetrieveDto } from "./dto";
import { Tournament } from "./tournament.entity";


@Injectable()
export class TournamentAdminService {
    constructor(
        @InjectRepository(Tournament)
        private readonly tournamentRepository: Repository<Tournament>,
        private readonly tournamentTimeAdminService: TournamentTimeAdminService,
        private readonly multilingualTextService: MultilingualtextService,
        private readonly routeAdminService: RouteAdminService
    ) { }

    async findAll(): Promise<TournamentAdminListDto[]> {
        return await this.tournamentRepository.find({
            relations: ["route", "description"]
        });
    }

    async findOne(id: number): Promise<TournamentAdminRetrieveDto> {
        return await this.tournamentRepository.findOne({
            where: { id },
            relations: ["route", "description", "coverDescription", "tournamentTimes"]

        });
    }

    async create(createDto: TournamentAdminCreateDto): Promise<Tournament> {
        const { description, coverDescription, routeId, tournamentTimes, ...tournamentData } = createDto;

        const routeInstance = await this.routeAdminService.findOneInstance(routeId);
        const descriptionEntity = await this.multilingualTextService.create(description);
        const coverDescriptionEntity = await this.multilingualTextService.create(coverDescription);

        const tournamentInstance = this.tournamentRepository.create({
            ...tournamentData,
            description: descriptionEntity,
            coverDescription: coverDescriptionEntity,
            route: routeInstance,
        });

        const savedTournament = await this.tournamentRepository.save(tournamentInstance);

        const tournamentTimeInstances = await Promise.all(
            tournamentTimes.map(async (tournamentTime) => {
                tournamentTime.tournament = savedTournament;

                return this.tournamentTimeAdminService.create(tournamentTime);
            })
        );

        savedTournament.tournamentTimes = tournamentTimeInstances;
        return this.tournamentRepository.save(savedTournament);
    }
}
