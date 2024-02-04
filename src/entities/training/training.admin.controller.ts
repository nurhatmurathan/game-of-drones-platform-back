import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiDefaultResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CustomAuthGuard } from "../../auth/guards/auth.guard";

import { IsAdminGuard } from "src/auth/guards";
import { TrainingAdminCreateDto } from "./dto";
import { TrainingAdminDto } from "./dto/admin/training.admin.dto";
import { TrainingAdminService } from "./training.admin.service";
import { Training } from "./training.entity";

@ApiTags("Admin Training")
@Controller("admin-training")
@ApiBearerAuth()
@UseGuards(CustomAuthGuard, IsAdminGuard)
export class TrainingAdminController {
    constructor(private readonly trainingAdminService: TrainingAdminService) {}

    @Post()
    @ApiBody({ type: [TrainingAdminCreateDto] })
    @ApiResponse({ isArray: true })
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createDate: TrainingAdminCreateDto[]): Promise<Training[]> {
        return await this.trainingAdminService.create(createDate);
    }

    @Get()
    @ApiDefaultResponse({ type: TrainingAdminDto, isArray: true })
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<TrainingAdminDto[]> {
        const instances: Training[] = await this.trainingAdminService.findAll({ userTournamentTimes: true });

        return instances.map((instance) => {
            const { id, startTime, places, userTournamentTimes } = instance;
            return { id, startTime, places, reserved: userTournamentTimes.length };
        });
    }
}
