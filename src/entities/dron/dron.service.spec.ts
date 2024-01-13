import { Test, TestingModule } from '@nestjs/testing';
import { DronService } from './dron.service';

describe('DronService', () => {
  let service: DronService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DronService],
    }).compile();

    service = module.get<DronService>(DronService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
