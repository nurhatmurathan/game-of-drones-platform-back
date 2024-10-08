import { Controller, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CustomAuthGuard } from "./../../auth/guards";
import { UserTournamentTrainingsService } from "./user.tournament.trainings.service";

@Controller("user-tournament")
@ApiTags("User Tournament")
@ApiBearerAuth()
@UseGuards(CustomAuthGuard)
export class UserTournamentTrainingsController {
    constructor(private readonly userTournamentTrainingsService: UserTournamentTrainingsService) {}
}
