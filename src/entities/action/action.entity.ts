import { Task } from '@entities/task/task.entity';
import { UserTournamentTime } from '@entities/user.tournament.time/user.tournament.time.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity("action")
export class Action {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'name', type: 'varchar', length: 50 })
    name: string;
  
    @Column({ name: 'description', type: 'varchar', length: 50 })
    description: string;

    @Column({ name: 'time', type: 'timestamp' })
    time: Date;

    @ManyToOne(() => UserTournamentTime, (userTournamentTime) => userTournamentTime.actions)
    userTournamentTime: UserTournamentTime

    @OneToMany(() => Task, (task) => task.action)
    tasks: Task[]
  }