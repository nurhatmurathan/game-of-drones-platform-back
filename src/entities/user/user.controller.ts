import { AuthGuard } from "./../../auth/auth.guard";
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
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get("profile/cover")
    async getProfile(@Request() req) {
        return await this.userService.profileCover(req.user);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post("profile/edit")
    async egitProfile(@Request() req, @Body() userData: UserProfileEditDto) {
        return await this.userService.profileEdit({
            id: req.user.sub,
            email: req.user.email,
            ...userData,
        });
    }
}
