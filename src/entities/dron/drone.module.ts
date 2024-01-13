import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { UserModule } from "../user/user.module";
import { DroneController } from './drone.controller';
import { Drone } from "./drone.entity";
import { DroneService } from "./drone.service";

@Module({
    imports: [TypeOrmModule.forFeature([Drone]), UserModule, AuthModule],
    controllers: [DroneController],
    providers: [DroneService],
    exports: [DroneService],
})
export class DronModule { }
