import {
    Controller,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Request,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CustomAuthGuard } from "./../../auth/guards";
import { UserTournamentTrainingsService } from "./user.tournament.trainings.service";

@Controller("user-tournament-trainings")
@ApiTags("User Tournament Trainings")
@ApiBearerAuth()
@UseGuards(CustomAuthGuard)
export class UserTournamentTrainingsController {
    constructor(private readonly userTournamentTrainingsService: UserTournamentTrainingsService) {}

    @Post("/:tournamentId/add-training/:trainingId")
    @HttpCode(HttpStatus.ACCEPTED)
    async addTraining(
        @Param("tournamentId", ParseIntPipe) tournamentId: number,
        @Param("trainingId", ParseIntPipe) trainingId: number,
        @Request() request
    ) {
        return this.userTournamentTrainingsService.addTraining(request.user.sub, tournamentId, trainingId);
    }
}
