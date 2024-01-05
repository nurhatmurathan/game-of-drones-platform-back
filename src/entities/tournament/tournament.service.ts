import { Injectable, Req } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, MoreThanOrEqual } from "typeorm";

import { Tournament } from "./tournament.entity";
import { TournamentListDto } from "./dto/tournament.list.dto";
import { TournamentRetrieveDto } from "./dto/tournament.retrieve.dto";
import { TournamentCreateDto } from "./dto/tournament.create.dto";
import { LigaService } from "../liga/liga.service";
import { RouteService } from "../route/route.service";
import { TournamentTimeService } from "../tournament.time/tournament.time.service";
import { UtilService } from "../../utils/util.service";
import { UserService } from "../user/user.service";
import { MultilingualtextService } from "../multilingualtext/multilingualtext.service";

@Injectable()
export class TournamentService {
    constructor(
        @InjectRepository(Tournament)
        private readonly tournamentRepository: Repository<Tournament>,
        private readonly tournamentTimeService: TournamentTimeService,
        private readonly multilingualTextService: MultilingualtextService,
        private readonly routeService: RouteService,
        private readonly ligaService: LigaService,
        private readonly utilService: UtilService,
        private readonly userService: UserService
    ) {}

    async findLigaTournaments(@Req() request): Promise<TournamentListDto[]> {
        console.log("Step in Service");
        console.log("User: " + request.user.sub);

        const userInstance = await this.userService.findOneById(
            request.user.sub
        );
        const language = this.utilService.getLanguageFromHeaders(request);

        console.log("User liga: " + userInstance.liga.id);
        console.log("Language: " + language);

        const tournaments = await this.tournamentRepository.find({
            relations: ["liga", "route", "coverDescription"],
            where: {
                liga: { id: userInstance.liga.id },
                startDate: MoreThanOrEqual(Date.now()),
            },
        });

        console.log(tournaments);

        const tournamentListDtos = await Promise.all(
            tournaments.map(async (tournament) =>
                this.mapTournamentToListDto(tournament, language)
            )
        );

        console.log("Exit from service");
        return tournamentListDtos;
    }

    async findOne(id: number, @Req() request): Promise<TournamentRetrieveDto> {
        const userInstance = await this.userService.findOneById(
            request.user.sub
        );
        const language = this.utilService.getLanguageFromHeaders(request);

        const tournament = await this.tournamentRepository.findOne({
            relations: ["liga", "route", "description"],
            where: { id: id, liga: { id: userInstance.liga.id } },
        });

        return this.mapTournamentToRetrieveDto(tournament, language);
    }

    async create(
        createTournamentDto: TournamentCreateDto
    ): Promise<Tournament> {
        const {
            ligaId,
            routeId,
            description,
            coverDescription,
            ...tournament
        } = createTournamentDto;

        const ligaInstance = await this.ligaService.getInstance(ligaId);
        const routeInstance = await this.routeService.getInstance(routeId);
        const multilingualTextDescriptionInstance =
            await this.multilingualTextService.create(description);
        const multilingualTextCoverDescriptionInstance =
            await this.multilingualTextService.create(coverDescription);

        const newTournaments = await this.tournamentRepository.create({
            ...tournament,
            description: multilingualTextDescriptionInstance,
            coverDescription: multilingualTextCoverDescriptionInstance,
            liga: ligaInstance,
            route: routeInstance,
        });

        return this.tournamentRepository.save(newTournaments);
    }

    private async mapTournamentToListDto(
        tournament: Tournament,
        language: string
    ): Promise<TournamentListDto> {
        console.log("Step in DTO function 1");
        const tournamentDto = new TournamentListDto();
        console.log("Step in DTO function 1 sub 2");
        tournamentDto.id = tournament.id;
        console.log("Step in DTO function 1 sub 3");
        tournamentDto.name = tournament.name;
        console.log("Step in DTO function 1 sub 4");
        tournamentDto.description = tournament.coverDescription[language];
        console.log("Step in DTO function 1 sub 5");
        tournamentDto.startDate = tournament.startDate;
        console.log("Step in DTO function 1 sub 5");
        tournamentDto.price = tournament.price;

        console.log("Step in DTO function 2");
        if (tournament.route) {
            tournamentDto.route = await this.routeService.findOne(
                tournament.route.id,
                language
            );
        }

        console.log("Step in function 4");
        return tournamentDto;
    }

    private async mapTournamentToRetrieveDto(
        tournament: Tournament,
        language: string
    ): Promise<TournamentRetrieveDto> {
        const tournamentDto = new TournamentRetrieveDto();
        tournamentDto.id = tournament.id;
        tournamentDto.name = tournament.name;
        tournamentDto.description = tournament.description[language];
        tournamentDto.startDate = tournament.startDate;
        tournamentDto.price = tournament.price;

        if (tournament.liga)
            tournamentDto.liga = await this.ligaService.findOne(
                tournament.liga.id,
                language
            );

        if (tournament.route)
            tournamentDto.route = await this.routeService.findOne(
                tournament.route.id,
                language
            );

        tournamentDto.tournamentTimes =
            await this.tournamentTimeService.findAllByTournamentId(
                tournament.id
            );
        return tournamentDto;
    }
}
