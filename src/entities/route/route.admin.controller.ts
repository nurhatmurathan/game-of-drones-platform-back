import { AuthGuard, IsAdminGuard } from "./../../auth/guards";
import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { RouteAdminService } from "./route.admin.service";
import { RouteCoverDto, RouteCreateDto, RouteRetrieveAdminDto } from "./dto";

@ApiTags("Admin Route")
@Controller("admin-route")
@ApiBearerAuth()
@UseGuards(AuthGuard, IsAdminGuard)
export class RouteAdminController {
    constructor(private readonly routeAdminSerevice: RouteAdminService) {}

    @Get()
    @HttpCode(HttpStatus.ACCEPTED)
    async findAll(): Promise<RouteCoverDto[]> {
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
}
