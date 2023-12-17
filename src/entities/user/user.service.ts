import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import * as bcrypt from "bcrypt";
import { UserCreateDto } from "./dto/user.create.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
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

  async findOne(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({where: {email: email}});
  }

  async userProfileCover(tokenPayload: any) {
    const user = await this.userRepository.findOne( { where: { id : tokenPayload.sub } } );

    return {
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar || null
    }
  }
}
