import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Put,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { CustomAuthGuard, IsAdminGuard } from "src/auth/guards";
import { UserTournamentTimeAdminService } from "../user.tournament.time/user.tournament.time.admin.service";
import { UserTournamentTime } from "../user.tournament.time/user.tournament.time.entity";
import { TournamentTimeAdminRetrieveDto } from "./dto";
import { TournamentTimeAdminService } from "./tournament.time.admin.service";
import { TournamentTime } from "./tournament.time.entity";

@ApiTags("Tournament Time Admin")
@Controller("admin-tournament-time")
@UseGuards(CustomAuthGuard, IsAdminGuard)
@ApiBearerAuth()
export class TournamentTimeAdminController {
    constructor(
        private readonly tournamentTimeAdminService: TournamentTimeAdminService,
        private readonly userTournamentTimeAdminService: UserTournamentTimeAdminService
    ) {}

    @Get("/:id")
    @ApiOkResponse({ type: TournamentTimeAdminRetrieveDto })
    @HttpCode(HttpStatus.ACCEPTED)
    async retrieve(@Param("id", ParseIntPipe) id: number): Promise<TournamentTimeAdminRetrieveDto> {
        const instance: TournamentTime = await this.tournamentTimeAdminService.findOne(id, {
            userTournamentTimes: { user: true },
        });
        console.log(instance);
        return this.mapInstanceToRetrieveDto(instance);
    }

    @Put("/:id")
    @ApiOkResponse({ type: TournamentTimeAdminRetrieveDto })
    @HttpCode(HttpStatus.ACCEPTED)
    async put(
        @Param("id", ParseIntPipe) id: number,
        @Body() instance: TournamentTimeAdminRetrieveDto
    ): Promise<TournamentTimeAdminRetrieveDto> {
        const { startTime, users } = instance;

        const tournamentTime: TournamentTime = await this.tournamentTimeAdminService.saveV2(id, startTime);

        const updatedUsers: UserTournamentTime[] =
            await this.userTournamentTimeAdminService.updateTournamentTimeUsers(id, users);

        tournamentTime.userTournamentTimes = updatedUsers;

        return this.mapInstanceToRetrieveDto(tournamentTime);
    }

    private mapInstanceToRetrieveDto(instance: TournamentTime): TournamentTimeAdminRetrieveDto {
        const { userTournamentTimes, ...res } = instance;

        return {
            ...res,
            users: userTournamentTimes.map((userTournamentTimes) => {
                const { id, email, firstName, lastName } = userTournamentTimes.user;
                return { id, email, firstName, lastName };
            }),
        };
    }
}
