import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserTournamentTimeModule } from "./../user.tournament.time/user.tournament.time.module";
import { TournamentTime } from "./tournament.time.entity";

import { AuthModule } from "src/auth/auth.module";
import { DronModule } from "../dron/drone.module";
import { UserModule } from "../user/user.module";
import { TournamentTimeAdminController } from "./tournament.time.admin.controller";
import { TournamentTimeAdminService } from "./tournament.time.admin.service";
import { TournamentTimeController } from "./tournament.time.controller";
import { TournamentTimeService } from "./tournament.time.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([TournamentTime]),
        UserModule,
        DronModule,
        AuthModule,
        forwardRef(() => UserTournamentTimeModule),
    ],
    controllers: [TournamentTimeController, TournamentTimeAdminController],
    providers: [TournamentTimeService, TournamentTimeAdminService],
    exports: [TournamentTimeService, TournamentTimeAdminService],
})
export class TournamentTimeModule {}
