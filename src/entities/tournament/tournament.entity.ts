import { Liga } from '@entities/liga/liga.entity';
import { Route } from '@entities/route/route.entity';
import { TournamentTime } from '@entities/tournament.time/tournament.time.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, } from 'typeorm';

@Entity("tournament")
export class Tournament {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'name', type: 'varchar', length: 50 })
    name: string;
  
    @Column({ name: 'start_date', type: 'date' })
    startDate: Date;
  
    @Column({ name: 'price', type: 'money' })
    price: number;

    @ManyToOne(() => Liga, (liga) => liga.tournaments)
    liga: Liga

    @ManyToOne(() => Route, (route) => route.tournaments)
    route: Route

    @OneToMany(() => TournamentTime, (tournamentTime) => tournamentTime.tournament)
    tournamentTimes: TournamentTime[]
  }