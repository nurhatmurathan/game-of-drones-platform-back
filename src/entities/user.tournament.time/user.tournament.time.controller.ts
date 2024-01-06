import { UserFutureTournamnetTimeDto } from "./dto/user.tournament.time.future.dto";
import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Request,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserTournamentTimeService } from "./user.tournament.time.service";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { UserTournamnetTimeCreateDto } from "./dto/user.tournament.time.create.dto";
import { request } from "http";
import { TrainingIdDto } from "../training/dto/training.turnamenttime.dto";

@ApiTags("UserTournamentTime")
@Controller("UserTournamentTime")
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class UserTournamentTimeController {
    constructor(
        private readonly usertournamenttimeService: UserTournamentTimeService
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() body: UserTournamnetTimeCreateDto, @Request() req) {
        return await this.usertournamenttimeService.create(
            req.user.sub,
            body.tournamentTimeId
        );
    }

    @ApiResponse({
        status: 200,
        description: "Response",
        type: UserFutureTournamnetTimeDto,
        isArray: true,
    })
    @Get("tournaments/future")
    @HttpCode(HttpStatus.ACCEPTED)
    async userFutureTournamneTimes(@Request() request) {
        return await this.usertournamenttimeService.userFutureTournamentTimes(
            request
        );
    }

    @Get("tournaments/pasted")
    @HttpCode(HttpStatus.ACCEPTED)
    async userPastedTournamneTimes(@Request() request) {
        return await this.usertournamenttimeService.userPastedTournamentTimes(
            request
        );
    }

    @Post("/:tournamentTimeId/add-training")
    @HttpCode(HttpStatus.CREATED)
    async addTraining(
        @Param("tournamentTimeId", ParseIntPipe) tournamentTimeId: number,
        @Body() trainindData: TrainingIdDto,
        @Request() request
    ) {
        return this.usertournamenttimeService.addTraining(
            request.user.sub,
            tournamentTimeId,
            trainindData.trainingId
        );
    }
}
