import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "service_id", type: 'uuid' })
    serviceId: string = uuidv4();

    @Column({ name: "merchant_name", type: "varchar" })
    merchantName: string;

    @Column({ name: "name", type: "varchar" })
    name: string;

    @Column({ name: "quantity", type: "int" })
    quantity: number;

    @Column({ name: "amount_one_pcs", type: "int" })
    amountOnePcs: number;
}
