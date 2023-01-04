import { MinLength } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  public id!: string; //au format uuidv4
  @Column()
  public name!: string;
  @Column('uuid')
  public referringEmployeeId!: string; //au format uuidv4
}
