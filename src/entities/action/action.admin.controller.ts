import {
    Controller,
    UseGuards
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CustomAuthGuard, IsAdminGuard } from "./../../auth/guards";

import { ActionAdminService } from "./action.admin.service";

@ApiTags("Action")
@Controller("action")
@UseGuards(CustomAuthGuard, IsAdminGuard)
export class ActionAdminController {
    constructor(private readonly actionAdminService: ActionAdminService) { }
}
