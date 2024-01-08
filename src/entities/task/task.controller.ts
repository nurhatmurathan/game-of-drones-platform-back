import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Req,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { CustomAuthGuard } from "../../auth/guards/auth.guard";
import { UtilService } from "../../utils/util.service";
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
        private readonly utilService: UtilService
    ) { }

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
    @UseGuards(CustomAuthGuard)
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
