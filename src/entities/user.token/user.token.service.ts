import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { UserToken } from "./user.token.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserTokenService {
    constructor(
        @InjectRepository(UserToken)
        private readonly tokenRepository: Repository<UserToken>
    ) {}

    async createSixNumbered(userId: number): Promise<UserToken> {
        const token: string = Math.floor(Math.random() * 1000000)
            .toString()
            .padStart(6, "0"); // 0 to 999999

        const expirationDate: Date = new Date();
        expirationDate.setHours(expirationDate.getHours() + 24);

        const instance: UserToken = this.tokenRepository.create({
            user: { id: userId },
            token,
            expirationDate,
        });

        return await this.tokenRepository.save(instance);
    }
}
