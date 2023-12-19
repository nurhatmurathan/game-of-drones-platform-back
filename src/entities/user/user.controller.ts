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
import { AuthGuard } from "src/auth/auth.guard";
import { UserProfileEditDto } from "./dto/user.profileedit.dto";

@ApiTags("User")
@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get("profile/cover")
    getProfile(@Request() req) {
        return this.userService.profileCover(req.user);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post("profile/edit")
    egitProfile(@Request() req, @Body() userData: UserProfileEditDto) {
        return this.userService.profileEdit({
            id: req.user.sub,
            email: req.user.email,
            ...userData,
        });
    }
}
