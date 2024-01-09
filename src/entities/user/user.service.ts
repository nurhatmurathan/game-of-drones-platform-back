import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { BillingAccountService } from "../billing.account/billing.account.service";
import { UserPasswordresetToken } from "../user.passwordreset.token/user.passwordreset.token.entity";
import { UserPasswordresetTokenService } from "../user.passwordreset.token/user.passwordreset.token.service";
import { MailService } from "./../../mail/mail.service";
import { UserCreateDto } from "./dto";
import { User } from "./user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly billingAccountServise: BillingAccountService,
        private readonly userPasswordresetTokenService: UserPasswordresetTokenService,
        private readonly mailService: MailService
    ) {}

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
            relations: ["billingAccount"],
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

    async save(userInstance: User) {
        await this.userRepository.save(userInstance);
    }

    async getPasswordResetLink(email: string) {
        const instance: User = await this.findOneByEmail(email);
        this.validate(instance);

        const passResetInstance: UserPasswordresetToken =
            await this.userPasswordresetTokenService.create(instance);

        return await this.mailService.sendUserPasswordResetLink(
            instance,
            passResetInstance.token
        );
    }

    async passwordResetWithToken(token: string, password: string) {
        const instance: User =
            await this.userPasswordresetTokenService.getTokenUser(token);

        return this.setPassword(instance, password);
    }

    private async setPassword(instance: User, password: string) {
        console.log(instance);
        console.log(password);

        const hashedPass: string = await bcrypt.hash(password, 10);
        instance.password = hashedPass;
        console.log(hashedPass);
        await this.userRepository.save(instance);

        return { message: "Password is updated" };
    }

    private validate(instance: User): void {
        if (!instance) throw new BadRequestException("User does not exist!");
    }
}
