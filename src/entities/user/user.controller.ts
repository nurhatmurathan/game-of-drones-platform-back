import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CustomAuthGuard } from "../../auth/guards/auth.guard";
import { UserEmailDto, UserProfileEditDto } from "./dto";
import { UserService } from "./user.service";

@ApiTags("User")
@Controller("users")
@UseGuards(CustomAuthGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiBearerAuth()
    @Get("profile/cover")
    @HttpCode(HttpStatus.OK)
    async getProfile(@Request() req) {
        return await this.userService.profileCover(req.user);
    }

    @ApiBearerAuth()
    @Post("profile/edit")
    @HttpCode(HttpStatus.OK)
    async egitProfile(@Request() req, @Body() userData: UserProfileEditDto) {
        return await this.userService.profileEdit({
            id: req.user.sub,
            email: req.user.email,
            ...userData,
        });
    }

    @Post("password/reset")
    @HttpCode(HttpStatus.ACCEPTED)
    async resetPassword(@Body() userData: UserEmailDto) {
        this.userService.passwordReset(userData.email);
    }
}
