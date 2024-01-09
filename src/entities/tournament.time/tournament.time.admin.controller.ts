import {
    Controller, UseGuards
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CustomAuthGuard, IsAdminGuard } from "src/auth/guards";
import { TournamentTimeAdminService } from "./tournament.time.admin.service";

@ApiTags("Tournament Time Admin")
@Controller("admin-tournament-time")
@UseGuards(CustomAuthGuard, IsAdminGuard)
export class TournamentTimeAdminController {
    constructor(
        private readonly tournamentTimeAdminService: TournamentTimeAdminService
    ) { }
}
