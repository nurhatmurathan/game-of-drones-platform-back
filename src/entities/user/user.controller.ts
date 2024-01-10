import {
    Body,
    Controller,
    Get,
    Headers,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Request,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CustomAuthGuard } from "../../auth/guards/auth.guard";
import { LanguagesEnum } from "./../../common/enums/languages";
import { UtilService } from "./../../utils/util.service";
import {
    UserEmailDto,
    UserPasswordDto,
    UserPasswordEditDto,
    UserProfileEditDto,
} from "./dto";
import { UserService } from "./user.service";

@ApiTags("User")
@Controller("users")
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly utilService: UtilService
    ) {}

    @ApiBearerAuth()
    @Get("profile/cover")
    @HttpCode(HttpStatus.OK)
    @UseGuards(CustomAuthGuard)
    async getProfileCover(@Request() req) {
        return await this.userService.getProfileCover(req.user.sub);
    }

    @ApiBearerAuth()
    @Get("profile")
    @HttpCode(HttpStatus.OK)
    @UseGuards(CustomAuthGuard)
    async getProfile(@Request() req) {
        return await this.userService.getProfile(req.user.sub);
    }

    @ApiBearerAuth()
    @Post("profile/edit")
    @HttpCode(HttpStatus.OK)
    @UseGuards(CustomAuthGuard)
    async egitProfile(@Request() req, @Body() userData: UserProfileEditDto) {
        return await this.userService.editProfile({
            id: req.user.sub,
            ...userData,
        });
    }

    @ApiBearerAuth()
    @Post("password/edit")
    @HttpCode(HttpStatus.OK)
    @UseGuards(CustomAuthGuard)
    async editPassword(@Request() req, @Body() userData: UserPasswordEditDto) {
        return await this.userService.editPassword(
            req.user.sud,
            userData.oldPassword,
            userData.newPassword
        );
    }

    @Post("password/reset")
    @HttpCode(HttpStatus.ACCEPTED)
    async getPesetPasswordLink(
        @Body() userData: UserEmailDto,
        @Headers("Accept-Language") language: LanguagesEnum
    ) {
        language = this.utilService.getLanguage(language);
        return await this.userService.getPasswordResetLink(
            userData.email,
            language
        );
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
