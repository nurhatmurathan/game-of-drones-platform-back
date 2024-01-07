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
import { AuthService } from "./auth.service";
import {
    AuthCodeVerifyDto,
    AuthEmailVerifyDto,
    AuthRegisterDto,
    UserLoginDto,
    UserRefreshDto,
    UserVerifyDto
} from "./dto";
import {
    CustomAuthGuard,
    GoogleAuthGuard
} from "./guards";


@ApiTags("auth")
@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) { }

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
    @UseGuards(GoogleAuthGuard)
    googleAuth(@Request() req) {
        console.log("I'm here in googleAuth funtion");
    }

    @Get("google/callback")
    @UseGuards(GoogleAuthGuard)
    googleAuthRedirect(@Request() req) {
        console.log("I'm in - googleAuthRedirect funtion");
        return req.user.tokens;
    }
}
