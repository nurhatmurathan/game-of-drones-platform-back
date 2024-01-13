import {
    Controller, Get, Req, Res
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { TournamentStartGameDto } from "./dto";
import { TournamentTimeService } from "./tournament.time.service";

@ApiTags("Tournament Time")
@Controller("tournament-time")
export class TournamentTimeController {
    constructor(
        private readonly tournamentTimeService: TournamentTimeService
    ) { }

    @Get("start-game")
    async startTournament(tournamentStartGameDto: TournamentStartGameDto, @Req() req, @Res() res) {
        const data = await this.tournamentTimeService.assignUserToDron(tournamentStartGameDto, req.user.sub);

        return res.redirect(`${process.env.REDIRECT_TO_GAME_PLATFORM_URL}/${data.drone.id}/${data.jwt.access}`)
    }
}
