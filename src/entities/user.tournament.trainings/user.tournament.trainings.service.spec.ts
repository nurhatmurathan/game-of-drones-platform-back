import { Test, TestingModule } from '@nestjs/testing';
import { UserTournamentTrainingsService } from './user.tournament.trainings.service';

describe('UserTournamentTrainingsService', () => {
  let service: UserTournamentTrainingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserTournamentTrainingsService],
    }).compile();

    service = module.get<UserTournamentTrainingsService>(UserTournamentTrainingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
