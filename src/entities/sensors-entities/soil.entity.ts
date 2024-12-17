import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Soil {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  device: string;

  @Column('float')
  moisture: number;

  @CreateDateColumn()
  timestamp: Date;
}