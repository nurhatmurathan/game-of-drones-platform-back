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
    Post,
    Put,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { RouteAdminService } from "./route.admin.service";
import { RouteListDto, RouteCreateDto, RouteRetrieveAdminDto, RouteUpdateDto } from "./dto";

@ApiTags("Admin Route")
@Controller("admin-route")
@ApiBearerAuth()
@UseGuards(AuthGuard, IsAdminGuard)
export class RouteAdminController {
    constructor(private readonly routeAdminSerevice: RouteAdminService) { }

    @Get()
    @HttpCode(HttpStatus.ACCEPTED)
    async findAll(): Promise<RouteListDto[]> {
        return await this.routeAdminSerevice.findAll();
    }

    @Get("/:id")
    @HttpCode(HttpStatus.ACCEPTED)
    async findOne(
        @Param("id", ParseIntPipe) id: number
    ): Promise<RouteRetrieveAdminDto> {
        return await this.routeAdminSerevice.findOne(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() routeDate: RouteCreateDto): Promise<RouteCreateDto> {
        return this.routeAdminSerevice.create(routeDate);
    }

    @Put("/:id")
    @HttpCode(HttpStatus.ACCEPTED)
    async update(
        @Param("id", ParseIntPipe) id: number,
        @Body() routeUpdateDto: RouteUpdateDto
    ): Promise<RouteRetrieveAdminDto> {
        return this.routeAdminSerevice.update(id, routeUpdateDto);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.routeAdminSerevice.delete(id);
    }
}
