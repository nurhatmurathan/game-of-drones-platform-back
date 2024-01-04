import { AuthGuard, IsAdminGuard } from "./../../auth/guards/index";
import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Req,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { LigaAdminService } from "./liga.admin.service";
import { LigaListeDto } from "./dto/liga.list.dto";
import { LigaRetrieveAdminDto } from "./dto/liga.retrieve.admin.dto";
import { LigaCreateDto } from "./dto/liga.create.dto";

@ApiTags("Admin Liga")
@Controller("admin-liga")
@ApiBearerAuth()
@UseGuards(AuthGuard, IsAdminGuard)
export class LigaAdminController {
    constructor(private readonly ligaAdminService: LigaAdminService) {}

    @Get()
    @HttpCode(HttpStatus.ACCEPTED)
    findAll(): Promise<LigaListeDto[]> {
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
}
