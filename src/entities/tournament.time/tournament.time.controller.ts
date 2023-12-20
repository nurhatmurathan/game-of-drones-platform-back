import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { TournamnetTimeCreateDto } from "./dto/tournament.time.create.dto";
import { TournamentTime } from "./tournament.time.entity";
import { TournamentTimeService } from "./tournament.time.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("TournamentTime")
@Controller("TournamentTime")
export class TournamentTimeController {
    constructor(
        private readonly tournamentTimeService: TournamentTimeService
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Body() tournamentTimeData: TournamnetTimeCreateDto
    ): Promise<TournamentTime> {
        return await this.tournamentTimeService.create(tournamentTimeData);
    }
}
