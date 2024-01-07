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
import { AuthService } from "./auth.service";
import { CustomAuthGuard } from "./guards/auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserLoginDto } from "./dto/auth.login.dto";
import { UserRefreshDto } from "./dto/auth.refresh.dto";
import { UserVerifyDto } from "./dto/auth.verify.dto";
import { AuthRegisterDto } from "./dto/auth.register.dto";
import { AuthGuard } from "@nestjs/passport";
import { AuthEmailVerifyDto } from "./dto/auth.email.verify.dto";
import { AuthCodeVerifyDto } from "./dto/auth.code.verify";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.ACCEPTED)
    @Post("verify/email")
    async verifyEmail(@Body() verifyEmailDto: AuthEmailVerifyDto) {
        return await this.authService.verifyMail(verifyEmailDto.email);
    }

    @HttpCode(HttpStatus.ACCEPTED)
    @Post("verify/code")
    async verifyCode(@Body() verifyEmailDto: AuthCodeVerifyDto) {
        return await this.authService.verifyCode(verifyEmailDto.code);
    }

    @HttpCode(HttpStatus.OK)
    @Post("login")
    login(@Body() userData: UserLoginDto) {
        return this.authService.signIn(userData.email, userData.password);
    }

    @HttpCode(HttpStatus.OK)
    @Post("login/refresh")
    refreshToken(@Body() refreshTokenDto: UserRefreshDto) {
        return this.authService.refreshJWTToken(refreshTokenDto.refresh);
    }

    @HttpCode(HttpStatus.OK)
    @Post("login/verify")
    verifyToken(@Body() verifyTokenDto: UserVerifyDto) {
        return this.authService.verifyJWTToken(verifyTokenDto.token);
    }

    @ApiBearerAuth()
    @UseGuards(CustomAuthGuard)
    @Get("profile")
    getProfile(@Request() req) {
        return req.user;
    }

    @Post("register")
    register(@Body() userData: AuthRegisterDto) {
        return this.authService.register(userData.token, userData.password);
    }

    @Get("google")
    @UseGuards(AuthGuard("google"))
    googleAuth(@Request() req) {}

    @Get("google/callback")
    @UseGuards(AuthGuard("google"))
    googleAuthRedirect(@Request() req) {
        return req.user.tokens;
    }
}
