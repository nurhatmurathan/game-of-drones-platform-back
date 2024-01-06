import { Route } from "../../entities/route/route.entity";
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
    ManyToMany,
} from "typeorm";
import { UserTournamentTime } from "../user.tournament.time/user.tournament.time.entity";

@Entity("training")
export class Training {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "start_time", type: "bigint" })
    startTime: number;

    @Column({ name: "places", type: "integer" })
    places: number;

    @Column({ name: "reserved", type: "integer", default: 0 })
    reserved: number;

    @ManyToOne(() => Route, (route) => route.trainings)
    route: Route;

    @ManyToMany(
        () => UserTournamentTime,
        (userTournamentTime) => userTournamentTime.trainings
    )
    userTournamentTimes: UserTournamentTime[];
}
