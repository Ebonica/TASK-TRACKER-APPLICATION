import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('create')
  create(@Body() createTaskDto) {
    try {
      if (!createTaskDto.taskName) {
        throw new UnauthorizedException('Task name is required');
      } else if (!createTaskDto.description) {
        throw new UnauthorizedException('Description is required');
      }

      return this.tasksService.create(createTaskDto);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  @Get(':userId')
  findAllByUser(@Param('userId') userId: string) {
    return this.tasksService.findAllByUser(userId);
  }
}
