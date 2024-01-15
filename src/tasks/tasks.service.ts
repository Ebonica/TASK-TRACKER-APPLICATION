import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TASK_MODEL, TaskDocument } from 'src/schemas/task';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(TASK_MODEL) private readonly taskModel: Model<TaskDocument>,
    private readonly userService: UsersService,
  ) {}

  async create(createTaskDto) {
    const user = await this.userService.findOne(createTaskDto.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const createdTask = await this.taskModel.create({
      ...createTaskDto,
      user: user._id,
    });

    return createdTask;
  }

  async findAllByUser(userId: string): Promise<TaskDocument[]> {
    const user = await this.userService.findOne(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const tasks = await this.taskModel.find({ user: user._id }).exec();
    return tasks;
  }
}
