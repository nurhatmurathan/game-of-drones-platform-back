import { UserService } from "../entities/user/user.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UserLoginDto } from "./dto/auth.login.dto";
import { AuthRegisterDto } from "./dto/auth.register.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {
        console.log("UserService in Auth:", this.userService);
    }

    async signIn(userData: UserLoginDto) {
        const user = await this.userService.findOneByEmail(userData.email);

        if (
            !user ||
            !(await bcrypt.compare(userData.password, user.password))
        ) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.id, email: user.email };
        return {
            access: await this.jwtService.signAsync(payload),
            refresh: await this.jwtService.signAsync(payload, {
                expiresIn: "24h",
            }),
        };
    }

    async refreshToken(refreshToken: string) {
        const decodedToken = await this.jwtService.verify(refreshToken);

        const payload = { sub: decodedToken.sub, email: decodedToken.email };

        return {
            access: await this.jwtService.signAsync(payload),
        };
    }

    async verifyToken(token: string) {
        const decodedToken = await this.jwtService.verify(token);

        return {};
    }

    async register(userData: AuthRegisterDto) {
        console.log("Step 1");
        await this.userService.create(userData);

        console.log("Step 2");
        return this.signIn(userData);
    }
}
