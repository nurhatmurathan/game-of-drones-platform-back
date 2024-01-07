import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { TokenService } from "../entities/token/token.service";
import { UserService } from "../entities/user/user.service";
import { MailService } from "../mail/mail.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly mailService: MailService,
        private readonly tokenService: TokenService
    ) {}

    async signIn(email: string, password: string) {
        const user = await this.userService.findOneByEmail(email);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.id, isAdmin: user.isAdmin };
        return {
            access: await this.jwtService.signAsync(payload),
            refresh: await this.jwtService.signAsync(payload, {
                expiresIn: "24h",
            }),
        };
    }

    async loginOAuthUser(payload: any) {
        return {
            access: await this.jwtService.signAsync(payload),
            refresh: await this.jwtService.signAsync(payload, {
                expiresIn: "24h",
            }),
        };
    }

    async refreshJWTToken(refreshToken: string) {
        const decodedToken = await this.jwtService.verify(refreshToken);

        const payload = { sub: decodedToken.sub, email: decodedToken.email };

        return {
            access: await this.jwtService.signAsync(payload),
        };
    }

    async verifyJWTToken(token: string) {
        const decodedToken = await this.jwtService.verify(token);

        return {};
    }

    async register(token: string, password: string) {
        const email: string = await this.tokenService.verifyToken(token);

        const userInstanse = await this.userService.create({ email, password });

        this.tokenService.clearRegisterTokens(email);

        return this.signIn(email, password);
    }

    async verifyMail(email: string) {
        const code: string =
            await this.tokenService.createSixNumberedCode(email);

        this.mailService.sendUserConfirmation(email, code);

        return { message: "Code is sended to you email" };
    }

    async verifyCode(code: string) {
        const token: string = await this.tokenService.verifyCode(code);

        return { token };
    }
}
