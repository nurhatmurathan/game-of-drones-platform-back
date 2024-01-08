import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    UseGuards
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CustomAuthGuard, IsAdminGuard } from "./../../auth/guards";
import { TournamentAdminCreateDto, TournamentAdminListDto, TournamentAdminRetrieveDto } from "./dto";
import { TournamentAdminService } from "./tournament.admin.service";
import { Tournament } from "./tournament.entity";


@ApiTags("Admin Tournament")
@Controller("admin-tournament")
@ApiBearerAuth()
@UseGuards(CustomAuthGuard, IsAdminGuard)
export class TournamentAdminController {
    constructor(
        private readonly tournamentAdminService: TournamentAdminService
    ) { }

    @Get()
    @HttpCode(HttpStatus.ACCEPTED)
    async findAll(): Promise<TournamentAdminListDto[]> {
        return await this.tournamentAdminService.findAll();
    }

    @Get("/:id")
    @HttpCode(HttpStatus.ACCEPTED)
    async findOne(
        @Param("id", ParseIntPipe) id: number
    ): Promise<TournamentAdminRetrieveDto> {
        return await this.tournamentAdminService.findOne(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() tournamentDate: TournamentAdminCreateDto): Promise<Tournament> {
        return this.tournamentAdminService.create(tournamentDate);
    }
}
