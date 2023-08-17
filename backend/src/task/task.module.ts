import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './repository/task.entity';
import { JwtModule } from '@nestjs/jwt';
@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [TypeOrmModule.forFeature([TaskEntity]), JwtModule],
  exports: [TaskService],
})
export class TaskModule {}
