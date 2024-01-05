import {
    Req,
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    HttpCode,
    HttpStatus,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { TournamentTimeService } from "./tournament.time.service";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { TournamentTime } from "./tournament.time.entity";
import { TournamnetTimeCreateDto } from "./dto/tournament.time.create.dto";

@ApiTags("Tournament Time")
@Controller("tournament-time")
export class TournamentTimeController {
    constructor(
        private readonly tournamentTimeService: TournamentTimeService
    ) {}
}
