import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../user/user.module";
import { DronController } from './dron.controller';
import { Dron } from "./dron.entity";
import { DronService } from "./dron.service";

@Module({
    imports: [TypeOrmModule.forFeature([Dron]), UserModule],
    controllers: [DronController],
    providers: [DronService],
    exports: [DronService],
})
export class DronModule { }
