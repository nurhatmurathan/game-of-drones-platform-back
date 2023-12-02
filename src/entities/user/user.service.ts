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
    private readonly jwtService: JwtService,
  ) {}

  async create(userData: UserCreateDto) {
    const { password, ...res } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      ...res,
      password: hashedPassword,
    });

    await this.userRepository.save(newUser);

    return { detail: "saved" };
  }

  async signIn(userData: UserLoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: userData.email },
    });

    if (!user || !(await bcrypt.compare(userData.password, user.password))) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };
    return {
      access: await this.jwtService.signAsync(payload),
      refresh: await this.jwtService.signAsync(payload, {
        expiresIn: "1h",
      }),
    };
  }

  async refreshToken(refreshToken: string) {
  
    const decodedToken = this.jwtService.verify(refreshToken)

    const payload = { sub: decodedToken.sub, email: decodedToken.email }

    return {
      access: await this.jwtService.signAsync(payload),
    };
  }

  async verifyToken(token: string) {

    const decodedToken = this.jwtService.verify(token)

    return {}
  }
}
