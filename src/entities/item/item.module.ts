import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Item } from "./item.entity";
import { ItemService } from "./item.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Item]),
    ],
    controllers: [],
    providers: [ItemService],
    exports: [ItemService],
})
export class ItemModule { }
