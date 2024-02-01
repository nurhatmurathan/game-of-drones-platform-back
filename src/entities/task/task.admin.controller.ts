import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CustomAuthGuard, IsAdminGuard } from "src/auth/guards";
import { Action } from "../action/action.entity";
import {
    TaskActionAdminCreateDto,
    TaskAdminCreateDto,
    TaskAdminListDto,
    TaskAdminRetrieveDto,
    TaskAdminUpdateDto
} from "./dto";
import { TaskAdminService } from "./task.admin.service";


@ApiBearerAuth()
@ApiTags('Admin Task')
@Controller("admin-task")
@UseGuards(CustomAuthGuard, IsAdminGuard)
export class TaskAdminController {
    constructor(
        private readonly taskAdminService: TaskAdminService
    ) { }

    @Get()
    @HttpCode(HttpStatus.ACCEPTED)
    findAll(): Promise<TaskAdminListDto[]> {
        return this.taskAdminService.findAll();
    }

    @Get("/:id")
    @HttpCode(HttpStatus.ACCEPTED)
    findOne(
        @Param("id", ParseIntPipe) id: number
    ): Promise<TaskAdminRetrieveDto> {
        return this.taskAdminService.findOne(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(
        @Body() createData: TaskAdminCreateDto
    ): Promise<TaskAdminRetrieveDto> {
        return this.taskAdminService.create(createData);
    }

    @Put("/:id")
    @HttpCode(HttpStatus.ACCEPTED)
    update(
        @Param("id", ParseIntPipe) id: number,
        @Body() updateData: TaskAdminUpdateDto
    ): Promise<TaskAdminRetrieveDto> {
        return this.taskAdminService.update(id, updateData);
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(
        @Param("id", ParseIntPipe) id: number
    ): Promise<any> {
        return this.taskAdminService.delete(id);
    }

    @Post("/create-action")
    @ApiBearerAuth()
    @HttpCode(HttpStatus.CREATED)
    createActionDuringTheTournament(
        @Body() createData: TaskActionAdminCreateDto
    ): Promise<Action> {
        return this.taskAdminService.createActionDuringTheTournament(createData);
    }
}