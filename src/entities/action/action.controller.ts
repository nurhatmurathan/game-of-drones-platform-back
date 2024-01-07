import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { Action } from "./action.entity";
import { ActionService } from "./action.service";
import { ActionCreateDto } from "./dto";

@ApiTags("Action")
@Controller("action")
export class ActionController {
    constructor(private readonly actionService: ActionService) { }

    @Post()
    @ApiBearerAuth()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() actionCreateDto: ActionCreateDto): Promise<Action> {
        return this.actionService.create(actionCreateDto);
    }
}
