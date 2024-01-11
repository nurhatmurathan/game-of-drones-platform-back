import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { FindOptionsRelations, Repository } from "typeorm";
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

    async findOneById(
        id: number,
        relations?: FindOptionsRelations<User>
    ): Promise<User | undefined> {
        if (!id) throw new NotFoundException("User with this id not found");
        return this.userRepository.findOne({
            where: { id },
            relations,
        });
    }

    async getProfileCover(id: number) {
        const instance = await this.findOneById(id);

        return {
            firstName: instance.firstName,
            lastName: instance.lastName,
            avatar: instance.avatar,
        };
    }

    async getProfile(id: number) {
        const instance = await this.findOneById(id);

        return {
            firstName: instance.firstName,
            lastName: instance.lastName,
            avatar: instance.avatar,
            email: instance.email,
        };
    }

    async editProfile(userData): Promise<User> {
        return await this.userRepository.save(userData);
    }

    async editPassword(id: number, oldPassword: string, newPassword: string) {
        const instance: User = await this.findOneById(id);
        if (!(await bcrypt.compare(oldPassword, instance.password)))
            throw new BadRequestException("Old password is incorrect!");

        return await this.setPassword(instance, newPassword);
    }

    async save(userInstance: User) {
        await this.userRepository.save(userInstance);
    }

    async getPasswordResetLink(email: string, language: string) {
        const instance: User = await this.findOneByEmail(email);
        this.validate(instance);

        const passResetInstance: UserPasswordresetToken =
            await this.userPasswordresetTokenService.create(instance);

        return await this.mailService.sendUserPasswordResetLink(
            instance,
            passResetInstance.token,
            language
        );
    }

    async passwordResetWithToken(token: string, password: string) {
        const instance: User =
            await this.userPasswordresetTokenService.getTokenUser(token);

        this.userPasswordresetTokenService.deleteUserToken(instance);
        return this.setPassword(instance, password);
    }

    private async setPassword(instance: User, password: string) {
        const hashedPass: string = await bcrypt.hash(password, 10);
        instance.password = hashedPass;

        await this.userRepository.save(instance);
        console.log(instance);
        return { message: "Password is updated" };
    }

    private validate(instance: User): void {
        if (!instance) throw new BadRequestException("User does not exist!");
    }
}
