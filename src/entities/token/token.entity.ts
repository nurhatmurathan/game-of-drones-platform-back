import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({ name: "expiration_date", type: "timestamptz" })
    expirationDate: Date;
}
