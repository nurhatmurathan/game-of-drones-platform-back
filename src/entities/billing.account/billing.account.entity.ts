import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    Double,
} from "typeorm";

@Entity("billingaccount")
export class BillingAccount {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "balance", type: "double precision", default: 0 })
    balance: number;
}
