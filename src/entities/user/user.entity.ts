import { Liga } from '@entities/liga/liga.entity';
import { UserTournamentTime } from '@entities/user.tournament.time/user.tournament.time.entity';
import { UserTrainingTime } from '@entities/user.training.time/user.training.time.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'first_name', type: 'varchar', length: 50, nullable: true })
    firstName: string;
  
    @Column({ name: 'last_name', type: 'varchar', length: 50, nullable: true })
    lastName: string;
  
    @Column({ name: 'middle_name', type: 'varchar', length: 50, nullable: true })
    middleName: string;
  
    @Column({ name: 'email', type: 'varchar', length: 100 })
    email: string;

    @Column({ name: 'password', type: 'varchar', select: false})
    password: string
  
    @Column({ name: 'iin', type: 'varchar', length: 12 })
    iin: string;
  
    @Column({ name: 'logo', type: 'varchar', length: 255, nullable: true })
    logo: string;

    @ManyToOne(() => Liga, (liga) => liga.users)
    liga: Liga

    @OneToMany(() => UserTournamentTime, (userTournamentTime) => userTournamentTime.user)
    userTournamentTimes: UserTournamentTime[]

    @OneToMany(() => UserTrainingTime, (userTrainingTime) => userTrainingTime.user)
    userTrainingTimes: UserTrainingTime[]

  }