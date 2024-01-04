import { Liga } from "../../entities/liga/liga.entity";
import { Route } from "../../entities/route/route.entity";
import { TournamentTime } from "../../entities/tournament.time/tournament.time.entity";
import { MultilingualText } from "../multilingualtext/multilingualtext.entity";
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    JoinColumn,
} from "typeorm";

@Entity("tournament")
export class Tournament {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "name", type: "varchar", length: 50 })
    name: string;

    @Column({ name: "start_date", type: "bigint" })
    startDate: number;

    @Column({ name: "price", type: "bigint" })
    price: number;

    @ManyToOne(() => Liga, (liga) => liga.tournaments, {
        onDelete: 'SET NULL',
    })
    liga: Liga;

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
