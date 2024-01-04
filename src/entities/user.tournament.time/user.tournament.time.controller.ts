import { UserFutureTournamnetTimeDto } from "./dto/user.tournament.time.future.dto";
import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserTournamentTimeService } from "./user.tournament.time.service";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { UserTournamnetTimeCreateDto } from "./dto/user.tournament.time.create.dto";
import { request } from "http";

@ApiTags("UserTournamentTime")
@Controller("UserTournamentTime")
export class UserTournamentTimeController {
    constructor(
        private readonly usertournamenttimeService: UserTournamentTimeService
    ) {}

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() body: UserTournamnetTimeCreateDto, @Request() req) {
        return await this.usertournamenttimeService.create(
            req.user.sub,
            body.tournamentTimeId
        );
    }

    @ApiBearerAuth()
    @ApiResponse({
        status: 200,
        description: "Response",
        type: UserFutureTournamnetTimeDto,
        isArray: true,
    })
    @UseGuards(AuthGuard)
    @Get("tournaments/future")
    @HttpCode(HttpStatus.ACCEPTED)
    async userFutureTournamneTimes(@Request() req) {
        return await this.usertournamenttimeService.userFutureTournamentTimes(
            req
        );
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get("tournaments/pasted")
    @HttpCode(HttpStatus.ACCEPTED)
    async userPastedTournamneTimes(@Request() req) {
        return await this.usertournamenttimeService.userPastedTournamentTimes(
            req
        );
    }
}
