// src/auth/google.strategy.ts
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { UserService } from "../entities/user/user.service"; // Adjust the path as needed
import { AuthService } from "./auth.service";
import { UserCreateDto } from "src/entities/user/dto/user.create.dto";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
    constructor(
        private authService: AuthService,
        private userService: UserService
    ) {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/auth/google/callback",
            scope: ["email", "profile"],
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback
    ): Promise<any> {
        const { name, emails, photos } = profile;

        console.log(profile);
        let user = await this.userService.findOneByEmail(emails[0].value);
        if (!user) {
            const userCreateDto = this.createUserDto(
                emails[0].value,
                "122334455668",
                process.env.GOOGLE_COMMON_USER_PASSWORD
            );
            user = await this.userService.create(userCreateDto, false);
        }

        const payload = { sub: user.id, isAdmin: user.isAdmin };
        const tokens = await this.authService.loginOAuthUser(payload);
        return { user: payload, tokens };
    }

    private createUserDto(
        email: string,
        iin: string,
        password: string
    ): UserCreateDto {
        const userDto = new UserCreateDto();
        userDto.email = email;
        userDto.password = password;
        return userDto;
    }
}
