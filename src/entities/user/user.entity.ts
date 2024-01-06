import { Liga } from "../../entities/liga/liga.entity";
import { UserTournamentTime } from "../../entities/user.tournament.time/user.tournament.time.entity";
import { BillingAccount } from "../billing.account/billing.account.entity";
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    JoinColumn,
} from "typeorm";
import { UserToken } from "../user.token/user.token.entity";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "first_name", type: "varchar", length: 50, nullable: true })
    firstName: string;

    @Column({ name: "last_name", type: "varchar", length: 50, nullable: true })
    lastName: string;

    @Column({
        name: "middle_name",
        type: "varchar",
        length: 50,
        nullable: true,
    })
    middleName: string;

    @Column({ name: "email", type: "varchar", length: 100, unique: true })
    email: string;

    @Column({ name: "password", type: "varchar" })
    password: string;

    @Column({ name: "iin", type: "varchar", length: 12, unique: true })
    iin: string;

    @Column({ name: "avatar", type: "varchar", nullable: true })
    avatar: string;

    @Column({ name: "is_admin", type: "boolean", default: false })
    isAdmin: boolean;

    @OneToOne(() => BillingAccount)
    @JoinColumn()
    billingAccount: BillingAccount;

    @ManyToOne(() => Liga, (liga) => liga.users, {
        onDelete: "SET NULL",
    })
    liga: Liga;

    @OneToMany(
        () => UserTournamentTime,
        (userTournamentTime) => userTournamentTime.user
    )
    userTournamentTimes: UserTournamentTime[];

    @OneToMany(() => UserToken, (userToken) => userToken.user)
    userTokens: UserToken[];
}
