import { Tournament } from "../../entities/tournament/tournament.entity";
import { UserTournamentTime } from "../../entities/user.tournament.time/user.tournament.time.entity";
import { UserTrainingTime } from "../../entities/user.training.time/user.training.time.entity";
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

    @Column({ name: "start_time", type: "timestamp" })
    startTime: Date;

    @Column({ name: "places", type: "integer", default: 0 })
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

    @OneToMany(
        () => UserTrainingTime,
        (userTrainingTime) => userTrainingTime.tournamentTime
    )
    userTrainingTimes: UserTrainingTime[];
}
