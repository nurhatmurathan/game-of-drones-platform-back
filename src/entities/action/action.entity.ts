import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { MultilingualText } from "../../entities/multilingualtext/multilingualtext.entity";
import { Task } from "../../entities/task/task.entity";
import { UserTournamentTime } from "../../entities/user.tournament.time/user.tournament.time.entity";

@Entity("action")
export class Action {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => MultilingualText)
    @JoinColumn()
    description: MultilingualText;

    @Column({ name: "time", type: "bigint" })
    time: number;

    @ManyToOne(
        () => UserTournamentTime,
        (userTournamentTime) => userTournamentTime.actions,
        {
            onDelete: 'CASCADE'
        }
    )
    userTournamentTime: UserTournamentTime;

    @ManyToOne(
        () => Task,
        (task) => task.actions,
        {
            onDelete: 'CASCADE'
        }
    )
    task: Task;
}
