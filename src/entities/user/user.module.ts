import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";

import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserAdminController } from "./user.admin.controller";
import { UserAdminService } from "./user.admin.service";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController, UserAdminController],
    providers: [UserService, UserAdminService],
    exports: [UserService, UserAdminService],
})
export class UserModule {}
