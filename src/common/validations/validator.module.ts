import { Module } from "@nestjs/common";
import { TokenModule } from "../../entities/token/token.module";
import { UserModule } from "./../../entities/user/user.module";
import { IsEmailAlreadyExist } from "./is-email-exist.constraint";
import { IsValidCode } from "./is-valid-code.constraint";
import { IsValidToken } from "./is-valid-token.constraint";

@Module({
    imports: [UserModule, TokenModule],
    controllers: [],
    providers: [IsEmailAlreadyExist, IsValidCode, IsValidToken],
    exports: [],
})
export class ValidatorModule {}
