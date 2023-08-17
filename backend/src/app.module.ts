import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './task/repository/task.entity';
import { UserEntity } from './auth/repository/user.entity';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    //TypeOrmModule.forFeature([TaskEntity, UserEntity]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'db',
      entities: [UserEntity, TaskEntity],
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    TaskModule,
  ],
  controllers: [],
  providers: [JwtModule],
})
export class AppModule {}
