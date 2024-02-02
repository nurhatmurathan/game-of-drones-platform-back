import {
    Body,
    Controller,
    Get,
    Headers,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Request,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { CustomAuthGuard } from "../../auth/guards/auth.guard";
import { LanguagesEnum } from "../../common/enums";
import { TournamentListDto, TournamentRegisterDto, TournamentRetrieveDto } from "./dto";
import { TournamentService } from "./tournament.service";

@ApiTags("Tournament")
@Controller("tournament")
@ApiBearerAuth()
@UseGuards(CustomAuthGuard)
export class TournamentController {
    constructor(private readonly tournamentService: TournamentService) { }

    @Get()
    @HttpCode(HttpStatus.ACCEPTED)
    async findAll(@Headers("Accept-Language") language: LanguagesEnum): Promise<TournamentListDto[]> {
        console.log("Step in Controller");
        return this.tournamentService.findAll(language);
    }

    @Get("/:id")
    @ApiOkResponse({ type: TournamentRetrieveDto })
    @HttpCode(HttpStatus.ACCEPTED)
    async findOne(
        @Param("id", ParseIntPipe) id: number,
        @Headers("Accept-Language") language: LanguagesEnum,
        @Request() request
    ): Promise<TournamentRetrieveDto> {
        const tournamentRetrieveDto = this.tournamentService.findOne(id, language, request.user.sub);
        return tournamentRetrieveDto;
    }

    @Post("select")
    @HttpCode(HttpStatus.CREATED)
    async registerUserToTournament(@Body() body: TournamentRegisterDto, @Request() req): Promise<any> {
        console.log("I'am in registerUserToTournament")
        return await this.tournamentService.registerUserToTournament(req.user.sub, body.tournamentId);
    }
}
