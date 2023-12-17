import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Route } from './route.entity';
import { RouteController } from './route.controller';
import { RouteService } from './route.service';
import { MultilingualtextModule } from '../../entities/multilingualtext/multilingualtext.module';


@Module({
    imports: [TypeOrmModule.forFeature([Route]), MultilingualtextModule],
    controllers: [RouteController],
    providers: [RouteService],
    exports: [RouteService]
})
export class RouteModule {}
