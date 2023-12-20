import { AuthGuard } from "./../../auth/auth.guard";
import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    UseGuards,
} from "@nestjs/common";
import {
    ApiBearerAuth,
    ApiBody,
    ApiProperty,
    ApiResponse,
    ApiTags,
} from "@nestjs/swagger";
import { TrainingService } from "./training.service";
import { TrainingCreateDto } from "./dto/training.create.dto";
import { Training } from "./training.entity";
import { TrainingsTournamentTimeDto } from "./dto/training.turnamenttime.dto";

@ApiTags("Training")
@Controller("Training")
export class TrainingController {
    constructor(private readonly trainingService: TrainingService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() trainingData: TrainingCreateDto): Promise<Training> {
        return await this.trainingService.create(trainingData);
    }

    @Get("tournamnetTime")
    @ApiBearerAuth()
    @ApiResponse({ isArray: true })
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.ACCEPTED)
    async availableTrainings(
        @Body() body: TrainingsTournamentTimeDto
    ): Promise<Training[]> {
        return await this.trainingService.availableTrainings(
            body.tournamentTimeId
        );
    }
}
