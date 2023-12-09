import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { UserService } from "./user.service";
import { UserCreateDto, UserLoginDto, UserRefreshDto, UserVerifyDto } from "./user.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("User")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(
    @Body() userCreateDto: UserCreateDto
    ) {
    return this.userService.create(userCreateDto)
  }


}
