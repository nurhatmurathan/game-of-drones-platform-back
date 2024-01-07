import { MailModule } from "./../mail/mail.module";
import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserModule } from "../entities/user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { GoogleStrategy } from "./strategies/google.strategy";
import { TokenModule } from "src/entities/token/token.module";

@Module({
    imports: [
        UserModule,
        MailModule,
        TokenModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: "5h" },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, GoogleStrategy],
    exports: [AuthService],
})
export class AuthModule { }
