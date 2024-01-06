import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.entity";

@Entity("user_token")
export class UserToken {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "token", type: "varchar" })
    token: string;

    @Column({ name: "expiration_date", type: "timestamp" })
    expirationDate: Date;

    @ManyToOne(() => User)
    user: User;
}
