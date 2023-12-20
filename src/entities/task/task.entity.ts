import { MultilingualText } from "../../entities/multilingualtext/multilingualtext.entity";
import { Action } from "../../entities/action/action.entity";
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    OneToMany,
    JoinColumn,
} from "typeorm";

@Entity("task")
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "max_count", type: "integer" })
    maxCount: number;

    @Column({ name: "name", type: "varchar" })
    name: string;

    @Column({ name: "inOneGme", type: "boolean" })
    inOneGame: boolean;

    @OneToOne(() => MultilingualText)
    @JoinColumn()
    description: MultilingualText;

    @OneToOne(() => MultilingualText)
    @JoinColumn()
    taskDescription: MultilingualText;

    @Column({ name: "reward", type: "varchar" })
    reward: string;

    @OneToMany(() => Action, (action) => action.task)
    actions: Action[];
}
