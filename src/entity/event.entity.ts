import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  public id!: string; //au format uuidv4
  @Column()
  public date!: Date;
  @Column({ type: "enum", enum: ["Accepted", "Declined","Pending"], default: 'Pending'})
  public eventStatus?: string;
  @Column({ type: "enum", enum: ["RemoteWork", "PaidLeave"]})
  public eventType!: string;
  @Column()
  public eventDescription?: string;
  @Column('uuid')
  public userId!: string; //au format uuidv4
}
