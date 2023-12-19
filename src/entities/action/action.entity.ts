import { MultilingualText } from '../../entities/multilingualtext/multilingualtext.entity';
import { Task } from '../../entities/task/task.entity';
import { UserTournamentTime } from '../../entities/user.tournament.time/user.tournament.time.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

@Entity("action")
export class Action {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => MultilingualText)
    @JoinColumn()
    description: MultilingualText

    @Column({ name: 'time', type: 'timestamp' })
    time: Date;

    @ManyToOne(() => UserTournamentTime, (userTournamentTime) => userTournamentTime.actions)
    userTournamentTime: UserTournamentTime

    @ManyToOne(() => Task, (task) => task.actions)
    task: Task
  }