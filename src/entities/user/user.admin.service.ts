import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserCoverDto } from "./dto";
import { User } from "./user.entity";

@Injectable()
export class UserAdminService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async findAllUsers(): Promise<UserCoverDto[]> {
        const userInstances = await this.userRepository.find({
            where: { isAdmin: false },
        });
        return userInstances.map((user) => ({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        }));
    }

    async findAllAdminUsers(): Promise<UserCoverDto[]> {
        const users = await this.userRepository.find({
            where: { isAdmin: true },
        });
        return users.map((user) => ({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        }));
    }
}
