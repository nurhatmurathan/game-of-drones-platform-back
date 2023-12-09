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
import { UserLoginDto, UserRefreshDto, UserVerifyDto } from "@entities/user/user.dto";
import { AuthGuard } from "./auth.guard";

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

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
