import { MultilingualText } from "../../entities/multilingualtext/multilingualtext.entity";
import { Tournament } from "../../entities/tournament/tournament.entity";
import { User } from "../../entities/user/user.entity";
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    OneToOne,
    JoinColumn,
} from "typeorm";

@Entity("liga")
export class Liga {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "name", type: "varchar", length: 50 })
    name: string;

    @OneToOne(() => MultilingualText, (multilingualText) => multilingualText.liga, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    description: MultilingualText;

    @OneToMany(() => User, (user) => user.liga, {
        cascade: true,
        nullable: true
    })
    users: User[];

    @OneToMany(() => Tournament, (tournament) => tournament.liga, {
        cascade: true,
        nullable: true,
    })
    tournaments: Tournament[];
}
