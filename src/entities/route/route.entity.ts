import { Multilingualtext } from '@entities/multilingualtext/multilingualtext.entity';
import { Tournament } from '@entities/tournament/tournament.entity';
import { Training } from '@entities/training/training.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';

@Entity("route")
export class Route {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'name', type: 'varchar', length: 50 })
    name: string;
  
    @OneToOne(() => Multilingualtext)
    @JoinColumn()
    description: Multilingualtext
  
    @Column({ name: 'length', type: 'varchar' })
    length: string;
  
    @Column({ name: 'best_time', type: 'decimal'})
    bestTime: string;
  
    @Column({ name: 'map', type: 'varchar', length: 255})
    map: string;

    @OneToMany(() => Tournament, (tournament) => tournament.route)
    tournaments: Tournament[]

    @OneToMany(() => Training, (training) => training.route)
    trainings: Training[]
  }