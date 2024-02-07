import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Request,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CustomAuthGuard } from "../../auth/guards/auth.guard";

import { TrainingGameDto } from "./dto";
import { TrainingService } from "./training.service";

@ApiTags("Training")
@Controller("training")
@ApiBearerAuth()
@UseGuards(CustomAuthGuard)
export class TrainingController {
    constructor(private readonly trainingService: TrainingService) {}

    // @Get("trainings/:tournamentId")
    // @ApiResponse({ isArray: true })
    // @HttpCode(HttpStatus.ACCEPTED)
    // async availableTrainings(@Param("tournamentId", ParseIntPipe) tournamentId: number): Promise<Training[]> {
    //     return await this.trainingService.availableTrainings(tournamentId);
    // }

    @Post("/:tournamentId/add-training/:trainingId")
    @HttpCode(HttpStatus.ACCEPTED)
    async addTraining(
        @Param("tournamentId", ParseIntPipe) tournamentId: number,
        @Param("trainingId", ParseIntPipe) trainingId: number,
        @Request() request
    ): Promise<any> {
        console.log("I'm in addTraining");
        return this.trainingService.addTraining(request.user.sub, tournamentId, trainingId);
    }

    @Post("validate-training")
    @ApiBearerAuth()
    @HttpCode(HttpStatus.ACCEPTED)
    @UseGuards(CustomAuthGuard)
    async validateTournament(@Body() startGameDto: TrainingGameDto, @Request() req): Promise<any> {
        return this.trainingService.trainingStartedAndExistsValidator(
            req.user.sub,
            startGameDto.id,
            startGameDto.tournamentId
        );
    }
}
