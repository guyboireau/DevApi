import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({unique: true})
  username!: string;

  @Column({ unique: true})
  email!: string;

  @Column()
  password: string;

  @Column({ type: "enum", enum: ["Employee", "Admin", "ProjectManager"], default: 'Employee' })
  role: string;
}