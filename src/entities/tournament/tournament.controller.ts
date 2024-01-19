import {
    Controller,
    Get,
    Headers,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Request,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { CustomAuthGuard } from "../../auth/guards/auth.guard";
import { LanguagesEnum } from "../../common/enums";
import { TournamentListDto, TournamentRetrieveDto } from "./dto";
import { TournamentService } from "./tournament.service";

@ApiTags("Tournament")
@Controller("tournament")
export class TournamentController {
    constructor(private readonly tournamentService: TournamentService) {}

    @Get()
    @ApiBearerAuth()
    @UseGuards(CustomAuthGuard)
    @HttpCode(HttpStatus.ACCEPTED)
    async findAll(
        @Headers("Accept-Language") language: LanguagesEnum
    ): Promise<TournamentListDto[]> {
        console.log("Step in Controller");
        const tournamentListDto = this.tournamentService.findAll(language);
        return tournamentListDto;
    }

    @Get("/:id")
    @ApiBearerAuth()
    @UseGuards(CustomAuthGuard)
    @HttpCode(HttpStatus.ACCEPTED)
    async findOne(
        @Param("id", ParseIntPipe) id: number,
        @Headers("Accept-Language") language: LanguagesEnum,
        @Request() request
    ): Promise<TournamentRetrieveDto> {
        const tournamentRetrieveDto = this.tournamentService.findOne(
            id,
            language,
            request.user.sub
        );
        return tournamentRetrieveDto;
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
