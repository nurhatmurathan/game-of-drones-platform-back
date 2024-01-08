import { Injectable, Req } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MoreThanOrEqual, Repository } from "typeorm";

import { UtilService } from "../../utils/util.service";
import { LigaService } from "../liga/liga.service";
import { RouteService } from "../route/route.service";
import { TournamentTimeService } from "../tournament.time/tournament.time.service";
import { UserService } from "../user/user.service";
import {
    TournamentListDto,
    TournamentRetrieveDto
} from "./dto";
import { Tournament } from "./tournament.entity";

@Injectable()
export class TournamentService {
    constructor(
        @InjectRepository(Tournament)
        private readonly tournamentRepository: Repository<Tournament>,
        private readonly tournamentTimeService: TournamentTimeService,
        private readonly routeService: RouteService,
        private readonly ligaService: LigaService,
        private readonly utilService: UtilService,
        private readonly userService: UserService
    ) { }

    async findAll(@Req() request): Promise<TournamentListDto[]> {
        console.log("Step in Service");

        const language = this.utilService.getLanguageFromHeaders(request);
        console.log("Language: " + language);

        const tournaments = await this.tournamentRepository.find({
            relations: ["route", "coverDescription"],
            where: {
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
        const language = this.utilService.getLanguageFromHeaders(request);

        const tournament = await this.tournamentRepository.findOne({
            relations: ["liga", "route", "description"],
            where: { id },
        });

        return this.mapTournamentToRetrieveDto(tournament, language);
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

        // if (tournament.liga)
        //     tournamentDto.liga = await this.ligaService.findOne(
        //         tournament.liga.id,
        //         language
        //     );

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
