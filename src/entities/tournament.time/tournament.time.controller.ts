import {
    Controller
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { TournamentTimeService } from "./tournament.time.service";

@ApiTags("Tournament Time")
@Controller("tournament-time")
export class TournamentTimeController {
    constructor(
        private readonly tournamentTimeService: TournamentTimeService
    ) { }
}
