import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { Liga } from "../liga/liga.entity";

@Entity("multilingualtext")
export class MultilingualText {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "en", type: "varchar" })
    en: string;

    @Column({ name: "ru", type: "varchar" })
    ru: string;

    @Column({ name: "kz", type: "varchar" })
    kz: string;

    @OneToOne(() => Liga, liga => liga.description)
    liga: Liga;
}
