import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserCreateDto } from "./dto/user.create.dto";
import { AuthGuard } from "src/auth/auth.guard";

@ApiTags("User")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("register")
  create(@Body() userCreateDto: UserCreateDto) {
    return this.userService.create(userCreateDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('profile/cover')
  getProfile(@Request() req) {
    return this.userService.userProfileCover(req.user);
  }
}

