import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { MultilingualtextModule } from "../multilingualtext/multilingualtext.module";
import { UserTournamentTimeModule } from "../user.tournament.time/user.tournament.time.module";
import { ActionAdminController } from "./action.admin.controller";
import { ActionAdminService } from "./action.admin.service";
import { Action } from "./action.entity";
import { ActionService } from "./action.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Action]),
        UserTournamentTimeModule,
        MultilingualtextModule,
    ],
    controllers: [ActionAdminController],
    providers: [ActionService, ActionAdminService],
    exports: [ActionService, ActionAdminService],
})
export class ActionModule { }
