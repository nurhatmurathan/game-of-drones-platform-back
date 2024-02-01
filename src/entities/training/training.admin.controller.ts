import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    UseGuards
} from "@nestjs/common";
import {
    ApiBearerAuth,
    ApiBody,
    ApiResponse,
    ApiTags
} from "@nestjs/swagger";
import { CustomAuthGuard } from "../../auth/guards/auth.guard";

import { IsAdminGuard } from "src/auth/guards";
import { TrainingAdminCreateDto } from "./dto";
import { TrainingAdminService } from "./training.admin.service";
import { Training } from "./training.entity";

@ApiBearerAuth()
@ApiTags("Admin Training")
@Controller("admin-training")
@UseGuards(CustomAuthGuard, IsAdminGuard)
export class TrainingAdminController {
    constructor(private readonly trainingAdminService: TrainingAdminService) { }

    @Post()
    @ApiBody({ type: [TrainingAdminCreateDto] })
    @ApiResponse({ isArray: true })
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createDate: TrainingAdminCreateDto[]): Promise<Training[]> {
        return await this.trainingAdminService.create(createDate);
    }
}
