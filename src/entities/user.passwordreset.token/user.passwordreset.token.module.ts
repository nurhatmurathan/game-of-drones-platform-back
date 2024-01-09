import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserPasswordresetToken } from "./user.passwordreset.token.entity";
import { UserPasswordresetTokenService } from "./user.passwordreset.token.service";

@Module({
    imports: [TypeOrmModule.forFeature([UserPasswordresetToken])],
    providers: [UserPasswordresetTokenService],
    exports: [UserPasswordresetTokenService],
})
export class UserPasswordresetTokenModule {}
