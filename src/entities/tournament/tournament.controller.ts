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
  } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Request } from 'express';

import { GetLanguageFromHeaderService } from '../../utils/util.getlanguage.service';
import { TournamentService } from './tournament.service';
import { TournamentListDto } from './dto/tournament.list.dto';


@ApiTags('Tournament')
@Controller('tournament')
export class TournamentController {
    constructor(
        private readonly tournamentService: TournamentService,
        private readonly getLanguageFromHeaderService: GetLanguageFromHeaderService
    ) {}

    @Get()
    @HttpCode(HttpStatus.ACCEPTED)
    async findAll(@Req() request: Request): Promise<TournamentListDto[]> {
        const language = this.getLanguageFromHeaderService.getLanguageFromHeaders(request);
        const tournamentListDto = this.tournamentService.findAll(language);

        return tournamentListDto;
    }

}
