import { AuthGuard, IsAdminGuard } from "./../../auth/guards";
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Put,
    Req,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { LigaAdminService } from "./liga.admin.service";
import { LigaCoverDto, LigaRetrieveAdminDto, LigaCreateDto } from "./dto";
import { LigaUpdateDto } from "./dto/liga.update.admin.dto";

@ApiTags("Admin Liga")
@Controller("admin-liga")
@ApiBearerAuth()
@UseGuards(AuthGuard, IsAdminGuard)
export class LigaAdminController {
    constructor(private readonly ligaAdminService: LigaAdminService) { }

    @Get()
    @HttpCode(HttpStatus.ACCEPTED)
    findAll(): Promise<LigaCoverDto[]> {
        return this.ligaAdminService.findAll();
    }

    @Get("/:id")
    @HttpCode(HttpStatus.ACCEPTED)
    async findOne(
        @Param("id", ParseIntPipe) id: number
    ): Promise<LigaRetrieveAdminDto> {
        return this.ligaAdminService.findOne(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() ligaCreateDto: LigaCreateDto): Promise<LigaCreateDto> {
        return this.ligaAdminService.create(ligaCreateDto);
    }

    @Put("/:id")
    @HttpCode(HttpStatus.ACCEPTED)
    async update(
        @Param("id", ParseIntPipe) id: number,
        @Body() ligaUpdateDto: LigaUpdateDto
    ): Promise<LigaRetrieveAdminDto> {
        return this.ligaAdminService.update(id, ligaUpdateDto);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.ligaAdminService.delete(id);
    }

}
