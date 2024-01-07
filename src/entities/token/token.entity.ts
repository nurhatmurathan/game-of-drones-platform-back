import { IsEmail } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.entity";

@Entity("token")
export class Token {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "email", type: "varchar" })
    email: string;

    @Column({ name: "code", type: "varchar", unique: true })
    code: string;

    @Column({ name: "token", type: "varchar", unique: true, default: null })
    token: string;

    @Column({ name: "expiration_date", type: "timestamp" })
    expirationDate: Date;
}
