import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Schema({
  timestamps: true,
  collection: 'users',
})
export class User {
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  // Hash the password before saving
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}

export type UserDocument = User & Document;

const schema = SchemaFactory.createForClass(User);

// Middleware to hash the password before saving
schema.pre<UserDocument>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;

    next();
  } catch (error) {
    return next(error);
  }
});

export const UserSchema = schema;

export const USER_MODEL = User.name;
