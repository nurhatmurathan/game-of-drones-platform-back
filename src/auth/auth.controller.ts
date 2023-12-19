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
import { AuthGuard } from "./auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserLoginDto } from "./dto/auth.login.dto";
import { UserRefreshDto } from "./dto/auth.refresh.dto";
import { UserVerifyDto } from "./dto/auth.verify.dto";
import { AuthRegisterDto } from "./dto/auth.register.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("login")
  login(
    @Body() userData: UserLoginDto
  ){
    return this.authService.signIn(userData)
  }

  @HttpCode(HttpStatus.OK)
  @Post("login/refresh")
  refreshToken(
    @Body() refreshTokenDto: UserRefreshDto
  ){
    return this.authService.refreshToken(refreshTokenDto.refresh)
  }

  @HttpCode(HttpStatus.OK)
  @Post("login/verify")
  verifyToken(
    @Body() verifyTokenDto: UserVerifyDto
  ){
    return this.authService.verifyToken(verifyTokenDto.token)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post("register")
  register(
    @Body() userData: AuthRegisterDto
  ){
    return this.authService.register(userData)
  }
}
