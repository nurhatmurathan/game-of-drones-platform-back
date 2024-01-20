import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    UseGuards
} from "@nestjs/common";
import {
    ApiBearerAuth,
    ApiResponse,
    ApiTags
} from "@nestjs/swagger";
import { CustomAuthGuard } from "../../auth/guards/auth.guard";

import { Training } from "./training.entity";
import { TrainingService } from "./training.service";

@ApiTags("Training")
@Controller("training")
export class TrainingController {
    constructor(private readonly trainingService: TrainingService) { }

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
