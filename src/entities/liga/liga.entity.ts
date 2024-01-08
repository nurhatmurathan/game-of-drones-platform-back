import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import { MultilingualText } from "../../entities/multilingualtext/multilingualtext.entity";

@Entity("liga")
export class Liga {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "name", type: "varchar", length: 50 })
    name: string;

    @OneToOne(() => MultilingualText)
    @JoinColumn()
    description: MultilingualText;

    // @OneToMany(() => User, (user) => user.liga, {
    //     cascade: true,
    //     nullable: true
    // })
    // users: User[];

    // @OneToMany(() => Tournament, (tournament) => tournament.liga, {
    //     cascade: true,
    //     nullable: true,
    // })
    // tournaments: Tournament[];
}
