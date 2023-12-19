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

import { TaskService } from './task.service';
import { UserService } from '../user/user.service';
import { GetLanguageFromHeaderService } from '../../utils/util.getlanguage.service';
import { TaskCreateDto } from './dto/task.create.dto';
import { TaskListDto } from './dto/task.list.dto';
import { TaskRetrieveDto } from './dto/task.retrieve.dto';


@ApiTags()
@Controller('task')
export class TaskController {
    constructor(
        private readonly taskService: TaskService,
        private readonly getLanguageFromHeaderService: GetLanguageFromHeaderService,
    ) {}
    
    @Get()
    @ApiBearerAuth()
    @HttpCode(HttpStatus.ACCEPTED)
    async findAll(@Req() request): Promise<TaskListDto[]> {
        const language = this.getLanguageFromHeaderService.getLanguageFromHeaders(request);
        
        const taskListDto = this.taskService.findAll(language);
        return taskListDto;
    }
    
    
    @Post()
    @ApiBearerAuth()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() taskCreateDto: TaskCreateDto): Promise<TaskCreateDto> {
        return this.taskService.create(taskCreateDto);
    }
}
