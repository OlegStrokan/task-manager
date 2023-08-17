import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { UpdatePostDto } from './interfaces/dtos/update-post.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TaskEntity } from './repository/task.entity';
import { CreateTaskDto } from './interfaces/dtos/create-post.dto';
import { JwtAuthGuard } from '../auth/guards/jtw-auth.guard';

@ApiTags('Tasks functional')
@UseGuards(JwtAuthGuard)
@Controller('Task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({ summary: 'Create new Task' })
  @ApiOkResponse({ status: 200, type: TaskEntity })
  @Post()
  create(@Body() createDto: CreateTaskDto) {
    return this.taskService.create(createDto);
  }

  @ApiOperation({ summary: 'Find all posts' })
  @ApiOkResponse({ status: 200, type: [TaskEntity] })
  @Get()
  getAllPosts() {
    return this.taskService.findAll();
  }

  @ApiOperation({ summary: 'Find Task' })
  @ApiOkResponse({ status: 200, type: TaskEntity })
  @Get('/:id')
  getPost(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a Task' })
  @ApiOkResponse({ status: 200, type: TaskEntity })
  @Patch()
  update(@Body() updatePostDto: UpdatePostDto) {
    return this.taskService.update(updatePostDto);
  }

  @ApiOperation({ summary: 'Delete a Task' })
  @ApiOkResponse({ status: 200 })
  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.taskService.delete(+id);
  }
}
