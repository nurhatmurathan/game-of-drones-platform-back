import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UtilModule } from "../../utils/util.module";
import { ActionModule } from "../action/action.module";
import { MultilingualtextModule } from "../multilingualtext/multilingualtext.module";
import { UserTournamentTimeModule } from "../user.tournament.time/user.tournament.time.module";
import { UserModule } from "../user/user.module";
import { TaskAdminController } from "./task.admin.controller";
import { TaskAdminService } from "./task.admin.service";
import { TaskController } from "./task.controller";
import { Task } from "./task.entity";
import { TaskService } from "./task.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Task]),
        MultilingualtextModule,
        UserModule,
        UtilModule,
        forwardRef(() => ActionModule),
        UserTournamentTimeModule,
    ],
    controllers: [TaskController, TaskAdminController],
    providers: [TaskService, TaskAdminService],
    exports: [TaskService],
})
export class TaskModule { }
