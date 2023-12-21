import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { MultilingualText } from "./multilingualtext.entity";
import { MultilingualtextService } from "./multilingualtext.service";

@Module({
    imports: [TypeOrmModule.forFeature([MultilingualText])],
    providers: [MultilingualtextService],
    exports: [MultilingualtextService],
})
export class MultilingualtextModule {}
