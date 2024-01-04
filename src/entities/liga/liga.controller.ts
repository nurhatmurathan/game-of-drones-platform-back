import {
    Req,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    HttpCode,
    HttpStatus,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { LigaService } from "./liga.service";
import { LigaCoverDto, LigaRetrieveDto } from "./dto/index";
import { UtilService } from "../../utils/util.service";

@ApiTags("Liga")
@Controller("liga")
export class LigaController {
    constructor(
        private readonly ligaService: LigaService,
        private readonly utilService: UtilService
    ) {}

    @Get()
    @HttpCode(HttpStatus.ACCEPTED)
    findAll(): Promise<LigaCoverDto[]> {
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
}
