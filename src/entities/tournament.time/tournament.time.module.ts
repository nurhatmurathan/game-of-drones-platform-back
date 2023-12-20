import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TournamentTime } from "./tournament.time.entity";

import { TournamentModule } from "../tournament/tournament.module";
import { TournamentTimeController } from "./tournament.time.controller";
import { TournamentTimeService } from "./tournament.time.service";

@Module({
    imports: [TypeOrmModule.forFeature([TournamentTime])],
    controllers: [TournamentTimeController],
    providers: [TournamentTimeService],
    exports: [TournamentTimeService],
})
export class TournamentTimeModule {}
