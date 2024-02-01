import {
    Body,
    Controller,
    Get,
    Headers,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Req,
    Request,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CustomAuthGuard } from "src/auth/guards/auth.guard";
import { LanguagesEnum } from "src/common/enums";
import { TrainingIdDto } from "../training/dto/user/training.tournamenttime.dto";
import { UserFutureTournamnetTimeDto } from "./dto";
import { UserTournamentTimeService } from "./user.tournament.time.service";

@Controller("user-tournament-time")
@ApiTags("UserTournamentTime")
@ApiBearerAuth()
@UseGuards(CustomAuthGuard)
export class UserTournamentTimeController {
    constructor(private readonly usertournamenttimeService: UserTournamentTimeService) {}

    @ApiResponse({
        status: 200,
        description: "Response",
        type: UserFutureTournamnetTimeDto,
        isArray: true,
    })
    @Get("tournaments/future")
    @HttpCode(HttpStatus.ACCEPTED)
    async userFutureTournamentTimes(@Req() request, @Headers("Accept-Language") language: LanguagesEnum) {
        return await this.usertournamenttimeService.userFutureTournamentTimes(language, request.user.sub);
    }

    @Get("tournaments/pasted")
    @HttpCode(HttpStatus.ACCEPTED)
    async userPastedTournamentTimes(@Req() request, @Headers("Accept-Language") language: LanguagesEnum) {
        return await this.usertournamenttimeService.userPastedTournamentTimes(language, request.user.sub);
    }

    @Get("tournaments/passed")
    @HttpCode(HttpStatus.ACCEPTED)
    async userPassedTournamentTimes(@Req() request, @Headers("Accept-Language") language: LanguagesEnum) {
        return await this.usertournamenttimeService.userPastedTournamentTimes(language, request.user.sub);
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
