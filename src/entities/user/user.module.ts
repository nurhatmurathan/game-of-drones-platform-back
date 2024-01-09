import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MailModule } from "./../../mail/mail.module";
import { User } from "./user.entity";

import { BillingAccountModule } from "../billing.account/billing.account.module";
import { UserPasswordresetTokenModule } from "../user.passwordreset.token/user.passwordreset.token.module";
import { UserAdminController } from "./user.admin.controller";
import { UserAdminService } from "./user.admin.service";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        BillingAccountModule,
        MailModule,
        UserPasswordresetTokenModule,
    ],
    controllers: [UserController, UserAdminController],
    providers: [UserService, UserAdminService],
    exports: [UserService, UserAdminService],
})
export class UserModule {}
