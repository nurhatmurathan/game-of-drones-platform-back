import { UserModule } from "./../../entities/user/user.module";
import { Module } from "@nestjs/common";
import { IsEmailAlreadyExist } from "./is-email-exist.constraint";

@Module({
    imports: [UserModule],
    controllers: [],
    providers: [IsEmailAlreadyExist],
    exports: [],
})
export class ValidatorModule {}
