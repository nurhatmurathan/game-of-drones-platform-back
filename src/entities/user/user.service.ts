import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import * as bcrypt from "bcrypt";
import { UserCreateDto } from "./user.dto";
import { UserLoginDto, UserLoginResponseDto } from "./user.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
  constructor(
    @Inject("USER_REPOSITORY")
    private readonly userRepository: Repository<User>,
  ) {}
  
  async create(userData: UserCreateDto) {
    const { password, ...res } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userRepository.create({
      ...res,
      password: hashedPassword,
    });

    await this.userRepository.save(newUser);

    return { detail: "saved" };
  }

  async findOne(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({where: {email: email}});
  }
}
