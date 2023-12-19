import { UserFutureTournamnetDto } from "./dto/user.tournament.time.future.dto";
import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserTournamentTimeService } from "./user.tournament.time.service";
import { AuthGuard } from "src/auth/auth.guard";

@ApiTags("UserTournamentTime")
@Controller("UserTournamentTime")
export class UserTournamentTimeController {
    constructor(
        private readonly usertournamenttimeService: UserTournamentTimeService
    ) {}

    @ApiBearerAuth()
    @ApiResponse({
        status: 200,
        description: "Response",
        type: UserFutureTournamnetDto,
        isArray: true,
    })
    @UseGuards(AuthGuard)
    @Get("tournaments/future")
    userFutureTournamneTimes(@Request() req) {
        return this.usertournamenttimeService.userFutureTournamentTimes(
            req.user.sub
        );
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get("tournaments/pasted")
    userPastedTournamneTimes(@Request() req) {
        return this.usertournamenttimeService.userPastedTournamentTimes(
            req.user.sub
        );
    }
}
