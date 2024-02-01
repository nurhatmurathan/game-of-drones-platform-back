import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Route } from "../../entities/route/route.entity";
import { TournamentTime } from "../../entities/tournament.time/tournament.time.entity";
import { MultilingualText } from "../multilingualtext/multilingualtext.entity";
import { UserTournamentTrainings } from "../user.tournament.trainings/user.tournament.trainings.entity";

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

    @Column({ name: "max_pLaces_in_one_game", type: "double precision", default: 20 })
    maxPLacesInGame: number;

    @ManyToOne(() => Route, (route) => route.tournaments, {
        onDelete: "SET NULL",
    })
    route: Route;

    @OneToOne(() => MultilingualText)
    @JoinColumn()
    coverDescription: MultilingualText;

    @OneToOne(() => MultilingualText)
    @JoinColumn()
    description: MultilingualText;

    @OneToMany(() => TournamentTime, (tournamentTime) => tournamentTime.tournament, {
        cascade: ["remove"],
    })
    tournamentTimes: TournamentTime[];

    // @ManyToOne(() => Liga, (liga) => liga.tournaments, {
    //     onDelete: "SET NULL",
    // })
    // liga: Liga;

    @ManyToOne(() => UserTournamentTrainings, (userTournamentTrainings) => userTournamentTrainings.tournament)
    userTournamentTrainings: UserTournamentTrainings;
}
