import { Module } from "@nestjs/common";
import { UserTokenService } from "./user.token.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserToken } from "./user.token.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UserToken])],
    providers: [UserTokenService],
    exports: [UserTokenService],
})
export class UserTokenModule {}
