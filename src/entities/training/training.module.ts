import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TournamentTimeModule } from "../tournament.time/tournament.time.module";
import { TournamentModule } from "../tournament/tournament.module";
import { TrainingAdminController } from "./training.admin.controller";
import { TrainingAdminService } from "./training.admin.service";
import { TrainingController } from "./training.controller";
import { Training } from "./training.entity";
import { TrainingService } from "./training.service";

@Module({
    imports: [TypeOrmModule.forFeature([Training]), TournamentTimeModule, TournamentModule],
    controllers: [TrainingController, TrainingAdminController],
    providers: [TrainingService, TrainingAdminService],
    exports: [TrainingService, TrainingAdminService],
})
export class TrainingModule {}
