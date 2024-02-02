import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CustomAuthGuard } from "../../auth/guards";
import { TournamentStartGameDto, TournamentTimeRegisterDto } from "./dto";
import { TournamentTimeService } from "./tournament.time.service";

@ApiTags("Tournament Time")
@Controller("tournament-time")
export class TournamentTimeController {
    constructor(
        private readonly tournamentTimeService: TournamentTimeService
    ) { }

    @Post("register")
    @HttpCode(HttpStatus.CREATED)
    async registerUserToTournamentTime(
        @Body() body: TournamentTimeRegisterDto,
        @Request() req
    ): Promise<any> {
        return await this.tournamentTimeService.registerUserToTournamentTime(
            req.user.sub,
            body.tournamentTimeId
        );
    }

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
