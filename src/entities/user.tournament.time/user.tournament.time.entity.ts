import { Action } from "../../entities/action/action.entity";
import { TournamentTime } from "../../entities/tournament.time/tournament.time.entity";
import { User } from "../../entities/user/user.entity";
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
} from "typeorm";

@Entity("user_tournamenttime")
export class UserTournamentTime {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "place", type: "integer", default: null })
    place: number;

    @ManyToOne(
        () => TournamentTime,
        (tournamentTime) => tournamentTime.userTournamentTimes
    )
    tournamentTime: TournamentTime;

    @ManyToOne(() => User, (user) => user.userTournamentTimes)
    user: User;

    @OneToMany(() => Action, (action) => action.userTournamentTime)
    actions: Action[];
}
