import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    UseGuards
} from "@nestjs/common";
import {
    ApiTags
} from "@nestjs/swagger";
import { CustomAuthGuard } from "../../auth/guards/auth.guard";

import { IsAdminGuard } from "src/auth/guards";
import { TrainingAdminCreateDto } from "./dto";
import { TrainingAdminService } from "./training.admin.service";
import { Training } from "./training.entity";

@ApiTags("Training Admin")
@Controller("admin-training")
@UseGuards(CustomAuthGuard, IsAdminGuard)
export class TrainingAdminController {
    constructor(private readonly trainingAdminService: TrainingAdminService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createDate: TrainingAdminCreateDto): Promise<Training> {
        return await this.trainingAdminService.create(createDate);
    }
}
