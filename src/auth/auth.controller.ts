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

@ApiTags("auth")
@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post("login")
    login(@Body() userData: UserLoginDto) {
        return this.authService.signIn(userData);
    }

    @HttpCode(HttpStatus.OK)
    @Post("login/refresh")
    refreshToken(@Body() refreshTokenDto: UserRefreshDto) {
        return this.authService.refreshToken(refreshTokenDto.refresh);
    }

    @HttpCode(HttpStatus.OK)
    @Post("login/verify")
    verifyToken(@Body() verifyTokenDto: UserVerifyDto) {
        return this.authService.verifyToken(verifyTokenDto.token);
    }

    @ApiBearerAuth()
    @UseGuards(CustomAuthGuard)
    @Get("profile")
    getProfile(@Request() req) {
        return req.user;
    }

    @Post("register")
    register(@Body() userData: AuthRegisterDto) {
        console.log(userData);
        return this.authService.register(userData);
    }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    googleAuth(@Request() req) {
    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Request() req) {
        return req.user.tokens;
    }
}
