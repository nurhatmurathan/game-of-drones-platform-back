import {
    Req,
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    HttpCode,
    HttpStatus,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { TournamentService } from "./tournament.service";
import { TournamentListDto } from "./dto/tournament.list.dto";
import { TournamentRetrieveDto } from "./dto/tournament.retrieve.dto";
import { TournamentCreateDto } from "./dto/tournament.create.dto";
import { AuthGuard } from "../../auth/auth.guard";
import { Tournament } from "./tournament.entity";

@ApiTags("Tournament")
@Controller("tournament")
export class TournamentController {
    constructor(
        private readonly tournamentService: TournamentService,
    ) { }

    @Get()
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.ACCEPTED)
    async findAll(@Req() request): Promise<TournamentListDto[]> {
        console.log("Step in Controller");
        const tournamentListDto = this.tournamentService.findLigaTournaments(
            request
        );
        return tournamentListDto;
    }

    @Get("/:id")
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.ACCEPTED)
    async findOne(
        @Param("id", ParseIntPipe) id: number,
        @Req() request
    ): Promise<TournamentRetrieveDto> {
        const tournamentRetrieveDto = this.tournamentService.findOne(
            id,
            request
        );
        return tournamentRetrieveDto;
    }


    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() tournamentData: TournamentCreateDto): Promise<Tournament> {
        return this.tournamentService.create(tournamentData)
    }


    // @Get("liga/:id")
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard)
    // @HttpCode(HttpStatus.ACCEPTED)
    // async getTournamentsByLigaId(
    //     @Param("id", ParseIntPipe) ligaId: number,
    //     @Req() request
    // ): Promise<TournamentListDto[]> {
    //     const tournamentListDto = this.tournamentService.findLigaTournaments(
    //         request
    //     );
    //     return tournamentListDto;

    // }
}
