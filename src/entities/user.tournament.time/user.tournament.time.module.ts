import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UtilModule } from "src/utils/util.module";
import { UserTournamentTimeController } from "./user.tournament.time.controller";
import { UserTournamentTime } from "./user.tournament.time.entity";
import { UserTournamentTimeService } from "./user.tournament.time.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserTournamentTime]),
        UtilModule,
    ],
    controllers: [UserTournamentTimeController],
    providers: [UserTournamentTimeService],
    exports: [UserTournamentTimeService],
})
export class UserTournamentTimeModule { }
