import {
    Body,
    Controller,
    Get,
    Headers,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Req,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { LanguagesEnum } from "src/common/enums";
import { CustomAuthGuard } from "../../auth/guards/auth.guard";
import {
    TaskCreateDto,
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
        const taskListDto = this.taskService.findAll(language);
        return taskListDto;
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
        return this.taskService.findOne(id, request.user.sub, language);
    }

    @Post()
    @ApiBearerAuth()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() taskCreateDto: TaskCreateDto): Promise<TaskCreateDto> {
        return this.taskService.create(taskCreateDto);
    }
}
