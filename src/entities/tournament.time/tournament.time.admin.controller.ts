import { Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { CustomAuthGuard, IsAdminGuard } from "src/auth/guards";
import { TournamentTimeAdminRetrieveDto } from "./dto";
import { TournamentTimeAdminService } from "./tournament.time.admin.service";
import { TournamentTime } from "./tournament.time.entity";

@ApiTags("Tournament Time Admin")
@Controller("admin-tournament-time")
@UseGuards(CustomAuthGuard, IsAdminGuard)
@ApiBearerAuth()
export class TournamentTimeAdminController {
    constructor(private readonly tournamentTimeAdminService: TournamentTimeAdminService) {}

    @Get("/:id")
    @ApiOkResponse({ type: TournamentTimeAdminRetrieveDto })
    @HttpCode(HttpStatus.ACCEPTED)
    async retrieve(@Param("id", ParseIntPipe) id: number): Promise<TournamentTimeAdminRetrieveDto> {
        const instance: TournamentTime = await this.tournamentTimeAdminService.findOne(id, {
            userTournamentTimes: { user: true },
        });
        console.log(instance);
        const { userTournamentTimes, ...res } = instance;

        return {
            ...res,
            users: userTournamentTimes.map((userTournamentTimes) => {
                const { id, email, firstName, lastName } = userTournamentTimes.user;
                return { id, email, firstName, lastName };
            }),
        };
    }

    // @Put("/:id")
    // @ApiOkResponse({ type: TournamentTimeAdminRetrieveDto })
    // @HttpCode(HttpStatus.ACCEPTED)
    // async (@Param("id", ParseIntPipe) id: number, @Body() instance: TournamentTimeAdminRetrieveDto): Promise<TournamentTimeAdminRetrieveDto> {

    // }
}
