import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Dht {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  device: string;

  @Column('float')
  temperature: number;

  @Column('float')
  humidity: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  time: Date;
}