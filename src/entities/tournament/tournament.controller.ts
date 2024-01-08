import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Req,
    UseGuards
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { CustomAuthGuard } from "../../auth/guards/auth.guard";
import {
    TournamentListDto,
    TournamentRetrieveDto
} from "./dto";
import { TournamentService } from "./tournament.service";

@ApiTags("Tournament")
@Controller("tournament")
export class TournamentController {
    constructor(private readonly tournamentService: TournamentService) { }

    @Get()
    @ApiBearerAuth()
    @UseGuards(CustomAuthGuard)
    @HttpCode(HttpStatus.ACCEPTED)
    async findAll(@Req() request): Promise<TournamentListDto[]> {
        console.log("Step in Controller");
        const tournamentListDto =
            this.tournamentService.findAll(request);
        return tournamentListDto;
    }

    @Get("/:id")
    @ApiBearerAuth()
    @UseGuards(CustomAuthGuard)
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
