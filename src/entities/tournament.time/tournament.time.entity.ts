import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tournament } from "../../entities/tournament/tournament.entity";
import { UserTournamentTime } from "../../entities/user.tournament.time/user.tournament.time.entity";

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

    @Column({ name: "stage", type: "integer", nullable: true })
    stage: number;

    @ManyToOne(() => Tournament, (tournament) => tournament.tournamentTimes, {
        onDelete: "SET NULL",
    })
    tournament: Tournament;

    @OneToMany(() => UserTournamentTime, (userTournamentTime) => userTournamentTime.tournamentTime, {
        cascade: ["remove"],
    })
    userTournamentTimes: UserTournamentTime[];
}
