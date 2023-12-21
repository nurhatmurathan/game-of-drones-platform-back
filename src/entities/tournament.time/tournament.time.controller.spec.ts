import { Test, TestingModule } from "@nestjs/testing";
import { TournamentTimeController } from "./tournament.time.controller";

describe("TournamentTimeController", () => {
    let controller: TournamentTimeController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TournamentTimeController],
        }).compile();

        controller = module.get<TournamentTimeController>(
            TournamentTimeController
        );
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
