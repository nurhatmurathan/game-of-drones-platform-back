import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { randomBytes } from "crypto";
import { Repository } from "typeorm";
import { Token } from "./token.entity";
@Injectable()
export class TokenService {
    constructor(
        @InjectRepository(Token)
        private readonly tokenRepository: Repository<Token>
    ) {}

    async createSixNumberedCode(email: string): Promise<string> {
        await this.clearRegisterTokens(email);

        const code: string = Math.floor(Math.random() * 1000000)
            .toString()
            .padStart(6, "0");

        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + 1);

        const instance: Token = this.tokenRepository.create({
            email,
            code,
            expirationDate,
        });

        return (await this.tokenRepository.save(instance)).code;
    }

    async verifyCode(code: string): Promise<string> {
        const instance: Token = await this.tokenRepository.findOne({
            where: { code },
        });

        instance.token = randomBytes(20).toString("hex");

        return (await this.tokenRepository.save(instance)).token;
    }

    async verifyToken(token: string): Promise<string> {
        const instance: Token = await this.tokenRepository.findOne({
            where: { token },
        });

        return instance.email;
    }

    async clearRegisterTokens(email: string) {
        await this.tokenRepository.delete({ email });
    }

    async findOneByCode(code: string): Promise<Token | undefined> {
        return await this.tokenRepository.findOne({ where: { code } });
    }

    async findOneByToken(token: string): Promise<Token | undefined> {
        return await this.tokenRepository.findOne({ where: { token } });
    }
}
