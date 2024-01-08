import {
    Controller
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { TournamentTimeAdminService } from "./tournament.time.admin.service";

@ApiTags("Tournament Time Admin")
@Controller("admin-tournament-time")
export class TournamentTimeAdminController {
    constructor(
        private readonly tournamentTimeAdminService: TournamentTimeAdminService
    ) { }
}
