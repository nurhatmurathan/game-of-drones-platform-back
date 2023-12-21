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
    BadRequestException,
    NotFoundException,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { LigaService } from "./liga.service";
import { LigaCreateDto } from "./dto/liga.create.dto";
import { LigaListeDto } from "./dto/liga.list.dto";
import { LigaRetrieveDto } from "./dto/liga.retrieve.dto";
import { UtilService } from "../../utils/util.service";

@ApiTags("Liga")
@Controller("liga")
export class LigaController {
    constructor(
        private readonly ligaService: LigaService,
        private readonly utilService: UtilService
    ) { }

    @Get()
    @HttpCode(HttpStatus.ACCEPTED)
    findAll(): Promise<LigaListeDto[]> {
        return this.ligaService.findAll();
    }

    @Get("/:id")
    @HttpCode(HttpStatus.ACCEPTED)
    async findOne(
        @Param("id", ParseIntPipe) id: number,
        @Req() request
    ): Promise<LigaRetrieveDto> {
        const language = this.utilService.getLanguageFromHeaders(request);
        const ligaRetrieveDtoInstance = await this.ligaService.findOne(
            id,
            language
        );

        return {
            id: ligaRetrieveDtoInstance.id,
            name: ligaRetrieveDtoInstance.name,
            description: ligaRetrieveDtoInstance.description,
        };
    }

    @Post()
    @ApiBearerAuth()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() ligaCreateDto: LigaCreateDto): Promise<LigaCreateDto> {
        return this.ligaService.create(ligaCreateDto);
    }
}
