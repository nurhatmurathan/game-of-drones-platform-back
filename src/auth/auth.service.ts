import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import * as bcrypt from "bcrypt";

import { TokenService } from "../entities/register.token/register.token.service";
import { User } from "../entities/user/user.entity";
import { UserService } from "../entities/user/user.service";
import { MailService } from "../mail/mail.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly mailService: MailService,
        private readonly registerTokenService: TokenService
    ) { }

    async signIn(email: string, password: string) {
        console.log("Im in - signIn function");
        const user = await this.userService.findOneByEmail(email);

        console.log("Step 1 in signIn function");
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException();
        }

        console.log("Step 2 in signIn function");
        return this.getAccessRefreshToken(user);
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
        return decodedToken;
    }

    async register(token: string, password: string) {
        const email: string =
            await this.registerTokenService.verifyToken(token);

        const userInstanse = await this.userService.create({ email, password });
        this.registerTokenService.clearRegisterTokens(email);

        return await this.signIn(email, password);
    }

    async verifyMail(email: string) {
        const code: string =
            await this.registerTokenService.createSixNumberedCode(email);

        return await this.mailService.sendUserConfirmation(email, code);
    }

    async verifyCode(code: string) {
        const token: string = await this.registerTokenService.verifyCode(code);
        return { token };
    }

    async signInByUserInstance(user: User) {
        console.log("In AuthService - loginOAuthUser function");
        return this.getAccessRefreshToken(user);
    }

    async validateUser(profile: any): Promise<User> {
        console.log("In AuthService - validateUser function");

        const { name, emails, photos } = profile;
        const email = emails[0].value;

        const user = await this.userService.findOneByEmail(email);
        if (user) return user;

        const password = process.env.GOOGLE_COMMON_USER_PASSWORD;
        const newUser = await this.userService.create({ email, password });

        await this.userService.editProfile(
            newUser.id,
            name.givenName,
            name.familyName,
            photos[0].value
        );

        return newUser;
    }

    private async getAccessRefreshToken(user: User) {
        const payload = { sub: user.id, isAdmin: user.isAdmin };
        console.log("get-tokens", user);

        return {
            access: await this.jwtService.signAsync(payload),
            refresh: await this.jwtService.signAsync(payload, {
                expiresIn: "24h",
            }),
        };
    }
}
