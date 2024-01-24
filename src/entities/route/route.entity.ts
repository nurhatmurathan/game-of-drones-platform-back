import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { MultilingualText } from "../../entities/multilingualtext/multilingualtext.entity";
import { Tournament } from "../../entities/tournament/tournament.entity";
import { Training } from "../../entities/training/training.entity";

@Entity("route")
export class Route {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "name", type: "varchar", length: 50 })
    name: string;

    @OneToOne(() => MultilingualText)
    @JoinColumn()
    description: MultilingualText;

    @Column({ name: "length", type: "varchar" })
    length: string;

    @Column({ name: "best_time", type: "decimal" })
    bestTime: number;

    @Column({ name: "map", type: "varchar", length: 255 })
    map: string;

    @OneToMany(() => Tournament, (tournament) => tournament.route, {
        cascade: ['remove']
    })
    tournaments: Tournament[];

    @OneToMany(() => Training, (training) => training.route, {
        cascade: ['remove']
    })
    trainings: Training[];
}
