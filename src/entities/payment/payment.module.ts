import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { ItemModule } from "../item/item.module";
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
        ItemModule
    ],
    controllers: [PaymentController],
    providers: [PaymentService],
    exports: [PaymentService],
})
export class PaymentModule { }
