import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.entity";

@Entity("user_rasswordreset_token")
export class UserPasswordresetToken {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    user: User;

    @Column({ name: "token", type: "varchar", unique: true })
    token: string;

    @Column({ name: "expiration_date", type: "timestamp" })
    expirationDate: Date;
}
