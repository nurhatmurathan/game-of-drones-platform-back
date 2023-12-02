import { Action } from '@entities/action/action.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, } from 'typeorm';

@Entity("task")
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'max_count', type: 'integer' })
    name: string;
  
    @Column({ name: 'reward', type: 'varchar' })
    reward: string;

    @ManyToOne(() => Action, (action) => action.tasks)
    action: Action

  }