import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Liga } from "./liga.entity";
import { LigaController } from "./liga.controller";
import { LigaService } from "./liga.service";
import { MultilingualtextModule } from "../../entities/multilingualtext/multilingualtext.module";
import { UtilModule } from "../../utils/util.module";
import { LigaAdminController } from "./liga.admin.controller";
import { LigaAdminService } from "./liga.admin.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Liga]),
        MultilingualtextModule,
        UtilModule,
    ],
    controllers: [LigaController, LigaAdminController],
    providers: [LigaService, LigaAdminService],
    exports: [LigaService],
})
export class LigaModule {}
