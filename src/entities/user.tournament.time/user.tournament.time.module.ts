import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserTournamentTime } from "./user.tournament.time.entity";
import { UserTournamentTimeController } from "./user.tournament.time.controller";
import { UserTournamentTimeService } from "./user.tournament.time.service";
import { TournamentTimeModule } from "../tournament.time/tournament.time.module";
import { UtilModule } from "src/utils/util.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserTournamentTime]),
        TournamentTimeModule,
        UtilModule,
    ],
    controllers: [UserTournamentTimeController],
    providers: [UserTournamentTimeService],
    exports: [UserTournamentTimeService],
})
export class UserTournamentTimeModule { }
