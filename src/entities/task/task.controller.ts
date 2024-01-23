import {
    Controller,
    Get,
    Headers,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Req,
    UseGuards
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { LanguagesEnum } from "src/common/enums";
import { CustomAuthGuard } from "../../auth/guards/auth.guard";
import {
    TaskListDto,
    TaskRetrieveDto
} from "./dto";
import { TaskService } from "./task.service";


@ApiTags("Task")
@Controller("task")
export class TaskController {
    constructor(
        private readonly taskService: TaskService,
    ) { }

    @Get()
    @ApiBearerAuth()
    @HttpCode(HttpStatus.ACCEPTED)
    async findAll(
        @Headers("Accept-Language") language: LanguagesEnum
    ): Promise<TaskListDto[]> {
        return await this.taskService.findAll(language);
    }

    @Get("/:id")
    @ApiBearerAuth()
    @UseGuards(CustomAuthGuard)
    @HttpCode(HttpStatus.ACCEPTED)
    async findOne(
        @Headers("Accept-Language") language: LanguagesEnum,
        @Param("id", ParseIntPipe) id: number,
        @Req() request
    ): Promise<TaskRetrieveDto> {
        console.log("In Task controller")
        return this.taskService.findOne(id, request.user.sub, language);
    }
}
