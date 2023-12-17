import { Controller, Get, Post, Param, ParseIntPipe, HttpCode, HttpStatus, Req, Body} from '@nestjs/common';
import { Request } from 'express';
import { ApiTags } from "@nestjs/swagger";
 
import { RouteService } from './route.service';
import { GetLanguageFromHeaderService } from '../../utils/util.getlanguage.service';
import { RouteRetrieveDto } from './dto/route.retrieve.dto';
import { RouteCreateDto } from './dto/route.create.dto';


@ApiTags('Route')
@Controller('route')
export class RouteController {
    constructor( 
        private readonly routeSerevice: RouteService, 
        private readonly getLanguageFromHeaders: GetLanguageFromHeaderService
    ) {}

    @Get('/:id')
    @HttpCode(HttpStatus.ACCEPTED)
    async findOne(@Param('id', ParseIntPipe) id: number, @Req() request: Request): Promise<RouteRetrieveDto> {
        const language = this.getLanguageFromHeaders.getLanguageFromHeaders(request);
        const routeRetrieveDtoInstance = await this.routeSerevice.findOne(id, language);
        
        return {
            id: routeRetrieveDtoInstance.id,
            name: routeRetrieveDtoInstance.name,
            length: routeRetrieveDtoInstance.length,
            bestTime: routeRetrieveDtoInstance.bestTime,
            map: routeRetrieveDtoInstance.map,
            description: routeRetrieveDtoInstance.description,
          };
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() routeDate: RouteCreateDto): Promise<RouteCreateDto> {
        return this.routeSerevice.create(routeDate);
    }
}
