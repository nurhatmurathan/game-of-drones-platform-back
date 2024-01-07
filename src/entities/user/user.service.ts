import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { BillingAccountService } from "../billing.account/billing.account.service";
import { UserCreateDto } from "./dto/user.create.dto";
import { User } from "./user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly billingAccountServise: BillingAccountService
    ) { }

    async create(userData: UserCreateDto, isAdmin?: boolean) {
        console.log("I'm here in User service - create function ");

        const { password, ...res } = userData;
        const hashedPassword = userData.password
            ? await bcrypt.hash(userData.password, 10)
            : null;
        const billingAccountInstance =
            await this.billingAccountServise.create();

        console.log(`Password: ${hashedPassword}`);
        const newUser = this.userRepository.create({
            ...res,
            password: hashedPassword,
            billingAccount: billingAccountInstance,
            isAdmin: isAdmin,
        });

        console.log(`New User: ${newUser}`);
        return await this.userRepository.save(newUser);
    }

    async findOneByEmail(email: string): Promise<User | undefined> {
        console.log("I'm here in User Service - findOneByEmail function");
        return await this.userRepository.findOne({ where: { email } });
    }

    findOneById(id: number): Promise<User | undefined> {
        return this.userRepository.findOne({
            where: { id },
            relations: ["liga", "billingAccount"],
        });
    }

    async profileCover(tokenPayload: any) {
        const user = await this.userRepository.findOne({
            where: { id: tokenPayload.sub },
            relations: ["liga"],
        });

        return {
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar || null,
            liga: user.liga,
        };
    }

    async profileEdit(userData) {
        return await this.userRepository.save(userData);
    }

    async save(userInstance: User) {
        await this.userRepository.save(userInstance);
    }
}
