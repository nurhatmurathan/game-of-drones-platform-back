import { CustomAuthGuard } from "../../auth/guards/auth.guard";
import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    Request,
    Res,
    UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserCreateDto } from "./dto/user.create.dto";
import { UserProfileEditDto } from "./dto/user.profileedit.dto";

@ApiTags("User")
@Controller("users")
@UseGuards(CustomAuthGuard)
export class UserController {
    constructor(private readonly userService: UserService) { }

    @ApiBearerAuth()
    @Get("profile/cover")
    async getProfile(@Request() req) {
        return await this.userService.profileCover(req.user);
    }

    @ApiBearerAuth()
    @Post("profile/edit")
    async egitProfile(@Request() req, @Body() userData: UserProfileEditDto) {
        return await this.userService.profileEdit({
            id: req.user.sub,
            email: req.user.email,
            ...userData,
        });
    }
}
