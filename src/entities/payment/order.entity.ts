import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../user/user.entity';

@Entity()
export class Order {
    @PrimaryColumn({ name: "order_id", type: "uuid" })
    id: string = uuidv4();

    @Column({ name: "payment_id", type: "varchar", nullable: true })
    paymentId: string;

    @ManyToOne(() => User)
    user: User;
}
