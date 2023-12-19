import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserTournamentTime } from "./user.tournament.time.entity";
import { UserTournamentTimeController } from "./user.tournament.time.controller";
import { UserTournamentTimeService } from "./user.tournament.time.service";

@Module({
    imports: [TypeOrmModule.forFeature([UserTournamentTime])],
    controllers: [UserTournamentTimeController],
    providers: [UserTournamentTimeService],
    exports: [UserTournamentTimeService],
})
export class UserTournamentTimeModule {}
