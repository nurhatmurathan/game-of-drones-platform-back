import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CustomAuthGuard } from "../../auth/guards";
import { TournamentStartGameDto } from "./dto";
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
    async startTournament(@Request() req): Promise<any> {
        console.log(req.user);
        const data = await this.tournamentTimeService.assignUserToDron(
            req.user.sub
        );

        console.log(data);
        return {
            redirect: `${process.env.REDIRECT_TO_GAME_PLATFORM_URL}/${data.drone}/${data.jwt.access}`,
        };
    }


    @Post("validate-tournament")
    @ApiBearerAuth()
    @HttpCode(HttpStatus.ACCEPTED)
    @UseGuards(CustomAuthGuard)
    async validateTournament(
        @Body() startGameDto: TournamentStartGameDto,
        @Request() req,
    ): Promise<any> {
        return this.tournamentTimeService.tournamentStartedAndExistsValidator(
            startGameDto.id,
            req.user.sub
        );
    }
}
