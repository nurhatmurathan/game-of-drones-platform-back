import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BillingAccount } from "./billing.account.entity";

@Injectable()
export class BillingAccountService {
    constructor(
        @InjectRepository(BillingAccount)
        private readonly billingAccountRepository: Repository<BillingAccount>
    ) { }

    async create(): Promise<BillingAccount> {
        const instance = this.billingAccountRepository.create();

        return await this.billingAccountRepository.save(instance);
    }
}
