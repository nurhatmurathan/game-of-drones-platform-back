import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Route } from "./route.entity";
import { RouteController } from "./route.controller";
import { RouteService } from "./route.service";
import { MultilingualtextModule } from "../../entities/multilingualtext/multilingualtext.module";
import { UtilModule } from "../../utils/util.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Route]),
        MultilingualtextModule,
        UtilModule,
    ],
    controllers: [RouteController],
    providers: [RouteService],
    exports: [RouteService],
})
export class RouteModule {}
