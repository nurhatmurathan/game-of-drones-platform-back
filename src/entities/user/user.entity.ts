import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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


  }