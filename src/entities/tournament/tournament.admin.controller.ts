import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UseGuards
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CustomAuthGuard, IsAdminGuard } from "./../../auth/guards";
import {
    TournamentAdminCreateDto,
    TournamentAdminListDto,
    TournamentAdminRetrieveDto,
    TournamentAdminUpdateDto
} from "./dto";
import { TournamentAdminService } from "./tournament.admin.service";


@ApiBearerAuth()
@ApiTags("Admin Tournament")
@Controller("admin-tournament")
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
    create(@Body() createData: TournamentAdminCreateDto): Promise<TournamentAdminRetrieveDto> {
        return this.tournamentAdminService.create(createData);
    }


    @Put("/:id")
    @HttpCode(HttpStatus.ACCEPTED)
    update(
        @Param("id", ParseIntPipe) id: number,
        @Body() updateData: TournamentAdminUpdateDto
    ): Promise<TournamentAdminRetrieveDto> {
        return this.tournamentAdminService.update(id, updateData);
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param("id", ParseIntPipe) id: number) {
        return this.tournamentAdminService.delete(id);
    }
}
