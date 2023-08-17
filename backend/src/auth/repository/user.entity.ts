import { Transform } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn, Repository } from 'typeorm';

interface IUserCreationAttributes {
  fullName: string;
  userName: string;
  email: string;
  password: string;
}

@Entity('users')
export class UserEntity
  extends Repository<UserEntity>
  implements IUserCreationAttributes
{
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: true })
  fullName: string;

  @Column({ nullable: true })
  userName: string;

  @Column()
  email: string;

  @Transform(({ value }) => value.trim())
  @Column({ nullable: false })
  password: string;
}
