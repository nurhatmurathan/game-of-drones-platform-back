import { TypeOrmModule } from "@nestjs/typeorm";
import { Training } from "./training.entity";
import { Module } from "@nestjs/common";
import { TrainingService } from "./training.service";
import { TrainingController } from "./training.controller";
import { TournamentTimeModule } from "../tournament.time/tournament.time.module";

@Module({
    imports: [TypeOrmModule.forFeature([Training]), TournamentTimeModule],
    controllers: [TrainingController],
    providers: [TrainingService],
    exports: [TrainingService],
})
export class TrainingModule {}
