import {
    Req,
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    HttpCode,
    HttpStatus,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { TaskService } from "./task.service";
import { UtilService } from "../../utils/util.service";
import { TaskCreateDto } from "./dto/task.create.dto";
import { TaskListDto } from "./dto/task.list.dto";
import { TaskRetrieveDto } from "./dto/task.retrieve.dto";
import { AuthGuard } from "../../auth/guards/auth.guard";

@ApiTags("Task")
@Controller("task")
export class TaskController {
    constructor(
        private readonly taskService: TaskService,
        private readonly utilService: UtilService
    ) {}

    @Get()
    @ApiBearerAuth()
    @HttpCode(HttpStatus.ACCEPTED)
    async findAll(@Req() request): Promise<TaskListDto[]> {
        const language = this.utilService.getLanguageFromHeaders(request);

        const taskListDto = this.taskService.findAll(language);
        return taskListDto;
    }

    @Get("/:id")
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.ACCEPTED)
    async findOne(
        @Param("id", ParseIntPipe) id: number,
        @Req() request
    ): Promise<TaskRetrieveDto> {
        var language = this.utilService.getLanguageFromHeaders(request);
        return this.taskService.findOne(id, request.user.sub, language);
    }

    @Post()
    @ApiBearerAuth()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() taskCreateDto: TaskCreateDto): Promise<TaskCreateDto> {
        return this.taskService.create(taskCreateDto);
    }
}
