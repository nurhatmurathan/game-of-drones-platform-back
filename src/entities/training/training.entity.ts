import { Route } from "../../entities/route/route.entity";
import { UserTrainingTime } from "../../entities/user.training.time/user.training.time.entity";
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
} from "typeorm";

@Entity("training")
export class Training {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "start_time", type: "time", nullable: true })
    startTime: Date;

    @Column({ name: "places", type: "integer" })
    places: number;

    @Column({ name: "reserved", type: "integer", default: 0 })
    reserved: number;

    @ManyToOne(() => Route, (route) => route.trainings)
    route: Route;

    @OneToMany(
        () => UserTrainingTime,
        (userTrainingTime) => userTrainingTime.training
    )
    userTrainingTimes: UserTrainingTime[];
}
