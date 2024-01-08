import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Route } from "../../entities/route/route.entity";
import { TournamentTime } from "../../entities/tournament.time/tournament.time.entity";
import { MultilingualText } from "../multilingualtext/multilingualtext.entity";

@Entity("tournament")
export class Tournament {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "name", type: "varchar", length: 50 })
    name: string;

    @Column({ name: "start_date", type: "bigint" })
    startDate: number;

    @Column({ name: "price", type: "double precision" })
    price: number;

    // @ManyToOne(() => Liga, (liga) => liga.tournaments, {
    //     onDelete: "SET NULL",
    // })
    // liga: Liga;

    @ManyToOne(() => Route, (route) => route.tournaments)
    route: Route;

    @OneToOne(() => MultilingualText)
    @JoinColumn()
    coverDescription: MultilingualText;

    @OneToOne(() => MultilingualText)
    @JoinColumn()
    description: MultilingualText;

    @OneToMany(
        () => TournamentTime,
        (tournamentTime) => tournamentTime.tournament
    )
    tournamentTimes: TournamentTime[];
}
