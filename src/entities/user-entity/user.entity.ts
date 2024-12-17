import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity()
@Unique(['username'])
@Unique(['device'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  device: string;

  @Column({ type: 'enum', enum: ['timebased', 'threshold'] })
  pumpMode: 'timebased' | 'threshold';

  @Column({ default: '07:00' })
  firstTime: string;

  @Column({ default: '16:00' })
  secondTime: string;
}