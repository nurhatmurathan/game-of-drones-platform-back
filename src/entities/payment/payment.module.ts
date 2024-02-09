import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../../auth/auth.module";
import { UtilModule } from "../../utils/util.module";
import { ItemModule } from "../item/item.module";
import { TournamentModule } from "../tournament/tournament.module";
import { UserModule } from "../user/user.module";
import { Order } from "./order.entity";
import { PaymentController } from "./payment.controller";
import { PaymentService } from "./payment.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Order]),
        HttpModule,
        AuthModule,
        UserModule,
        ItemModule,
        UtilModule,
        TournamentModule,
    ],
    controllers: [PaymentController],
    providers: [PaymentService],
    exports: [PaymentService],
})
export class PaymentModule {}
