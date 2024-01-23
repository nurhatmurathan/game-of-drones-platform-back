import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CustomAuthGuard, IsAdminGuard } from "./../../auth/guards";

import { ActionAdminService } from "./action.admin.service";
import { Action } from "./action.entity";
import { ActionAdminCreateDto } from "./dto";

@ApiTags("Action")
@Controller("action")
@UseGuards(CustomAuthGuard, IsAdminGuard)
export class ActionAdminController {
    constructor(private readonly actionAdminService: ActionAdminService) {}

    @Post()
    @ApiBearerAuth()
    @HttpCode(HttpStatus.CREATED)
    createActionDuringTheTournament(
        @Body() actionCreateDto: ActionAdminCreateDto
    ): Promise<Action> {
        return this.actionAdminService.create(actionCreateDto);
    }
}
