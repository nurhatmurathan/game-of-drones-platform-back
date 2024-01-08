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
import {
    ApiBearerAuth,
    ApiResponse,
    ApiTags
} from "@nestjs/swagger";
import { CustomAuthGuard } from "../../auth/guards/auth.guard";
import { TrainingCreateDto } from "./dto";
import { Training } from "./training.entity";
import { TrainingService } from "./training.service";

@ApiTags("Training")
@Controller("Training")
export class TrainingController {
    constructor(private readonly trainingService: TrainingService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() trainingData: TrainingCreateDto): Promise<Training> {
        return await this.trainingService.create(trainingData);
    }

    @Get("trainings/:tournamentTimeId")
    @ApiBearerAuth()
    @ApiResponse({ isArray: true })
    @UseGuards(CustomAuthGuard)
    @HttpCode(HttpStatus.ACCEPTED)
    async availableTrainings(
        @Param("tournamentTimeId", ParseIntPipe) tournamentTimeId: number
    ): Promise<Training[]> {
        return await this.trainingService.availableTrainings(tournamentTimeId);
    }
}
