import { Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { UserCoverDto } from "../user/dto";
import { User } from "../user/user.entity";
import { CustomAuthGuard, IsAdminGuard } from "./../../auth/guards";
import { UserTournamentTrainingsAdminService } from "./user.tournament.trainings.admin.service";
import { UserTournamentTrainings } from "./user.tournament.trainings.entity";

@Controller("user-tournament-admin")
@ApiTags("User Tournament Admin")
@ApiBearerAuth()
@UseGuards(CustomAuthGuard, IsAdminGuard)
export class UserTournamentTrainingsAdminController {
    constructor(private readonly userTournamentTrainingsAdminService: UserTournamentTrainingsAdminService) {}

    @Get("/:tournamentId")
    @ApiOkResponse({ type: UserCoverDto, isArray: true })
    @HttpCode(HttpStatus.ACCEPTED)
    async findTournamentUsers(
        @Param("tournamentId", ParseIntPipe) tournamentId: number
    ): Promise<UserCoverDto[]> {
        const instances: UserTournamentTrainings[] =
            await this.userTournamentTrainingsAdminService.getTournamentUsers(tournamentId);

        return instances.map((instance) => {
            const { id, email, firstName, lastName }: User = instance.user;
            return { id, email, firstName, lastName };
        });
    }
}
