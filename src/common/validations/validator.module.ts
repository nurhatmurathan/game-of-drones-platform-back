import { UserModule } from "./../../entities/user/user.module";
import { Module } from "@nestjs/common";
import { IsEmailAlreadyExist } from "./is-email-exist.constraint";
import { IsIINAlreadyExist } from "./is-iin-exist.constraint";

@Module({
    imports: [UserModule],
    controllers: [],
    providers: [IsEmailAlreadyExist, IsIINAlreadyExist],
    exports: [],
})
export class ValidatorModule {}
