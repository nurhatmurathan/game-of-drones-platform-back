import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import * as bcrypt from "bcrypt";
import { UserCreateDto } from "./dto/user.create.dto";
import { UserProfileEditDto } from "./dto/user.profileedit.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async create(userData: UserCreateDto) {
        const { password, ...res } = userData;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = this.userRepository.create({
            ...res,
            password: hashedPassword,
        });

        return await this.userRepository.save(newUser);
    }

    async findOne(email: string): Promise<User | undefined> {
        return await this.userRepository.findOne({ where: { email: email } });
    }

    async findOneById(id: number): Promise<User | undefined> {
        return await this.userRepository.findOne({
            where: { id: id },
            relations: ["liga"],
        });
    }

    async profileCover(tokenPayload: any) {
        const user = await this.userRepository.findOne({
            where: { id: tokenPayload.sub },
        });

        return {
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar || null,
        };
    }

    async profileEdit(userData) {
        return await this.userRepository.save(userData);
    }
}
