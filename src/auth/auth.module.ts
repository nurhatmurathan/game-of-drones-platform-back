import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserModule } from "../entities/user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UserService } from "../entities/user/user.service";
import { GoogleStrategy } from "./google.strategy";

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: "5h" },
        }),
    ],
    providers: [AuthService, GoogleStrategy],
    controllers: [AuthController],
    exports: [],
})
export class AuthModule { }
