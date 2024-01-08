import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TournamentTime } from "./tournament.time.entity";

import { UserModule } from '../user/user.module';
import { TournamentTimeAdminController } from "./tournament.time.admin.controller";
import { TournamentTimeAdminService } from "./tournament.time.admin.service";
import { TournamentTimeController } from './tournament.time.controller';
import { TournamentTimeService } from './tournament.time.service';

@Module({
    imports: [TypeOrmModule.forFeature([TournamentTime]), UserModule],
    controllers: [TournamentTimeController, TournamentTimeAdminController],
    providers: [TournamentTimeService, TournamentTimeAdminService],
    exports: [TournamentTimeService, TournamentTimeAdminService],
})
export class TournamentTimeModule { }
