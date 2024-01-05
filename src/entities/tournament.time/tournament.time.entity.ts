import { Tournament } from "../../entities/tournament/tournament.entity";
import { UserTournamentTime } from "../../entities/user.tournament.time/user.tournament.time.entity";
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
} from "typeorm";

@Entity("tournamenttime")
export class TournamentTime {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "start_time", type: "bigint" })
    startTime: number;

    @Column({ name: "places", type: "integer" })
    places: number;

    @Column({ name: "reserved", type: "integer", default: 0 })
    reserved: number;

    @ManyToOne(() => Tournament, (tournament) => tournament.tournamentTimes)
    tournament: Tournament;

    @OneToMany(
        () => UserTournamentTime,
        (userTournamentTime) => userTournamentTime.tournamentTime
    )
    userTournamentTimes: UserTournamentTime[];
}
