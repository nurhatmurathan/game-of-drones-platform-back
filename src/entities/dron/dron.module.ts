import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../user/user.module";
import { Dron } from "./dron.entity";
import { DronService } from "./dron.service";
import { DronController } from './dron.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Dron]), UserModule],
    providers: [DronService],
    exports: [DronService],
    controllers: [DronController],
})
export class DronModule {}
