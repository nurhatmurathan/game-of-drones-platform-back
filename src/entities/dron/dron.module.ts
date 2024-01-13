import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../user/user.module";
import { Dron } from "./dron.entity";
import { DronService } from "./dron.service";

@Module({
    imports: [TypeOrmModule.forFeature([Dron]), UserModule],
    providers: [DronService],
    exports: [DronService],
})
export class DronModule {}
