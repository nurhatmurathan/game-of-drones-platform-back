import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { randomBytes } from "crypto";
import { Repository } from "typeorm";
import { User } from "../user/user.entity";
import { UserPasswordresetToken } from "./user.passwordreset.token.entity";

@Injectable()
export class UserPasswordresetTokenService {
    constructor(
        @InjectRepository(UserPasswordresetToken)
        private readonly userPasswordresetTokenRepository: Repository<UserPasswordresetToken>
    ) { }

    async create(user: User): Promise<UserPasswordresetToken> {
        this.userPasswordresetTokenRepository.delete({ user });

        const token: string = randomBytes(30).toString("hex");
        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + 24);

        const instance: UserPasswordresetToken =
            this.userPasswordresetTokenRepository.create({
                user,
                token,
                expirationDate,
            });

        return await this.userPasswordresetTokenRepository.save(instance);
    }

    async getTokenUser(token: string): Promise<User> {
        const instance: UserPasswordresetToken =
            await this.userPasswordresetTokenRepository.findOne({
                where: { token },
                relations: { user: true },
            });

        this.validate(instance);
        return instance.user;
    }

    private validate(token: UserPasswordresetToken): void {
        console.log(token);
        console.log(new Date());
        if (!token) throw new BadRequestException("Invalid Token!");
        if (token.expirationDate < new Date())
            throw new BadRequestException("Token is expired!");
    }
}
