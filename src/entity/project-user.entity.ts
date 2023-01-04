import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProjectUser {
  @PrimaryGeneratedColumn('uuid')
  public id!: string; //au format uuidv4
  @Column()
  public startDate!: Date; 
  @Column()
  public endDate!: Date; 
  @Column()
  public projectId!: string; //au format uuidv4
  @Column()
  public userId: string; //au format uuidv4
}
