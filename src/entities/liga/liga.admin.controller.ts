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
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { CustomAuthGuard, IsAdminGuard } from "./../../auth/guards";
import { LigaCoverDto, LigaCreateDto, LigaRetrieveAdminDto } from "./dto";
import { LigaUpdateDto } from "./dto/liga.update.admin.dto";
import { LigaAdminService } from "./liga.admin.service";

// @ApiTags("Admin Liga")
@Controller("admin-liga")
@ApiBearerAuth()
@UseGuards(CustomAuthGuard, IsAdminGuard)
export class LigaAdminController {
    constructor(private readonly ligaAdminService: LigaAdminService) {}

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

    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param("id", ParseIntPipe) id: number) {
        return this.ligaAdminService.delete(id);
    }
}
