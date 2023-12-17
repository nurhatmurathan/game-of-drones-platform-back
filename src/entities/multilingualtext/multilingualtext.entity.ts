import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("multilingualtext")
export class MultilingualText {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ name: 'en', type: 'varchar' })
    en: string;
    
    @Column({ name: 'ru', type: 'varchar' })
    ru: string;
    
    @Column({ name: 'kz', type: 'varchar' })
    kz: string;


  }