import { Test, TestingModule } from '@nestjs/testing';
import { UserPasswordresetTokenService } from './user.passwordreset.token.service';

describe('UserPasswordresetTokenService', () => {
  let service: UserPasswordresetTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserPasswordresetTokenService],
    }).compile();

    service = module.get<UserPasswordresetTokenService>(UserPasswordresetTokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
