import { Multilingualtext } from '../../entities/multilingualtext/multilingualtext.entity';
import { Tournament } from '../../entities/tournament/tournament.entity';
import { User } from '../../entities/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';

@Entity("liga")
export class Liga {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'name', type: 'varchar', length: 50 })
    name: string;
  
    @OneToOne(() => Multilingualtext)
    @JoinColumn()
    description: Multilingualtext

    @OneToMany(() => User, (user) => user.liga)
    users: User[]

    @OneToMany(() => Tournament, (tournament) => tournament.liga)
    tournaments: Tournament[]

  }