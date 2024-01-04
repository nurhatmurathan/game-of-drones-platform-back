import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Route } from "./route.entity";
import { RouteController } from "./route.controller";
import { RouteService } from "./route.service";
import { MultilingualtextModule } from "../../entities/multilingualtext/multilingualtext.module";
import { UtilModule } from "../../utils/util.module";
import { RouteAdminController } from "./route.admin.controller";
import { RouteAdminService } from "./route.admin.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Route]),
        MultilingualtextModule,
        UtilModule,
    ],
    controllers: [RouteController, RouteAdminController],
    providers: [RouteService, RouteAdminService],
    exports: [RouteService, RouteAdminService],
})
export class RouteModule {}
