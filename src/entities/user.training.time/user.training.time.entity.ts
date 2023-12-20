import { TournamentTime } from "../../entities/tournament.time/tournament.time.entity";
import { Training } from "../../entities/training/training.entity";
import { User } from "../../entities/user/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity("user_trainingtime")
export class UserTrainingTime {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        () => TournamentTime,
        (tournamentTime) => tournamentTime.userTrainingTimes
    )
    tournamentTime: TournamentTime;

    @ManyToOne(() => Training, (training) => training.userTrainingTimes)
    training: Training;

    @ManyToOne(() => User, (user) => user.userTrainingTimes)
    user: User;
}
