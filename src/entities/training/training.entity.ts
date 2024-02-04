import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Route } from "../../entities/route/route.entity";
import { UserTournamentTime } from "../user.tournament.time/user.tournament.time.entity";
import { UserTournamentTrainings } from "../user.tournament.trainings/user.tournament.trainings.entity";

@Entity("training")
export class Training {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "start_time", type: "bigint" })
    startTime: number;

    @Column({ name: "places", type: "integer" })
    places: number;

    @ManyToOne(() => Route, (route) => route.trainings, {
        onDelete: "SET NULL",
    })
    route: Route;

    @ManyToMany(() => UserTournamentTime, (userTournamentTime) => userTournamentTime.trainings)
    userTournamentTimes: UserTournamentTime[];

    @OneToMany(() => UserTournamentTrainings, (userTournamentTrainings) => userTournamentTrainings.training)
    userTournamentTrainings: UserTournamentTrainings[];
}
