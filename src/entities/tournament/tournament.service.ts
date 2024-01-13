import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MoreThanOrEqual, Repository } from "typeorm";

import { LanguagesEnum } from "src/common/enums";
import { UtilService } from "../../utils/util.service";
import { RouteService } from "../route/route.service";
import { TournamentTimeService } from "../tournament.time/tournament.time.service";
import { TournamentListDto, TournamentRetrieveDto } from "./dto";
import { Tournament } from "./tournament.entity";

@Injectable()
export class TournamentService {
    constructor(
        @InjectRepository(Tournament)
        private readonly tournamentRepository: Repository<Tournament>,
        private readonly tournamentTimeService: TournamentTimeService,
        private readonly routeService: RouteService,
        private readonly utilService: UtilService
    ) {}

    async findAll(language: LanguagesEnum): Promise<TournamentListDto[]> {
        console.log("Step in Service");

        const languageType = this.utilService.getLanguage(language);
        console.log("Language: " + languageType);

        const tournaments = await this.tournamentRepository.find({
            relations: ["route", "coverDescription"],
            where: {
                startDate: MoreThanOrEqual(Date.now()),
            },
        });

        console.log(tournaments);

        const tournamentListDtos = await Promise.all(
            tournaments.map(async (tournament) =>
                this.mapTournamentToListDto(tournament, language, languageType)
            )
        );

        console.log("Exit from service");
        return tournamentListDtos;
    }

    async findOne(
        id: number,
        language: LanguagesEnum
    ): Promise<TournamentRetrieveDto> {
        const languageType = this.utilService.getLanguage(language);

        const tournament = await this.tournamentRepository.findOne({
            relations: ["route", "description"],
            where: { id },
        });

        return this.mapTournamentToRetrieveDto(
            tournament,
            language,
            languageType
        );
    }

    private async mapTournamentToListDto(
        tournament: Tournament,
        language: LanguagesEnum,
        languageType: string
    ): Promise<TournamentListDto> {
        const tournamentDto = new TournamentListDto();
        tournamentDto.id = tournament.id;
        tournamentDto.name = tournament.name;
        tournamentDto.description = tournament.coverDescription[languageType];
        tournamentDto.startDate = tournament.startDate;
        tournamentDto.price = tournament.price;

        if (tournament.route) {
            tournamentDto.route = await this.routeService.findOne(
                tournament.route.id,
                language
            );
        }

        return tournamentDto;
    }

    private async mapTournamentToRetrieveDto(
        tournament: Tournament,
        language: LanguagesEnum,
        languageType: string
    ): Promise<TournamentRetrieveDto> {
        const tournamentDto = new TournamentRetrieveDto();
        tournamentDto.id = tournament.id;
        tournamentDto.name = tournament.name;
        tournamentDto.description = tournament.description[languageType];
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
