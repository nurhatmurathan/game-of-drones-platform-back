import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { User } from "../user/user.entity";

@Entity("drone")
export class Drone {
    @PrimaryColumn()
    id: string;

    @Column({ name: "name", type: "varchar" })
    name: string;

    @Column({ name: "is_online", type: "boolean", default: false })
    isOnline: boolean;

    @OneToOne(() => User, { nullable: true })
    @JoinColumn()
    user: User;
}
