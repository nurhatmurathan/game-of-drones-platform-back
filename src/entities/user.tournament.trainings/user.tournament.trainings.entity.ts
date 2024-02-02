import { Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Tournament } from "../tournament/tournament.entity";
import { Training } from "../training/training.entity";
import { User } from "../user/user.entity";

@Entity("user_tournament_trainings")
@Unique(["user", "tournament"])
export class UserTournamentTrainings {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.userTournamentTrainings)
    user: User;

    @ManyToOne(() => Tournament, (tournament) => tournament.userTournamentTrainings)
    tournament: Tournament;

    @ManyToOne(() => Training, (training) => training.userTournamentTrainings)
    @JoinTable()
    training: Training;
}
