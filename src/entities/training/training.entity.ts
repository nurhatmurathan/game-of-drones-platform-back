import { Route } from "../../entities/route/route.entity";
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

    @Column({ name: "start_time", type: "bigint" })
    startTime: number;

    @Column({ name: "places", type: "integer" })
    places: number;

    @Column({ name: "reserved", type: "integer", default: 0 })
    reserved: number;

    @ManyToOne(() => Route, (route) => route.trainings)
    route: Route;
}
