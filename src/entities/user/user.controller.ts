import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { UserService } from "./user.service";
import { UserCreateDto, UserLoginDto, UserRefreshDto, UserVerifyDto } from "./user.dto";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(
    @Body() userCreateDto: UserCreateDto
    ) {
    return this.userService.create(userCreateDto)
  }

  @Post("login")
  login(
    @Body() userData: UserLoginDto
  ){
    return this.userService.signIn(userData)
  }

  @Post("login/refresh")
  refreshToken(
    @Body() refreshTokenDto: UserRefreshDto
  ){
    return this.userService.refreshToken(refreshTokenDto.refresh)
  }

  @Post("login/verify")
  verifyToken(
    @Body() verifyTokenDto: UserVerifyDto
  ){
    return this.userService.verifyToken(verifyTokenDto.token)
  }
}
