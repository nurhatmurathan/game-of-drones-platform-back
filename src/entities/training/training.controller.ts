import { Controller, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CustomAuthGuard } from "../../auth/guards/auth.guard";

import { TrainingService } from "./training.service";

@ApiTags("Training")
@Controller("training")
@ApiBearerAuth()
@UseGuards(CustomAuthGuard)
export class TrainingController {
    constructor(private readonly trainingService: TrainingService) { }

    // @Get("trainings/:tournamentId")
    // @ApiResponse({ isArray: true })
    // @HttpCode(HttpStatus.ACCEPTED)
    // async availableTrainings(@Param("tournamentId", ParseIntPipe) tournamentId: number): Promise<Training[]> {
    //     return await this.trainingService.availableTrainings(tournamentId);
    // }
}
