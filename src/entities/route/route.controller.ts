import {
    Controller,
    Get,
    Headers,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { LanguagesEnum } from "../../common/enums";
import { RouteListDto, RouteRetrieveDto } from "./dto";
import { RouteService } from "./route.service";

@ApiTags("Route")
@Controller("route")
export class RouteController {
    constructor(private readonly routeSerevice: RouteService) { }

    @Get()
    @HttpCode(HttpStatus.ACCEPTED)
    async findAll(): Promise<RouteListDto[]> {
        return await this.routeSerevice.findAll();
    }

    @Get("/:id")
    @HttpCode(HttpStatus.ACCEPTED)
    async findOne(
        @Param("id", ParseIntPipe) id: number,
        @Headers("Accept-Language") language: LanguagesEnum
    ): Promise<RouteRetrieveDto> {
        return await this.routeSerevice.findOne(id, language);
    }
}
