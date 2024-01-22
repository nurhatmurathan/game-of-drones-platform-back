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
    Res,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { Drone } from "./drone.entity";
import { DroneService } from "./drone.service";
import { DroneCreateDto, DroneUpdateDto, DroneVerifyDto } from "./dto";

@ApiTags("Dron")
@Controller("dron")
export class DroneController {
    constructor(private readonly dronService: DroneService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<Drone[]> {
        return this.dronService.findAll();
    }

    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    async findOne(@Param("id") id: string): Promise<Drone> {
        return this.dronService.findOne(id);
    }

    @Post()
    @HttpCode(HttpStatus.ACCEPTED)
    async create(@Body() dronData: DroneCreateDto): Promise<Drone> {
        return this.dronService.create(dronData.id, dronData.name);
    }

    @Put("/:id")
    async update(
        @Param("id") id: string,
        @Body() dronData: DroneUpdateDto
    ): Promise<Drone> {
        return this.dronService.update(id, dronData.name, dronData.isOnline);
    }

    @Put("unbind-user/:id")
    async unbindUser(@Param("id") id: string) {
        return this.dronService.unbindUser(id);
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.OK)
    async delete(@Param("id") id: string) {
        return this.dronService.delete(id);
    }

    @Post("/verify")
    async verifyDrone(
        @Body() droneVerifyDto: DroneVerifyDto,
        @Res() response: Response
    ) {
        const isBind =
            await this.dronService.verifyBindingUserWithDrone(droneVerifyDto);

        return isBind
            ? response.status(HttpStatus.OK).send()
            : response.status(HttpStatus.NOT_FOUND).send();
    }
}
