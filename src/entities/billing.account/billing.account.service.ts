import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BillingAccount } from "./billing.account.entity";
import { Repository } from "typeorm";

@Injectable()
export class BillingAccountService {
    constructor(
        @InjectRepository(BillingAccount)
        private readonly billingAccountRepository: Repository<BillingAccount>
    ) {}

    async create(): Promise<BillingAccount> {
        const instance: BillingAccount = this.billingAccountRepository.create();

        return await this.billingAccountRepository.save(instance);
    }
}
