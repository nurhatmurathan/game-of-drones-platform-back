import { HttpCode, HttpStatus, Body, Controller, Get, Post, Param, ParseIntPipe} from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";

import { RouteService } from './route.service';
import { RouteRetrieveDto } from './dto/route.retrieve.dto';
import { RouteCreateDto } from './dto/route.create.dto';


@ApiTags('Route')
@Controller('route')
export class RouteController {
    constructor( private readonly routeSerevice: RouteService ) {}

    @Get('/:id')
    @HttpCode(HttpStatus.ACCEPTED)
    findOne(@Param("id", ParseIntPipe) id: number): Promise<RouteRetrieveDto> {
        return this.routeSerevice.findOne(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() routeDate: RouteCreateDto): Promise<RouteCreateDto> {
        return this.routeSerevice.create(routeDate);
    }
}
