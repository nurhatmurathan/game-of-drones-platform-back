import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UtilModule } from "src/utils/util.module";
import { TournamentTimeModule } from "../tournament.time/tournament.time.module";
import { UserTournamentTimeController } from "./user.tournament.time.controller";
import { UserTournamentTime } from "./user.tournament.time.entity";
import { UserTournamentTimeService } from "./user.tournament.time.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserTournamentTime]),
        forwardRef(() => TournamentTimeModule),
        UtilModule,
    ],
    controllers: [UserTournamentTimeController],
    providers: [UserTournamentTimeService],
    exports: [UserTournamentTimeService],
})
export class UserTournamentTimeModule {}
