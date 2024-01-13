import { Module } from "@nestjs/common";
import { DronModule } from "../../entities/dron/drone.module";
import { TokenModule } from "../../entities/register.token/register.token.module";
import { UserModule } from "./../../entities/user/user.module";
import { IsDronAlreadyExist } from "./is-drone-exist.constraint";
import { IsEmailAlreadyExist } from "./is-email-exist.constraint";
import { IsValidCode } from "./is-valid-code.constraint";
import { IsValidToken } from "./is-valid-token.constraint";

@Module({
    imports: [UserModule, TokenModule, DronModule],
    controllers: [],
    providers: [
        IsEmailAlreadyExist,
        IsValidCode,
        IsValidToken,
        IsDronAlreadyExist,
    ],
    exports: [],
})
export class ValidatorModule { }
