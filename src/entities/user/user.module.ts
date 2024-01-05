import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";

import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserAdminController } from "./user.admin.controller";
import { UserAdminService } from "./user.admin.service";
import { BillingAccountModule } from "../billing.account/billing.account.module";

@Module({
    imports: [TypeOrmModule.forFeature([User]), BillingAccountModule],
    controllers: [UserController, UserAdminController],
    providers: [UserService, UserAdminService],
    exports: [UserService, UserAdminService],
})
export class UserModule {}
