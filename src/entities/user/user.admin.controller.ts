import { IsAdminGuard } from "./../../auth/guards/admin.guard";
import { CustomAuthGuard } from "../../auth/guards/auth.guard";
import { Body, Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserAdminService } from "./user.admin.service";
import { UserCoverDto } from "./dto/user.cover.dto";

@ApiTags("Admin User")
@Controller("admin-users")
@ApiBearerAuth()
@UseGuards(CustomAuthGuard, IsAdminGuard)
export class UserAdminController {
    constructor(private readonly userAdminService: UserAdminService) { }

    @Get("users")
    async findAllUser(): Promise<UserCoverDto[]> {
        return this.userAdminService.findAllUsers();
    }

    @Get("admins")
    async findAllAdminUsers(): Promise<UserCoverDto[]> {
        return this.userAdminService.findAllAdminUsers();
    }
}
