import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { User } from "../user/user.entity";

@Entity("dron")
export class Dron {
    @PrimaryColumn()
    id: string;

    @Column({ name: "name", type: "varchar" })
    name: string;

    @OneToOne(() => User, { nullable: true })
    @JoinColumn()
    description: User;
}
