import { Test, TestingModule } from "@nestjs/testing";
import { TournamentTimeService } from "./tournament.time.service";

describe("TournamentTimeService", () => {
    let service: TournamentTimeService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TournamentTimeService],
        }).compile();

        service = module.get<TournamentTimeService>(TournamentTimeService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
