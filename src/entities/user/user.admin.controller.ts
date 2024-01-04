import { IsAdminGuard } from "./../../auth/guards/admin.guard";
import { AuthGuard } from "../../auth/guards/auth.guard";
import { Body, Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserAdminService } from "./user.admin.service";
import { UserCoverDto } from "./dto/user.cover.dto";

@ApiTags("Admin User")
@Controller("admin-users")
@ApiBearerAuth()
@UseGuards(AuthGuard, IsAdminGuard)
export class UserAdminController {
    constructor(private readonly userAdminService: UserAdminService) {}

    @Get("users")
    async findAllUser(): Promise<UserCoverDto[]> {
        return this.userAdminService.findAllUsers();
    }

    @Get("admins")
    async findAllAdminUsers(): Promise<UserCoverDto[]> {
        return this.userAdminService.findAllAdminUsers();
    }
}
