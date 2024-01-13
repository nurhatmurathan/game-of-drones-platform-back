import {
    Controller, Get, Req, Res, UseGuards
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CustomAuthGuard } from "../../auth/guards";
import { TournamentTimeService } from "./tournament.time.service";

@ApiTags("Tournament Time")
@Controller("tournament-time")
export class TournamentTimeController {
    constructor(
        private readonly tournamentTimeService: TournamentTimeService
    ) { }

    @Get("start-game")
    @ApiBearerAuth()
    @UseGuards(CustomAuthGuard)
    async startTournament(@Req() req, @Res() res): Promise<any> {
        console.log(req.user);
        const data = await this.tournamentTimeService.assignUserToDron(req.user.sub);

        console.log(data);
        return res.redirect(`${process.env.REDIRECT_TO_GAME_PLATFORM_URL}/${data.drone}/${data.jwt.access}`)
    }
}
