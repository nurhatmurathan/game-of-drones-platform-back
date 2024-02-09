import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UtilModule } from "../../utils/util.module";
import { UserTournamentTimeAdminService } from "./user.tournament.time.admin.service";
import { UserTournamentTimeController } from "./user.tournament.time.controller";
import { UserTournamentTime } from "./user.tournament.time.entity";
import { UserTournamentTimeService } from "./user.tournament.time.service";

@Module({
    imports: [TypeOrmModule.forFeature([UserTournamentTime]), UtilModule],
    controllers: [UserTournamentTimeController],
    providers: [UserTournamentTimeService, UserTournamentTimeAdminService],
    exports: [UserTournamentTimeService, UserTournamentTimeAdminService],
})
export class UserTournamentTimeModule {}
