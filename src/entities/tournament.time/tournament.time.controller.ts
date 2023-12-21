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
import { TournamentTimeService } from "./tournament.time.service";
import { AuthGuard } from "src/auth/auth.guard";
import { TournamentTime } from "./tournament.time.entity";
import { TournamnetTimeCreateDto } from './dto/tournament.time.create.dto';

@ApiTags('Tournament Time')
@Controller("tournament-time")
export class TournamentTimeController {
    constructor(
        private readonly tournamentTimeService: TournamentTimeService
    ) { }


    // @Post("/:id/reserve")
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard)
    // @HttpCode(HttpStatus.ACCEPTED)
    // async reservePlaceForTournaments(@Param('id', ParseIntPipe) id: number, @Req() request): Promise<TournamentTime | null> {
    //     const userId = request.user.sub;
    //     return this.tournamentTimeService.reservePlaceForTournaments(id, userId);
    // }


    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Body() tournamentTimeData: TournamnetTimeCreateDto
    ): Promise<TournamentTime> {
        return await this.tournamentTimeService.create(tournamentTimeData);
    }
}
