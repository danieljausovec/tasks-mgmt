import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdTimestamp: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updatedTimestamp: Date;

  @OneToMany(() => Task, (task: Task) => task.user, { cascade: true })
  tasks: Task[];
}
