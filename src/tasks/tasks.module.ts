import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksService } from './tasks.service';
import { TASK_MODEL, TaskSchema } from 'src/schemas/task';
import { UserModule } from 'src/users/users.module';
import { TasksController } from './tasks.controller';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: TASK_MODEL, schema: TaskSchema }]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [MongooseModule],
})
export class TaskModule {}
