import { Tournament } from '@entities/tournament/tournament.entity';
import { User } from '@entities/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity("liga")
export class Liga {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'name', type: 'varchar', length: 50 })
    name: string;
  
    @Column({ name: 'description', type: 'varchar', length: 50 })
    description: string;

    @OneToMany(() => User, (user) => user.liga)
    users: User[]

    @OneToMany(() => Tournament, (tournament) => tournament.liga)
    tournaments: Tournament[]

  }