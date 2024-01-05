import { Test, TestingModule } from '@nestjs/testing';
import { BillingAccountService } from './billing.account.service';

describe('BillingAccountService', () => {
  let service: BillingAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BillingAccountService],
    }).compile();

    service = module.get<BillingAccountService>(BillingAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
