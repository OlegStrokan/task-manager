import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './interfaces/dtos/create-post.dto';
import { UpdatePostDto } from './interfaces/dtos/update-post.dto';
import { Repository } from 'typeorm';
import { ITask } from './interfaces/ITask';
import { TaskEntity } from './repository/task.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<ITask>,
  ) {}

  async create(dto: CreateTaskDto) {
    const task = this.taskRepository.findOne({
      where: { title: dto.title },
    });
    if (task) {
      throw new HttpException(
        'Task current this title already exist',
        HttpStatus.CONFLICT,
      );
    }
    const post = this.taskRepository.create(dto);
    await this.taskRepository.save(post);
    const newPost = await this.taskRepository.findOneBy({ title: dto.title });
    return {
      data: newPost,
    };
  }

  findAll() {
    return this.taskRepository.find();
  }

  async findOne(id: number) {
    const task = await this.taskRepository.findOneBy({ id });

    if (task) {
      return {
        data: task,
      };
    } else {
      throw new HttpException(
        'Task with current with provided id not found',
        HttpStatus.CONFLICT,
      );
    }
  }

  async update(dto: UpdatePostDto) {
    const post = await this.taskRepository.findOneBy({ id: dto.id });
    if (!post) {
      throw new HttpException(
        'Post with this id not found',
        HttpStatus.NOT_FOUND,
      );
    }
    await this.taskRepository.update(dto.id, {
      title: dto.title,
      content: dto.content,
    });

    return this.findOne(dto.id);
  }

  async delete(id: number) {
    const { data } = await this.findOne(id);
    await this.taskRepository.delete(data);

    return {
      data: null,
    };
  }
}
