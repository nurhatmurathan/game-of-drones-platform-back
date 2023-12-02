import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { UserService } from "./user.service";
import { UserCreateDto } from "./dto/user.create.dto";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() userCreateDto: UserCreateDto) {
    return this.userService.create(userCreateDto);
  }
}
