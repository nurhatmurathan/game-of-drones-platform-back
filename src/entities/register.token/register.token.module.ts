import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RegisterToken } from "./register.token.entity";
import { TokenService } from "./register.token.service";

@Module({
    imports: [TypeOrmModule.forFeature([RegisterToken])],
    providers: [TokenService],
    exports: [TokenService],
})
export class TokenModule {}
