import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
} from "typeorm";
import { Action } from "../../entities/action/action.entity";
import { TournamentTime } from "../../entities/tournament.time/tournament.time.entity";
import { User } from "../../entities/user/user.entity";
import { Training } from "../training/training.entity";

@Entity("user_tournamenttime")
@Unique(["user", "tournamentTime"])
export class UserTournamentTime {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "place", type: "integer", default: null, nullable: true })
    place: number;

    @ManyToOne(
        () => TournamentTime,
        (tournamentTime) => tournamentTime.userTournamentTimes,
        {
            onDelete: 'SET NULL'
        }
    )
    tournamentTime: TournamentTime;

    @ManyToOne(
        () => User,
        (user) => user.userTournamentTimes,
        {
            onDelete: 'CASCADE'
        }
    )
    user: User;

    @OneToMany(
        () => Action,
        (action) => action.userTournamentTime,
        {
            cascade: ['remove']
        }
    )
    actions: Action[];

    @ManyToMany(
        () => Training,
        (training) => training.userTournamentTimes,
    )
    @JoinTable()
    trainings: Training[];
}
