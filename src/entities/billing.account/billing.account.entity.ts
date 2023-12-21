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

    @Column({ name: "balance", type: "money", nullable: true })
    balance: number;
}
