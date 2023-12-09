import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity("photo")
export class Photo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'url', type: 'varchar' })
    url: string;

  }