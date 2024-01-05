import { Module } from "@nestjs/common";
import { BillingAccount } from "./billing.account.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BillingAccountService } from "./billing.account.service";

@Module({
    imports: [TypeOrmModule.forFeature([BillingAccount])],
    providers: [BillingAccountService],
    exports: [BillingAccountService],
})
export class BillingAccountModule {}
