import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { OrderStatus } from '../../common/enums/order.status';
import { Tournament } from '../tournament/tournament.entity';
import { User } from '../user/user.entity';

@Entity()
export class Order {
    @PrimaryColumn({ name: "order_id", type: "uuid" })
    id: string = uuidv4();

    @Column({ name: "payment_id", type: "varchar", nullable: true })
    paymentId: string;

    @Column({ name: "status", type: 'enum', enum: OrderStatus, default: OrderStatus.Created })
    status: OrderStatus;

    @ManyToOne(() => User)
    user: User;

    @ManyToOne(() => Tournament)
    tournament: Tournament;
}
