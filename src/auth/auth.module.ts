import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TokenModule } from "src/entities/token/token.module";
import { UserModule } from "../entities/user/user.module";
import { MailModule } from "./../mail/mail.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { FacebookStrategy, GoogleStrategy } from "./strategies";

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
    providers: [AuthService, GoogleStrategy, FacebookStrategy],
    exports: [AuthService],
})
export class AuthModule { }
