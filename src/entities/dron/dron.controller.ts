import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Dron } from "./dron.entity";
import { DronService } from "./dron.service";
import { DronCreateDto } from "./dto/dron.create.dto";
import { DronUpdateDto } from "./dto/dron.update.dto";

@ApiTags("Dron")
@Controller("dron")
export class DronController {
    constructor(private readonly dronService: DronService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<Dron[]> {
        return this.dronService.findAll();
    }

    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    async findOne(@Param("id") id: string): Promise<Dron> {
        return this.dronService.findOne(id);
    }

    @Post()
    @HttpCode(HttpStatus.ACCEPTED)
    async create(@Body() dronData: DronCreateDto): Promise<Dron> {
        return this.dronService.create(dronData.id, dronData.name);
    }

    @Put("/:id")
    async update(
        @Param("id") id: string,
        @Body() dronData: DronUpdateDto
    ): Promise<Dron> {
        return this.dronService.update(id, dronData.name, dronData.isOnline);
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.OK)
    async delete(@Param("id") id: string) {
        return this.dronService.delete(id);
    }
}
