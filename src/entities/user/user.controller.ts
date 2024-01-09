import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Request,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CustomAuthGuard } from "../../auth/guards/auth.guard";
import { UserEmailDto, UserPasswordDto, UserProfileEditDto } from "./dto";
import { UserService } from "./user.service";

@ApiTags("User")
@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiBearerAuth()
    @Get("profile/cover")
    @HttpCode(HttpStatus.OK)
    @UseGuards(CustomAuthGuard)
    async getProfile(@Request() req) {
        return await this.userService.profileCover(req.user);
    }

    @ApiBearerAuth()
    @Post("profile/edit")
    @HttpCode(HttpStatus.OK)
    @UseGuards(CustomAuthGuard)
    async egitProfile(@Request() req, @Body() userData: UserProfileEditDto) {
        return await this.userService.profileEdit({
            id: req.user.sub,
            email: req.user.email,
            ...userData,
        });
    }

    @Post("password/reset")
    @HttpCode(HttpStatus.ACCEPTED)
    async getPesetPasswordLink(@Body() userData: UserEmailDto) {
        return await this.userService.getPasswordResetLink(userData.email);
    }

    @Post("password/reset/:token")
    @HttpCode(HttpStatus.ACCEPTED)
    async pesetPasswordWithToken(
        @Param("token") token: string,
        @Body() userData: UserPasswordDto
    ) {
        return await this.userService.passwordResetWithToken(
            token,
            userData.password
        );
    }
}
