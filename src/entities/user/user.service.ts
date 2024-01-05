import { BillingAccount } from "./../billing.account/billing.account.entity";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import * as bcrypt from "bcrypt";
import { UserCreateDto } from "./dto/user.create.dto";
import { BillingAccountService } from "../billing.account/billing.account.service";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly billingAccountServise: BillingAccountService
    ) {}

    async create(userData: UserCreateDto, isAdmin?: boolean) {
        const { password, ...res } = userData;
        const hashedPassword = await bcrypt.hash(password, 10);
        const billingAccountInstance =
            await this.billingAccountServise.create();

        const newUser = this.userRepository.create({
            ...res,
            password: hashedPassword,
            billingAccount: billingAccountInstance,
            isAdmin: isAdmin,
        });

        return await this.userRepository.save(newUser);
    }

    async findOneByEmail(email: string): Promise<User | undefined> {
        return await this.userRepository.findOne({ where: { email } });
    }
    async findOneByIIN(iin: string): Promise<User | undefined> {
        return await this.userRepository.findOne({ where: { iin } });
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

    save(userInstance: User): void {
        this.userRepository.save(userInstance);
    }
}
