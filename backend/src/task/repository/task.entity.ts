import { Column, Entity, PrimaryGeneratedColumn, Repository } from 'typeorm';

interface ITaskCreationAttrs {
  title: string;
  content: string;
  image?: string;
}

@Entity('Task')
export class TaskEntity
  extends Repository<TaskEntity>
  implements ITaskCreationAttrs
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;
}
