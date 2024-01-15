import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { USER_MODEL, User } from '../user';

@Schema({
  timestamps: true,
})
export class Task {
  @Prop({ type: Types.ObjectId, ref: USER_MODEL, required: true })
  user: Types.ObjectId | User;

  @Prop({ required: true })
  taskName: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, default: 'low' })
  priority: string;
}

export type TaskDocument = Task & Document;

export const TaskSchema = SchemaFactory.createForClass(Task);

export const TASK_MODEL = 'Task';
