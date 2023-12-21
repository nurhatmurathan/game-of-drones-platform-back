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

import { UtilService } from "../../utils/util.service";
import { UserService } from "../user/user.service";
import { TournamentService } from "./tournament.service";
import { TournamentListDto } from "./dto/tournament.list.dto";
import { TournamentRetrieveDto } from "./dto/tournament.retrieve.dto";
import { AuthGuard } from "../../auth/auth.guard";

@ApiTags("Tournament")
@Controller("tournament")
export class TournamentController {
    constructor(
        private readonly tournamentService: TournamentService,
        private readonly utilService: UtilService,
        private readonly userService: UserService
    ) {}

    @Get()
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.ACCEPTED)
    async findAll(@Req() request): Promise<TournamentListDto[]> {
        const userInstance = await this.userService.findOneById(
            request.user.sub
        );
        const language = this.utilService.getLanguageFromHeaders(request);

        const tournamentListDto = this.tournamentService.findLigaTournaments(
            language,
            userInstance.liga.id
        );
        return tournamentListDto;
    }

    @Get("/:id")
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.ACCEPTED)
    async findOne(
        @Param("id", ParseIntPipe) id: number,
        @Req() request
    ): Promise<TournamentRetrieveDto> {
        const userInstance = await this.userService.findOneById(
            request.user.sub
        );
        const language = this.utilService.getLanguageFromHeaders(request);

        const tournamentRetrieveDto = this.tournamentService.findOne(
            id,
            language,
            userInstance.liga.id
        );
        return tournamentRetrieveDto;
    }
}
